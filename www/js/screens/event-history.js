// Event History Screen
let eventTypesMap = new Map();
let eventTypes = [];
let selectedEventType = '';
let eventParameters = [];
let sdkParameters = null;

function initEventhistory() {
    loadSdkParameters();
}

function loadSdkParameters() {
    DengageCR.getSdkParameters(
        function(params) {
            try {
                sdkParameters = typeof params === 'string' ? JSON.parse(params) : params;
                if (sdkParameters) {
                    processEventMappings(sdkParameters.eventMappings || []);
                }
            } catch (e) {
                console.error('Error parsing SDK parameters:', e);
            }
        },
        function(error) {
            console.error('Error loading SDK parameters:', error);
        }
    );
}

function processEventMappings(eventMappings) {
    const systemAttributes = new Set(['event_time', 'device_id', 'session_id']);
    const newEventTypesMap = new Map();
    
    eventMappings.forEach((eventMapping) => {
        const tableName = eventMapping.eventTableName || '';
        
        if (eventMapping.eventTypeDefinitions) {
            eventMapping.eventTypeDefinitions.forEach((eventTypeDef) => {
                const eventType = eventTypeDef.eventType;
                if (!eventType || !tableName) return;
                
                const parameters = [];
                
                // Add filter condition parameters
                if (eventTypeDef.filterConditions) {
                    eventTypeDef.filterConditions.forEach((filterCondition) => {
                        const fieldName = filterCondition.fieldName;
                        if (!fieldName || systemAttributes.has(fieldName)) return;
                        
                        if (filterCondition.operator === 'Equals') {
                            const value = (filterCondition.values && filterCondition.values[0]) || '';
                            parameters.push({
                                key: fieldName,
                                value: value,
                                isReadOnly: true,
                                inputType: 'TEXT',
                                options: []
                            });
                        } else if (filterCondition.operator === 'In') {
                            const values = filterCondition.values || [];
                            const defaultValue = values[0] || '';
                            parameters.push({
                                key: fieldName,
                                value: defaultValue,
                                isReadOnly: false,
                                inputType: 'DROPDOWN',
                                options: values
                            });
                        }
                    });
                }
                
                // Add regular attribute parameters
                if (eventTypeDef.attributes) {
                    eventTypeDef.attributes.forEach((attribute) => {
                        const tableColumnName = attribute.tableColumnName;
                        if (tableColumnName && 
                            !systemAttributes.has(tableColumnName) &&
                            !parameters.some(p => p.key === tableColumnName)) {
                            parameters.push({
                                key: tableColumnName,
                                value: '',
                                isReadOnly: false,
                                inputType: 'TEXT',
                                options: []
                            });
                        }
                    });
                }
                
                newEventTypesMap.set(eventType, {
                    tableName: tableName,
                    parameters: parameters
                });
            });
        }
    });
    
    eventTypesMap = newEventTypesMap;
    eventTypes = Array.from(newEventTypesMap.keys());
    
    if (eventTypes.length > 0) {
        selectedEventType = eventTypes[0];
        updateEventTypeDisplay();
        loadEventParameters();
    } else {
        document.getElementById('event-type-selector').style.display = 'none';
    }
}

function updateEventTypeDisplay() {
    const config = eventTypesMap.get(selectedEventType);
    const tableNameDisplay = document.getElementById('table-name-display');
    if (config) {
        tableNameDisplay.textContent = 'Table Name: ' + config.tableName;
    }
    
    const picker = document.getElementById('event-type-picker');
    if (picker) {
        picker.textContent = selectedEventType || 'Select Event Type';
    }
    
    if (eventTypes.length > 0) {
        document.getElementById('event-type-selector').style.display = 'block';
    }
}

function loadEventParameters() {
    const config = eventTypesMap.get(selectedEventType);
    if (config) {
        eventParameters = config.parameters.map(p => ({
            key: p.key,
            value: p.value,
            isReadOnly: p.isReadOnly,
            inputType: p.inputType,
            options: p.options
        }));
        renderEventParameters();
    }
}

