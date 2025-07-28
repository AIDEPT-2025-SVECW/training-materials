// Design Patterns Interactive Demo JavaScript
// Navigation and Interactive Demonstrations

// Navigation Functions
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
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// General Demo Functions
function demonstrateWithoutPattern() {
    const output = document.getElementById('pattern-demo-output');
    output.innerHTML = `
<div style="color: #ff6b6b;">❌ WITHOUT DESIGN PATTERNS:</div>
<div style="margin: 10px 0;">
// Tightly coupled, hard to maintain code
class EmailNotifier {
    sendEmail(message) {
        console.log("Sending email: " + message);
        // Email sending logic here
    }
}

class SMSNotifier {
    sendSMS(message) {
        console.log("Sending SMS: " + message);
        // SMS sending logic here
    }
}

class NotificationManager {
    constructor() {
        this.emailNotifier = new EmailNotifier(); // Tight coupling!
        this.smsNotifier = new SMSNotifier();     // Tight coupling!
    }
    
    notify(message, type) {
        if (type === 'email') {
            this.emailNotifier.sendEmail(message);
        } else if (type === 'sms') {
            this.smsNotifier.sendSMS(message);
        }
        // Adding new notification types requires modifying this class!
    }
}
</div>
<div style="color: #ff6b6b;">
Problems: Tight coupling, hard to extend, violates Open/Closed principle
</div>`;
}

function demonstrateWithPattern() {
    const output = document.getElementById('pattern-demo-output');
    output.innerHTML = `
<div style="color: #48bb78;">✅ WITH STRATEGY PATTERN:</div>
<div style="margin: 10px 0;">
// Flexible, extensible design using Strategy pattern
class NotificationStrategy {
    send(message) {
        throw new Error("Method must be implemented");
    }
}

class EmailStrategy extends NotificationStrategy {
    send(message) {
        console.log("📧 Email sent: " + message);
    }
}

class SMSStrategy extends NotificationStrategy {
    send(message) {
        console.log("📱 SMS sent: " + message);
    }
}

class NotificationManager {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    notify(message) {
        this.strategy.send(message);
    }
}
</div>
<div style="color: #48bb78;">
Benefits: Loose coupling, easy to extend, follows SOLID principles
</div>`;
}

// Creational Pattern Demonstrations
function demonstrateSingleton() {
    const output = document.getElementById('creational-demo-output');
    
    // Singleton implementation
    class DatabaseConnection {
        constructor() {
            if (DatabaseConnection.instance) {
                return DatabaseConnection.instance;
            }
            
            this.connectionId = Math.random().toString(36).substr(2, 9);
            this.isConnected = false;
            DatabaseConnection.instance = this;
        }
        
        connect() {
            this.isConnected = true;
            return `Connected to database with ID: ${this.connectionId}`;
        }
        
        getStatus() {
            return `Connection ${this.connectionId} - Status: ${this.isConnected ? 'Connected' : 'Disconnected'}`;
        }
    }
    
    // Demo execution
    const db1 = new DatabaseConnection();
    const db2 = new DatabaseConnection();
    const db3 = new DatabaseConnection();
    
    output.innerHTML = `
<div style="color: #48bb78;">🔐 SINGLETON PATTERN DEMO:</div>
<div style="margin: 10px 0;">
Creating multiple database connections...

const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();  
const db3 = new DatabaseConnection();

db1.connect();

Results:
• db1 === db2: ${db1 === db2}
• db2 === db3: ${db2 === db3}
• ${db1.connect()}
• ${db1.getStatus()}
• ${db2.getStatus()}
• ${db3.getStatus()}
</div>
<div style="color: #4299e1;">
✨ All instances point to the same object! Only one database connection exists.
</div>`;
}

