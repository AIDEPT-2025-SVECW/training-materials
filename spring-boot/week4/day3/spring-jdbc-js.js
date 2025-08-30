// Spring JDBC Demo JavaScript
// This file contains all interactive functionality for the Spring JDBC demonstration

// Global variables to store demo data
let mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", createdAt: "2024-01-15T10:30:00" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", createdAt: "2024-01-18T14:20:00" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", createdAt: "2024-01-20T09:15:00" },
    { id: 4, name: "Bob Wilson", email: "bob@example.com", createdAt: "2024-01-22T16:45:00" }
];

let isConnected = false;
let nextUserId = 5;

// Tab functionality
function showTab(tabId) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// DataSource simulation
function simulateDataSourceConnection() {
    const url = document.getElementById('dbUrl').value;
    const username = document.getElementById('dbUser').value;
    const password = document.getElementById('dbPassword').value;
    const output = document.getElementById('datasource-output');
    
    output.innerHTML = "Connecting to database...\n";
    
    setTimeout(() => {
        if (url && username && password) {
            isConnected = true;
            updateConnectionStatus();
            output.innerHTML += `✅ DataSource Configuration Successful!\n\n`;
            output.innerHTML += `Driver: com.mysql.cj.jdbc.Driver\n`;
            output.innerHTML += `URL: ${url}\n`;
            output.innerHTML += `Username: ${username}\n`;
            output.innerHTML += `Connection Pool: DriverManagerDataSource (No pooling)\n`;
            output.innerHTML += `Status: Connected\n\n`;
            output.innerHTML += `📝 Note: DriverManagerDataSource creates a new connection for each request.\n`;
            output.innerHTML += `For production, consider using HikariCP or Apache DBCP for connection pooling.`;
        } else {
            output.innerHTML += `❌ Connection Failed!\n`;
            output.innerHTML += `Error: Missing required connection parameters\n`;
            output.innerHTML += `Please provide URL, username, and password.`;
        }
    }, 1500);
}

// Update query input based on selection
function updateQueryInput() {
    const select = document.getElementById('sqlQuery');
    const paramsInput = document.getElementById('queryParams');
    
    switch(select.value) {
        case 'SELECT * FROM users':
            paramsInput.value = '';
            paramsInput.placeholder = 'No parameters needed';
            break;
        case 'SELECT COUNT(*) FROM users':
            paramsInput.value = '';
            paramsInput.placeholder = 'No parameters needed';
            break;
        case 'INSERT INTO users (name, email) VALUES (?, ?)':
            paramsInput.value = 'New User, newuser@example.com';
            paramsInput.placeholder = 'name, email';
            break;
        case 'UPDATE users SET name=? WHERE id=?':
            paramsInput.value = 'Updated Name, 1';
            paramsInput.placeholder = 'name, id';
            break;
    }
}

// Execute JDBC query simulation
function executeJdbcQuery() {
    const query = document.getElementById('sqlQuery').value;
    const params = document.getElementById('queryParams').value;
    const output = document.getElementById('jdbc-output');
    
    if (!isConnected) {
        output.innerHTML = "❌ Error: No database connection!\nPlease configure DataSource first.";
        return;
    }
    
    output.innerHTML = "Executing query...\n";
    output.innerHTML += `SQL: ${query}\n`;
    
    if (params) {
        output.innerHTML += `Parameters: [${params}]\n`;
    }
    
    setTimeout(() => {
        simulateQueryExecution(query, params, output);
    }, 1000);
}

