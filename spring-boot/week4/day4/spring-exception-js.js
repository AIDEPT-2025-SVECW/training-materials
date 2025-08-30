// Exception mapping data
const exceptionMappings = {
    connection: {
        sql: {
            name: "java.sql.SQLTimeoutException",
            message: "Connection timeout after 30 seconds",
            sqlState: "08001",
            errorCode: 0
        },
        spring: {
            name: "org.springframework.dao.QueryTimeoutException",
            message: "Query timeout; nested exception is java.sql.SQLTimeoutException: Connection timeout after 30 seconds",
            cause: "Connection timeout issues"
        }
    },
    syntax: {
        sql: {
            name: "java.sql.SQLSyntaxErrorException",
            message: "You have an error in your SQL syntax near 'SELCT'",
            sqlState: "42000",
            errorCode: 1064
        },
        spring: {
            name: "org.springframework.dao.BadSqlGrammarException",
            message: "Bad SQL grammar; nested exception is java.sql.SQLSyntaxErrorException",
            cause: "SQL syntax errors"
        }
    },
    constraint: {
        sql: {
            name: "java.sql.SQLIntegrityConstraintViolationException",
            message: "Cannot delete or update a parent row: a foreign key constraint fails",
            sqlState: "23000",
            errorCode: 1451
        },
        spring: {
            name: "org.springframework.dao.DataIntegrityViolationException",
            message: "Data integrity violation; nested exception is java.sql.SQLIntegrityConstraintViolationException",
            cause: "Foreign key or check constraint violations"
        }
    },
    deadlock: {
        sql: {
            name: "java.sql.SQLTransactionRollbackException",
            message: "Deadlock found when trying to get lock; try restarting transaction",
            sqlState: "40001",
            errorCode: 1213
        },
        spring: {
            name: "org.springframework.dao.CannotAcquireLockException",
            message: "Cannot acquire lock; nested exception is java.sql.SQLTransactionRollbackException",
            cause: "Database deadlock or lock timeout"
        }
    },
    duplicate: {
        sql: {
            name: "java.sql.SQLIntegrityConstraintViolationException",
            message: "Duplicate entry 'john@example.com' for key 'email_unique'",
            sqlState: "23000",
            errorCode: 1062
        },
        spring: {
            name: "org.springframework.dao.DuplicateKeyException",
            message: "Duplicate key violation; nested exception is java.sql.SQLIntegrityConstraintViolationException",
            cause: "Unique constraint violations"
        }
    },
    datatype: {
        sql: {
            name: "java.sql.SQLDataException",
            message: "Data truncation: Incorrect integer value: 'abc' for column 'age'",
            sqlState: "22001",
            errorCode: 1366
        },
        spring: {
            name: "org.springframework.dao.TypeMismatchDataAccessException",
            message: "Type mismatch; nested exception is java.sql.SQLDataException",
            cause: "Data type conversion errors"
        }
    },
    permission: {
        sql: {
            name: "java.sql.SQLInvalidAuthorizationSpecException",
            message: "Access denied for user 'app_user'@'localhost' to database 'production'",
            sqlState: "28000",
            errorCode: 1045
        },
        spring: {
            name: "org.springframework.dao.PermissionDeniedDataAccessException",
            message: "Permission denied; nested exception is java.sql.SQLInvalidAuthorizationSpecException",
            cause: "Database access permission issues"
        }
    }
};

