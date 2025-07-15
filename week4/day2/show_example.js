// Spring JDBC Demo JavaScript Functions

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navPills = document.querySelectorAll('.nav-pill');
    const contentSections = document.querySelectorAll('.content-section');

    navPills.forEach(pill => {
        pill.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            // Remove active class from all pills and sections
            navPills.forEach(p => p.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked pill and corresponding section
            this.classList.add('active');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Modal functionality
    const modal = document.getElementById('detailModal');
    const closeBtn = document.getElementsByClassName('close')[0];

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
});

// Show detailed examples based on type
function showExample(type) {
    const modal = document.getElementById('detailModal');
    const modalContent = document.getElementById('modalContent');
    
    let content = '';
    
    switch(type) {
        case 'crud':
            content = `
                <h2><span class="icon">🔧</span>CRUD Operations with Spring JDBC</h2>
                
                <div class="info-card">
                    <h3><span class="icon">📝</span>Entity Class</h3>
                    <div class="code-container">
                        <pre>
public class User {
    private Long id;
    private String name;
    private String email;
    private LocalDateTime createdAt;
    
    // Constructors
    public User() {}
    
    public User(String name, String email) {
        this.name = name;
        this.email = email;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
                        </pre>
                    </div>
                </div>

                <div class="info-card">
                    <h3><span class="icon">➕</span>CREATE - Insert Operation</h3>
                    <div class="code-container">
                        <pre>
@Repository
public class UserRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public int createUser(User user) {
        String sql = "INSERT INTO users (name, email, created_at) VALUES (?, ?, ?)";
        
        return jdbcTemplate.update(sql, 
            user.getName(), 
            user.getEmail(), 
            user.getCreatedAt()
        );
    }
    
    // Insert with generated key
    public Long createUserWithKey(User user) {
        String sql = "INSERT INTO users (name, email, created_at) VALUES (?, ?, ?)";
        
        KeyHolder keyHolder = new GeneratedKeyHolder();
        
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getName());
            ps.setString(2, user.getEmail());
            ps.setTimestamp(3, Timestamp.valueOf(user.getCreatedAt()));
            return ps;
        }, keyHolder);
        
        return keyHolder.getKey().longValue();
    }
}
                        </pre>
                    </div>
                </div>

                <div class="info-card">
                    <h3><span class="icon">📖</span>READ - Select Operations</h3>
                    <div class="code-container">
                        <pre>
// Find by ID
public User findById(Long id) {
    String sql = "SELECT id, name, email, created_at FROM users WHERE id = ?";
    
    return jdbcTemplate.queryForObject(sql, new UserRowMapper(), id);
}

// Find all users
public List&lt;User&gt; findAll() {
    String sql = "SELECT id, name, email, created_at FROM users";
    
    return jdbcTemplate.query(sql, new UserRowMapper());
}

// Find by email
public User findByEmail(String email) {
    String sql = "SELECT id, name, email, created_at FROM users WHERE email = ?";
    
    try {
        return jdbcTemplate.queryForObject(sql, new UserRowMapper(), email);
    } catch (EmptyResultDataAccessException e) {
        return null; // User not found
    }
}

// Count users
public int countUsers() {
    String sql = "SELECT COUNT(*) FROM users";
    return jdbcTemplate.queryForObject(sql, Integer.class);
}

// Find users with pagination
public List&lt;User&gt; findUsersWithPagination(int offset, int limit) {
    String sql = "SELECT id, name, email, created_at FROM users LIMIT ? OFFSET ?";
    
    return jdbcTemplate.query(sql, new UserRowMapper(), limit, offset);
}
                        </pre>
                    </div>
                </div>

                <div class="info-card">
                    <h3><span class="icon">✏️</span>UPDATE - Modify Operations</h3>
                    <div class="code-container">
                        <pre>
// Update user
public int updateUser(User user) {
    String sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    
    return jdbcTemplate.update(sql, 
        user.getName(), 
        user.getEmail(), 
        user.getId()
    );
}

// Update user email
public int updateUserEmail(Long id, String newEmail) {
    String sql = "UPDATE users SET email = ? WHERE id = ?";
    
    return jdbcTemplate.update(sql, newEmail, id);
}

// Batch update
public int[] batchUpdateUsers(List&lt;User&gt; users) {
    String sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    
    return jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
        @Override
        public void setValues(PreparedStatement ps, int i) throws SQLException {
            User user = users.get(i);
            ps.setString(1, user.getName());
            ps.setString(2, user.getEmail());
            ps.setLong(3, user.getId());
        }
        
        @Override
        public int getBatchSize() {
            return users.size();
        }
    });
}
                        </pre>
                    </div>
                </div>

                <div class="info-card">
                    <h3><span class="icon">🗑️</span>DELETE - Remove Operations</h3>
                    <div class="code-container">
                        <pre>
// Delete by ID
public int deleteUser(Long id) {
    String sql = "DELETE FROM users WHERE id = ?";
    
    return jdbcTemplate.update(sql, id);
}

// Delete by email
public int deleteUserByEmail(String email) {
    String sql = "DELETE FROM users WHERE email = ?";
    
    return jdbcTemplate.update(sql, email);
}

// Delete all users
public int deleteAllUsers() {
    String sql = "DELETE FROM users";
    
    return jdbcTemplate.update(sql);
}

// Delete users in batch
public int[] batchDeleteUsers(List&lt;Long&gt; userIds) {
    String sql = "DELETE FROM users WHERE id = ?";
    
    return jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
        @Override
        public void setValues(PreparedStatement ps, int i) throws SQLException {
            ps.setLong(1, userIds.get(i));
        }
        
        @Override
        public int getBatchSize() {
            return userIds.size();
        }
    });
}
                        </pre>
                    </div>
                </div>
            `;
            break;
            
        case 'mapping':
            content = `
                <h2><span class="icon">🗺️</span>Row Mapping with Spring JDBC</h2>
                
                <div class="info-card">
                    <h3><span class="icon">🔧</span>Custom RowMapper Implementation</h3>
                    <div class="code-container">
                        <pre>
public class UserRowMapper implements RowMapper&lt;User&gt; {
    
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(rs.getLong("id"));
        user.setName(rs.getString("name"));
        user.setEmail(rs.getString("email"));
        
        // Handle timestamp conversion
        Timestamp timestamp = rs.getTimestamp("created_at");
        if (timestamp != null) {
            user.setCreatedAt(timestamp.toLocalDateTime());
        }
        
        return user;
    }
}

// Using the RowMapper
@Repository
public class UserRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public List&lt;User&gt; getAllUsers() {
        String sql = "SELECT id, name, email, created_at FROM users";
        return jdbcTemplate.query(sql, new UserRowMapper());
    }
    
    public User getUserById(Long id) {
        String sql = "SELECT id, name, email, created_at FROM users WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new UserRowMapper(), id);
    }
}
                        </pre>
                    </div>
                </div>

                <div class="info-card">
                    <h3><span class="icon">⚡</span>Lambda-based RowMapper</h3>
                    <div class="code-container">
                        <pre>
// Using lambda expressions for simpler mapping
public List&lt;User&gt; getAllUsers() {
    String sql = "SELECT id, name, email, created_at FROM users";
    
    return jdbcTemplate.query(sql, (rs, rowNum) -> {
        User user = new User();
        user.setId(rs.getLong("id"));
        user.setName(rs.getString("name"));
        user.setEmail(rs.getString("email"));
        
        Timestamp timestamp = rs.getTimestamp("created_at");
        if (timestamp != null) {
            user.setCreatedAt(timestamp.toLocalDateTime());
        }
        
        return user;
    });
}

// Even more concise with constructor
public List&lt;User&gt; getAllUsersCompact() {
    String sql = "SELECT id, name, email, created_at FROM users";
    
    return jdbcTemplate.query(sql, (rs, rowNum) -> 
        new User(
            rs.getLong("id"),
            rs.getString("name"),
            rs.getString("email"),
            rs.getTimestamp("created_at").toLocalDateTime()
        )
    );
}
                        </pre>
                    </div>
                </div>

                <div class="info-card">
                    <h3><span class="icon">🔄</span>ResultSetExtractor for Complex Mapping</h3>
                    <div class="code-container">
                        <pre>
// For complex result sets or when you need full control
public class UserWithOrdersExtractor implements ResultSetExtractor&lt;List&lt;User&gt;&gt; {
    
    @Override
    public List&lt;User&gt; extractData(ResultSet rs) throws SQLException {
        Map&lt;Long, User&gt; userMap = new HashMap&lt;&gt;();
        
        while (rs.next()) {
            Long userId = rs.getLong("user_id");
            User user = userMap.get(userId);
            
            if (user == null) {
                user = new User();
                user.setId(userId);
                user.setName(rs.getString("user_name"));
                user.setEmail(rs.getString("user_email"));
                user.setCreatedAt(rs.getTimestamp("user_created_at").toLocalDateTime());
                user.setOrders(new ArrayList&lt;&gt;());
                userMap.put(userId, user);
            }
            
            // Add order to user if exists
            Long orderId = rs.getLong("order_id");
            if (orderId != 0) {
                Order order = new Order();
                order.setId(orderId);
                order.setOrderDate(rs.getTimestamp("order_date").toLocalDateTime());
                order.setTotal(rs.getBigDecimal("order_total"));
                user.getOrders().add(order);
            }
        }
        
        return new ArrayList&lt;&gt;(userMap.values());
    }
}

// Usage
public List&lt;User&gt; getUsersWithOrders() {
    String sql = """
        SELECT u.id as user_id, u.name as user_name, u.email as user_email, 
               u.created_at as user_created_at, o.id as order_id, 
               o.order_date, o.total as order_total
        FROM users u
        LEFT JOIN orders o ON u.id = o.user_id
        ORDER BY u.id
    """;
    
    return jdbcTemplate.query(sql, new UserWithOrdersExtractor());
}
                        </pre>
                    </div>
                </div>

                <div class="info-card">
                    <h3><span class="icon">🎯</span>BeanPropertyRowMapper</h3>
                    <div class="code-container">
                        <pre>
// Automatic mapping based on property names
public List&lt;User&gt; getAllUsersAutoMapping() {
    String sql = "SELECT id, name, email, created_at FROM users";
    
    // Spring automatically maps columns to properties
    return jdbcTemplate.query(sql, 
        BeanPropertyRowMapper.newInstance(User.class));
}

// Custom column mapping
public List&lt;User&gt; getAllUsersCustomMapping() {
    String sql = """
        SELECT id, name, email, 
               created_at as createdAt 
        FROM users
    """;
    
    return jdbcTemplate.query(sql, 
        BeanPropertyRowMapper.newInstance(User.class));
}

// For primitive types
public List&lt;String&gt; getAllUserNames() {
    String sql = "SELECT name FROM users";
    return jdbcTemplate.queryForList(sql, String.class);
}

public List&lt;Long&gt; getAllUserIds() {
    String sql = "SELECT id FROM users";
    return jdbcTemplate.queryForList(sql, Long.class);
}
                        </pre>
                    </div>
                </div>
            `;
            break;
            
        case 'named':
            content = `
                <h2><span class="icon">📋</span>Named Parameters in Spring JDBC</h2>
                
                <div class="info-card">
                    <h3><span class="icon">🔧</span>NamedParameterJdbcTemplate Setup</h3>
                    <div class="code-container">
                        <pre>
@Repository
public class UserRepository {
    
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    
    // Alternative: Create from JdbcTemplate
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @PostConstruct
    public void init() {
        this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(jdbcTemplate);
    }
}
                        </pre>
                    </div>
                </div>

                <div class="info-card">
                    <h3><span class="icon">📝</span>Basic Named Parameter Usage</h3>
                    <div class="code-container">
                        <pre>
// Using Map for parameters
public User findUserByEmailAndStatus(String email, String status) {
    String sql = "SELECT id, name, email, status FROM users WHERE email = :email AND status = :status";
    
    Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
    params.put("email", email);
    params.put("status", status);
    
    return namedParameterJdbcTemplate.queryForObject(sql, params, new UserRowMapper());
}

// Insert with named parameters
public int createUser(User user) {
    String sql = """
        INSERT INTO users (name, email, status, created_at) 
        VALUES (:name, :email, :status, :createdAt)
    """;
    
    Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
    params.put("name", user.getName());
    params.put("email", user.getEmail());
    params.put("status", user.getStatus());
    params.put("createdAt", user.getCreatedAt());
    
    return namedParameterJdbcTemplate.update(sql, params);
}
                        </pre>
                    </div>
                </div>

                <div class="info-card">
                    <h3><span class="icon">🎯</span>BeanPropertySqlParameterSource</h3>
                    <div class="code-container">
                        <pre>
// Automatically map object properties to named parameters
public int createUserWithBeanMapping(User user) {
    String sql = """
        INSERT INTO users (name, email, status, created_at) 
        VALUES (:name, :email, :status, :createdAt)
    """;
    
    SqlParameterSource params = new BeanPropertySqlParameterSource(user);
    
    return namedParameterJdbcTemplate.update(sql, params);
}

// Update with bean mapping
public int updateUser(User user) {
    String sql = """
        UPDATE users 
        SET name = :name, email = :email, status = :status 
        WHERE id = :id
    """;
    
    SqlParameterSource params = new BeanPropertySqlParameterSource(user);
    
    return namedParameterJdbcTemplate.update(sql, params);
}

// Complex query with bean mapping
public List&lt;User&gt; findUsersBySearchCriteria(UserSearchCriteria criteria) {
    StringBuilder sql = new StringBuilder("SELECT id, name, email, status FROM users WHERE 1=1");
    
    if (criteria.getName() != null) {
        sql.append(" AND name LIKE :name");
    }
    if (criteria.getEmail() != null) {
        sql.append(" AND email = :email");
    }
    if (criteria.getStatus() != null) {
        sql.append(" AND status = :status");
    }
    if (criteria.getCreatedAfter() != null) {
        sql.append(" AND created_at >= :createdAfter");
    }
    
    SqlParameterSource params = new BeanPropertySqlParameterSource(criteria);
    
    return namedParameterJdbcTemplate.query(sql.toString(), params, new UserRowMapper());
}
                        </pre>
                    </div>
                </div>

                <div class="info-card">
                    <h3><span class="icon">🔄</span>IN Clause with Named Parameters</h3>
                    <div class="code-container">
                        <pre>
// Handle IN clause with collections
public List&lt;User&gt; findUsersByIds(List&lt;Long&gt; userIds) {
    String sql = "SELECT id, name, email FROM users WHERE id IN (:userIds)";
    
    Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
    params.put("userIds", userIds);
    
    return namedParameterJdbcTemplate.query(sql, params, new UserRowMapper());
}

// Multiple IN clauses
public List&lt;User&gt; findUsersByIdsAndStatuses(List&lt;Long&gt; userIds, List&lt;String&gt; statuses) {
    String sql = """
        SELECT id, name, email, status 
        FROM users 
        WHERE id IN (:userIds) AND status IN (:statuses)
    """;
    
    Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
    params.put("userIds", userIds);
    params.put("statuses", statuses);
    
    return namedParameterJdbcTemplate.query(sql, params, new UserRowMapper());
}

// Dynamic IN clause
public List&lt;User&gt; findUsersByDynamicCriteria(List&lt;Long&gt; userIds, String department) {
    StringBuilder sql = new StringBuilder("SELECT id, name, email FROM users WHERE 1=1");
    Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
    
    if (userIds != null && !userIds.isEmpty()) {
        sql.append(" AND id IN (:userIds)");
        params.put("userIds", userIds);
    }
    
    if (department != null) {
        sql.append(" AND department = :department");
        params.put("department", department);
    }
    
    return namedParameterJdbcTemplate.query(sql.toString(), params, new UserRowMapper());
}
                        </pre>
                    </div>
                </div>

                <div class="info-card">
                    <h3><span class="icon">📊</span>Batch Operations with Named Parameters</h3>
                    <div class="code-container">
                        <pre>
// Batch insert with named parameters
public int[] batchInsertUsers(List&lt;User&gt; users) {
    String sql = """
        INSERT INTO users (name, email, status, created_at) 
        VALUES (:name, :email, :status, :createdAt)
    """;
    
    SqlParameterSource[] batchParams = users.stream()
        .map(BeanPropertySqlParameterSource::new)
        .toArray(SqlParameterSource[]::new);
    
    return namedParameterJdbcTemplate.batchUpdate(sql, batchParams);
}

// Batch update with named parameters
public int[] batchUpdateUserStatus(List&lt;UserStatusUpdate&gt; updates) {
    String sql = "UPDATE users SET status = :status WHERE id = :id";
    
    SqlParameterSource[] batchParams = updates.stream()
        .map(BeanPropertySqlParameterSource::new)
        .toArray(SqlParameterSource[]::new);
    
    return namedParameterJdbcTemplate.batchUpdate(sql, batchParams);
}

// Batch with MapSqlParameterSource
public int[] batchUpdateWithMaps(List&lt;Map&lt;String, Object&gt;&gt; paramMaps) {
    String sql = "UPDATE users SET status = :status WHERE id = :id";
    
    SqlParameterSource[] batchParams = paramMaps.stream()
        .map(MapSqlParameterSource::new)
        .toArray(SqlParameterSource[]::new);
    
    return namedParameterJdbcTemplate.batchUpdate(sql, batchParams);
}
                        </pre>
                    </div>
                </div>
            `;
            break;

    
    case 'transactions':
    content = `
        <h2><span class="icon">🔄</span>Transaction Management with Spring JDBC</h2>
        
        <div class="info-card">
            <h3><span class="icon">⚙️</span>Transaction Configuration</h3>
            <div class="code-container">
                <pre>
@Configuration
@EnableTransactionManagement
public class TransactionConfig {
    
    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
    
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}

// Alternative XML configuration
&lt;tx:annotation-driven transaction-manager="transactionManager"/&gt;

&lt;bean id="transactionManager" 
      class="org.springframework.jdbc.datasource.DataSourceTransactionManager"&gt;
    &lt;property name="dataSource" ref="dataSource"/&gt;
&lt;/bean&gt;
                </pre>
            </div>
        </div>

        <div class="info-card">
            <h3><span class="icon">📝</span>Declarative Transactions with @Transactional</h3>
            <div class="code-container">
                <pre>
@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private EmailService emailService;
    
    // Basic transaction
    @Transactional
    public void createUser(User user) {
        userRepository.save(user);
        // If any exception occurs, transaction will be rolled back
    }
    
    // Read-only transaction for better performance
    @Transactional(readOnly = true)
    public List&lt;User&gt; getAllUsers() {
        return userRepository.findAll();
    }
    
    // Transaction with custom timeout
    @Transactional(timeout = 30)
    public void performLongRunningOperation() {
        // Transaction will timeout after 30 seconds
        userRepository.bulkUpdate();
    }
    
    // Transaction with specific rollback rules
    @Transactional(rollbackFor = {SQLException.class, CustomException.class})
    public void createUserWithCustomRollback(User user) {
        userRepository.save(user);
        // Will rollback for SQLException and CustomException
    }
    
    // No rollback for specific exceptions
    @Transactional(noRollbackFor = ValidationException.class)
    public void createUserWithValidation(User user) {
        validateUser(user); // ValidationException won't cause rollback
        userRepository.save(user);
    }
}
                </pre>
            </div>
        </div>

        <div class="info-card">
            <h3><span class="icon">🔄</span>Complex Transaction Scenarios</h3>
            <div class="code-container">
                <pre>
@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private InventoryRepository inventoryRepository;
    
    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    private NotificationService notificationService;
    
    // Multiple database operations in single transaction
    @Transactional
    public Order processOrder(OrderRequest request) {
        // 1. Create order
        Order order = new Order();
        order.setCustomerId(request.getCustomerId());
        order.setItems(request.getItems());
        order.setStatus(OrderStatus.PENDING);
        
        Long orderId = orderRepository.create(order);
        order.setId(orderId);
        
        // 2. Update inventory
        for (OrderItem item : request.getItems()) {
            inventoryRepository.updateStock(item.getProductId(), -item.getQuantity());
        }
        
        // 3. Process payment
        paymentService.processPayment(order.getTotal(), request.getPaymentInfo());
        
        // 4. Update order status
        orderRepository.updateStatus(orderId, OrderStatus.CONFIRMED);
        
        // 5. Send notification (this won't rollback the transaction)
        try {
            notificationService.sendOrderConfirmation(order);
        } catch (Exception e) {
            // Log but don't fail the transaction
            logger.warn("Failed to send notification", e);
        }
        
        return order;
    }
    
    // Transaction with propagation
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void createAuditLog(String action, Long userId) {
        // This will always create a new transaction
        // Even if called from within another transaction
        AuditLog log = new AuditLog();
        log.setAction(action);
        log.setUserId(userId);
        log.setTimestamp(LocalDateTime.now());
        
        auditRepository.save(log);
    }
    
    // Nested transaction example
    @Transactional
    public void processOrderWithAudit(OrderRequest request) {
        try {
            Order order = processOrder(request);
            
            // This will create a separate transaction
            createAuditLog("ORDER_CREATED", request.getCustomerId());
            
        } catch (Exception e) {
            // Main transaction will rollback
            // But audit log transaction is independent
            createAuditLog("ORDER_FAILED", request.getCustomerId());
            throw e;
        }
    }
}
                </pre>
            </div>
        </div>

        <div class="info-card">
            <h3><span class="icon">🔧</span>Programmatic Transaction Management</h3>
            <div class="code-container">
                <pre>
@Service
public class TransferService {
    
    @Autowired
    private PlatformTransactionManager transactionManager;
    
    @Autowired
    private AccountRepository accountRepository;
    
    // Manual transaction control
    public void transferFunds(Long fromAccountId, Long toAccountId, BigDecimal amount) {
        TransactionDefinition def = new DefaultTransactionDefinition();
        TransactionStatus status = transactionManager.getTransaction(def);
        
        try {
            // Check sufficient balance
            Account fromAccount = accountRepository.findById(fromAccountId);
            if (fromAccount.getBalance().compareTo(amount) < 0) {
                throw new InsufficientFundsException("Not enough balance");
            }
            
            // Perform transfer
            accountRepository.debit(fromAccountId, amount);
            accountRepository.credit(toAccountId, amount);
            
            // Record transaction
            TransactionRecord record = new TransactionRecord();
            record.setFromAccountId(fromAccountId);
            record.setToAccountId(toAccountId);
            record.setAmount(amount);
            record.setTimestamp(LocalDateTime.now());
            
            transactionRepository.save(record);
            
            // Commit transaction
            transactionManager.commit(status);
            
        } catch (Exception e) {
            // Rollback on any error
            transactionManager.rollback(status);
            throw e;
        }
    }
    
    // Using TransactionTemplate for cleaner code
    @Autowired
    private TransactionTemplate transactionTemplate;
    
    public void transferFundsWithTemplate(Long fromAccountId, Long toAccountId, BigDecimal amount) {
        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {
                try {
                    // Same business logic as above
                    Account fromAccount = accountRepository.findById(fromAccountId);
                    if (fromAccount.getBalance().compareTo(amount) < 0) {
                        throw new InsufficientFundsException("Not enough balance");
                    }
                    
                    accountRepository.debit(fromAccountId, amount);
                    accountRepository.credit(toAccountId, amount);
                    
                    TransactionRecord record = new TransactionRecord();
                    record.setFromAccountId(fromAccountId);
                    record.setToAccountId(toAccountId);
                    record.setAmount(amount);
                    record.setTimestamp(LocalDateTime.now());
                    
                    transactionRepository.save(record);
                    
                } catch (Exception e) {
                    // Mark transaction for rollback
                    status.setRollbackOnly();
                    throw e;
                }
            }
        });
    }
}
                </pre>
            </div>
        </div>

        <div class="info-card">
            <h3><span class="icon">⚡</span>Transaction Propagation Behaviors</h3>
            <div class="code-container">
                <pre>
@Service
public class TransactionPropagationExamples {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmailService emailService;
    
    // REQUIRED (default) - Use existing transaction or create new one
    @Transactional(propagation = Propagation.REQUIRED)
    public void createUserRequired(User user) {
        userRepository.save(user);
    }
    
    // REQUIRES_NEW - Always create new transaction
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void createUserRequiresNew(User user) {
        userRepository.save(user);
        // This always runs in its own transaction
    }
    
    // SUPPORTS - Use existing transaction if available, otherwise non-transactional
    @Transactional(propagation = Propagation.SUPPORTS)
    public List&lt;User&gt; getUsersSupports() {
        return userRepository.findAll();
    }
    
    // NOT_SUPPORTED - Always run non-transactionally
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public void sendEmailNotSupported(String email, String message) {
        emailService.sendEmail(email, message);
        // This always runs outside any transaction
    }
    
    // MANDATORY - Must run within existing transaction
    @Transactional(propagation = Propagation.MANDATORY)
    public void updateUserMandatory(User user) {
        userRepository.update(user);
        // Throws exception if no transaction exists
    }
    
    // NEVER - Must not run within transaction
    @Transactional(propagation = Propagation.NEVER)
    public void generateReportNever() {
        // Long-running operation that shouldn't be in transaction
        reportGenerator.generate();
    }
    
    // NESTED - Create nested transaction (savepoint)
    @Transactional(propagation = Propagation.NESTED)
    public void createUserNested(User user) {
        userRepository.save(user);
        // Creates savepoint, can rollback to this point
    }
}
                </pre>
            </div>
        </div>

        <div class="info-card">
            <h3><span class="icon">🎯</span>Transaction Isolation Levels</h3>
            <div class="code-container">
                <pre>
@Service
public class TransactionIsolationExamples {
    
    // READ_UNCOMMITTED - Allows dirty reads
    @Transactional(isolation = Isolation.READ_UNCOMMITTED)
    public List&lt;User&gt; getUsersReadUncommitted() {
        return userRepository.findAll();
        // May read uncommitted data from other transactions
    }
    
    // READ_COMMITTED - Prevents dirty reads
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public List&lt;User&gt; getUsersReadCommitted() {
        return userRepository.findAll();
        // Only reads committed data
    }
    
    // REPEATABLE_READ - Prevents dirty and non-repeatable reads
    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public UserStatistics calculateUserStats(Long userId) {
        User user = userRepository.findById(userId);
        int orderCount = orderRepository.countByUserId(userId);
        
        // Same queries will return same results within transaction
        User userAgain = userRepository.findById(userId);
        // userAgain will be identical to user
        
        return new UserStatistics(user, orderCount);
    }
    
    // SERIALIZABLE - Highest isolation level
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void transferFundsSerializable(Long fromId, Long toId, BigDecimal amount) {
        // Completely isolated from other transactions
        Account fromAccount = accountRepository.findById(fromId);
        Account toAccount = accountRepository.findById(toId);
        
        accountRepository.debit(fromId, amount);
        accountRepository.credit(toId, amount);
    }
}
                </pre>
            </div>
        </div>

        <div class="info-card">
            <h3><span class="icon">🔍</span>Transaction Best Practices</h3>
            <div class="code-container">
                <pre>
@Service
public class TransactionBestPractices {
    
    // 1. Keep transactions short and focused
    @Transactional
    public void goodTransactionExample(Order order) {
        // Quick database operations only
        orderRepository.save(order);
        inventoryRepository.updateStock(order.getItems());
        
        // Don't do this in transaction:
        // - External API calls
        // - File I/O operations
        // - Long computations
    }
    
    // 2. Use read-only transactions for queries
    @Transactional(readOnly = true)
    public List&lt;Order&gt; getOrderHistory(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }
    
    // 3. Handle exceptions properly
    @Transactional(rollbackFor = Exception.class)
    public void createOrderWithValidation(OrderRequest request) {
        validateOrderRequest(request); // Custom validation
        
        Order order = new Order();
        order.setCustomerId(request.getCustomerId());
        
        try {
            orderRepository.save(order);
        } catch (DataIntegrityViolationException e) {
            // Transform to business exception
            throw new OrderCreationException("Invalid order data", e);
        }
    }
    
    // 4. Avoid transaction boundaries in loops
    @Transactional
    public void processOrdersBatch(List&lt;OrderRequest&gt; requests) {
        // Process all orders in single transaction
        for (OrderRequest request : requests) {
            processOrder(request); // This method should NOT be @Transactional
        }
    }
    
    // 5. Use appropriate isolation levels
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public BigDecimal calculateTotalRevenue() {
        // Use READ_COMMITTED for reporting to avoid blocking
        return orderRepository.sumTotalRevenue();
    }
    
    // 6. Handle timeout appropriately
    @Transactional(timeout = 60) // 60 seconds timeout
    public void bulkDataImport(List&lt;ImportData&gt; data) {
        // Long-running operation with timeout
        for (ImportData item : data) {
            dataRepository.save(item);
        }
    }
}
                </pre>
            </div>
        </div>

        <div class="info-card">
            <h3><span class="icon">⚠️</span>Common Transaction Pitfalls</h3>
            <div class="code-container">
                <pre>
@Service
public class TransactionPitfalls {
    
    // ❌ WRONG: Calling transactional method from same class
    @Transactional
    public void outerMethod() {
        // This won't create a new transaction!
        innerMethod(); // @Transactional annotation ignored
    }
    
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void innerMethod() {
        // This annotation is ignored when called from same class
    }
    
    // ✅ CORRECT: Use separate service or ApplicationContext
    @Autowired
    private ApplicationContext applicationContext;
    
    @Transactional
    public void outerMethodCorrect() {
        // Get proxy to call transactional method
        TransactionPitfalls self = applicationContext.getBean(TransactionPitfalls.class);
        self.innerMethod(); // Now @Transactional will work
    }
    
    // ❌ WRONG: Long-running operations in transaction
    @Transactional
    public void badLongRunningOperation() {
        orderRepository.save(order);
        
        // These should NOT be in transaction:
        sendEmail(); // External service call
        generateReport(); // Long computation
        processFile(); // File I/O
        
        // Database connections held too long!
    }
    
    // ✅ CORRECT: Separate transactional and non-transactional operations
    public void goodLongRunningOperation() {
        // Transactional part
        Order savedOrder = createOrder();
        
        // Non-transactional operations
        sendEmail();
        generateReport();
        processFile();
    }
    
    @Transactional
    private Order createOrder() {
        return orderRepository.save(order);
    }
    
    // ❌ WRONG: Catching and ignoring exceptions
    @Transactional
    public void badExceptionHandling() {
        try {
            orderRepository.save(order);
        } catch (Exception e) {
            // Swallowing exception - transaction won't rollback!
            logger.error("Error creating order", e);
        }
    }
    
    // ✅ CORRECT: Proper exception handling
    @Transactional
    public void goodExceptionHandling() {
        try {
            orderRepository.save(order);
        } catch (DataIntegrityViolationException e) {
            // Transform and re-throw
            throw new OrderCreationException("Invalid order data", e);
        }
    }
}
                </pre>
            </div>
        </div>
    `;
    break;
            
    }
modalContent.innerHTML = content;
modal.style.display = 'block'; 
}