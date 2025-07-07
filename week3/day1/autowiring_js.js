// AutoWiring Tutorial JavaScript
// Interactive functionality for Spring Boot AutoWiring concepts

// Global variables
let currentTab = 'basics';
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let progress = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeQuiz();
    updateProgress();
});

// Tab management
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

function switchTab(tabName) {
    // Hide all content
    const contents = document.querySelectorAll('.concept-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected content and activate tab
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    currentTab = tabName;
    updateProgress();
}

function updateProgress() {
    const tabs = ['basics', 'annotations', 'types', 'advanced', 'quiz'];
    const currentIndex = tabs.indexOf(currentTab);
    const progressPercent = ((currentIndex + 1) / tabs.length) * 100;
    
    document.getElementById('progress').style.width = progressPercent + '%';
}

// Basics Tab Functions
function showTraditional() {
    const output = document.getElementById('basicDemo');
    output.innerHTML = `// Traditional XML Configuration
<bean id="userService" class="com.example.UserService">
    <property name="userRepository" ref="userRepository"/>
</bean>

<bean id="userRepository" class="com.example.UserRepository"/>

// Java Code
public class UserService {
    private UserRepository userRepository;
    
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}

❌ Problems:
- Verbose XML configuration
- No compile-time checking
- Hard to maintain
- Prone to errors`;
}

function showAutowired() {
    const output = document.getElementById('basicDemo');
    output.innerHTML = `// With @Autowired - No XML needed!
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    // Spring automatically injects the dependency!
}

@Repository
public class UserRepository {
    // Implementation
}

✅ Benefits:
- No XML configuration needed
- Compile-time safety
- Clean and readable code
- Automatic dependency resolution`;
}

function animateDependencies() {
    const boxes = document.querySelectorAll('.dependency-box');
    
    boxes.forEach((box, index) => {
        setTimeout(() => {
            box.classList.add('injected');
            box.innerHTML += ' ✅';
        }, index * 500);
    });
}

function resetDependencies() {
    const boxes = document.querySelectorAll('.dependency-box');
    boxes.forEach(box => {
        box.classList.remove('injected');
        box.innerHTML = box.innerHTML.replace(' ✅', '');
    });
}

// Annotations Tab Functions
function showAutowiredExample() {
    const code = document.getElementById('annotationCode');
    code.innerHTML = `@Controller
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }
}

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}

// Spring automatically detects and injects dependencies
// No additional configuration needed!`;
}

function showQualifierExample() {
    const code = document.getElementById('annotationCode');
    code.innerHTML = `// Multiple implementations scenario
public interface NotificationService {
    void sendNotification(String message);
}

@Service("emailService")
public class EmailService implements NotificationService {
    public void sendNotification(String message) {
        // Email implementation
    }
}

@Service("smsService")
public class SMSService implements NotificationService {
    public void sendNotification(String message) {
        // SMS implementation
    }
}

@Controller
public class NotificationController {
    
    @Autowired
    @Qualifier("emailService")
    private NotificationService emailService;
    
    @Autowired
    @Qualifier("smsService")
    private NotificationService smsService;
}

// @Qualifier resolves ambiguity when multiple beans exist`;
}

function showPrimaryExample() {
    const code = document.getElementById('annotationCode');
    code.innerHTML = `public interface PaymentService {
    void processPayment(double amount);
}

@Service
@Primary  // This will be injected by default
public class CreditCardService implements PaymentService {
    public void processPayment(double amount) {
        // Credit card processing
    }
}

@Service
public class PayPalService implements PaymentService {
    public void processPayment(double amount) {
        // PayPal processing
    }
}

@Controller
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService; // CreditCardService injected
    
    @Autowired
    @Qualifier("payPalService")
    private PaymentService paypalService; // Explicit PayPal service
}

// @Primary eliminates ambiguity without @Qualifier`;
}

// Types Tab Functions
function showFieldInjection() {
    const code = document.getElementById('typeCode');
    const pros = document.getElementById('prosConsPanel');
    
    code.innerHTML = `@Service
public class OrderService {
    
    @Autowired
    private ProductService productService;
    
    @Autowired
    private CustomerService customerService;
    
    public Order createOrder(Long customerId, Long productId) {
        Customer customer = customerService.findById(customerId);
        Product product = productService.findById(productId);
        return new Order(customer, product);
    }
}

// Field injection - direct field access`;
    
    pros.innerHTML = `✅ PROS:
- Clean and concise syntax
- Less boilerplate code
- Easy to read and write

❌ CONS:
- Hard to unit test (requires reflection)
- Cannot create immutable objects
- Difficult to detect missing dependencies
- Breaks encapsulation principles`;
}

function showConstructorInjection() {
    const code = document.getElementById('typeCode');
    const pros = document.getElementById('prosConsPanel');
    
    code.innerHTML = `@Service
public class OrderService {
    
    private final ProductService productService;
    private final CustomerService customerService;
    
    // Constructor injection - RECOMMENDED approach
    public OrderService(ProductService productService, 
                       CustomerService customerService) {
        this.productService = productService;
        this.customerService = customerService;
    }
    
    public Order createOrder(Long customerId, Long productId) {
        Customer customer = customerService.findById(customerId);
        Product product = productService.findById(productId);
        return new Order(customer, product);
    }
}

// @Autowired is optional on constructors (Spring 4.3+)`;
    
    pros.innerHTML = `✅ PROS:
- Ensures mandatory dependencies are provided
- Enables immutable objects (final fields)
- Easy to unit test
- Fails fast if dependencies are missing
- Maintains encapsulation

❌ CONS:
- More verbose than field injection
- Constructor can become large with many dependencies`;
}

function showSetterInjection() {
    const code = document.getElementById('typeCode');
    const pros = document.getElementById('prosConsPanel');
    
    code.innerHTML = `@Service
public class OrderService {
    
    private ProductService productService;
    private CustomerService customerService;
    
    @Autowired
    public void setProductService(ProductService productService) {
        this.productService = productService;
    }
    
    @Autowired
    public void setCustomerService(CustomerService customerService) {
        this.customerService = customerService;
    }
    
    public Order createOrder(Long customerId, Long productId) {
        Customer customer = customerService.findById(customerId);
        Product product = productService.findById(productId);
        return new Order(customer, product);
    }
}

// Setter injection - method-based injection`;
    
    pros.innerHTML = `✅ PROS:
- Allows optional dependencies
- Can be used for reconfiguration
- Partial dependency injection possible
- Good for optional dependencies

❌ CONS:
- Objects can be in inconsistent state
- Dependencies can be changed after creation
- More verbose than field injection
- Harder to ensure all dependencies are set`;
}

// Advanced Tab Functions
function showCircularDependency() {
    const code = document.getElementById('advancedCode');
    code.innerHTML = `// Circular dependency problem
@Service
public class ServiceA {
    @Autowired
    private ServiceB serviceB;  // A depends on B
}

@Service
public class ServiceB {
    @Autowired
    private ServiceA serviceA;  // B depends on A - CIRCULAR!
}

// Solutions:

// 1. Using @Lazy annotation
@Service
public class ServiceA {
    @Autowired
    @Lazy
    private ServiceB serviceB;
}

// 2. Using setter injection
@Service
public class ServiceA {
    private ServiceB serviceB;
    
    @Autowired
    public void setServiceB(ServiceB serviceB) {
        this.serviceB = serviceB;
    }
}

// 3. Redesign architecture (BEST SOLUTION)
@Service
public class ServiceA {
    @Autowired
    private CommonService commonService;
}

@Service
public class ServiceB {
    @Autowired
    private CommonService commonService;
}

// Extract common functionality to avoid circular dependency`;
}

function showOptionalDependency() {
    const code = document.getElementById('advancedCode');
    code.innerHTML = `@Service
public class NotificationService {
    
    // Optional dependency - won't fail if bean doesn't exist
    @Autowired(required = false)
    private EmailService emailService;
    
    // Using Optional wrapper
    @Autowired
    private Optional<SMSService> smsService;
    
    // Using @Nullable annotation
    @Autowired
    public NotificationService(@Nullable PushService pushService) {
        this.pushService = pushService;
    }
    
    public void sendNotification(String message) {
        // Check if services are available
        if (emailService != null) {
            emailService.sendEmail(message);
        }
        
        smsService.ifPresent(service -> service.sendSMS(message));
        
        if (pushService != null) {
            pushService.sendPush(message);
        }
    }
}

// Graceful handling of missing dependencies`;
}

function showCollectionInjection() {
    const code = document.getElementById('advancedCode');
    code.innerHTML = `public interface MessageProcessor {
    void process(String message);
}

@Service
public class EmailProcessor implements MessageProcessor {
    public void process(String message) {
        // Email processing
    }
}

@Service
public class SMSProcessor implements MessageProcessor {
    public void process(String message) {
        // SMS processing
    }
}

@Service
public class PushProcessor implements MessageProcessor {
    public void process(String message) {
        // Push notification processing
    }
}

@Service
public class MessageService {
    
    // Inject all implementations of MessageProcessor
    @Autowired
    private List<MessageProcessor> processors;
    
    // Inject as Map with bean names as keys
    @Autowired
    private Map<String, MessageProcessor> processorMap;
    
    public void processMessage(String message) {
        // Process with all available processors
        processors.forEach(processor -> processor.process(message));
    }
    
    public void processWithSpecific(String type, String message) {
        MessageProcessor processor = processorMap.get(type + "Processor");
        if (processor != null) {
            processor.process(message);
        }
    }
}

// Spring automatically injects collections of matching beans`;
}

// Quiz Functions
function initializeQuiz() {
    quizQuestions = [
        {
            question: "Which annotation is most commonly used for dependency injection in Spring?",
            options: ["@Inject", "@Autowired", "@Resource", "@Component"],
            correct: 1,
            explanation: "@Autowired is the most commonly used Spring annotation for dependency injection."
        },
        {
            question: "What is the recommended injection type for mandatory dependencies?",
            options: ["Field Injection", "Setter Injection", "Constructor Injection", "Interface Injection"],
            correct: 2,
            explanation: "Constructor injection is recommended for mandatory dependencies as it ensures they're provided and enables immutable objects."
        },
        {
            question: "Which annotation helps resolve ambiguity when multiple beans of the same type exist?",
            options: ["@Primary", "@Qualifier", "@Component", "@Service"],
            correct: 1,
            explanation: "@Qualifier is used to specify which exact bean to inject when multiple candidates exist."
        },
        {
            question: "What happens when @Autowired(required = false) is used?",
            options: ["Throws exception if bean not found", "Creates a new bean", "Injects null if bean not found", "Uses default implementation"],
            correct: 2,
            explanation: "When required = false, Spring will inject null if no matching bean is found, preventing startup failures."
        },
        {
            question: "Which is the best solution for circular dependencies?",
            options: ["Use @Lazy", "Use setter injection", "Redesign architecture", "Use @Primary"],
            correct: 2,
            explanation: "The best solution is to redesign the architecture to eliminate circular dependencies, often by extracting common functionality."
        },
        {
            question: "What does @Primary annotation do?",
            options: ["Makes a bean singleton", "Marks a bean as the default choice", "Enables lazy loading", "Creates a prototype bean"],
            correct: 1,
            explanation: "@Primary marks a bean as the primary candidate for injection when multiple beans of the same type exist."
        }
    ];
    
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        showFinalScore();
        return;
    }
    
    const question = quizQuestions[currentQuestionIndex];
    const questionEl = document.getElementById('quizQuestion');
    const optionsEl = document.getElementById('quizOptions');
    const resultsEl = document.getElementById('quizResults');
    
    questionEl.textContent = `Question ${currentQuestionIndex + 1}/${quizQuestions.length}: ${question.question}`;
    
    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectAnswer(index));
        optionsEl.appendChild(optionDiv);
    });
    
    resultsEl.textContent = `Score: ${score}/${quizQuestions.length}`;
}

function selectAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    // Remove click listeners
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Show correct/incorrect
    options[selectedIndex].classList.add(selectedIndex === question.correct ? 'correct' : 'incorrect');
    if (selectedIndex !== question.correct) {
        options[question.correct].classList.add('correct');
    }
    
    // Update score
    if (selectedIndex === question.correct) {
        score++;
    }
    
    // Show explanation
    setTimeout(() => {
        alert(question.explanation);
    }, 500);
    
    // Update results
    const resultsEl = document.getElementById('quizResults');
    resultsEl.textContent = `Score: ${score}/${quizQuestions.length}`;
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showFinalScore() {
    const questionEl = document.getElementById('quizQuestion');
    const optionsEl = document.getElementById('quizOptions');
    const resultsEl = document.getElementById('quizResults');
    
    questionEl.textContent = 'Quiz Complete!';
    optionsEl.innerHTML = '';
    
    const percentage = Math.round((score / quizQuestions.length) * 100);
    let message = '';
    
    if (percentage >= 80) {
        message = '🎉 Excellent! You have a great understanding of Spring AutoWiring!';
    } else if (percentage >= 60) {
        message = '👍 Good job! You understand the basics. Review the advanced concepts.';
    } else {
        message = '📚 Keep learning! Review the tutorial sections for better understanding.';
    }
    
    resultsEl.innerHTML = `Final Score: ${score}/${quizQuestions.length} (${percentage}%)\n${message}`;
}

