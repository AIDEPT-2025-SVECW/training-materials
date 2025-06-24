// Maven Interactive Guide JavaScript
// Supporting functionality for the Maven tutorial

// Global state management
let currentSection = 'introduction';
let buildProgress = 0;
let isBuilding = false;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGuide();
    updateProgress();
});

// Initialize the guide with default settings
function initializeGuide() {
    showSection('introduction');
    setupKeyboardNavigation();
    setupProgressTracking();
}

// Main navigation function to switch between sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
    }

    // Activate corresponding nav button
    const targetButton = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (targetButton) {
        targetButton.classList.add('active');
    }

    // Update progress based on section
    updateProgress();
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update progress bar based on current section
function updateProgress() {
    const sections = ['introduction', 'structure', 'pom', 'dependencies', 'lifecycle', 'commands'];
    const currentIndex = sections.indexOf(currentSection);
    const progress = ((currentIndex + 1) / sections.length) * 100;
    
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = progress + '%';
    }
}

// Setup keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const sections = ['introduction', 'structure', 'pom', 'dependencies', 'lifecycle', 'commands'];
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
            showSection(sections[currentIndex + 1]);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            showSection(sections[currentIndex - 1]);
        }
    });
}

// Setup progress tracking for user engagement
function setupProgressTracking() {
    // Track section visits
    if (!window.sectionVisits) {
        window.sectionVisits = {};
    }
    
    // Mark current section as visited
    window.sectionVisits[currentSection] = true;
}

// === INTRODUCTION SECTION FUNCTIONS ===

// Simulate Maven build process
function simulateMavenBuild() {
    const output = document.getElementById('buildOutput');
    if (!output) return;
    
    if (isBuilding) return; // Prevent multiple simultaneous builds
    
    isBuilding = true;
    output.innerHTML = '';
    
    const buildSteps = [
        '[INFO] Scanning for projects...',
        '[INFO] ------------------------------------------------------------------------',
        '[INFO] Building my-maven-project 1.0-SNAPSHOT',
        '[INFO] ------------------------------------------------------------------------',
        '[INFO] --- maven-clean-plugin:3.1.0:clean (default-clean) @ my-maven-project ---',
        '[INFO] Deleting target directory',
        '[INFO] --- maven-resources-plugin:3.2.0:resources (default-resources) @ my-maven-project ---',
        '[INFO] Copying 3 resources',
        '[INFO] --- maven-compiler-plugin:3.8.1:compile (default-compile) @ my-maven-project ---',
        '[INFO] Compiling 12 source files to target/classes',
        '[INFO] --- maven-surefire-plugin:2.22.2:test (default-test) @ my-maven-project ---',
        '[INFO] Running com.example.AppTest',
        '[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0',
        '[INFO] --- maven-jar-plugin:3.2.0:jar (default-jar) @ my-maven-project ---',
        '[INFO] Building jar: target/my-maven-project-1.0-SNAPSHOT.jar',
        '[INFO] ------------------------------------------------------------------------',
        '[INFO] BUILD SUCCESS',
        '[INFO] ------------------------------------------------------------------------'
    ];
    
    let stepIndex = 0;
    const interval = setInterval(() => {
        if (stepIndex < buildSteps.length) {
            output.innerHTML += buildSteps[stepIndex] + '<br>';
            output.scrollTop = output.scrollHeight;
            stepIndex++;
        } else {
            clearInterval(interval);
            isBuilding = false;
            output.innerHTML += '<br><span style="color: #4ade80; font-weight: bold;">✅ Build completed successfully!</span>';
        }
    }, 300);
}

// === PROJECT STRUCTURE SECTION FUNCTIONS ===

// Toggle folder visibility in file structure
function toggleFolder(folderId) {
    const folder = document.getElementById(folderId);
    if (!folder) return;
    
    if (folder.style.display === 'none' || !folder.style.display) {
        folder.style.display = 'block';
        folder.style.animation = 'slideIn 0.3s ease-out';
    } else {
        folder.style.display = 'none';
    }
}

