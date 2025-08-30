// Spring Boot Dependency Manager Demo JavaScript

// Data structures for Spring Boot starters and their dependencies
const springBootStarters = {
    'spring-boot-starter-web': {
        name: 'Web Starter',
        description: 'Build web applications with Spring MVC, embedded Tomcat',
        version: '3.2.1',
        dependencies: {
            'spring-boot-starter': ['spring-boot', 'spring-boot-autoconfigure', 'spring-boot-starter-logging'],
            'spring-boot-starter-json': ['jackson-databind', 'jackson-datatype-jdk8', 'jackson-datatype-jsr310'],
            'spring-boot-starter-tomcat': ['tomcat-embed-core', 'tomcat-embed-websocket'],
            'spring-web': ['spring-beans', 'spring-context', 'spring-core'],
            'spring-webmvc': ['spring-aop', 'spring-expression', 'spring-web']
        }
    },
    'spring-boot-starter-data-jpa': {
        name: 'Data JPA Starter',
        description: 'Spring Data JPA with Hibernate for database operations',
        version: '3.2.1',
        dependencies: {
            'spring-boot-starter-aop': ['spring-aop', 'aspectj-weaver'],
            'spring-boot-starter-jdbc': ['HikariCP', 'spring-jdbc'],
            'hibernate-core': ['hibernate-commons-annotations', 'jboss-logging', 'jakarta.persistence-api'],
            'spring-data-jpa': ['spring-data-commons', 'spring-orm', 'spring-context'],
            'spring-aspects': ['spring-aop', 'aspectj-weaver']
        }
    },
    'spring-boot-starter-security': {
        name: 'Security Starter',
        description: 'Spring Security for authentication and authorization',
        version: '3.2.1',
        dependencies: {
            'spring-security-config': ['spring-security-core', 'spring-context'],
            'spring-security-web': ['spring-security-core', 'spring-web'],
            'spring-security-crypto': ['spring-core'],
            'spring-aop': ['spring-beans', 'spring-core']
        }
    },
    'spring-boot-starter-actuator': {
        name: 'Actuator Starter',
        description: 'Production-ready monitoring and management features',
        version: '3.2.1',
        dependencies: {
            'spring-boot-actuator': ['spring-boot', 'spring-context'],
            'spring-boot-actuator-autoconfigure': ['spring-boot-autoconfigure'],
            'micrometer-core': ['micrometer-commons', 'micrometer-observation'],
            'micrometer-jakarta9': ['micrometer-core']
        }
    },
    'spring-boot-starter-test': {
        name: 'Test Starter',
        description: 'Testing framework with JUnit, Mockito, AssertJ',
        version: '3.2.1',
        dependencies: {
            'spring-boot-test': ['spring-boot', 'spring-test'],
            'spring-boot-test-autoconfigure': ['spring-boot-autoconfigure'],
            'junit-jupiter': ['junit-jupiter-api', 'junit-jupiter-engine'],
            'mockito-core': ['byte-buddy', 'objenesis'],
            'assertj-core': [],
            'hamcrest': []
        }
    },
    'spring-boot-starter-data-redis': {
        name: 'Redis Starter',
        description: 'Spring Data Redis for caching and data storage',
        version: '3.2.1',
        dependencies: {
            'spring-data-redis': ['spring-data-keyvalue', 'spring-context'],
            'lettuce-core': ['netty-common', 'netty-transport'],
            'spring-boot-starter-data-keyvalue': ['spring-data-commons']
        }
    }
};

// Version management data
const versionManagement = {
    '3.2.1': {
        javaVersion: '17+',
        springVersion: '6.1.2',
        dependencies: {
            'jackson-databind': '2.15.3',
            'tomcat-embed-core': '10.1.17',
            'hibernate-core': '6.4.1.Final',
            'spring-security-core': '6.2.1',
            'junit-jupiter': '5.10.1',
            'mockito-core': '5.7.0'
        }
    },
    '3.1.5': {
        javaVersion: '17+',
        springVersion: '6.0.13',
        dependencies: {
            'jackson-databind': '2.15.2',
            'tomcat-embed-core': '10.1.15',
            'hibernate-core': '6.2.13.Final',
            'spring-security-core': '6.1.5',
            'junit-jupiter': '5.9.3',
            'mockito-core': '5.3.1'
        }
    },
    '2.7.18': {
        javaVersion: '8+',
        springVersion: '5.3.31',
        dependencies: {
            'jackson-databind': '2.13.5',
            'tomcat-embed-core': '9.0.83',
            'hibernate-core': '5.6.15.Final',
            'spring-security-core': '5.7.11',
            'junit-jupiter': '5.8.2',
            'mockito-core': '4.5.1'
        }
    }
};

