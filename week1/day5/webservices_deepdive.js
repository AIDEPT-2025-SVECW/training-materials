// Tab functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Demo examples for the interactive section
function showSOAPExample() {
    const output = document.getElementById('demo-output');
    output.innerHTML = `
<strong>SOAP Request Example:</strong>
<span style="color: #3498db;">POST</span> /UserService
<span style="color: #f39c12;">Content-Type:</span> application/soap+xml

<span style="color: #e74c3c;">&lt;?xml version="1.0"?&gt;</span>
<span style="color: #e74c3c;">&lt;soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"&gt;</span>
  <span style="color: #e74c3c;">&lt;soap:Header&gt;</span>
    <span style="color: #e74c3c;">&lt;Authentication&gt;</span>
      <span style="color: #e74c3c;">&lt;Username&gt;</span>admin<span style="color: #e74c3c;">&lt;/Username&gt;</span>
      <span style="color: #e74c3c;">&lt;Password&gt;</span>secret123<span style="color: #e74c3c;">&lt;/Password&gt;</span>
    <span style="color: #e74c3c;">&lt;/Authentication&gt;</span>
  <span style="color: #e74c3c;">&lt;/soap:Header&gt;</span>
  <span style="color: #e74c3c;">&lt;soap:Body&gt;</span>
    <span style="color: #e74c3c;">&lt;GetUserInfo&gt;</span>
      <span style="color: #e74c3c;">&lt;UserId&gt;</span>12345<span style="color: #e74c3c;">&lt;/UserId&gt;</span>
    <span style="color: #e74c3c;">&lt;/GetUserInfo&gt;</span>
  <span style="color: #e74c3c;">&lt;/soap:Body&gt;</span>
<span style="color: #e74c3c;">&lt;/soap:Envelope&gt;</span>

<strong>SOAP Response:</strong>
<span style="color: #e74c3c;">&lt;soap:Envelope&gt;</span>
  <span style="color: #e74c3c;">&lt;soap:Body&gt;</span>
    <span style="color: #e74c3c;">&lt;GetUserInfoResponse&gt;</span>
      <span style="color: #e74c3c;">&lt;User&gt;</span>
        <span style="color: #e74c3c;">&lt;Id&gt;</span>12345<span style="color: #e74c3c;">&lt;/Id&gt;</span>
        <span style="color: #e74c3c;">&lt;Name&gt;</span>John Doe<span style="color: #e74c3c;">&lt;/Name&gt;</span>
        <span style="color: #e74c3c;">&lt;Email&gt;</span>john@example.com<span style="color: #e74c3c;">&lt;/Email&gt;</span>
        <span style="color: #e74c3c;">&lt;Status&gt;</span>Active<span style="color: #e74c3c;">&lt;/Status&gt;</span>
      <span style="color: #e74c3c;">&lt;/User&gt;</span>
    <span style="color: #e74c3c;">&lt;/GetUserInfoResponse&gt;</span>
  <span style="color: #e74c3c;">&lt;/soap:Body&gt;</span>
<span style="color: #e74c3c;">&lt;/soap:Envelope&gt;</span>

<span style="color: #95a5a6;">✓ Pros: Highly structured, built-in security, error handling</span>
<span style="color: #95a5a6;">✗ Cons: Verbose, slower processing, XML overhead</span>
    `;
}