// Explain different parts of Maven structure
function explainStructure(type) {
    const explanationDiv = document.getElementById('structureExplanation');
    if (!explanationDiv) return;
    
    const explanations = {
        java: {
            title: '📁 src/main/java - Source Code Directory',
            content: 'This directory contains your main Java source code. Maven automatically compiles all .java files in this directory and its subdirectories. The package structure should match your directory structure starting from this point.'
        },
        test: {
            title: '🧪 src/test/java - Test Code Directory', 
            content: 'This directory contains your unit tests and integration tests. Maven runs these tests during the test phase. Test classes typically follow naming conventions like *Test.java or Test*.java to be automatically discovered.'
        },
        target: {
            title: '🎯 target/ - Build Output Directory',
            content: 'Maven generates all build outputs in this directory including compiled classes, JAR/WAR files, test reports, and generated sources. This directory is typically ignored by version control and can be safely deleted - Maven will recreate it on the next build.'
        }
    };
    
    const explanation = explanations[type];
    if (explanation) {
        explanationDiv.innerHTML = `
            <h4 style="color: #4a5568; margin-bottom: 10px;">${explanation.title}</h4>
            <p style="color: #2d3748; line-height: 1.6;">${explanation.content}</p>
        `;
        explanationDiv.style.display = 'block';
        explanationDiv.style.animation = 'slideIn 0.3s ease-out';
    }
}

// === POM.XML SECTION FUNCTIONS ===

// Explain different POM elements
function explainPOMElement(element) {
    const explanationDiv = document.getElementById('pomExplanation');
    if (!explanationDiv) return;
    
    const explanations = {
        coordinates: {
            title: '📍 Maven Coordinates (GAV)',
            content: `
                <strong>GroupId:</strong> Usually your organization's reverse domain name (com.company)<br>
                <strong>ArtifactId:</strong> The name of your project/module<br>
                <strong>Version:</strong> Current version of your project<br><br>
                Together, these form unique coordinates that identify your project in the Maven universe!
            `
        },
        properties: {
            title: '⚙️ Properties Section',
            content: `
                Properties allow you to define reusable values throughout your POM:<br><br>
                • <strong>maven.compiler.source/target:</strong> Java version for compilation<br>
                • <strong>project.build.sourceEncoding:</strong> Character encoding<br>
                • <strong>Custom properties:</strong> Define your own variables<br><br>
                Reference properties using \${property.name} syntax.
            `
        },
        packaging: {
            title: '📦 Packaging Types',
            content: `
                <strong>jar:</strong> Default packaging for libraries and applications<br>
                <strong>war:</strong> Web applications for deployment to servlet containers<br>
                <strong>pom:</strong> Parent projects and aggregators<br>
                <strong>maven-plugin:</strong> Maven plugin projects<br><br>
                The packaging type determines which plugins are bound to the lifecycle phases.
            `
        }
    };
    
    const explanation = explanations[element];
    if (explanation) {
        explanationDiv.innerHTML = `
            <h4 style="color: #4a5568; margin-bottom: 10px;">${explanation.title}</h4>
            <div style="color: #2d3748; line-height: 1.6;">${explanation.content}</div>
        `;
        explanationDiv.style.display = 'block';
        explanationDiv.style.animation = 'slideIn 0.3s ease-out';
    }
}

// === DEPENDENCIES SECTION FUNCTIONS ===

// Explain dependency scopes
function explainScope(scope) {
    const scopes = {
        compile: {
            title: 'Compile Scope (Default)',
            description: 'Available in all classpaths. Dependencies are propagated to dependent projects.',
            example: 'Spring Framework, Apache Commons, etc.',
            color: '#4ecdc4'
        },
        test: {
            title: 'Test Scope',
            description: 'Only available for test compilation and execution. Not transitive.',
            example: 'JUnit, Mockito, TestNG',
            color: '#ff6b6b'
        },
        provided: {
            title: 'Provided Scope',
            description: 'Available at compile time but not packaged. Expected to be provided by runtime.',
            example: 'Servlet API, Java EE APIs',
            color: '#ffa726'
        }
    };
    
    const scopeInfo = scopes[scope];
    if (scopeInfo) {
        // Create a modal-like explanation
        showScopeModal(scopeInfo);
    }
}

