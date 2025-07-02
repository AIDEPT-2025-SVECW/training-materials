// Main Class Section JavaScript Functions
// Add these functions to your existing springboot_config_features.js file

// Generate main class based on user input
function generateMainClass() {
    const packageName = document.getElementById('packageName').value || 'com.example.demo';
    const className = document.getElementById('className').value || 'DemoApplication';
    const classType = document.getElementById('mainClassType').value;
    
    let mainClassCode = '';
    
    switch(classType) {
        case 'basic':
            mainClassCode = generateBasicMainClass(packageName, className);
            break;
        case 'web':
            mainClassCode = generateWebMainClass(packageName, className);
            break;
        case 'commandline':
            mainClassCode = generateCommandLineMainClass(packageName, className);
            break;
        case 'scheduled':
            mainClassCode = generateScheduledMainClass(packageName, className);
            break;
        default:
            mainClassCode = generateBasicMainClass(packageName, className);
    }
    
    document.getElementById('mainClassOutput').textContent = mainClassCode;
}

// Generate basic main class
function generateBasicMainClass(packageName, className) {
    return `package ${packageName};

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ${className} {

    public static void main(String[] args) {
        SpringApplication.run(${className}.class, args);
    }
}`;
}

// Generate web application main class
function generateWebMainClass(packageName, className) {
    return `package ${packageName};

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class ${className} {

    public static void main(String[] args) {
        SpringApplication.run(${className}.class, args);
    }
}

@RestController
class HomeController {
    
    @GetMapping("/")
    public String home() {
        return "Welcome to Spring Boot Web Application!";
    }
}`;
}

// Generate command line runner main class
function generateCommandLineMainClass(packageName, className) {
    return `package ${packageName};

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ${className} implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(${className}.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Application started with command line runner!");
        System.out.println("Arguments: " + String.join(", ", args));
    }
}`;
}

// Generate scheduled tasks main class
function generateScheduledMainClass(packageName, className) {
    return `package ${packageName};

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@SpringBootApplication
@EnableScheduling
public class ${className} {

    public static void main(String[] args) {
        SpringApplication.run(${className}.class, args);
    }
}

@Component
class ScheduledTasks {
    
    @Scheduled(fixedRate = 5000)
    public void reportCurrentTime() {
        System.out.println("Current time: " + new Date());
    }
}`;
}

// Show main class templates
function showMainTemplate(templateType) {
    // Update active button
    document.querySelectorAll('.profile-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    let templateCode = '';
    
    switch(templateType) {
        case 'basic':
            templateCode = `// Basic Spring Boot Application
@SpringBootApplication
public class BasicApplication {
    public static void main(String[] args) {
        SpringApplication.run(BasicApplication.class, args);
    }
}`;
            break;
        case 'web':
            templateCode = `// Web MVC Application
@SpringBootApplication
public class WebApplication {
    public static void main(String[] args) {
        SpringApplication.run(WebApplication.class, args);
    }
}

@Controller
class WebController {
    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("message", "Hello Spring Boot!");
        return "index";
    }
}`;
            break;
        case 'rest':
            templateCode = `// REST API Application
@SpringBootApplication
public class RestApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(RestApiApplication.class, args);
    }
}

@RestController
@RequestMapping("/api")
class ApiController {
    
    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello from REST API!");
    }
    
    @PostMapping("/data")
    public ResponseEntity<Map<String, Object>> postData(@RequestBody Map<String, Object> data) {
        return ResponseEntity.ok(data);
    }
}`;
            break;
        case 'jpa':
            templateCode = `// JPA Data Application
@SpringBootApplication
public class JpaApplication {
    public static void main(String[] args) {
        SpringApplication.run(JpaApplication.class, args);
    }
}

@Entity
class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    // getters and setters
}

@Repository
interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByName(String name);
}`;
            break;
        case 'security':
            templateCode = `// Security Enabled Application
@SpringBootApplication
public class SecurityApplication {
    public static void main(String[] args) {
        SpringApplication.run(SecurityApplication.class, args);
    }
}

@Configuration
@EnableWebSecurity
class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .permitAll()
            );
        return http.build();
    }
}`;
            break;
        default:
            templateCode = 'Select a template to view the code structure.';
    }
    
    document.getElementById('templateOutput').textContent = templateCode;
}

// Initialize main class section when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set default template
    if (document.getElementById('templateOutput')) {
        showMainTemplate('basic');
    }
});

// Add event listeners for main class section
document.addEventListener('DOMContentLoaded', function() {
    // Initialize main class generator with default values
    const packageInput = document.getElementById('packageName');
    const classInput = document.getElementById('className');
    
    if (packageInput && classInput) {
        packageInput.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                generateMainClass();
            }
        });
        
        classInput.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                generateMainClass();
            }
        });
        
        // Generate default main class on load
        generateMainClass();
    }
});