// Java Interfaces Interactive Demo - JavaScript Implementation
// This file supports the HTML demo for Iterator, Comparable, Comparator, and Collections

// Global variables for different sections
let iteratorList = [];
let iteratorIndex = 0;
let personList = [];
let comparatorPersonList = [];
let collectionPersonList = [];

// Person class simulation
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = parseInt(age);
    }

    // Comparable implementation - natural ordering by age
    compareTo(other) {
        return this.age - other.age;
    }

    toString() {
        return `${this.name} (${this.age})`;
    }
}

// Custom Iterator implementation
class ListIterator {
    constructor(list) {
        this.list = list;
        this.index = 0;
    }

    hasNext() {
        return this.index < this.list.length;
    }

    next() {
        if (!this.hasNext()) {
            throw new Error("No more elements");
        }
        return this.list[this.index++];
    }

    hasPrevious() {
        return this.index > 0;
    }

    previous() {
        if (!this.hasPrevious()) {
            throw new Error("No previous elements");
        }
        return this.list[--this.index];
    }

    reset() {
        this.index = 0;
    }
}

// Comparator implementations
const Comparators = {
    byName: (p1, p2) => p1.name.localeCompare(p2.name),
    byAge: (p1, p2) => p1.age - p2.age,
    byAgeDesc: (p1, p2) => p2.age - p1.age,
    byNameLength: (p1, p2) => p1.name.length - p2.name.length
};

// Tab switching functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Utility function to display collections
function displayCollection(collection, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    collection.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'person-card';
        card.textContent = typeof item === 'object' ? item.toString() : item;
        if (typeof item === 'object') {
            card.style.background = `hsl(${(index * 137.5) % 360}, 70%, 50%)`;
        }
        container.appendChild(card);
    });
}

// ITERATOR SECTION FUNCTIONS
function addToIteratorList() {
    const input = document.getElementById('iteratorInput');
    const value = input.value.trim();
    
    if (value) {
        iteratorList.push(value);
        input.value = '';
        displayCollection(iteratorList, 'iteratorCollection');
        document.getElementById('iteratorOutput').textContent = 
            `Added "${value}". List now has ${iteratorList.length} items.`;
    }
}

function iterateForward() {
    const output = document.getElementById('iteratorOutput');
    
    if (iteratorList.length === 0) {
        output.textContent = "List is empty. Add some items first.";
        return;
    }

    const iterator = new ListIterator(iteratorList);
    iterator.index = iteratorIndex;
    
    let result = "Forward iteration:\n";
    let count = 0;
    
    while (iterator.hasNext() && count < 3) {
        const item = iterator.next();
        result += `→ ${item}\n`;
        count++;
    }
    
    iteratorIndex = iterator.index;
    
    if (!iterator.hasNext()) {
        result += "End of list reached.";
        iteratorIndex = 0; // Reset for next iteration
    }
    
    result += `\nCurrent position: ${iteratorIndex}/${iteratorList.length}`;
    output.textContent = result;
}

function iterateBackward() {
    const output = document.getElementById('iteratorOutput');
    
    if (iteratorList.length === 0) {
        output.textContent = "List is empty. Add some items first.";
        return;
    }

    const iterator = new ListIterator(iteratorList);
    iterator.index = iteratorIndex;
    
    let result = "Backward iteration:\n";
    let count = 0;
    
    while (iterator.hasPrevious() && count < 3) {
        const item = iterator.previous();
        result += `← ${item}\n`;
        count++;
    }
    
    iteratorIndex = iterator.index;
    
    if (!iterator.hasPrevious()) {
        result += "Beginning of list reached.";
    }
    
    result += `\nCurrent position: ${iteratorIndex}/${iteratorList.length}`;
    output.textContent = result;
}

function resetIterator() {
    iteratorIndex = 0;
    document.getElementById('iteratorOutput').textContent = 
        "Iterator reset to beginning. Use 'Iterate Forward' to start over.";
}

function clearIteratorList() {
    iteratorList = [];
    iteratorIndex = 0;
    displayCollection(iteratorList, 'iteratorCollection');
    document.getElementById('iteratorOutput').textContent = "List cleared.";
}

