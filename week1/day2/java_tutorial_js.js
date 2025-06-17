/**
 * Java Object Equality & Methods Tutorial - JavaScript
 * Interactive functionality for the Java tutorial web application
 */

// Global variables for quiz functionality
let quizScore = 0;
let questionsAnswered = 0;

/**
 * Navigation Functions
 */

/**
 * Shows the specified section and updates navigation
 * @param {string} sectionId - The ID of the section to show
 */
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Remove active class from all nav buttons
    const navButtons = document.querySelectorAll('.nav button');
    navButtons.forEach(button => button.classList.remove('active'));
    
    // Show selected section and mark nav button as active
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
}

/**
 * Utility Functions
 */

/**
 * Clears the output of a specified element
 * @param {string} outputId - The ID of the output element to clear
 */
function clearOutput(outputId) {
    const outputElement = document.getElementById(outputId);
    if (outputElement) {
        outputElement.textContent = '';
    }
}

/**
 * Demo Functions
 */

/**
 * Demonstrates different types of object equality in Java
 * @param {string} type - The type of equality to demonstrate ('reference', 'logical', 'string')
 */
function demonstrateEquality(type) {
    const output = document.getElementById('equalityOutput');
    if (!output) return;
    
    let result = '';

    switch(type) {
        case 'reference':
            result = `Reference Equality Demo:
                    
Student s1 = new Student("Alice", 123);
Student s2 = new Student("Alice", 123);
Student s3 = s1;

s1 == s2  →  false  (different objects in memory)
s1 == s3  →  true   (same object reference)

Memory addresses:
s1: 0x1A2B3C4D
s2: 0x5E6F7A8B  ← Different!
s3: 0x1A2B3C4D  ← Same as s1`;
            break;
            
        case 'logical':
            result = `Logical Equality Demo:

Student s1 = new Student("Alice", 123);
Student s2 = new Student("Alice", 123);
Student s3 = new Student("Bob", 456);

// With proper equals() override:
s1.equals(s2)  →  true   (same name and id)
s1.equals(s3)  →  false  (different name and id)
s1.equals(null) →  false  (null check)

// Without override (default Object.equals):
s1.equals(s2)  →  false  (only compares references)`;
            break;
            
        case 'string':
            result = `String Equality Demo:

String str1 = "Hello";
String str2 = "Hello";
String str3 = new String("Hello");

str1 == str2      →  true   (string pool)
str1 == str3      →  false  (different objects)
str1.equals(str3) →  true   (same content)

Lesson: Always use equals() for string comparison!`;
            break;
            
        default:
            result = 'Invalid demonstration type selected.';
    }
    
    output.textContent = result;
}

/**
 * Demonstrates different toString() implementations
 * @param {string} type - The type of toString to demonstrate ('default', 'custom', 'formatted')
 */
function demonstrateToString(type) {
    const output = document.getElementById('toStringOutput');
    if (!output) return;
    
    let result = '';

    switch(type) {
        case 'default':
            result = `Default toString() Demo:

Student student = new Student("Alice", 123, 3.8);

// Without override:
System.out.println(student);
Output: Student@1a2b3c4d

// Problem: Not human-readable!
// The @1a2b3c4d is the hash code in hexadecimal.`;
            break;
            
        case 'custom':
            result = `Custom toString() Demo:

@Override
public String toString() {
    return "Student{name='" + name + "', id=" + id + ", gpa=" + gpa + "}";
}

// With override:
System.out.println(student);
Output: Student{name='Alice', id=123, gpa=3.8}

// Much better for debugging and logging!`;
            break;
            
        case 'formatted':
            result = `Formatted toString() Variations:

// Compact format:
public String toShortString() {
    return name + " (" + id + ")";
}
Output: Alice (123)

// Detailed format:
public String toDetailedString() {
    return "Student Details:\\n" +
           "  Name: " + name + "\\n" +
           "  ID: " + id + "\\n" +
           "  GPA: " + gpa;
}
Output: Student Details:
        Name: Alice
        ID: 123
        GPA: 3.8`;
            break;
            
        default:
            result = 'Invalid demonstration type selected.';
    }
    
    output.textContent = result;
}

