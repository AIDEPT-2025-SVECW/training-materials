// Servlet Presentation JavaScript
let currentSlide = 0;
const totalSlides = 8;
let lifecycleSteps = [];
let isAnimating = false;

// Initialize presentation
document.addEventListener('DOMContentLoaded', function() {
    initializePresentation();
    updateProgressBar();
    updateSlideCounter();
    updateNavigationButtons();
});

function initializePresentation() {
    // Get all lifecycle steps
    lifecycleSteps = document.querySelectorAll('.lifecycle-step');
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
    
    // Add touch/swipe support for mobile
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
            if (diff > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                previousSlide(); // Swipe right - previous slide
            }
        }
    }
}

function handleKeyboard(e) {
    switch(e.key) {
        case 'ArrowRight':
        case ' ':
            e.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            previousSlide();
            break;
        case 'Home':
            e.preventDefault();
            goToSlide(0);
            break;
        case 'End':
            e.preventDefault();
            goToSlide(totalSlides - 1);
            break;
    }
}

function nextSlide() {
    if (isAnimating || currentSlide >= totalSlides - 1) return;
    
    isAnimating = true;
    goToSlide(currentSlide + 1);
    
    setTimeout(() => {
        isAnimating = false;
    }, 800);
}

function previousSlide() {
    if (isAnimating || currentSlide <= 0) return;
    
    isAnimating = true;
    goToSlide(currentSlide - 1);
    
    setTimeout(() => {
        isAnimating = false;
    }, 800);
}

function goToSlide(slideNumber) {
    if (slideNumber < 0 || slideNumber >= totalSlides) return;
    
    // Hide current slide
    const currentSlideElement = document.querySelectorAll('.slide')[currentSlide];
    currentSlideElement.classList.remove('active');
    
    // Show new slide
    currentSlide = slideNumber;
    const newSlideElement = document.querySelectorAll('.slide')[currentSlide];
    newSlideElement.classList.add('active');
    
    // Update UI elements
    updateProgressBar();
    updateSlideCounter();
    updateNavigationButtons();
    
    // Reset any slide-specific states
    resetSlideStates();
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    progressFill.style.width = progress + '%';
}

function updateSlideCounter() {
    document.getElementById('slideNumber').textContent = currentSlide + 1;
    document.getElementById('totalSlides').textContent = totalSlides;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

function resetSlideStates() {
    // Reset lifecycle steps
    lifecycleSteps.forEach(step => {
        step.classList.remove('active');
    });
    
    // Hide demo elements
    const elementsToHide = [
        'servletDemo', 'lifecycleCode', 'responseFlow', 
        'webXmlDemo', 'structureDetail', 'httpMethodDemo', 'httpResponse'
    ];
    
    elementsToHide.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
        }
    });
}

// Interactive Demo Functions

