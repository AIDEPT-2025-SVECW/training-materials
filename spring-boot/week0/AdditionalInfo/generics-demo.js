// Java Generics Interactive Demo JavaScript

// Toggle section functionality
function toggleSection(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        header.classList.remove('active');
    } else {
        content.classList.add('active');
        header.classList.add('active');
    }
}

// Generate generic code examples
function generateGenericCode() {
    const collectionType = document.getElementById('collectionType').value;
    const genericType = document.getElementById('genericType').value;
    const output = document.getElementById('genericOutput');
    
    const code = `// Generic ${collectionType} declaration
${collectionType}<${genericType}> collection = new ${collectionType}<>();

// Adding elements (type-safe)
collection.add(${getExampleValue(genericType)});
collection.add(${getExampleValue(genericType, true)});

// Retrieving elements (no casting needed)
${genericType} item = collection.${collectionType === 'HashSet' ? 'iterator().next()' : 'get(0)'};
System.out.println("Item: " + item);

// Compiler prevents wrong types
// collection.add(${getWrongTypeExample(genericType)}); // ❌ Compile error!`;

    output.innerHTML = `<pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 0;"><code>${escapeHtml(code)}</code></pre>`;
}

function getExampleValue(type, second = false) {
    switch(type) {
        case 'String':
            return second ? '"World"' : '"Hello"';
        case 'Integer':
            return second ? '42' : '1';
        case 'Double':
            return second ? '3.14' : '1.0';
        default:
            return '"example"';
    }
}

function getWrongTypeExample(type) {
    switch(type) {
        case 'String':
            return '42';
        case 'Integer':
            return '"text"';
        case 'Double':
            return '"text"';
        default:
            return '123';
    }
}

