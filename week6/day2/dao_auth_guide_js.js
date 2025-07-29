// DAO Authentication Provider Setup Guide JavaScript
// File: dao_auth_guide_js.js

// Global variables
let currentStepNumber = 1;
const totalSteps = 8;

// Step titles for navigation
const stepTitles = [
    "Introduction",
    "Dependencies", 
    "User Entity",
    "User Repository",
    "UserDetails",
    "UserDetailsService", 
    "Security Config",
    "Testing & Usage"
];

// Initialize the guide when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeStepLinks();
    updateProgress();
    updateNavigationButtons();
    addKeyboardNavigation();
    addScrollToTop();
    
    // Initialize Prism.js for syntax highlighting
    if (window.Prism) {
        Prism.highlightAll();
    }
});

/**
 * Initialize step navigation links
 */
function initializeStepLinks() {
    const stepLinksContainer = document.getElementById('stepLinks');
    stepLinksContainer.innerHTML = '';
    
    for (let i = 1; i <= totalSteps; i++) {
        const stepLink = document.createElement('button');
        stepLink.className = `step-link ${i === currentStepNumber ? 'active' : ''}`;
        stepLink.textContent = `${i}. ${stepTitles[i - 1]}`;
        stepLink.onclick = () => goToStep(i);
        stepLinksContainer.appendChild(stepLink);
    }
}

/**
 * Navigate to a specific step
 * @param {number} stepNumber - The step number to navigate to
 */
function goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > totalSteps) return;
    
    // Hide current step
    const currentStep = document.querySelector('.step.active');
    if (currentStep) {
        currentStep.classList.remove('active');
    }
    
    // Show target step
    const targetStep = document.querySelector(`[data-step="${stepNumber}"]`);
    if (targetStep) {
        targetStep.classList.add('active');
        currentStepNumber = stepNumber;
        
        updateProgress();
        updateNavigationButtons();
        updateStepLinks();
        scrollToTop();
        
        // Re-highlight code blocks in the new step
        if (window.Prism) {
            const codeBlocks = targetStep.querySelectorAll('pre code');
            codeBlocks.forEach(block => {
                Prism.highlightElement(block);
            });
        }
    }
}

/**
 * Change step by relative amount
 * @param {number} direction - +1 for next, -1 for previous
 */
function changeStep(direction) {
    const newStep = currentStepNumber + direction;
    goToStep(newStep);
}

/**
 * Update the progress bar and step counter
 */
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentStepElement = document.getElementById('currentStep');
    const totalStepsElement = document.getElementById('totalSteps');
    
    if (progressFill) {
        const progressPercentage = (currentStepNumber / totalSteps) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    }
    
    if (currentStepElement) {
        currentStepElement.textContent = currentStepNumber;
    }
    
    if (totalStepsElement) {
        totalStepsElement.textContent = totalSteps;
    }
}

/**
 * Update navigation button states
 */
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentStepNumber === 1;
        prevBtn.innerHTML = currentStepNumber === 1 
            ? '<i class="fas fa-arrow-left"></i> Previous'
            : '<i class="fas fa-arrow-left"></i> Previous';
    }
    
    if (nextBtn) {
        if (currentStepNumber === totalSteps) {
            nextBtn.innerHTML = '<i class="fas fa-check"></i> Complete';
            nextBtn.onclick = () => showCompletionMessage();
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
            nextBtn.onclick = () => changeStep(1);
        }
        nextBtn.disabled = false;
    }
}

/**
 * Update step navigation links
 */
function updateStepLinks() {
    const stepLinks = document.querySelectorAll('.step-link');
    stepLinks.forEach((link, index) => {
        link.classList.toggle('active', index + 1 === currentStepNumber);
    });
}

/**
 * Copy code to clipboard
 * @param {HTMLElement} button - The copy button that was clicked
 */
function copyCode(button) {
    const codeContainer = button.closest('.code-container');
    const codeBlock = codeContainer.querySelector('pre code');
    
    if (codeBlock) {
        const text = codeBlock.textContent;
        
        // Use the modern Clipboard API if available
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showCopySuccess(button);
            }).catch(() => {
                fallbackCopyTextToClipboard(text, button);
            });
        } else {
            fallbackCopyTextToClipboard(text, button);
        }
    }
}

/**
 * Fallback copy method for older browsers
 * @param {string} text - Text to copy
 * @param {HTMLElement} button - The copy button
 */
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button);
        } else {
            showCopyError(button);
        }
    } catch (err) {
        showCopyError(button);
    }
    
    document.body.removeChild(textArea);
}

/**
 * Show copy success feedback
 * @param {HTMLElement} button - The copy button
 */
function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove('copied');
    }, 2000);
}

