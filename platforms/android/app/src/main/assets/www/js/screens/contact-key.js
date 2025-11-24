// Contact Key Screen
function initContactkey() {
    loadContactKey();
}

function loadContactKey() {
    DengageCR.getContactKey(
        function(contactKey) {
            document.getElementById('contact-key-input').value = contactKey || '';
        },
        function(error) {
            console.error('Error getting contact key:', error);
        }
    );
    
    DengageCR.getPermission(
        function(permission) {
            document.getElementById('permission-switch').checked = permission === true || permission === 'true';
        },
        function(error) {
            console.error('Error getting permission:', error);
        }
    );
}

function saveContactKey() {
    const contactKey = document.getElementById('contact-key-input').value.trim();
    
    DengageCR.setContactKey(
        contactKey,
        function() {
            alert('Contact key has been updated.');
        },
        function(error) {
            console.error('Error setting contact key:', error);
            alert('Error updating contact key');
        }
    );
}

// Handle permission switch
document.addEventListener('DOMContentLoaded', function() {
    const permissionSwitch = document.getElementById('permission-switch');
    if (permissionSwitch) {
        permissionSwitch.addEventListener('change', function() {
            const permission = this.checked;
            DengageCR.setPermission(
                permission,
                function() {
                    console.log('Permission updated');
                },
                function(error) {
                    console.error('Error setting permission:', error);
                }
            );
        });
    }
    
    // Initialize when screen is shown
    const contactKeyScreen = document.getElementById('contact-key-screen');
    if (contactKeyScreen) {
        const observer = new MutationObserver(function(mutations) {
            if (contactKeyScreen.classList.contains('active')) {
                initContactkey();
            }
        });
        observer.observe(contactKeyScreen, { attributes: true, attributeFilter: ['class'] });
    }
});