function renderEventParameters() {
    const container = document.getElementById('event-parameters');
    let html = '';
    
    eventParameters.forEach((param, index) => {
        if (param.inputType === 'DROPDOWN') {
            html += `
                <div class="param-row">
                    <input type="text" class="text-input" placeholder="Key" 
                        value="${escapeHtml(param.key)}" 
                        ${param.isReadOnly ? 'readonly' : ''}
                        onchange="updateEventParameter(${index}, 'key', this.value)">
                    <select class="text-input" 
                        onchange="updateEventParameter(${index}, 'value', this.value)">
                        <option value="">Select Value</option>
                        ${param.options.map(opt => 
                            `<option value="${escapeHtml(opt)}" ${opt === param.value ? 'selected' : ''}>${escapeHtml(opt)}</option>`
                        ).join('')}
                    </select>
                    ${eventParameters.length > 1 ? `<button class="remove-button" onclick="removeEventParameter(${index})">Remove</button>` : ''}
                </div>
            `;
        } else {
            html += `
                <div class="param-row">
                    <input type="text" class="text-input" placeholder="Key" 
                        value="${escapeHtml(param.key)}" 
                        ${param.isReadOnly ? 'readonly' : ''}
                        onchange="updateEventParameter(${index}, 'key', this.value)">
                    <input type="text" class="text-input" placeholder="Value" 
                        value="${escapeHtml(param.value)}" 
                        ${param.isReadOnly ? 'readonly' : ''}
                        onchange="updateEventParameter(${index}, 'value', this.value)">
                    ${eventParameters.length > 1 ? `<button class="remove-button" onclick="removeEventParameter(${index})">Remove</button>` : ''}
                </div>
            `;
        }
    });
    
    container.innerHTML = html;
}

function updateEventParameter(index, field, value) {
    if (eventParameters[index]) {
        eventParameters[index][field] = value;
    }
}

function addEventParameter() {
    eventParameters.push({
        key: '',
        value: '',
        isReadOnly: false,
        inputType: 'TEXT',
        options: []
    });
    renderEventParameters();
}

function removeEventParameter(index) {
    if (eventParameters.length > 1) {
        eventParameters.splice(index, 1);
        renderEventParameters();
    }
}

function showEventTypePicker() {
    // Simple modal implementation
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-title">Select Event Type</div>
            ${eventTypes.map(type => `
                <div class="modal-item" onclick="selectEventType('${escapeHtml(type)}'); this.closest('.modal-overlay').remove();">
                    ${escapeHtml(type)}
                </div>
            `).join('')}
            <div class="modal-close-button" onclick="this.closest('.modal-overlay').remove();">
                <div class="modal-close-button-text">Close</div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function selectEventType(type) {
    selectedEventType = type;
    updateEventTypeDisplay();
    loadEventParameters();
}

function sendEvent() {
    if (!selectedEventType) {
        alert('Please select an event type');
        return;
    }
    
    const config = eventTypesMap.get(selectedEventType);
    if (!config) {
        alert('Invalid event type');
        return;
    }
    
    const eventData = {};
    eventParameters.forEach(param => {
        if (param.key && param.value) {
            eventData[param.key] = param.value;
        }
    });
    
    DengageCR.sendDeviceEvent(
        config.tableName,
        JSON.stringify(eventData),
        function() {
            alert('Event sent to table: ' + config.tableName);
        },
        function(error) {
            console.error('Error sending event:', error);
            alert('Error sending event');
        }
    );
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize when screen is shown
document.addEventListener('DOMContentLoaded', function() {
    const eventHistoryScreen = document.getElementById('event-history-screen');
    if (eventHistoryScreen) {
        const observer = new MutationObserver(function(mutations) {
            if (eventHistoryScreen.classList.contains('active')) {
                initEventhistory();
            }
        });
        observer.observe(eventHistoryScreen, { attributes: true, attributeFilter: ['class'] });
    }
});

