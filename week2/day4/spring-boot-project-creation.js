// script.js

// Global variables
let currentSection = 'initializer';
let cliCommands = [];

// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTabs();
    initializeCLI();
});

// Navigation functionality
function initializeNavigation() {
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            switchSection(sectionId);
        });
    });
}

function switchSection(sectionId) {
    // Update navigation buttons
    navButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    
    // Update sections
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    currentSection = sectionId;
}

// Tab functionality
function initializeTabs() {
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Update tab buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    // Update tab contents
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

// Project generation functionality
function generateProject() {
    const projectData = collectProjectData();
    const dependencies = collectDependencies();
    
    displayProjectConfiguration(projectData, dependencies);
    generateInitializrUrl(projectData, dependencies);
    
    // Show output section
    document.getElementById('projectOutput').style.display = 'block';
    document.getElementById('projectOutput').scrollIntoView({ behavior: 'smooth' });
}

function collectProjectData() {
    return {
        type: document.getElementById('projectType').value,
        language: document.getElementById('language').value,
        bootVersion: document.getElementById('springBootVersion').value,
        groupId: document.getElementById('groupId').value,
        artifactId: document.getElementById('artifactId').value,
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        packaging: document.getElementById('packaging').value,
        javaVersion: document.getElementById('javaVersion').value
    };
}

function collectDependencies() {
    const checkboxes = document.querySelectorAll('.dependency:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

function displayProjectConfiguration(projectData, dependencies) {
    const structure = generateProjectStructure(projectData, dependencies);
    document.getElementById('projectStructure').textContent = structure;
}

function generateProjectStructure(projectData, dependencies) {
    const packagePath = projectData.groupId.replace(/\./g, '/');
    const mainClass = projectData.name.replace(/\s+/g, '') + 'Application';
    
    return `${projectData.artifactId}/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── ${packagePath}/
│   │   │       └── ${mainClass}.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── static/
│   │       └── templates/
│   └── test/
│       └── java/
│           └── ${packagePath}/
│               └── ${mainClass}Tests.java
├── target/ (Maven) or build/ (Gradle)
├── pom.xml (Maven) or build.gradle (Gradle)
├── HELP.md
└── README.md

Project Details:
- Type: ${projectData.type.toUpperCase()} Project
- Language: ${projectData.language}
- Spring Boot Version: ${projectData.bootVersion}
- Java Version: ${projectData.javaVersion}
- Packaging: ${projectData.packaging.toUpperCase()}
- Group ID: ${projectData.groupId}
- Artifact ID: ${projectData.artifactId}
- Name: ${projectData.name}
- Description: ${projectData.description}

Dependencies:
${dependencies.length > 0 ? dependencies.map(dep => `- ${dep}`).join('\n') : '- spring-boot-starter-test (default)'}`;
}

function generateInitializrUrl(projectData, dependencies) {
    const baseUrl = 'https://start.spring.io/';
    const params = new URLSearchParams({
        type: projectData.type === 'maven' ? 'maven-project' : 'gradle-project',
        language: projectData.language,
        bootVersion: projectData.bootVersion,
        baseDir: projectData.artifactId,
        groupId: projectData.groupId,
        artifactId: projectData.artifactId,
        name: projectData.name,
        description: projectData.description,
        packageName: projectData.groupId,
        packaging: projectData.packaging,
        javaVersion: projectData.javaVersion
    });
    
    // Add dependencies
    if (dependencies.length > 0) {
        params.append('dependencies', dependencies.join(','));
    }
    
    const fullUrl = baseUrl + '#!' + params.toString();
    document.getElementById('initializrUrl').textContent = fullUrl;
}

// CLI functionality
function initializeCLI() {
    // Add event listener for Enter key in CLI input
    document.getElementById('cliCommand').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            executeCLICommand();
        }
    });
    
    // Initialize CLI commands database
    initializeCLICommands();
}

