// Tab functionality
function showTab(tabId, event) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// CRUD tab functionality
function showCrudTab(tabId, event) {
    // Hide all CRUD contents
    const crudContents = document.querySelectorAll('.crud-content');
    crudContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all CRUD tab buttons
    const crudButtons = document.querySelectorAll('.crud-tab');
    crudButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected CRUD content
    document.getElementById(tabId).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Interactive demo functionality
function updateJdbcDemo() {
    const price = document.getElementById('param1').value;
    const category = document.getElementById('param2').value;
    const inStock = document.getElementById('param3').checked;
    
    // Update JDBC query display
    const jdbcQuery = document.getElementById('jdbcQuery');
    jdbcQuery.value = `SELECT * FROM products WHERE price > ${price} AND category = '${category}' AND in_stock = ${inStock}`;
    
    // Update parameter map display
    const parameterMap = document.getElementById('parameterMap');
    parameterMap.innerHTML = `
        <strong>Parameter Map:</strong><br>
        minPrice: ${price}<br>
        category: "${category}"<br>
        inStock: ${inStock}
    `;
}

// Scenario recommendation functionality
function showRecommendation(scenario) {
    const recommendationDiv = document.getElementById('recommendation');
    let recommendation = '';
    
    switch(scenario) {
        case 'simple':
            recommendation = `
                <h4>✅ Recommendation: Use JDBCTemplate</h4>
                <p><strong>Why:</strong> Only 2 parameters, simple query structure.</p>
                <div class="code-block small">
                    <pre><code>String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
User user = jdbcTemplate.queryForObject(sql, new Object[]{username, password}, new UserRowMapper());</code></pre>
                </div>
            `;
            break;
        case 'complex':
            recommendation = `
                <h4>✅ Recommendation: Use NamedJDBCTemplate</h4>
                <p><strong>Why:</strong> Multiple parameters, complex conditions, better readability.</p>
                <div class="code-block small">
                    <pre><code>String sql = "SELECT * FROM products WHERE price BETWEEN :minPrice AND :maxPrice " +
             "AND category = :category AND brand = :brand AND rating >= :minRating";
Map&lt;String, Object&gt; params = Map.of(
    "minPrice", minPrice, "maxPrice", maxPrice,
    "category", category, "brand", brand, "minRating", minRating
);</code></pre>
                </div>
            `;
            break;
        case 'dynamic':
            recommendation = `
                <h4>✅ Recommendation: Use NamedJDBCTemplate</h4>
                <p><strong>Why:</strong> Dynamic query building, conditional parameters.</p>
                <div class="code-block small">
                    <pre><code>StringBuilder sql = new StringBuilder("SELECT * FROM reports WHERE 1=1");
Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();

if (startDate != null) {
    sql.append(" AND date >= :startDate");
    params.put("startDate", startDate);
}
if (department != null) {
    sql.append(" AND department = :department");
    params.put("department", department);
}</code></pre>
                </div>
            `;
            break;
        case 'batch':
            recommendation = `
                <h4>✅ Recommendation: Use NamedJDBCTemplate</h4>
                <p><strong>Why:</strong> Batch operations with named parameters are more maintainable.</p>
                <div class="code-block small">
                    <pre><code>String sql = "INSERT INTO users (name, email, age) VALUES (:name, :email, :age)";
List&lt;Map&lt;String, Object&gt;&gt; batchParams = users.stream()
    .map(user -> Map.of("name", user.getName(), "email", user.getEmail(), "age", user.getAge()))
    .collect(Collectors.toList());
namedJdbcTemplate.batchUpdate(sql, batchParams.toArray(new Map[0]));</code></pre>
                </div>
            `;
            break;
    }
    
    recommendationDiv.innerHTML = recommendation;
}

// Generate create query functionality
function generateCreateQuery() {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const age = document.getElementById('userAge').value;
    const city = document.getElementById('userCity').value;
    
    const sql = `INSERT INTO users (name, email, age, city, created_at) 
VALUES (:name, :email, :age, :city, :createdAt)`;
    
    const params = `Map<String, Object> params = Map.of(
    "name", "${name}",
    "email", "${email}",
    "age", ${age},
    "city", "${city}",
    "createdAt", LocalDateTime.now()
);`;
    
    const resultDiv = document.getElementById('createQueryResult');
    resultDiv.innerHTML = `
        <strong>Generated SQL:</strong><br>
        ${sql}<br><br>
        <strong>Parameters:</strong><br>
        ${params}
    `;
}

// Generate search query functionality
function generateSearchQuery() {
    const city = document.getElementById('searchCity').value;
    const minAge = document.getElementById('searchMinAge').value;
    const maxAge = document.getElementById('searchMaxAge').value;
    
    const sql = `SELECT id, name, email, age, city, created_at FROM users 
WHERE city = :city AND age BETWEEN :minAge AND :maxAge 
ORDER BY created_at DESC`;
    
    const params = `Map<String, Object> params = Map.of(
    "city", "${city}",
    "minAge", ${minAge},
    "maxAge", ${maxAge}
);`;
    
    const resultDiv = document.getElementById('searchQueryResult');
    resultDiv.innerHTML = `
        <strong>Generated SQL:</strong><br>
        ${sql}<br><br>
        <strong>Parameters:</strong><br>
        ${params}
    `;
}

// Initialize demo on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the interactive demo
    updateJdbcDemo();
    
    // Add smooth scrolling for better UX
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
    
    // Add keyboard navigation for tabs
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && e.shiftKey) {
            // Handle shift+tab for backward navigation
            return;
        }
        
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeTab = document.querySelector('.tab-button.active');
            if (activeTab) {
                const allTabs = Array.from(document.querySelectorAll('.tab-button'));
                const currentIndex = allTabs.indexOf(activeTab);
                let newIndex;
                
                if (e.key === 'ArrowLeft') {
                    newIndex = currentIndex > 0 ? currentIndex - 1 : allTabs.length - 1;
                } else {
                    newIndex = currentIndex < allTabs.length - 1 ? currentIndex + 1 : 0;
                }
                
                allTabs[newIndex].click();
            }
        }
    });
    
    // Add copy functionality to code blocks
    document.querySelectorAll('.code-block').forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '📋 Copy';
        copyButton.className = 'copy-button';
        copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8rem;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        block.style.position = 'relative';
        block.appendChild(copyButton);
        
        block.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });
        
        block.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
        });
        
        copyButton.addEventListener('click', () => {
            const code = block.querySelector('pre').textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.innerHTML = '✅ Copied!';
                setTimeout(() => {
                    copyButton.innerHTML = '📋 Copy';
                }, 2000);
            });
        });
    });
    
    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe all major content sections
    document.querySelectorAll('.crud-example, .use-case, .comparison-item, .demo-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Add CSS for fadeInUp animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .copy-button:hover {
            background: rgba(255, 255, 255, 0.2) !important;
        }
    `;
    document.head.appendChild(style);
});

// Advanced features
function toggleCodeExample(button) {
    const codeBlock = button.nextElementSibling;
    const isVisible = codeBlock.style.display !== 'none';
    
    if (isVisible) {
        codeBlock.style.display = 'none';
        button.textContent = 'Show Code';
    } else {
        codeBlock.style.display = 'block';
        button.textContent = 'Hide Code';
    }
}

// Search functionality for examples
function searchExamples() {
    const searchTerm = document.getElementById('exampleSearch').value.toLowerCase();
    const examples = document.querySelectorAll('.crud-example');
    
    examples.forEach(example => {
        const text = example.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            example.style.display = 'block';
            example.style.animation = 'fadeIn 0.3s ease-in-out';
        } else {
            example.style.display = 'none';
        }
    });
}

// Tooltip functionality
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.8rem;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        white-space: nowrap;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    element.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    }, { once: true });
}

// Code syntax highlighting (basic)

function highlightCode() {
    document.querySelectorAll('pre code').forEach(block => {
        let code = block.innerHTML;

        // Escape HTML
        code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Highlight Java keywords
        code = code.replace(/(public|private|protected|class|interface|extends|implements|new|return|if|else|for|while|try|catch|void|static|final|abstract|this|super)/g,
            '<span style="color: #569cd6;">$1</span>');

        // Highlight strings
        code = code.replace(/"([^"]*)"/g, '<span style="color: #ce9178;">"$1"</span>');

        // Highlight single-line comments
        code = code.replace(/\/\/(.*)/g, '<span style="color: #6a9955;">//$1</span>');

        block.innerHTML = code;
    });
}


// Performance monitoring
function measurePerformance(operation, callback) {
    const start = performance.now();
    callback();
    const end = performance.now();
    console.log(`${operation} took ${end - start} milliseconds`);
}

// Local storage for user preferences
function savePreference(key, value) {
    try {
        localStorage.setItem(`namedjdbc_tutorial_${key}`, JSON.stringify(value));
    } catch (e) {
        console.warn('Could not save preference:', e);
    }
}

function loadPreference(key, defaultValue) {
    try {
        const stored = localStorage.getItem(`namedjdbc_tutorial_${key}`);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
        console.warn('Could not load preference:', e);
        return defaultValue;
    }
}

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        savePreference('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        savePreference('theme', 'dark');
    }
}

// Advanced search functionality
function createSearchIndex() {
    const searchIndex = [];
    const contents = document.querySelectorAll('h2, h3, h4, .code-block, p');
    
    contents.forEach((element, index) => {
        searchIndex.push({
            id: index,
            element: element,
            text: element.textContent.toLowerCase(),
            type: element.tagName.toLowerCase()
        });
    });
    
    return searchIndex;
}

function performSearch(query) {
    const searchIndex = createSearchIndex();
    const results = searchIndex.filter(item => 
        item.text.includes(query.toLowerCase())
    );
    
    return results;
}

// Progressive Web App features
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    }
}

// Accessibility improvements
function enhanceAccessibility() {
    // Add ARIA labels
    document.querySelectorAll('.tab-button').forEach((button, index) => {
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', button.classList.contains('active'));
        button.setAttribute('aria-controls', button.getAttribute('onclick').match(/'([^']+)'/)[1]);
    });
    
    // Add keyboard navigation hints
    document.querySelectorAll('.tab-button').forEach(button => {
        button.title = 'Use arrow keys to navigate tabs';
    });
    
    // Focus management
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Dynamic content loading
function loadDynamicContent(section) {
    const placeholder = document.querySelector(`#${section}-placeholder`);
    if (placeholder) {
        placeholder.innerHTML = '<div class="loading">Loading...</div>';
        
        setTimeout(() => {
            placeholder.innerHTML = generateDynamicContent(section);
        }, 500);
    }
}