// Global state
let selectedStarters = new Set();
let currentVersion = '3.2.1';
let dependencyConflicts = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeStarters();
    updateVersionInfo();
    simulateLoadingEffect();
});

function initializeStarters() {
    const starterGrid = document.getElementById('starterGrid');
    starterGrid.innerHTML = '';
    
    Object.entries(springBootStarters).forEach(([key, starter]) => {
        const card = createStarterCard(key, starter);
        starterGrid.appendChild(card);
    });
}

function createStarterCard(key, starter) {
    const card = document.createElement('div');
    card.className = 'starter-card';
    card.dataset.starter = key;
    
    card.innerHTML = `
        <h3>${starter.name}</h3>
        <p>${starter.description}</p>
        <div class="version">Version: ${starter.version}</div>
    `;
    
    card.addEventListener('click', () => toggleStarter(key, card));
    
    return card;
}

function toggleStarter(starterKey, cardElement) {
    if (selectedStarters.has(starterKey)) {
        selectedStarters.delete(starterKey);
        cardElement.classList.remove('selected');
    } else {
        selectedStarters.add(starterKey);
        cardElement.classList.add('selected');
    }
    
    updateDependencyTree();
    checkForConflicts();
}

function updateDependencyTree() {
    const treeContainer = document.getElementById('dependencyTree');
    
    if (selectedStarters.size === 0) {
        treeContainer.innerHTML = '<div class="loading">Select a starter to see dependency tree...</div>';
        return;
    }
    
    // Show loading animation
    treeContainer.innerHTML = '<div class="loading">Building dependency tree...</div>';
    
    // Simulate processing time
    setTimeout(() => {
        const tree = buildDependencyTree();
        treeContainer.innerHTML = tree;
        animateDependencyTree();
    }, 800);
}

function buildDependencyTree() {
    let treeHtml = '';
    const processedDeps = new Set();
    
    selectedStarters.forEach(starterKey => {
        const starter = springBootStarters[starterKey];
        treeHtml += `<div class="dependency-node level-0" data-dep="${starterKey}">
            📦 ${starterKey} (${starter.version})
        </div>`;
        
        Object.entries(starter.dependencies).forEach(([depKey, transitiveDeps]) => {
            if (!processedDeps.has(depKey)) {
                processedDeps.add(depKey);
                const version = versionManagement[currentVersion].dependencies[depKey] || 'managed';
                treeHtml += `<div class="dependency-node level-1" data-dep="${depKey}">
                    ├── ${depKey} (${version})
                </div>`;
                
                transitiveDeps.forEach(transitive => {
                    treeHtml += `<div class="dependency-node level-2" data-dep="${transitive}">
                        │   ├── ${transitive}
                    </div>`;
                });
            }
        });
    });
    
    return treeHtml;
}

