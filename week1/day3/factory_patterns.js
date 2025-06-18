// Factory Patterns JavaScript Implementation
// This file contains all the interactive functions for the Java Factory Patterns demo

// ==================== TAB FUNCTIONALITY ====================
function showTab(tabId) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// ==================== SINGLETON PATTERN ====================
class DatabaseConnection {
    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }
        
        this.connectionString = "jdbc:mysql://localhost:3306/mydb";
        this.connectionCount = 0;
        this.instanceId = Math.floor(Math.random() * 10000);
        
        console.log("Database connection created!");
        DatabaseConnection.instance = this;
        return this;
    }
    
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    
    connect() {
        this.connectionCount++;
        return `Connected to: ${this.connectionString} (Connection #${this.connectionCount})`;
    }
    
    getStatus() {
        return `Instance ID: ${this.instanceId}, Total connections: ${this.connectionCount}`;
    }
}

function testSingleton() {
    const output = document.getElementById('singleton-output');
    const db = DatabaseConnection.getInstance();
    const connectionResult = db.connect();
    const status = db.getStatus();
    
    output.textContent += `🔗 ${connectionResult}\n📊 ${status}\n\n`;
    output.scrollTop = output.scrollHeight;
}

function testMultipleSingleton() {
    const output = document.getElementById('singleton-output');
    output.textContent += "🧪 Testing multiple instance creation:\n";
    
    const db1 = DatabaseConnection.getInstance();
    const db2 = DatabaseConnection.getInstance();
    const db3 = new DatabaseConnection(); // This will return the same instance
    
    output.textContent += `Instance 1 ID: ${db1.instanceId}\n`;
    output.textContent += `Instance 2 ID: ${db2.instanceId}\n`;
    output.textContent += `Instance 3 ID: ${db3.instanceId}\n`;
    output.textContent += `Are they the same? ${db1 === db2 && db2 === db3 ? '✅ YES' : '❌ NO'}\n\n`;
    
    output.scrollTop = output.scrollHeight;
}

// ==================== FACTORY METHOD PATTERN ====================
class Vehicle {
    constructor() {
        this.type = '';
        this.engine = '';
    }
    
    start() {
        throw new Error('start() method must be implemented');
    }
    
    getDetails() {
        return `Type: ${this.type}, Engine: ${this.engine}`;
    }
}

class Car extends Vehicle {
    constructor() {
        super();
        this.type = 'Car';
        this.engine = 'V6 Engine';
    }
    
    start() {
        return '🚗 Car engine started with a smooth purr!';
    }
}

class Motorcycle extends Vehicle {
    constructor() {
        super();
        this.type = 'Motorcycle';
        this.engine = 'Single Cylinder Engine';
    }
    
    start() {
        return '🏍️ Motorcycle engine roars to life!';
    }
}

class Truck extends Vehicle {
    constructor() {
        super();
        this.type = 'Truck';
        this.engine = 'V8 Diesel Engine';
    }
    
    start() {
        return '🚛 Truck engine rumbles powerfully!';
    }
}

class VehicleFactory {
    static createVehicle(type) {
        switch (type.toLowerCase()) {
            case 'car':
                return new Car();
            case 'motorcycle':
                return new Motorcycle();
            case 'truck':
                return new Truck();
            default:
                throw new Error(`Unknown vehicle type: ${type}`);
        }
    }
}

function createVehicle(type) {
    const output = document.getElementById('factory-output');
    
    try {
        const vehicle = VehicleFactory.createVehicle(type);
        const startMessage = vehicle.start();
        const details = vehicle.getDetails();
        
        output.textContent += `🏭 Created: ${startMessage}\n`;
        output.textContent += `📋 Details: ${details}\n\n`;
    } catch (error) {
        output.textContent += `❌ Error: ${error.message}\n\n`;
    }
    
    output.scrollTop = output.scrollHeight;
}

function createRandomVehicle() {
    const vehicles = ['car', 'motorcycle', 'truck'];
    const randomType = vehicles[Math.floor(Math.random() * vehicles.length)];
    
    const output = document.getElementById('factory-output');
    output.textContent += `🎲 Randomly selected: ${randomType.toUpperCase()}\n`;
    
    createVehicle(randomType);
}

// ==================== ABSTRACT FACTORY PATTERN ====================
// Abstract Products (interfaces simulated with classes)
class Button {
    render() {
        throw new Error('render() method must be implemented');
    }
}

class TextField {
    render() {
        throw new Error('render() method must be implemented');
    }
}

// Windows Products
class WindowsButton extends Button {
    render() {
        return '🔵 [Windows Button] - Flat design with blue accent';
    }
}

class WindowsTextField extends TextField {
    render() {
        return '📝 [Windows TextField] - Rectangular with system font';
    }
}

// Mac Products
class MacButton extends Button {
    render() {
        return '🔴 [Mac Button] - Rounded corners with gradient';
    }
}

