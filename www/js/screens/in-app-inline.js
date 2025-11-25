const inlineFeedback = document.getElementById('inline-feedback');

function showInAppInline() {
    const propertyId = document.getElementById('inline-property-id-input').value.trim();
    const screenName = document.getElementById('inline-screen-name-input').value.trim();
    const customParamsField = document.getElementById('inline-custom-params-input');
    const container = document.getElementById('inline-container');

    if (!propertyId || !screenName) {
        updateInlineFeedback('Property ID and Screen Name are required.', true);
        return;
    }

    if (typeof DengageCR === 'undefined' || typeof DengageCR.showInAppInline !== 'function') {
        updateInlineFeedback('DengageCR plugin not available.', true);
        return;
    }

    if (!container) {
        updateInlineFeedback('Inline container missing from the DOM.', true);
        return;
    }

    const payload = {
        propertyId,
        screenName,
        customParams: parseCustomParams(customParamsField ? customParamsField.value : ''),
        bounds: getInlineBounds(container)
    };

    DengageCR.showInAppInline(
        payload,
        () => updateInlineFeedback('Inline view requested.'),
        (error) => updateInlineFeedback(`Failed to show inline: ${error}`, true)
    );
}

function hideInAppInline() {
    if (typeof DengageCR === 'undefined' || typeof DengageCR.hideInAppInline !== 'function') {
        updateInlineFeedback('DengageCR plugin not available.', true);
        return;
    }

    DengageCR.hideInAppInline(
        () => updateInlineFeedback('Inline view removed.'),
        (error) => updateInlineFeedback(`Failed to hide inline: ${error}`, true)
    );
}

function updateInlineFeedback(message, isError = false) {
    if (!inlineFeedback) {
        return;
    }
    inlineFeedback.textContent = message;
    inlineFeedback.style.color = isError ? '#c0392b' : '#004085';
}

function getInlineBounds(element) {
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
        updateInlineFeedback('Custom params JSON is invalid.', true);
        return {};
    }
}