/**
 * Show copy error feedback
 * @param {HTMLElement} button - The copy button
 */
function showCopyError(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-times"></i> Failed';
    button.style.background = '#dc3545';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = '';
    }, 2000);
}

/**
 * Add keyboard navigation support
 */
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        // Don't interfere with typing in form fields
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch(event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                if (currentStepNumber > 1) {
                    changeStep(-1);
                }
                break;
            case 'ArrowRight':
                event.preventDefault();
                if (currentStepNumber < totalSteps) {
                    changeStep(1);
                }
                break;
            case 'Home':
                event.preventDefault();
                goToStep(1);
                break;
            case 'End':
                event.preventDefault();
                goToStep(totalSteps);
                break;
            case 'Escape':
                event.preventDefault();
                scrollToTop();
                break;
        }
    });
}

/**
 * Scroll to top of the page
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Add scroll to top functionality
 */
function addScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #007bff, #0056b3);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    scrollButton.onclick = scrollToTop;
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Add hover effect
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.4)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.3)';
    });
}

/**
 * Show completion message
 */
function showCompletionMessage() {
    const completionModal = document.createElement('div');
    completionModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 500px;
        margin: 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <div style="font-size: 4rem; color: #28a745; margin-bottom: 20px;">
            <i class="fas fa-check-circle"></i>
        </div>
        <h2 style="color: #2c3e50; margin-bottom: 15px;">Congratulations! 🎉</h2>
        <p style="color: #6c757d; font-size: 1.1rem; margin-bottom: 30px;">
            You've successfully completed the DAO Authentication Provider setup guide. 
            Your Spring Boot application is now secured with database-driven authentication!
        </p>
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <button onclick="this.closest('.completion-modal').remove()" 
                    style="padding: 12px 24px; background: linear-gradient(135deg, #007bff, #0056b3); 
                           color: white; border: none; border-radius: 25px; cursor: pointer; 
                           font-weight: 600; text-transform: uppercase; letter-spacing: 1px;
                           transition: all 0.3s ease;">
                <i class="fas fa-times"></i> Close
            </button>
            <button onclick="goToStep(1); this.closest('.completion-modal').remove();" 
                    style="padding: 12px 24px; background: linear-gradient(135deg, #28a745, #1e7e34); 
                           color: white; border: none; border-radius: 25px; cursor: pointer; 
                           font-weight: 600; text-transform: uppercase; letter-spacing: 1px;
                           transition: all 0.3s ease;">
                <i class="fas fa-redo"></i> Start Over
            </button>
        </div>
    `;
    
    completionModal.className = 'completion-modal';
    completionModal.appendChild(modalContent);
    document.body.appendChild(completionModal);
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-30px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .completion-modal button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    // Close modal when clicking outside
    completionModal.addEventListener('click', function(event) {
        if (event.target === completionModal) {
            completionModal.remove();
        }
    });
    
    // Close modal with Escape key
    const escapeHandler = function(event) {
        if (event.key === 'Escape') {
            completionModal.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

/**
 * Add smooth transitions for step changes
 */
function addStepTransitions() {
    const style = document.createElement('style');
    style.textContent = `
        .step {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .step:not(.active) {
            opacity: 0;
            transform: translateY(20px);
        }
        .step.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize tooltips for interactive elements
 */
function initializeTooltips() {
    // Add tooltip for copy buttons
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.title = 'Copy code to clipboard';
    });
    
    // Add tooltips for navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.title = 'Go to previous step (←)';
    if (nextBtn) nextBtn.title = 'Go to next step (→)';
}

/**
 * Add progress persistence (remember user's progress)
 */
function addProgressPersistence() {
    // Save current step to localStorage
    const saveProgress = () => {
        try {
            localStorage.setItem('dao-auth-guide-step', currentStepNumber.toString());
        } catch (e) {
            // localStorage not available, ignore
        }
    };
    
    // Load saved progress
    const loadProgress = () => {
        try {
            const savedStep = localStorage.getItem('dao-auth-guide-step');
            if (savedStep) {
                const stepNumber = parseInt(savedStep, 10);
                if (stepNumber >= 1 && stepNumber <= totalSteps) {
                    goToStep(stepNumber);
                }
            }
        } catch (e) {
            // localStorage not available, ignore
        }
    };
    
    // Load progress on page load
    loadProgress();
    
    // Save progress on step change
    const originalGoToStep = goToStep;
    goToStep = function(stepNumber) {
        originalGoToStep(stepNumber);
        saveProgress();
    };
}

// Initialize additional features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addStepTransitions();
    initializeTooltips();
    addProgressPersistence();
});

// Export functions for global access
window.changeStep = changeStep;
window.goToStep = goToStep;
window.copyCode = copyCode;