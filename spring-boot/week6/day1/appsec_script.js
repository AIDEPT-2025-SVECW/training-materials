// Application Security Interactive Guide - JavaScript

// Global variables for demo
let currentUser = null;
let mfaCodeSent = false;
let correctMFACode = '123456';

// Navigation function
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Input validation demo
function validateInput() {
    const input = document.getElementById('userInput').value;
    const resultDiv = document.getElementById('validationResult');
    
    // Check for potentially dangerous input
    const dangerousPatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe/gi,
        /<object/gi,
        /<embed/gi
    ];
    
    let isDangerous = false;
    let detectedThreats = [];
    
    dangerousPatterns.forEach((pattern, index) => {
        if (pattern.test(input)) {
            isDangerous = true;
            const threatNames = ['Script injection', 'JavaScript protocol', 'Event handlers', 'Iframe injection', 'Object injection', 'Embed injection'];
            detectedThreats.push(threatNames[index]);
        }
    });
    
    if (isDangerous) {
        resultDiv.className = 'error-panel';
        resultDiv.innerHTML = `
            <h4><i class="fas fa-exclamation-triangle"></i> Security Threat Detected!</h4>
            <p><strong>Detected threats:</strong> ${detectedThreats.join(', ')}</p>
            <p><strong>Input blocked:</strong> This input could be used for XSS attacks.</p>
            <p><strong>Sanitized version:</strong> ${escapeHtml(input)}</p>
        `;
    } else if (input.trim() === '') {
        resultDiv.className = 'error-panel';
        resultDiv.innerHTML = `
            <h4><i class="fas fa-info-circle"></i> Empty Input</h4>
            <p>Please enter some text to validate.</p>
        `;
    } else {
        resultDiv.className = 'result-panel';
        resultDiv.innerHTML = `
            <h4><i class="fas fa-check-circle"></i> Input Validated Successfully!</h4>
            <p><strong>Safe input:</strong> ${escapeHtml(input)}</p>
            <p>This input appears to be safe and doesn't contain malicious code.</p>
        `;
    }
}

// HTML escape function
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Authentication demo
function authenticate() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const resultDiv = document.getElementById('authResult');
    const authzBtn = document.getElementById('authzBtn');
    
    // Simple demo credentials
    const validCredentials = {
        'admin': 'admin123',
        'user': 'user123',
        'guest': 'guest123',
        'moderator': 'mod123'
    };
    
    if (!username || !password) {
        resultDiv.className = 'error-panel';
        resultDiv.innerHTML = `
            <h4><i class="fas fa-times-circle"></i> Authentication Failed</h4>
            <p>Please enter both username and password.</p>
        `;
        currentUser = null;
        authzBtn.disabled = true;
        return;
    }
    
    if (validCredentials[username] === password) {
        currentUser = {
            username: username,
            role: username === 'admin' ? 'admin' : username === 'moderator' ? 'moderator' : username === 'user' ? 'user' : 'guest'
        };
        
        resultDiv.className = 'result-panel';
        resultDiv.innerHTML = `
            <h4><i class="fas fa-check-circle"></i> Authentication Successful!</h4>
            <p><strong>Welcome, ${username}!</strong></p>
            <p>Role: ${currentUser.role}</p>
            <p>You can now test authorization.</p>
        `;
        authzBtn.disabled = false;
    } else {
        resultDiv.className = 'error-panel';
        resultDiv.innerHTML = `
            <h4><i class="fas fa-times-circle"></i> Authentication Failed</h4>
            <p>Invalid credentials. Try:</p>
            <ul>
                <li>admin / admin123</li>
                <li>user / user123</li>
                <li>moderator / mod123</li>
                <li>guest / guest123</li>
            </ul>
        `;
        currentUser = null;
        authzBtn.disabled = true;
    }
}

// Authorization demo
function authorize() {
    const action = document.getElementById('requestedAction').value;
    const resultDiv = document.getElementById('authzResult');
    
    if (!currentUser) {
        resultDiv.className = 'error-panel';
        resultDiv.innerHTML = `
            <h4><i class="fas fa-times-circle"></i> Authorization Failed</h4>
            <p>Please authenticate first.</p>
        `;
        return;
    }
    
    // Define role permissions
    const permissions = {
        'admin': ['read', 'write', 'delete', 'admin'],
        'moderator': ['read', 'write', 'delete'],
        'user': ['read', 'write'],
        'guest': ['read']
    };
    
    const userPermissions = permissions[currentUser.role] || [];
    const hasPermission = userPermissions.includes(action);
    
    if (hasPermission) {
        resultDiv.className = 'result-panel';
        resultDiv.innerHTML = `
            <h4><i class="fas fa-check-circle"></i> Authorization Granted!</h4>
            <p><strong>User:</strong> ${currentUser.username}</p>
            <p><strong>Role:</strong> ${currentUser.role}</p>
            <p><strong>Action:</strong> ${action}</p>
            <p><strong>Status:</strong> Access granted</p>
        `;
    } else {
        resultDiv.className = 'error-panel';
        resultDiv.innerHTML = `
            <h4><i class="fas fa-times-circle"></i> Authorization Denied!</h4>
            <p><strong>User:</strong> ${currentUser.username}</p>
            <p><strong>Role:</strong> ${currentUser.role}</p>
            <p><strong>Action:</strong> ${action}</p>
            <p><strong>Status:</strong> Insufficient permissions</p>
            <p><strong>Required role:</strong> ${getRequiredRole(action)}</p>
        `;
    }
}

