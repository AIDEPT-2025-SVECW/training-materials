// Spring Framework Interactive Presentation JavaScript
// Author: Assistant
// Description: Handles navigation, animations, and interactive demos

class SpringFrameworkPresentation {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 7;
        this.slides = [];
        this.navigationButtons = [];
        this.init();
    }

    init() {
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;
        this.createNavigation();
        this.updateSlideCounter();
        this.updateProgressBar();
        this.updateNavigationButtons();
        this.updateControlButtons();
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Add touch/swipe support for mobile
        this.addTouchSupport();
    }

    createNavigation() {
        const navigationContainer = document.getElementById('navigation');
        const slideNames = [
            'Introduction',
            'What is Framework',
            'Why Spring',
            'DI & IoC',
            'Why DI',
            'Coupling',
            'IoC Solutions'
        ];

        slideNames.forEach((name, index) => {
            const button = document.createElement('button');
            button.className = 'nav-btn';
            if (index === 0) button.classList.add('active');
            button.textContent = name;
            button.onclick = () => this.goToSlide(index);
            navigationContainer.appendChild(button);
            this.navigationButtons.push(button);
        });
    }

    goToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= this.totalSlides) return;

        // Hide current slide
        this.slides[this.currentSlide].classList.remove('active');
        this.navigationButtons[this.currentSlide].classList.remove('active');

        // Show new slide
        this.currentSlide = slideIndex;
        this.slides[this.currentSlide].classList.add('active');
        this.navigationButtons[this.currentSlide].classList.add('active');

        // Update UI elements
        this.updateSlideCounter();
        this.updateProgressBar();
        this.updateControlButtons();

        // Scroll to top of the slide
        this.slides[this.currentSlide].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    updateSlideCounter() {
        document.getElementById('currentSlide').textContent = this.currentSlide + 1;
        document.getElementById('totalSlides').textContent = this.totalSlides;
    }

    updateProgressBar() {
        const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
        document.getElementById('progressFill').style.width = progress + '%';
    }

    updateControlButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        prevBtn.disabled = this.currentSlide === 0;
        nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }

    updateNavigationButtons() {
        this.navigationButtons.forEach((btn, index) => {
            btn.classList.toggle('active', index === this.currentSlide);
        });
    }

    addTouchSupport() {
        let startX = 0;
        let startY = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;

            const diffX = startX - endX;
            const diffY = startY - endY;

            // Only handle horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide(); // Swipe left - next slide
                } else {
                    this.previousSlide(); // Swipe right - previous slide
                }
            }

            startX = 0;
            startY = 0;
        });
    }
}

// Interactive Demo Functions
function showTightCoupling() {
    const output = document.getElementById('demoOutput');
    const demoText = `
🔴 TIGHT COUPLING EXAMPLE:
class CoffeeShop {
    private EspressoMachine machine = new EspressoMachine(); // Hard-coded!
    
    public Coffee makeCoffee() {
        return machine.brew(); // Can't change machine type!
    }
}

❌ Problems: Hard to test, can't switch to different machines, rigid design
    `;
    
    output.innerHTML = `<pre style="text-align: left; white-space: pre-wrap; font-size: 12px;">${demoText}</pre>`;
    
    // Add animation effect
    output.style.background = 'rgba(255, 107, 107, 0.3)';
    setTimeout(() => {
        output.style.background = 'rgba(0, 0, 0, 0.2)';
    }, 2000);
}

function showLooseCoupling() {
    const output = document.getElementById('demoOutput');
    const demoText = `
🟢 LOOSE COUPLING EXAMPLE (DI):
class CoffeeShop {
    private CoffeeMachine machine; // Interface/Abstract
    
    public CoffeeShop(CoffeeMachine machine) {
        this.machine = machine; // Injected dependency!
    }
    
    public Coffee makeCoffee() {
        return machine.brew(); // Can be any machine type!
    }
}

✅ Benefits: Easy to test, flexible, can inject EspressoMachine, DripMachine, or MockMachine
    `;
    
    output.innerHTML = `<pre style="text-align: left; white-space: pre-wrap; font-size: 12px;">${demoText}</pre>`;
    
    // Add animation effect
    output.style.background = 'rgba(76, 175, 80, 0.3)';
    setTimeout(() => {
        output.style.background = 'rgba(0, 0, 0, 0.2)';
    }, 2000);
}

