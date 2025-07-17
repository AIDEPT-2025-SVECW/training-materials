// Exception information data
const exceptionData = {
    throwable: {
        title: "Throwable",
        description: "The root class of all exceptions and errors in Java. Every exception and error is a subclass of Throwable.",
        details: [
            "Throwable is the superclass of all errors and exceptions in Java",
            "It provides common methods like getMessage(), printStackTrace(), and getCause()",
            "Has two main subclasses: Error and Exception",
            "Contains information about the error including stack trace and error message"
        ],
        codeExample: `
// Basic Throwable usage
public class ThrowableExample {
    public static void main(String[] args) {
        try {
            throw new Exception("Custom exception message");
        } catch (Throwable t) {
            System.out.println("Message: " + t.getMessage());
            System.out.println("Class: " + t.getClass().getName());
            t.printStackTrace();
        }
    }
}`,
        characteristics: [
            "Root of exception hierarchy",
            "Provides stack trace information",
            "Contains error message",
            "Can be caught but usually not recommended"
        ]
    },
    
    error: {
        title: "Error",
        description: "Represents serious problems that applications should not try to catch. These are usually system-level failures.",
        details: [
            "Errors are serious problems that applications should not try to catch",
            "They indicate problems with the Java Virtual Machine or system",
            "Most errors are abnormal conditions that should not occur",
            "Examples include OutOfMemoryError, StackOverflowError, VirtualMachineError"
        ],
        codeExample: `
// Error example - OutOfMemoryError
public class ErrorExample {
    public static void main(String[] args) {
        try {
            // This will eventually cause OutOfMemoryError
            List<String> list = new ArrayList<>();
            while (true) {
                list.add("Memory consuming string");
            }
        } catch (OutOfMemoryError e) {
            System.out.println("OutOfMemoryError occurred: " + e.getMessage());
            // Generally, you shouldn't catch errors
        }
    }
}`,
        characteristics: [
            "Serious system-level problems",
            "Should not be caught by applications",
            "Indicates JVM or system issues",
            "Unchecked at compile time"
        ]
    },
    
    exception: {
        title: "Exception",
        description: "Represents conditions that applications might want to catch and handle. These are recoverable problems.",
        details: [
            "Exceptions represent conditions that applications can catch and handle",
            "They indicate problems that can be recovered from",
            "Divided into checked and unchecked exceptions",
            "Common examples include IOException, SQLException, ClassNotFoundException"
        ],
        codeExample: `
// Exception handling example
public class ExceptionExample {
    public static void readFile(String filename) throws IOException {
        FileReader file = new FileReader(filename);
        BufferedReader reader = new BufferedReader(file);
        
        try {
            String line = reader.readLine();
            System.out.println(line);
        } finally {
            reader.close();
        }
    }
    
    public static void main(String[] args) {
        try {
            readFile("nonexistent.txt");
        } catch (IOException e) {
            System.out.println("File error: " + e.getMessage());
        }
    }
}`,
        characteristics: [
            "Recoverable conditions",
            "Can be caught and handled",
            "Two types: checked and unchecked",
            "Part of normal program flow"
        ]
    },
    
    checked: {
        title: "Checked Exception",
        description: "Must be declared in method signature or handled with try-catch. Checked at compile time.",
        details: [
            "Must be declared in method signature using 'throws' clause",
            "Must be handled with try-catch block or propagated",
            "Checked at compile time - won't compile without proper handling",
            "Examples: IOException, SQLException, ClassNotFoundException, InterruptedException"
        ],
        codeExample: `
// Checked exception example
public class CheckedException {
    // Method declares checked exception
    public static void readFile() throws IOException {
        FileInputStream file = new FileInputStream("data.txt");
        // IOException is a checked exception
    }
    
    public static void main(String[] args) {
        // Option 1: Handle with try-catch
        try {
            readFile();
        } catch (IOException e) {
            System.out.println("File not found: " + e.getMessage());
        }
        
        // Option 2: Propagate (method must declare throws IOException)
        // readFile(); // This would cause compile error without try-catch
    }
}`,
        characteristics: [
            "Compile-time checking",
            "Must be handled or declared",
            "Recoverable conditions",
            "Forces explicit error handling"
        ]
    },
    
    unchecked: {
        title: "Unchecked Exception",
        description: "Not required to be declared or caught. Checked at runtime. Includes RuntimeException and Error.",
        details: [
            "Not required to be declared in method signature",
            "Not required to be caught with try-catch",
            "Checked at runtime, not compile time",
            "Includes RuntimeException and Error classes"
        ],
        codeExample: `
// Unchecked exception example
public class UncheckedException {
    public static void divide(int a, int b) {
        // No need to declare ArithmeticException
        int result = a / b;
        System.out.println("Result: " + result);
    }
    
    public static void main(String[] args) {
        // Optional to catch unchecked exceptions
        try {
            divide(10, 0); // Will throw ArithmeticException
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero: " + e.getMessage());
        }
        
        // This will compile but throw exception at runtime
        // divide(10, 0);
    }
}`,
        characteristics: [
            "No compile-time checking",
            "Optional to handle",
            "Runtime checking",
            "Includes RuntimeException and Error"
        ]
    },
    
    runtime: {
        title: "RuntimeException",
        description: "Unchecked exceptions that occur during runtime. Usually indicate programming errors.",
        details: [
            "Subclass of Exception but unchecked",
            "Usually indicates programming errors",
            "Can be avoided with proper programming practices",
            "Examples: NullPointerException, ArrayIndexOutOfBoundsException, IllegalArgumentException"
        ],
        codeExample: `
// RuntimeException examples
public class RuntimeExceptionExample {
    public static void main(String[] args) {
        // NullPointerException example
        String str = null;
        try {
            int length = str.length(); // NPE
        } catch (NullPointerException e) {
            System.out.println("Null pointer: " + e.getMessage());
        }
        
        // ArrayIndexOutOfBoundsException example
        int[] arr = {1, 2, 3};
        try {
            int value = arr[5]; // Index out of bounds
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index error: " + e.getMessage());
        }
        
        // IllegalArgumentException example
        try {
            Thread.sleep(-1000); // Negative sleep time
        } catch (IllegalArgumentException e) {
            System.out.println("Illegal argument: " + e.getMessage());
        } catch (InterruptedException e) {
            System.out.println("Thread interrupted");
        }
    }
}`,
        characteristics: [
            "Unchecked at compile time",
            "Usually programming errors",
            "Can be prevented with better code",
            "Subclass of Exception"
        ]
    }
};