function initializeCLICommands() {
    cliCommands = [
        {
            command: 'spring --version',
            response: 'Spring CLI v3.2.1'
        },
        {
            command: 'spring --help',
            response: `usage: spring [--help] [--version]
       <command> [<args>]

Available commands are:

  run [options] <files> [--] [args]
    Run a spring groovy script

  test [options] <files> [--] [args]  
    Run a spring groovy script (in test mode)

  jar [options] <jar-name> <files>
    Create a self-contained executable jar file from a Spring Groovy script

  war [options] <war-name> <files>
    Create a self-contained executable war file from a Spring Groovy script

  install [options] <coordinates>
    Install a spring groovy script into your local repository

  uninstall [options] <coordinates>
    Uninstall a spring groovy script from your local repository

  init [options] [location]
    Initialize a new project using Spring Initializr

  shell
    Start a nested shell

Common options:

  --debug Verbose mode
  Print additional status information for the command that is being run`
        },
        {
            command: 'spring init --help',
            response: `spring init - Initialize a new project using Spring Initializr

usage: spring init [options] [location]

Option                         Description
------                         -----------
-a, --artifact-id <String>     Project coordinates (inferred from download URL)
-b, --boot-version <String>    Spring Boot version (default: 3.2.1)
-d, --dependencies <String>    Comma separated list of dependency identifiers to include
-f, --force                    Force overwrite of existing files
-g, --group-id <String>        Project coordinates (inferred from download URL)
-j, --java-version <String>    Language level (default: 17)
-l, --language <String>        Programming language (default: java)
-n, --name <String>            Project name; inferred from location
-p, --packaging <String>       Project packaging (default: jar)
-t, --type <String>            Project type (default: maven-project)
-v, --version <String>         Project version (inferred from download URL)
-x, --extract                  Extract the project archive`
        },
        {
            command: 'spring run --help',
            response: `spring run - Run a spring groovy script

usage: spring run [options] <files> [--] [args]

Option                         Description  
------                         -----------
--autoconfigure [Boolean]      Add autoconfigure compiler
                               transformations (default: true)
--classpath, -cp               Additional classpath entries
-d, --debug                    Verbose mode
--no-guess-dependencies        Do not attempt to guess dependencies
--no-guess-imports             Do not attempt to guess imports  
-q, --quiet                    Quiet logging
--resolve-dependencies         Try to resolve all dependencies
--watch                        Watch the specified file for changes`
        },
        {
            command: 'spring init demo',
            response: `Using service at https://start.spring.io
Project extracted to 'demo'

Generated project structure:
demo/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── demo/
│   │   │               └── DemoApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/
│           └── com/
│               └── example/
│                   └── demo/
│                       └── DemoApplicationTests.java
├── target/
├── pom.xml
├── HELP.md
└── README.md`
        },
        {
            command: 'spring run app.groovy',
            response: `Resolving dependencies...........

  .   ____          _            __ _ _
 /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\
( ( )\\___ | '_ | '_| | '_ \\/ _\` | \\ \\ \\ \\
 \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.1)

2024-01-15T10:30:45.123+00:00  INFO 12345 --- [           main] o.s.b.SpringApplication                  : Starting application using Java 17.0.2
2024-01-15T10:30:45.456+00:00  INFO 12345 --- [           main] o.s.b.a.w.s.WelcomePageHandlerMapping    : Adding welcome page: class path resource [static/index.html]
2024-01-15T10:30:45.789+00:00  INFO 12345 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http)
2024-01-15T10:30:45.890+00:00  INFO 12345 --- [           main] Application                              : Started Application in 2.345 seconds

Application is running at http://localhost:8080`
        },
        {
            command: 'spring jar app.jar app.groovy',
            response: `Resolving dependencies...........
Building jar: app.jar
Successfully created executable jar: app.jar (15.2 MB)

You can run the jar with: java -jar app.jar`
        },
        {
            command: 'spring test app.groovy',
            response: `Resolving dependencies...........
Running tests...

  .   ____          _            __ _ _
 /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\
( ( )\\___ | '_ | '_| | '_ \\/ _\` | \\ \\ \\ \\
 \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.1)

2024-01-15T10:30:45.123+00:00  INFO 12345 --- [           main] o.s.b.t.c.SpringBootTestContextBootstrapper : Neither @ContextConfiguration nor @ContextHierarchy found for test class
2024-01-15T10:30:45.456+00:00  INFO 12345 --- [           main] o.s.b.SpringApplication                  : Starting application using Java 17.0.2

Tests run: 1, Failures: 0, Errors: 0, Skipped: 0

BUILD SUCCESS`
        }
    ];
}

function handleCLICommand(event) {
    if (event.key === 'Enter') {
        executeCLICommand();
    }
}

function executeCLICommand() {
    const input = document.getElementById('cliCommand');
    const command = input.value.trim();
    
    if (!command) return;
    
    // Add command to output
    addCLILine(`$ ${command}`, 'cli-line');
    
    // Find and execute command
    const response = findCLIResponse(command);
    addCLILine(response, response.startsWith('Error:') ? 'cli-error' : 'cli-response');
    
    // Clear input
    input.value = '';
    
    // Scroll to bottom
    scrollCLIToBottom();
}

