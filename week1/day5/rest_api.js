// REST API Tutorial Interactive JavaScript
// Author: Generated for Educational Purposes

// Global variables for tutorial state
let currentSectionIndex = 0;
let completedSections = new Set();
const sections = ['client-server', 'servers', 'services', 'rest-intro', 'principles', 'methods','best-practices'];

// Initialize tutorial when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTutorial();
    updateProgress();
    updateNavigationButtons();
});

// Initialize tutorial functionality
function initializeTutorial() {
    // Add click listeners to navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => navigateToSection(index));
    });

    // Mark first section as completed initially
    completedSections.add(0);
}

// Navigation functions
function navigateToSection(index) {
    if (index >= 0 && index < sections.length) {
        // Hide current section
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        document.getElementById(sections[index]).classList.add('active');
        
        // Update navigation buttons
        document.querySelectorAll('.nav-btn').forEach((btn, btnIndex) => {
            btn.classList.toggle('active', btnIndex === index);
        });
        
        currentSectionIndex = index;
        completedSections.add(index);
        updateProgress();
        updateNavigationButtons();
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function nextSection() {
    if (currentSectionIndex < sections.length - 1) {
        navigateToSection(currentSectionIndex + 1);
    }
}

function previousSection() {
    if (currentSectionIndex > 0) {
        navigateToSection(currentSectionIndex - 1);
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentSectionIndex === 0;
    nextBtn.disabled = currentSectionIndex === sections.length - 1;
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = (completedSections.size / sections.length) * 100;
    progressFill.style.width = progressPercentage + '%';
}

// Client-Server Interaction Functions
function simulateClientServer() {
    const resultDiv = document.getElementById('clientServerResult');
    resultDiv.innerHTML = '<div style="color: #ff6b35;">🔄 Client: Sending request to server...</div>';
    
    setTimeout(() => {
        resultDiv.innerHTML += '<div style="color: #4ecdc4; margin-top: 10px;">⚡ Server: Processing request...</div>';
    }, 1000);
    
    setTimeout(() => {
        resultDiv.innerHTML += '<div style="color: #45b7d1; margin-top: 10px;">✅ Server: Response sent back to client</div>';
        resultDiv.innerHTML += '<div style="color: #96ceb4; margin-top: 10px;">📋 Client: Received and displaying data</div>';
    }, 2000);
}

function showDetails(type) {
    const details = {
        'client': {
            title: '👤 Client Details',
            content: `
                <strong>Role:</strong> Initiates requests and consumes responses<br><br>
                <strong>Examples:</strong>
                • Web browsers (Chrome, Firefox, Safari)<br>
                • Mobile applications (iOS, Android)<br>
                • Desktop applications<br>
                • Other servers making API calls<br><br>
                <strong>Responsibilities:</strong>
                • Send HTTP requests<br>
                • Handle responses<br>
                • Present data to users<br>
                • Manage user interactions
            `
        },
        'server': {
            title: '🖥️ Server Details',
            content: `
                <strong>Role:</strong> Processes requests and sends responses<br><br>
                <strong>Types:</strong>
                • Web servers (Apache, Nginx)<br>
                • Application servers (Node.js, Django)<br>
                • Database servers (MySQL, PostgreSQL)<br>
                • API servers<br><br>
                <strong>Responsibilities:</strong>
                • Process incoming requests<br>
                • Execute business logic<br>
                • Access databases<br>
                • Return formatted responses
            `
        }
    };
    
    const detail = details[type];
    alert(`${detail.title}\n\n${detail.content.replace(/<br>/g, '\n').replace(/<strong>|<\/strong>/g, '').replace(/•/g, '- ')}`);
}

// Server Simulation Functions
function simulateWebServer() {
    const resultDiv = document.getElementById('serverResult');
    resultDiv.innerHTML = `
        <div style="color: #667eea; font-weight: bold;">🌐 Web Server Processing...</div>
        <div style="margin-top: 10px;">
            <strong>Request:</strong> GET /images/logo.png<br>
            <strong>Action:</strong> Locating static file in file system...<br>
            <strong>Response:</strong> Serving image file directly<br>
            <strong>Status:</strong> 200 OK - File served successfully
        </div>
    `;
}

function simulateAppServer() {
    const resultDiv = document.getElementById('serverResult');
    resultDiv.innerHTML = `
        <div style="color: #764ba2; font-weight: bold;">⚙️ Application Server Processing...</div>
        <div style="margin-top: 10px;">
            <strong>Request:</strong> GET /api/users/123<br>
            <strong>Action:</strong> Executing business logic...<br>
            • Connecting to database<br>
            • Querying user data<br>
            • Processing and formatting response<br>
            <strong>Response:</strong> JSON data with user information<br>
            <strong>Status:</strong> 200 OK - Dynamic content generated
        </div>
    `;
}

// Web Services vs API Functions
function showServiceDetails(type) {
    const details = {
        'webservice': `
            Web Service - The Broadest Concept
            
            A web service is any service that:
            • Is available over the internet
            • Uses standardized protocols (HTTP, HTTPS)
            • Can be consumed by different applications
            
            Types include:
            • SOAP services
            • REST services
            • GraphQL services
            • RPC services
        `,
        'api': `
            API - Application Programming Interface
            
            An API defines:
            • How applications communicate
            • Available functions and data structures
            • Request/response formats
            • Authentication methods
            
            Types include:
            • Web APIs (over HTTP)
            • Library APIs (function calls)
            • Operating System APIs
            • Hardware APIs
        `,
        'rest': `
            REST API - Specific Architecture Style
            
            A REST API is an API that follows REST principles:
            • Uses HTTP methods (GET, POST, PUT, DELETE)
            • Stateless communication
            • Resource-based URLs
            • Standard HTTP status codes
            
            Benefits:
            • Simple and intuitive
            • Widely supported
            • Scalable
            • Platform independent
        `
    };
    
    alert(details[type]);
}



// REST Characteristics Functions
function exploreRESTCharacteristic(characteristic) {
    const resultDiv = document.getElementById('restCharacteristic');
    const characteristics = {
        'stateless': {
            title: '🔄 Stateless Communication',
            content: `Each request from client to server must contain all information needed to understand the request. The server does not store any client context between requests.

            <strong>Benefits:</strong>
            • Improved scalability
            • Better reliability
            • Simplified server design
            
            <strong>Example:</strong>
            Instead of maintaining login sessions, each request includes authentication tokens.`
        },
        'resource': {
            title: '📋 Resource-Based Architecture',
            content: `Everything is treated as a resource that can be identified by a unique URL. Resources are manipulated using standard HTTP methods.

            <strong>Examples:</strong>
            • /users (collection of users)
            • /users/123 (specific user)
            • /users/123/orders (user's orders)
            
            <strong>Benefits:</strong>
            • Intuitive URL structure
            • Predictable API design
            • Easy to understand and use`
        },
        'http': {
            title: '🌐 Built on HTTP Protocol',
            content: `REST APIs leverage the full power of HTTP protocol, including methods, status codes, and headers.

            <strong>HTTP Methods Used:</strong>
            • GET (retrieve data)
            • POST (create new resource)
            • PUT (update resource)
            • DELETE (remove resource)
            
            <strong>Benefits:</strong>
            • Universal support
            • Rich set of features
            • Well-understood protocol`
        }
    };
    
    const char = characteristics[characteristic];
    resultDiv.innerHTML = `
        <div style="color: #2c3e50;">
            <h4>${char.title}</h4>
            <div style="margin-top: 10px; line-height: 1.6;">
                ${char.content}
            </div>
        </div>
    `;
}

// REST Principles Functions
function explainPrinciple(principle) {
    const resultDiv = document.getElementById('principleExplanation');
    const principles = {
        'client-server-principle': {
            title: '👥 Client-Server Architecture',
            content: `Separates the user interface concerns from the data storage concerns. This separation allows both components to evolve independently.

            <strong>Benefits:</strong>
            • Improved portability of user interface
            • Improved scalability through simplifying server components
            • Independent evolution of client and server`
        },
        'stateless-principle': {
            title: '🔄 Stateless Communication',
            content: `Each request from client to server must contain all information necessary to understand the request. Server cannot take advantage of any stored context on the server.

            <strong>Implementation:</strong>
            • Authentication tokens in each request
            • No server-side sessions
            • All state kept on client side

            <strong>Benefits:</strong>
            • Improved scalability
            • Simplified server implementation
            • Better reliability`
        },
        'cacheable': {
            title: '💾 Cacheable Responses',
            content: `Responses must define themselves as cacheable or non-cacheable to prevent clients from reusing stale data.

            <strong>HTTP Cache Headers:</strong>
            • Cache-Control: max-age=3600
            • ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
            • Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT

            <strong>Benefits:</strong>
            • Improved performance
            • Reduced server load
            • Better user experience`
        },
        'uniform': {
            title: '🎯 Uniform Interface',
            content: `Fundamental to REST design. Consists of four interface constraints:

            <strong>1. Resource Identification:</strong> URLs identify resources
            <strong>2. Resource Manipulation:</strong> Use representations to modify resources
            <strong>3. Self-descriptive Messages:</strong> Each message contains enough information to process it
            <strong>4. HATEOAS:</strong> Hypermedia as the Engine of Application State

            <strong>Benefits:</strong>
            • Simplified architecture
            • Improved visibility of interactions
            • Independent evolution of components`
        },
        'layered': {
            title: '🏗️ Layered System',
            content: `Architecture is composed of hierarchical layers. Each layer cannot see beyond the immediate layer it's interacting with.

            <strong>Examples of Layers:</strong>
            • Load balancers
            • Proxy servers
            • Gateways
            • Firewalls

            <strong>Benefits:</strong>
            • Improved scalability
            • Better security
            • Simplified individual components`
        },
        'code-on-demand': {
            title: '📜 Code on Demand (Optional)',
            content: `Servers can temporarily extend client functionality by transferring executable code.

            <strong>Examples:</strong>
            • JavaScript sent to web browsers
            • Java applets
            • Flash components

            <strong>Note:</strong> This is the only optional constraint in REST architecture.

            <strong>Benefits:</strong>
            • Improved flexibility
            • Reduced number of features required to be pre-implemented`
        }
    };
    
    const p = principles[principle];
    resultDiv.innerHTML = `
        <div style="color: #2c3e50;">
            <h4 style="color: #3498db;">${p.title}</h4>
            <div style="margin-top: 15px; line-height: 1.7;">
                ${p.content}
            </div>
        </div>
    `;
}

// HTTP Methods Functions
function demonstrateMethod(method) {
    const resultDiv = document.getElementById('methodDemo');
    const methods = {
        'GET': {
            title: 'GET - Retrieve Data',
            example: `
                <strong>Purpose:</strong> Retrieve data from server without side effects
                
                <strong>Example Request:</strong>
                GET /api/users/123 HTTP/1.1
                Host: api.example.com
                Authorization: Bearer token123
                
                <strong>Example Response:</strong>
                HTTP/1.1 200 OK
                Content-Type: application/json
                {
                  "id": 123,
                  "name": "John Doe",
                  "email": "john@example.com"
                }
                
                <strong>Characteristics:</strong>
                • Safe: No side effects on server
                • Idempotent: Multiple identical requests have same effect
                • Cacheable: Responses can be cached
            `,
            color: '#27ae60'
        },
        'POST': {
            title: 'POST - Create New Resource',
            example: `
                <strong>Purpose:</strong> Create a new resource on the server
                
                <strong>Example Request:</strong>
                POST /api/users HTTP/1.1
                Host: api.example.com
                Content-Type: application/json
                {
                  "name": "Jane Smith",
                  "email": "jane@example.com"
                }
                
                <strong>Example Response:</strong>
                HTTP/1.1 201 Created
                Location: /api/users/124
                {
                  "id": 124,
                  "name": "Jane Smith",
                  "email": "jane@example.com"
                }
                
                <strong>Characteristics:</strong>
                • Not Safe: Creates/modifies server state
                • Not Idempotent: Multiple requests create multiple resources
                • Not Cacheable: Generally not cached
            `,
            color: '#3498db'
        },
        'PUT': {
            title: 'PUT - Update/Replace Resource',
            example: `
                <strong>Purpose:</strong> Update or completely replace an existing resource
                
                <strong>Example Request:</strong>
                PUT /api/users/123 HTTP/1.1
                Host: api.example.com
                Content-Type: application/json
                {
                  "name": "John Updated",
                  "email": "john.updated@example.com"
                }
                
                <strong>Example Response:</strong>
                HTTP/1.1 200 OK
                {
                  "id": 123,
                  "name": "John Updated",
                  "email": "john.updated@example.com"
                }
                
                <strong>Characteristics:</strong>
                • Not Safe: Modifies server state
                • Idempotent: Multiple identical requests have same result
                • Replaces entire resource (not partial update)
            `,
            color: '#f39c12'
        },
        'PATCH': {
            title: 'PATCH - Partial Update',
            example: `
                <strong>Purpose:</strong> Apply partial modifications to a resource
                
                <strong>Example Request:</strong>
                PATCH /api/users/123 HTTP/1.1
                Host: api.example.com
                Content-Type: application/json
                {
                  "email": "newemail@example.com"
                }
                
                <strong>Example Response:</strong>
                HTTP/1.1 200 OK
                {
                  "id": 123,
                  "name": "John Doe",
                  "email": "newemail@example.com"
                }
                
                <strong>Characteristics:</strong>
                • Not Safe: Modifies server state
                • Not necessarily Idempotent: Depends on implementation
                • Updates only specified fields
            `,
            color: '#9b59b6'
        },
        'DELETE': {
            title: 'DELETE - Remove Resource',
            example: `
                <strong>Purpose:</strong> Remove a resource from the server
                
                <strong>Example Request:</strong>
                DELETE /api/users/123 HTTP/1.1
                Host: api.example.com
                Authorization: Bearer token123
                
                <strong>Example Response:</strong>
                HTTP/1.1 204 No Content
                
                (or)
                
                HTTP/1.1 200 OK
                {
                  "message": "User deleted successfully",
                  "deletedId": 123
                }
                
                <strong>Characteristics:</strong>
                • Not Safe: Modifies server state
                • Idempotent: Deleting same resource multiple times has same effect
                • May return 204 (No Content) or 200 (OK) with confirmation
            `,
            color: '#e74c3c'
        },
        'HEAD': {
            title: 'HEAD - Get Headers Only',
            example: `
                <strong>Purpose:</strong> Retrieve headers for a resource without the body
                
                <strong>Example Request:</strong>
                HEAD /api/users/123 HTTP/1.1
                Host: api.example.com
                
                <strong>Example Response:</strong>
                HTTP/1.1 200 OK
                Content-Type: application/json
                Content-Length: 156
                Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT
                ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
                
                (No response body)
                
                <strong>Use Cases:</strong>
                • Check if resource exists
                • Get metadata without downloading content
                • Validate cache entries
                
                <strong>Characteristics:</strong>
                • Safe: No side effects
                • Idempotent: Multiple requests have same effect
                • Cacheable: Like GET but without body
            `,
            color: '#34495e'
        }
    };
    
    const methodInfo = methods[method];
    resultDiv.innerHTML = `
        <div style="color: ${methodInfo.color};">
            <h4>${methodInfo.title}</h4>
            <div style="margin-top: 15px; line-height: 1.6; font-family: monospace; font-size: 0.9em; color: #2c3e50;">
                ${methodInfo.example}
            </div>
        </div>
    `;
}

// Quiz Functions
function checkAnswer(element, isCorrect) {
    // Remove previous answer classes
    const options = element.parentNode.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
    });
    
    // Add appropriate class
    if (isCorrect) {
        element.classList.add('correct');
        setTimeout(() => {
            alert('🎉 Correct! Well done!');
        }, 100);
    } else {
        element.classList.add('incorrect');
        // Find and highlight the correct answer
        options.forEach(opt => {
            opt.onclick = function() { checkAnswer(this, true); };
            if (opt.onclick.toString().includes('true')) {
                setTimeout(() => {
                    opt.classList.add('correct');
                }, 500);
            }
        });
        setTimeout(() => {
            alert('❌ Not quite right. The correct answer is highlighted in green.');
        }, 100);
    }
    
    // Disable further clicking
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        nextSection();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        previousSection();
    }
});

