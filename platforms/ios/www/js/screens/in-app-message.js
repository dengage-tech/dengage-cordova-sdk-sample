// In App Message Screen
let deviceInfoItems = [{ key: '', value: '' }];

function initInappmessage() {
    loadDeviceInfo();
}

function loadDeviceInfo() {
    DengageCR.getInAppDeviceInfo(
        function(info) {
            try {
                const infoObj = typeof info === 'string' ? JSON.parse(info) : info;
                const arr = Object.entries(infoObj || {}).map(([key, value]) => ({
                    key,
                    value: String(value)
                }));
                deviceInfoItems = arr.length ? [...arr, { key: '', value: '' }] : [{ key: '', value: '' }];
                renderDeviceInfoItems();
            } catch (e) {
                console.error('Error parsing device info:', e);
                deviceInfoItems = [{ key: '', value: '' }];
                renderDeviceInfoItems();
            }
        },
        function(error) {
            console.error('Error getting device info:', error);
            deviceInfoItems = [{ key: '', value: '' }];
            renderDeviceInfoItems();
        }
    );
}

function renderDeviceInfoItems() {
    const container = document.getElementById('device-info-items');
    let html = '';
    
    deviceInfoItems.forEach((item, index) => {
        html += `
            <div class="device-info-row">
                <input type="text" class="device-info-input" placeholder="Key" 
                    value="${escapeHtml(item.key)}" 
                    onchange="updateDeviceInfo(${index}, 'key', this.value)">
                <input type="text" class="device-info-input" placeholder="Value" 
                    value="${escapeHtml(item.value)}" 
                    onchange="updateDeviceInfo(${index}, 'value', this.value)">
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function updateDeviceInfo(index, field, value) {
    if (deviceInfoItems[index]) {
        deviceInfoItems[index][field] = value;
    }
}

function addDeviceInfoItem() {
    deviceInfoItems.push({ key: '', value: '' });
    renderDeviceInfoItems();
}

function setNavigation() {
    const screenName = document.getElementById('screen-name-input').value.trim();
    
    // Set all device info items
    deviceInfoItems.forEach(({ key, value }) => {
        if (key && value) {
            DengageCR.setInAppDeviceInfo(
                key,
                value,
                function() {
                    console.log('Device info set:', key, value);
                },
                function(error) {
                    console.error('Error setting device info:', error);
                }
            );
        }
    });
    
    // Set navigation
    if (screenName) {
        DengageCR.setNavigationWithName(
            screenName,
            function() {
                alert('Navigation set successfully');
            },
            function(error) {
                console.error('Error setting navigation:', error);
                alert('Error setting navigation');
            }
        );
    } else {
        DengageCR.setNavigation(
            function() {
                alert('Navigation set successfully');
            },
            function(error) {
                console.error('Error setting navigation:', error);
                alert('Error setting navigation');
            }
        );
    }
}

function clearDeviceInfo() {
    DengageCR.clearInAppDeviceInfo(
        function() {
            deviceInfoItems = [{ key: '', value: '' }];
            renderDeviceInfoItems();
            alert('Device info cleared');
        },
        function(error) {
            console.error('Error clearing device info:', error);
            alert('Error clearing device info');
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
    const inAppMessageScreen = document.getElementById('in-app-message-screen');
    if (inAppMessageScreen) {
        const observer = new MutationObserver(function(mutations) {
            if (inAppMessageScreen.classList.contains('active')) {
                initInappmessage();
            }
        });
        observer.observe(inAppMessageScreen, { attributes: true, attributeFilter: ['class'] });
    }
});