// COMPARABLE SECTION FUNCTIONS
function addPerson() {
    const nameInput = document.getElementById('personName');
    const ageInput = document.getElementById('personAge');
    
    const name = nameInput.value.trim();
    const age = ageInput.value;
    
    if (name && age) {
        const person = new Person(name, age);
        personList.push(person);
        
        nameInput.value = '';
        ageInput.value = '';
        
        displayCollection(personList, 'personCollection');
        document.getElementById('comparableOutput').textContent = 
            `Added ${person.toString()}. Total: ${personList.length} people.`;
    } else {
        document.getElementById('comparableOutput').textContent = 
            "Please enter both name and age.";
    }
}

function sortByNaturalOrder() {
    if (personList.length === 0) {
        document.getElementById('comparableOutput').textContent = 
            "No people to sort. Add some people first.";
        return;
    }
    
    // Sort using Comparable (natural ordering by age)
    personList.sort((a, b) => a.compareTo(b));
    
    displayCollection(personList, 'personCollection');
    
    let result = "Sorted by natural order (age):\n";
    personList.forEach((person, index) => {
        result += `${index + 1}. ${person.toString()}\n`;
    });
    
    document.getElementById('comparableOutput').textContent = result;
}

function clearPersons() {
    personList = [];
    displayCollection(personList, 'personCollection');
    document.getElementById('comparableOutput').textContent = "All people cleared.";
}

// COMPARATOR SECTION FUNCTIONS
function addComparatorPerson() {
    const nameInput = document.getElementById('comparatorPersonName');
    const ageInput = document.getElementById('comparatorPersonAge');
    
    const name = nameInput.value.trim();
    const age = ageInput.value;
    
    if (name && age) {
        const person = new Person(name, age);
        comparatorPersonList.push(person);
        
        nameInput.value = '';
        ageInput.value = '';
        
        displayCollection(comparatorPersonList, 'comparatorPersonCollection');
        document.getElementById('comparatorOutput').textContent = 
            `Added ${person.toString()}. Total: ${comparatorPersonList.length} people.`;
    } else {
        document.getElementById('comparatorOutput').textContent = 
            "Please enter both name and age.";
    }
}

function sortByComparator() {
    if (comparatorPersonList.length === 0) {
        document.getElementById('comparatorOutput').textContent = 
            "No people to sort. Add some people first.";
        return;
    }
    
    const sortMethod = document.getElementById('sortMethod').value;
    let comparator;
    let description;
    
    switch (sortMethod) {
        case 'name':
            comparator = Comparators.byName;
            description = "name (alphabetical)";
            break;
        case 'age':
            comparator = Comparators.byAge;
            description = "age (ascending)";
            break;
        case 'ageDesc':
            comparator = Comparators.byAgeDesc;
            description = "age (descending)";
            break;
        case 'nameLength':
            comparator = Comparators.byNameLength;
            description = "name length";
            break;
        default:
            comparator = Comparators.byName;
            description = "name (alphabetical)";
    }
    
    comparatorPersonList.sort(comparator);
    displayCollection(comparatorPersonList, 'comparatorPersonCollection');
    
    let result = `Sorted by ${description}:\n`;
    comparatorPersonList.forEach((person, index) => {
        result += `${index + 1}. ${person.toString()}\n`;
    });
    
    document.getElementById('comparatorOutput').textContent = result;
}

function clearComparatorPersons() {
    comparatorPersonList = [];
    displayCollection(comparatorPersonList, 'comparatorPersonCollection');
    document.getElementById('comparatorOutput').textContent = "All people cleared.";
}

// COLLECTIONS SECTION FUNCTIONS
function addCollectionPerson() {
    const nameInput = document.getElementById('collectionPersonName');
    const ageInput = document.getElementById('collectionPersonAge');
    
    const name = nameInput.value.trim();
    const age = ageInput.value;
    
    if (name && age) {
        const person = new Person(name, age);
        collectionPersonList.push(person);
        
        nameInput.value = '';
        ageInput.value = '';
        
        displayCollection(collectionPersonList, 'collectionPersonCollection');
        document.getElementById('collectionsOutput').textContent = 
            `Added ${person.toString()}. Total: ${collectionPersonList.length} people.`;
    } else {
        document.getElementById('collectionsOutput').textContent = 
            "Please enter both name and age.";
    }
}