// Spring Container Simulation Functions
let containerState = {
    started: false,
    beansCreated: false,
    dependenciesInjected: false
};

function simulateSpringContainer() {
    const output = document.getElementById('springDemo');
    containerState.started = true;
    
    output.innerHTML = `
        <div style="text-align: left;">
            <h4>🚀 Spring Container Starting...</h4>
            <p>📋 Reading configuration...</p>
            <p>🔍 Scanning for components...</p>
            <p>✅ Spring Container is ready!</p>
            <p><em>Container initialized with ApplicationContext</em></p>
        </div>
    `;
    
    // Add green glow effect
    output.style.background = 'rgba(76, 175, 80, 0.2)';
    output.style.border = '2px solid #4CAF50';
    
    setTimeout(() => {
        output.style.background = 'rgba(0, 0, 0, 0.2)';
        output.style.border = 'none';
    }, 3000);
}

function showBeanCreation() {
    if (!containerState.started) {
        alert('Please start the Spring Container first!');
        return;
    }
    
    const output = document.getElementById('springDemo');
    containerState.beansCreated = true;
    
    // Simulate progressive bean creation
    output.innerHTML = '<div style="text-align: left;"><h4>🏭 Creating Beans...</h4></div>';
    
    const steps = [
        '📦 Creating PaymentService bean...',
        '📦 Creating EmailService bean...',
        '📦 Creating UserService bean...',
        '📦 Creating OrderService bean...',
        '✅ All beans created successfully!'
    ];
    
    let stepIndex = 0;
    const interval = setInterval(() => {
        const currentContent = output.innerHTML;
        output.innerHTML = currentContent + '<p>' + steps[stepIndex] + '</p>';
        stepIndex++;
        
        if (stepIndex >= steps.length) {
            clearInterval(interval);
            output.style.background = 'rgba(33, 150, 243, 0.2)';
            setTimeout(() => {
                output.style.background = 'rgba(0, 0, 0, 0.2)';
            }, 2000);
        }
    }, 800);
}

function showDependencyInjection() {
    if (!containerState.beansCreated) {
        alert('Please create beans first!');
        return;
    }
    
    const output = document.getElementById('springDemo');
    containerState.dependenciesInjected = true;
    
    output.innerHTML = `
        <div style="text-align: left;">
            <h4>🔗 Injecting Dependencies...</h4>
            <p>💉 OrderService ← PaymentService (injected)</p>
            <p>💉 UserService ← EmailService (injected)</p>
            <p>💉 ShoppingController ← OrderService (injected)</p>
            <p>✅ All dependencies resolved!</p>
            <br>
            <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px;">
                <strong>🎉 Spring Magic Complete!</strong><br>
                Your application is ready with all objects<br>
                created and dependencies wired automatically!
            </div>
        </div>
    `;
    
    // Add celebratory effect
    output.style.background = 'linear-gradient(45deg, rgba(76, 175, 80, 0.3), rgba(33, 150, 243, 0.3))';
    output.style.border = '2px solid #4CAF50';
    
    setTimeout(() => {
        output.style.background = 'rgba(0, 0, 0, 0.2)';
        output.style.border = 'none';
    }, 4000);
}

// Auto-play functionality (optional)
class AutoPlay {
    constructor(presentation) {
        this.presentation = presentation;
        this.isPlaying = false;
        this.interval = null;
        this.delay = 8000; // 8 seconds per slide
    }

    start() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.interval = setInterval(() => {
            if (this.presentation.currentSlide < this.presentation.totalSlides - 1) {
                this.presentation.nextSlide();
            } else {
                this.stop(); // Stop at the last slide
            }
        }, this.delay);
    }

    stop() {
        this.isPlaying = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    toggle() {
        if (this.isPlaying) {
            this.stop();
        } else {
            this.start();
        }
    }
}

// Theme Toggle (bonus feature)
class ThemeManager {
    constructor() {
        this.isDarkMode = false;
        this.init();
    }