function demonstrateFactory() {
    const output = document.getElementById('creational-demo-output');
    
    // Factory implementation
    class Vehicle {
        constructor(type) {
            this.type = type;
        }
        
        getInfo() {
            return `This is a ${this.type}`;
        }
    }
    
    class Car extends Vehicle {
        constructor() {
            super('Car');
            this.wheels = 4;
            this.engine = 'V6';
        }
        
        getInfo() {
            return `${super.getInfo()} with ${this.wheels} wheels and ${this.engine} engine`;
        }
    }
    
    class Motorcycle extends Vehicle {
        constructor() {
            super('Motorcycle');
            this.wheels = 2;
            this.engine = 'Single Cylinder';
        }
        
        getInfo() {
            return `${super.getInfo()} with ${this.wheels} wheels and ${this.engine} engine`;
        }
    }
    
    class VehicleFactory {
        static createVehicle(type) {
            switch(type.toLowerCase()) {
                case 'car':
                    return new Car();
                case 'motorcycle':
                    return new Motorcycle();
                default:
                    throw new Error(`Vehicle type ${type} not supported`);
            }
        }
    }
    
    // Demo execution
    const car = VehicleFactory.createVehicle('car');
    const motorcycle = VehicleFactory.createVehicle('motorcycle');
    
    output.innerHTML = `
<div style="color: #48bb78;">🏭 FACTORY METHOD PATTERN DEMO:</div>
<div style="margin: 10px 0;">
Creating vehicles without knowing their exact classes...

const car = VehicleFactory.createVehicle('car');
const motorcycle = VehicleFactory.createVehicle('motorcycle');

Results:
• Car: ${car.getInfo()}
• Motorcycle: ${motorcycle.getInfo()}
</div>
<div style="color: #4299e1;">
✨ Factory creates objects without exposing instantiation logic!
</div>`;
}

function demonstrateBuilder() {
    const output = document.getElementById('creational-demo-output');
    
    // Builder implementation
    class Pizza {
        constructor() {
            this.size = '';
            this.crust = '';
            this.toppings = [];
            this.cheese = '';
        }
        
        getDescription() {
            return `${this.size} ${this.crust} crust pizza with ${this.cheese} cheese and toppings: ${this.toppings.join(', ')}`;
        }
    }
    
    class PizzaBuilder {
        constructor() {
            this.pizza = new Pizza();
        }
        
        setSize(size) {
            this.pizza.size = size;
            return this;
        }
        
        setCrust(crust) {
            this.pizza.crust = crust;
            return this;
        }
        
        addTopping(topping) {
            this.pizza.toppings.push(topping);
            return this;
        }
        
        setCheese(cheese) {
            this.pizza.cheese = cheese;
            return this;
        }
        
        build() {
            return this.pizza;
        }
    }
    
    // Demo execution
    const pizza = new PizzaBuilder()
        .setSize('Large')
        .setCrust('Thin')
        .setCheese('Mozzarella')
        .addTopping('Pepperoni')
        .addTopping('Mushrooms')
        .addTopping('Bell Peppers')
        .build();
    
    output.innerHTML = `
<div style="color: #48bb78;">🏗️ BUILDER PATTERN DEMO:</div>
<div style="margin: 10px 0;">
Building a complex pizza step by step...

const pizza = new PizzaBuilder()
    .setSize('Large')
    .setCrust('Thin')
    .setCheese('Mozzarella')
    .addTopping('Pepperoni')
    .addTopping('Mushrooms')
    .addTopping('Bell Peppers')
    .build();

Result:
• ${pizza.getDescription()}
</div>
<div style="color: #4299e1;">
✨ Builder allows step-by-step construction with method chaining!
</div>`;
}

// Structural Pattern Demonstrations
function demonstrateAdapter() {
    const output = document.getElementById('structural-demo-output');
    
    // Adapter implementation
    class OldPrinter {
        printOldFormat(text) {
            return `OLD FORMAT: ${text.toUpperCase()}`;
        }
    }
    
    class NewPrinter {
        print(text) {
            return `NEW FORMAT: ${text}`;
        }
    }
    
    class PrinterAdapter {
        constructor(oldPrinter) {
            this.oldPrinter = oldPrinter;
        }
        
        print(text) {
            // Adapt the old interface to the new one
            return this.oldPrinter.printOldFormat(text);
        }
    }
    
    // Demo execution
    const oldPrinter = new OldPrinter();
    const newPrinter = new NewPrinter();
    const adapter = new PrinterAdapter(oldPrinter);
    
    const text = "Hello World";
    
    output.innerHTML = `
<div style="color: #48bb78;">🔌 ADAPTER PATTERN DEMO:</div>
<div style="margin: 10px 0;">
Making incompatible interfaces work together...

const oldPrinter = new OldPrinter();
const newPrinter = new NewPrinter();
const adapter = new PrinterAdapter(oldPrinter);

const text = "${text}";

Results:
• New Printer: ${newPrinter.print(text)}
• Old Printer (via adapter): ${adapter.print(text)}
</div>
<div style="color: #4299e1;">
✨ Adapter allows old and new systems to work together seamlessly!
</div>`;
}

