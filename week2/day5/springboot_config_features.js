// Spring Boot Configuration Demo JavaScript

// Global state
let currentProfile = 'dev';
let lifecycleStep = 0;

// Sample configuration data
const configExamples = [
    {
        type: 'Server Configuration',
        properties: 'server.port=8080\nserver.servlet.context-path=/api',
        yaml: 'server:\n  port: 8080\n  servlet:\n    context-path: /api'
    },
    {
        type: 'Database Configuration',
        properties: 'spring.datasource.url=jdbc:mysql://localhost:3306/mydb\nspring.datasource.username=root\nspring.datasource.password=secret',
        yaml: 'spring:\n  datasource:\n    url: jdbc:mysql://localhost:3306/mydb\n    username: root\n    password: secret'
    },
    {
        type: 'JPA Configuration',
        properties: 'spring.jpa.hibernate.ddl-auto=update\nspring.jpa.show-sql=true\nspring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect',
        yaml: 'spring:\n  jpa:\n    hibernate:\n      ddl-auto: update\n    show-sql: true\n    properties:\n      hibernate:\n        dialect: org.hibernate.dialect.MySQL8Dialect'
    },
    {
        type: 'Logging Configuration',
        properties: 'logging.level.com.example=DEBUG\nlogging.file.name=app.log\nlogging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n',
        yaml: 'logging:\n  level:\n    com.example: DEBUG\n  file:\n    name: app.log\n  pattern:\n    console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n"'
    }
];

const profileConfigurations = {
    dev: {
        name: 'Development',
        properties: {
            'server.port': '8080',
            'spring.datasource.url': 'jdbc:h2:mem:devdb',
            'spring.h2.console.enabled': 'true',
            'logging.level.com.example': 'DEBUG',
            'spring.jpa.show-sql': 'true'
        },
        description: 'Development environment with H2 database and debug logging'
    },
    test: {
        name: 'Testing',
        properties: {
            'server.port': '8081',
            'spring.datasource.url': 'jdbc:h2:mem:testdb',
            'spring.test.database.replace': 'none',
            'logging.level.com.example': 'INFO',
            'spring.jpa.hibernate.ddl-auto': 'create-drop'
        },
        description: 'Testing environment with in-memory database'
    },
    prod: {
        name: 'Production',
        properties: {
            'server.port': '80',
            'spring.datasource.url': 'jdbc:mysql://prod-server:3306/proddb',
            'logging.level.com.example': 'WARN',
            'spring.jpa.hibernate.ddl-auto': 'validate',
            'management.endpoints.web.exposure.include': 'health,metrics'
        },
        description: 'Production environment with MySQL database and minimal logging'
    }
};

const lifecycleSteps = [
    'Application Starting...',
    'Loading Configuration Files',
    'Processing @SpringBootApplication',
    'Scanning for Components',
    'Auto-Configuration Detection',
    'Creating Bean Definitions',
    'Instantiating Beans',
    'Dependency Injection',
    'Post-Processing Beans',
    'Starting Embedded Server',
    'Application Ready! 🚀'
];

const mailProviders = {
    gmail: {
        host: 'smtp.gmail.com',
        port: 587,
        properties: {
            'spring.mail.properties.mail.smtp.auth': 'true',
            'spring.mail.properties.mail.smtp.starttls.enable': 'true'
        }
    },
    outlook: {
        host: 'smtp-mail.outlook.com',
        port: 587,
        properties: {
            'spring.mail.properties.mail.smtp.auth': 'true',
            'spring.mail.properties.mail.smtp.starttls.enable': 'true'
        }
    },
    yahoo: {
        host: 'smtp.mail.yahoo.com',
        port: 587,
        properties: {
            'spring.mail.properties.mail.smtp.auth': 'true',
            'spring.mail.properties.mail.smtp.starttls.enable': 'true'
        }
    }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeConfigExamples();
    convertConfig();
    selectProfile('dev');
    resetLifecycle();
});

// Navigation functions
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update nav tabs
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
}

// Configuration conversion functions
function convertConfig() {
    const format = document.getElementById('configFormat').value;
    const output = document.getElementById('configOutput');
    
    const sampleConfig = {
        properties: `# Sample Spring Boot Configuration
server.port=8080
server.servlet.context-path=/api

spring.application.name=my-spring-app
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=\${DB_USERNAME:root}
spring.datasource.password=\${DB_PASSWORD:secret}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

logging.level.com.example=DEBUG
logging.file.name=logs/application.log`,

        yaml: `# Sample Spring Boot Configuration
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  application:
    name: my-spring-app
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: \${DB_USERNAME:root}
    password: \${DB_PASSWORD:secret}
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

logging:
  level:
    com.example: DEBUG
  file:
    name: logs/application.log`
    };
    
    output.textContent = sampleConfig[format];
}