function startPresentation() {
    if (currentSlide === 0) {
        nextSlide();
    }
    
    // Add a nice animation effect
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

function demonstrateServlet() {
    const demo = document.getElementById('servletDemo');
    demo.style.display = 'block';
    demo.classList.add('fade-in');
    
    // Simulate processing delay
    setTimeout(() => {
        demo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
}

function activateLifecycleStep(stepIndex) {
    // Reset all steps
    lifecycleSteps.forEach(step => step.classList.remove('active'));
    
    // Activate selected step
    if (lifecycleSteps[stepIndex]) {
        lifecycleSteps[stepIndex].classList.add('active');
    }
    
    // Show corresponding code
    const lifecycleCode = document.getElementById('lifecycleCode');
    const codeContent = document.getElementById('codeContent');
    
    const codeExamples = [
        // Loading
        `// 1. Loading Phase
// Servlet container loads the servlet class
ClassLoader.loadClass("com.example.HelloServlet");`,
        
        // Instantiation
        `// 2. Instantiation Phase
// Container creates servlet instance
HelloServlet servlet = new HelloServlet();`,
        
        // Initialization
        `// 3. Initialization Phase
public void init(ServletConfig config) throws ServletException {
    super.init(config);
    // Initialize resources, database connections, etc.
    System.out.println("Servlet initialized!");
}`,
        
        // Service
        `// 4. Service Phase
public void service(HttpServletRequest request, 
                   HttpServletResponse response) throws ServletException, IOException {
    String method = request.getMethod();
    if ("GET".equals(method)) {
        doGet(request, response);
    } else if ("POST".equals(method)) {
        doPost(request, response);
    }
}`,
        
        // Destruction
        `// 5. Destruction Phase
public void destroy() {
    // Clean up resources
    // Close database connections, files, etc.
    System.out.println("Servlet destroyed!");
}`
    ];
    
    if (stepIndex < codeExamples.length) {
        codeContent.textContent = codeExamples[stepIndex];
        lifecycleCode.style.display = 'block';
        lifecycleCode.classList.add('fade-in');
    }
}

function sendRequest() {
    const clientStatus = document.getElementById('clientStatus');
    const serverStatus = document.getElementById('serverStatus');
    const serverLoading = document.getElementById('serverLoading');
    const requestArrow = document.getElementById('requestArrow');
    
    // Animate request
    clientStatus.innerHTML = '📤 Sending HTTP GET request...';
    requestArrow.style.animation = 'pulse 0.5s infinite';
    
    setTimeout(() => {
        serverStatus.innerHTML = '📨 Request received!<br>Processing...';
        serverLoading.style.display = 'block';
    }, 1000);
    
    setTimeout(() => {
        serverStatus.innerHTML = '✅ Response prepared!<br>Sending back to client...';
        serverLoading.style.display = 'none';
        showResponse();
    }, 3000);
    
    setTimeout(() => {
        clientStatus.innerHTML = '✅ Response received!<br>Rendering page...';
        requestArrow.style.animation = 'pulse 2s infinite';
    }, 4000);
}

function showResponse() {
    const responseFlow = document.getElementById('responseFlow');
    const responseContent = document.getElementById('responseContent');
    
    responseContent.innerHTML = `
        <strong>HTTP/1.1 200 OK</strong><br>
        Content-Type: text/html<br>
        Content-Length: 25<br><br>
        <div style="background: #f0f0f0; padding: 10px; border-radius: 5px; color: #333;">
            <h1 style="color: #4ecdc4; margin: 0;">Hello World!</h1>
        </div>
    `;
    
    responseFlow.style.display = 'block';
    responseFlow.classList.add('fade-in');
}

function showWebXml() {
    const webXmlDemo = document.getElementById('webXmlDemo');
    webXmlDemo.style.display = 'block';
    webXmlDemo.classList.add('fade-in');
    
    // Animate code highlighting
    setTimeout(() => {
        const codeBlock = webXmlDemo.querySelector('.code-block');
        codeBlock.style.border = '2px solid #4ecdc4';
        setTimeout(() => {
            codeBlock.style.border = 'none';
        }, 2000);
    }, 500);
}

function showStructureDetail(type) {
    const structureDetail = document.getElementById('structureDetail');
    const structureContent = document.getElementById('structureContent');
    
    const structures = {
        project: `mywebapp/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/example/
│       │       └── HelloServlet.java
│       └── webapp/
│           ├── WEB-INF/
│           │   ├── web.xml
│           │   └── classes/
│           ├── index.html
│           └── css/
│               └── style.css
└── pom.xml`,
        
        webapp: `webapp/
├── WEB-INF/
│   ├── web.xml          ← Deployment descriptor
│   ├── classes/         ← Compiled servlet classes
│   └── lib/            ← JAR dependencies
├── index.html          ← Static HTML files
├── css/               ← Stylesheets
├── js/                ← JavaScript files
└── images/            ← Image resources`,
        
        webinf: `WEB-INF/
├── web.xml            ← Configuration file
├── classes/           ← Compiled Java classes
│   └── com/example/
│       └── HelloServlet.class
└── lib/              ← Library JAR files
    ├── servlet-api.jar
    └── other-libs.jar

⚠️ WEB-INF contents are NOT directly accessible to clients!`
    };
    
    structureContent.textContent = structures[type] || 'Unknown structure type';
    structureDetail.style.display = 'block';
    structureDetail.classList.add('fade-in');
}

function demoHttpMethod(method) {
    const httpMethodDemo = document.getElementById('httpMethodDemo');
    const httpMethodContent = document.getElementById('httpMethodContent');
    const httpResponse = document.getElementById('httpResponse');
    const responseOutput = document.getElementById('responseOutput');
    
    const methodExamples = {
        GET: {
            code: `protected void doGet(HttpServletRequest request, 
                      HttpServletResponse response) throws ServletException, IOException {
    
    // Get parameters from URL
    String name = request.getParameter("name");
    
    // Set response content type
    response.setContentType("text/html");
    
    // Write response
    PrintWriter out = response.getWriter();
    out.println("<h1>Hello " + (name != null ? name : "World") + "!</h1>");
}`,
            response: `<strong>GET /hello?name=John</strong><br>
                      <div style="background: #e8f5e8; padding: 10px; border-radius: 5px; margin-top: 10px;">
                          <h1 style="color: #2d5016; margin: 0;">Hello John!</h1>
                      </div>`
        },
        
        POST: {
            code: `protected void doPost(HttpServletRequest request, 
                       HttpServletResponse response) throws ServletException, IOException {
    
    // Get form data
    String username = request.getParameter("username");
    String email = request.getParameter("email");
    
    // Process form submission
    // Save user data to database...
    
    // Send confirmation response
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    out.println("<h1>User " + username + " registered successfully!</h1>");
}`,
            response: `<strong>POST /register</strong><br>
                      <div style="background: #fff3cd; padding: 10px; border-radius: 5px; margin-top: 10px;">
                          <h1 style="color: #856404; margin: 0;">User john_doe registered successfully!</h1>
                      </div>`
        },
        
        PUT: {
            code: `protected void doPut(HttpServletRequest request, 
                      HttpServletResponse response) throws ServletException, IOException {
    
    // Get resource ID from URL path
    String pathInfo = request.getPathInfo(); // /users/123
    String userId = pathInfo.substring(pathInfo.lastIndexOf('/') + 1);
    
    // Read JSON data from request body
    BufferedReader reader = request.getReader();
    // Parse and update user data...
    
    response.setStatus(HttpServletResponse.SC_OK);
    response.getWriter().println("User " + userId + " updated successfully");
}`,
            response: `<strong>PUT /users/123</strong><br>
                      <div style="background: #d1ecf1; padding: 10px; border-radius: 5px; margin-top: 10px;">
                          <h1 style="color: #0c5460; margin: 0;">User 123 updated successfully</h1>
                      </div>`
        },
        
        DELETE: {
            code: `protected void doDelete(HttpServletRequest request, 
                           HttpServletResponse response) throws ServletException, IOException {
    
    // Get resource ID to delete
    String pathInfo = request.getPathInfo(); // /users/123
    String userId = pathInfo.substring(pathInfo.lastIndexOf('/') + 1);
    
    // Delete user from database
    // userService.deleteUser(userId);
    
    response.setStatus(HttpServletResponse.SC_NO_CONTENT);
    response.getWriter().println("User " + userId + " deleted successfully");
}`,
            response: `<strong>DELETE /users/123</strong><br>
                      <div style="background: #f8d7da; padding: 10px; border-radius: 5px; margin-top: 10px;">
                          <h1 style="color: #721c24; margin: 0;">User 123 deleted successfully</h1>
                      </div>`
        }
    };
    
    const example = methodExamples[method];
    if (example) {
        httpMethodContent.textContent = example.code;
        httpMethodDemo.style.display = 'block';
        httpMethodDemo.classList.add('fade-in');
        
        // Show response after a delay
        setTimeout(() => {
            responseOutput.innerHTML = example.response;
            httpResponse.style.display = 'block';
            httpResponse.classList.add('fade-in');
        }, 1000);
    }
}

function restartPresentation() {
    goToSlide(0);
    
    // Add restart animation
    const button = event.target;
    button.innerHTML = '🔄 Restarting...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = 'Restart Presentation';
        button.disabled = false;
    }, 1000);
}

// Utility Functions

function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = 60;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add ripple effects to all demo buttons
document.addEventListener('DOMContentLoaded', function() {
    const demoButtons = document.querySelectorAll('.demo-button');
    demoButtons.forEach(addRippleEffect);
});

// Auto-advance slides (optional - can be enabled for demo mode)
let autoAdvanceInterval;

function startAutoAdvance(intervalMs = 10000) {
    autoAdvanceInterval = setInterval(() => {
        if (currentSlide < totalSlides - 1) {
            nextSlide();
        } else {
            stopAutoAdvance();
        }
    }, intervalMs);
}

function stopAutoAdvance() {
    if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
        autoAdvanceInterval = null;
    }
}

