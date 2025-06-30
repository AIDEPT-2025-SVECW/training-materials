// Spring Configuration Demo JavaScript

// Data structures for demo
const beanData = {
    xml: {
        userService: {
            id: 'userService',
            class: 'com.example.UserService',
            scope: 'singleton',
            properties: {
                userRepository: 'userRepository (ref)',
                maxUsers: '1000'
            },
            description: 'Main service for user operations with dependency injection via XML configuration.'
        },
        userRepository: {
            id: 'userRepository',
            class: 'com.example.UserRepository',
            scope: 'singleton',
            constructorArgs: ['jdbc:mysql://localhost/users'],
            description: 'Data access layer with constructor injection for database URL.'
        },
        emailService: {
            id: 'emailService',
            class: 'com.example.EmailService',
            scope: 'singleton',
            properties: {
                recipients: ['admin@example.com', 'support@example.com']
            },
            description: 'Email service with collection injection for multiple recipients.'
        }
    }
};

const annotationData = {
    '@Component': {
        name: '@Component',
        purpose: 'Generic stereotype annotation',
        description: 'Indicates that a class is a Spring-managed component. It\'s a generic stereotype for any Spring-managed component.',
        example: '@Component\npublic class MyComponent {\n    // component logic\n}',
        scannable: true
    },
    '@Service': {
        name: '@Service',
        purpose: 'Business logic layer',
        description: 'Specialization of @Component. Indicates that a class holds business logic.',
        example: '@Service\npublic class UserService {\n    // business logic\n}',
        scannable: true
    },
    '@Repository': {
        name: '@Repository',
        purpose: 'Data access layer',
        description: 'Specialization of @Component. Indicates that a class is a repository (data access object).',
        example: '@Repository\npublic class UserRepository {\n    // data access logic\n}',
        scannable: true
    },
    '@Controller': {
        name: '@Controller',
        purpose: 'Web layer',
        description: 'Specialization of @Component. Indicates that a class serves as a controller in Spring MVC.',
        example: '@Controller\npublic class UserController {\n    // web layer logic\n}',
        scannable: true
    },
    '@Autowired': {
        name: '@Autowired',
        purpose: 'Dependency injection',
        description: 'Marks a constructor, field, setter method, or config method for automatic dependency injection.',
        example: '@Autowired\nprivate UserService userService;',
        scannable: false
    },
    '@Value': {
        name: '@Value',
        purpose: 'Property injection',
        description: 'Used to inject values into fields from property files, environment variables, or SpEL expressions.',
        example: '@Value("${app.name}")\nprivate String appName;',
        scannable: false
    }
};

const propertyData = {
    'app.name': 'Spring Demo Application',
    'app.version': '1.0.0',
    'app.max-users': '1000',
    'spring.datasource.url': 'jdbc:mysql://localhost:3306/users',
    'spring.datasource.username': 'admin',
    'spring.datasource.password': '***hidden***',
    'spring.datasource.driver-class-name': 'com.mysql.cj.jdbc.Driver',
    'spring.jpa.hibernate.ddl-auto': 'update',
    'spring.jpa.show-sql': 'true',
    'server.port': '8080',
    'server.servlet.context-path': '/api',
    'logging.level.com.example': 'DEBUG',
    'logging.level.org.springframework': 'INFO'
};

const profileConfigs = {
    development: {
        'spring.datasource.url': 'jdbc:h2:mem:devdb',
        'spring.jpa.hibernate.ddl-auto': 'create-drop',
        'logging.level.root': 'DEBUG',
        'spring.h2.console.enabled': 'true'
    },
    testing: {
        'spring.datasource.url': 'jdbc:h2:mem:testdb',
        'spring.jpa.hibernate.ddl-auto': 'create-drop',
        'logging.level.root': 'WARN',
        'spring.test.mockmvc.print': 'true'
    },
    production: {
        'spring.datasource.url': 'jdbc:mysql://prod-server:3306/users',
        'spring.jpa.hibernate.ddl-auto': 'validate',
        'logging.level.root': 'ERROR',
        'server.ssl.enabled': 'true'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeCodeHighlighting();
    showDefaultContent();
});

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    // Update active content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    
    // Trigger syntax highlighting for newly visible content
    if (window.Prism) {
        setTimeout(() => {
            Prism.highlightAll();
        }, 100);
    }
}

