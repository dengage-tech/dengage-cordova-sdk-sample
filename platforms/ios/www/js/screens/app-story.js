// App Story Screen
let storyContainerColor = '#ffffff';

function changeStoryBackgroundColor() {
    const color = document.getElementById('story-bg-color-input').value.trim();
    if (color) {
        storyContainerColor = color;
        const container = document.getElementById('story-container');
        container.style.backgroundColor = color;
    }
}

function refreshStory() {
    const propertyId = document.getElementById('story-property-id-input').value.trim();
    const screenName = document.getElementById('story-screen-name-input').value.trim();
    
    const container = document.getElementById('story-container');
    container.innerHTML = '<p>App Story view would be displayed here. This requires native view integration.</p>';
    
    // Note: In Cordova, story views typically require native plugin implementation
    // This is a placeholder - the actual implementation would need native code
    console.log('Refresh Story:', propertyId, screenName);
}

// Initialize when screen is shown
document.addEventListener('DOMContentLoaded', function() {
    const appStoryScreen = document.getElementById('app-story-screen');
    if (appStoryScreen) {
        const observer = new MutationObserver(function(mutations) {
            if (appStoryScreen.classList.contains('active')) {
                changeStoryBackgroundColor();
            }
        });
        observer.observe(appStoryScreen, { attributes: true, attributeFilter: ['class'] });
    }
});

