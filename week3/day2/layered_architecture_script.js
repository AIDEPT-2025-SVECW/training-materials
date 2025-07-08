// Simulated database
let users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

let idCounter = 3;

// Utility function to add delay for demonstration
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Utility function to add log entry
function addLogEntry(layerId, action, details) {
    const logContent = document.querySelector(`#${layerId} .log-content`);
    const timestamp = new Date().toLocaleTimeString();
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <div class="timestamp">[${timestamp}]</div>
        <div class="action">${action}</div>
        <div>${details}</div>
    `;
    
    logContent.appendChild(logEntry);
    logContent.scrollTop = logContent.scrollHeight;
}

// Repository Layer - Data Access
class UserRepository {
    async save(user) {
        addLogEntry('repositoryLog', 'SAVE', `Persisting user: ${user.name}`);
        await delay(300);
        
        if (!user.id) {
            user.id = idCounter++;
        }
        
        const existingIndex = users.findIndex(u => u.id === user.id);
        if (existingIndex !== -1) {
            users[existingIndex] = user;
            addLogEntry('repositoryLog', 'UPDATE', `Updated user with ID: ${user.id}`);
        } else {
            users.push(user);
            addLogEntry('repositoryLog', 'INSERT', `Inserted new user with ID: ${user.id}`);
        }
        
        addLogEntry('repositoryLog', 'SUCCESS', `User saved successfully`);
        return user;
    }
    
    async findAll() {
        addLogEntry('repositoryLog', 'SELECT', 'Executing: SELECT * FROM users');
        await delay(200);
        
        addLogEntry('repositoryLog', 'RESULT', `Found ${users.length} users`);
        return [...users];
    }
    
    async findById(id) {
        addLogEntry('repositoryLog', 'SELECT', `Executing: SELECT * FROM users WHERE id = ${id}`);
        await delay(200);
        
        const user = users.find(u => u.id === id);
        if (user) {
            addLogEntry('repositoryLog', 'RESULT', `Found user: ${user.name}`);
        } else {
            addLogEntry('repositoryLog', 'RESULT', `No user found with ID: ${id}`);
        }
        
        return user;
    }
}

// Service Layer - Business Logic
class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    
    async createUser(userData) {
        addLogEntry('serviceLog', 'CREATE_USER', `Processing user creation: ${userData.name}`);
        
        // Business logic - validation
        if (!userData.name || userData.name.trim() === '') {
            addLogEntry('serviceLog', 'VALIDATION_ERROR', 'Name is required');
            throw new Error('Name is required');
        }
        
        if (!userData.email || !this.isValidEmail(userData.email)) {
            addLogEntry('serviceLog', 'VALIDATION_ERROR', 'Valid email is required');
            throw new Error('Valid email is required');
        }
        
        addLogEntry('serviceLog', 'VALIDATION_SUCCESS', 'User data validated successfully');
        
        // Check for duplicate email
        const existingUsers = await this.userRepository.findAll();
        const duplicateEmail = existingUsers.some(user => user.email === userData.email);
        
        if (duplicateEmail) {
            addLogEntry('serviceLog', 'BUSINESS_RULE_VIOLATION', 'Email already exists');
            throw new Error('Email already exists');
        }
        
        addLogEntry('serviceLog', 'BUSINESS_RULE_PASSED', 'Email uniqueness verified');
        
        // Business logic - data transformation
        const user = {
            name: userData.name.trim(),
            email: userData.email.toLowerCase().trim(),
            createdAt: new Date().toISOString()
        };
        
        addLogEntry('serviceLog', 'DATA_TRANSFORMATION', 'User data normalized');
        
        // Call repository
        const savedUser = await this.userRepository.save(user);
        
        addLogEntry('serviceLog', 'SUCCESS', `User created successfully with ID: ${savedUser.id}`);
        return savedUser;
    }
    
    async getAllUsers() {
        addLogEntry('serviceLog', 'GET_ALL_USERS', 'Retrieving all users');
        
        const users = await this.userRepository.findAll();
        
        // Business logic - sorting
        users.sort((a, b) => a.name.localeCompare(b.name));
        addLogEntry('serviceLog', 'DATA_PROCESSING', 'Users sorted alphabetically');
        
        addLogEntry('serviceLog', 'SUCCESS', `Retrieved ${users.length} users`);
        return users;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Controller Layer - Request Handling
class UserController {
    constructor() {
        this.userService = new UserService();
    }
    
    async createUser(request) {
        addLogEntry('controllerLog', 'POST /api/users', 'Received create user request');
        
        try {
            // Request validation
            if (!request.body) {
                addLogEntry('controllerLog', 'BAD_REQUEST', 'Missing request body');
                return {
                    status: 400,
                    body: { error: 'Request body is required' }
                };
            }
            
            addLogEntry('controllerLog', 'REQUEST_VALIDATION', 'Request structure validated');
            
            // Call service
            const user = await this.userService.createUser(request.body);
            
            // Response formatting
            const response = {
                status: 201,
                body: {
                    success: true,
                    data: user,
                    message: 'User created successfully'
                }
            };
            
            addLogEntry('controllerLog', 'RESPONSE_201', `User created: ${user.name}`);
            return response;
            
        } catch (error) {
            addLogEntry('controllerLog', 'ERROR_HANDLING', `Error: ${error.message}`);
            
            const response = {
                status: 400,
                body: {
                    success: false,
                    error: error.message
                }
            };
            
            addLogEntry('controllerLog', 'RESPONSE_400', 'Bad request response sent');
            return response;
        }
    }
    
    async getAllUsers() {
        addLogEntry('controllerLog', 'GET /api/users', 'Received get all users request');
        
        try {
            const users = await this.userService.getAllUsers();
            
            const response = {
                status: 200,
                body: {
                    success: true,
                    data: users,
                    count: users.length
                }
            };
            
            addLogEntry('controllerLog', 'RESPONSE_200', `Retrieved ${users.length} users`);
            return response;
            
        } catch (error) {
            addLogEntry('controllerLog', 'ERROR_HANDLING', `Error: ${error.message}`);
            
            const response = {
                status: 500,
                body: {
                    success: false,
                    error: 'Internal server error'
                }
            };
            
            addLogEntry('controllerLog', 'RESPONSE_500', 'Server error response sent');
            return response;
        }
    }
}

// Initialize controller
const userController = new UserController();

// UI Functions
async function createUser() {
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    
    if (!name || !email) {
        alert('Please enter both name and email');
        return;
    }
    
    const request = {
        body: { name, email }
    };
    
    const response = await userController.createUser(request);
    
    if (response.status === 201) {
        nameInput.value = '';
        emailInput.value = '';
        await updateUsersList();
        alert('User created successfully!');
    } else {
        alert(`Error: ${response.body.error}`);
    }
}

async function getAllUsers() {
    const response = await userController.getAllUsers();
    
    if (response.status === 200) {
        console.log('Users retrieved:', response.body.data);
        await updateUsersList();
    } else {
        alert(`Error: ${response.body.error}`);
    }
}

async function updateUsersList() {
    const response = await userController.getAllUsers();
    const usersList = document.getElementById('usersList');
    
    if (response.status === 200 && response.body.data.length > 0) {
        usersList.innerHTML = response.body.data.map(user => `
            <div class="user-card">
                <h3>${user.name}</h3>
                <p>${user.email}</p>
                <small>ID: ${user.id}</small>
            </div>
        `).join('');
    } else {
        usersList.innerHTML = '<p>No users found. Create some users to see them here!</p>';
    }
}

function clearLogs() {
    document.querySelectorAll('.log-content').forEach(logContent => {
        logContent.innerHTML = '';
    });
}

// Initialize the demo
document.addEventListener('DOMContentLoaded', function() {
    updateUsersList();
    
    // Add some initial log entries to show the structure
    addLogEntry('controllerLog', 'INIT', 'Controller layer initialized');
    addLogEntry('serviceLog', 'INIT', 'Service layer initialized');
    addLogEntry('repositoryLog', 'INIT', 'Repository layer initialized');
    
    // Add enter key support for inputs
    document.getElementById('userName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            createUser();
        }
    });
    
    document.getElementById('userEmail').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            createUser();
        }
    });
});