function showRESTExample() {
    const output = document.getElementById('demo-output');
    output.innerHTML = `
<strong>REST Request Example:</strong>
<span style="color: #3498db;">GET</span> /api/users/12345
<span style="color: #f39c12;">Authorization:</span> Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
<span style="color: #f39c12;">Accept:</span> application/json

<strong>REST Response:</strong>
<span style="color: #f39c12;">HTTP/1.1 200 OK</span>
<span style="color: #f39c12;">Content-Type:</span> application/json
<span style="color: #f39c12;">Cache-Control:</span> max-age=3600

{
  <span style="color: #e67e22;">"id"</span>: <span style="color: #3498db;">12345</span>,
  <span style="color: #e67e22;">"name"</span>: <span style="color: #27ae60;">"John Doe"</span>,
  <span style="color: #e67e22;">"email"</span>: <span style="color: #27ae60;">"john@example.com"</span>,
  <span style="color: #e67e22;">"status"</span>: <span style="color: #27ae60;">"active"</span>,
  <span style="color: #e67e22;">"created_at"</span>: <span style="color: #27ae60;">"2024-01-15T10:30:00Z"</span>,
  <span style="color: #e67e22;">"profile"</span>: {
    <span style="color: #e67e22;">"avatar_url"</span>: <span style="color: #27ae60;">"https://example.com/avatar.jpg"</span>,
    <span style="color: #e67e22;">"bio"</span>: <span style="color: #27ae60;">"Software developer and tech enthusiast"</span>
  },
  <span style="color: #e67e22;">"preferences"</span>: {
    <span style="color: #e67e22;">"theme"</span>: <span style="color: #27ae60;">"dark"</span>,
    <span style="color: #e67e22;">"notifications"</span>: <span style="color: #3498db;">true</span>
  }
}

<strong>Other REST Operations:</strong>
<span style="color: #3498db;">POST</span> /api/users       <span style="color: #95a5a6;"># Create user</span>
<span style="color: #f39c12;">PUT</span> /api/users/12345  <span style="color: #95a5a6;"># Update user</span>
<span style="color: #e74c3c;">DELETE</span> /api/users/12345 <span style="color: #95a5a6;"># Delete user</span>

<span style="color: #95a5a6;">✓ Pros: Simple, cacheable, stateless, widely supported</span>
<span style="color: #95a5a6;">✗ Cons: Over-fetching data, multiple requests for related data</span>
    `;
}

function showGraphQLExample() {
    const output = document.getElementById('demo-output');
    output.innerHTML = `
<strong>GraphQL Request Example:</strong>
<span style="color: #3498db;">POST</span> /graphql
<span style="color: #f39c12;">Content-Type:</span> application/json
<span style="color: #f39c12;">Authorization:</span> Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  <span style="color: #e67e22;">"query"</span>: <span style="color: #27ae60;">"
    query GetUser($userId: ID!) {
      user(id: $userId) {
        name
        email
        status
        profile {
          avatar_url
          bio
        }
        posts(limit: 3) {
          title
          createdAt
          likesCount
        }
      }
    }"</span>,
  <span style="color: #e67e22;">"variables"</span>: {
    <span style="color: #e67e22;">"userId"</span>: <span style="color: #27ae60;">"12345"</span>
  }
}

<strong>GraphQL Response:</strong>
{
  <span style="color: #e67e22;">"data"</span>: {
    <span style="color: #e67e22;">"user"</span>: {
      <span style="color: #e67e22;">"name"</span>: <span style="color: #27ae60;">"John Doe"</span>,
      <span style="color: #e67e22;">"email"</span>: <span style="color: #27ae60;">"john@example.com"</span>,
      <span style="color: #e67e22;">"status"</span>: <span style="color: #27ae60;">"active"</span>,
      <span style="color: #e67e22;">"profile"</span>: {
        <span style="color: #e67e22;">"avatar_url"</span>: <span style="color: #27ae60;">"https://example.com/avatar.jpg"</span>,
        <span style="color: #e67e22;">"bio"</span>: <span style="color: #27ae60;">"Software developer and tech enthusiast"</span>
      },
      <span style="color: #e67e22;">"posts"</span>: [
        {
          <span style="color: #e67e22;">"title"</span>: <span style="color: #27ae60;">"Getting Started with GraphQL"</span>,
          <span style="color: #e67e22;">"createdAt"</span>: <span style="color: #27ae60;">"2024-06-20T14:30:00Z"</span>,
          <span style="color: #e67e22;">"likesCount"</span>: <span style="color: #3498db;">42</span>
        },
        {
          <span style="color: #e67e22;">"title"</span>: <span style="color: #27ae60;">"REST vs GraphQL: A Comparison"</span>,
          <span style="color: #e67e22;">"createdAt"</span>: <span style="color: #27ae60;">"2024-06-18T09:15:00Z"</span>,
          <span style="color: #e67e22;">"likesCount"</span>: <span style="color: #3498db;">38</span>
        }
      ]
    }
  }
}

<strong>GraphQL Mutations & Subscriptions:</strong>
<span style="color: #95a5a6;"># Mutation (Create/Update/Delete)</span>
mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    title
    content
  }
}

<span style="color: #95a5a6;"># Subscription (Real-time updates)</span>
subscription OnPostCreated {
  postCreated {
    id
    title
    author { name }
  }
}

<span style="color: #95a5a6;">✓ Pros: Precise data fetching, single endpoint, strong typing</span>
<span style="color: #95a5a6;">✗ Cons: Complex caching, learning curve, potential over-complexity</span>
    `;
}