// Quiz questions
const quizQuestions = [
    {
        question: "Which exception type must be declared in method signature or handled with try-catch?",
        options: [
            "RuntimeException",
            "Checked Exception",
            "Error",
            "Unchecked Exception"
        ],
        correct: 1,
        explanation: "Checked exceptions must be declared in method signature using 'throws' clause or handled with try-catch block."
    },
    {
        question: "What is the root class of all exceptions and errors in Java?",
        options: [
            "Exception",
            "Error",
            "RuntimeException",
            "Throwable"
        ],
        correct: 3,
        explanation: "Throwable is the root class of all exceptions and errors in Java."
    },
    {
        question: "Which type of exception usually indicates programming errors?",
        options: [
            "Checked Exception",
            "Error",
            "RuntimeException",
            "IOException"
        ],
        correct: 2,
        explanation: "RuntimeException usually indicates programming errors that can be avoided with proper programming practices."
    },
    {
        question: "Which exceptions should applications generally NOT try to catch?",
        options: [
            "IOException",
            "SQLException",
            "Error",
            "RuntimeException"
        ],
        correct: 2,
        explanation: "Errors represent serious system-level problems that applications should not try to catch."
    },
    {
        question: "What type of exception is NullPointerException?",
        options: [
            "Checked Exception",
            "Error",
            "RuntimeException",
            "Checked RuntimeException"
        ],
        correct: 2,
        explanation: "NullPointerException is a RuntimeException, which is an unchecked exception."
    }
];