// Simulate query execution with different SQL operations
function simulateQueryExecution(query, params, output) {
    output.innerHTML += "\n📊 Query Execution Results:\n";
    output.innerHTML += "=" .repeat(40) + "\n";
    
    if (query.includes('SELECT COUNT(*)')) {
        output.innerHTML += `Result: ${mockUsers.length}\n`;
        output.innerHTML += `Type: Integer\n`;
        output.innerHTML += `Method: jdbcTemplate.queryForObject(sql, Integer.class)\n`;
        
    } else if (query.includes('SELECT * FROM users')) {
        output.innerHTML += `Results: ${mockUsers.length} rows\n`;
        output.innerHTML += `Sample Data:\n`;
        mockUsers.slice(0, 2).forEach(user => {
            output.innerHTML += `  - ID: ${user.id}, Name: ${user.name}, Email: ${user.email}\n`;
        });
        output.innerHTML += `Method: jdbcTemplate.query(sql, rowMapper)\n`;
        
    } else if (query.includes('INSERT INTO users')) {
        const paramArray = params.split(',').map(p => p.trim());
        if (paramArray.length >= 2) {
            const newUser = {
                id: nextUserId++,
                name: paramArray[0],
                email: paramArray[1],
                createdAt: new Date().toISOString()
            };
            mockUsers.push(newUser);
            output.innerHTML += `Rows affected: 1\n`;
            output.innerHTML += `New user created: ${newUser.name} (ID: ${newUser.id})\n`;
            output.innerHTML += `Method: jdbcTemplate.update(sql, params...)\n`;
        }
        
    } else if (query.includes('UPDATE users')) {
        const paramArray = params.split(',').map(p => p.trim());
        if (paramArray.length >= 2) {
            const userId = parseInt(paramArray[1]);
            const user = mockUsers.find(u => u.id === userId);
            if (user) {
                user.name = paramArray[0];
                output.innerHTML += `Rows affected: 1\n`;
                output.innerHTML += `Updated user: ${user.name} (ID: ${user.id})\n`;
                output.innerHTML += `Method: jdbcTemplate.update(sql, params...)\n`;
            } else {
                output.innerHTML += `Rows affected: 0\n`;
                output.innerHTML += `No user found with ID: ${userId}\n`;
            }
        }
    }
    
    output.innerHTML += "\n🔧 JdbcTemplate handles:\n";
    output.innerHTML += "  ✅ Connection management\n";
    output.innerHTML += "  ✅ Statement preparation\n";
    output.innerHTML += "  ✅ Exception handling\n";
    output.innerHTML += "  ✅ Resource cleanup\n";
}

// Simulate RowMapper functionality
function simulateRowMapping() {
    const resultSetData = document.getElementById('resultSetData').value;
    const output = document.getElementById('rowmapper-output');
    
    try {
        const data = JSON.parse(resultSetData);
        
        output.innerHTML = "🔄 Custom RowMapper Processing:\n";
        output.innerHTML += "=" .repeat(40) + "\n";
        output.innerHTML += "ResultSet Data:\n";
        output.innerHTML += JSON.stringify(data, null, 2) + "\n\n";
        
        // Simulate custom row mapping
        output.innerHTML += "📝 Custom RowMapper.mapRow() execution:\n";
        output.innerHTML += "1. rs.getLong('id') → " + data.id + "\n";
        output.innerHTML += "2. rs.getString('name') → '" + data.name + "'\n";
        output.innerHTML += "3. rs.getString('email') → '" + data.email + "'\n";
        output.innerHTML += "4. rs.getTimestamp('created_at') → " + data.created_at + "\n\n";
        
        // Create User object
        const user = {
            id: data.id,
            name: data.name,
            email: data.email,
            createdAt: data.created_at
        };
        
        output.innerHTML += "✅ Mapped User Object:\n";
        output.innerHTML += "{\n";
        output.innerHTML += `  id: ${user.id},\n`;
        output.innerHTML += `  name: "${user.name}",\n`;
        output.innerHTML += `  email: "${user.email}",\n`;
        output.innerHTML += `  createdAt: "${user.createdAt}"\n`;
        output.innerHTML += "}\n\n";
        
        output.innerHTML += "💡 Custom RowMapper benefits:\n";
        output.innerHTML += "  • Full control over mapping logic\n";
        output.innerHTML += "  • Can handle data transformations\n";
        output.innerHTML += "  • Custom exception handling\n";
        output.innerHTML += "  • Column name flexibility\n";
        
    } catch (error) {
        output.innerHTML = "❌ Error: Invalid JSON format\n";
        output.innerHTML += "Please enter valid JSON data representing a database row.";
    }
}