/**
 * Demonstrates different types of object cloning
 * @param {string} type - The type of cloning to demonstrate ('shallow', 'deep', 'constructor')
 */
function demonstrateCloning(type) {
    const output = document.getElementById('cloneOutput');
    if (!output) return;
    
    let result = '';

    switch(type) {
        case 'shallow':
            result = `Shallow Copy Demo:

Student original = new Student("Alice", 123);
original.addCourse("Math");
original.addCourse("Science");

Student shallowCopy = (Student) original.clone();

// Modify original's courses
original.addCourse("History");

System.out.println("Original courses: " + original.getCourses());
System.out.println("Shallow copy courses: " + shallowCopy.getCourses());

Output:
Original courses: [Math, Science, History]
Shallow copy courses: [Math, Science, History]  ← Same!

Problem: Both share the same courses list!`;
            break;
            
        case 'deep':
            result = `Deep Copy Demo:

Student original = new Student("Alice", 123);
original.addCourse("Math");
original.addCourse("Science");

Student deepCopy = original.deepClone();

// Modify original's courses
original.addCourse("History");

System.out.println("Original courses: " + original.getCourses());
System.out.println("Deep copy courses: " + deepCopy.getCourses());

Output:
Original courses: [Math, Science, History]
Deep copy courses: [Math, Science]  ← Independent copy!

Solution: Deep copy creates new collections.`;
            break;
            
        case 'constructor':
            result = `Copy Constructor Demo:

Student original = new Student("Alice", 123);
original.addCourse("Math");
original.addCourse("Science");

// Using copy constructor
Student copy = new Student(original);

// Modify original
original.addCourse("History");

System.out.println("Original courses: " + original.getCourses());
System.out.println("Copy courses: " + copy.getCourses());

Output:
Original courses: [Math, Science, History]
Copy courses: [Math, Science]  ← Safe copy via constructor

Preferred approach: Clear, safe, and flexible!`;
            break;
            
        default:
            result = 'Invalid demonstration type selected.';
    }
    
    output.textContent = result;
}

/**
 * Demonstrates hashCode() implementations and their effects
 * @param {string} type - The type of hashCode to demonstrate ('good', 'bad', 'collision')
 */
function demonstrateHashCode(type) {
    const output = document.getElementById('hashOutput');
    if (!output) return;
    
    let result = '';

    switch(type) {
        case 'good':
            result = `Good hashCode() Example:

@Override
public int hashCode() {
    return Objects.hash(name, id);
}

Student s1 = new Student("Alice", 123);
Student s2 = new Student("Bob", 456);

s1.hashCode() = 2066211285
s2.hashCode() = 1834328475

Benefits:
✓ Consistent with equals()
✓ Good distribution
✓ Easy to maintain
✓ Follows contract rules`;
            break;
            
        case 'bad':
            result = `Bad hashCode() Example:

@Override
public int hashCode() {
    return 42;  // Always returns same value!
}

Student s1 = new Student("Alice", 123);
Student s2 = new Student("Bob", 456);

s1.hashCode() = 42
s2.hashCode() = 42  ← Same hash code!

Problems:
✗ All objects hash to same bucket
✗ HashMap/HashSet performance degrades
✗ O(1) becomes O(n) for lookups
✗ Defeats purpose of hashing`;
            break;
            
        case 'collision':
            result = `Hash Collision Demo:

// Even good hash functions can have collisions
Student s1 = new Student("John", 100);
Student s2 = new Student("Jane", 200);

// Hypothetical collision (rare with good hash function)
s1.hashCode() = 12345678
s2.hashCode() = 12345678  ← Same hash!

HashMap behavior:
1. Both objects go to same bucket
2. HashMap uses equals() to distinguish them
3. Slight performance impact (acceptable)
4. This is why equals() consistency is crucial!

Note: Modern hash functions minimize collisions.`;
            break;
            
        default:
            result = 'Invalid demonstration type selected.';
    }
    
    output.textContent = result;
}