function demonstrateDecorator() {
    const output = document.getElementById('structural-demo-output');
    
    // Decorator implementation
    class Coffee {
        constructor() {
            this.description = "Simple Coffee";
            this.cost = 2.00;
        }
        
        getDescription() {
            return this.description;
        }
        
        getCost() {
            return this.cost;
        }
    }
    
    class CoffeeDecorator {
        constructor(coffee) {
            this.coffee = coffee;
        }
        
        getDescription() {
            return this.coffee.getDescription();
        }
        
        getCost() {
            return this.coffee.getCost();
        }
    }
    
    class MilkDecorator extends CoffeeDecorator {
        constructor(coffee) {
            super(coffee);
        }
        
        getDescription() {
            return this.coffee.getDescription() + ", Milk";
        }
        
        getCost() {
            return this.coffee.getCost() + 0.50;
        }
    }
    
    class SugarDecorator extends CoffeeDecorator {
        constructor(coffee) {
            super(coffee);
        }
        
        getDescription() {
            return this.coffee.getDescription() + ", Sugar";
        }
        
        getCost() {
            return this.coffee.getCost() + 0.25;
        }
    }
    
    class WhipDecorator extends CoffeeDecorator {
        constructor(coffee) {
            super(coffee);
        }
        
        getDescription() {
            return this.coffee.getDescription() + ", Whipped Cream";
        }
        
        getCost() {
            return this.coffee.getCost() + 0.75;
        }
    }
    
    // Demo execution
    let coffee = new Coffee();
    coffee = new MilkDecorator(coffee);
    coffee = new SugarDecorator(coffee);
    coffee = new WhipDecorator(coffee);
    
    output.innerHTML = `
<div style="color: #48bb78;">🎨 DECORATOR PATTERN DEMO:</div>
<div style="margin: 10px 0;">
Adding features to coffee dynamically...

let coffee = new Coffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
coffee = new WhipDecorator(coffee);

Results:
• Description: ${coffee.getDescription()}
• Total Cost: $${coffee.getCost().toFixed(2)}
</div>
<div style="color: #4299e1;">
✨ Decorator adds functionality without changing the original object!
</div>`;
}

function demonstrateFacade() {
    const output = document.getElementById('structural-demo-output');
    
    // Complex subsystem classes
    class CPU {
        freeze() { return "CPU frozen"; }
        jump(position) { return `CPU jumped to ${position}`; }
        execute() { return "CPU executing"; }
    }
    
    class Memory {
        load(position, data) { 
            return `Memory loaded ${data} at ${position}`; 
        }
    }
    
    class HardDrive {
        read(lba, size) { 
            return `HardDrive read ${size} bytes from ${lba}`; 
        }
    }
    
    // Facade class
    class ComputerFacade {
        constructor() {
            this.cpu = new CPU();
            this.memory = new Memory();
            this.hardDrive = new HardDrive();
        }
        
        start() {
            const operations = [];
            operations.push(this.cpu.freeze());
            operations.push(this.memory.load("0x00", "boot data"));
            operations.push(this.cpu.jump("0x00"));
            operations.push(this.hardDrive.read("0x100", "1024"));
            operations.push(this.cpu.execute());
            return operations;
        }
    }
    
    // Demo execution
    const computer = new ComputerFacade();
    const startupSequence = computer.start();
    
    output.innerHTML = `
<div style="color: #48bb78;">🏛️ FACADE PATTERN DEMO:</div>
<div style="margin: 10px 0;">
Simplifying complex computer startup process...

const computer = new ComputerFacade();
computer.start(); // Simple interface to complex operations

Startup Sequence:
${startupSequence.map((op, i) => `${i + 1}. ${op}`).join('\n')}
</div>
<div style="color: #4299e1;">
✨ Facade provides a simple interface to complex subsystems!
</div>`;
}

