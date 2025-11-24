// Inbox Messages Screen
let inboxMessages = [];

function initInboxmessages() {
    loadInboxMessages();
}

function loadInboxMessages() {
    const messagesList = document.getElementById('inbox-messages-list');
    const loading = document.getElementById('inbox-loading');
    const empty = document.getElementById('inbox-empty');
    
    loading.style.display = 'block';
    empty.style.display = 'none';
    messagesList.innerHTML = '';
    
    DengageCR.getInboxMessages(
        0,
        50,
        function(messages) {
            loading.style.display = 'none';
            try {
                inboxMessages = typeof messages === 'string' ? JSON.parse(messages) : messages;
                if (inboxMessages && inboxMessages.length > 0) {
                    displayInboxMessages(inboxMessages);
                } else {
                    empty.style.display = 'block';
                }
            } catch (e) {
                console.error('Error parsing messages:', e);
                empty.style.display = 'block';
            }
        },
        function(error) {
            loading.style.display = 'none';
            console.error('Error getting inbox messages:', error);
            empty.style.display = 'block';
        }
    );
}

function displayInboxMessages(messages) {
    const messagesList = document.getElementById('inbox-messages-list');
    let html = '';
    
    messages.forEach(message => {
        html += `
            <div class="message-item">
                <div class="message-title">${escapeHtml(message.title || 'No Title')}</div>
                <div class="message-text">${escapeHtml(message.message || '')}</div>
                <div class="message-date">${escapeHtml(message.receiveDate || '')}</div>
                <div class="message-clicked">${message.isClicked ? 'Clicked' : 'Not Clicked'}</div>
                <div class="message-actions">
                    <button class="action-button delete" onclick="deleteInboxMessage('${message.id}')">Delete</button>
                    <button class="action-button mark" onclick="markInboxMessageAsClicked('${message.id}')">Mark as Clicked</button>
                </div>
            </div>
        `;
    });
    
    messagesList.innerHTML = html;
}

function deleteInboxMessage(id) {
    if (confirm('Delete this message?')) {
        DengageCR.deleteInboxMessage(
            id,
            function() {
                loadInboxMessages();
            },
            function(error) {
                console.error('Error deleting message:', error);
                alert('Failed to delete message');
            }
        );
    }
}

function markInboxMessageAsClicked(id) {
    DengageCR.setInboxMessageAsClicked(
        id,
        function() {
            loadInboxMessages();
        },
        function(error) {
            console.error('Error marking message as clicked:', error);
            alert('Failed to mark as clicked');
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
    const inboxMessagesScreen = document.getElementById('inbox-messages-screen');
    if (inboxMessagesScreen) {
        const observer = new MutationObserver(function(mutations) {
            if (inboxMessagesScreen.classList.contains('active')) {
                initInboxmessages();
            }
        });
        observer.observe(inboxMessagesScreen, { attributes: true, attributeFilter: ['class'] });
    }
});

