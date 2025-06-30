// Spring Framework Architecture Interactive Demo JavaScript
// Author: Assistant
// Description: Interactive functionality for Spring Framework learning platform

class SpringDemo {
    constructor() {
        this.currentSection = 'overview';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupLayerInteractions();
        this.setupModuleInteractions();
        this.setupDemoFunctions();
        console.log('Spring Framework Demo Initialized 🚀');
    }

    // Navigation System
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const sections = document.querySelectorAll('.content-section');

        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetSection = e.target.dataset.section;
                this.switchSection(targetSection);
            });
        });
    }

    switchSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        const targetBtn = document.querySelector(`[data-section="${sectionId}"]`);
        
        if (targetSection && targetBtn) {
            targetSection.classList.add('active');
            targetBtn.classList.add('active');
            this.currentSection = sectionId;
        }
    }

    // Architecture Layer Interactions
    setupLayerInteractions() {
        const layers = document.querySelectorAll('.layer[data-layer]');
        const detailsContainer = document.getElementById('layer-details');

        layers.forEach(layer => {
            layer.addEventListener('click', (e) => {
                const layerType = e.currentTarget.dataset.layer;
                this.showLayerDetails(layerType, detailsContainer);
            });
        });
    }

    showLayerDetails(layerType, container) {
        const layerInfo = {
            test: {
                title: '🧪 Test Layer',
                description: 'Spring\'s comprehensive testing framework',
                features: [
                    'Spring TestContext Framework',
                    'Integration testing with @SpringBootTest',
                    'Mock objects and test slices',
                    'Transactional test support',
                    'Test property sources'
                ],
                example: `@SpringBootTest
@Transactional
class UserServiceTest {
    
    @Autowired
    private UserService userService;
    
    @Test
    void shouldCreateUser() {
        User user = userService.create("John Doe");
        assertThat(user.getId()).isNotNull();
    }
}`
            },
            core: {
                title: '🎯 Core Container',
                description: 'The foundation of Spring Framework',
                features: [
                    'IoC Container (BeanFactory)',
                    'ApplicationContext',
                    'Dependency Injection',
                    'Bean lifecycle management',
                    'SpEL (Spring Expression Language)'
                ],
                example: `@Configuration
public class AppConfig {
    
    @Bean
    @Scope("singleton")
    public UserService userService() {
        return new UserServiceImpl();
    }
}`
            },
            aop: {
                title: '✂️ AOP & Aspects',
                description: 'Cross-cutting concerns management',
                features: [
                    'Method interception',
                    'Declarative transaction management',
                    'Security aspects',
                    'Logging and auditing',
                    'AspectJ integration'
                ],
                example: `@Aspect
@Component
public class LoggingAspect {
    
    @Around("@annotation(Loggable)")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long duration = System.currentTimeMillis() - start;
        logger.info("Method {} took {} ms", 
                   joinPoint.getSignature().getName(), duration);
        return result;
    }
}`
            },
            data: {
                title: '💾 Data Access Layer',
                description: 'Comprehensive data access support',
                features: [
                    'JDBC Template',
                    'ORM integration (JPA, Hibernate)',
                    'Transaction management',
                    'Data source configuration',
                    'Exception translation'
                ],
                example: `@Repository
public class UserRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Transactional
    public User save(User user) {
        String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
        jdbcTemplate.update(sql, user.getName(), user.getEmail());
        return user;
    }
}`
            },
            web: {
                title: '🌐 Web Layer',
                description: 'Complete web application framework',
                features: [
                    'Spring MVC',
                    'RESTful web services',
                    'WebSocket support',
                    'View resolution',
                    'Form handling and validation'
                ],
                example: `@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
        User created = userService.create(user);
        return ResponseEntity.status(201).body(created);
    }
}`
            },
            integration: {
                title: '🔗 Integration Layer',
                description: 'Enterprise integration capabilities',
                features: [
                    'JMS (Java Message Service)',
                    'Email support',
                    'Remoting (RMI, HTTP)',
                    'JMX (Java Management Extensions)',
                    'Scheduling support'
                ],
                example: `@Service
public class NotificationService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Async
    @Scheduled(fixedRate = 60000)
    public void sendPeriodicNotifications() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("admin@example.com");
        message.setSubject("System Status");
        message.setText("All systems operational");
        mailSender.send(message);
    }
}`
            }
        };

        const info = layerInfo[layerType];
        if (info && container) {
            container.innerHTML = `
                <h3>${info.title}</h3>
                <p><strong>${info.description}</strong></p>
                <h4>Key Features:</h4>
                <ul class="feature-list">
                    ${info.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <h4>Example Code:</h4>
                <div class="code-snippet">${info.example}</div>
            `;
        }
    }

    // Module Interactions
    setupModuleInteractions() {
        const modules = document.querySelectorAll('.module-card[data-module]');
        const detailsContainer = document.getElementById('module-details');

        modules.forEach(module => {
            module.addEventListener('click', (e) => {
                const moduleType = e.currentTarget.dataset.module;
                this.showModuleDetails(moduleType, detailsContainer);
            });
        });
    }

    showModuleDetails(moduleType, container) {
        const moduleInfo = {
            core: {
                title: '🎯 Spring Core',
                description: 'The heart of Spring Framework providing IoC container',
                useCases: ['Dependency Injection', 'Bean Management', 'Application Context'],
                dependencies: 'spring-core, spring-beans, spring-context',
                example: `// Creating application context
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
UserService userService = context.getBean(UserService.class);`
            },
            beans: {
                title: '🫘 Spring Beans',
                description: 'Bean factory and lifecycle management',
                useCases: ['Object Creation', 'Dependency Resolution', 'Lifecycle Callbacks'],
                dependencies: 'spring-beans',
                example: `@Component
@Scope("prototype")
public class TaskProcessor {
    
    @PostConstruct
    public void initialize() {
        logger.info("TaskProcessor initialized");
    }
    
    @PreDestroy
    public void cleanup() {
        logger.info("TaskProcessor destroyed");
    }
}`
            },
            context: {
                title: '📋 Spring Context',
                description: 'Enterprise services and application context',
                useCases: ['Internationalization', 'Event Publishing', 'Resource Loading'],
                dependencies: 'spring-context',
                example: `@Component
public class UserRegistrationService implements ApplicationEventPublisherAware {
    
    private ApplicationEventPublisher eventPublisher;
    
    public void registerUser(User user) {
        // Register user logic
        eventPublisher.publishEvent(new UserRegisteredEvent(user));
    }
}`
            },
            mvc: {
                title: '🌐 Spring MVC',
                description: 'Model-View-Controller web framework',
                useCases: ['Web Applications', 'REST APIs', 'Form Handling'],
                dependencies: 'spring-webmvc',
                example: `@Controller
public class HomeController {
    
    @RequestMapping("/")
    public String home(Model model) {
        model.addAttribute("message", "Welcome to Spring MVC!");
        return "home";
    }
}`
            },
            data: {
                title: '💾 Spring Data',
                description: 'Simplified data access layer',
                useCases: ['Repository Pattern', 'Query Methods', 'Pagination'],
                dependencies: 'spring-data-jpa, spring-data-mongodb',
                example: `@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    List<User> findByAgeGreaterThan(int age);
    
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    Optional<User> findByEmail(String email);
}`
            },
            security: {
                title: '🔐 Spring Security',
                description: 'Comprehensive security framework',
                useCases: ['Authentication', 'Authorization', 'CSRF Protection'],
                dependencies: 'spring-security-core, spring-security-web',
                example: `@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(withDefaults())
            .build();
    }
}`
            },
            boot: {
                title: '🚀 Spring Boot',
                description: 'Auto-configuration and rapid development',
                useCases: ['Microservices', 'Standalone Applications', 'Embedded Servers'],
                dependencies: 'spring-boot-starter-*',
                example: `@SpringBootApplication
public class Application {
    
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    
    @Bean
    public CommandLineRunner demo(UserRepository repository) {
        return (args) -> {
            repository.save(new User("Jack", "jack@example.com"));
        };
    }
}`
            },
            cloud: {
                title: '☁️ Spring Cloud',
                description: 'Microservices and distributed systems',
                useCases: ['Service Discovery', 'Circuit Breakers', 'Config Management'],
                dependencies: 'spring-cloud-starter-*',
                example: `@RestController
@RefreshScope
public class ConfigController {
    
    @Value("\${app.message:Default Message}")
    private String message;
    
    @GetMapping("/message")
    public String getMessage() {
        return message;
    }
}`
            }
        };

        const info = moduleInfo[moduleType];
        if (info && container) {
            container.innerHTML = `
                <h3>${info.title}</h3>
                <p><strong>${info.description}</strong></p>
                <h4>Common Use Cases:</h4>
                <ul class="feature-list">
                    ${info.useCases.map(useCase => `<li>${useCase}</li>`).join('')}
                </ul>
                <h4>Dependencies:</h4>
                <div class="code-snippet">${info.dependencies}</div>
                <h4>Example Usage:</h4>
                <div class="code-snippet">${info.example}</div>
            `;
        }
    }

    // Demo Functions Setup
    setupDemoFunctions() {
        // Make demo functions globally available
        window.showComparison = this.showComparison.bind(this);
        window.demonstrateIoC = this.demonstrateIoC.bind(this);
        window.demonstrateDI = this.demonstrateDI.bind(this);
        window.demonstrateLifecycle = this.demonstrateLifecycle.bind(this);
        window.demonstrateScopes = this.demonstrateScopes.bind(this);
        window.showConfig = this.showConfig.bind(this);
    }

    // Comparison Functions
    showComparison(type) {
        const output = document.getElementById('comparison-output');
        const comparisons = {
            initialization: `
INITIALIZATION COMPARISON:

BeanFactory:
• Lazy initialization by default
• Beans created only when requested
• Manual configuration required
• Lower memory footprint initially

ApplicationContext:
• Eager initialization by default
• All singleton beans created at startup
• Automatic configuration detection
• Higher memory usage but faster runtime access
• Pre-instantiation catches configuration errors early

Example:
// BeanFactory - lazy loading
BeanFactory factory = new XmlBeanFactory(new FileSystemResource("beans.xml"));
UserService service = (UserService) factory.getBean("userService"); // Created here

// ApplicationContext - eager loading
ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
// All beans already created and configured
            `,
            features: `
FEATURES COMPARISON:

BeanFactory Features:
• Basic dependency injection
• Bean lifecycle management
• Simple factory pattern implementation
• Programmatic configuration

ApplicationContext Additional Features:
• All BeanFactory features PLUS:
• Automatic BeanPostProcessor registration
• Event publication and listening
• Internationalization (i18n) support
• Resource loading mechanisms
• Environment abstraction
• Application lifecycle management
• Integration with Spring AOP
• Web application context support

Code Example:
// Event publishing (ApplicationContext only)
@Component
public class OrderService {
    @Autowired
    private ApplicationEventPublisher publisher;
    
    public void processOrder(Order order) {
        // Process order
        publisher.publishEvent(new OrderProcessedEvent(order));
    }
}
            `,
            usage: `
USAGE SCENARIOS:

Use BeanFactory when:
• Memory constraints are critical
• Simple dependency injection needed
• Minimal Spring features required
• Embedded systems or mobile applications
• Legacy system integration

Use ApplicationContext when:
• Building enterprise applications
• Need advanced Spring features
• Web application development
• Microservices architecture
• Full Spring ecosystem integration
• Event-driven architecture
• Internationalization required

Real-world Example:
// Microservice with ApplicationContext
@SpringBootApplication
public class OrderServiceApplication {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(OrderServiceApplication.class, args);
        // Full Spring ecosystem available
    }
}
            `,
            performance: `
PERFORMANCE COMPARISON:

BeanFactory Performance:
• Lower startup time
• Reduced memory usage initially
• Lazy loading can improve initial performance
• Runtime overhead for first bean access
• Suitable for memory-constrained environments

ApplicationContext Performance:
• Higher startup time (eager initialization)
• More memory usage at startup
• Faster runtime performance (pre-initialized beans)
• Better for high-throughput applications
• Caching and optimization features

Benchmark Example:
// Startup time comparison
BeanFactory: ~50ms startup, 10ms first bean access
ApplicationContext: ~200ms startup, 1ms bean access

Memory Usage:
BeanFactory: 15MB initial, grows on demand
ApplicationContext: 45MB initial, stable runtime

Recommendation: Use ApplicationContext for production applications
            `
        };

        if (output && comparisons[type]) {
            output.textContent = comparisons[type];
        }
    }

    // Interactive Demos
    demonstrateIoC() {
        const output = document.getElementById('demo-output');
        const demo = `
IoC (Inversion of Control) Demonstration:

Traditional Approach (Tight Coupling):
class OrderService {
    private EmailService emailService = new EmailService(); // Direct dependency
    
    public void processOrder(Order order) {
        // Process order
        emailService.sendConfirmation(order.getEmail());
    }
}

Spring IoC Approach (Loose Coupling):
@Service
class OrderService {
    @Autowired
    private EmailService emailService; // Injected by Spring
    
    public void processOrder(Order order) {
        // Process order
        emailService.sendConfirmation(order.getEmail());
    }
}

Benefits:
✓ Testability - Easy to mock dependencies
✓ Flexibility - Different implementations
✓ Maintainability - Centralized configuration
✓ Reusability - Components are independent

Container manages object creation and wiring!
        `;
        if (output) output.textContent = demo;
    }

    demonstrateDI() {
        const output = document.getElementById('demo-output');
        const demo = `
Dependency Injection Types in Spring:

1. Constructor Injection (Recommended):
@Service
public class UserService {
    private final UserRepository repository;
    
    public UserService(UserRepository repository) {
        this.repository = repository; // Immutable
    }
}

2. Setter Injection:
@Service
public class UserService {
    private UserRepository repository;
    
    @Autowired
    public void setRepository(UserRepository repository) {
        this.repository = repository;
    }
}

3. Field Injection:
@Service
public class UserService {
    @Autowired
    private UserRepository repository; // Direct injection
}

4. Method Injection:
@Service
public class UserService {
    @Autowired
    public void configureServices(UserRepository repository, EmailService emailService) {
        // Multiple dependencies in one method
    }
}

Best Practice: Use constructor injection for mandatory dependencies!
        `;
        if (output) output.textContent = demo;
    }

    demonstrateLifecycle() {
        const output = document.getElementById('demo-output');
        const demo = `
Spring Bean Lifecycle Demonstration:

Complete Lifecycle Phases:
1. Bean Definition Loading
2. Bean Instantiation
3. Dependency Injection
4. BeanNameAware.setBeanName()
5. BeanFactoryAware.setBeanFactory()
6. ApplicationContextAware.setApplicationContext()
7. BeanPostProcessor.postProcessBeforeInitialization()
8. @PostConstruct / InitializingBean.afterPropertiesSet()
9. Custom init-method
10. BeanPostProcessor.postProcessAfterInitialization()
11. Bean Ready for Use
12. @PreDestroy / DisposableBean.destroy()
13. Custom destroy-method

Example Bean with Lifecycle Callbacks:
@Component
public class DatabaseService implements InitializingBean, DisposableBean {
    
    @PostConstruct
    public void init() {
        System.out.println("Connecting to database...");
    }
    
    @Override
    public void afterPropertiesSet() {
        System.out.println("Validating database connection...");
    }
    
    @PreDestroy
    public void cleanup() {
        System.out.println("Closing database connections...");
    }
    
    @Override
    public void destroy() {
        System.out.println("Final cleanup...");
    }
}

Output:
Connecting to database...
Validating database connection...
[Bean in use]
Closing database connections...
Final cleanup...
        `;
        if (output) output.textContent = demo;
    }

    demonstrateScopes() {
        const output = document.getElementById('demo-output');
        const demo = `
Spring Bean Scopes Demonstration:

1. Singleton (Default):
@Component
@Scope("singleton")
public class ConfigService {
    // One instance per Spring container
    // Shared across the entire application
}

2. Prototype:
@Component
@Scope("prototype")
public class TaskProcessor {
    // New instance every time requested
    // Not managed after creation
}

3. Request (Web):
@Component
@Scope("request")
public class RequestContext {
    // One instance per HTTP request
    // Available only in web applications
}

4. Session (Web):
@Component
@Scope("session")
public class UserSession {
    // One instance per HTTP session
    // Maintained across multiple requests
}

5. Application (Web):
@Component
@Scope("application")
public class AppGlobalData {
    // One instance per ServletContext
    // Shared across all sessions
}

Usage Example:
ApplicationContext context = new AnnotationConfigApplicationContext();

// Singleton - same instance
ConfigService config1 = context.getBean(ConfigService.class);
ConfigService config2 = context.getBean(ConfigService.class);
System.out.println(config1 == config2); // true

// Prototype - different instances
TaskProcessor task1 = context.getBean(TaskProcessor.class);
TaskProcessor task2 = context.getBean(TaskProcessor.class);
System.out.println(task1 == task2); // false
        `;
        if (output) output.textContent = demo;
    }

    showConfig(type) {
        const output = document.getElementById('config-output');
        const configs = {
            xml: `
XML Configuration Example:

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- Bean Definitions -->
    <bean id="userRepository" class="com.example.UserRepository">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    
    <bean id="userService" class="com.example.UserService">
        <constructor-arg ref="userRepository"/>
        <property name="emailService" ref="emailService"/>
    </bean>
    
    <bean id="dataSource" class="com.zaxxer.hikari.HikariDataSource">
        <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/mydb"/>
        <property name="username" value="user"/>
        <property name="password" value="password"/>
    </bean>
    
    <bean id="emailService" class="com.example.EmailService">
        <property name="smtpHost" value="smtp.gmail.com"/>
        <property name="smtpPort" value="587"/>
    </bean>
</beans>

Usage:
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
UserService userService = context.getBean("userService", UserService.class);
            `,
            annotation: `
Annotation-Based Configuration:

@Component
public class UserRepository {
    @Autowired
    private DataSource dataSource;
    
    // Repository methods
}

@Service
public class UserService {
    private final UserRepository userRepository;
    private EmailService emailService;
    
    // Constructor injection
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    // Setter injection
    @Autowired
    public void setEmailService(EmailService emailService) {
        this.emailService = emailService;
    }
}

@Service
public class EmailService {
    @Value("\${smtp.host}")
    private String smtpHost;
    
    @Value("\${smtp.port}")
    private int smtpPort;
    
    // Email methods
}

Configuration Class:
@Configuration
@ComponentScan(basePackages = "com.example")
@PropertySource("application.properties")
public class AppConfig {
    
    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/mydb");
        dataSource.setUsername("user");
        dataSource.setPassword("password");
        return dataSource;
    }
}

Usage:
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
            `,
            java: `
Java-Based Configuration:

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.example.repository")
public class AppConfig {
    
    @Bean
    @Primary
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/mydb");
        dataSource.setUsername("user");
        dataSource.setPassword("password");
        dataSource.setMaximumPoolSize(20);
        return dataSource;
    }
    
    @Bean
    public UserRepository userRepository() {
        return new UserRepository(dataSource());
    }
    
    @Bean
    @Scope("prototype")
    public UserService userService() {
        UserService service = new UserService(userRepository());
        service.setEmailService(emailService());
        return service;
    }
    
    @Bean
    public EmailService emailService() {
        EmailService service = new EmailService();
        service.setSmtpHost("smtp.gmail.com");
        service.setSmtpPort(587);
        return service;
    }
    
    @Bean
    public PlatformTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dataSource());
    }
}

Advanced Configuration:
@Configuration
@Profile("production")
@ConditionalOnProperty(name = "feature.email.enabled", havingValue = "true")
public class ProductionConfig {
    
    @Bean
    @ConditionalOnMissingBean
    public EmailService emailService() {
        return new SmtpEmailService();
    }
}

Usage:
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
UserService userService = context.getBean(UserService.class);
            `
        };

        if (output && configs[type]) {
            output.textContent = configs[type];
        }
    }
}