class MacTextField extends TextField {
    render() {
        return '📝 [Mac TextField] - Rounded with subtle shadow';
    }
}

// Linux Products (bonus)
class LinuxButton extends Button {
    render() {
        return '🟠 [Linux Button] - Simple with orange highlight';
    }
}

class LinuxTextField extends TextField {
    render() {
        return '📝 [Linux TextField] - Minimalist design with focus ring';
    }
}

// Abstract Factory
class UIFactory {
    createButton() {
        throw new Error('createButton() method must be implemented');
    }
    
    createTextField() {
        throw new Error('createTextField() method must be implemented');
    }
}

// Concrete Factories
class WindowsFactory extends UIFactory {
    createButton() {
        return new WindowsButton();
    }
    
    createTextField() {
        return new WindowsTextField();
    }
}

class MacFactory extends UIFactory {
    createButton() {
        return new MacButton();
    }
    
    createTextField() {
        return new MacTextField();
    }
}

class LinuxFactory extends UIFactory {
    createButton() {
        return new LinuxButton();
    }
    
    createTextField() {
        return new LinuxTextField();
    }
}

function createUI(platform) {
    const output = document.getElementById('abstract-factory-output');
    let factory;
    
    try {
        switch (platform.toLowerCase()) {
            case 'windows':
                factory = new WindowsFactory();
                break;
            case 'mac':
                factory = new MacFactory();
                break;
            case 'linux':
                factory = new LinuxFactory();
                break;
            default:
                throw new Error(`Unknown platform: ${platform}`);
        }
        
        const button = factory.createButton();
        const textField = factory.createTextField();
        
        output.textContent += `🎨 Creating ${platform.toUpperCase()} UI:\n`;
        output.textContent += `${button.render()}\n`;
        output.textContent += `${textField.render()}\n\n`;
        
    } catch (error) {
        output.textContent += `❌ Error: ${error.message}\n\n`;
    }
    
    output.scrollTop = output.scrollHeight;
}

function createCompleteUI() {
    const output = document.getElementById('abstract-factory-output');
    const platforms = ['windows', 'mac', 'linux'];
    
    output.textContent += '🌐 Creating complete UI set for all platforms:\n';
    output.textContent += '='.repeat(50) + '\n';
    
    platforms.forEach(platform => {
        createUI(platform);
    });
    
    output.textContent += '✅ Complete UI set created!\n\n';
    output.scrollTop = output.scrollHeight;
}

// ==================== UTILITY FUNCTIONS ====================
function clearOutput(outputId) {
    const output = document.getElementById(outputId);
    output.textContent = '';
}

// Add some interactive enhancements
function addTimestamp() {
    return new Date().toLocaleTimeString();
}

// Enhanced logging for demonstration purposes
function logWithTimestamp(message, outputId) {
    const output = document.getElementById(outputId);
    const timestamp = addTimestamp();
    output.textContent += `[${timestamp}] ${message}\n`;
    output.scrollTop = output.scrollHeight;
}

// ==================== INITIALIZATION ====================
// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Factory Patterns Demo Loaded!');
    
    // Add welcome messages to each output area
    const singletonOutput = document.getElementById('singleton-output');
    const factoryOutput = document.getElementById('factory-output');
    const abstractFactoryOutput = document.getElementById('abstract-factory-output');
    
    if (singletonOutput) {
        singletonOutput.textContent = '🎯 Singleton Pattern Demo Ready!\nClick buttons above to test the pattern.\n\n';
    }
    
    if (factoryOutput) {
        factoryOutput.textContent = '🏭 Factory Method Pattern Demo Ready!\nClick buttons above to create vehicles.\n\n';
    }
    
    if (abstractFactoryOutput) {
        abstractFactoryOutput.textContent = '🎨 Abstract Factory Pattern Demo Ready!\nClick buttons above to create UI components.\n\n';
    }
});

// ==================== BONUS FEATURES ====================
// Add some extra functionality for a more engaging demo

function comparePatterns() {
    console.log('Pattern Comparison:');
    console.log('Singleton: One instance, global access');
    console.log('Factory Method: Creates objects without specifying exact class');
    console.log('Abstract Factory: Creates families of related objects');
}

// Performance testing function
function performanceTest() {
    const iterations = 10000;
    
    // Test Singleton performance
    console.time('Singleton Creation');
    for (let i = 0; i < iterations; i++) {
        DatabaseConnection.getInstance();
    }
    console.timeEnd('Singleton Creation');
    
    // Test Factory performance
    console.time('Factory Creation');
    for (let i = 0; i < iterations; i++) {
        VehicleFactory.createVehicle('car');
    }
    console.timeEnd('Factory Creation');
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DatabaseConnection,
        VehicleFactory,
        UIFactory,
        WindowsFactory,
        MacFactory,
        LinuxFactory,
        showTab,
        testSingleton,
        testMultipleSingleton,
        createVehicle,
        createRandomVehicle,
        createUI,
        createCompleteUI,
        clearOutput
    };
}