// Show scope explanation modal
function showScopeModal(scopeInfo) {
    // Remove existing modal if present
    const existingModal = document.getElementById('scopeModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'scopeModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease-out;
        ">
            <div style="
                width: 100%;
                height: 4px;
                background: ${scopeInfo.color};
                border-radius: 2px;
                margin-bottom: 20px;
            "></div>
            <h3 style="color: #4a5568; margin-bottom: 15px;">${scopeInfo.title}</h3>
            <p style="color: #2d3748; line-height: 1.6; margin-bottom: 15px;">${scopeInfo.description}</p>
            <p style="color: #666; font-style: italic;">Example: ${scopeInfo.example}</p>
            <button onclick="closeScopeModal()" style="
                background: ${scopeInfo.color};
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                margin-top: 20px;
                float: right;
            ">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeScopeModal();
        }
    });
}

// Close scope modal
function closeScopeModal() {
    const modal = document.getElementById('scopeModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => modal.remove(), 300);
    }
}

// Simulate dependency resolution process
function simulateDependencyResolution() {
    const output = document.getElementById('dependencyOutput');
    if (!output) return;
    
    output.innerHTML = '';
    
    const resolutionSteps = [
        '[INFO] Resolving dependencies...',
        '[INFO] Downloading from central: https://repo1.maven.org/maven2/junit/junit/4.13.2/junit-4.13.2.pom',
        '[INFO] Downloaded from central: junit-4.13.2.pom (24 kB)',
        '[INFO] Downloading from central: https://repo1.maven.org/maven2/org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.pom',
        '[INFO] Downloaded from central: hamcrest-core-1.3.pom (766 B)',
        '[INFO] Downloading from central: https://repo1.maven.org/maven2/junit/junit/4.13.2/junit-4.13.2.jar',
        '[INFO] Downloaded from central: junit-4.13.2.jar (382 kB)',
        '[INFO] Downloading from central: https://repo1.maven.org/maven2/org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar',
        '[INFO] Downloaded from central: hamcrest-core-1.3.jar (45 kB)',
        '',
        '📦 Dependency Tree:',
        'com.example:my-app:jar:1.0-SNAPSHOT',
        '└── junit:junit:jar:4.13.2:test',
        '    └── org.hamcrest:hamcrest-core:jar:1.3:test',
        '',
        '✅ Dependencies resolved successfully!'
    ];
    
    let stepIndex = 0;
    const interval = setInterval(() => {
        if (stepIndex < resolutionSteps.length) {
            const step = resolutionSteps[stepIndex];
            const color = step.includes('✅') ? '#4ade80' : 
                         step.includes('📦') ? '#fbbf24' : 
                         step.includes('└──') ? '#94a3b8' : '#e2e8f0';
            
            output.innerHTML += `<span style="color: ${color}">${step}</span><br>`;
            output.scrollTop = output.scrollHeight;
            stepIndex++;
        } else {
            clearInterval(interval);
        }
    }, 200);
}

// === LIFECYCLE SECTION FUNCTIONS ===

// Run individual lifecycle phase
function runPhase(phase) {
    const output = document.getElementById('lifecycleOutput');
    if (!output) return;
    
    const phaseDescriptions = {
        validate: {
            description: 'Validating project structure and information...',
            actions: [
                'Checking project structure',
                'Validating POM.xml syntax',
                'Verifying required properties',
                '✅ Project validation completed'
            ]
        },
        compile: {
            description: 'Compiling source code...',
            actions: [
                'Creating target/classes directory',
                'Compiling src/main/java/**/*.java',
                'Processing annotations',
                'Copying resources',
                '✅ Compilation successful: 15 classes compiled'
            ]
        },
        test: {
            description: 'Running unit tests...',
            actions: [
                'Compiling test sources',
                'Running com.example.AppTest',
                'Running com.example.UtilTest',
                'Tests run: 8, Failures: 0, Errors: 0, Skipped: 0',
                '✅ All tests passed!'
            ]
        },
        package: {
            description: 'Creating package...',
            actions: [
                'Preparing JAR contents',
                'Adding compiled classes',
                'Adding resources',
                'Creating META-INF/MANIFEST.MF',
                'Building JAR: target/my-app-1.0-SNAPSHOT.jar',
                '✅ Package created successfully'
            ]
        },
        install: {
            description: 'Installing to local repository...',
            actions: [
                'Installing target/my-app-1.0-SNAPSHOT.jar',
                'Installing POM to ~/.m2/repository/com/example/my-app/1.0-SNAPSHOT/',
                'Updating local repository metadata',
                '✅ Installed to local repository'
            ]
        },
        deploy: {
            description: 'Deploying to remote repository...',
            actions: [
                'Uploading my-app-1.0-SNAPSHOT.jar',
                'Uploading my-app-1.0-SNAPSHOT.pom',
                'Updating remote repository metadata',
                '✅ Deployed to remote repository'
            ]
        }
    };
    
    const phaseInfo = phaseDescriptions[phase];
    if (!phaseInfo) return;
    
    output.innerHTML = `<div style="color: #fbbf24; font-weight: bold;">🔄 ${phase.toUpperCase()} PHASE</div>`;
    output.innerHTML += `<div style="color: #94a3b8;">${phaseInfo.description}</div><br>`;
    
    let actionIndex = 0;
    const interval = setInterval(() => {
        if (actionIndex < phaseInfo.actions.length) {
            const action = phaseInfo.actions[actionIndex];
            const color = action.includes('✅') ? '#4ade80' : '#e2e8f0';
            output.innerHTML += `<div style="color: ${color};">[INFO] ${action}</div>`;
            output.scrollTop = output.scrollHeight;
            actionIndex++;
        } else {
            clearInterval(interval);
        }
    }, 400);
}