// Simulate BeanPropertyRowMapper functionality
function simulateBeanPropertyMapping() {
    const dbColumns = document.getElementById('dbColumns').value;
    const beanProperties = document.getElementById('beanProperties').value;
    const sampleData = document.getElementById('sampleData').value;
    const output = document.getElementById('beanmapper-output');
    
    try {
        const data = JSON.parse(sampleData);
        const columns = dbColumns.split(',').map(col => col.trim());
        const properties = beanProperties.split(',').map(prop => prop.trim());
        
        output.innerHTML = "🔄 BeanPropertyRowMapper Processing:\n";
        output.innerHTML += "=" .repeat(50) + "\n";
        
        output.innerHTML += "Database Columns: [" + columns.join(', ') + "]\n";
        output.innerHTML += "Bean Properties: [" + properties.join(', ') + "]\n\n";
        
        // Simulate automatic mapping
        output.innerHTML += "📋 Automatic Column-to-Property Mapping:\n";
        const mappings = [];
        
        columns.forEach((col, index) => {
            if (index < properties.length) {
                const prop = properties[index];
                const mapping = `${col} → ${prop}`;
                mappings.push(mapping);
                output.innerHTML += `  ${mapping}\n`;
            }
        });
        
        output.innerHTML += "\n🔧 BeanPropertyRowMapper Process:\n";
        output.innerHTML += "1. Analyzes ResultSet metadata\n";
        output.innerHTML += "2. Matches column names to bean properties\n";
        output.innerHTML += "3. Converts underscore_case to camelCase\n";
        output.innerHTML += "4. Uses reflection to set property values\n";
        output.innerHTML += "5. Handles type conversions automatically\n\n";
        
        // Create mapped object
        const mappedObject = {};
        columns.forEach((col, index) => {
            if (index < properties.length && data[col] !== undefined) {
                mappedObject[properties[index]] = data[col];
            }
        });
        
        output.innerHTML += "✅ Mapped Bean Object:\n";
        output.innerHTML += JSON.stringify(mappedObject, null, 2) + "\n\n";
        
        output.innerHTML += "💡 BeanPropertyRowMapper advantages:\n";
        output.innerHTML += "  • Zero configuration for simple mappings\n";
        output.innerHTML += "  • Automatic underscore to camelCase conversion\n";
        output.innerHTML += "  • Built-in type conversion\n";
        output.innerHTML += "  • Handles common data types automatically\n\n";
        
        output.innerHTML += "⚠️ Requirements:\n";
        output.innerHTML += "  • Bean must have default constructor\n";
        output.innerHTML += "  • Properties must have setter methods\n";
        output.innerHTML += "  • Column names should match property names\n";
        
    } catch (error) {
        output.innerHTML = "❌ Error: Invalid JSON format\n";
        output.innerHTML += "Please enter valid JSON data representing a database row.";
    }
}

// Update connection status indicator
function updateConnectionStatus() {
    const statusIndicator = document.getElementById('connection-status');
    const statusText = document.getElementById('connection-text');
    
    if (isConnected) {
        statusIndicator.className = 'status-indicator status-connected';
        statusText.textContent = 'Connected';
    } else {
        statusIndicator.className = 'status-indicator status-disconnected';
        statusText.textContent = 'Disconnected';
    }
}

