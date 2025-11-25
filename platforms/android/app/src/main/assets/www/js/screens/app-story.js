// App Story Screen
let storyContainerColor = '#ffffff';
const storyFeedback = document.getElementById('story-feedback');

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
    const paramsField = document.getElementById('story-custom-params-input');
    const container = document.getElementById('story-container');

    if (!propertyId || !screenName) {
        updateStoryFeedback('Property Id and Screen Name are required.', true);
        return;
    }

    if (typeof DengageCR === 'undefined' || typeof DengageCR.showAppStory !== 'function') {
        updateStoryFeedback('DengageCR plugin is not available.', true);
        return;
    }

    const payload = {
        propertyId,
        screenName,
        customParams: parseCustomParams(paramsField?.value),
        bounds: getStoryBounds(container)
    };

    DengageCR.showAppStory(
        payload,
        () => updateStoryFeedback('App story requested.'),
        (error) => updateStoryFeedback(`Failed to show app story: ${error}`, true)
    );
}

function hideAppStory() {
    if (typeof DengageCR === 'undefined' || typeof DengageCR.hideAppStory !== 'function') {
        updateStoryFeedback('DengageCR plugin is not available.', true);
        return;
    }

    DengageCR.hideAppStory(
        () => updateStoryFeedback('App story removed.'),
        (error) => updateStoryFeedback(`Failed to hide app story: ${error}`, true)
    );
}

function updateStoryFeedback(message, isError = false) {
    if (!storyFeedback) {
        return;
    }
    storyFeedback.textContent = message;
    storyFeedback.style.color = isError ? '#c0392b' : '#004085';
}

function getStoryBounds(element) {
    if (!element) {
        return {};
    }

    const rect = element.getBoundingClientRect();
    return {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
    };
}

function parseCustomParams(value) {
    if (!value) {
        return {};
    }

    try {
        const parsed = JSON.parse(value);
        return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (error) {
        updateStoryFeedback('Custom params JSON is invalid.', true);
        return {};
    }
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

