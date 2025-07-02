// Team Progress JavaScript Functions
// team-progress.js

/**
 * Configuration object for team progress files
 * Update these paths according to your project structure
 */
const TEAM_PROGRESS_CONFIG = {
    aids: {
        fileName: 'AIDS-Teams-withLeaders.xlsx',
        filePath: './AIDS-Teams-withLeaders.xlsx', // Adjust path as needed
        displayName: 'AIDS Team Progress Report'
    },
    aiml: {
        fileName: 'AIML-Teams-withLeaders.xlsx',
        filePath: './AIML-Teams-withLeaders.xlsx', // Adjust path as needed
        displayName: 'AI/ML Team Progress Report'
    }
};

/**
 * Opens team progress Excel file
 * @param {string} teamType - Type of team ('aids' or 'aiml')
 */
function openTeamProgress(teamType) {
    const config = TEAM_PROGRESS_CONFIG[teamType];
    
    if (!config) {
        console.error('Invalid team type:', teamType);
        showNotification('Error: Invalid team type', 'error');
        return;
    }

    try {
        // Method 1: Try to open file directly (works for local files)
        const link = document.createElement('a');
        link.href = config.filePath;
        link.download = config.fileName;
        link.target = '_blank';
        
        // Add some visual feedback
        addClickEffect(event.target.closest('.progress-card'));
        
        // Show loading notification
        showNotification(`Opening ${config.displayName}...`, 'info');
        
        // Attempt to open the file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // If file doesn't open automatically, provide fallback
        setTimeout(() => {
            showNotification(`If the file didn't open automatically, please check: ${config.filePath}`, 'warning');
        }, 2000);
        
    } catch (error) {
        console.error('Error opening file:', error);
        showNotification('Error opening file. Please check the file path.', 'error');
        
        // Fallback: Show file location
        showFileLocationDialog(config);
    }
}

/**
 * Alternative method using file input for local file selection
 * @param {string} teamType - Type of team ('aids' or 'aiml')
 */
function selectTeamProgressFile(teamType) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            // You can process the file here or just open it
            const url = URL.createObjectURL(file);
            window.open(url, '_blank');
            
            // Clean up the URL object
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
    };
    
    input.click();
}

/**
 * Shows a dialog with file location information
 * @param {Object} config - Team configuration object
 */
function showFileLocationDialog(config) {
    const dialog = document.createElement('div');
    dialog.className = 'file-location-dialog';
    dialog.innerHTML = `
        <div class="dialog-overlay" onclick="closeDialog(this.parentElement)">
            <div class="dialog-content" onclick="event.stopPropagation()" style="
                background: white;
                padding: 2rem;
                border-radius: 10px;
                max-width: 500px;
                margin: 2rem;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            ">
                <h3 style="margin-bottom: 1rem; color: #2c3e50;">File Location</h3>
                <p style="margin-bottom: 1rem; color: #7f8c8d;">
                    Please navigate to the following location to open the ${config.displayName}:
                </p>
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 5px; font-family: monospace; word-break: break-all; margin-bottom: 1rem;">
                    ${config.filePath}
                </div>
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button onclick="copyToClipboard('${config.filePath}')" style="
                        background: #3498db;
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 5px;
                        cursor: pointer;
                    ">Copy Path</button>
                    <button onclick="closeDialog(this.closest('.file-location-dialog'))" style="
                        background: #95a5a6;
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 5px;
                        cursor: pointer;
                    ">Close</button>
                </div>
            </div>
        </div>
    `;
    
    dialog.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    document.body.appendChild(dialog);
}

/**
 * Closes dialog
 * @param {HTMLElement} dialog - Dialog element to close
 */
function closeDialog(dialog) {
    if (dialog && dialog.parentNode) {
        dialog.parentNode.removeChild(dialog);
    }
}

/**
 * Copies text to clipboard
 * @param {string} text - Text to copy
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Path copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        showNotification('Failed to copy path', 'error');
    });
}

/**
 * Shows notification message
 * @param {string} message - Message to display
 * @param {string} type - Type of notification ('info', 'success', 'warning', 'error')
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.progress-notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'progress-notification';
    
    const colors = {
        info: '#3498db',
        success: '#27ae60',
        warning: '#f39c12',
        error: '#e74c3c'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10001;
        max-width: 300px;
        font-size: 14px;
        animation: slideIn 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

/**
 * Adds click effect to card
 * @param {HTMLElement} card - Card element
 */
function addClickEffect(card) {
    if (!card) return;
    
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    }, 150);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(300px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(300px);
            opacity: 0;
        }
    }
    
    .progress-card:active {
        transform: scale(0.95) !important;
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Team Progress Dashboard initialized');
    
    // You can add any initialization code here
    // For example, checking if files exist, updating card status, etc.
});

/**
 * Optional: Function to check if files exist and update card appearance
 * This is a placeholder - actual implementation depends on your server setup
 */
function checkFileAvailability() {
    Object.keys(TEAM_PROGRESS_CONFIG).forEach(teamType => {
        const config = TEAM_PROGRESS_CONFIG[teamType];
        
        // This is a placeholder - you'll need to implement actual file checking
        // based on your server setup (could be an API call, etc.)
        
        fetch(config.filePath, { method: 'HEAD' })
            .then(response => {
                const card = document.querySelector(`.${teamType}-card`);
                if (card) {
                    if (response.ok) {
                        // File exists - maybe add a green indicator
                        card.style.borderLeftColor = '#27ae60';
                    } else {
                        // File doesn't exist - maybe add a red indicator
                        card.style.borderLeftColor = '#e74c3c';
                    }
                }
            })
            .catch(error => {
                console.log(`Could not check file availability for ${teamType}:`, error);
            });
    });
}