// Run full build lifecycle
function runFullBuild() {
    const output = document.getElementById('lifecycleOutput');
    if (!output) return;
    
    output.innerHTML = '<div style="color: #fbbf24; font-weight: bold;">🚀 RUNNING FULL BUILD LIFECYCLE</div><br>';
    
    const phases = ['validate', 'compile', 'test', 'package', 'install'];
    let currentPhaseIndex = 0;
    
    function runNextPhase() {
        if (currentPhaseIndex < phases.length) {
            const phase = phases[currentPhaseIndex];
            output.innerHTML += `<div style="color: #4ecdc4; font-weight: bold;">--- ${phase.toUpperCase()} PHASE ---</div>`;
            
            setTimeout(() => {
                output.innerHTML += `<div style="color: #4ade80;">[INFO] ${phase} phase completed successfully</div><br>`;
                output.scrollTop = output.scrollHeight;
                currentPhaseIndex++;
                runNextPhase();
            }, 800);
        } else {
            output.innerHTML += `
                <div style="color: #4ade80; font-weight: bold; text-align: center; margin-top: 10px;">
                    🎉 BUILD SUCCESS 🎉<br>
                    Total time: 4.251 s<br>
                    Finished at: ${new Date().toLocaleTimeString()}
                </div>
            `;
        }
    }
    
    runNextPhase();
}

// === COMMANDS SECTION FUNCTIONS ===