function initializeCodeHighlighting() {
    // Prism.js will handle this automatically
    if (window.Prism) {
        Prism.highlightAll();
    }
}

function showDefaultContent() {
    // Show XML tab by default
    switchTab('xml');
}

// Bean information display
function showBeanInfo(configType) {
    const selectElement = document.getElementById(`${configType}BeanSelect`);
    const selectedBean = selectElement.value;
    const infoElement = document.getElementById(`${configType}BeanInfo`);
    
    if (beanData[configType] && beanData[configType][selectedBean]) {
        const bean = beanData[configType][selectedBean];
        
        let html = `
            <div class="bean-details">
                <h5>Bean: <span class="highlight">${bean.id}</span></h5>
                <p><strong>Class:</strong> ${bean.class}</p>
                <p><strong>Scope:</strong> ${bean.scope}</p>
                <p><strong>Description:</strong> ${bean.description}</p>
        `;
        
        if (bean.properties) {
            html += '<p><strong>Properties:</strong></p><ul>';
            for (const [key, value] of Object.entries(bean.properties)) {
                if (Array.isArray(value)) {
                    html += `<li>${key}: [${value.join(', ')}]</li>`;
                } else {
                    html += `<li>${key}: ${value}</li>`;
                }
            }
            html += '</ul>';
        }
        
        if (bean.constructorArgs) {
            html += '<p><strong>Constructor Arguments:</strong></p><ul>';
            bean.constructorArgs.forEach(arg => {
                html += `<li>${arg}</li>`;
            });
            html += '</ul>';
        }
        
        html += '</div>';
        infoElement.innerHTML = html;
        infoElement.style.display = 'block';
    }
}

// Annotation information display
function showAnnotationInfo(annotationName) {
    const infoElement = document.getElementById('annotationInfo');
    const annotation = annotationData[annotationName];
    
    if (annotation) {
        const html = `
            <div class="annotation-details">
                <h5>${annotation.name}</h5>
                <p><strong>Purpose:</strong> ${annotation.purpose}</p>
                <p><strong>Description:</strong> ${annotation.description}</p>
                <p><strong>Component Scanning:</strong> ${annotation.scannable ? 'Yes' : 'No'}</p>
                <div class="code-example">
                    <h6>Example:</h6>
                    <pre><code class="language-java">${annotation.example}</code></pre>
                </div>
            </div>
        `;
        infoElement.innerHTML = html;
        
        // Re-highlight the code
        if (window.Prism) {
            setTimeout(() => {
                Prism.highlightAll();
            }, 50);
        }
    }
}

// Java configuration generator
function generateBeanConfig() {
    const beanName = document.getElementById('beanName').value || 'myService';
    const beanClass = document.getElementById('beanClass').value || 'com.example.MyService';
    const beanScope = document.getElementById('beanScope').value;
    const beanProfile = document.getElementById('beanProfile').value;
    
    let config = `@Bean`;
    
    if (beanScope !== 'singleton') {
        config += `\n@Scope("${beanScope}")`;
    }
    
    if (beanProfile) {
        config += `\n@Profile("${beanProfile}")`;
    }
    
    config += `\npublic ${getSimpleClassName(beanClass)} ${beanName}() {\n`;
    config += `    ${getSimpleClassName(beanClass)} bean = new ${getSimpleClassName(beanClass)}();\n`;
    config += `    // Configure bean properties here\n`;
    config += `    return bean;\n`;
    config += `}`;
    
    const resultElement = document.getElementById('generatedConfig');
    resultElement.textContent = config;
    resultElement.style.display = 'block';
}

function getSimpleClassName(fullClassName) {
    const parts = fullClassName.split('.');
    return parts[parts.length - 1];
}

// Properties/YAML configuration
function showConfigType(type) {
    // Update toggle buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show/hide config sections
    const propertiesConfig = document.getElementById('propertiesConfig');
    const yamlConfig = document.getElementById('yamlConfig');
    
    if (type === 'properties') {
        propertiesConfig.style.display = 'block';
        yamlConfig.style.display = 'none';
    } else {
        propertiesConfig.style.display = 'none';
        yamlConfig.style.display = 'block';
    }
    
    // Re-highlight code
    if (window.Prism) {
        setTimeout(() => {
            Prism.highlightAll();
        }, 50);
    }
}