// Presentation mode controls
function enterPresentationMode() {
    document.documentElement.requestFullscreen?.() ||
    document.documentElement.webkitRequestFullscreen?.() ||
    document.documentElement.msRequestFullscreen?.();
}

function exitPresentationMode() {
    document.exitFullscreen?.() ||
    document.webkitExitFullscreen?.() ||
    document.msExitFullscreen?.();
}

// Add presentation mode toggle (Ctrl+F for fullscreen)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        if (document.fullscreenElement) {
            exitPresentationMode();
        } else {
            enterPresentationMode();
        }
    }
});

// Performance optimization - preload next slide content
function preloadNextSlide() {
    if (currentSlide < totalSlides - 1) {
        const nextSlideElement = document.querySelectorAll('.slide')[currentSlide + 1];
        // Trigger any lazy-loaded content preparation here
    }
}

// Error handling for demo functions
window.addEventListener('error', function(e) {
    console.error('Presentation error:', e.error);
    // Gracefully handle errors without breaking the presentation
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.setAttribute('aria-label', `Slide ${index + 1} of ${totalSlides}`);
        slide.setAttribute('role', 'region');
    });
    
    // Focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Ensure tab navigation works within the current slide
            const currentSlideElement = document.querySelectorAll('.slide')[currentSlide];
            const focusableElements = currentSlideElement.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length > 0 && !currentSlideElement.contains(document.activeElement)) {
                e.preventDefault();
                focusableElements[0].focus();
            }
        }
    });
});

console.log('🚀 Servlet Presentation JavaScript loaded successfully!');
console.log('📖 Use arrow keys or swipe to navigate slides');
console.log('🎯 Press Ctrl+F for fullscreen presentation mode');