function shuffleCollection() {
    if (collectionPersonList.length === 0) {
        document.getElementById('collectionsOutput').textContent = 
            "No people to shuffle. Add some people first.";
        return;
    }
    
    // Fisher-Yates shuffle algorithm
    for (let i = collectionPersonList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [collectionPersonList[i], collectionPersonList[j]] = 
        [collectionPersonList[j], collectionPersonList[i]];
    }
    
    displayCollection(collectionPersonList, 'collectionPersonCollection');
    document.getElementById('collectionsOutput').textContent = 
        "Collection shuffled randomly using Collections.shuffle() equivalent.";
}

function reverseCollection() {
    if (collectionPersonList.length === 0) {
        document.getElementById('collectionsOutput').textContent = 
            "No people to reverse. Add some people first.";
        return;
    }
    
    collectionPersonList.reverse();
    displayCollection(collectionPersonList, 'collectionPersonCollection');
    document.getElementById('collectionsOutput').textContent = 
        "Collection reversed using Collections.reverse() equivalent.";
}

function findMinMax() {
    if (collectionPersonList.length === 0) {
        document.getElementById('collectionsOutput').textContent = 
            "No people to analyze. Add some people first.";
        return;
    }
    
    // Find min and max by age (natural ordering)
    const minPerson = collectionPersonList.reduce((min, person) => 
        person.compareTo(min) < 0 ? person : min
    );
    
    const maxPerson = collectionPersonList.reduce((max, person) => 
        person.compareTo(max) > 0 ? person : max
    );
    
    const result = `Collections.min() and Collections.max() results:\n` +
                  `Youngest: ${minPerson.toString()}\n` +
                  `Oldest: ${maxPerson.toString()}`;
    
    document.getElementById('collectionsOutput').textContent = result;
}

function binarySearchDemo() {
    if (collectionPersonList.length === 0) {
        document.getElementById('collectionsOutput').textContent = 
            "No people for binary search. Add some people first.";
        return;
    }
    
    // First sort the collection for binary search
    collectionPersonList.sort((a, b) => a.compareTo(b));
    displayCollection(collectionPersonList, 'collectionPersonCollection');
    
    // Search for a person with median age
    const ages = collectionPersonList.map(p => p.age);
    const medianAge = ages[Math.floor(ages.length / 2)];
    
    // Binary search implementation
    let left = 0;
    let right = collectionPersonList.length - 1;
    let found = -1;
    let steps = 0;
    
    while (left <= right) {
        steps++;
        const mid = Math.floor((left + right) / 2);
        const midAge = collectionPersonList[mid].age;
        
        if (midAge === medianAge) {
            found = mid;
            break;
        } else if (midAge < medianAge) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    let result = `Binary search demo (searching for age ${medianAge}):\n`;
    result += `Collection sorted first (required for binary search)\n`;
    result += `Search completed in ${steps} steps\n`;
    
    if (found !== -1) {
        result += `Found: ${collectionPersonList[found].toString()} at index ${found}`;
    } else {
        result += `Person with age ${medianAge} not found`;
    }
    
    document.getElementById('collectionsOutput').textContent = result;
}

function clearCollectionPersons() {
    collectionPersonList = [];
    displayCollection(collectionPersonList, 'collectionPersonCollection');
    document.getElementById('collectionsOutput').textContent = "All people cleared.";
}

// Event listeners for Enter key support
document.addEventListener('DOMContentLoaded', function() {
    // Iterator section
    document.getElementById('iteratorInput')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addToIteratorList();
    });
    
    // Comparable section
    document.getElementById('personName')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addPerson();
    });
    document.getElementById('personAge')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addPerson();
    });
    
    // Comparator section
    document.getElementById('comparatorPersonName')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addComparatorPerson();
    });
    document.getElementById('comparatorPersonAge')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addComparatorPerson();
    });
    
    // Collections section
    document.getElementById('collectionPersonName')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addCollectionPerson();
    });
    document.getElementById('collectionPersonAge')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addCollectionPerson();
    });
});

// Initialize demo with some sample data (optional)
function initializeDemo() {
    // You can uncomment these lines to start with sample data
    /*
    iteratorList = ['Apple', 'Banana', 'Cherry', 'Date'];
    displayCollection(iteratorList, 'iteratorCollection');
    
    personList = [
        new Person('Alice', 25),
        new Person('Bob', 30),
        new Person('Carol', 22)
    ];
    displayCollection(personList, 'personCollection');
    */
}

// Call initialization when page loads
// initializeDemo();