// Get required role for action
function getRequiredRole(action) {
    const roleRequirements = {
        'read': 'guest or higher',
        'write': 'user or higher',
        'delete': 'moderator or higher',
        'admin': 'admin only'
    };
    return roleRequirements[action] || 'unknown';
}

// MFA Demo functions
function sendMFACode() {
    const password = document.getElementById('mfaPassword').value;
    
    if (password !== 'demo123') {
        alert('Incorrect password. Use: demo123');
        return;
    }
    
    mfaCodeSent = true;
    correctMFACode = Math.floor(100000 + Math.random() * 900000).toString();
    
    alert(`SMS Code sent: ${correctMFACode}\n(In real implementation, this would be sent to your phone)`);
}

function verifyMFA() {
    const password = document.getElementById('mfaPassword').value;
    const code = document.getElementById('mfaCode').value;
    const resultDiv = document.getElementById('mfaResult');
    
    if (!password || !code) {
        resultDiv.className = 'error-panel';
        resultDiv.innerHTML = `
            <h4><i class="fas fa-times-circle"></i> MFA Failed</h4>
            <p>Please enter both password and SMS code.</p>
        `;
        return;
    }
    
    if (password !== 'demo123') {
        resultDiv.className = 'error-panel';
        resultDiv.innerHTML = `
            <h4><i class="fas fa-times-circle"></i> MFA Failed</h4>
            <p>Incorrect password. Use: demo123</p>
        `;
        return;
    }
    
    if (!mfaCodeSent) {
        resultDiv.className = 'error-panel';
        resultDiv.innerHTML = `
            <h4><i class="fas fa-times-circle"></i> MFA Failed</h4>
            <p>Please send SMS code first.</p>
        `;
        return;
    }
    
    if (code === correctMFACode) {
        resultDiv.className = 'result-panel';
        resultDiv.innerHTML = `
            <h4><i class="fas fa-check-circle"></i> MFA Authentication Successful!</h4>
            <p><strong>Step 1:</strong> Password verified ✓</p>
            <p><strong>Step 2:</strong> SMS code verified ✓</p>
            <p><strong>Security Level:</strong> High (2-Factor)</p>
            <p>Multi-factor authentication provides enhanced security by requiring multiple forms of verification.</p>
        `;
    } else {
        resultDiv.className = 'error-panel';
        resultDiv.innerHTML = `
            <h4><i class="fas fa-times-circle"></i> MFA Failed</h4>
            <p>Incorrect SMS code. Please check the code sent to your device.</p>
        `;
    }
}

// RBAC Demo functions
function updatePermissions() {
    const role = document.getElementById('userRole').value;
    const roleBadgesDiv = document.getElementById('roleBadges');
    const permissionGridDiv = document.getElementById('permissionGrid');
    
    // Define role hierarchies and permissions
    const roleData = {
        'guest': {
            level: 1,
            permissions: ['read'],
            description: 'Basic read-only access',
            color: '#9E9E9E'
        },
        'user': {
            level: 2,
            permissions: ['read', 'write'],
            description: 'Standard user privileges',
            color: '#2196F3'
        },
        'moderator': {
            level: 3,
            permissions: ['read', 'write', 'delete', 'moderate'],
            description: 'Content moderation rights',
            color: '#FF9800'
        },
        'admin': {
            level: 4,
            permissions: ['read', 'write', 'delete', 'moderate', 'admin', 'user-management'],
            description: 'Full system access',
            color: '#F44336'
        }
    };
    
    const currentRole = roleData[role];
    
    // Update role badges
    roleBadgesDiv.innerHTML = `
        <div class="role-badge" style="background-color: ${currentRole.color}">
            ${role.toUpperCase()} - Level ${currentRole.level}
        </div>
        <div style="color: #666; font-style: italic; margin-top: 5px;">
            ${currentRole.description}
        </div>
    `;
    
    // Define all possible permissions
    const allPermissions = [
        { name: 'read', label: 'Read Data', icon: 'fas fa-eye' },
        { name: 'write', label: 'Write Data', icon: 'fas fa-edit' },
        { name: 'delete', label: 'Delete Data', icon: 'fas fa-trash' },
        { name: 'moderate', label: 'Moderate Content', icon: 'fas fa-gavel' },
        { name: 'admin', label: 'Admin Panel', icon: 'fas fa-cog' },
        { name: 'user-management', label: 'Manage Users', icon: 'fas fa-users-cog' }
    ];
    
    // Update permission grid
    permissionGridDiv.innerHTML = allPermissions.map(permission => {
        const hasPermission = currentRole.permissions.includes(permission.name);
        const status = hasPermission ? 'allowed' : 'denied';
        const statusIcon = hasPermission ? 'fas fa-check' : 'fas fa-times';
        const statusText = hasPermission ? 'ALLOWED' : 'DENIED';
        
        return `
            <div class="permission-item ${status}">
                <i class="${permission.icon}" style="font-size: 24px; margin-bottom: 8px;"></i>
                <div style="font-weight: 600; margin-bottom: 4px;">${permission.label}</div>
                <div style="font-size: 12px;">
                    <i class="${statusIcon}"></i> ${statusText}
                </div>
            </div>
        `;
    }).join('');
}

