// Dependency Injection Section JavaScript Extension
// This extends the existing SpringTutorial class

// Add these methods to the SpringTutorial class initialization
SpringTutorial.prototype.setupDependencyInjectionDemo = function() {
    this.setupInjectionTabs();
    this.setupCodeTabs();
    this.setupInjectionDemos();
    this.setupInjectionCards();
    this.injectionLogs = [];
    this.addInjectionLog('Dependency Injection tutorial loaded', 'success');
};

// Tab Management for Injection Types
SpringTutorial.prototype.setupInjectionTabs = function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.example-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => content.classList.remove('active'));
            const targetContent = document.getElementById(`${targetTab}-example`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Log tab switch
            this.addInjectionLog(`Switched to ${targetTab} injection example`, 'info');
        });
    });
};

// Code Example Tabs (Field vs Setter injection)
SpringTutorial.prototype.setupCodeTabs = function() {
    const codeTabButtons = document.querySelectorAll('.code-tab-btn');
    const codePreviews = document.querySelectorAll('.code-preview');

    codeTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCode = button.getAttribute('data-code');
            
            // Update active code tab button
            codeTabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active code preview
            codePreviews.forEach(preview => preview.classList.remove('active'));
            const targetPreview = document.getElementById(`${targetCode}-code`);
            if (targetPreview) {
                targetPreview.classList.add('active');
            }
        });
    });
};

// Individual Injection Demonstrations
SpringTutorial.prototype.setupInjectionDemos = function() {
    // Constructor Injection Demo
    const constructorBtn = document.getElementById('demoConstructor');
    if (constructorBtn) {
        constructorBtn.addEventListener('click', () => {
            this.demonstrateConstructorInjection();
        });
    }

    // Property Injection Demo
    const propertyBtn = document.getElementById('demoProperty');
    if (propertyBtn) {
        propertyBtn.addEventListener('click', () => {
            this.demonstratePropertyInjection();
        });
    }

    // Method Injection Demo
    const methodBtn = document.getElementById('demoMethod');
    if (methodBtn) {
        methodBtn.addEventListener('click', () => {
            this.demonstrateMethodInjection();
        });
    }

    // Interactive Injection Simulation
    const simulateBtn = document.getElementById('simulateInjection');
    if (simulateBtn) {
        simulateBtn.addEventListener('click', () => {
            this.simulateInjectionProcess();
        });
    }

    const resetBtn = document.getElementById('resetInjection');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            this.resetInjectionDemo();
        });
    }
};

// Injection Card Interactions
SpringTutorial.prototype.setupInjectionCards = function() {
    const injectionCards = document.querySelectorAll('.injection-card');
    
    injectionCards.forEach(card => {
        card.addEventListener('click', () => {
            const injectionType = card.getAttribute('data-injection');
            this.highlightInjectionType(injectionType);
            this.explainInjectionType(injectionType);
        });
    });
};

// Constructor Injection Demonstration
SpringTutorial.prototype.demonstrateConstructorInjection = function() {
    this.addInjectionLog('=== Constructor Injection Demo ===', 'info');
    this.addInjectionLog('Step 1: Spring creates dependency beans first', 'info');
    
    setTimeout(() => {
        this.addInjectionLog('✓ UserRepository instance created', 'success');
    }, 500);
    
    setTimeout(() => {
        this.addInjectionLog('✓ EmailService instance created', 'success');
    }, 1000);
    
    setTimeout(() => {
        this.addInjectionLog('Step 2: Spring calls UserService constructor', 'info');
        this.addInjectionLog('Constructor parameters: (UserRepository, EmailService)', 'info');
    }, 1500);
    
    setTimeout(() => {
        this.addInjectionLog('✓ UserService(userRepository, emailService) called', 'success');
        this.addInjectionLog('✓ Dependencies injected via constructor', 'success');
        this.addInjectionLog('✓ UserService instance ready - immutable dependencies!', 'success');
    }, 2000);

    // Visual animation
    this.animateConstructorInjection();
};

