// Global state management
let currentUser = null;
let userDatabase = [
    { username: 'student', password: 'password', role: 'USER' },
    { username: 'admin', password: 'admin123', role: 'ADMIN' }
];

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeFilterChain();
    updateAuthStatus();
});

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Overview Tab Functions
function showDefaultLogin() {
    const loginDiv = document.getElementById('default-login');
    loginDiv.classList.toggle('hidden');
    
    if (!loginDiv.classList.contains('hidden')) {
        loginDiv.classList.add('slide-in');
        // Generate a random password for demo
        const randomPassword = 'generated-' + Math.random().toString(36).substr(2, 8);
        loginDiv.querySelector('input[type="password"]').value = randomPassword;
    }
}

// Filter Chain Functions
function initializeFilterChain() {
    const filters = document.querySelectorAll('.filter');
    const filterInfo = document.getElementById('filter-info');
    
    const filterDetails = {
        'security-context': {
            name: 'SecurityContextPersistenceFilter',
            description: 'This filter is responsible for managing the SecurityContext between HTTP requests. It loads the SecurityContext from the SecurityContextRepository (usually HttpSession) at the beginning of the request and saves it back at the end.',
            purpose: 'Maintains user authentication state across requests'
        },
        'logout': {
            name: 'LogoutFilter',
            description: 'This filter handles logout requests. When a logout URL is accessed, it clears the SecurityContext, invalidates the session, and redirects to a specified URL.',
            purpose: 'Processes logout requests and cleans up authentication state'
        },
        'username-password': {
            name: 'UsernamePasswordAuthenticationFilter',
            description: 'This filter processes username/password authentication from login forms. It extracts credentials from the request and attempts to authenticate the user.',
            purpose: 'Handles form-based authentication (login forms)'
        },
        'basic-auth': {
            name: 'BasicAuthenticationFilter',
            description: 'This filter processes HTTP Basic Authentication. It extracts username/password from the Authorization header and authenticates the user.',
            purpose: 'Handles HTTP Basic Authentication (Authorization header)'
        },
        'authorization': {
            name: 'FilterSecurityInterceptor',
            description: 'This is the final filter in the chain that makes access control decisions. It checks if the authenticated user has the required permissions to access the requested resource.',
            purpose: 'Makes final authorization decisions based on user roles and permissions'
        }
    };
    
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const filterType = filter.getAttribute('data-filter');
            const details = filterDetails[filterType];
            
            if (details) {
                filterInfo.innerHTML = `
                    <h4>${details.name}</h4>
                    <p><strong>Purpose:</strong> ${details.purpose}</p>
                    <p><strong>Description:</strong> ${details.description}</p>
                `;
                filter.classList.add('bounce');
                setTimeout(() => filter.classList.remove('bounce'), 600);
            }
        });
    });
}

function animateFilterChain() {
    const filters = document.querySelectorAll('.filter');
    const request = document.querySelector('.request-start');
    const dispatcherServlet = document.querySelector('.dispatcher-servlet')
    const controller = document.querySelector('.controller-end');
    
    // Reset all filters
    filters.forEach(filter => filter.classList.remove('active'));
    
    // Animate request start
    request.classList.add('bounce');
    setTimeout(() => request.classList.remove('bounce'), 600);
    
    // Animate each filter with delay
    filters.forEach((filter, index) => {
        setTimeout(() => {
            filter.classList.add('active');
            setTimeout(() => filter.classList.remove('active'), 800);
        }, (index + 1) * 800);
    });

    // Animate dispatcher-servlet
    setTimeout(() => {
        dispatcherServlet.classList.add('bounce');
        setTimeout(() => dispatcherServlet.classList.remove('bounce'), 600);
    }, (filters.length + 1) * 800);
    
    // Animate controller at the end
    setTimeout(() => {
        controller.classList.add('bounce');
        setTimeout(() => controller.classList.remove('bounce'), 600);
    }, (filters.length + 2) * 800);
}