// Exception hierarchy data
const hierarchyData = [
    {
        name: "DataAccessException",
        level: 0,
        description: "Root exception for all data access issues in Spring",
        details: "This is the root exception in Spring's data access exception hierarchy. It's a runtime exception that wraps all database-related exceptions, eliminating the need for checked exception handling in your business logic.",
        example: `@Repository
public class UserRepository {
    // Spring automatically translates SQLException to DataAccessException
    public User findById(Long id) throws DataAccessException {
        // Database operations
    }
}`
    },
    {
        name: "NonTransientDataAccessException",
        level: 1,
        description: "Exceptions that won't succeed if retried without changes",
        details: "These exceptions indicate problems that won't be resolved by simply retrying the operation. They typically require code changes or data fixes.",
        example: `// These won't succeed on retry:
// - SQL syntax errors
// - Permission denied
// - Invalid schema references`
    },
    {
        name: "TransientDataAccessException",
        level: 1,
        description: "Exceptions that might succeed if retried",
        details: "These exceptions indicate temporary problems that might resolve themselves or succeed on retry, such as connection timeouts or deadlocks.",
        example: `// These might succeed on retry:
// - Connection timeouts
// - Deadlocks
// - Temporary resource unavailability`
    },
    {
        name: "DataIntegrityViolationException",
        level: 2,
        description: "Data integrity constraint violations",
        details: "Thrown when an operation violates database integrity constraints like foreign keys, unique constraints, or check constraints.",
        example: `// Caused by:
// - Foreign key violations
// - Unique constraint violations
// - Check constraint violations
// - NOT NULL violations`
    },
    {
        name: "BadSqlGrammarException",
        level: 2,
        description: "SQL syntax or grammar errors",
        details: "Thrown when the SQL statement has syntax errors or references invalid database objects.",
        example: `// Examples:
// SELCT * FROM users (typo)
// SELECT * FROM non_existent_table
// Invalid column references`
    },
    {
        name: "PermissionDeniedDataAccessException",
        level: 2,
        description: "Database access permission denied",
        details: "Thrown when the database user doesn't have sufficient privileges to perform the requested operation.",
        example: `// Caused by:
// - Insufficient table permissions
// - Database access denied
// - Operation not allowed for user`
    },
    {
        name: "QueryTimeoutException",
        level: 2,
        description: "Query execution timeout",
        details: "Thrown when a query takes longer than the configured timeout period to execute.",
        example: `// Configure timeout:
@Query(value = "SELECT * FROM large_table", 
       timeout = 30)
List<Entity> findWithTimeout();`
    },
    {
        name: "CannotAcquireLockException",
        level: 2,
        description: "Database locking issues",
        details: "Thrown when the database cannot acquire necessary locks, often due to deadlocks or lock timeouts.",
        example: `// Caused by:
// - Database deadlocks
// - Lock wait timeouts
// - Concurrent access conflicts`
    },
    {
        name: "DuplicateKeyException",
        level: 3,
        description: "Unique constraint violations",
        details: "A specific type of DataIntegrityViolationException thrown when inserting or updating data would violate a unique constraint.",
        example: `// Example:
// INSERT INTO users (email) VALUES ('existing@email.com')
// where email has unique constraint`
    },
    {
        name: "TypeMismatchDataAccessException",
        level: 2,
        description: "Data type conversion errors",
        details: "Thrown when there's a mismatch between the expected data type and the actual data being processed.",
        example: `// Examples:
// Inserting 'abc' into integer column
// Date format mismatches
// Numeric overflow errors`
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeExceptionDemo();
    initializeHierarchy();
    translateException(); // Show initial translation
});

/**
 * Initialize the exception translation demo
 */
function initializeExceptionDemo() {
    const select = document.getElementById('sqlExceptionSelect');
    select.addEventListener('change', translateException);
}

/**
 * Translate selected SQL exception to Spring DataAccessException
 */
function translateException() {
    const selectedType = document.getElementById('sqlExceptionSelect').value;
    const mapping = exceptionMappings[selectedType];
    
    // Display SQL Exception
    const sqlDisplay = document.getElementById('sqlExceptionDisplay');
    sqlDisplay.innerHTML = `
        <div style="color: #ff6b6b; font-weight: bold;">Exception: ${mapping.sql.name}</div>
        <div style="color: #ffd93d; margin: 8px 0;">Message: "${mapping.sql.message}"</div>
        <div style="color: #6bcf7f;">SQL State: ${mapping.sql.sqlState}</div>
        <div style="color: #74c0fc;">Error Code: ${mapping.sql.errorCode}</div>
        <div style="color: #ff8cc8; margin-top: 10px;">🔴 This is a CHECKED exception</div>
    `;
    
    // Display Spring Exception
    const springDisplay = document.getElementById('springExceptionDisplay');
    springDisplay.innerHTML = `
        <div style="color: #51cf66; font-weight: bold;">Exception: ${mapping.spring.name}</div>
        <div style="color: #ffd93d; margin: 8px 0;">Message: "${mapping.spring.message}"</div>
        <div style="color: #74c0fc;">Cause: ${mapping.spring.cause}</div>
        <div style="color: #51cf66; margin-top: 10px;">🟢 This is a RUNTIME exception</div>
        <div style="color: #adb5bd; margin-top: 10px; font-style: italic;">
            Spring's SQLExceptionTranslator automatically converts this!
        </div>
    `;
}

