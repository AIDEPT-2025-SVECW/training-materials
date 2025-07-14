// JDBC Interactive Demo JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the demo
    init();
});

function init() {
    // Set up navigation
    setupNavigation();
    
    // Set up modal functionality
    setupModal();
    
    // Add smooth scrolling and animations
    addAnimations();
}

// Navigation functionality
function setupNavigation() {
    const navPills = document.querySelectorAll('.nav-pill');
    const contentSections = document.querySelectorAll('.content-section');
    
    navPills.forEach(pill => {
        pill.addEventListener('click', function() {
            const targetSection = this.dataset.section;
            
            // Remove active class from all pills and sections
            navPills.forEach(p => p.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked pill and corresponding section
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            
            // Smooth scroll to top of content
            document.getElementById(targetSection).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Modal functionality
function setupModal() {
    const modal = document.getElementById('detailModal');
    const closeBtn = document.querySelector('.close');
    
    // Close modal when clicking the X
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Show driver details
function showDriverDetails(driverType) {
    const modal = document.getElementById('detailModal');
    const modalContent = document.getElementById('modalContent');
    
    const driverDetails = {
        type1: {
            title: '🌉 Type 1: JDBC-ODBC Bridge Driver',
            content: `
                <h3>JDBC-ODBC Bridge Driver</h3>
                <div class="info-card">
                    <h4>How it works:</h4>
                    <p>This driver translates JDBC calls into ODBC calls and sends them to the ODBC driver.</p>
                    
                    <h4>Advantages:</h4>
                    <ul>
                        <li>Can connect to any database that has an ODBC driver</li>
                        <li>Easy to use for simple applications</li>
                    </ul>
                    
                    <h4>Disadvantages:</h4>
                    <ul>
                        <li>Performance overhead due to translation</li>
                        <li>Platform dependent (requires ODBC driver)</li>
                        <li>Deprecated since Java 8</li>
                        <li>Not suitable for applets</li>
                    </ul>
                </div>
                
                <div class="code-container">
                    <pre>
// Example (Deprecated - Don't use in modern applications)
Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
Connection conn = DriverManager.getConnection(
    "jdbc:odbc:myDSN", "username", "password"
);
                    </pre>
                </div>
            `
        },
        type2: {
            title: '🔧 Type 2: Native-API Driver',
            content: `
                <h3>Native-API Driver (Partly Java Driver)</h3>
                <div class="info-card">
                    <h4>How it works:</h4>
                    <p>This driver uses database-specific native libraries to communicate with the database.</p>
                    
                    <h4>Advantages:</h4>
                    <ul>
                        <li>Better performance than Type 1</li>
                        <li>Direct communication with database</li>
                        <li>More efficient than ODBC bridge</li>
                    </ul>
                    
                    <h4>Disadvantages:</h4>
                    <ul>
                        <li>Platform dependent</li>
                        <li>Requires native libraries on client machine</li>
                        <li>Not suitable for web applications</li>
                        <li>Database-specific</li>
                    </ul>
                </div>
                
                <div class="code-container">
                    <pre>
// Example for Oracle (requires Oracle client libraries)
Class.forName("oracle.jdbc.driver.OracleDriver");
Connection conn = DriverManager.getConnection(
    "jdbc:oracle:oci:@myserver:1521:mysid", 
    "username", "password"
);
                    </pre>
                </div>
            `
        },
        type3: {
            title: '🌐 Type 3: Network Protocol Driver',
            content: `
                <h3>Network Protocol Driver (Pure Java Driver)</h3>
                <div class="info-card">
                    <h4>How it works:</h4>
                    <p>This driver uses middleware application server that converts JDBC calls into database-specific calls.</p>
                    
                    <h4>Advantages:</h4>
                    <ul>
                        <li>Platform independent</li>
                        <li>No client-side libraries needed</li>
                        <li>Single driver can access multiple databases</li>
                        <li>Suitable for web applications</li>
                    </ul>
                    
                    <h4>Disadvantages:</h4>
                    <ul>
                        <li>Requires middleware server</li>
                        <li>Network latency issues</li>
                        <li>Additional layer increases complexity</li>
                        <li>Maintenance overhead</li>
                    </ul>
                </div>
                
                <div class="code-container">
                    <pre>
// Example using middleware server
Class.forName("com.middleware.driver.MiddlewareDriver");
Connection conn = DriverManager.getConnection(
    "jdbc:middleware://middleware-server:8080/", 
    "username", "password"
);
                    </pre>
                </div>
            `
        },
        type4: {
            title: '⚡ Type 4: Pure Java Driver',
            content: `
                <h3>Pure Java Driver (Direct-to-Database)</h3>
                <div class="info-card">
                    <h4>How it works:</h4>
                    <p>This driver directly converts JDBC calls into database-specific network protocol calls.</p>
                    
                    <h4>Advantages:</h4>
                    <ul>
                        <li>100% Pure Java (Platform independent)</li>
                        <li>Best performance</li>
                        <li>No additional software needed</li>
                        <li>Suitable for applets and web applications</li>
                        <li>Direct communication with database</li>
                    </ul>
                    
                    <h4>Disadvantages:</h4>
                    <ul>
                        <li>Database-specific driver needed</li>
                        <li>Depends on database vendor</li>
                    </ul>
                </div>
                
                <div class="code-container">
                    <pre>
// MySQL Example
Class.forName("com.mysql.cj.jdbc.Driver");
Connection conn = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/mydb", 
    "username", "password"
);

// PostgreSQL Example
Class.forName("org.postgresql.Driver");
Connection conn = DriverManager.getConnection(
    "jdbc:postgresql://localhost:5432/mydb", 
    "username", "password"
);

// Oracle Example
Class.forName("oracle.jdbc.driver.OracleDriver");
Connection conn = DriverManager.getConnection(
    "jdbc:oracle:thin:@localhost:1521:xe", 
    "username", "password"
);
                    </pre>
                </div>
            `
        }
    };
    
    modalContent.innerHTML = driverDetails[driverType].content;
    modal.style.display = 'block';
}

// Show step details
function showStepDetails(stepNumber) {
    const modal = document.getElementById('detailModal');
    const modalContent = document.getElementById('modalContent');
    
    const stepDetails = {
        1: {
            title: 'Step 1: Load and Register Driver',
            content: `
                <h3>🚀 Step 1: Load and Register Driver</h3>
                <div class="info-card">
                    <h4>Purpose:</h4>
                    <p>Register the JDBC driver with the DriverManager so it can be used to establish connections.</p>
                    
                    <h4>Methods:</h4>
                    <ul>
                        <li><strong>Class.forName()</strong> - Loads driver class</li>
                        <li><strong>DriverManager.registerDriver()</strong> - Registers driver explicitly</li>
                        <li><strong>Automatic Registration</strong> - JDBC 4.0+ (recommended)</li>
                    </ul>
                </div>
                
                <div class="code-container">
                    <pre>
// Method 1: Using Class.forName() (Traditional)
try {
    Class.forName("com.mysql.cj.jdbc.Driver");
    System.out.println("Driver loaded successfully");
} catch (ClassNotFoundException e) {
    System.out.println("Driver not found: " + e.getMessage());
}

// Method 2: Explicit Registration
try {
    DriverManager.registerDriver(new com.mysql.cj.jdbc.Driver());
} catch (SQLException e) {
    System.out.println("Driver registration failed: " + e.getMessage());
}

// Method 3: Automatic Registration (JDBC 4.0+)
// No explicit loading needed - drivers auto-register
// Just ensure driver JAR is in classpath
                    </pre>
                </div>
                
                <div class="info-card">
                    <h4>💡 Best Practice:</h4>
                    <p>For JDBC 4.0+, use automatic registration. Just include the driver JAR in your classpath!</p>
                </div>
            `
        },
        2: {
            title: 'Step 2: Establish Connection',
            content: `
                <h3>🔗 Step 2: Establish Connection</h3>
                <div class="info-card">
                    <h4>Purpose:</h4>
                    <p>Create a connection to the database using the registered driver.</p>
                    
                    <h4>Connection URL Format:</h4>
                    <p><code>jdbc:&lt;subprotocol&gt;:&lt;subname&gt;</code></p>
                </div>
                
                <div class="code-container">
                    <pre>
// Basic Connection
try {
    Connection conn = DriverManager.getConnection(
        "jdbc:mysql://localhost:3306/mydb",
        "username", 
        "password"
    );
    System.out.println("Connected to database!");
} catch (SQLException e) {
    System.out.println("Connection failed: " + e.getMessage());
}

// Connection with Properties
Properties props = new Properties();
props.setProperty("user", "username");
props.setProperty("password", "password");
props.setProperty("useSSL", "false");
props.setProperty("serverTimezone", "UTC");

Connection conn = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/mydb", props
);

// Common Database URLs
String mysqlUrl = "jdbc:mysql://localhost:3306/mydb";
String postgresUrl = "jdbc:postgresql://localhost:5432/mydb";
String oracleUrl = "jdbc:oracle:thin:@localhost:1521:xe";
String sqlServerUrl = "jdbc:sqlserver://localhost:1433;databaseName=mydb";
                    </pre>
                </div>
                
                <div class="info-card">
                    <h4>⚠️ Important:</h4>
                    <p>Always close connections in a finally block or use try-with-resources!</p>
                </div>
            `
        },
        3: {
            title: 'Step 3: Create Statement',
            content: `
                <h3>📝 Step 3: Create Statement</h3>
                <div class="info-card">
                    <h4>Types of Statements:</h4>
                    <ul>
                        <li><strong>Statement</strong> - Basic SQL execution</li>
                        <li><strong>PreparedStatement</strong> - Precompiled SQL (recommended)</li>
                        <li><strong>CallableStatement</strong> - Stored procedures</li>
                    </ul>
                </div>
                
                <div class="code-container">
                    <pre>
// 1. Statement - Basic
Statement stmt = conn.createStatement();

// Execute simple query
ResultSet rs = stmt.executeQuery("SELECT * FROM users");

// Execute update
int rowsAffected = stmt.executeUpdate(
    "INSERT INTO users (name, email) VALUES ('John', 'john@email.com')"
);

// 2. PreparedStatement - Recommended for user input
String sql = "SELECT * FROM users WHERE age > ? AND city = ?";
PreparedStatement pstmt = conn.prepareStatement(sql);
pstmt.setInt(1, 25);
pstmt.setString(2, "New York");
ResultSet rs = pstmt.executeQuery();

// PreparedStatement for INSERT
String insertSQL = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
PreparedStatement insertStmt = conn.prepareStatement(insertSQL);
insertStmt.setString(1, "Jane");
insertStmt.setString(2, "jane@email.com");
insertStmt.setInt(3, 30);
int result = insertStmt.executeUpdate();

// 3. CallableStatement - For stored procedures
CallableStatement cstmt = conn.prepareCall("{call getUsersByAge(?)}");
cstmt.setInt(1, 25);
ResultSet rs = cstmt.executeQuery();
                    </pre>
                </div>
                
                <div class="info-card">
                    <h4>🛡️ Security Tip:</h4>
                    <p>Always use PreparedStatement for user input to prevent SQL injection attacks!</p>
                </div>
            `
        },
        4: {
            title: 'Step 4: Execute Query',
            content: `
                <h3>⚡ Step 4: Execute Query</h3>
                <div class="info-card">
                    <h4>Execution Methods:</h4>
                    <ul>
                        <li><strong>executeQuery()</strong> - For SELECT statements</li>
                        <li><strong>executeUpdate()</strong> - For INSERT, UPDATE, DELETE</li>
                        <li><strong>execute()</strong> - For any SQL statement</li>
                    </ul>
                </div>
                
                <div class="code-container">
                    <pre>
// executeQuery() - Returns ResultSet
String selectSQL = "SELECT id, name, email FROM users WHERE age > ?";
PreparedStatement pstmt = conn.prepareStatement(selectSQL);
pstmt.setInt(1, 18);
ResultSet rs = pstmt.executeQuery();

// executeUpdate() - Returns int (rows affected)
String updateSQL = "UPDATE users SET email = ? WHERE id = ?";
PreparedStatement updateStmt = conn.prepareStatement(updateSQL);
updateStmt.setString(1, "newemail@example.com");
updateStmt.setInt(2, 1);
int rowsUpdated = updateStmt.executeUpdate();
System.out.println(rowsUpdated + " rows updated");

// execute() - Returns boolean
String createTableSQL = "CREATE TABLE IF NOT EXISTS products (" +
    "id INT PRIMARY KEY AUTO_INCREMENT, " +
    "name VARCHAR(100), " +
    "price DECIMAL(10,2)" +
    ")";
Statement stmt = conn.createStatement();
boolean result = stmt.execute(createTableSQL);

// Batch Execution
PreparedStatement batchStmt = conn.prepareStatement(
    "INSERT INTO users (name, email) VALUES (?, ?)"
);

batchStmt.setString(1, "User1");
batchStmt.setString(2, "user1@email.com");
batchStmt.addBatch();

batchStmt.setString(1, "User2");
batchStmt.setString(2, "user2@email.com");
batchStmt.addBatch();

int[] batchResults = batchStmt.executeBatch();
                    </pre>
                </div>
                
                <div class="info-card">
                    <h4>📊 Return Values:</h4>
                    <p><strong>executeQuery()</strong>: ResultSet | <strong>executeUpdate()</strong>: int | <strong>execute()</strong>: boolean</p>
                </div>
            `
        },
        5: {
            title: 'Step 5: Process Results',
            content: `
                <h3>📋 Step 5: Process Results</h3>
                <div class="info-card">
                    <h4>ResultSet Navigation:</h4>
                    <ul>
                        <li><strong>next()</strong> - Move to next row</li>
                        <li><strong>previous()</strong> - Move to previous row</li>
                        <li><strong>first()</strong> - Move to first row</li>
                        <li><strong>last()</strong> - Move to last row</li>
                    </ul>
                </div>
                
                <div class="code-container">
                    <pre>
// Basic ResultSet Processing
ResultSet rs = stmt.executeQuery("SELECT id, name, email, age FROM users");

while (rs.next()) {
    int id = rs.getInt("id");           // or rs.getInt(1)
    String name = rs.getString("name"); // or rs.getString(2)
    String email = rs.getString("email");
    int age = rs.getInt("age");
    
    System.out.println("ID: " + id + ", Name: " + name + 
                      ", Email: " + email + ", Age: " + age);
}

// Different Data Types
ResultSet rs = stmt.executeQuery("SELECT * FROM products");
while (rs.next()) {
    int id = rs.getInt("id");
    String name = rs.getString("name");
    double price = rs.getDouble("price");
    Date createdDate = rs.getDate("created_date");
    Timestamp lastModified = rs.getTimestamp("last_modified");
    boolean isActive = rs.getBoolean("is_active");
    
    // Check for NULL values
    if (rs.wasNull()) {
        System.out.println("Last value was NULL");
    }
}

// ResultSet Metadata
ResultSetMetaData metadata = rs.getMetaData();
int columnCount = metadata.getColumnCount();

for (int i = 1; i <= columnCount; i++) {
    System.out.println("Column " + i + ": " + 
                      metadata.getColumnName(i) + " - " + 
                      metadata.getColumnTypeName(i));
}

// Scrollable ResultSet
Statement stmt = conn.createStatement(
    ResultSet.TYPE_SCROLL_INSENSITIVE,
    ResultSet.CONCUR_READ_ONLY
);
ResultSet rs = stmt.executeQuery("SELECT * FROM users");

// Navigate freely
rs.last();  // Go to last row
rs.first(); // Go to first row
rs.absolute(5); // Go to 5th row
rs.relative(2); // Move 2 rows forward
                    </pre>
                </div>
                
                <div class="info-card">
                    <h4>🔄 Data Retrieval Methods:</h4>
                    <p>getString(), getInt(), getDouble(), getDate(), getTimestamp(), getBoolean(), etc.</p>
                </div>
            `
        },
        6: {
            title: 'Step 6: Close Resources',
            content: `
                <h3>🔒 Step 6: Close Resources</h3>
                <div class="info-card">
                    <h4>Why Close Resources?</h4>
                    <ul>
                        <li>Prevent memory leaks</li>
                        <li>Release database connections</li>
                        <li>Free up system resources</li>
                        <li>Avoid connection pool exhaustion</li>
                    </ul>
                </div>
                
                <div class="code-container">
                    <pre>
// Traditional Approach (Not Recommended)
Connection conn = null;
Statement stmt = null;
ResultSet rs = null;

try {
    conn = DriverManager.getConnection(url, user, password);
    stmt = conn.createStatement();
    rs = stmt.executeQuery("SELECT * FROM users");
    
    // Process results
    while (rs.next()) {
        // Process data
    }
} catch (SQLException e) {
    e.printStackTrace();
} finally {
    // Close in reverse order of creation
    if (rs != null) {
        try { rs.close(); } catch (SQLException e) { /* ignore */ }
    }
    if (stmt != null) {
        try { stmt.close(); } catch (SQLException e) { /* ignore */ }
    }
    if (conn != null) {
        try { conn.close(); } catch (SQLException e) { /* ignore */ }
    }
}

// Try-with-resources (Recommended - Java 7+)
try (Connection conn = DriverManager.getConnection(url, user, password);
     Statement stmt = conn.createStatement();
     ResultSet rs = stmt.executeQuery("SELECT * FROM users")) {
    
    // Process results
    while (rs.next()) {
        System.out.println(rs.getString("name"));
    }
} catch (SQLException e) {
    e.printStackTrace();
}
// Resources automatically closed here!

// Multiple statements with try-with-resources
try (Connection conn = DriverManager.getConnection(url, user, password)) {
    
    // First query
    try (PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM users WHERE age > ?")) {
        pstmt.setInt(1, 25);
        try (ResultSet rs = pstmt.executeQuery()) {
            while (rs.next()) {
                User user = new User();
                user.setId(rs.getInt("id"));
                user.setName(rs.getString("name"));
                user.setEmail(rs.getString("email"));
                user.setAge(rs.getInt("age"));
                users.add(user);
            }
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
    return users;
}

// Handle NULL values
String selectSQL = "SELECT id, name, email, phone FROM users WHERE id = ?";
try (PreparedStatement pstmt = conn.prepareStatement(selectSQL)) {
    pstmt.setInt(1, 1);
    
    try (ResultSet rs = pstmt.executeQuery()) {
        if (rs.next()) {
            int id = rs.getInt("id");
            String name = rs.getString("name");
            String email = rs.getString("email");
            String phone = rs.getString("phone");
            
            // Check for NULL values
            if (rs.wasNull()) {
                phone = "No phone number";
            }
            
            System.out.println("ID: " + id + ", Name: " + name + 
                              ", Email: " + email + ", Phone: " + phone);
        }
    }
}

// Aggregate Functions
String countSQL = "SELECT COUNT(*) as total_users, AVG(age) as avg_age FROM users";
try (Statement stmt = conn.createStatement();
     ResultSet rs = stmt.executeQuery(countSQL)) {
    
    if (rs.next()) {
        int totalUsers = rs.getInt("total_users");
        double avgAge = rs.getDouble("avg_age");
        System.out.println("Total Users: " + totalUsers + ", Average Age: " + avgAge);
    }
}()) {
                System.out.println(rs.getString("name"));
            }
        }
    }
    
    // Second query
    try (PreparedStatement pstmt = conn.prepareStatement("UPDATE users SET status = ? WHERE id = ?")) {
        pstmt.setString(1, "active");
        pstmt.setInt(2, 1);
        pstmt.executeUpdate();
    }
} catch (SQLException e) {
    e.printStackTrace();
}
                    </pre>
                </div>
                
                <div class="info-card">
                    <h4>✅ Best Practice:</h4>
                    <p>Always use try-with-resources for automatic resource management!</p>
                </div>
            `
        }
    };
    
    modalContent.innerHTML = stepDetails[stepNumber].content;
    modal.style.display = 'block';
}

function showCrudExample(operation) {
    const modal = document.getElementById('detailModal');
    const modalContent = document.getElementById('modalContent');
    
    const examples = {
        create: {
            title: '✨ CREATE Operation',
            description: 'Insert new records into the database using INSERT statements.',
            code: `// Example: Creating a new student record
Connection conn = DriverManager.getConnection(url, username, password);
String sql = "INSERT INTO students (name, email, age, course) VALUES (?, ?, ?, ?)";
PreparedStatement pstmt = conn.prepareStatement(sql);

// Set parameters
pstmt.setString(1, "John Doe");
pstmt.setString(2, "john.doe@email.com");
pstmt.setInt(3, 20);
pstmt.setString(4, "Computer Science");

// Execute the insert
int rowsAffected = pstmt.executeUpdate();
if (rowsAffected > 0) {
    System.out.println("Student created successfully!");
}

// Close resources
pstmt.close();
conn.close();`,
            notes: [
                'Use PreparedStatement to prevent SQL injection',
                'executeUpdate() returns the number of affected rows',
                'Always close resources to prevent memory leaks',
                'Use try-with-resources for automatic resource management'
            ]
        },
        read: {
            title: '📖 READ Operation',
            description: 'Retrieve data from the database using SELECT statements.',
            code: `// Example: Reading student records
Connection conn = DriverManager.getConnection(url, username, password);
String sql = "SELECT id, name, email, age, course FROM students WHERE course = ?";
PreparedStatement pstmt = conn.prepareStatement(sql);

// Set parameter
pstmt.setString(1, "Computer Science");

// Execute the query
ResultSet rs = pstmt.executeQuery();

// Process the results
while (rs.next()) {
    int id = rs.getInt("id");
    String name = rs.getString("name");
    String email = rs.getString("email");
    int age = rs.getInt("age");
    String course = rs.getString("course");
    
    System.out.println("ID: " + id + ", Name: " + name + 
                      ", Email: " + email + ", Age: " + age + 
                      ", Course: " + course);
}

// Close resources
rs.close();
pstmt.close();
conn.close();`,
            notes: [
                'executeQuery() returns a ResultSet object',
                'Use rs.next() to iterate through results',
                'Access data using column names or indices',
                'ResultSet cursor starts before the first row'
            ]
        },
        update: {
            title: '🔄 UPDATE Operation',
            description: 'Modify existing records in the database using UPDATE statements.',
            code: `// Example: Updating student information
Connection conn = DriverManager.getConnection(url, username, password);
String sql = "UPDATE students SET email = ?, age = ? WHERE id = ?";
PreparedStatement pstmt = conn.prepareStatement(sql);

// Set parameters
pstmt.setString(1, "john.newemail@email.com");
pstmt.setInt(2, 21);
pstmt.setInt(3, 1); // Student ID

// Execute the update
int rowsAffected = pstmt.executeUpdate();
if (rowsAffected > 0) {
    System.out.println("Student updated successfully!");
} else {
    System.out.println("No student found with the given ID.");
}

// Close resources
pstmt.close();
conn.close();`,
            notes: [
                'Always use WHERE clause to avoid updating all rows',
                'Check rowsAffected to verify the update was successful',
                'Use transactions for multiple related updates',
                'Validate data before updating'
            ]
        },
        delete: {
            title: '🗑️ DELETE Operation',
            description: 'Remove records from the database using DELETE statements.',
            code: `// Example: Deleting a student record
Connection conn = DriverManager.getConnection(url, username, password);
String sql = "DELETE FROM students WHERE id = ?";
PreparedStatement pstmt = conn.prepareStatement(sql);

// Set parameter
pstmt.setInt(1, 1); // Student ID to delete

// Execute the delete
int rowsAffected = pstmt.executeUpdate();
if (rowsAffected > 0) {
    System.out.println("Student deleted successfully!");
} else {
    System.out.println("No student found with the given ID.");
}

// Close resources
pstmt.close();
conn.close();`,
            notes: [
                'Always use WHERE clause to avoid deleting all rows',
                'Consider using soft deletes (marking as inactive)',
                'Be careful with foreign key constraints',
                'Backup data before performing delete operations'
            ]
        }
    };
    
    const example = examples[operation];
    
    modalContent.innerHTML = `
        <h2 style="color: #4a5568; margin-bottom: 20px; border-bottom: 3px solid #667eea; padding-bottom: 10px;">
            ${example.title}
        </h2>
        
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 10px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #667eea;">
            <p style="line-height: 1.6; color: #4a5568; margin-bottom: 0;">
                ${example.description}
            </p>
        </div>
        
        <div style="background: #1a202c; color: #e2e8f0; padding: 20px; border-radius: 10px; margin: 20px 0; font-family: 'Courier New', monospace; overflow-x: auto; position: relative; border: 1px solid #2d3748;">
            <div style="position: absolute; top: 10px; right: 15px; background: #667eea; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em;">
                Java
            </div>
            <pre style="margin: 0; white-space: pre-wrap; word-wrap: break-word;">${example.code}</pre>
        </div>
        
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 10px; padding: 20px; border-left: 4px solid #48bb78;">
            <h3 style="color: #2d3748; margin-bottom: 15px; font-size: 1.2em;">💡 Key Points</h3>
            <ul style="margin-left: 20px; color: #4a5568; line-height: 1.6;">
                ${example.notes.map(note => `<li style="margin-bottom: 8px;">${note}</li>`).join('')}
            </ul>
        </div>
        
        <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); border-radius: 10px; padding: 20px; margin-top: 20px; border-left: 4px solid #ffc107;">
            <h3 style="color: #856404; margin-bottom: 10px; font-size: 1.1em;">⚠️ Best Practices</h3>
            <ul style="margin-left: 20px; color: #856404; line-height: 1.6;">
                <li style="margin-bottom: 5px;">Use try-with-resources for automatic resource management</li>
                <li style="margin-bottom: 5px;">Always use PreparedStatement for parameterized queries</li>
                <li style="margin-bottom: 5px;">Handle SQLException appropriately</li>
                <li style="margin-bottom: 5px;">Use connection pooling in production applications</li>
            </ul>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Close modal when clicking the X
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
    
    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

// Add smooth scrolling and animations
function addAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add fade-in animation to content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add staggered animation to info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Add hover animations to navigation pills
    const navPills = document.querySelectorAll('.nav-pill');
    navPills.forEach(pill => {
        pill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
        });
        
        pill.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
            }
        });
    });
    
    // Add bounce effect to driver cards
    const driverCards = document.querySelectorAll('.driver-card');
    driverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-8px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 150);
        });
    });
    
    // Add step card animations
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
        // Initial state
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        // Observe for animation
        observer.observe(card);
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) translateY(-5px)';
            this.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.2)';
            
            // Animate step number
            const stepNumber = this.querySelector('.step-number');
            if (stepNumber) {
                stepNumber.style.transform = 'scale(1.2) rotate(5deg)';
                stepNumber.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) translateY(0)';
            this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.1)';
            
            // Reset step number
            const stepNumber = this.querySelector('.step-number');
            if (stepNumber) {
                stepNumber.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Add CRUD card animations
    const crudCards = document.querySelectorAll('.crud-card');
    crudCards.forEach((card, index) => {
        // Initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = `all 0.6s ease ${index * 0.15}s`;
        
        // Observe for animation
        observer.observe(card);
        
        // Hover effects with different colors based on operation
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            
            // Add glowing effect based on operation type
            if (this.classList.contains('create')) {
                this.style.boxShadow = '0 15px 40px rgba(72, 187, 120, 0.4)';
            } else if (this.classList.contains('read')) {
                this.style.boxShadow = '0 15px 40px rgba(66, 153, 225, 0.4)';
            } else if (this.classList.contains('update')) {
                this.style.boxShadow = '0 15px 40px rgba(237, 137, 54, 0.4)';
            } else if (this.classList.contains('delete')) {
                this.style.boxShadow = '0 15px 40px rgba(245, 101, 101, 0.4)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add typing animation to code containers
    const codeContainers = document.querySelectorAll('.code-container');
    codeContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.2)';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add pulse animation to highlight elements
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        highlight.style.animation = 'pulse 2s infinite';
    });
    
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes slideInFromLeft {
            0% { transform: translateX(-100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInFromRight {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.1); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Add modal animations
    const modal = document.getElementById('detailModal');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        
        // Override modal display function
        const originalDisplayStyle = modal.style.display;
        
        const showModal = () => {
            modal.style.display = 'block';
            modalContent.style.transform = 'scale(0.7) translateY(-50px)';
            modalContent.style.opacity = '0';
            
            // Animate in
            setTimeout(() => {
                modalContent.style.transition = 'all 0.3s ease';
                modalContent.style.transform = 'scale(1) translateY(0)';
                modalContent.style.opacity = '1';
            }, 10);
        };
        
        const hideModal = () => {
            modalContent.style.transition = 'all 0.3s ease';
            modalContent.style.transform = 'scale(0.7) translateY(-50px)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        };
        
        // Store original functions for later use
        modal.showModal = showModal;
        modal.hideModal = hideModal;
    }
    
    // Add scroll-triggered animations for header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            header.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Add loading animation for initial page load
    window.addEventListener('load', () => {
        const elements = document.querySelectorAll('.info-card, .driver-card, .step-card, .crud-card');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
    
    // Add focus animations for accessibility
    const interactiveElements = document.querySelectorAll('.nav-pill, .driver-card, .step-card, .crud-card');
    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid rgba(102, 126, 234, 0.5)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Add ripple effect to clickable elements
    const rippleElements = document.querySelectorAll('.nav-pill, .driver-card, .step-card, .crud-card');
    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
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
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Add ripple animation
            const rippleStyle = document.createElement('style');
            rippleStyle.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(rippleStyle);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}