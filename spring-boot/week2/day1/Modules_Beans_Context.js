// Spring Framework Interactive Tutorial JavaScript
class SpringTutorial {
    constructor() {
        this.currentSection = 'modules';
        this.lifecycleInterval = null;
        this.currentStage = 0;
        this.isPaused = false;
        this.contextLogs = [];
        this.beanLogs = [];
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupModuleInteractions();
        this.setupContextDemo();
        this.setupBeansDemo();
        this.addInitialLogs();
    }

    // Navigation System
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const sections = document.querySelectorAll('.section');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetSection = button.getAttribute('data-section');
                
                // Update active nav button
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update active section
                sections.forEach(section => section.classList.remove('active'));
                document.getElementById(targetSection).classList.add('active');
                
                this.currentSection = targetSection;
                
                // Reset any running demos when switching sections
                this.resetDemos();
            });
        });
    }

    // Spring Modules Interactive Features
    setupModuleInteractions() {
        const modules = document.querySelectorAll('.module');
        const moduleInfo = document.getElementById('module-info');

        const moduleDetails = {
            core: {
                title: 'Spring Core Module',
                description: 'The foundation of the Spring Framework, providing the fundamental parts of the framework including the IoC and Dependency Injection features.',
                features: [
                    'Inversion of Control (IoC) Container',
                    'Dependency Injection',
                    'Bean Factory',
                    'Application Context',
                    'Resource Management'
                ]
            },
            beans: {
                title: 'Spring Beans Module',
                description: 'Provides the BeanFactory, which is a sophisticated implementation of the factory pattern that removes the need for programmatic singletons.',
                features: [
                    'Bean Definition and Configuration',
                    'Bean Lifecycle Management',
                    'Bean Scopes (Singleton, Prototype, etc.)',
                    'Bean Post Processors',
                    'Circular Dependency Resolution'
                ]
            },
            context: {
                title: 'Spring Context Module',
                description: 'Builds on the solid base provided by the Core and Beans modules and adds support for internationalization, event propagation, resource loading, and transparent creation of contexts.',
                features: [
                    'ApplicationContext Interface',
                    'Event Handling and Publishing',
                    'Resource Loading and Access',
                    'Internationalization Support',
                    'Validation Framework'
                ]
            },
            expression: {
                title: 'Spring Expression Language (SpEL)',
                description: 'Provides a powerful expression language for querying and manipulating an object graph at runtime.',
                features: [
                    'Runtime Expression Evaluation',
                    'Property Access and Method Invocation',
                    'Collection Projection and Selection',
                    'Template Expressions',
                    'Bean Reference Resolution'
                ]
            },
            data: {
                title: 'Data Access/Integration',
                description: 'Provides comprehensive data access and integration capabilities including JDBC, ORM, and transaction management.',
                features: [
                    'JDBC Template and Support',
                    'ORM Integration (Hibernate, JPA)',
                    'Transaction Management',
                    'DAO Exception Hierarchy',
                    'Message Queue Integration'
                ]
            },
            web: {
                title: 'Spring Web Module',
                description: 'Provides comprehensive web development capabilities including Spring MVC, REST support, and web services.',
                features: [
                    'Spring MVC Framework',
                    'RESTful Web Services',
                    'WebSocket Support',
                    'Reactive Programming (WebFlux)',
                    'Web Security Integration'
                ]
            },
            aop: {
                title: 'Aspect-Oriented Programming (AOP)',
                description: 'Provides aspect-oriented programming implementation allowing you to define method interceptors and pointcuts.',
                features: [
                    'Cross-cutting Concerns',
                    'Method Interception',
                    'Pointcut Expressions',
                    'Advice Types (Before, After, Around)',
                    'Proxy-based AOP'
                ]
            },
            test: {
                title: 'Spring Test Module',
                description: 'Supports the testing of Spring components with JUnit or TestNG frameworks.',
                features: [
                    'Integration Testing Support',
                    'Mock Objects and Test Doubles',
                    'Context Caching',
                    'Transaction Management in Tests',
                    'Spring Boot Test Annotations'
                ]
            }
        };

        modules.forEach(module => {
            module.addEventListener('click', () => {
                const moduleType = module.getAttribute('data-module');
                const details = moduleDetails[moduleType];
                
                if (details) {
                    moduleInfo.innerHTML = `
                        <h3>${details.title}</h3>
                        <p>${details.description}</p>
                        <h4>Key Features:</h4>
                        <ul>
                            ${details.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    `;
                }
                
                // Add visual feedback
                modules.forEach(m => m.style.transform = 'scale(1)');
                module.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    module.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }

    // Application Context Demo
    setupContextDemo() {
        const features = document.querySelectorAll('.feature');
        const beans = document.querySelectorAll('.bean');
        const contextButtons = {
            createContext: document.getElementById('createContext'),
            loadBeans: document.getElementById('loadBeans'),
            injectDependencies: document.getElementById('injectDependencies'),
            publishEvent: document.getElementById('publishEvent'),
            destroyContext: document.getElementById('destroyContext')
        };

        // Feature interactions
        features.forEach(feature => {
            feature.addEventListener('click', () => {
                const featureType = feature.getAttribute('data-feature');
                this.demonstrateFeature(featureType);
            });
        });

        // Context demo buttons
        contextButtons.createContext.addEventListener('click', () => {
            this.createApplicationContext();
        });

        contextButtons.loadBeans.addEventListener('click', () => {
            this.loadBeans();
        });

        contextButtons.injectDependencies.addEventListener('click', () => {
            this.injectDependencies();
        });

        contextButtons.publishEvent.addEventListener('click', () => {
            this.publishEvent();
        });

        contextButtons.destroyContext.addEventListener('click', () => {
            this.destroyContext();
        });
    }

    // Beans & Lifecycle Demo
    setupBeansDemo() {
        const lifecycleButtons = {
            start: document.getElementById('startLifecycle'),
            pause: document.getElementById('pauseLifecycle'),
            reset: document.getElementById('resetLifecycle')
        };

        const scopes = document.querySelectorAll('.scope');

        // Lifecycle control buttons
        lifecycleButtons.start.addEventListener('click', () => {
            this.startBeanLifecycle();
        });

        lifecycleButtons.pause.addEventListener('click', () => {
            this.pauseBeanLifecycle();
        });

        lifecycleButtons.reset.addEventListener('click', () => {
            this.resetBeanLifecycle();
        });

        // Bean scope interactions
        scopes.forEach(scope => {
            scope.addEventListener('click', () => {
                const scopeType = scope.getAttribute('data-scope');
                this.demonstrateScope(scopeType);
            });
        });
    }

    // Context Demo Methods
    createApplicationContext() {
        this.addContextLog('Creating Spring Application Context...', 'info');
        setTimeout(() => {
            this.addContextLog('✓ ApplicationContext created successfully', 'success');
            this.addContextLog('Context ready to load bean definitions', 'info');
        }, 1000);
    }

    loadBeans() {
        const beans = document.querySelectorAll('.bean');
        this.addContextLog('Loading bean definitions...', 'info');
        
        beans.forEach((bean, index) => {
            setTimeout(() => {
                bean.classList.add('active');
                this.addContextLog(`✓ Bean '${bean.textContent}' loaded`, 'success');
            }, (index + 1) * 500);
        });
        
        setTimeout(() => {
            this.addContextLog('All beans loaded successfully', 'success');
        }, beans.length * 500 + 200);
    }

    injectDependencies() {
        this.addContextLog('Injecting dependencies...', 'info');
        setTimeout(() => {
            this.addContextLog('UserService <- UserRepository (injected)', 'success');
        }, 500);
        setTimeout(() => {
            this.addContextLog('UserService <- EmailService (injected)', 'success');
        }, 1000);
        setTimeout(() => {
            this.addContextLog('✓ All dependencies injected successfully', 'success');
        }, 1500);
    }

    publishEvent() {
        this.addContextLog('Publishing application event...', 'info');
        setTimeout(() => {
            this.addContextLog('Event: UserRegistrationEvent published', 'info');
            this.addContextLog('EmailService listening to event', 'info');
            this.addContextLog('✓ Welcome email sent to user', 'success');
        }, 800);
    }

    destroyContext() {
        const beans = document.querySelectorAll('.bean');
        this.addContextLog('Shutting down Application Context...', 'warning');
        
        beans.forEach((bean, index) => {
            setTimeout(() => {
                bean.classList.remove('active');
                this.addContextLog(`Bean '${bean.textContent}' destroyed`, 'warning');
            }, index * 300);
        });
        
        setTimeout(() => {
            this.addContextLog('✓ Application Context shut down', 'success');
            this.contextLogs = [];
        }, beans.length * 300 + 500);
    }

    demonstrateFeature(featureType) {
        const featureDescriptions = {
            di: 'Dependency Injection allows Spring to automatically provide dependencies to your beans, promoting loose coupling and easier testing.',
            lifecycle: 'Spring manages the complete lifecycle of beans from instantiation to destruction, calling initialization and cleanup methods.',
            events: 'Application Context supports event publishing and listening, enabling decoupled communication between components.',
            resources: 'Spring provides powerful resource loading capabilities for files, classpath resources, and URLs.'
        };

        this.addContextLog(`Feature Demo: ${featureDescriptions[featureType]}`, 'info');
    }

    // Bean Lifecycle Methods
    startBeanLifecycle() {
        if (this.lifecycleInterval) {
            clearInterval(this.lifecycleInterval);
        }
        
        this.currentStage = 0;
        this.isPaused = false;
        this.resetBeanLifecycleStages();
        this.addBeanLog('Starting bean lifecycle demonstration...', 'info');
        
        this.lifecycleInterval = setInterval(() => {
            if (!this.isPaused) {
                this.progressLifecycleStage();
            }
        }, 2000);
    }

    pauseBeanLifecycle() {
        this.isPaused = !this.isPaused;
        const pauseBtn = document.getElementById('pauseLifecycle');
        pauseBtn.textContent = this.isPaused ? 'Resume' : 'Pause';
        
        if (this.isPaused) {
            this.addBeanLog('Lifecycle demonstration paused', 'warning');
        } else {
            this.addBeanLog('Lifecycle demonstration resumed', 'info');
        }
    }

    resetBeanLifecycle() {
        if (this.lifecycleInterval) {
            clearInterval(this.lifecycleInterval);
            this.lifecycleInterval = null;
        }
        
        this.currentStage = 0;
        this.isPaused = false;
        this.resetBeanLifecycleStages();
        this.beanLogs = [];
        this.updateBeanLogs();
        
        const pauseBtn = document.getElementById('pauseLifecycle');
        pauseBtn.textContent = 'Pause';
        
        this.addBeanLog('Bean lifecycle demonstration reset', 'info');
    }

    progressLifecycleStage() {
        const stages = document.querySelectorAll('.stage');
        const stageMessages = [
            'Bean instantiation: Creating UserService object...',
            'Property population: Injecting UserRepository dependency...',
            'Initialization: Calling @PostConstruct method init()...',
            'Bean ready: UserService is now ready for use',
            'Destruction: Calling @PreDestroy method cleanup()...'
        ];

        if (this.currentStage < stages.length) {
            // Mark current stage as active
            stages[this.currentStage].classList.add('active');
            this.addBeanLog(stageMessages[this.currentStage], 'info');
            
            // Mark previous stage as completed
            if (this.currentStage > 0) {
                stages[this.currentStage - 1].classList.remove('active');
                stages[this.currentStage - 1].classList.add('completed');
            }
            
            this.currentStage++;
        } else {
            // Lifecycle complete
            stages[stages.length - 1].classList.remove('active');
            stages[stages.length - 1].classList.add('completed');
            this.addBeanLog('✓ Bean lifecycle completed', 'success');
            clearInterval(this.lifecycleInterval);
            this.lifecycleInterval = null;
        }
    }

    resetBeanLifecycleStages() {
        const stages = document.querySelectorAll('.stage');
        stages.forEach(stage => {
            stage.classList.remove('active', 'completed');
        });
    }

    demonstrateScope(scopeType) {
        const scopeDescriptions = {
            singleton: 'Singleton scope creates only one instance of the bean per Spring container. This is the default scope.',
            prototype: 'Prototype scope creates a new instance every time the bean is requested from the container.',
            request: 'Request scope creates one instance per HTTP request. Only valid in web-aware Spring ApplicationContext.',
            session: 'Session scope creates one instance per HTTP session. Only valid in web-aware Spring ApplicationContext.'
        };

        this.addBeanLog(`Scope Demo - ${scopeType.toUpperCase()}: ${scopeDescriptions[scopeType]}`, 'info');
        
        // Visual feedback
        const scopes = document.querySelectorAll('.scope');
        scopes.forEach(s => s.style.borderColor = '#e2e8f0');
        
        const selectedScope = document.querySelector(`[data-scope="${scopeType}"]`);
        selectedScope.style.borderColor = '#667eea';
        
        setTimeout(() => {
            selectedScope.style.borderColor = '#e2e8f0';
        }, 2000);
    }

    // Logging Methods
    addContextLog(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        this.contextLogs.push({ message, type, timestamp });
        this.updateContextLogs();
    }

    addBeanLog(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        this.beanLogs.push({ message, type, timestamp });
        this.updateBeanLogs();
    }

    updateContextLogs() {
        const logsContainer = document.getElementById('contextLogs');
        if (logsContainer) {
            logsContainer.innerHTML = this.contextLogs
                .slice(-10) // Show only last 10 logs
                .map(log => `<div class="log-entry ${log.type}">[${log.timestamp}] ${log.message}</div>`)
                .join('');
            logsContainer.scrollTop = logsContainer.scrollHeight;
        }
    }

    updateBeanLogs() {
        const logsContainer = document.getElementById('beanLogs');
        if (logsContainer) {
            logsContainer.innerHTML = this.beanLogs
                .slice(-10) // Show only last 10 logs
                .map(log => `<div class="log-entry ${log.type}">[${log.timestamp}] ${log.message}</div>`)
                .join('');
            logsContainer.scrollTop = logsContainer.scrollHeight;
        }
    }

    addInitialLogs() {
        this.addContextLog('Spring Framework Interactive Tutorial loaded', 'success');
        this.addContextLog('Ready to explore Spring concepts!', 'info');
        this.addBeanLog('Bean lifecycle tutorial ready', 'success');
        this.addBeanLog('Click "Start Bean Lifecycle" to begin demonstration', 'info');
    }

    resetDemos() {
        // Reset context demo
        const beans = document.querySelectorAll('.bean');
        beans.forEach(bean => bean.classList.remove('active'));
        
        // Reset lifecycle demo
        this.resetBeanLifecycle();
        
        // Clear logs when switching sections
        if (this.currentSection !== 'context') {
            this.contextLogs = [];
            this.updateContextLogs();
        }
        
        if (this.currentSection !== 'beans') {
            this.beanLogs = [];
            this.updateBeanLogs();
        }
    }

    // Utility method for smooth animations
    animateElement(element, animation, duration = 300) {
        element.style.animation = `${animation} ${duration}ms ease-in-out`;
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }
}

// Initialize the tutorial when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SpringTutorial();
});

// Add some additional interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.module, .feature, .scope, .demo-btn, .lifecycle-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.demo-btn, .lifecycle-btn, .nav-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(255,255,255,0.7);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});