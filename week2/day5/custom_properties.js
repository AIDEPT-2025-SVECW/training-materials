// Custom Properties JavaScript Functions
let customProperties = [];

function addCustomProperty() {
    const prefix = document.getElementById('propertyPrefix').value || 'app';
    const name = document.getElementById('propertyName').value;
    const value = document.getElementById('propertyValue').value;
    const type = document.getElementById('propertyType').value;
    
    if (!name || !value) {
        alert('Please provide both property name and value');
        return;
    }
    
    const property = {
        prefix: prefix,
        name: name,
        value: value,
        type: type
    };
    
    customProperties.push(property);
    updateCustomPropertiesDisplay();
    
    // Clear input fields
    document.getElementById('propertyName').value = '';
    document.getElementById('propertyValue').value = '';
}

function updateCustomPropertiesDisplay() {
    const output = document.getElementById('customPropertiesOutput');
    
    if (customProperties.length === 0) {
        output.textContent = 'No custom properties added yet. Add some properties to see the configuration.';
        return;
    }
    
    let propertiesContent = '# Custom Properties (application.properties)\n';
    let yamlContent = '# Custom Properties (application.yml)\n';
    
    customProperties.forEach(prop => {
        const fullPropertyName = `${prop.prefix}.${prop.name}`;
        propertiesContent += `${fullPropertyName}=${prop.value}\n`;
        
        // Convert to YAML format
        const yamlPath = prop.name.split('.');
        let yamlIndent = '';
        yamlPath.forEach((path, index) => {
            if (index === yamlPath.length - 1) {
                yamlContent += `${yamlIndent}${path}: ${prop.value}\n`;
            } else {
                yamlContent += `${yamlIndent}${path}:\n`;
                yamlIndent += '  ';
            }
        });
    });
    
    output.textContent = propertiesContent + '\n' + yamlContent;
}

function generatePropertiesClass() {
    const output = document.getElementById('customPropertiesOutput');
    
    if (customProperties.length === 0) {
        output.textContent = 'Add some custom properties first to generate the @ConfigurationProperties class.';
        return;
    }
    
    const prefix = customProperties[0].prefix;
    const className = prefix.charAt(0).toUpperCase() + prefix.slice(1) + 'Properties';
    
    let javaClass = `@ConfigurationProperties(prefix = "${prefix}")
@Component
@Validated
public class ${className} {
    
`;

    // Group properties by nested structure
    const groupedProperties = {};
    customProperties.forEach(prop => {
        const parts = prop.name.split('.');
        if (parts.length === 1) {
            groupedProperties[prop.name] = prop;
        } else {
            const nestedKey = parts[0];
            if (!groupedProperties[nestedKey]) {
                groupedProperties[nestedKey] = {};
            }
            groupedProperties[nestedKey][parts.slice(1).join('.')] = prop;
        }
    });

    // Generate fields and methods
    Object.keys(groupedProperties).forEach(key => {
        const prop = groupedProperties[key];
        if (prop.type) {
            // Simple property
            javaClass += `    private ${getJavaType(prop.type)} ${key};\n`;
        } else {
            // Nested object
            javaClass += `    private ${capitalizeFirst(key)} ${key} = new ${capitalizeFirst(key)}();\n`;
        }
    });

    javaClass += '\n    // Getters and Setters\n';
    
    Object.keys(groupedProperties).forEach(key => {
        const prop = groupedProperties[key];
        const type = prop.type ? getJavaType(prop.type) : capitalizeFirst(key);
        
        javaClass += `    public ${type} get${capitalizeFirst(key)}() {
        return ${key};
    }
    
    public void set${capitalizeFirst(key)}(${type} ${key}) {
        this.${key} = ${key};
    }
    
`;
    });

    // Generate nested classes
    Object.keys(groupedProperties).forEach(key => {
        const prop = groupedProperties[key];
        if (!prop.type) {
            javaClass += `    public static class ${capitalizeFirst(key)} {
`;
            Object.keys(prop).forEach(nestedKey => {
                const nestedProp = prop[nestedKey];
                javaClass += `        private ${getJavaType(nestedProp.type)} ${nestedKey};\n`;
            });
            
            javaClass += '\n        // Getters and Setters\n';
            Object.keys(prop).forEach(nestedKey => {
                const nestedProp = prop[nestedKey];
                const type = getJavaType(nestedProp.type);
                
                javaClass += `        public ${type} get${capitalizeFirst(nestedKey)}() {
            return ${nestedKey};
        }
        
        public void set${capitalizeFirst(nestedKey)}(${type} ${nestedKey}) {
            this.${nestedKey} = ${nestedKey};
        }
        
`;
            });
            javaClass += '    }\n';
        }
    });

    javaClass += '}';
    
    output.textContent = javaClass;
}