function initializeConfigExamples() {
    const tbody = document.getElementById('configExamples');
    
    configExamples.forEach(example => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${example.type}</strong></td>
            <td><pre style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 0; font-size: 12px;">${example.properties}</pre></td>
            <td><pre style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 0; font-size: 12px;">${example.yaml}</pre></td>
        `;
        tbody.appendChild(row);
    });
}

// Profile management functions
function selectProfile(profile) {
    currentProfile = profile;
    
    // Update profile buttons
    const buttons = document.querySelectorAll('.profile-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update profile output
    updateProfileOutput();
}

function updateProfileOutput() {
    const output = document.getElementById('profileOutput');
    const config = profileConfigurations[currentProfile];
    
    let configText = `# Active Profile: ${config.name}\n# ${config.description}\n\n`;
    
    // Add properties
    for (const [key, value] of Object.entries(config.properties)) {
        configText += `${key}=${value}\n`;
    }
    
    // Add YAML equivalent
    configText += `\n# YAML Equivalent:\nspring:\n  profiles:\n    active: ${currentProfile}\n\n`;
    
    // Convert properties to YAML format
    const yamlConfig = convertPropertiesToYaml(config.properties);
    configText += yamlConfig;
    
    output.textContent = configText;
}

function convertPropertiesToYaml(properties) {
    let yaml = '';
    const grouped = {};
    
    // Group properties by prefix
    for (const [key, value] of Object.entries(properties)) {
        const parts = key.split('.');
        let current = grouped;
        
        for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) {
                current[parts[i]] = {};
            }
            current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
    }
    
    // Convert to YAML format
    function objectToYaml(obj, indent = 0) {
        let result = '';
        const spaces = '  '.repeat(indent);
        
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && value !== null) {
                result += `${spaces}${key}:\n`;
                result += objectToYaml(value, indent + 1);
            } else {
                result += `${spaces}${key}: ${value}\n`;
            }
        }
        return result;
    }
    
    return objectToYaml(grouped);
}

// Lifecycle simulation functions
function simulateLifecycle() {
    lifecycleStep = 0;
    const output = document.getElementById('lifecycleOutput');
    output.textContent = '';
    
    function nextStep() {
        if (lifecycleStep < lifecycleSteps.length) {
            const stepText = `[${new Date().toLocaleTimeString()}] ${lifecycleSteps[lifecycleStep]}\n`;
            output.textContent += stepText;
            output.scrollTop = output.scrollHeight;
            lifecycleStep++;
            
            setTimeout(nextStep, 800);
        } else {
            output.textContent += `\n✅ Application started successfully!
📊 Memory usage: 256MB
🔌 Server running on port 8080
🌐 Endpoints available at http://localhost:8080`;
        }
    }
    
    nextStep();
}

function resetLifecycle() {
    lifecycleStep = 0;
    const output = document.getElementById('lifecycleOutput');
    output.textContent = 'Click "Start Application Lifecycle" to see the boot process...';
}

// Mail configuration functions
function generateMailConfig() {
    const host = document.getElementById('mailHost').value;
    const port = document.getElementById('mailPort').value;
    const provider = document.getElementById('mailProvider').value;
    const output = document.getElementById('mailConfigOutput');
    
    let config = '';
    
    if (provider !== 'custom' && mailProviders[provider]) {
        const providerConfig = mailProviders[provider];
        config = `# ${provider.charAt(0).toUpperCase() + provider.slice(1)} Mail Configuration

# Basic SMTP Settings
spring.mail.host=${providerConfig.host}
spring.mail.port=${providerConfig.port}
spring.mail.username=your-email@${provider}.com
spring.mail.password=your-app-password

# SMTP Properties
`;
        
        for (const [key, value] of Object.entries(providerConfig.properties)) {
            config += `${key}=${value}\n`;
        }
        
        config += `
# Additional Settings
spring.mail.properties.mail.smtp.connectiontimeout=5000
spring.mail.properties.mail.smtp.timeout=3000
spring.mail.properties.mail.smtp.writetimeout=5000

# YAML Equivalent:
spring:
  mail:
    host: ${providerConfig.host}
    port: ${providerConfig.port}
    username: your-email@${provider}.com
    password: your-app-password
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
          connectiontimeout: 5000
          timeout: 3000
          writetimeout: 5000`;
    } else {
        const customHost = host || 'smtp.example.com';
        const customPort = port || '587';
        
        config = `# Custom Mail Configuration

# Basic SMTP Settings
spring.mail.host=${customHost}
spring.mail.port=${customPort}
spring.mail.username=your-email@example.com
spring.mail.password=your-password

# SMTP Properties
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.connectiontimeout=5000
spring.mail.properties.mail.smtp.timeout=3000
spring.mail.properties.mail.smtp.writetimeout=5000

# YAML Equivalent:
spring:
  mail:
    host: ${customHost}
    port: ${customPort}
    username: your-email@example.com
    password: your-password
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
          connectiontimeout: 5000
          timeout: 3000
          writetimeout: 5000`;
    }
    
    output.textContent = config;
}

