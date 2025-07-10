// Spring Boot REST Tutorial - Interactive JavaScript

// Navigation functionality
let currentSection = 'overview';
const sections = ['overview', 'controller', 'mapping', 'body', 'parameters', 'methods', 'advanced'];

// Initialize the tutorial
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    updateProgress();
    
    // Add syntax highlighting
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
});

// Navigation system
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            switchSection(targetSection);
        });
    });
}

function switchSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    document.getElementById(sectionId).classList.add('active');
    
    // Update nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    
    currentSection = sectionId;
    updateProgress();
}

function updateProgress() {
    const currentIndex = sections.indexOf(currentSection);
    const progress = ((currentIndex + 1) / sections.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

// Interactive Demo Functions

// REST Controller Demo
function simulateRestController() {
    const responseType = document.getElementById('responseType').value;
    const output = document.getElementById('controllerOutput');
    
    const responses = {
        json: {
            contentType: 'application/json',
            data: JSON.stringify({
                id: 1,
                name: "John Doe",
                email: "john@example.com",
                status: "active"
            }, null, 2)
        },
        xml: {
            contentType: 'application/xml',
            data: `<?xml version="1.0" encoding="UTF-8"?>
<user>
    <id>1</id>
    <name>John Doe</name>
    <email>john@example.com</email>
    <status>active</status>
</user>`
        },
        text: {
            contentType: 'text/plain',
            data: 'User: John Doe (john@example.com) - Status: active'
        }
    };
    
    const response = responses[responseType];
    output.innerHTML = `HTTP/1.1 200 OK
Content-Type: ${response.contentType}
Content-Length: ${response.data.length}

${response.data}`;
}

// Request Mapping Demo
function simulateMapping() {
    const path = document.getElementById('mappingPath').value;
    const method = document.getElementById('httpMethod').value;
    const output = document.getElementById('mappingOutput');
    
    const mappingResult = {
        path: path,
        method: method,
        handler: generateHandlerMethod(path, method),
        annotation: generateMappingAnnotation(path, method)
    };
    
    output.innerHTML = `✅ Mapping Found!

Controller Method:
${mappingResult.annotation}
public ResponseEntity<?> ${mappingResult.handler}

Request Details:
• Path: ${path}
• HTTP Method: ${method}
• Handler: ${mappingResult.handler}
• Status: Successfully mapped`;
}

function generateHandlerMethod(path, method) {
    const segments = path.split('/').filter(s => s);
    const lastSegment = segments[segments.length - 1];
    
    if (lastSegment && lastSegment.includes('{') && lastSegment.includes('}')) {
        return `${method.toLowerCase()}${capitalize(segments[segments.length - 2] || 'Resource')}ById(@PathVariable Long id)`;
    }
    
    const resource = lastSegment || 'resource';
    const methodName = method === 'GET' ? 'get' : method.toLowerCase();
    
    return `${methodName}${capitalize(resource)}()`;
}

function generateMappingAnnotation(path, method) {
    const methodMappings = {
        'GET': '@GetMapping',
        'POST': '@PostMapping',
        'PUT': '@PutMapping',
        'DELETE': '@DeleteMapping',
        'PATCH': '@PatchMapping'
    };
    
    const annotation = methodMappings[method] || '@RequestMapping';
    const pathOnly = path.replace(/^\/api\/v?\d*/, '');
    
    return pathOnly ? `${annotation}("${pathOnly}")` : annotation;
}

// Request Body Demo
function simulateRequestBody() {
    const jsonInput = document.getElementById('jsonInput').value;
    const output = document.getElementById('bodyOutput');
    
    try {
        const parsedJson = JSON.parse(jsonInput);
        
        const javaObject = generateJavaObject(parsedJson);
        const responseJson = {
            ...parsedJson,
            id: Math.floor(Math.random() * 1000),
            createdAt: new Date().toISOString(),
            status: 'created'
        };
        
        output.innerHTML = `✅ Request Body Processing

1. Incoming JSON Request:
${jsonInput}

2. Converted to Java Object:
${javaObject}

3. Processed Response:
${JSON.stringify(responseJson, null, 2)}

4. HTTP Response:
Status: 201 Created
Content-Type: application/json`;
        
    } catch (error) {
        output.innerHTML = `❌ JSON Parse Error:
${error.message}

Please check your JSON syntax:
• Use double quotes for strings
• Ensure proper comma placement
• Check for missing brackets`;
    }
}

function generateJavaObject(obj) {
    const fields = Object.keys(obj).map(key => {
        const value = obj[key];
        const type = typeof value === 'number' ? 'int' : 'String';
        return `    private ${type} ${key};`;
    }).join('\n');
    
    return `public class RequestObject {
${fields}
    
    // Getters and setters...
}`;
}

// Parameters Demo
function simulateParameters() {
    const url = document.getElementById('paramUrl').value;
    const output = document.getElementById('paramOutput');
    
    const { pathVariables, queryParams } = parseUrl(url);
    
    output.innerHTML = `🔍 Parameter Extraction Results

URL: ${url}

Path Variables:
${pathVariables.length > 0 ? 
    pathVariables.map(pv => `• ${pv.name} = ${pv.value} (@PathVariable)`).join('\n') : 
    '• No path variables found'}

Query Parameters:
${queryParams.length > 0 ? 
    queryParams.map(qp => `• ${qp.name} = ${qp.value} (@RequestParam)`).join('\n') : 
    '• No query parameters found'}

Generated Controller Method:
@GetMapping("${pathVariables.length > 0 ? url.split('?')[0] : url}")
public ResponseEntity<?> handleRequest(
${generateParameterList(pathVariables, queryParams)}
) {
    // Method implementation
}`;
}

function parseUrl(url) {
    const [path, query] = url.split('?');
    const pathVariables = [];
    const queryParams = [];
    
    // Extract path variables
    const pathSegments = path.split('/');
    pathSegments.forEach((segment, index) => {
        if (segment.match(/^\d+$/)) {
            pathVariables.push({
                name: pathSegments[index - 1] ? pathSegments[index - 1].slice(0, -1) + 'Id' : 'id',
                value: segment
            });
        }
    });
    
    // Extract query parameters
    if (query) {
        const params = query.split('&');
        params.forEach(param => {
            const [key, value] = param.split('=');
            queryParams.push({
                name: key,
                value: decodeURIComponent(value || '')
            });
        });
    }
    
    return { pathVariables, queryParams };
}

function generateParameterList(pathVars, queryParams) {
    const params = [];
    
    pathVars.forEach(pv => {
        params.push(`    @PathVariable Long ${pv.name}`);
    });
    
    queryParams.forEach(qp => {
        const type = isNaN(qp.value) ? 'String' : 'int';
        params.push(`    @RequestParam ${type} ${qp.name}`);
    });
    
    return params.join(',\n') || '    // No parameters';
}

// HTTP Methods Demo
function simulateHttpMethod() {
    const method = document.getElementById('methodSelect').value;
    const resourceId = document.getElementById('resourceId').value;
    const output = document.getElementById('methodOutput');
    
    const methodExamples = {
        'GET': {
            description: 'Retrieve resource(s)',
            request: `GET /api/books${resourceId ? '/' + resourceId : ''}
Accept: application/json`,
            response: `HTTP/1.1 200 OK
Content-Type: application/json

${resourceId ? 
    `{
    "id": ${resourceId},
    "title": "Spring Boot Guide",
    "author": "John Doe",
    "isbn": "978-1234567890"
}` : 
    `[
    {
        "id": 1,
        "title": "Spring Boot Guide",
        "author": "John Doe"
    },
    {
        "id": 2,
        "title": "REST API Design",
        "author": "Jane Smith"
    }
]`}`,
            annotation: resourceId ? `@GetMapping("/{id}")` : `@GetMapping`
        },
        'POST': {
            description: 'Create new resource',
            request: `POST /api/books
Content-Type: application/json

{
    "title": "New Book",
    "author": "Author Name",
    "isbn": "978-0987654321"
}`,
            response: `HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/books/124

{
    "id": 124,
    "title": "New Book",
    "author": "Author Name",
    "isbn": "978-0987654321",
    "createdAt": "2024-01-15T10:30:00Z"
}`,
            annotation: `@PostMapping`
        },
        'PUT': {
            description: 'Update entire resource',
            request: `PUT /api/books/${resourceId}
Content-Type: application/json

{
    "title": "Updated Book Title",
    "author": "Updated Author",
    "isbn": "978-1111111111"
}`,
            response: `HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": ${resourceId},
    "title": "Updated Book Title",
    "author": "Updated Author",
    "isbn": "978-1111111111",
    "updatedAt": "2024-01-15T10:35:00Z"
}`,
            annotation: `@PutMapping("/{id}")`
        },
        'PATCH': {
            description: 'Partial resource update',
            request: `PATCH /api/books/${resourceId}
Content-Type: application/json

{
    "title": "Partially Updated Title"
}`,
            response: `HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": ${resourceId},
    "title": "Partially Updated Title",
    "author": "Original Author",
    "isbn": "978-1234567890",
    "updatedAt": "2024-01-15T10:40:00Z"
}`,
            annotation: `@PatchMapping("/{id}")`
        },
        'DELETE': {
            description: 'Remove resource',
            request: `DELETE /api/books/${resourceId}`,
            response: `HTTP/1.1 204 No Content`,
            annotation: `@DeleteMapping("/{id}")`
        }
    };
    
    const example = methodExamples[method];
    
    output.innerHTML = `📋 ${method} Method Example

Description: ${example.description}

Controller Annotation:
${example.annotation}

Request:
${example.request}

Response:
${example.response}`;
}

// Advanced Features Demo
function simulateAdvanced() {
    const feature = document.getElementById('advancedFeature').value;
    const output = document.getElementById('advancedOutput');
    
    const examples = {
        'status': {
            title: 'Custom Status Codes',
            example: `@PostMapping("/users")
@ResponseStatus(HttpStatus.CREATED)
public User createUser(@RequestBody User user) {
    return userService.save(user);
}

// Using ResponseEntity for more control
@GetMapping("/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    if (user == null) {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(user);
}`,
            output: `HTTP/1.1 201 Created
Content-Type: application/json

{
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
}`
        },
        'headers': {
            title: 'Custom Headers',
            example: `@GetMapping("/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    return ResponseEntity.ok()
            .header("X-User-Version", "1.0")
            .header("X-Rate-Limit", "100")
            .body(user);
}`,
            output: `HTTP/1.1 200 OK
Content-Type: application/json
X-User-Version: 1.0
X-Rate-Limit: 100

{
    "id": 1,
    "name": "John Doe"
}`
        },
        'exception': {
            title: 'Exception Handling',
            example: `@ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<ErrorResponse> handleNotFound(
        ResourceNotFoundException ex) {
    ErrorResponse error = new ErrorResponse(
        "RESOURCE_NOT_FOUND", 
        ex.getMessage()
    );
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(error);
}`,
            output: `HTTP/1.1 404 Not Found
Content-Type: application/json

{
    "error": "RESOURCE_NOT_FOUND",
    "message": "User with id 999 not found",
    "timestamp": "2024-01-15T10:30:00Z"
}`
        },
        'validation': {
            title: 'Request Validation',
            example: `@PostMapping("/users")
public ResponseEntity<User> createUser(
        @Valid @RequestBody User user) {
    User savedUser = userService.save(user);
    return ResponseEntity.status(HttpStatus.CREATED)
            .body(savedUser);
}

// User class with validation
public class User {
    @NotBlank(message = "Name is required")
    private String name;
    
    @Email(message = "Invalid email format")
    private String email;
    
    @Min(value = 18, message = "Age must be at least 18")
    private int age;
}`,
            output: `HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "error": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
        {
            "field": "email",
            "message": "Invalid email format"
        },
        {
            "field": "age",
            "message": "Age must be at least 18"
        }
    ]
}`
        }
    };
    
    const example = examples[feature];
    
    output.innerHTML = `🎯 ${example.title}

Java Code:
${example.example}

HTTP Response:
${example.output}`;
}

// Utility Functions
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
        const currentIndex = sections.indexOf(currentSection);
        if (currentIndex < sections.length - 1) {
            switchSection(sections[currentIndex + 1]);
        }
    } else if (e.key === 'ArrowLeft') {
        const currentIndex = sections.indexOf(currentSection);
        if (currentIndex > 0) {
            switchSection(sections[currentIndex - 1]);
        }
    }
});

// Auto-advance demo (optional)
function startAutoDemo() {
    let currentDemo = 0;
    const demos = ['simulateRestController', 'simulateMapping', 'simulateRequestBody', 'simulateParameters', 'simulateHttpMethod', 'simulateAdvanced'];
    
    const interval = setInterval(() => {
        if (currentDemo < demos.length) {
            window[demos[currentDemo]]();
            currentDemo++;
        } else {
            clearInterval(interval);
        }
    }, 3000);
}

// Export functions for global access
window.simulateRestController = simulateRestController;
window.simulateMapping = simulateMapping;
window.simulateRequestBody = simulateRequestBody;
window.simulateParameters = simulateParameters;
window.simulateHttpMethod = simulateHttpMethod;
window.simulateAdvanced = simulateAdvanced;