// Behavioral Pattern Demonstrations
function demonstrateObserver() {
    const output = document.getElementById('behavioral-demo-output');
    
    // Observer implementation
    class Newsletter {
        constructor() {
            this.subscribers = [];
            this.latestArticle = '';
        }
        
        subscribe(subscriber) {
            this.subscribers.push(subscriber);
            return `${subscriber.name} subscribed to newsletter`;
        }
        
        unsubscribe(subscriber) {
            this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
            return `${subscriber.name} unsubscribed from newsletter`;
        }
        
        publishArticle(article) {
            this.latestArticle = article;
            return this.notifySubscribers();
        }
        
        notifySubscribers() {
            const notifications = [];
            this.subscribers.forEach(subscriber => {
                notifications.push(subscriber.update(this.latestArticle));
            });
            return notifications;
        }
    }
    
    class Subscriber {
        constructor(name) {
            this.name = name;
        }
        
        update(article) {
            return `${this.name} received notification: "${article}"`;
        }
    }
    
    // Demo execution
    const newsletter = new Newsletter();
    const alice = new Subscriber('Alice');
    const bob = new Subscriber('Bob');
    const charlie = new Subscriber('Charlie');
    
    const subscriptions = [
        newsletter.subscribe(alice),
        newsletter.subscribe(bob),
        newsletter.subscribe(charlie)
    ];
    
    const notifications = newsletter.publishArticle("Design Patterns in Modern JavaScript");
    
    output.innerHTML = `
<div style="color: #48bb78;">👀 OBSERVER PATTERN DEMO:</div>
<div style="margin: 10px 0;">
Newsletter notification system...

Subscriptions:
${subscriptions.map(sub => `• ${sub}`).join('\n')}

Publishing Article: "Design Patterns in Modern JavaScript"

Notifications Sent:
${notifications.map(notif => `• ${notif}`).join('\n')}
</div>
<div style="color: #4299e1;">
✨ Observer enables one-to-many dependency relationships!
</div>`;
}