let currentQuizIndex = 0;
let quizActive = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    showDefaultInfo();
});

function initializeEventListeners() {
    // Add click listeners to tree nodes
    const treeNodes = document.querySelectorAll('.tree-node');
    treeNodes.forEach(node => {
        node.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            showInfo(type);
            setActiveNode(this);
        });
    });
    
    // Add click listeners to demo cards
    const demoCards = document.querySelectorAll('.demo-card');
    demoCards.forEach(card => {
        card.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            showInfo(type);
            setActiveCard(this);
        });
    });
}

function setActiveNode(activeNode) {
    // Remove active class from all nodes
    const allNodes = document.querySelectorAll('.tree-node');
    allNodes.forEach(node => node.classList.remove('active'));
    
    // Add active class to clicked node
    activeNode.classList.add('active');
}

function setActiveCard(activeCard) {
    // Remove active styling from all cards
    const allCards = document.querySelectorAll('.demo-card');
    allCards.forEach(card => {
        card.style.borderColor = '#dee2e6';
        card.style.transform = 'none';
    });
    
    // Style active card
    activeCard.style.borderColor = '#007bff';
    activeCard.style.transform = 'translateY(-3px)';
}

function showInfo(type) {
    const infoPanel = document.getElementById('infoPanel');
    const data = exceptionData[type];
    
    if (!data) {
        showDefaultInfo();
        return;
    }
    
    let html = `
        <h3>${data.title}</h3>
        <p><strong>Description:</strong> ${data.description}</p>
        
        <h4>Key Points:</h4>
        <ul>
            ${data.details.map(detail => `<li>${detail}</li>`).join('')}
        </ul>
        
        <h4>Characteristics:</h4>
        <ul>
            ${data.characteristics.map(char => `<li>${char}</li>`).join('')}
        </ul>
        
        <h4>Code Example:</h4>
        <div class="code-example">${data.codeExample}</div>
    `;
    
    infoPanel.innerHTML = html;
    
    // Animate panel
    infoPanel.style.opacity = '0';
    infoPanel.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        infoPanel.style.transition = 'all 0.5s ease';
        infoPanel.style.opacity = '1';
        infoPanel.style.transform = 'translateY(0)';
    }, 100);
}

function showDefaultInfo() {
    const infoPanel = document.getElementById('infoPanel');
    infoPanel.innerHTML = `
        <h3>Welcome to Java Exception Hierarchy Demo!</h3>
        <p>This interactive demonstration helps you understand the different types of exceptions in Java.</p>
        
        <h4>How to use:</h4>
        <ul>
            <li>Click on any node in the hierarchy tree to see detailed information</li>
            <li>Click on demonstration cards to explore specific exception types</li>
            <li>Take the quiz to test your knowledge</li>
            <li>Use the comparison table for quick reference</li>
        </ul>
        
        <h4>Key Concepts:</h4>
        <ul>
            <li><strong>Throwable:</strong> Root of all exceptions and errors</li>
            <li><strong>Error:</strong> Serious system problems (don't catch)</li>
            <li><strong>Exception:</strong> Recoverable application problems</li>
            <li><strong>Checked:</strong> Must be handled at compile time</li>
            <li><strong>Unchecked:</strong> Optional to handle, checked at runtime</li>
            <li><strong>RuntimeException:</strong> Programming errors, unchecked</li>
        </ul>
    `;
}

function loadQuiz() {
    if (quizActive) {
        resetQuiz();
        return;
    }
    
    currentQuizIndex = 0;
    quizActive = true;
    showQuizQuestion();
    
    // Update button text
    const btn = document.querySelector('.quiz-section .btn');
    btn.textContent = 'Reset Quiz';
}