// Security best practices data
const securityBestPractices = {
    authentication: [
        'Use strong password policies (complexity, length, expiration)',
        'Implement multi-factor authentication (MFA)',
        'Use secure password storage (bcrypt, Argon2)',
        'Implement account lockout mechanisms',
        'Use HTTPS for all authentication endpoints',
        'Implement proper session management'
    ],
    authorization: [
        'Follow principle of least privilege',
        'Implement role-based access control (RBAC)',
        'Use attribute-based access control for complex scenarios',
        'Regularly audit user permissions',
        'Implement proper session timeout',
        'Use secure token storage and transmission'
    ],
    secureCode: [
        'Validate and sanitize all user input',
        'Use parameterized queries to prevent SQL injection',
        'Implement Content Security Policy (CSP)',
        'Use HTTPS everywhere',
        'Keep dependencies updated',
        'Implement proper error handling'
    ]
};

// Threat simulation function
function simulateThreat(threatType) {
    const threats = {
        'sql-injection': {
            name: 'SQL Injection',
            example: "'; DROP TABLE users; --",
            prevention: 'Use parameterized queries and input validation',
            severity: 'Critical'
        },
        'xss': {
            name: 'Cross-Site Scripting',
            example: '<script>alert("XSS Attack")</script>',
            prevention: 'Output encoding and Content Security Policy',
            severity: 'High'
        },
        'csrf': {
            name: 'Cross-Site Request Forgery',
            example: 'Unauthorized form submission from malicious site',
            prevention: 'CSRF tokens and SameSite cookies',
            severity: 'Medium'
        }
    };
    
    const threat = threats[threatType];
    if (threat) {
        alert(`
Threat: ${threat.name}
Severity: ${threat.severity}
Example: ${threat.example}
Prevention: ${threat.prevention}
        `);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize RBAC demo
    updatePermissions();
    
    // Add event listeners for interactive elements
    document.getElementById('userInput')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validateInput();
        }
    });
    
    document.getElementById('username')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            authenticate();
        }
    });
    
    document.getElementById('password')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            authenticate();
        }
    });
    
    document.getElementById('mfaPassword')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMFACode();
        }
    });
    
    document.getElementById('mfaCode')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verifyMFA();
        }
    });
    
    // Add smooth scrolling effect
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    console.log('Application Security Interactive Guide loaded successfully!');
    console.log('Available demo credentials:');
    console.log('- admin / admin123 (Administrator)');
    console.log('- moderator / mod123 (Moderator)');
    console.log('- user / user123 (Regular User)');
    console.log('- guest / guest123 (Guest)');
    console.log('MFA demo password: demo123');
});

// Utility functions for enhanced interactivity
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function downloadSecurityChecklist() {
    const checklist = `
SECURITY CHECKLIST
==================

AUTHENTICATION:
☐ Strong password policy implemented
☐ Multi-factor authentication enabled
☐ Account lockout mechanisms in place
☐ Secure session management
☐ HTTPS for all auth endpoints

AUTHORIZATION:
☐ Principle of least privilege followed
☐ Role-based access control implemented
☐ Regular permission audits conducted
☐ Secure token management
☐ Proper session timeout

SECURE CODING:
☐ Input validation implemented
☐ Parameterized queries used
☐ Output encoding applied
☐ Dependencies kept updated
☐ Error handling implemented
☐ Security headers configured

GENERAL:
☐ Regular security assessments
☐ Incident response plan ready
☐ Security training completed
☐ Backup and recovery tested
☐ Monitoring and logging active
    `;
    
    const blob = new Blob([checklist], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'security-checklist.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Advanced security concepts demo
function demonstrateZeroTrust() {
    alert(`
ZERO TRUST SECURITY MODEL
=========================

Principles:
1. Never trust, always verify
2. Verify explicitly using multiple data points
3. Use least privilege access principles
4. Assume breach mentality
5. Continuous monitoring and validation

Implementation:
- Identity verification for every transaction
- Device trust verification
- Application and workload security
- Data protection everywhere
- Network security and segmentation
- Visibility, analytics, and automation
    `);
}

function demonstrateDefenseInDepth() {
    alert(`
DEFENSE IN DEPTH STRATEGY
=========================

Security Layers:
1. Physical Security
2. Network Security (Firewalls, IDS/IPS)
3. Host Security (Anti-malware, Updates)
4. Application Security (Code review, WAF)
5. Data Security (Encryption, DLP)
6. Identity and Access Management
7. Security Policies and Procedures
8. User Awareness and Training

Each layer provides redundancy and failover protection.
    `);
}