function demonstrateStrategy() {
    const output = document.getElementById('behavioral-demo-output');
    
    // Strategy implementation
    class PaymentStrategy {
        pay(amount) {
            throw new Error("Payment method must be implemented");
        }
    }
    
    class CreditCardStrategy extends PaymentStrategy {
        constructor(cardNumber) {
            super();
            this.cardNumber = cardNumber;
        }
        
        pay(amount) {
            return `Paid $${amount} using Credit Card ending in ${this.cardNumber.slice(-4)}`;
        }
    }
    
    class PayPalStrategy extends PaymentStrategy {
        constructor(email) {
            super();
            this.email = email;
        }
        
        pay(amount) {
            return `Paid $${amount} using PayPal account ${this.email}`;
        }
    }
    
    class CryptoStrategy extends PaymentStrategy {
        constructor(walletAddress) {
            super();
            this.walletAddress = walletAddress;
        }
        
        pay(amount) {
            return `Paid $${amount} using Crypto wallet ${this.walletAddress.slice(0, 8)}...`;
        }
    }
    
    class ShoppingCart {
        constructor() {
            this.items = [];
            this.paymentStrategy = null;
        }
        
        addItem(item, price) {
            this.items.push({item, price});
        }
        
        setPaymentStrategy(strategy) {
            this.paymentStrategy = strategy;
        }
        
        checkout() {
            const total = this.items.reduce((sum, item) => sum + item.price, 0);
            return this.paymentStrategy.pay(total);
        }
        
        getTotal() {
            return this.items.reduce((sum, item) => sum + item.price, 0);
        }
    }
    
    // Demo execution
    const cart = new ShoppingCart();
    cart.addItem('Laptop', 999.99);
    cart.addItem('Mouse', 29.99);
    cart.addItem('Keyboard', 79.99);
    
    const creditCard = new CreditCardStrategy('1234567890123456');
    const paypal = new PayPalStrategy('user@example.com');
    const crypto = new CryptoStrategy('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
    
    cart.setPaymentStrategy(creditCard);
    const payment1 = cart.checkout();
    
    cart.setPaymentStrategy(paypal);
    const payment2 = cart.checkout();
    
    cart.setPaymentStrategy(crypto);
    const payment3 = cart.checkout();
    
    output.innerHTML = `
<div style="color: #48bb78;">🎯 STRATEGY PATTERN DEMO:</div>
<div style="margin: 10px 0;">
Shopping cart with different payment methods...

Cart Items:
• Laptop: $999.99
• Mouse: $29.99  
• Keyboard: $79.99
Total: $${cart.getTotal()}

Payment Options:
• Credit Card: ${payment1}
• PayPal: ${payment2}
• Crypto: ${payment3}
</div>
<div style="color: #4299e1;">
✨ Strategy allows algorithms to be selected at runtime!
</div>`;
}

function demonstrateCommand() {
    const output = document.getElementById('behavioral-demo-output');
    
    // Command implementation
    class Light {
        constructor(location) {
            this.location = location;
            this.isOn = false;
        }
        
        turnOn() {
            this.isOn = true;
            return `${this.location} light is ON`;
        }
        
        turnOff() {
            this.isOn = false;
            return `${this.location} light is OFF`;
        }
    }
    
    class Command {
        execute() {
            throw new Error("Execute method must be implemented");
        }
        
        undo() {
            throw new Error("Undo method must be implemented");
        }
    }
    
    class LightOnCommand extends Command {
        constructor(light) {
            super();
            this.light = light;
        }
        
        execute() {
            return this.light.turnOn();
        }
        
        undo() {
            return this.light.turnOff();
        }
    }
    
    class LightOffCommand extends Command {
        constructor(light) {
            super();
            this.light = light;
        }
        
        execute() {
            return this.light.turnOff();
        }
        
        undo() {
            return this.light.turnOn();
        }
    }
    
    class RemoteControl {
        constructor() {
            this.commands = {};
            this.lastCommand = null;
            this.history = [];
        }
        
        setCommand(slot, command) {
            this.commands[slot] = command;
        }
        
        pressButton(slot) {
            if (this.commands[slot]) {
                const result = this.commands[slot].execute();
                this.lastCommand = this.commands[slot];
                this.history.push(result);
                return result;
            }
            return "No command assigned to this button";
        }
        
        pressUndo() {
            if (this.lastCommand) {
                const result = this.lastCommand.undo();
                this.history.push(`UNDO: ${result}`);
                return result;
            }
            return "No command to undo";
        }
        
        getHistory() {
            return this.history;
        }
    }
    
    // Demo execution
    const livingRoomLight = new Light('Living Room');
    const kitchenLight = new Light('Kitchen');
    
    const livingRoomOn = new LightOnCommand(livingRoomLight);
    const livingRoomOff = new LightOffCommand(livingRoomLight);
    const kitchenOn = new LightOnCommand(kitchenLight);
    
    const remote = new RemoteControl();
    remote.setCommand(1, livingRoomOn);
    remote.setCommand(2, livingRoomOff);
    remote.setCommand(3, kitchenOn);
    
    const actions = [
        remote.pressButton(1),
        remote.pressButton(3),
        remote.pressButton(2),
        remote.pressUndo(),
        remote.pressUndo()
    ];
    
    output.innerHTML = `
<div style="color: #48bb78;">📋 COMMAND PATTERN DEMO:</div>
<div style="margin: 10px 0;">
Smart home remote control with undo functionality...

Remote Control Actions:
${actions.map((action, i) => `${i + 1}. ${action}`).join('\n')}

Command History:
${remote.getHistory().map((cmd, i) => `${i + 1}. ${cmd}`).join('\n')}
</div>
<div style="color: #4299e1;">
✨ Command encapsulates requests as objects with undo support!
</div>`;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Show overview section by default
    showSection('overview');
    
    // Add some interactive enhancements
    console.log('🎨 Design Patterns Interactive Demo loaded successfully!');
    console.log('📚 Explore the different pattern categories and try the interactive demos.');
});