// Authentication Tab Functions
function updateConfig() {
    const username = document.getElementById('config-username').value;
    const password = document.getElementById('config-password').value;
    const resultDiv = document.getElementById('config-result');
    
    if (username && password) {
        resultDiv.innerHTML = `
            <strong>Configuration Updated!</strong><br>
            New credentials: <code>${username}</code> / <code>${password}</code><br>
            <small>In a real application, this would update your application.properties file</small>
        `;
        resultDiv.className = 'config-result success';
    } else {
        resultDiv.innerHTML = 'Please provide both username and password';
        resultDiv.className = 'config-result error';
    }
}

function addUser() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const role = document.getElementById('new-role').value;
    
    if (username && password) {
        // Check if user already exists
        const existingUser = userDatabase.find(user => user.username === username);
        if (existingUser) {
            alert('User already exists!');
            return;
        }
        
        userDatabase.push({ username, password, role });
        updateUserList();
        
        // Clear form
        document.getElementById('new-username').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('new-role').value = 'USER';
    } else {
        alert('Please provide username and password');
    }
}

function updateUserList() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    
    userDatabase.forEach((user, index) => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        
        const roleIcon = user.role === 'ADMIN' ? '👨‍💼' : '👤';
        userItem.innerHTML = `
            <span>${roleIcon} ${user.username} (${user.role})</span>
            <span>🔑 ${user.password}</span>
            <button onclick="removeUser(${index})" style="background: #dc3545; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 3px; cursor: pointer;">Remove</button>
        `;
        
        userList.appendChild(userItem);
    });
}

function removeUser(index) {
    if (userDatabase.length > 1) { // Keep at least one user
        userDatabase.splice(index, 1);
        updateUserList();
    } else {
        alert('Cannot remove the last user!');
    }
}

// Authorization Tab Functions
function testEndpoint(endpoint) {
    const currentTestUser = document.getElementById('test-user').value;
    const resultId = 'result-' + endpoint.split('/')[1];
    const resultSpan = document.getElementById(resultId);
    
    // Define authorization rules
    const authRules = {
        '/public/info': ['anonymous', 'student', 'admin'],
        '/user/profile': ['student', 'admin'],
        '/admin/dashboard': ['admin']
    };
    
    const allowedUsers = authRules[endpoint] || [];
    
    if (allowedUsers.includes(currentTestUser)) {
        resultSpan.textContent = '✅ 200 OK';
        resultSpan.className = 'result success';
    } else {
        if (currentTestUser === 'anonymous') {
            resultSpan.textContent = '🔒 401 Unauthorized';
        } else {
            resultSpan.textContent = '🚫 403 Forbidden';
        }
        resultSpan.className = 'result error';
    }
    
    // Add animation
    resultSpan.classList.add('bounce');
    setTimeout(() => resultSpan.classList.remove('bounce'), 600);
}

// Live Demo Functions
function updateAuthStatus() {
    const authStatus = document.getElementById('auth-status');
    const logoutBtn = document.getElementById('logout-btn');
    const demoLogin = document.getElementById('demo-login');
    const demoContent = document.getElementById('demo-content');
    
    if (currentUser) {
        authStatus.textContent = `Authenticated as ${currentUser.username} (${currentUser.role})`;
        authStatus.className = 'authenticated';
        logoutBtn.classList.remove('hidden');
        demoLogin.classList.add('hidden');
        demoContent.classList.remove('hidden');
        
        const welcomeMessage = document.getElementById('welcome-message');
        welcomeMessage.innerHTML = `
            Welcome, <strong>${currentUser.username}</strong>! 
            You are logged in with <strong>${currentUser.role}</strong> role.
        `;
    } else {
        authStatus.textContent = 'Not Authenticated';
        authStatus.className = 'not-authenticated';
        logoutBtn.classList.add('hidden');
        demoLogin.classList.remove('hidden');
        demoContent.classList.add('hidden');
    }
}

function attemptLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    const user = userDatabase.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        updateAuthStatus();
        
        // Clear form
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
        
        // Show success animation
        const demoContent = document.getElementById('demo-content');
        demoContent.classList.add('slide-in');
    } else {
        alert('Invalid credentials! Try:\n- student / password\n- admin / admin123');
    }
    
    return false;
}