// Run Maven command simulation
function runCommand(command) {
    const output = document.getElementById('commandOutput');
    if (!output) return;
    
    const commands = {
        clean: {
            description: 'Cleaning project (removing target directory)',
            output: [
                '[INFO] Scanning for projects...',
                '[INFO] Building my-maven-project 1.0-SNAPSHOT',
                '[INFO] --- maven-clean-plugin:3.1.0:clean (default-clean) ---',
                '[INFO] Deleting target directory',
                '[INFO] BUILD SUCCESS'
            ]
        },
        compile: {
            description: 'Compiling source code',
            output: [
                '[INFO] Scanning for projects...',
                '[INFO] --- maven-compiler-plugin:3.8.1:compile ---',
                '[INFO] Compiling 15 source files to target/classes',
                '[INFO] BUILD SUCCESS'
            ]
        },
        test: {
            description: 'Running unit tests',
            output: [
                '[INFO] Scanning for projects...',
                '[INFO] --- maven-surefire-plugin:2.22.2:test ---',
                '[INFO] Running com.example.AppTest',
                '[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0',
                '[INFO] Running com.example.UtilTest',
                '[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0',
                '[INFO] BUILD SUCCESS'
            ]
        },
        package: {
            description: 'Creating JAR package',
            output: [
                '[INFO] Scanning for projects...',
                '[INFO] --- maven-jar-plugin:3.2.0:jar ---',
                '[INFO] Building jar: target/my-maven-project-1.0-SNAPSHOT.jar',
                '[INFO] BUILD SUCCESS'
            ]
        },
        install: {
            description: 'Installing to local repository',
            output: [
                '[INFO] Scanning for projects...',
                '[INFO] Installing target/my-maven-project-1.0-SNAPSHOT.jar',
                '[INFO] Installing to ~/.m2/repository/com/example/my-maven-project/1.0-SNAPSHOT/',
                '[INFO] BUILD SUCCESS'
            ]
        },
        'clean-install': {
            description: 'Clean and install (most common workflow)',
            output: [
                '[INFO] Scanning for projects...',
                '[INFO] --- maven-clean-plugin:3.1.0:clean ---',
                '[INFO] Deleting target directory',
                '[INFO] --- maven-compiler-plugin:3.8.1:compile ---',
                '[INFO] Compiling 15 source files to target/classes',
                '[INFO] --- maven-surefire-plugin:2.22.2:test ---',
                '[INFO] Tests run: 8, Failures: 0, Errors: 0, Skipped: 0',
                '[INFO] --- maven-jar-plugin:3.2.0:jar ---',
                '[INFO] Building jar: target/my-maven-project-1.0-SNAPSHOT.jar',
                '[INFO] Installing to local repository',
                '[INFO] BUILD SUCCESS'
            ]
        },
        'dependency-tree': {
            description: 'Displaying dependency tree',
            output: [
                '[INFO] Scanning for projects...',
                '[INFO] --- maven-dependency-plugin:3.2.0:tree ---',
                '[INFO] com.example:my-maven-project:jar:1.0-SNAPSHOT',
                '[INFO] +- junit:junit:jar:4.13.2:test',
                '[INFO] |  \\- org.hamcrest:hamcrest-core:jar:1.3:test',
                '[INFO] +- org.springframework:spring-core:jar:5.3.21:compile',
                '[INFO] |  \\- org.springframework:spring-jcl:jar:5.3.21:compile',
                '[INFO] \\- org.apache.commons:commons-lang3:jar:3.12.0:compile'
            ]
        },
        archetype: {
            description: 'Creating project from archetype',
            output: [
                '[INFO] Scanning for projects...',
                '[INFO] Generating project in Interactive mode',
                '[INFO] Using following parameters:',
                '[INFO] groupId: com.example',
                '[INFO] artifactId: my-new-project',
                '[INFO] version: 1.0-SNAPSHOT',
                '[INFO] package: com.example',
                '[INFO] Project created in directory: my-new-project',
                '[INFO] BUILD SUCCESS'
            ]
        }
    };
    
    const cmd = commands[command];
    if (!cmd) return;
    
    output.innerHTML = `<div style="color: #fbbf24;">$ mvn ${command}</div>`;
    output.innerHTML += `<div style="color: #94a3b8; margin-bottom: 10px;">${cmd.description}...</div>`;
    
    let lineIndex = 0;
    const interval = setInterval(() => {
        if (lineIndex < cmd.output.length) {
            const line = cmd.output[lineIndex];
            const color = line.includes('BUILD SUCCESS') ? '#4ade80' : 
                         line.includes('ERROR') ? '#f87171' : 
                         line.includes('Tests run') ? '#60a5fa' : '#e2e8f0';
            
            output.innerHTML += `<div style="color: ${color};">${line}</div>`;
            output.scrollTop = output.scrollHeight;
            lineIndex++;
        } else {
            clearInterval(interval);
            output.innerHTML += '<div style="color: #4ade80; margin-top: 10px;">✅ Command completed successfully!</div>';
        }
    }, 300);
}

// === UTILITY FUNCTIONS ===

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// Add helpful tooltips and enhanced UX
document.addEventListener('DOMContentLoaded', function() {
    // Add tooltips to navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((btn, index) => {
        btn.title = `Section ${index + 1}: ${btn.textContent}`;
    });
    
    // Add keyboard shortcut hints
    console.log('🚀 Maven Interactive Guide loaded!');
    console.log('💡 Use arrow keys to navigate between sections');
    console.log('⌨️ Keyboard shortcuts: ← → for navigation');
});

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showSection,
        simulateMavenBuild,
        explainStructure,
        explainPOMElement,
        runPhase,
        runCommand
    };
}