// Animation and Visual Effects
class VisualEffects {
    static addClickRipple(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
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
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    static addHoverGlow(element) {
        element.addEventListener('mouseenter', () => {
            element.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
            element.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '';
            element.style.transform = '';
        });
    }
}

// Utility Functions
class Utils {
    static typeWriter(element, text, speed = 50) {
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    static highlightCode(code) {
        return code
            .replace(/(@\w+)/g, '<span style="color: #ff6b6b;">$1</span>')
            .replace(/(public|private|class|interface|extends|implements)/g, '<span style="color: #4ecdc4;">$1</span>')
            .replace(/(String|int|void|boolean|List|Map)/g, '<span style="color: #45b7d1;">$1</span>')
            .replace(/(\/\/.*$)/gm, '<span style="color: #95a5a6;">$1</span>');
    }
    
    static copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Code copied to clipboard!');
        });
    }
    
    static showToast(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

// Enhanced Loading and Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Spring Demo
    const springDemo = new SpringDemo();
    
    // Add visual effects to interactive elements
    document.querySelectorAll('.nav-btn, .layer, .module-card, .demo-btn').forEach(element => {
        VisualEffects.addHoverGlow(element);
        
        element.addEventListener('click', (e) => {
            VisualEffects.addClickRipple(element, e);
        });
    });
    
    // Add copy functionality to code snippets
    document.querySelectorAll('.code-snippet').forEach(snippet => {
        snippet.style.position = 'relative';
        snippet.style.cursor = 'pointer';
        snippet.title = 'Click to copy';
        
        snippet.addEventListener('click', () => {
            Utils.copyToClipboard(snippet.textContent);
        });
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        .code-snippet:hover {
            background: #1e2328 !important;
            transition: background 0.3s ease;
        }
        
        .feature-list li {
            transition: all 0.3s ease;
        }
        
        .feature-list li:hover {
            background: rgba(102, 126, 234, 0.1);
            padding-left: 25px;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    springDemo.switchSection('overview');
                    break;
                case '2':
                    e.preventDefault();
                    springDemo.switchSection('architecture');
                    break;
                case '3':
                    e.preventDefault();
                    springDemo.switchSection('modules');
                    break;
                case '4':
                    e.preventDefault();
                    springDemo.switchSection('comparison');
                    break;
                case '5':
                    e.preventDefault();
                    springDemo.switchSection('ecosystem');
                    break;
                case '6':
                    e.preventDefault();
                    springDemo.switchSection('demo');
                    break;
            }
        }
    });
    
    // Add progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(102, 126, 234, 0.9);
        color: white;
        padding: 10px 15px;
        border-radius: 20px;
        font-size: 12px;
        z-index: 1000;
        backdrop-filter: blur(10px);
    `;
    progressIndicator.textContent = 'Use Ctrl+1-6 for quick navigation';
    document.body.appendChild(progressIndicator);
    
    // Auto-hide progress indicator after 5 seconds
    setTimeout(() => {
        progressIndicator.style.opacity = '0.3';
    }, 5000);
    
    // Add search functionality
    const searchContainer = document.createElement('div');
    searchContainer.innerHTML = `
        <input type="text" id="springSearch" placeholder="Search Spring concepts..." 
               style="position: fixed; top: 20px; right: 20px; padding: 10px; border: none; 
                      border-radius: 20px; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px);
                      width: 250px; z-index: 1000; outline: none; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    `;
    document.body.appendChild(searchContainer);
    
    const searchInput = document.getElementById('springSearch');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
            performSearch(query);
        }
    });
    
    function performSearch(query) {
        const searchableContent = [
            { section: 'overview', keywords: ['ioc', 'dependency injection', 'spring framework', 'enterprise'] },
            { section: 'architecture', keywords: ['layers', 'core container', 'aop', 'data access', 'web'] },
            { section: 'modules', keywords: ['spring boot', 'spring data', 'spring security', 'spring mvc'] },
            { section: 'comparison', keywords: ['applicationcontext', 'beanfactory', 'container'] },
            { section: 'ecosystem', keywords: ['spring cloud', 'microservices', 'integration'] },
            { section: 'demo', keywords: ['interactive', 'examples', 'configuration'] }
        ];
        
        const matches = searchableContent.filter(item => 
            item.keywords.some(keyword => keyword.includes(query))
        );
        
        if (matches.length > 0) {
            springDemo.switchSection(matches[0].section);
            Utils.showToast(`Found in ${matches[0].section} section`);
        }
    }
    
    // Add dynamic theme switching
    let isDarkMode = false;
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌓';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: rgba(255,255,255,0.2);
        border: 2px solid rgba(255,255,255,0.3);
        color: white;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        font-size: 20px;
        z-index: 1000;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    `;
    
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        toggleTheme(isDarkMode);
    });
    
    document.body.appendChild(themeToggle);
    
    function toggleTheme(darkMode) {
        const body = document.body;
        if (darkMode) {
            body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.background = 'rgba(52, 73, 94, 0.9)';
                section.style.color = '#ecf0f1';
            });
        } else {
            body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.background = 'rgba(255,255,255,0.95)';
                section.style.color = '#333';
            });
        }
    }
    
    // Add scroll-to-top functionality
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: rgba(102, 126, 234, 0.9);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
        }
    });
    
    // Add performance monitoring
    const performanceMonitor = {
        startTime: performance.now(),
        
        logPerformance() {
            const loadTime = performance.now() - this.startTime;
            console.log(`🚀 Spring Demo loaded in ${loadTime.toFixed(2)}ms`);
            
            // Show performance tip
            if (loadTime > 1000) {
                Utils.showToast('💡 Tip: Use keyboard shortcuts for faster navigation!', 5000);
            }
        },
        
        trackInteraction(elementType, action) {
            console.log(`📊 User interaction: ${elementType} - ${action}`);
        }
    };
    
    performanceMonitor.logPerformance();
    
    // Add interaction tracking
    document.addEventListener('click', (e) => {
        const element = e.target;
        if (element.classList.contains('nav-btn')) {
            performanceMonitor.trackInteraction('Navigation', element.textContent);
        } else if (element.classList.contains('layer')) {
            performanceMonitor.trackInteraction('Architecture Layer', element.querySelector('h3').textContent);
        } else if (element.classList.contains('module-card')) {
            performanceMonitor.trackInteraction('Module', element.querySelector('h4').textContent);
        } else if (element.classList.contains('demo-btn')) {
            performanceMonitor.trackInteraction('Demo Button', element.textContent);
        }
    });
    
    // Add accessibility improvements
    function enhanceAccessibility() {
        // Add ARIA labels
        document.querySelectorAll('.nav-btn').forEach((btn, index) => {
            btn.setAttribute('aria-label', `Navigate to ${btn.textContent} section`);
            btn.setAttribute('tabindex', '0');
        });
        
        document.querySelectorAll('.layer').forEach(layer => {
            layer.setAttribute('role', 'button');
            layer.setAttribute('tabindex', '0');
            layer.setAttribute('aria-label', `Learn about ${layer.querySelector('h3').textContent}`);
        });
        
        document.querySelectorAll('.module-card').forEach(card => {
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `Explore ${card.querySelector('h4').textContent}`);
        });
        
        // Add keyboard navigation for interactive elements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && (e.target.classList.contains('layer') || e.target.classList.contains('module-card'))) {
                e.target.click();
            }
        });
        
        // Add focus indicators
        const focusStyle = document.createElement('style');
        focusStyle.textContent = `
            .nav-btn:focus,
            .layer:focus,
            .module-card:focus,
            .demo-btn:focus {
                outline: 3px solid #ffd700;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(focusStyle);
    }
    
    enhanceAccessibility();
    
    // Add welcome animation
    function playWelcomeAnimation() {
        const header = document.querySelector('.header h1');
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(-50px)';
            
            setTimeout(() => {
                header.style.transition = 'all 1s ease';
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Animate navigation buttons
        document.querySelectorAll('.nav-btn').forEach((btn, index) => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                btn.style.transition = 'all 0.5s ease';
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
    }
    
    playWelcomeAnimation();
    
    // Add Easter egg
    let clickCount = 0;
    document.querySelector('.header h1').addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            Utils.showToast('🎉 Easter Egg! You found the secret Spring magic!');
            document.querySelector('.header').style.animation = 'pulse 1s';
            clickCount = 0;
        }
    });
    
    console.log(`
    🌱 Spring Framework Interactive Demo Ready!
    
    Features:
    ✅ Interactive Architecture Layers
    ✅ Module Explorer
    ✅ Code Examples
    ✅ Configuration Comparisons
    ✅ Keyboard Navigation (Ctrl+1-6)
    ✅ Search Functionality
    ✅ Theme Toggle
    ✅ Accessibility Features
    ✅ Performance Monitoring
    
    Happy Learning! 🚀
    `);
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SpringDemo, VisualEffects, Utils };
}