// Spring JDBC Interactive Demo JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeNavigation();
    initializeModal();
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Navigation functionality
function initializeNavigation() {
    const navPills = document.querySelectorAll('.nav-pill');
    const contentSections = document.querySelectorAll('.content-section');
    
    navPills.forEach(pill => {
        pill.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all pills and sections
            navPills.forEach(p => p.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked pill and corresponding section
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            
            // Add animation effect
            const targetElement = document.getElementById(targetSection);
            targetElement.style.animation = 'none';
            setTimeout(() => {
                targetElement.style.animation = 'slideIn 0.6s ease-out';
            }, 10);
        });
    });
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('detailModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('detailModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showModal(content) {
    const modal = document.getElementById('detailModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Show details for feature cards in introduction section
function showDetails(feature) {
    const details = {
        simplicity: `
            <h2><span class="icon">✨</span>Simplicity in Action</h2>
            <div class="info-card">
                <h3>Code Reduction Example</h3>
                <p>See how Spring JDBC transforms verbose JDBC code into clean, readable operations:</p>
                <div class="code-container">
                    <pre>
// Traditional JDBC (20+ lines)
Connection conn = null;
PreparedStatement ps = null;
ResultSet rs = null;
try {
    conn = dataSource.getConnection();
    ps = conn.prepareStatement("SELECT * FROM users WHERE id = ?");
    ps.setInt(1, userId);
    rs = ps.executeQuery();
    if (rs.next()) {
        return new User(rs.getInt("id"), rs.getString("name"));
    }
} catch (SQLException e) {
    throw new RuntimeException(e);
} finally {
    if (rs != null) try { rs.close(); } catch (SQLException e) {}
    if (ps != null) try { ps.close(); } catch (SQLException e) {}
    if (conn != null) try { conn.close(); } catch (SQLException e) {}
}

// Spring JDBC (3 lines)
return jdbcTemplate.queryForObject(
    "SELECT * FROM users WHERE id = ?",
    new Object[]{userId},
    new UserRowMapper()
);
                    </pre>
                </div>
            </div>
        `,
        reliability: `
            <h2><span class="icon">🛡️</span>Reliability Features</h2>
            <div class="info-card">
                <h3>Automatic Resource Management</h3>
                <p>Spring JDBC ensures proper resource cleanup and prevents common issues:</p>
                <ul>
                    <li><strong>Connection Leaks:</strong> Automatic connection closing</li>
                    <li><strong>Memory Leaks:</strong> Proper ResultSet and Statement cleanup</li>
                    <li><strong>Exception Handling:</strong> Consistent error handling across operations</li>
                </ul>
                <div class="code-container">
                    <pre>
// Spring JDBC handles all resource management automatically
@Repository
public class UserRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public List&lt;User&gt; findAll() {
        return jdbcTemplate.query(
            "SELECT id, name, email FROM users",
            (rs, rowNum) -> new User(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("email")
            )
        );
    }
    // No need for try-catch or resource cleanup!
}
                    </pre>
                </div>
            </div>
        `,
        flexibility: `
            <h2><span class="icon">🔄</span>Flexibility and Integration</h2>
            <div class="info-card">
                <h3>Database Agnostic</h3>
                <p>Spring JDBC works with any JDBC-compliant database:</p>
                <ul>
                    <li>MySQL, PostgreSQL, Oracle, SQL Server</li>
                    <li>H2, HSQLDB for testing</li>
                    <li>NoSQL databases with JDBC drivers</li>
                </ul>
                <div class="code-container">
                    <pre>
// Configuration for different databases
@Configuration
public class DatabaseConfig {
    
    @Bean
    @Profile("mysql")
    public DataSource mysqlDataSource() {
        return DataSourceBuilder.create()
            .driverClassName("com.mysql.cj.jdbc.Driver")
            .url("jdbc:mysql://localhost:3306/mydb")
            .username("user")
            .password("password")
            .build();
    }
    
    @Bean
    @Profile("postgres")
    public DataSource postgresDataSource() {
        return DataSourceBuilder.create()
            .driverClassName("org.postgresql.Driver")
            .url("jdbc:postgresql://localhost:5432/mydb")
            .username("user")
            .password("password")
            .build();
    }
}
                    </pre>
                </div>
            </div>
        `,
        performance: `
            <h2><span class="icon">⚡</span>Performance Optimizations</h2>
            <div class="info-card">
                <h3>Built-in Performance Features</h3>
                <ul>
                    <li><strong>Connection Pooling:</strong> Efficient connection reuse</li>
                    <li><strong>Statement Caching:</strong> Prepared statement optimization</li>
                    <li><strong>Batch Processing:</strong> Bulk operations support</li>
                    <li><strong>Lazy Loading:</strong> Efficient result processing</li>
                </ul>
                <div class="code-container">
                    <pre>
// Batch operations for performance
@Service
public class UserService {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public void createUsers(List&lt;User&gt; users) {
        jdbcTemplate.batchUpdate(
            "INSERT INTO users (name, email) VALUES (?, ?)",
            users,
            100, // Batch size
            (ps, user) -> {
                ps.setString(1, user.getName());
                ps.setString(2, user.getEmail());
            }
        );
    }
}
                    </pre>
                </div>
            </div>
        `
    };
    
    if (details[feature]) {
        showModal(details[feature]);
    }
}

// Show feature details for core features section
function showFeatureDetails(feature) {
    const details = {
        jdbctemplate: `
            <h2><span class="icon">🔧</span>JdbcTemplate Deep Dive</h2>
            <div class="info-card">
                <h3>Core JdbcTemplate Methods</h3>
                <div class="code-container">
                    <pre>
// Query methods
T queryForObject(String sql, Class&lt;T&gt; requiredType, Object... args)
List&lt;T&gt; query(String sql, RowMapper&lt;T&gt; rowMapper, Object... args)
Map&lt;String, Object&gt; queryForMap(String sql, Object... args)
List&lt;Map&lt;String, Object&gt;&gt; queryForList(String sql, Object... args)

// Update methods
int update(String sql, Object... args)
int[] batchUpdate(String sql, List&lt;Object[]&gt; batchArgs)

// Execute methods
T execute(String sql, PreparedStatementCallback&lt;T&gt; action)
T execute(ConnectionCallback&lt;T&gt; action)
                    </pre>
                </div>
            </div>
        `,
        namedtemplate: `
            <h2><span class="icon">📝</span>NamedParameterJdbcTemplate</h2>
            <div class="info-card">
                <h3>Named Parameters for Better Readability</h3>
                <div class="code-container">
                    <pre>
@Repository
public class UserRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedTemplate;
    
    public User findByEmailAndStatus(String email, String status) {
        String sql = "SELECT * FROM users WHERE email = :email AND status = :status";
        
        Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
        params.put("email", email);
        params.put("status", status);
        
        return namedTemplate.queryForObject(sql, params, new UserRowMapper());
    }
    
    // Using SqlParameterSource for complex objects
    public void createUser(User user) {
        String sql = "INSERT INTO users (name, email, status) VALUES (:name, :email, :status)";
        
        SqlParameterSource params = new BeanPropertySqlParameterSource(user);
        namedTemplate.update(sql, params);
    }
}
                    </pre>
                </div>
            </div>
        `,
        callbacks: `
            <h2><span class="icon">🔄</span>Callback Interfaces</h2>
            <div class="info-card">
                <h3>Flexible Processing with Callbacks</h3>
                <div class="code-container">
                    <pre>
// RowMapper for custom object mapping
public class UserRowMapper implements RowMapper&lt;User&gt; {
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setName(rs.getString("name"));
        user.setEmail(rs.getString("email"));
        user.setCreatedAt(rs.getTimestamp("created_at"));
        return user;
    }
}

// ResultSetExtractor for complex processing
public class UserStatisticsExtractor implements ResultSetExtractor&lt;UserStatistics&gt; {
    @Override
    public UserStatistics extractData(ResultSet rs) throws SQLException {
        UserStatistics stats = new UserStatistics();
        while (rs.next()) {
            stats.addUser(rs.getString("department"), rs.getInt("count"));
        }
        return stats;
    }
}
                    </pre>
                </div>
            </div>
        `,
        exceptions: `
            <h2><span class="icon">⚠️</span>Exception Translation</h2>
            <div class="info-card">
                <h3>Spring's DataAccessException Hierarchy</h3>
                <div class="code-container">
                    <pre>
// Spring automatically translates SQL exceptions
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    public void createUser(User user) {
        try {
            userRepository.save(user);
        } catch (DuplicateKeyException e) {
            // Handle duplicate key constraint
            throw new UserAlreadyExistsException("User with email already exists");
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity issues
            throw new InvalidUserDataException("Invalid user data");
        } catch (DataAccessException e) {
            // Handle other database issues
            throw new DatabaseException("Database operation failed");
        }
    }
}
                    </pre>
                </div>
            </div>
        `,
        datasource: `
            <h2><span class="icon">💾</span>DataSource Integration</h2>
            <div class="info-card">
                <h3>Connection Pooling Configuration</h3>
                <div class="code-container">
                    <pre>
@Configuration
public class DataSourceConfig {
    
    @Bean
    @ConfigurationProperties("spring.datasource.hikari")
    public HikariDataSource dataSource() {
        return DataSourceBuilder.create()
            .type(HikariDataSource.class)
            .build();
    }
    
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        JdbcTemplate template = new JdbcTemplate(dataSource);
        template.setQueryTimeout(30);
        template.setFetchSize(100);
        return template;
    }
}

# application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: user
    password: password
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
                    </pre>
                </div>
            </div>
        `,
        transactions: `
            <h2><span class="icon">🔄</span>Transaction Management</h2>
            <div class="info-card">
                <h3>Declarative Transaction Support</h3>
                <div class="code-container">
                    <pre>
@Configuration
@EnableTransactionManagement
public class TransactionConfig {
    
    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AccountRepository accountRepository;
    
    @Transactional
    public void createUserWithAccount(User user, Account account) {
        // Both operations will be in same transaction
        userRepository.save(user);
        accountRepository.save(account);
        // If any operation fails, both will be rolled back
    }
    
    @Transactional(readOnly = true)
    public List&lt;User&gt; getAllUsers() {
        return userRepository.findAll();
    }
}
                    </pre>
                </div>
            </div>
        `
    };
    
    if (details[feature]) {
        showModal(details[feature]);
    }
}

// Show JdbcTemplate examples
function showJdbcTemplateExample(type) {
    const examples = {
        setup: `
            <h2><span class="icon">🔧</span>Setup and Configuration</h2>
            <div class="info-card">
                <h3>Spring Boot Configuration</h3>
                <div class="code-container">
                    <pre>
// 1. Add dependencies (pom.xml)
&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-jdbc&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;mysql&lt;/groupId&gt;
    &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
&lt;/dependency&gt;

// 2. Configuration class
@Configuration
@EnableTransactionManagement
public class DatabaseConfig {
    
    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }
    
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
    
    @Bean
    public NamedParameterJdbcTemplate namedParameterJdbcTemplate(DataSource dataSource) {
        return new NamedParameterJdbcTemplate(dataSource);
    }
}
                    </pre>
                </div>
            </div>
        `,
        query: `
            <h2><span class="icon">🔍</span>Query Operations</h2>
            <div class="info-card">
                <h3>Different Types of Query Operations</h3>
                <div class="code-container">
                    <pre>
@Repository
public class UserRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    // Single object query
    public User findById(int id) {
        return jdbcTemplate.queryForObject(
            "SELECT id, name, email FROM users WHERE id = ?",
            new Object[]{id},
            new UserRowMapper()
        );
    }
    
    // List query
    public List&lt;User&gt; findByStatus(String status) {
        return jdbcTemplate.query(
            "SELECT id, name, email FROM users WHERE status = ?",
            new Object[]{status},
            new UserRowMapper()
        );
    }
    
    // Simple value query
    public int countUsers() {
        return jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM users",
            Integer.class
        );
    }
    
    // Map query for dynamic results
    public Map&lt;String, Object&gt; getUserStats(int userId) {
        return jdbcTemplate.queryForMap(
            "SELECT COUNT(*) as total_orders, SUM(amount) as total_amount FROM orders WHERE user_id = ?",
            userId
        );
    }
}
                    </pre>
                </div>
            </div>
        `,
        update: `
            <h2><span class="icon">✏️</span>Update Operations</h2>
            <div class="info-card">
                <h3>INSERT, UPDATE, DELETE Operations</h3>
                <div class="code-container">
                    <pre>
@Repository
public class UserRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    // INSERT operation
    public void createUser(User user) {
        jdbcTemplate.update(
            "INSERT INTO users (name, email, status) VALUES (?, ?, ?)",
            user.getName(),
            user.getEmail(),
            user.getStatus()
        );
    }
    
    // INSERT with generated key
    public int createUserWithGeneratedKey(User user) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                "INSERT INTO users (name, email, status) VALUES (?, ?, ?)",
                Statement.RETURN_GENERATED_KEYS
            );
            ps.setString(1, user.getName());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getStatus());
            return ps;
        }, keyHolder);
        
        return keyHolder.getKey().intValue();
    }
    
    // UPDATE operation
    public void updateUser(User user) {
        int rowsAffected = jdbcTemplate.update(
            "UPDATE users SET name = ?, email = ? WHERE id = ?",
            user.getName(),
            user.getEmail(),
            user.getId()
        );
        
        if (rowsAffected == 0) {
            throw new UserNotFoundException("User not found with id: " + user.getId());
        }
    }
    
    // DELETE operation
    public void deleteUser(int id) {
        int rowsAffected = jdbcTemplate.update(
            "DELETE FROM users WHERE id = ?",
            id
        );
        
        if (rowsAffected == 0) {
            throw new UserNotFoundException("User not found with id: " + id);
        }
    }
}
                    </pre>
                </div>
            </div>
        `,
        batch: `
            <h2><span class="icon">📦</span>Batch Operations</h2>
            <div class="info-card">
                <h3>Efficient Bulk Operations</h3>
                <div class="code-container">
                    <pre>
@Repository
public class UserRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    // Batch INSERT
    public void createUsers(List&lt;User&gt; users) {
        List&lt;Object[]&gt; batchArgs = users.stream()
            .map(user -> new Object[]{
                user.getName(),
                user.getEmail(),
                user.getStatus()
            })
            .collect(Collectors.toList());
        
        jdbcTemplate.batchUpdate(
            "INSERT INTO users (name, email, status) VALUES (?, ?, ?)",
            batchArgs
        );
    }
    
    // Batch UPDATE with callback
    public void updateUsersBatch(List&lt;User&gt; users) {
        jdbcTemplate.batchUpdate(
            "UPDATE users SET name = ?, email = ? WHERE id = ?",
            users,
            100, // Batch size
            (ps, user) -> {
                ps.setString(1, user.getName());
                ps.setString(2, user.getEmail());
                ps.setInt(3, user.getId());
            }
        );
    }
    
    // Batch operations with transaction
    @Transactional
    public void bulkUserOperations(List&lt;User&gt; newUsers, List&lt;User&gt; updateUsers) {
        // All operations in single transaction
        createUsers(newUsers);
        updateUsersBatch(updateUsers);
        
        // If any operation fails, all will be rolled back
    }
}
                    </pre>
                </div>
            </div>
        `
    };
    
    if (examples[type]) {
        showModal(examples[type]);
    }
}