/**
 * Quiz Functions
 */

/**
 * Handles quiz answer selection and scoring
 * @param {HTMLElement} option - The selected option element
 * @param {boolean} isCorrect - Whether the selected answer is correct
 */
function selectAnswer(option, isCorrect) {
    // Prevent re-answering the same question
    if (option.classList.contains('correct') || option.classList.contains('incorrect')) {
        return;
    }

    // Mark the answer as correct or incorrect
    option.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    // Update score
    if (isCorrect) {
        quizScore++;
    }
    
    // Mark all other options in this question as disabled
    const questionContainer = option.closest('.quiz-section');
    const allOptions = questionContainer.querySelectorAll('.quiz-option');
    allOptions.forEach(opt => {
        if (opt !== option) {
            opt.style.opacity = '0.6';
            opt.style.pointerEvents = 'none';
        }
    });

    questionsAnswered++;

    // Show results after all questions are answered
    updateQuizResults();
}

/**
 * Updates quiz results display
 */
function updateQuizResults() {
    const totalQuestions = 3;
    
    if (questionsAnswered >= totalQuestions) {
        const results = document.getElementById('quizResults');
        const scoreText = document.getElementById('scoreText');
        
        if (results && scoreText) {
            results.style.display = 'block';
            
            let message = '';
            const percentage = (quizScore / totalQuestions) * 100;
            
            if (percentage === 100) {
                message = `Perfect! You got ${quizScore} out of ${totalQuestions} correct! 🎉🌟`;
            } else if (percentage >= 67) {
                message = `Great job! You got ${quizScore} out of ${totalQuestions} correct! 🎉`;
            } else if (percentage >= 33) {
                message = `Good effort! You got ${quizScore} out of ${totalQuestions} correct. Keep learning! 📚`;
            } else {
                message = `You got ${quizScore} out of ${totalQuestions} correct. Review the material and try again! 💪`;
            }
            
            scoreText.textContent = message;
        }
    }
}

/**
 * Resets the quiz to initial state
 */
function resetQuiz() {
    quizScore = 0;
    questionsAnswered = 0;
    
    // Reset all quiz options
    const allOptions = document.querySelectorAll('.quiz-option');
    allOptions.forEach(option => {
        option.classList.remove('correct', 'incorrect');
        option.style.opacity = '1';
        option.style.pointerEvents = 'auto';
    });
    
    // Hide results
    const results = document.getElementById('quizResults');
    if (results) {
        results.style.display = 'none';
    }
}

/**
 * Initialization Functions
 */

/**
 * Initializes the tutorial when the DOM is loaded
 */
function initializeTutorial() {
    // Set up initial state
    console.log('Java Object Tutorial initialized');
    
    // Add keyboard navigation support
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Add any additional initialization code here
}

/**
 * Handles keyboard navigation for accessibility
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleKeyboardNavigation(event) {
    // Example: Navigate sections with arrow keys when focus is on nav
    if (event.target.matches('.nav button')) {
        const buttons = Array.from(document.querySelectorAll('.nav button'));
        const currentIndex = buttons.indexOf(event.target);
        
        let nextIndex = currentIndex;
        
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % buttons.length;
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        }
        
        if (nextIndex !== currentIndex) {
            event.preventDefault();
            buttons[nextIndex].focus();
        }
    }
}

/**
 * Event Listeners
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTutorial);

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showSection,
        clearOutput,
        demonstrateEquality,
        demonstrateToString,
        demonstrateCloning,
        demonstrateHashCode,
        selectAnswer,
        resetQuiz,
        initializeTutorial
    };
}