function showQuizQuestion() {
    const container = document.getElementById('quizContainer');
    const question = quizQuestions[currentQuizIndex];
    
    if (!question) {
        showQuizResults();
        return;
    }
    
    let html = `
        <div class="quiz-question">
            <h4>Question ${currentQuizIndex + 1} of ${quizQuestions.length}</h4>
            <p>${question.question}</p>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option" onclick="selectAnswer(${index})">
                        ${option}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function selectAnswer(selectedIndex) {
    const question = quizQuestions[currentQuizIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    // Disable all options
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
    });
    
    // Show explanation
    const container = document.getElementById('quizContainer');
    const explanationDiv = document.createElement('div');
    explanationDiv.innerHTML = `
        <div style="margin-top: 15px; padding: 15px; background: #e3f2fd; border-radius: 8px; border-left: 4px solid #2196f3;">
            <strong>Explanation:</strong> ${question.explanation}
        </div>
        <button class="btn" onclick="nextQuestion()" style="margin-top: 15px;">
            ${currentQuizIndex === quizQuestions.length - 1 ? 'Show Results' : 'Next Question'}
        </button>
    `;
    
    container.appendChild(explanationDiv);
}

function nextQuestion() {
    currentQuizIndex++;
    showQuizQuestion();
}

function showQuizResults() {
    const container = document.getElementById('quizContainer');
    container.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3>Quiz Completed!</h3>
            <p>You've completed all ${quizQuestions.length} questions.</p>
            <p>Great job learning about Java exceptions!</p>
            <button class="btn" onclick="resetQuiz()">Take Quiz Again</button>
        </div>
    `;
}

function resetQuiz() {
    currentQuizIndex = 0;
    quizActive = false;
    
    const container = document.getElementById('quizContainer');
    container.innerHTML = '';
    
    // Update button text
    const btn = document.querySelector('.quiz-section .btn');
    btn.textContent = 'Start Quiz';
}

// Add some interactive animations
function addInteractiveEffects() {
    // Add hover effects to comparison table rows
    const tableRows = document.querySelectorAll('.comparison-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add click effects to demo cards
    const demoCards = document.querySelectorAll('.demo-card');
    demoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.style.borderColor || this.style.borderColor === 'rgb(222, 226, 230)') {
                this.style.boxShadow = '';
            }
        });
    });
}

// Initialize interactive effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addInteractiveEffects();
    
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Clear all selections
        document.querySelectorAll('.tree-node').forEach(node => {
            node.classList.remove('active');
        });
        document.querySelectorAll('.demo-card').forEach(card => {
            card.style.borderColor = '#dee2e6';
            card.style.transform = 'none';
        });
        showDefaultInfo();
    }
});

// Add some utility functions for better user experience
function highlightRelatedConcepts(type) {
    const relatedTypes = {
        'throwable': ['error', 'exception'],
        'error': ['throwable', 'unchecked'],
        'exception': ['throwable', 'checked', 'unchecked'],
        'checked': ['exception'],
        'unchecked': ['exception', 'runtime'],
        'runtime': ['unchecked', 'exception']
    };
    
    const related = relatedTypes[type] || [];
    
    // Add subtle highlighting to related concepts
    document.querySelectorAll('.tree-node, .demo-card').forEach(element => {
        const elementType = element.getAttribute('data-type');
        if (related.includes(elementType)) {
            element.style.boxShadow = '0 0 15px rgba(0, 123, 255, 0.3)';
        } else {
            element.style.boxShadow = '';
        }
    });
}

// Enhanced info display with related concepts
function showInfoEnhanced(type) {
    showInfo(type);
    highlightRelatedConcepts(type);
    
    // Auto-scroll to info panel on mobile
    if (window.innerWidth <= 768) {
        document.getElementById('infoPanel').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Replace the original showInfo calls with enhanced version
document.addEventListener('DOMContentLoaded', function() {
    // Update event listeners to use enhanced info display
    const treeNodes = document.querySelectorAll('.tree-node');
    treeNodes.forEach(node => {
        node.removeEventListener('click', function() {}); // Remove old listener
        node.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            showInfoEnhanced(type);
            setActiveNode(this);
        });
    });
    
    const demoCards = document.querySelectorAll('.demo-card');
    demoCards.forEach(card => {
        card.removeEventListener('click', function() {}); // Remove old listener
        card.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            showInfoEnhanced(type);
            setActiveCard(this);
        });
    });
});

