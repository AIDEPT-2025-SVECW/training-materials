// Spring Boot Circular Dependency Tutorial - JavaScript
// Author: Interactive Tutorial System
// Purpose: Handle all interactive features and demonstrations

class CircularDependencyTutorial {
    constructor() {
        this.currentProgress = 0;
        this.sections = document.querySelectorAll('.section');
        this.progressBar = document.getElementById('progressBar');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupProgressTracking();
        this.setupSmoothScrolling();
        console.log('Spring Boot Circular Dependency Tutorial Loaded! 🚀');
    }

    setupEventListeners() {
        // Progress tracking
        window.addEventListener('scroll', () => this.updateProgress());
        
        // Intersection Observer for sections
        this.setupIntersectionObserver();
    }

    setupProgressTracking() {
        // Update progress as user scrolls
        this.updateProgress();
    }

    updateProgress() {
        const scrolled = window.pageYOffset;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = Math.min((scrolled / maxScroll) * 100, 100);
        this.progressBar.style.width = progress + '%';
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Circular Dependency Demonstration Functions
class DependencyDemonstrator {
    constructor() {
        this.diagrams = {
            serviceA: document.getElementById('serviceA'),
            serviceB: document.getElementById('serviceB'),
            serviceC: document.getElementById('serviceC'),
            arrow1: document.getElementById('arrow1'),
            arrow2: document.getElementById('arrow2')
        };
    }

    showCircularDependency() {
        // Add error styling with animation
        Object.values(this.diagrams).forEach(element => {
            if (element) {
                element.classList.add('error');
            }
        });

        // Show error message with delay
        setTimeout(() => {
            this.showModal(
                '❌ Circular Dependency Detected!',
                'ServiceA → ServiceB → ServiceA creates a cycle that prevents proper initialization.\n\n' +
                'This will cause a BeanCurrentlyInCreationException during Spring context startup.',
                'error'
            );
        }, 500);
    }

    resetDiagram() {
        const elements = ['serviceA', 'serviceB', 'serviceC', 'arrow1', 'arrow2'];
        elements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.remove('error', 'success');
            }
        });
    }

    showModal(title, message, type) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;

        // Create modal content
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        `;

        const iconColor = type === 'error' ? '#e53e3e' : '#38a169';
        modal.innerHTML = `
            <h3 style="color: ${iconColor}; margin-bottom: 15px;">${title}</h3>
            <p style="margin-bottom: 20px; line-height: 1.6;">${message}</p>
            <button onclick="this.closest('.modal-overlay').remove()" 
                    style="background: ${iconColor}; color: white; border: none; 
                           padding: 12px 24px; border-radius: 25px; cursor: pointer; 
                           font-weight: bold; transition: all 0.3s ease;">
                Close
            </button>
        `;

        overlay.className = 'modal-overlay';
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Remove modal when clicking outside
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }
}

// Tab Management System
class TabManager {
    constructor() {
        this.activeTab = 'lazy';
        this.setupTabs();
    }

    setupTabs() {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.textContent.toLowerCase().replace(/[^a-z]/g, '');
                this.showTab(tabName, e.target);
            });
        });
    }

    showTab(tabName, clickedTab) {
        // Hide all tab contents
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Remove active class from all tabs
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected tab content
        const targetContent = document.getElementById(tabName);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // Add active class to clicked tab
        if (clickedTab) {
            clickedTab.classList.add('active');
        }

        this.activeTab = tabName;
    }
}

// Solution Demonstrations
class SolutionDemonstrator {
    constructor() {
        this.animations = {
            fadeIn: 'opacity: 1; transform: translateY(0); transition: all 0.5s ease;',
            slideIn: 'transform: translateX(0); transition: transform 0.5s ease;'
        };
    }

    demonstrateLazy() {
        const demoDiv = document.getElementById('lazyDemo');
        const steps = [
            '1. ServiceA is created first',
            '2. ServiceB dependency is marked as @Lazy',
            '3. ServiceB is created only when first accessed',
            '4. Circular dependency is broken!'
        ];

        this.animateSteps(demoDiv, '@Lazy Solution', steps, 'success');
    }

    demonstrateSetter() {
        const demoDiv = document.getElementById('setterDemo');
        const steps = [
            '1. Beans are created without dependencies',
            '2. Dependencies are injected via setters',
            '3. Allows partial initialization',
            '4. Circular dependency is resolved!'
        ];

        this.animateSteps(demoDiv, 'Setter Injection Solution', steps, 'success');
    }

    demonstratePostConstruct() {
        const demoDiv = document.getElementById('postConstructDemo');
        const steps = [
            '1. Beans are created first',
            '2. @PostConstruct runs after bean creation',
            '3. Dependencies are set manually',
            '4. Initialization is completed successfully!'
        ];

        this.animateSteps(demoDiv, '@PostConstruct Solution', steps, 'success');
    }

    demonstrateRefactor() {
        const demoDiv = document.getElementById('refactorDemo');
        const steps = [
            '1. Extract common functionality',
            '2. Create separate service for shared logic',
            '3. Both services depend on common service',
            '4. No circular dependency exists!'
        ];

        this.animateSteps(demoDiv, 'Refactoring Solution', steps, 'success');
    }

    demonstrateApplicationContext() {
        const demoDiv = document.getElementById('applicationContextDemo');
        const steps = [
            '1. One service uses ApplicationContext',
            '2. Dependencies are retrieved dynamically',
            '3. No direct dependency injection',
            '4. Circular dependency is avoided!'
        ];

        this.animateSteps(demoDiv, 'ApplicationContext Solution', steps, 'success');
    }

    animateSteps(container, title, steps, type) {
        const bgColor = type === 'success' ? '#c6f6d5' : '#fed7d7';
        const borderColor = type === 'success' ? '#38a169' : '#e53e3e';
        const icon = type === 'success' ? '✅' : '❌';

        container.innerHTML = `
            <div style="background: ${bgColor}; padding: 20px; border-radius: 8px; 
                        border: 2px solid ${borderColor}; opacity: 0; transform: translateY(20px);">
                <strong>${icon} ${title}:</strong><br>
                <div class="steps-container">
                    ${steps.map((step, index) => 
                        `<div class="step" style="opacity: 0; transform: translateX(-20px); 
                                                  margin: 8px 0; transition: all 0.3s ease ${index * 0.2}s;">
                            ${step}
                        </div>`
                    ).join('')}
                </div>
            </div>
        `;

        // Animate container
        setTimeout(() => {
            container.firstElementChild.style.opacity = '1';
            container.firstElementChild.style.transform = 'translateY(0)';
        }, 100);

        // Animate steps
        const stepElements = container.querySelectorAll('.step');
        stepElements.forEach((step, index) => {
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateX(0)';
            }, 300 + (index * 200));
        });
    }
}

// Quiz System
class QuizManager {
    constructor() {
        this.questions = [
            {
                question: "Which annotation can help break circular dependencies by deferring bean initialization?",
                options: ["@Autowired", "@Lazy", "@Component", "@Service"],
                correct: 1,
                explanation: "@Lazy annotation helps break circular dependencies by deferring bean initialization."
            },
            {
                question: "What type of injection is preferred to avoid circular dependencies?",
                options: ["Field injection", "Constructor injection", "Setter injection", "Method injection"],
                correct: 2,
                explanation: "Setter injection allows Spring to create beans first and then inject dependencies, helping avoid circular dependencies."
            },
            {
                question: "Which exception is typically thrown when circular dependencies are detected?",
                options: ["NullPointerException", "BeanCurrentlyInCreationException", "IllegalStateException", "ClassNotFoundException"],
                correct: 1,
                explanation: "BeanCurrentlyInCreationException is thrown when Spring detects circular dependencies during bean creation."
            }
        ];
        this.currentQuestion = 0;
        this.score = 0;
    }

    selectAnswer(element, isCorrect) {
        // Remove previous selections
        const options = element.parentElement.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.classList.remove('correct', 'incorrect');
            option.style.pointerEvents = 'none';
        });

        // Add appropriate class with animation
        if (isCorrect) {
            element.classList.add('correct');
            this.score++;
            setTimeout(() => {
                this.showFeedback('🎉 Correct!', 
                    this.questions[this.currentQuestion].explanation, 'success');
            }, 200);
        } else {
            element.classList.add('incorrect');
            // Show correct answer
            const correctIndex = this.questions[this.currentQuestion].correct;
            options[correctIndex].classList.add('correct');
            
            setTimeout(() => {
                this.showFeedback('❌ Incorrect', 
                    this.questions[this.currentQuestion].explanation, 'error');
            }, 200);
        }

        // Re-enable after 3 seconds
        setTimeout(() => {
            options.forEach(option => {
                option.style.pointerEvents = 'auto';
            });
        }, 3000);
    }

    showFeedback(title, message, type) {
        const feedbackDiv = document.createElement('div');
        const bgColor = type === 'success' ? '#c6f6d5' : '#fed7d7';
        const borderColor = type === 'success' ? '#38a169' : '#e53e3e';
        
        feedbackDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            border: 2px solid ${borderColor};
            padding: 20px;
            border-radius: 10px;
            max-width: 300px;
            z-index: 1000;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        feedbackDiv.innerHTML = `
            <strong style="color: ${borderColor};">${title}</strong><br>
            <p style="margin: 10px 0 0 0; line-height: 1.4;">${message}</p>
        `;

        document.body.appendChild(feedbackDiv);

        // Animate in
        setTimeout(() => {
            feedbackDiv.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 4 seconds
        setTimeout(() => {
            feedbackDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(feedbackDiv);
            }, 300);
        }, 4000);
    }

    nextQuestion() {
        this.currentQuestion++;
        if (this.currentQuestion < this.questions.length) {
            this.loadQuestion();
        } else {
            this.showFinalScore();
        }
    }

    loadQuestion() {
        const question = this.questions[this.currentQuestion];
        const quizContainer = document.querySelector('.quiz-container');
        
        quizContainer.innerHTML = `
            <div class="quiz-question">${question.question}</div>
            <div class="quiz-options">
                ${question.options.map((option, index) => 
                    `<div class="quiz-option" onclick="quiz.selectAnswer(this, ${index === question.correct})">
                        ${option}
                    </div>`
                ).join('')}
            </div>
        `;
    }

    showFinalScore() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const message = percentage >= 70 ? 
            '🎉 Excellent! You have a great understanding of circular dependencies!' :
            '📚 Good try! Review the material and try again to improve your score.';

        this.showFeedback(
            `Quiz Complete!`,
            `Score: ${this.score}/${this.questions.length} (${percentage}%)\n${message}`,
            percentage >= 70 ? 'success' : 'error'
        );
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoadTime: 0,
            interactionCount: 0,
            scrollDepth: 0
        };
        this.startTime = Date.now();
        this.setupMonitoring();
    }

    setupMonitoring() {
        // Track page load time
        window.addEventListener('load', () => {
            this.metrics.pageLoadTime = Date.now() - this.startTime;
            console.log(`Page loaded in ${this.metrics.pageLoadTime}ms`);
        });

        // Track interactions
        document.addEventListener('click', () => {
            this.metrics.interactionCount++;
        });

        // Track scroll depth
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            this.metrics.scrollDepth = Math.max(this.metrics.scrollDepth, (scrolled / maxScroll) * 100);
        });
    }

    getMetrics() {
        return this.metrics;
    }
}

// Global instances
let tutorial, demonstrator, tabManager, solutionDemo, quiz, performanceMonitor;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    tutorial = new CircularDependencyTutorial();
    demonstrator = new DependencyDemonstrator();
    tabManager = new TabManager();
    solutionDemo = new SolutionDemonstrator();
    quiz = new QuizManager();
    performanceMonitor = new PerformanceMonitor();
});

// Global functions for HTML compatibility
function showCircularDependency() {
    demonstrator.showCircularDependency();
}

function resetDiagram() {
    demonstrator.resetDiagram();
}

function showTab(tabName) {
    tabManager.showTab(tabName);
}

function demonstrateLazy() {
    solutionDemo.demonstrateLazy();
}

function demonstrateSetter() {
    solutionDemo.demonstrateSetter();
}

function demonstratePostConstruct() {
    solutionDemo.demonstratePostConstruct();
}

function demonstrateRefactor() {
    solutionDemo.demonstrateRefactor();
}

function demonstrateApplicationContext() {
    solutionDemo.demonstrateApplicationContext();
}

function selectAnswer(element, isCorrect) {
    quiz.selectAnswer(element, isCorrect);
}

// Export for module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CircularDependencyTutorial,
        DependencyDemonstrator,
        TabManager,
        SolutionDemonstrator,
        QuizManager,
        PerformanceMonitor
    };
}