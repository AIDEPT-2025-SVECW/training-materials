// spring-boot-demo.js
// Interactive functionality for Spring Boot demo

// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.nav-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Show Spring Boot magic demo
function showSpringBootMagic() {
    const magicDemo = document.getElementById('magic-demo');
    magicDemo.style.display = 'block';
    
    // Add some sparkle effect
    setTimeout(() => {
        magicDemo.style.background = 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)';
    }, 500);
    
    // Hide after 5 seconds
    setTimeout(() => {
        magicDemo.style.display = 'none';
        magicDemo.style.background = 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)';
    }, 5000);
}

// Time comparison animation
function runTimeComparison() {
    const traditionalProgress = document.getElementById('traditional-progress');
    const springbootProgress = document.getElementById('springboot-progress');
    const traditionalTime = document.getElementById('traditional-time');
    const springbootTime = document.getElementById('springboot-time');
    
    // Reset progress bars
    traditionalProgress.style.width = '0%';
    springbootProgress.style.width = '0%';
    
    // Animate traditional Spring (slow)
    let traditionalHours = 0;
    const traditionalInterval = setInterval(() => {
        traditionalHours += 0.5;
        const progress = (traditionalHours / 8) * 100;
        traditionalProgress.style.width = Math.min(progress, 100) + '%';
        traditionalTime.textContent = `Setup Time: ${traditionalHours} hours`;
        
        if (traditionalHours >= 8) {
            clearInterval(traditionalInterval);
        }
    }, 200);
    
    // Animate Spring Boot (fast) - start after 1 second
    setTimeout(() => {
        let springbootMinutes = 0;
        const springbootInterval = setInterval(() => {
            springbootMinutes += 2;
            const progress = (springbootMinutes / 15) * 100;
            springbootProgress.style.width = Math.min(progress, 100) + '%';
            springbootTime.textContent = `Setup Time: ${springbootMinutes} minutes`;
            
            if (springbootMinutes >= 15) {
                clearInterval(springbootInterval);
                // Show completion message
                springbootTime.innerHTML = `Setup Time: 15 minutes <strong>✅ DONE!</strong>`;
            }
        }, 100);
    }, 1000);
}

// Auto-configuration demonstration
function demonstrateAutoConfig() {
    const spinner = document.getElementById('autoconfig-spinner');
    const codeDisplay = document.getElementById('autoconfig-code');
    
    // Show spinner
    spinner.style.display = 'block';
    codeDisplay.style.display = 'none';
    
    // Simulate auto-configuration process
    setTimeout(() => {
        spinner.style.display = 'none';
        codeDisplay.style.display = 'block';
        
        // Add typing effect to code
        const codeText = codeDisplay.textContent;
        codeDisplay.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            codeDisplay.textContent += codeText[i];
            i++;
            if (i >= codeText.length) {
                clearInterval(typeInterval);
            }
        }, 20);
    }, 2000);
}

// Server selection functionality
let selectedServer = null;

function selectServer(serverType) {
    const serverBoxes = document.querySelectorAll('.server-box');
    const serverInfo = document.getElementById('server-info');
    
    // Remove active class from all servers
    serverBoxes.forEach(box => box.classList.remove('active'));
    
    // Add active class to selected server
    event.target.closest('.server-box').classList.add('active');
    
    selectedServer = serverType;
    
    // Show server information
    const serverDetails = {
        tomcat: {
            name: 'Apache Tomcat',
            config: `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<!-- Tomcat is included by default! -->`,
            features: 'Most widely used, excellent documentation, stable'
        },
        jetty: {
            name: 'Eclipse Jetty',
            config: `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>`,
            features: 'Lightweight, great for microservices, async I/O'
        },
        undertow: {
            name: 'Undertow',
            config: `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-undertow</artifactId>
</dependency>`,
            features: 'High performance, low memory footprint, non-blocking'
        }
    };
    
    const server = serverDetails[serverType];
    serverInfo.style.display = 'block';
    serverInfo.innerHTML = `
        <h4>${server.name} Selected! 🎯</h4>
        <p><strong>Features:</strong> ${server.features}</p>
        <div class="code-display" style="margin-top: 15px; font-size: 0.8rem;">
${server.config}
        </div>
    `;
}

// Deployment demonstration
function showDeploymentDemo() {
    const traditionalDeployment = document.getElementById('traditional-deployment');
    const springbootDeployment = document.getElementById('springboot-deployment');
    
    // Show traditional deployment steps with animation
    traditionalDeployment.style.display = 'block';
    const traditionalSteps = traditionalDeployment.querySelectorAll('p');
    
    traditionalSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        step.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
        }, index * 500);
    });
    
    // Show Spring Boot deployment after traditional steps
    setTimeout(() => {
        springbootDeployment.style.display = 'block';
        const springbootSteps = springbootDeployment.querySelectorAll('p');
        
        springbootSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(20px)';
            step.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateX(0)';
                
                // Add special effect for the last step
                if (index === springbootSteps.length - 1) {
                    step.style.background = 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)';
                    step.style.padding = '10px';
                    step.style.borderRadius = '10px';
                    step.style.fontWeight = 'bold';
                }
            }, index * 300);
        });
    }, 2500);
}

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add particle effect to demo buttons
    const demoButtons = document.querySelectorAll('.demo-button');
    
    demoButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to comparison cards
    const comparisonCards = document.querySelectorAll('.comparison-card');
    
    comparisonCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255,255,255,0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = e.clientX - this.offsetLeft - 25 + 'px';
            ripple.style.top = e.clientY - this.offsetTop - 25 + 'px';
            ripple.style.width = '50px';
            ripple.style.height = '50px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation keyframes dynamically
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

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe all tab contents for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        observer.observe(content);
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const tabs = document.querySelectorAll('.nav-tab');
    const activeTab = document.querySelector('.nav-tab.active');
    
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        
        const currentIndex = Array.from(tabs).indexOf(activeTab);
        let nextIndex;
        
        if (e.key === 'ArrowLeft') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        } else {
            nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        }
        
        tabs[nextIndex].click();
        tabs[nextIndex].focus();
    }
});