// Add search functionality
function createSearchFeature() {
    const searchHTML = `
        <div style="margin-bottom: 20px;">
            <input type="text" id="searchInput" placeholder="Search exceptions..." 
                   style="width: 100%; padding: 12px; border: 2px solid #dee2e6; border-radius: 8px; font-size: 16px;">
        </div>
    `;
    
    const container = document.querySelector('.container');
    const searchDiv = document.createElement('div');
    searchDiv.innerHTML = searchHTML;
    container.insertBefore(searchDiv, container.children[1]);
    
    // Add search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterContent(searchTerm);
    });
}

function filterContent(searchTerm) {
    const cards = document.querySelectorAll('.demo-card');
    const nodes = document.querySelectorAll('.tree-node');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm) || searchTerm === '') {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0.5';
        }
    });
    
    nodes.forEach(node => {
        const text = node.textContent.toLowerCase();
        if (text.includes(searchTerm) || searchTerm === '') {
            node.style.opacity = '1';
        } else {
            node.style.opacity = '0.3';
        }
    });
}

// Initialize search feature
document.addEventListener('DOMContentLoaded', function() {
    createSearchFeature();
});

// Add progress tracking for quiz
let quizScore = 0;
let answeredQuestions = [];

function selectAnswerWithScore(selectedIndex) {
    const question = quizQuestions[currentQuizIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    // Track answer
    const isCorrect = selectedIndex === question.correct;
    answeredQuestions.push({
        question: currentQuizIndex,
        correct: isCorrect,
        selected: selectedIndex,
        correctAnswer: question.correct
    });
    
    if (isCorrect) {
        quizScore++;
    }
    
    // Continue with original logic
    selectAnswer(selectedIndex);
}

function showQuizResultsWithScore() {
    const container = document.getElementById('quizContainer');
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    
    let performanceMessage = '';
    if (percentage >= 80) {
        performanceMessage = 'Excellent! You have a great understanding of Java exceptions.';
    } else if (percentage >= 60) {
        performanceMessage = 'Good job! You have a solid foundation, but there\'s room for improvement.';
    } else {
        performanceMessage = 'Keep studying! Review the concepts and try again.';
    }
    
    container.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3>Quiz Results</h3>
            <div style="font-size: 2em; color: #007bff; margin: 20px 0;">
                ${quizScore}/${quizQuestions.length} (${percentage}%)
            </div>
            <p>${performanceMessage}</p>
            <button class="btn" onclick="resetQuizWithScore()">Take Quiz Again</button>
            <button class="btn" onclick="showDetailedResults()" style="margin-left: 10px;">View Detailed Results</button>
        </div>
    `;
}

function resetQuizWithScore() {
    quizScore = 0;
    answeredQuestions = [];
    resetQuiz();
}

function showDetailedResults() {
    const container = document.getElementById('quizContainer');
    let detailsHTML = '<h3>Detailed Results</h3>';
    
    answeredQuestions.forEach((answer, index) => {
        const question = quizQuestions[answer.question];
        const isCorrect = answer.correct;
        
        detailsHTML += `
            <div style="margin-bottom: 20px; padding: 15px; border-radius: 8px; ${isCorrect ? 'background: #d4edda; border-left: 4px solid #28a745;' : 'background: #f8d7da; border-left: 4px solid #dc3545;'}">
                <h4>Question ${index + 1}: ${isCorrect ? '✓' : '✗'}</h4>
                <p><strong>Question:</strong> ${question.question}</p>
                <p><strong>Your Answer:</strong> ${question.options[answer.selected]}</p>
                ${!isCorrect ? `<p><strong>Correct Answer:</strong> ${question.options[answer.correctAnswer]}</p>` : ''}
                <p><strong>Explanation:</strong> ${question.explanation}</p>
            </div>
        `;
    });
    
    detailsHTML += `
        <div style="text-align: center; margin-top: 20px;">
            <button class="btn" onclick="resetQuizWithScore()">Take Quiz Again</button>
        </div>
    `;
    
    container.innerHTML = detailsHTML;
}