// Property resolver
function resolveProperty() {
    const propertyKey = document.getElementById('propertyKey').value.trim();
    const resultElement = document.getElementById('propertyResult');
    
    if (!propertyKey) {
        resultElement.innerHTML = '<p class="error-message">Please enter a property key</p>';
        return;
    }
    
    if (propertyData.hasOwnProperty(propertyKey)) {
        const value = propertyData[propertyKey];
        resultElement.innerHTML = `
            <div class="success-message">
                <strong>Property Found:</strong><br>
                <code>${propertyKey}</code> = <code>${value}</code>
            </div>
        `;
    } else {
        // Try partial matching
        const matches = Object.keys(propertyData).filter(key => 
            key.toLowerCase().includes(propertyKey.toLowerCase())
        );
        
        if (matches.length > 0) {
            let html = '<div class="success-message"><strong>Similar properties found:</strong><ul>';
            matches.forEach(match => {
                html += `<li><code>${match}</code> = <code>${propertyData[match]}</code></li>`;
            });
            html += '</ul></div>';
            resultElement.innerHTML = html;
        } else {
            resultElement.innerHTML = `
                <div class="error-message">
                    Property <code>${propertyKey}</code> not found in configuration.
                </div>
            `;
        }
    }
}

// Profile configuration
function switchProfile(profileName) {
    // Update active profile button
    document.querySelectorAll('.profile-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show profile-specific configuration
    const profileConfigElement = document.getElementById('profileConfig');
    const config = profileConfigs[profileName];
    
    if (config) {
        let configText = `# Configuration for ${profileName} profile\n\n`;
        for (const [key, value] of Object.entries(config)) {
            configText += `${key}=${value}\n`;
        }
        profileConfigElement.textContent = configText;
    }
}

// Utility functions
function showLoadingSpinner(elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = '<div class="loading"></div> Loading...';
}

function hideLoadingSpinner(elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
}

// Enhanced interactivity
function addConfigurationExample(type, example) {
    // This function could be used to dynamically add new configuration examples
    console.log(`Adding ${type} configuration example:`, example);
}

// Animation utilities
function animateElement(element, animation) {
    element.style.animation = animation;
    element.addEventListener('animationend', function() {
        element.style.animation = '';
    }, { once: true });
}

// Search functionality for properties
function searchProperties(searchTerm) {
    const matches = Object.keys(propertyData).filter(key =>
        key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        propertyData[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matches;
}

// Configuration validation
function validateConfiguration(config, type) {
    const validationRules = {
        xml: {
            required: ['beans', 'bean'],
            optional: ['property', 'constructor-arg']
        },
        java: {
            required: ['@Configuration', '@Bean'],
            optional: ['@Profile', '@Scope']
        },
        properties: {
            required: [],
            optional: ['spring.*', 'server.*', 'logging.*']
        }
    };
    
    // Simplified validation logic
    return { valid: true, errors: [] };
}

// Export functionality (for potential future use)
function exportConfiguration(type, format) {
    // This could be implemented to export configurations in different formats
    console.log(`Exporting ${type} configuration in ${format} format`);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + 1-4 to switch tabs
    if ((event.ctrlKey || event.metaKey) && event.key >= '1' && event.key <= '4') {
        event.preventDefault();
        const tabs = ['xml', 'annotations', 'java', 'properties'];
        const tabIndex = parseInt(event.key) - 1;
        if (tabs[tabIndex]) {
            switchTab(tabs[tabIndex]);
        }
    }
});

// Add smooth scrolling for better UX
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize tooltips (if needed)
function initializeTooltips() {
    // Could be implemented for additional help text
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    // Tooltip implementation
}

function hideTooltip(event) {
    // Tooltip implementation
}

// Performance optimization for large configurations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced property search
const debouncedPropertySearch = debounce(function(searchTerm) {
    const results = searchProperties(searchTerm);
    // Update UI with results
}, 300);

// Theme switching (future enhancement)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme preference
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Configuration comparison tool
function compareConfigurations(config1, config2) {
    // Implementation for comparing different configuration approaches
    const differences = [];
    // Comparison logic here
    return differences;
}

// Print-friendly view
function printConfiguration() {
    window.print();
}

// Add event listeners for enhanced functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for property key input (Enter key)
    const propertyKeyInput = document.getElementById('propertyKey');
    if (propertyKeyInput) {
        propertyKeyInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                resolveProperty();
            }
        });
    }
    
    // Initialize any additional features
    initializeTooltips();
    loadThemePreference();
});