// Code highlighting and animation utilities
function highlightCode(elementId, lineNumber) {
    const codeElement = document.getElementById(elementId);
    const lines = codeElement.innerHTML.split('\n');
    
    if (lineNumber < lines.length) {
        lines[lineNumber] = `<span class="highlight">${lines[lineNumber]}</span>`;
        codeElement.innerHTML = lines.join('\n');
    }
}

function animateText(elementId, text, speed = 50) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    
    let index = 0;
    const interval = setInterval(() => {
        element.innerHTML += text[index];
        index++;
        
        if (index >= text.length) {
            clearInterval(interval);
        }
    }, speed);
}

// Utility functions for better UX
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.position = 'absolute';
    tooltip.style.background = '#333';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = '1000';
    tooltip.style.pointerEvents = 'none';
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
    
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    }, 2000);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const tabs = ['basics', 'annotations', 'types', 'advanced', 'quiz'];
        const currentIndex = tabs.indexOf(currentTab);
        
        if (e.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
            switchTab(tabs[currentIndex + 1]);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            switchTab(tabs[currentIndex - 1]);
        }
    }
});

// Enhanced visual feedback
function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.demo-btn, .tab-btn');
    buttons.forEach(addRippleEffect);
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .tooltip {
        animation: fadeIn 0.3s ease-in-out;
    }
`;
document.head.appendChild(style);

// Export functions for potential external use
window.SpringBootAutoWiringTutorial = {
    switchTab,
    showTraditional,
    showAutowired,
    animateDependencies,
    resetDependencies,
    showAutowiredExample,
    showQualifierExample,
    showPrimaryExample,
    showFieldInjection,
    showConstructorInjection,
    showSetterInjection,
    showCircularDependency,
    showOptionalDependency,
    showCollectionInjection,
    nextQuestion,
    resetQuiz
};