// Add dynamic background particles
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '-1';
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(255,255,255,0.1)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 4 + 's';
        
        particleContainer.appendChild(particle);
    }
}

// Add floating animation for particles
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
`;
document.head.appendChild(floatStyle);

// Initialize particles on load
document.addEventListener('DOMContentLoaded', createParticles);

// Add performance monitoring
function trackUserInteraction(action, element) {
    console.log(`User interaction: ${action} on ${element}`);
    // In a real application, you might send this to an analytics service
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('demo-button')) {
        trackUserInteraction('click', 'demo-button');
    }
    if (e.target.classList.contains('nav-tab')) {
        trackUserInteraction('tab-switch', e.target.dataset.tab);
    }
});

// Add touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const tabs = document.querySelectorAll('.nav-tab');
        const activeTab = document.querySelector('.nav-tab.active');
        const currentIndex = Array.from(tabs).indexOf(activeTab);
        
        let nextIndex;
        if (diff > 0 && currentIndex < tabs.length - 1) {
            // Swipe left, go to next tab
            nextIndex = currentIndex + 1;
        } else if (diff < 0 && currentIndex > 0) {
            // Swipe right, go to previous tab
            nextIndex = currentIndex - 1;
        }
        
        if (nextIndex !== undefined) {
            tabs[nextIndex].click();
        }
    }
}

// Add loading states for better UX
function showLoadingState(elementId) {
    const element = document.getElementById(elementId);
    const originalContent = element.innerHTML;
    
    element.innerHTML = '<div class="loading-spinner" style="display: block;"></div>';
    
    return function hideLoading() {
        element.innerHTML = originalContent;
    };
}

// Enhanced auto-configuration demo with more details
function demonstrateAutoConfigAdvanced() {
    const hideLoading = showLoadingState('autoconfig-code');
    
    setTimeout(() => {
        hideLoading();
        
        const detailedCode = `
// Spring Boot Auto-Configuration in Action
@SpringBootApplication
@EnableAutoConfiguration // Included in @SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}

// What happens behind the scenes:
// 1. Classpath scanning for dependencies
// 2. Conditional bean creation
// 3. Property-based configuration
// 4. Auto-configuration classes loaded

// Example: Database Auto-Configuration
// If H2 is on classpath:
@ConditionalOnClass(EmbeddedDatabaseType.class)
@AutoConfigureAfter(DataSourceAutoConfiguration.class)
public class DataSourceAutoConfiguration {
    // Automatically configures DataSource bean
}

// Override when needed:
@Configuration
public class CustomDataSourceConfig {
    @Bean
    @Primary
    public DataSource customDataSource() {
        // Your custom configuration
        return new HikariDataSource();
    }
}
        `;
        
        document.getElementById('autoconfig-code').textContent = detailedCode;
    }, 1500);
}

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach((tab, index) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', tab.classList.contains('active'));
        tab.setAttribute('tabindex', tab.classList.contains('active') ? '0' : '-1');
    });
    
    // Add focus management
    tabs.forEach(tab => {
        tab.addEventListener('focus', function() {
            tabs.forEach(t => t.setAttribute('tabindex', '-1'));
            this.setAttribute('tabindex', '0');
        });
    });
    
    // Add skip links for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    document.querySelector('.container').id = 'main-content';
});

// Performance optimization: Lazy load heavy animations
const heavyAnimations = new Map();

function loadHeavyAnimation(name, animationFunction) {
    if (!heavyAnimations.has(name)) {
        heavyAnimations.set(name, animationFunction);
        return animationFunction();
    }
    return heavyAnimations.get(name)();
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    // In production, you might want to show a user-friendly error message
});

// Add theme switching capability (bonus feature)
function initThemeSwitch() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255,255,255,0.2);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        this.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });
    
    document.body.appendChild(themeToggle);
    
    // Add dark theme styles
    const darkThemeStyle = document.createElement('style');
    darkThemeStyle.textContent = `
        .dark-theme {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
        }
        .dark-theme .tab-content {
            background: #34495e !important;
            color: #ecf0f1 !important;
        }
        .dark-theme h2, .dark-theme h3 {
            color: #3498db !important;
        }
    `;
    document.head.appendChild(darkThemeStyle);
}

// Initialize theme switch
document.addEventListener('DOMContentLoaded', initThemeSwitch);

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showSpringBootMagic,
        runTimeComparison,
        demonstrateAutoConfig,
        selectServer,
        showDeploymentDemo
    };
}