function animateDependencyTree() {
    const nodes = document.querySelectorAll('.dependency-node');
    nodes.forEach((node, index) => {
        node.style.opacity = '0';
        node.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            node.style.transition = 'all 0.3s ease';
            node.style.opacity = '1';
            node.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

function selectVersion(version) {
    currentVersion = version;
    
    // Update active button
    document.querySelectorAll('.version-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    updateVersionInfo();
    updateDependencyTree();
    checkForConflicts();
}

function updateVersionInfo() {
    const versionInfo = document.getElementById('versionInfo');
    const versionData = versionManagement[currentVersion];
    
    let infoHtml = `
        <div class="info-panel">
            <h4>Spring Boot ${currentVersion} Details</h4>
            <ul>
                <li><strong>Java Version:</strong> ${versionData.javaVersion}</li>
                <li><strong>Spring Framework:</strong> ${versionData.springVersion}</li>
                <li><strong>Key Dependencies:</strong></li>
            </ul>
            <div style="margin-top: 15px;">
                <h5 style="margin-bottom: 10px;">Managed Versions:</h5>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px;">
    `;
    
    Object.entries(versionData.dependencies).forEach(([dep, version]) => {
        infoHtml += `
            <div style="background: rgba(102, 126, 234, 0.1); padding: 8px; border-radius: 5px; font-size: 0.9em;">
                <strong>${dep}:</strong> ${version}
            </div>
        `;
    });
    
    infoHtml += `
                </div>
            </div>
        </div>
    `;
    
    versionInfo.innerHTML = infoHtml;
}

function checkForConflicts() {
    dependencyConflicts = [];
    
    if (selectedStarters.size <= 1) {
        return;
    }
    
    // Simulate conflict detection
    const allDeps = new Map();
    
    selectedStarters.forEach(starterKey => {
        const starter = springBootStarters[starterKey];
        Object.keys(starter.dependencies).forEach(dep => {
            if (allDeps.has(dep)) {
                allDeps.get(dep).count++;
            } else {
                allDeps.set(dep, { count: 1, starters: [starterKey] });
            }
        });
    });
    
    // Check for potential conflicts (simplified)
    if (selectedStarters.has('spring-boot-starter-security') && 
        selectedStarters.has('spring-boot-starter-web')) {
        showConflictWarning('Security and Web starters may require additional configuration for CORS and authentication');
    }
    
    if (selectedStarters.has('spring-boot-starter-data-jpa') && 
        selectedStarters.has('spring-boot-starter-data-redis')) {
        showConflictWarning('Multiple data sources detected - ensure proper transaction management');
    }
}

function showConflictWarning(message) {
    const treeContainer = document.getElementById('dependencyTree');
    const existingWarning = treeContainer.querySelector('.conflict-warning');
    
    if (existingWarning) {
        existingWarning.remove();
    }
    
    const warning = document.createElement('div');
    warning.className = 'conflict-warning';
    warning.innerHTML = `
        <h4>⚠️ Potential Configuration Needed</h4>
        <p>${message}</p>
    `;
    
    treeContainer.appendChild(warning);
}

function clearSelections() {
    selectedStarters.clear();
    document.querySelectorAll('.starter-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    updateDependencyTree();
    
    // Clear any warnings
    const warnings = document.querySelectorAll('.conflict-warning');
    warnings.forEach(warning => warning.remove());
}

function simulateLoadingEffect() {
    // Add some dynamic effects to make the demo feel more alive
    const cards = document.querySelectorAll('.starter-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Add hover effects for dependency nodes
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('dependency-node')) {
        const depName = e.target.dataset.dep;
        if (depName) {
            showDependencyTooltip(e.target, depName);
        }
    }
});

function showDependencyTooltip(element, depName) {
    // Remove existing tooltips
    const existingTooltip = document.querySelector('.dependency-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'dependency-tooltip';
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 5px;
        font-size: 0.8em;
        pointer-events: none;
        z-index: 1000;
        max-width: 250px;
    `;
    
    // Add dependency description
    const descriptions = {
        'spring-web': 'Core web support including HTTP clients and web utilities',
        'spring-webmvc': 'Spring MVC framework for building web applications',
        'jackson-databind': 'JSON processing library for Java',
        'tomcat-embed-core': 'Embedded Apache Tomcat server',
        'hibernate-core': 'Object-relational mapping framework',
        'spring-security-core': 'Core Spring Security functionality',
        'junit-jupiter': 'Modern testing framework for Java',
        'mockito-core': 'Mocking framework for unit testing'
    };
    
    tooltip.textContent = descriptions[depName] || `${depName} - Spring Boot managed dependency`;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = (rect.right + 10) + 'px';
    tooltip.style.top = rect.top + 'px';
    
    // Remove tooltip after 3 seconds
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.remove();
        }
    }, 3000);
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        clearSelections();
    }
});

// Add visual feedback for interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('starter-card')) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);