// Property Injection Demonstration
SpringTutorial.prototype.demonstratePropertyInjection = function() {
    this.addInjectionLog('=== Property Injection Demo ===', 'info');
    this.addInjectionLog('Step 1: Spring creates UserService with default constructor', 'info');
    
    setTimeout(() => {
        this.addInjectionLog('✓ UserService() called - no dependencies yet', 'success');
    }, 500);
    
    setTimeout(() => {
        this.addInjectionLog('Step 2: Spring injects dependencies via fields/setters', 'info');
    }, 1000);
    
    setTimeout(() => {
        this.addInjectionLog('✓ @Autowired userRepository field injected', 'success');
    }, 1500);
    
    setTimeout(() => {
        this.addInjectionLog('✓ @Autowired emailService field injected', 'success');
    }, 2000);
    
    setTimeout(() => {
        this.addInjectionLog('✓ Optional notificationService checked (required=false)', 'info');
        this.addInjectionLog('✓ UserService ready - dependencies can be changed', 'success');
    }, 2500);

    // Visual animation
    this.animatePropertyInjection();
};

// Method Injection Demonstration
SpringTutorial.prototype.demonstrateMethodInjection = function() {
    this.addInjectionLog('=== Method Injection Demo ===', 'info');
    this.addInjectionLog('Step 1: Spring creates UserService instance', 'info');
    
    setTimeout(() => {
        this.addInjectionLog('✓ UserService() constructor called', 'success');
    }, 500);
    
    setTimeout(() => {
        this.addInjectionLog('Step 2: Spring calls @Autowired methods', 'info');
    }, 1000);
    
    setTimeout(() => {
        this.addInjectionLog('✓ configureDependencies(userRepository, emailService) called', 'success');
        this.addInjectionLog('  - Custom initialization logic executed', 'info');
    }, 1500);
    
    setTimeout(() => {
        this.addInjectionLog('✓ configureAuditService(auditService) called', 'success');
        this.addInjectionLog('  - Optional dependency configured', 'info');
    }, 2000);
    
    setTimeout(() => {
        this.addInjectionLog('✓ UserService ready - complex initialization completed', 'success');
    }, 2500);

    // Visual animation
    this.animateMethodInjection();
};

// Simulate Complete Injection Process
SpringTutorial.prototype.simulateInjectionProcess = function() {
    this.addInjectionLog('=== Full Dependency Injection Simulation ===', 'info');
    this.resetInjectionVisuals();
    
    const steps = [
        { time: 500, action: () => this.highlightBean('demoUserRepository', 'Creating UserRepository...') },
        { time: 1000, action: () => this.highlightBean('demoEmailService', 'Creating EmailService...') },
        { time: 1500, action: () => this.highlightBean('demoUserService', 'Creating UserService...') },
        { time: 2000, action: () => this.showInjectionArrow('demoUserRepository', 'demoUserService', 'Injecting UserRepository') },
        { time: 2500, action: () => this.showInjectionArrow('demoEmailService', 'demoUserService', 'Injecting EmailService') },
        { time: 3000, action: () => this.completeInjection() }
    ];

    steps.forEach(step => {
        setTimeout(step.action, step.time);
    });
};

// Visual Animation Methods
SpringTutorial.prototype.animateConstructorInjection = function() {
    const visualization = document.querySelector('.bean-construction');
    if (visualization) {
        visualization.classList.add('animate-constructor');
        setTimeout(() => {
            visualization.classList.remove('animate-constructor');
        }, 3000);
    }
};

SpringTutorial.prototype.animatePropertyInjection = function() {
    const visualization = document.querySelector('.property-injection');
    if (visualization) {
        visualization.classList.add('animate-property');
        setTimeout(() => {
            visualization.classList.remove('animate-property');
        }, 3000);
    }
};