function generateDynamicContent(section) {
    // This would typically fetch from an API
    const content = {
        'advanced-examples': `
            <h4>Advanced Dynamic Query Building</h4>
            <div class="code-block">
                <pre><code>public List&lt;User&gt; findUsersWithFilters(UserFilter filter) {
    StringBuilder sql = new StringBuilder(
        "SELECT * FROM users WHERE 1=1"
    );
    
    Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
    
    if (filter.getName() != null) {
        sql.append(" AND name LIKE :name");
        params.put("name", "%" + filter.getName() + "%");
    }
    
    if (filter.getMinAge() != null) {
        sql.append(" AND age >= :minAge");
        params.put("minAge", filter.getMinAge());
    }
    
    if (filter.getCity() != null) {
        sql.append(" AND city = :city");
        params.put("city", filter.getCity());
    }
    
    return namedJdbcTemplate.query(sql.toString(), params, new UserRowMapper());
}</code></pre>
            </div>
        `
    };
    
    return content[section] || '<p>Content not found</p>';
}

// Error handling and logging
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <strong>Oops! Something went wrong</strong><br>
        <small>${context}: ${error.message}</small>
    `;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Load user preferences
        const savedTheme = loadPreference('theme', 'light');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
        
        // Initialize features
        highlightCode();
        enhanceAccessibility();
        
        // Register service worker for PWA
        registerServiceWorker();
        
        console.log('NamedJDBC Tutorial initialized successfully!');
    } catch (error) {
        handleError(error, 'Initialization');
    }
});

// Export functions for potential module usage
window.NamedJDBCTutorial = {
    showTab,
    showCrudTab,
    updateJdbcDemo,
    showRecommendation,
    generateCreateQuery,
    generateSearchQuery,
    toggleTheme,
    performSearch
};