function getJavaType(type) {
    switch (type) {
        case 'string': return 'String';
        case 'integer': return 'Integer';
        case 'boolean': return 'Boolean';
        case 'list': return 'List<String>';
        case 'nested': return 'Object';
        default: return 'String';
    }
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function clearCustomProperties() {
    customProperties = [];
    updateCustomPropertiesDisplay();
}

function showConfigExample(type) {
    const output = document.getElementById('configExampleOutput');
    
    // Update active button
    document.querySelectorAll('#configExampleOutput').forEach(button => {
        button.classList.remove('active');
    });
    
    const examples = {
        database: {
            properties: `# Database Configuration
app.database.url=jdbc:mysql://localhost:3306/mydb
app.database.username=dbuser
app.database.password=dbpass
app.database.driver-class-name=com.mysql.cj.jdbc.Driver
app.database.pool.max-size=20
app.database.pool.min-size=5`,
            
            javaClass: `@ConfigurationProperties(prefix = "app.database")
@Component
@Validated
public class DatabaseProperties {
    
    @NotBlank
    private String url;
    
    @NotBlank
    private String username;
    
    @NotBlank
    private String password;
    
    private String driverClassName = "com.mysql.cj.jdbc.Driver";
    
    @Valid
    private Pool pool = new Pool();
    
    // Getters and setters
    
    public static class Pool {
        @Min(1)
        private int maxSize = 10;
        
        @Min(1)
        private int minSize = 2;
        
        // Getters and setters
    }
}`
        },
        
        security: {
            properties: `# Security Configuration
app.security.jwt.secret=mySecretKey
app.security.jwt.expiration=3600000
app.security.cors.allowed-origins=http://localhost:3000,https://myapp.com
app.security.cors.allowed-methods=GET,POST,PUT,DELETE
app.security.rate-limit.requests-per-minute=100`,
            
            javaClass: `@ConfigurationProperties(prefix = "app.security")
@Component
@Validated
public class SecurityProperties {
    
    @Valid
    private Jwt jwt = new Jwt();
    
    @Valid
    private Cors cors = new Cors();
    
    @Valid
    private RateLimit rateLimit = new RateLimit();
    
    // Getters and setters
    
    public static class Jwt {
        @NotBlank
        private String secret;
        
        @Min(1)
        private long expiration = 3600000L;
        
        // Getters and setters
    }
    
    public static class Cors {
        private List<String> allowedOrigins = Arrays.asList("*");
        private List<String> allowedMethods = Arrays.asList("GET", "POST");
        
        // Getters and setters
    }
    
    public static class RateLimit {
        @Min(1)
        private int requestsPerMinute = 60;
        
        // Getters and setters
    }
}`
        },
        
        api: {
            properties: `# API Configuration
app.api.base-url=https://api.example.com
app.api.version=v1
app.api.timeout=30000
app.api.retry.max-attempts=3
app.api.retry.backoff-delay=1000
app.api.headers.user-agent=MyApp/1.0
app.api.headers.accept=application/json`,
            
            javaClass: `@ConfigurationProperties(prefix = "app.api")
@Component
@Validated
public class ApiProperties {
    
    @NotBlank
    @URL
    private String baseUrl;
    
    @NotBlank
    private String version = "v1";
    
    @Min(1000)
    private int timeout = 30000;
    
    @Valid
    private Retry retry = new Retry();
    
    private Map<String, String> headers = new HashMap<>();
    
    // Getters and setters
    
    public static class Retry {
        @Min(1)
        private int maxAttempts = 3;
        
        @Min(100)
        private long backoffDelay = 1000L;
        
        // Getters and setters
    }
}`
        },
        
        cache: {
            properties: `# Cache Configuration
app.cache.type=redis
app.cache.redis.host=localhost
app.cache.redis.port=6379
app.cache.redis.password=
app.cache.redis.database=0
app.cache.ttl.default=3600
app.cache.ttl.user-sessions=1800
app.cache.ttl.api-responses=300`,
            
            javaClass: `@ConfigurationProperties(prefix = "app.cache")
@Component
@Validated
public class CacheProperties {
    
    @NotBlank
    private String type = "memory";
    
    @Valid
    private Redis redis = new Redis();
    
    @Valid
    private Ttl ttl = new Ttl();
    
    // Getters and setters
    
    public static class Redis {
        @NotBlank
        private String host = "localhost";
        
        @Min(1)
        @Max(65535)
        private int port = 6379;
        
        private String password;
        
        @Min(0)
        private int database = 0;
        
        // Getters and setters
    }
    
    public static class Ttl {
        @Min(1)
        private int defaultTtl = 3600;
        
        private Map<String, Integer> custom = new HashMap<>();
        
        // Getters and setters
    }
}`
        }
    };
    
    const example = examples[type];
    output.textContent = `Properties File:\n${example.properties}\n\n@ConfigurationProperties Class:\n${example.javaClass}`;
}

// Initialize with database example
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('configExampleOutput')) {
        showConfigExample('database');
    }
});