// Auto-update mail provider fields
document.addEventListener('DOMContentLoaded', function() {
    const providerSelect = document.getElementById('mailProvider');
    const hostInput = document.getElementById('mailHost');
    const portInput = document.getElementById('mailPort');
    
    if (providerSelect) {
        providerSelect.addEventListener('change', function() {
            const provider = this.value;
            if (provider !== 'custom' && mailProviders[provider]) {
                hostInput.value = mailProviders[provider].host;
                portInput.value = mailProviders[provider].port;
            } else {
                hostInput.value = '';
                portInput.value = '587';
            }
        });
    }
});

// Utility functions
function copyCode(button) {
    const codeBlock = button.nextElementSibling.textContent;
    navigator.clipboard.writeText(codeBlock).then(function() {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = '#48bb78';
        
        setTimeout(function() {
            button.textContent = originalText;
            button.style.background = '#667eea';
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy text: ', err);
        button.textContent = 'Copy Failed';
        setTimeout(function() {
            button.textContent = 'Copy';
        }, 2000);
    });
}

// Advanced configuration examples
function showAdvancedConfig() {
    const advancedExamples = [
        {
            title: 'Custom Auto-Configuration',
            code: `@Configuration
@ConditionalOnClass(DataSource.class)
@EnableConfigurationProperties(CustomProperties.class)
public class CustomAutoConfiguration {
    
    @Bean
    @ConditionalOnMissingBean
    public CustomService customService(CustomProperties properties) {
        return new CustomService(properties);
    }
}`
        },
        {
            title: 'Profile-Specific Beans',
            code: `@Configuration
public class ProfileConfiguration {
    
    @Bean
    @Profile("dev")
    public DataSource devDataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .build();
    }
    
    @Bean
    @Profile("prod")
    public DataSource prodDataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:mysql://prod-server:3306/db");
        return new HikariDataSource(config);
    }
}`
        }
    ];
    
    return advancedExamples;
}

// Configuration validation
function validateConfiguration(configText) {
    const validationResults = {
        valid: true,
        warnings: [],
        errors: []
    };
    
    const lines = configText.split('\n');
    
    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        
        // Skip comments and empty lines
        if (trimmedLine.startsWith('#') || trimmedLine === '') {
            return;
        }
        
        // Check for proper key=value format
        if (!trimmedLine.includes('=') && !trimmedLine.includes(':')) {
            validationResults.errors.push(`Line ${index + 1}: Invalid format - expected key=value or key: value`);
            validationResults.valid = false;
        }
        
        // Check for common mistakes
        if (trimmedLine.includes('server.port') && !trimmedLine.match(/=\d+/)) {
            validationResults.warnings.push(`Line ${index + 1}: Server port should be a number`);
        }
        
        if (trimmedLine.includes('password') && trimmedLine.includes('=password')) {
            validationResults.warnings.push(`Line ${index + 1}: Using default password is not secure`);
        }
    });
    
    return validationResults;
}

// Environment-specific configurations
const environmentConfigs = {
    development: {
        description: 'Development environment with debugging enabled',
        properties: {
            'server.port': '8080',
            'spring.h2.console.enabled': 'true',
            'logging.level.com.example': 'DEBUG',
            'spring.devtools.restart.enabled': 'true',
            'spring.jpa.show-sql': 'true'
        }
    },
    testing: {
        description: 'Testing environment with test containers',
        properties: {
            'spring.test.database.replace': 'none',
            'spring.jpa.hibernate.ddl-auto': 'create-drop',
            'logging.level.com.example': 'INFO',
            'spring.datasource.url': 'jdbc:testcontainers:mysql:8.0://test'
        }
    },
    staging: {
        description: 'Staging environment mimicking production',
        properties: {
            'server.port': '8080',
            'spring.jpa.hibernate.ddl-auto': 'validate',
            'logging.level.com.example': 'WARN',
            'management.endpoints.web.exposure.include': 'health,info'
        }
    },
    production: {
        description: 'Production environment with security hardening',
        properties: {
            'server.port': '80',
            'spring.jpa.hibernate.ddl-auto': 'validate',
            'logging.level.com.example': 'ERROR',
            'management.endpoints.web.exposure.include': 'health',
            'server.ssl.enabled': 'true'
        }
    }
};

// Add interactive feature for real-time configuration preview
function createConfigPreview() {
    const preview = document.createElement('div');
    preview.className = 'config-preview';
    preview.innerHTML = `
        <h4>Live Configuration Preview</h4>
        <textarea id="configInput" placeholder="Enter your configuration here..."></textarea>
        <div id="configValidation"></div>
        <div id="configPreview"></div>
    `;
    
    return preview;
}

// Initialize tooltips and help text
function initializeHelp() {
    const helpTexts = {
        'properties': 'Properties files use key=value format and are processed sequentially',
        'yaml': 'YAML files support hierarchical structure and are more readable',
        'profiles': 'Profiles allow environment-specific configurations',
        'autoconfiguration': 'Auto-configuration automatically configures beans based on classpath'
    };
    
    // Add help tooltips to relevant elements
    Object.keys(helpTexts).forEach(key => {
        const elements = document.querySelectorAll(`[data-help="${key}"]`);
        elements.forEach(element => {
            element.title = helpTexts[key];
        });
    });
}