SpringTutorial.prototype.animateMethodInjection = function() {
    const visualization = document.querySelector('.method-injection');
    if (visualization) {
        visualization.classList.add('animate-method');
        setTimeout(() => {
            visualization.classList.remove('animate-method');
        }, 3000);
    }
};

// Interactive Demo Visual Methods
SpringTutorial.prototype.highlightBean = function(beanId, message) {
    const bean = document.getElementById(beanId);
    if (bean) {
        bean.classList.add('creating');
        this.addInjectionLog(`✓ ${message}`, 'success');
        
        setTimeout(() => {
            bean.classList.remove('creating');
            bean.classList.add('created');
        }, 800);
    }
};

SpringTutorial.prototype.showInjectionArrow = function(fromId, toId, message) {
    const fromBean = document.getElementById(fromId);
    const toBean = document.getElementById(toId);
    const arrowContainer = document.getElementById('injectionArrows');
    
    if (fromBean && toBean && arrowContainer) {
        const arrow = document.createElement('div');
        arrow.className = 'injection-arrow';
        
        // Calculate positions (simplified - you might need more complex positioning)
        const fromRect = fromBean.getBoundingClientRect();
        const toRect = toBean.getBoundingClientRect();
        const containerRect = arrowContainer.getBoundingClientRect();
        
        arrow.style.cssText = `
            position: absolute;
            width: 2px;
            height: ${Math.abs(toRect.top - fromRect.bottom)}px;
            background: linear-gradient(to bottom, #667eea, #764ba2);
            left: ${fromRect.left + fromRect.width/2 - containerRect.left}px;
            top: ${fromRect.bottom - containerRect.top}px;
            animation: drawArrow 0.5s ease-in-out;
        `;
        
        // Add arrow head
        const arrowHead = document.createElement('div');
        arrowHead.style.cssText = `
            position: absolute;
            bottom: -8px;
            left: -4px;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 8px solid #764ba2;
        `;
        arrow.appendChild(arrowHead);
        
        arrowContainer.appendChild(arrow);
        this.addInjectionLog(`→ ${message}`, 'info');
        
        // Remove arrow after animation
        setTimeout(() => {
            if (arrow.parentNode) {
                arrow.parentNode.removeChild(arrow);
            }
        }, 2000);
    }
};

SpringTutorial.prototype.completeInjection = function() {
    const userService = document.getElementById('demoUserService');
    if (userService) {
        userService.classList.add('injection-complete');
    }
    this.addInjectionLog('✓ All dependencies injected successfully!', 'success');
    this.addInjectionLog('✓ UserService is ready for use', 'success');
};

SpringTutorial.prototype.resetInjectionDemo = function() {
    // Reset visual states
    this.resetInjectionVisuals();
    
    // Clear logs
    this.injectionLogs = [];
    this.updateInjectionLogs();
    
    // Clear arrows
    const arrowContainer = document.getElementById('injectionArrows');
    if (arrowContainer) {
        arrowContainer.innerHTML = '';
    }
    
    this.addInjectionLog('Injection demo reset', 'info');
};

SpringTutorial.prototype.resetInjectionVisuals = function() {
    const demoBeans = document.querySelectorAll('.demo-bean');
    demoBeans.forEach(bean => {
        bean.classList.remove('creating', 'created', 'injection-complete');
    });
};

// Injection Type Highlighting
SpringTutorial.prototype.highlightInjectionType = function(injectionType) {
    const cards = document.querySelectorAll('.injection-card');
    cards.forEach(card => {
        card.classList.remove('highlighted');
    });
    
    const targetCard = document.querySelector(`[data-injection="${injectionType}"]`);
    if (targetCard) {
        targetCard.classList.add('highlighted');
        setTimeout(() => {
            targetCard.classList.remove('highlighted');
        }, 2000);
    }
};