// Add smooth scrolling for better UX
function smoothScrollToElement(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Best Practices Section Functions
let currentQuizQuestion = 0;
const quizQuestions = [
    {
        question: "Which URL follows REST naming conventions?",
        options: [
            "GET /api/getUsers",
            "GET /api/users",
            "GET /api/user_list",
            "GET /api/fetchUsers"
        ],
        correct: 1,
        explanation: "REST APIs use nouns for resources, not verbs. /api/users is correct."
    },
    {
        question: "What HTTP status code should be returned when a resource is successfully created?",
        options: [
            "200 OK",
            "201 Created",
            "202 Accepted",
            "204 No Content"
        ],
        correct: 1,
        explanation: "201 Created indicates a resource was successfully created."
    },
    {
        question: "Which HTTP method is idempotent?",
        options: [
            "POST",
            "GET",
            "PATCH",
            "All of the above"
        ],
        correct: 1,
        explanation: "GET is idempotent - multiple identical requests have the same effect."
    },
    {
        question: "How should you handle API versioning?",
        options: [
            "Use different domains",
            "Include version in URL: /api/v1/users",
            "Use query parameters only",
            "Don't version APIs"
        ],
        correct: 1,
        explanation: "Including version in the URL path (/api/v1/) is a common best practice."
    }
];

function showQuiz() {
    currentQuizQuestion = 0;
    displayQuizQuestion();
}

function displayQuizQuestion() {
    const demoDisplay = document.getElementById('practiceDemo');
    const question = quizQuestions[currentQuizQuestion];
    
    const optionsHtml = question.options.map((option, index) => 
        `<button onclick="answerQuiz(${index})" style="display: block; margin: 10px 0; padding: 10px; background: #f0f0f0; border: none; border-radius: 5px; cursor: pointer; width: 100%;">${option}</button>`
    ).join('');
    
    demoDisplay.innerHTML = `<strong>Question ${currentQuizQuestion + 1}/${quizQuestions.length}:</strong>
    
${question.question}

${optionsHtml}`;
}

function answerQuiz(selectedIndex) {
    const demoDisplay = document.getElementById('practiceDemo');
    const question = quizQuestions[currentQuizQuestion];
    const isCorrect = selectedIndex === question.correct;
    
    const resultMessage = isCorrect ? 
        `✅ Correct! ${question.explanation}` : 
        `❌ Incorrect. ${question.explanation}`;
    
    const nextButton = currentQuizQuestion < quizQuestions.length - 1 ? 
        `<button onclick="nextQuizQuestion()" style="margin-top: 20px; padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Next Question</button>` :
        `<button onclick="finishQuiz()" style="margin-top: 20px; padding: 10px 20px; background: #2196F3; color: white; border: none; border-radius: 5px; cursor: pointer;">Finish Quiz</button>`;
    
    demoDisplay.innerHTML = `<strong>Question ${currentQuizQuestion + 1}:</strong> ${question.question}

${resultMessage}

${nextButton}`;
}

function nextQuizQuestion() {
    currentQuizQuestion++;
    displayQuizQuestion();
}

function finishQuiz() {
    const demoDisplay = document.getElementById('practiceDemo');
    demoDisplay.innerHTML = `🎉 <strong>Quiz Complete!</strong>

Great job learning about REST API best practices! 

Key takeaways:
• Use nouns for resource names
• Return appropriate HTTP status codes
• Make your APIs consistent and predictable
• Version your APIs for backward compatibility

<button onclick="showQuiz()" style="margin-top: 20px; padding: 10px 20px; background: #FF9800; color: white; border: none; border-radius: 5px; cursor: pointer;">Retake Quiz</button>`;
}

function showBestPracticeExample() {
    const demoDisplay = document.getElementById('practiceDemo');
    demoDisplay.innerHTML = `<strong>Complete REST API Example</strong>

// Good API Design Example
BASE_URL: https://api.example.com/v1

ENDPOINTS:
GET    /users              - List all users
GET    /users/123          - Get user by ID
GET    /users/123/posts    - Get user's posts
POST   /users              - Create new user
PUT    /users/123          - Update entire user
PATCH  /users/123          - Partial user update
DELETE /users/123          - Delete user

QUERY PARAMETERS:
GET /users?page=1&limit=10&sort=name&role=admin

RESPONSE EXAMPLES:
{
  "status": 200,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "pages": 15
  }
}

ERROR RESPONSE:
{
  "status": 400,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "field": "email"
  }
}`;
}

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Handle responsive adjustments if needed
        updateProgress();
    }, 250);
});

// Add some easter eggs for engaged learners
let clickCount = 0;
document.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 50) {
        showNotification('🎉 Wow! You\'re really engaged with this tutorial!', 'success');
    } else if (clickCount === 100) {
        showNotification('🏆 Tutorial Master! You\'ve clicked 100 times!', 'success');
    }
});

// Console message for curious developers
console.log(`
🚀 REST API Tutorial JavaScript Loaded Successfully!

This interactive tutorial covers:
• Client-Server Architecture
• Web Services vs APIs
• REST Principles and Best Practices
• HTTP Methods and Status Codes

Feel free to explore the code and learn how this tutorial works!

Quick Navigation Tips:
• Use arrow keys to navigate between sections
• Click on interactive elements to see demonstrations
• Complete quizzes to test your understanding

Happy Learning! 📚
`);

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        navigateToSection,
        nextSection,
        previousSection,
        simulateClientServer,
        demonstrateMethod,
        explainPrinciple
    };
}