function findCLIResponse(command) {
    // Check exact matches first
    const exactMatch = cliCommands.find(cmd => cmd.command === command);
    if (exactMatch) {
        return exactMatch.response;
    }
    
    // Check partial matches
    const partialMatch = cliCommands.find(cmd => command.includes(cmd.command.split(' ')[0]));
    if (partialMatch && command.includes('--help')) {
        return partialMatch.response;
    }
    
    // Handle specific patterns
    if (command.startsWith('spring init ') && !command.includes('--help')) {
        const projectName = command.split(' ')[2] || 'demo';
        return `Using service at https://start.spring.io
Project extracted to '${projectName}'

Generated project structure:
${projectName}/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── ${projectName}/
│   │   │               └── ${projectName.charAt(0).toUpperCase() + projectName.slice(1)}Application.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/
│           └── com/
│               └── example/
│                   └── ${projectName}/
│                       └── ${projectName.charAt(0).toUpperCase() + projectName.slice(1)}ApplicationTests.java
├── target/
├── pom.xml
├── HELP.md
└── README.md`;
    }
    
    if (command.startsWith('spring run ') && command.includes('.groovy')) {
        const fileName = command.split(' ')[2];
        return `Resolving dependencies...........

  .   ____          _            __ _ _
 /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\
( ( )\\___ | '_ | '_| | '_ \\/ _\` | \\ \\ \\ \\
 \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.1)

2024-01-15T10:30:45.123+00:00  INFO 12345 --- [           main] o.s.b.SpringApplication                  : Starting application using Java 17.0.2
2024-01-15T10:30:45.789+00:00  INFO 12345 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http)
2024-01-15T10:30:45.890+00:00  INFO 12345 --- [           main] Application                              : Started Application in 2.345 seconds

Application is running at http://localhost:8080
Running ${fileName}...`;
    }
    
    if (command.startsWith('spring jar ')) {
        const parts = command.split(' ');
        const jarName = parts[2] || 'app.jar';
        const fileName = parts[3] || 'app.groovy';
        return `Resolving dependencies...........
Building jar: ${jarName}
Successfully created executable jar: ${jarName} (15.2 MB)

You can run the jar with: java -jar ${jarName}`;
    }
    
    // Handle unknown commands
    if (command.startsWith('spring ')) {
        const subCommand = command.split(' ')[1];
        return `Error: Unknown command '${subCommand}'. Try 'spring --help' for available commands.`;
    }
    
    // Handle non-spring commands
    return `Error: Command not found. This is a Spring Boot CLI simulator. Try commands starting with 'spring'.`;
}

function addCLILine(text, className) {
    const output = document.getElementById('cliOutput');
    const line = document.createElement('div');
    line.className = className;
    line.textContent = text;
    
    // Remove the cursor line
    const cursorLine = output.querySelector('.cli-line:last-child');
    if (cursorLine && cursorLine.textContent === '$ _') {
        cursorLine.remove();
    }
    
    output.appendChild(line);
    
    // Add new cursor line
    const newCursorLine = document.createElement('div');
    newCursorLine.className = 'cli-line';
    newCursorLine.textContent = '$ _';
    output.appendChild(newCursorLine);
}

function scrollCLIToBottom() {
    const output = document.getElementById('cliOutput');
    output.scrollTop = output.scrollHeight;
}

function clearConsole() {
    const output = document.getElementById('cliOutput');
    output.innerHTML = `
        <div class="cli-line">$ spring --version</div>
        <div class="cli-response">Spring CLI v3.2.1</div>
        <div class="cli-line">$ _</div>
    `;
}

// Utility functions
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = '#48bb78';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show success feedback
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = '#48bb78';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    });
}

// Form validation and enhancement
function validateForm() {
    const groupId = document.getElementById('groupId').value;
    const artifactId = document.getElementById('artifactId').value;
    const name = document.getElementById('name').value;
    
    if (!groupId || !artifactId || !name) {
        alert('Please fill in all required fields: Group ID, Artifact ID, and Name');
        return false;
    }
    
    // Validate group ID format
    if (!/^[a-zA-Z][a-zA-Z0-9]*(\.[a-zA-Z][a-zA-Z0-9]*)*$/.test(groupId)) {
        alert('Group ID should follow Java package naming conventions (e.g., com.example)');
        return false;
    }
    
    // Validate artifact ID format
    if (!/^[a-zA-Z][a-zA-Z0-9\-]*$/.test(artifactId)) {
        alert('Artifact ID should start with a letter and contain only letters, numbers, and hyphens');
        return false;
    }
    
    return true;
}

// Enhanced project generation with validation
function generateProject() {
    if (!validateForm()) {
        return;
    }
    
    const projectData = collectProjectData();
    const dependencies = collectDependencies();
    
    displayProjectConfiguration(projectData, dependencies);
    generateInitializrUrl(projectData, dependencies);
    
    // Show output section with animation
    const outputSection = document.getElementById('projectOutput');
    outputSection.style.display = 'block';
    outputSection.style.opacity = '0';
    outputSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        outputSection.style.transition = 'all 0.5s ease-in-out';
        outputSection.style.opacity = '1';
        outputSection.style.transform = 'translateY(0)';
        outputSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Auto-fill functionality
function setupAutoFill() {
    const artifactIdInput = document.getElementById('artifactId');
    const nameInput = document.getElementById('name');
    
    artifactIdInput.addEventListener('input', function() {
        if (nameInput.value === 'Demo' || nameInput.value === '') {
            nameInput.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
        }
    });
}

// Initialize auto-fill when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupAutoFill();
});

// Add smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for buttons
function addLoadingState(button, duration = 2000) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, duration);
}

// Enhanced generate button with loading state
const generateButton = document.querySelector('.generate-btn');
if (generateButton) {
    generateButton.addEventListener('click', function() {
        addLoadingState(this, 1000);
    });
}