// Add smooth scrolling animation for better UX
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for tab buttons to ensure they work without onclick
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.textContent.toLowerCase().replace(/\s+/g, '');
            
            // Map button text to actual tab IDs
            const tabMap = {
                'overview': 'overview',
                'analogies': 'analogies', 
                'comparison': 'comparison',
                'examples': 'examples'
            };
            
            const targetTab = tabMap[tabName] || tabName;
            
            // Hide all tab contents
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Remove active class from all tab buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab content
            const targetElement = document.getElementById(targetTab);
            if (targetElement) {
                targetElement.classList.add('active');
            }
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Smooth scroll to top when switching tabs
            smoothScrollToTop();
        });
    });
    
    // Add hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation for demo buttons
    const demoButtons = document.querySelectorAll('.demo-btn');
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a quick pulse animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Add typing effect for the demo output (optional enhancement)
    function typeWriter(element, text, speed = 50) {
        element.innerHTML = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && e.ctrlKey) {
            e.preventDefault();
            const activeTab = document.querySelector('.tab-btn.active');
            const allTabs = Array.from(document.querySelectorAll('.tab-btn'));
            const currentIndex = allTabs.indexOf(activeTab);
            const nextIndex = (currentIndex + 1) % allTabs.length;
            allTabs[nextIndex].click();
        }
    });
    
    // Initialize with a welcome message in the demo output
    const demoOutput = document.getElementById('demo-output');
    if (demoOutput) {
        demoOutput.innerHTML = `
<span style="color: #3498db;">🚀 Welcome to the Interactive Web Services Demo!</span>

Click the buttons above to explore different API request/response examples:

<span style="color: #ff6b6b;">🧼 SOAP</span> - See formal XML-based enterprise communication
<span style="color: #4ecdc4;">🚗 REST</span> - Explore simple HTTP-based web services  
<span style="color: #e056fd;">📊 GraphQL</span> - Discover flexible query-based data fetching

<span style="color: #95a5a6;">💡 Tip: Each example shows real-world usage patterns and highlights the key differences between these technologies.</span>
        `;
    }
});

// Utility function to highlight code syntax (basic implementation)
function highlightCode(code) {
    return code
        .replace(/(".*?")/g, '<span style="color: #27ae60;">$1</span>')
        .replace(/(\d+)/g, '<span style="color: #3498db;">$1</span>')
        .replace(/(GET|POST|PUT|DELETE|HTTP\/1\.1)/g, '<span style="color: #e74c3c;">$1</span>');
}

// Add resize handler for responsive behavior
window.addEventListener('resize', function() {
    // Ensure proper layout on mobile devices
    const container = document.querySelector('.container');
    if (window.innerWidth < 768) {
        container.style.padding = '10px';
    } else {
        container.style.padding = '20px';
    }
});

// Performance optimization: Lazy load content for better initial load
function lazyLoadTabContent(tabName) {
    const tabContent = document.getElementById(tabName);
    if (tabContent && !tabContent.dataset.loaded) {
        // Mark as loaded to avoid reprocessing
        tabContent.dataset.loaded = 'true';
        
        // Add any dynamic content loading here if needed
        console.log(`Loaded content for ${tabName} tab`);
    }
}

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showTab,
        showSOAPExample,
        showRESTExample,
        showGraphQLExample,
        highlightCode
    };
}