// Generate generic class
function generateGenericClass() {
    const className = document.getElementById('className').value || 'Container';
    const typeParam = document.getElementById('typeParam').value || 'T';
    const fieldName = document.getElementById('fieldName').value || 'data';
    const output = document.getElementById('classOutput');
    
    const code = `public class ${className}<${typeParam}> {
    private ${typeParam} ${fieldName};
    
    // Constructor
    public ${className}(${typeParam} ${fieldName}) {
        this.${fieldName} = ${fieldName};
    }
    
    // Getter
    public ${typeParam} get${capitalize(fieldName)}() {
        return ${fieldName};
    }
    
    // Setter
    public void set${capitalize(fieldName)}(${typeParam} ${fieldName}) {
        this.${fieldName} = ${fieldName};
    }
    
    // Generic method
    public <U> void process(U item) {
        System.out.println("Processing: " + item + " with data: " + ${fieldName});
    }
    
    @Override
    public String toString() {
        return "${className}{${fieldName}=" + ${fieldName} + "}";
    }
}

// Usage examples:
${className}<String> stringContainer = new ${className}<>("Hello");
${className}<Integer> intContainer = new ${className}<>(42);
${className}<Double> doubleContainer = new ${className}<>(3.14);

System.out.println(stringContainer.get${capitalize(fieldName)}()); // Hello
intContainer.process("test"); // Processing: test with data: 42`;

    output.innerHTML = `<pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 0; overflow-x: auto;"><code>${escapeHtml(code)}</code></pre>`;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// PECS demonstration
function demonstratePECS() {
    const scenario = document.getElementById('pecsScenario').value;
    const output = document.getElementById('pecsOutput');
    
    let title, code, explanation;
    
    if (scenario === 'producer') {
        title = "Producer: Use 'extends' when reading FROM the collection";
        explanation = "When you want to READ items from a collection, use <? extends T>. The collection can contain T or any subtype of T.";
        code = `// Producer Example: Reading from collection
class Animal { 
    String name; 
    Animal(String name) { this.name = name; }
}
class Dog extends Animal { 
    Dog(String name) { super(name); } 
}
class Cat extends Animal { 
    Cat(String name) { super(name); } 
}

// PRODUCER: We're reading/getting items FROM the collection
public void displayAnimals(List<? extends Animal> animals) {
    // ✅ Can read as Animal (or Object)
    for (Animal animal : animals) {
        System.out.println("Animal: " + animal.name);
    }
    
    // ❌ Cannot add - we don't know the exact type
    // animals.add(new Dog("Buddy")); // Compile error!
    // animals.add(new Animal("Generic")); // Compile error!
}

// Usage - very flexible, accepts any subtype
List<Animal> animals = Arrays.asList(new Animal("Generic"));
List<Dog> dogs = Arrays.asList(new Dog("Buddy"));
List<Cat> cats = Arrays.asList(new Cat("Whiskers"));

displayAnimals(animals); // ✅ Works
displayAnimals(dogs);    // ✅ Works  
displayAnimals(cats);    // ✅ Works

// Remember: "Producer Extends" - use extends when producing/reading items`;
    } else {
        title = "Consumer: Use 'super' when writing TO the collection";
        explanation = "When you want to ADD items to a collection, use <? super T>. The collection can hold T or any supertype of T.";
        code = `// Consumer Example: Adding to collection
class Animal { 
    String name; 
    Animal(String name) { this.name = name; }
}
class Dog extends Animal { 
    Dog(String name) { super(name); } 
}
class Cat extends Animal { 
    Cat(String name) { super(name); } 
}

// CONSUMER: We're adding/putting items INTO the collection
public void addDogs(List<? super Dog> dogList) {
    // ✅ Can add Dog or any subtype of Dog
    dogList.add(new Dog("Buddy"));
    dogList.add(new Dog("Max"));
    
    // ❌ Cannot add supertypes
    // dogList.add(new Animal("Generic")); // Compile error!
    
    // ❌ Can only read as Object (not very useful)
    Object item = dogList.get(0); // Lost type information
}

// Usage - accepts Dog or its supertypes
List<Dog> dogs = new ArrayList<>();
List<Animal> animals = new ArrayList<>(); 
List<Object> objects = new ArrayList<>();

addDogs(dogs);     // ✅ Works - Dog itself
addDogs(animals);  // ✅ Works - Animal is supertype of Dog
addDogs(objects);  // ✅ Works - Object is supertype of Dog

// List<Cat> cats = new ArrayList<>();
// addDogs(cats); // ❌ Compile error - Cat is not supertype of Dog

// Remember: "Consumer Super" - use super when consuming/adding items`;
    }
    
    output.innerHTML = `
        <h4>${title}</h4>
        <p style="margin-bottom: 15px;"><em>${explanation}</em></p>
        <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 0; overflow-x: auto;"><code>${escapeHtml(code)}</code></pre>
        <div style="background: #e8f4f8; padding: 15px; margin-top: 15px; border-radius: 5px; border-left: 4px solid #17a2b8;">
            <strong>PECS Rule:</strong><br>
            • <strong>Producer Extends</strong>: Use <code>&lt;? extends T&gt;</code> when you want to READ/get items FROM the collection<br>
            • <strong>Consumer Super</strong>: Use <code>&lt;? super T&gt;</code> when you want to write/add items TO the collection
        </div>
    `;
}

// Quiz functionality
function checkQuiz(questionName, correctAnswer) {
    const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
    const resultDiv = document.getElementById(questionName + 'Result');
    
    if (!selectedOption) {
        resultDiv.innerHTML = 'Please select an answer first!';
        resultDiv.className = 'quiz-result incorrect';
        resultDiv.style.display = 'block';
        return;
    }
    
    const isCorrect = selectedOption.value === correctAnswer;
    
    if (isCorrect) {
        resultDiv.innerHTML = '✅ Correct! ' + getExplanation(questionName, correctAnswer);
        resultDiv.className = 'quiz-result correct';
    } else {
        resultDiv.innerHTML = '❌ Incorrect. ' + getExplanation(questionName, correctAnswer);
        resultDiv.className = 'quiz-result incorrect';
    }
    
    resultDiv.style.display = 'block';
}

function getExplanation(questionName, correctAnswer) {
    if (questionName === 'q1') {
        return 'List<T> allows adding elements because T is a concrete type parameter. List<?> with wildcard cannot accept additions because the exact type is unknown.';
    } else if (questionName === 'q2') {
        return 'Type erasure removes generic type information at runtime for backward compatibility with pre-Java 5 code. This is why List<String> and List<Integer> have the same runtime class.';
    }
    return '';
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Open first section by default
    const firstSection = document.querySelector('.section-header');
    if (firstSection) {
        toggleSection(firstSection);
    }
    
    // Add some interactive hover effects
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Advanced demo: Generic method examples
function demonstrateGenericMethods() {
    const examples = [
        {
            title: "Simple Generic Method",
            code: `public static <T> void printArray(T[] array) {
    for (T element : array) {
        System.out.println(element);
    }
}

// Usage
String[] names = {"Alice", "Bob", "Charlie"};
Integer[] numbers = {1, 2, 3, 4, 5};

printArray(names);    // T is String
printArray(numbers);  // T is Integer`
        },
        {
            title: "Multiple Type Parameters",
            code: `public static <T, U> void printKeyValue(T key, U value) {
    System.out.println(key + " -> " + value);
}

// Usage
printKeyValue("name", "John");      // T=String, U=String
printKeyValue("age", 25);           // T=String, U=Integer
printKeyValue(1, "first");          // T=Integer, U=String`
        },
        {
            title: "Bounded Generic Method",
            code: `public static <T extends Number> double sum(List<T> numbers) {
    double total = 0.0;
    for (T num : numbers) {
        total += num.doubleValue(); // Can call Number methods
    }
    return total;
}

// Usage
List<Integer> ints = Arrays.asList(1, 2, 3);
List<Double> doubles = Arrays.asList(1.1, 2.2, 3.3);

double intSum = sum(ints);      // Works - Integer extends Number
double doubleSum = sum(doubles); // Works - Double extends Number
// sum(Arrays.asList("a", "b")); // Error - String doesn't extend Number`
        }
    ];
    
    return examples;
}

// Demonstrate type inference
function demonstrateTypeInference() {
    return `// Type Inference in Action

// Before Java 7 - verbose
Map<String, List<Integer>> map1 = new HashMap<String, List<Integer>>();

// Java 7+ Diamond Operator - cleaner
Map<String, List<Integer>> map2 = new HashMap<>();

// Method type inference
List<String> names = Arrays.asList("Alice", "Bob"); // <String> inferred

// Generic method inference
Collections.<String>reverse(names);  // Explicit
Collections.reverse(names);          // Inferred - preferred

// Complex inference
List<String> result = names.stream()
    .filter(name -> name.length() > 3)  // Inferred from context
    .collect(Collectors.toList());      // Return type inferred`;
}

// Real-world examples
function getRealWorldExamples() {
    return [
        {
            title: "Repository Pattern with Generics",
            code: `public interface Repository<T, ID> {
    Optional<T> findById(ID id);
    List<T> findAll();
    T save(T entity);
    void deleteById(ID id);
}

public class UserRepository implements Repository<User, Long> {
    @Override
    public Optional<User> findById(Long id) {
        // Implementation
        return Optional.empty();
    }
    
    @Override
    public List<User> findAll() {
        // Implementation
        return new ArrayList<>();
    }
    
    // ... other methods
}`
        },
        {
            title: "Builder Pattern with Generics",
            code: `public class QueryBuilder<T> {
    private StringBuilder query = new StringBuilder();
    private Class<T> entityClass;
    
    public QueryBuilder(Class<T> entityClass) {
        this.entityClass = entityClass;
    }
    
    public QueryBuilder<T> where(String condition) {
        query.append(" WHERE ").append(condition);
        return this;
    }
    
    public QueryBuilder<T> orderBy(String field) {
        query.append(" ORDER BY ").append(field);
        return this;
    }
    
    public List<T> execute() {
        // Execute query and return results
        return new ArrayList<>();
    }
}

// Usage
List<User> users = new QueryBuilder<>(User.class)
    .where("age > 18")
    .orderBy("name")
    .execute();`
        }
    ];
}