// Run complete example demonstrating all components
function runCompleteExample() {
    const output = document.getElementById('complete-output');
    
    output.innerHTML = "🚀 Running Complete Spring JDBC Example...\n";
    output.innerHTML += "=" .repeat(50) + "\n\n";
    
    let step = 1;
    
    // Step 1: DataSource Configuration
    setTimeout(() => {
        output.innerHTML += `${step++}. 📊 DataSource Configuration\n`;
        output.innerHTML += "   DriverManagerDataSource configured\n";
        output.innerHTML += "   URL: jdbc:mysql://localhost:3306/testdb\n";
        output.innerHTML += "   Status: ✅ Connected\n\n";
        
        // Step 2: JdbcTemplate Setup
        setTimeout(() => {
            output.innerHTML += `${step++}. 🔧 JdbcTemplate Initialization\n`;
            output.innerHTML += "   JdbcTemplate created with DataSource\n";
            output.innerHTML += "   Ready for database operations\n\n";
            
            // Step 3: Query Execution
            setTimeout(() => {
                output.innerHTML += `${step++}. 📝 Query Execution Examples\n`;
                output.innerHTML += "   a) Count Query:\n";
                output.innerHTML += `      SQL: SELECT COUNT(*) FROM users\n`;
                output.innerHTML += `      Result: ${mockUsers.length} users\n`;
                output.innerHTML += `      Method: queryForObject(sql, Integer.class)\n\n`;
                
                output.innerHTML += "   b) Select All Query:\n";
                output.innerHTML += `      SQL: SELECT * FROM users\n`;
                output.innerHTML += `      Result: ${mockUsers.length} User objects\n`;
                output.innerHTML += `      Method: query(sql, rowMapper)\n\n`;
                
                // Step 4: Custom RowMapper
                setTimeout(() => {
                    output.innerHTML += `${step++}. 🎯 Custom RowMapper Implementation\n`;
                    output.innerHTML += "   UserRowMapper.mapRow() called for each row\n";
                    output.innerHTML += "   Manual mapping: ResultSet → User object\n";
                    output.innerHTML += "   Sample mapped user:\n";
                    output.innerHTML += `     ${JSON.stringify(mockUsers[0], null, 6)}\n\n`;
                    
                    // Step 5: BeanPropertyRowMapper
                    setTimeout(() => {
                        output.innerHTML += `${step++}. 🤖 BeanPropertyRowMapper Usage\n`;
                        output.innerHTML += "   Automatic column-to-property mapping\n";
                        output.innerHTML += "   Mapping: id→id, name→name, email→email, created_at→createdAt\n";
                        output.innerHTML += "   Zero configuration required\n\n";
                        
                        // Step 6: CRUD Operations
                        setTimeout(() => {
                            output.innerHTML += `${step++}. 🔄 CRUD Operations Summary\n`;
                            output.innerHTML += "   CREATE: INSERT INTO users (name, email) VALUES (?, ?)\n";
                            output.innerHTML += "   READ:   SELECT * FROM users WHERE id = ?\n";
                            output.innerHTML += "   UPDATE: UPDATE users SET name = ? WHERE id = ?\n";
                            output.innerHTML += "   DELETE: DELETE FROM users WHERE id = ?\n\n";
                            
                            // Final summary
                            setTimeout(() => {
                                output.innerHTML += "🎉 Complete Example Finished!\n";
                                output.innerHTML += "=" .repeat(50) + "\n";
                                output.innerHTML += "✅ DataSource: Configured and connected\n";
                                output.innerHTML += "✅ JdbcTemplate: Ready for operations\n";
                                output.innerHTML += "✅ Custom RowMapper: Implemented\n";
                                output.innerHTML += "✅ BeanPropertyRowMapper: Demonstrated\n";
                                output.innerHTML += "✅ CRUD Operations: All functional\n\n";
                                output.innerHTML += "🚀 Your Spring JDBC application is ready to use!\n";
                                output.innerHTML += "🔗 All components are properly integrated and working together.";
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 500);
}

// Initialize the demo when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateConnectionStatus();
    updateQueryInput();
    
    // Add some interactive animations
    const demoSections = document.querySelectorAll('.demo-section');
    demoSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Utility function to format code output
function formatCodeOutput(text) {
    return text.replace(/\n/g, '\n   ').replace(/\t/g, '    ');
}

// Simulate database connection with realistic delays
function simulateAsyncOperation(operation, delay = 500) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(operation());
        }, delay);
    });
}