SpringTutorial.prototype.explainInjectionType = function(injectionType) {
    const explanations = {
        constructor: 'Constructor injection is the preferred method. Dependencies are provided when the object is created, ensuring immutability and that all required dependencies are available.',
        property: 'Property injection uses @Autowired on fields or setter methods. It allows for optional dependencies and circular dependency resolution but reduces immutability.',
        method: 'Method injection allows complex initialization scenarios where multiple dependencies need to be configured together with custom logic.'
    };
    
    this.addInjectionLog(`${injectionType.toUpperCase()} INJECTION: ${explanations[injectionType]}`, 'info');
};

// Logging Methods for Injection
SpringTutorial.prototype.addInjectionLog = function(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    this.injectionLogs.push({ message, type, timestamp });
    this.updateInjectionLogs();
};

SpringTutorial.prototype.updateInjectionLogs = function() {
    const logsContainer = document.getElementById('injectionLogs');
    if (logsContainer) {
        logsContainer.innerHTML = this.injectionLogs
            .slice(-15) // Show last 15 logs for injection section
            .map(log => `<div class="log-entry ${log.type}">[${log.timestamp}] ${log.message}</div>`)
            .join('');
        logsContainer.scrollTop = logsContainer.scrollHeight;
    }
};

// Extend the original init method to include dependency injection setup
const originalInit = SpringTutorial.prototype.init;
SpringTutorial.prototype.init = function() {
    originalInit.call(this);
    this.setupDependencyInjectionDemo();
};

// Add CSS animations for injection demonstrations
document.addEventListener('DOMContentLoaded', () => {
    const injectionStyles = document.createElement('style');
    injectionStyles.textContent = `
        /* Constructor Injection Animation */
        .animate-constructor .constructor-params {
            animation: slideInFromTop 1s ease-out;
        }
        
        .animate-constructor .target-bean {
            animation: constructorBuild 1s ease-out 0.5s both;
        }
        
        /* Property Injection Animation */
        .animate-property .target-bean {
            animation: fadeIn 0.5s ease-out;
        }
        
        .animate-property .property {
            animation: propertyInject 0.5s ease-out;
        }
        
        .animate-property .property:nth-child(1) { animation-delay: 0.5s; }
        .animate-property .property:nth-child(2) { animation-delay: 1s; }
        .animate-property .property:nth-child(3) { animation-delay: 1.5s; }
        
        /* Method Injection Animation */
        .animate-method .method {
            animation: methodCall 0.8s ease-out;
        }
        
        .animate-method .method:nth-child(1) { animation-delay: 0.5s; }
        .animate-method .method:nth-child(2) { animation-delay: 1s; }
        
        /* Demo Bean States */
        .demo-bean {
            transition: all 0.3s ease;
            border: 2px solid #e2e8f0;
            background: #f8fafc;
        }
        
        .demo-bean.creating {
            border-color: #fbbf24;
            background: #fef3c7;
            transform: scale(1.05);
            animation: pulse 0.8s ease-in-out;
        }
        
        .demo-bean.created {
            border-color: #10b981;
            background: #d1fae5;
        }
        
        .demo-bean.injection-complete {
            border-color: #8b5cf6;
            background: #ede9fe;
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        }
        
        /* Injection Card Highlighting */
        .injection-card.highlighted {
            transform: scale(1.05);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            border-color: #667eea;
        }
        
        /* Arrow Animation */
        @keyframes drawArrow {
            from {
                height: 0;
                opacity: 0;
            }
            to {
                height: var(--arrow-height, 50px);
                opacity: 1;
            }
        }
        
        @keyframes slideInFromTop {
            from {
                transform: translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes constructorBuild {
            from {
                transform: scale(0.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes propertyInject {
            from {
                transform: translateX(-20px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes methodCall {
            0% {
                transform: scale(1);
                background-color: inherit;
            }
            50% {
                transform: scale(1.1);
                background-color: #e0e7ff;
            }
            100% {
                transform: scale(1);
                background-color: inherit;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1.05); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(injectionStyles);
});