    init() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('springPresentationTheme');
        if (savedTheme === 'dark') {
            this.enableDarkMode();
        }
    }

    toggleTheme() {
        if (this.isDarkMode) {
            this.enableLightMode();
        } else {
            this.enableDarkMode();
        }
    }

    enableDarkMode() {
        document.body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
        this.isDarkMode = true;
        localStorage.setItem('springPresentationTheme', 'dark');
    }

    enableLightMode() {
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        this.isDarkMode = false;
        localStorage.setItem('springPresentationTheme', 'light');
    }
}

// Global variables and initialization
let presentation;
let autoPlay;
let themeManager;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    presentation = new SpringFrameworkPresentation();
    autoPlay = new AutoPlay(presentation);
    themeManager = new ThemeManager();
    
    console.log('🌱 Spring Framework Presentation Loaded Successfully!');
    console.log('📘 Use arrow keys to navigate slides');
    console.log('📱 Swipe left/right on mobile devices');
});

// Export functions for HTML onclick handlers
window.nextSlide = () => presentation.nextSlide();
window.previousSlide = () => presentation.previousSlide();
window.showTightCoupling = showTightCoupling;
window.showLooseCoupling = showLooseCoupling;
window.simulateSpringContainer = simulateSpringContainer;
window.showBeanCreation = showBeanCreation;
window.showDependencyInjection = showDependencyInjection;

// Additional utility functions
window.goToSlide = (index) => presentation.goToSlide(index);
window.toggleAutoPlay = () => autoPlay.toggle();
window.toggleTheme = () => themeManager.toggleTheme();

// Keyboard shortcuts info
window.showKeyboardShortcuts = () => {
    alert(`
🎹 Keyboard Shortcuts:
← → Arrow keys: Navigate slides
Space: Next slide
Escape: Stop autoplay
T: Toggle theme
A: Toggle autoplay
    `);
};

// Add space bar navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case ' ':
            e.preventDefault();
            presentation.nextSlide();
            break;
        case 'Escape':
            autoPlay.stop();
            break;
        case 't':
        case 'T':
            themeManager.toggleTheme();
            break;
        case 'a':
        case 'A':
            autoPlay.toggle();
            break;
        case '?':
            showKeyboardShortcuts();
            break;
    }
});

// Performance optimization: Lazy load slide content
class LazyLoader {
    static observeSlides() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                }
            });
        });

        document.querySelectorAll('.slide').forEach(slide => {
            observer.observe(slide);
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', () => {
    LazyLoader.observeSlides();
});

// Analytics tracking (optional - for understanding user interaction)
class AnalyticsTracker {
    static trackSlideView(slideIndex, slideName) {
        // In a real application, you might send this to Google Analytics
        console.log(`📊 Slide viewed: ${slideIndex + 1} - ${slideName}`);
    }

    static trackInteraction(action, element) {
        console.log(`🖱️ User interaction: ${action} on ${element}`);
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('🚨 Presentation Error:', e.error);
    // In production, you might want to show a user-friendly message
});

// Accessibility improvements
class AccessibilityManager {
    static init() {
        // Add ARIA labels
        document.querySelectorAll('.nav-btn').forEach((btn, index) => {
            btn.setAttribute('aria-label', `Go to slide ${index + 1}`);
        });

        // Add slide landmarks
        document.querySelectorAll('.slide').forEach((slide, index) => {
            slide.setAttribute('role', 'tabpanel');
            slide.setAttribute('aria-label', `Slide ${index + 1}`);
        });

        // Announce slide changes to screen readers
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.position = 'absolute';
        announcer.style.left = '-10000px';
        announcer.id = 'slide-announcer';
        document.body.appendChild(announcer);
    }

    static announceSlideChange(slideNumber, totalSlides) {
        const announcer = document.getElementById('slide-announcer');
        if (announcer) {
            announcer.textContent = `Slide ${slideNumber} of ${totalSlides}`;
        }
    }
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', () => {
    AccessibilityManager.init();
});

console.log('🎯 Spring Framework Interactive Presentation Ready!');
console.log('💡 Press "?" for keyboard shortcuts');
console.log('🔧 Built with vanilla JavaScript for optimal performance');