/**
 * Initialize the exception hierarchy tree
 */
function initializeHierarchy() {
    const treeContainer = document.getElementById('hierarchyTree');
    
    hierarchyData.forEach(item => {
        const node = document.createElement('div');
        node.className = `tree-node level-${item.level}`;
        node.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px;">${item.name}</div>
            <div style="font-size: 0.9em; opacity: 0.8;">${item.description}</div>
        `;
        
        node.addEventListener('click', () => showExceptionDetails(item));
        treeContainer.appendChild(node);
    });
}

/**
 * Show detailed information about selected exception
 * @param {Object} exceptionData - The exception data object
 */
function showExceptionDetails(exceptionData) {
    // Remove active class from all nodes
    document.querySelectorAll('.tree-node').forEach(node => {
        node.classList.remove('active');
    });
    
    // Add active class to clicked node
    event.target.closest('.tree-node').classList.add('active');
    
    // Show details
    const detailsPanel = document.getElementById('detailsPanel');
    detailsPanel.innerHTML = `
        <h4>${exceptionData.name}</h4>
        <p><strong>Description:</strong> ${exceptionData.details}</p>
        <div class="code-example">${exceptionData.example}</div>
    `;
}

/**
 * Utility function to add visual feedback for translations
 */
function addTranslationAnimation() {
    const arrow = document.querySelector('.translation-arrow');
    if (arrow) {
        arrow.style.transform = 'scale(1.2)';
        setTimeout(() => {
            arrow.style.transform = 'scale(1)';
        }, 300);
    }
}

/**
 * Enhanced translation function with animation
 */
function translateExceptionWithAnimation() {
    addTranslationAnimation();
    setTimeout(translateException, 150);
}

/**
 * Search functionality for exception hierarchy
 * @param {string} searchTerm - Term to search for
 */
function searchHierarchy(searchTerm) {
    const nodes = document.querySelectorAll('.tree-node');
    const term = searchTerm.toLowerCase();
    
    nodes.forEach(node => {
        const text = node.textContent.toLowerCase();
        if (text.includes(term) || term === '') {
            node.style.display = 'block';
            node.style.opacity = '1';
        } else {
            node.style.display = 'none';
            node.style.opacity = '0.5';
        }
    });
}

/**
 * Export exception data as JSON
 */
function exportExceptionData() {
    const data = {
        mappings: exceptionMappings,
        hierarchy: hierarchyData,
        timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spring-exception-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Get exception by name from hierarchy
 * @param {string} name - Exception name to find
 * @returns {Object|null} Exception data or null if not found
 */
function getExceptionByName(name) {
    return hierarchyData.find(item => item.name === name) || null;
}

/**
 * Get all exceptions at a specific level
 * @param {number} level - Hierarchy level (0-3)
 * @returns {Array} Array of exceptions at the specified level
 */
function getExceptionsByLevel(level) {
    return hierarchyData.filter(item => item.level === level);
}

/**
 * Validate exception mapping data
 * @returns {boolean} True if all mappings are valid
 */
function validateMappings() {
    for (const [key, mapping] of Object.entries(exceptionMappings)) {
        if (!mapping.sql || !mapping.spring) {
            console.error(`Invalid mapping for ${key}: missing sql or spring data`);
            return false;
        }
        
        if (!mapping.sql.name || !mapping.spring.name) {
            console.error(`Invalid mapping for ${key}: missing exception names`);
            return false;
        }
    }
    return true;
}

// Initialize validation on load
document.addEventListener('DOMContentLoaded', function() {
    if (!validateMappings()) {
        console.error('Exception mapping validation failed');
    }
});

// Export functions for external use
window.SpringExceptionDemo = {
    translateException,
    showExceptionDetails,
    searchHierarchy,
    exportExceptionData,
    getExceptionByName,
    getExceptionsByLevel,
    validateMappings
};