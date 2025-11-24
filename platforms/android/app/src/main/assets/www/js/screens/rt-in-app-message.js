// RT In App Message Screen
let rtParameters = [];

function initRtinappmessage() {
    rtParameters = [];
    renderRTParameters();
}

function setCategoryPath() {
    const categoryPath = document.getElementById('category-path-input').value.trim();
    if (categoryPath) {
        DengageCR.setCategoryPath(
            categoryPath,
            function() {
                console.log('Category path set');
            },
            function(error) {
                console.error('Error setting category path:', error);
            }
        );
    }
}

function setCartItemCount() {
    const count = document.getElementById('cart-item-count-input').value.trim();
    if (count) {
        DengageCR.setCartItemCount(
            count,
            function() {
                console.log('Cart item count set');
            },
            function(error) {
                console.error('Error setting cart item count:', error);
            }
        );
    }
}

function setCartAmount() {
    const amount = document.getElementById('cart-amount-input').value.trim();
    if (amount) {
        DengageCR.setCartAmount(
            amount,
            function() {
                console.log('Cart amount set');
            },
            function(error) {
                console.error('Error setting cart amount:', error);
            }
        );
    }
}

function setState() {
    const state = document.getElementById('state-input').value.trim();
    if (state) {
        DengageCR.setState(
            state,
            function() {
                console.log('State set');
            },
            function(error) {
                console.error('Error setting state:', error);
            }
        );
    }
}

function setCity() {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        DengageCR.setCity(
            city,
            function() {
                console.log('City set');
            },
            function(error) {
                console.error('Error setting city:', error);
            }
        );
    }
}

function addRTParameter() {
    rtParameters.push({ key: '', value: '' });
    renderRTParameters();
}

function renderRTParameters() {
    const container = document.getElementById('rt-parameters');
    let html = '';
    
    rtParameters.forEach((param, index) => {
        html += `
            <div class="param-row">
                <input type="text" class="text-input" placeholder="Key" 
                    value="${escapeHtml(param.key)}" 
                    onchange="updateRTParameter(${index}, 'key', this.value)">
                <input type="text" class="text-input" placeholder="Value" 
                    value="${escapeHtml(param.value)}" 
                    onchange="updateRTParameter(${index}, 'value', this.value)">
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function updateRTParameter(index, field, value) {
    if (rtParameters[index]) {
        rtParameters[index][field] = value;
    }
}

function showRealTimeInApp() {
    const screenName = document.getElementById('rt-screen-name-input').value.trim();
    
    const paramObj = {};
    rtParameters.forEach(({ key, value }) => {
        if (key && value) {
            paramObj[key] = value;
        }
    });
    
    DengageCR.showRealTimeInApp(
        screenName,
        JSON.stringify(paramObj),
        function() {
            console.log('Real time in-app shown');
        },
        function(error) {
            console.error('Error showing real time in-app:', error);
            alert('Error showing real time in-app');
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
    const rtInAppMessageScreen = document.getElementById('rt-in-app-message-screen');
    if (rtInAppMessageScreen) {
        const observer = new MutationObserver(function(mutations) {
            if (rtInAppMessageScreen.classList.contains('active')) {
                initRtinappmessage();
            }
        });
        observer.observe(rtInAppMessageScreen, { attributes: true, attributeFilter: ['class'] });
    }
});