function logout() {
    currentUser = null;
    updateAuthStatus();
    
    // Clear any previous endpoint responses
    const endpointResponse = document.getElementById('endpoint-response');
    endpointResponse.innerHTML = '';
    endpointResponse.className = 'endpoint-response';
}

function accessEndpoint(endpoint) {
    const endpointResponse = document.getElementById('endpoint-response');
    
    if (!currentUser) {
        endpointResponse.innerHTML = `
            <h4>🔒 Authentication Required</h4>
            <p>You must be logged in to access this endpoint.</p>
        `;
        endpointResponse.className = 'endpoint-response error';
        return;
    }
    
    // Define endpoint access rules and content
    const endpointConfig = {
        '/public': {
            allowedRoles: ['USER', 'ADMIN'],
            content: {
                title: '📖 Public Content',
                message: 'This is public content that any authenticated user can access.',
                data: 'Here you might find general information, documentation, or public announcements.'
            }
        },
        '/user': {
            allowedRoles: ['USER', 'ADMIN'],
            content: {
                title: '👤 User Content',
                message: 'This is user-specific content available to authenticated users.',
                data: `Welcome ${currentUser.username}! Here's your user dashboard with personal information and user-level features.`
            }
        },
        '/admin': {
            allowedRoles: ['ADMIN'],
            content: {
                title: '👨‍💼 Admin Content',
                message: 'This is administrative content only available to admin users.',
                data: 'Admin Dashboard: User management, system settings, analytics, and administrative tools are available here.'
            }
        }
    };
    
    const config = endpointConfig[endpoint];
    
    if (!config) {
        endpointResponse.innerHTML = `
            <h4>❌ Endpoint Not Found</h4>
            <p>The requested endpoint <code>${endpoint}</code> does not exist.</p>
        `;
        endpointResponse.className = 'endpoint-response error';
        return;
    }
    
    if (config.allowedRoles.includes(currentUser.role)) {
        endpointResponse.innerHTML = `
            <h4>${config.content.title}</h4>
            <p><strong>Status:</strong> ✅ 200 OK - Access Granted</p>
            <p><strong>Message:</strong> ${config.content.message}</p>
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin-top: 1rem;">
                <strong>Response Data:</strong><br>
                ${config.content.data}
            </div>
            <div style="margin-top: 1rem; font-size: 0.9rem; color: #6c757d;">
                <strong>User:</strong> ${currentUser.username} (${currentUser.role})<br>
                <strong>Endpoint:</strong> ${endpoint}<br>
                <strong>Timestamp:</strong> ${new Date().toLocaleString()}
            </div>
        `;
        endpointResponse.className = 'endpoint-response success';
    } else {
        endpointResponse.innerHTML = `
            <h4>🚫 Access Denied</h4>
            <p><strong>Status:</strong> 403 Forbidden</p>
            <p>Your role <strong>${currentUser.role}</strong> does not have permission to access <code>${endpoint}</code></p>
            <p><strong>Required roles:</strong> ${config.allowedRoles.join(', ')}</p>
            <div style="margin-top: 1rem; font-size: 0.9rem; color: #6c757d;">
                <strong>User:</strong> ${currentUser.username} (${currentUser.role})<br>
                <strong>Attempted Endpoint:</strong> ${endpoint}<br>
                <strong>Timestamp:</strong> ${new Date().toLocaleString()}
            </div>
        `;
        endpointResponse.className = 'endpoint-response error';
    }
    
    // Add animation
    endpointResponse.classList.add('slide-in');
    setTimeout(() => endpointResponse.classList.remove('slide-in'), 500);
}

// Utility Functions
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 1rem;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

// Initialize user list on page load
document.addEventListener('DOMContentLoaded', function() {
    updateUserList();
});

// Add some educational tooltips
function addTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 0.8rem;
                z-index: 1000;
                max-width: 200px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.bottom + 5) + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                document.body.removeChild(tooltip);
            }
        });
    });
}

// Call addTooltips after DOM is loaded
document.addEventListener('DOMContentLoaded', addTooltips);