// Java Collections Framework Interactive Demo - JavaScript Implementation

// Data structures to simulate Java collections
let arrayList = [];
let linkedList = [];
let hashSet = new Set();
let treeSet = [];
let hashMap = new Map();
let treeMap = new Map();
let queue = [];
let priorityQueue = [];

// Operation counters for logging
let operationCount = 0;

// Utility function to log operations
function logOperation(operation, collection, result = '') {
    operationCount++;
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${operation} on ${collection}: ${result}`;
    console.log(logEntry);
    return logEntry;
}

// Utility function to update visualization
function updateVisualization(elementId, items, isMap = false, isQueue = false) {
    const container = document.getElementById(elementId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (items.length === 0 && !isMap) {
        container.innerHTML = '<div style="text-align: center; color: #7f8c8d; font-style: italic; padding: 20px;">Collection is empty</div>';
        return;
    }
    
    if (isMap && items.size === 0) {
        container.innerHTML = '<div style="text-align: center; color: #7f8c8d; font-style: italic; padding: 20px;">Map is empty</div>';
        return;
    }
    
    if (isQueue) {
        // Special visualization for queue (FIFO)
        const queueContainer = document.createElement('div');
        queueContainer.style.cssText = 'display: flex; align-items: center; justify-content: center; flex-wrap: wrap;';
        
        if (items.length > 0) {
            // Add "Front" label
            const frontLabel = document.createElement('div');
            frontLabel.textContent = 'Front →';
            frontLabel.style.cssText = 'margin-right: 10px; font-weight: bold; color: #2c3e50;';
            queueContainer.appendChild(frontLabel);
            
            items.forEach((item, index) => {
                const element = document.createElement('div');
                element.className = 'collection-item';
                element.textContent = item;
                element.style.background = index === 0 ? 'linear-gradient(45deg, #27ae60, #2ecc71)' : 'linear-gradient(45deg, #e74c3c, #c0392b)';
                queueContainer.appendChild(element);
                
                if (index < items.length - 1) {
                    const arrow = document.createElement('span');
                    arrow.textContent = '→';
                    arrow.style.cssText = 'margin: 0 5px; font-size: 18px; color: #2c3e50;';
                    queueContainer.appendChild(arrow);
                }
            });
            
            // Add "Rear" label
            const rearLabel = document.createElement('div');
            rearLabel.textContent = '← Rear';
            rearLabel.style.cssText = 'margin-left: 10px; font-weight: bold; color: #2c3e50;';
            queueContainer.appendChild(rearLabel);
        }
        
        container.appendChild(queueContainer);
    } else if (isMap) {
        // Handle Map visualization
        const mapContainer = document.createElement('div');
        mapContainer.style.cssText = 'display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;';
        
        items.forEach((value, key) => {
            const pairElement = document.createElement('div');
            pairElement.className = 'collection-item';
            pairElement.innerHTML = `<strong>${key}</strong> → ${value}`;
            pairElement.style.background = 'linear-gradient(45deg, #9b59b6, #8e44ad)';
            pairElement.style.minWidth = '120px';
            pairElement.style.textAlign = 'center';
            mapContainer.appendChild(pairElement);
        });
        
        container.appendChild(mapContainer);
    } else {
        // Handle regular collection visualization
        const itemsContainer = document.createElement('div');
        itemsContainer.style.cssText = 'display: flex; flex-wrap: wrap; gap: 5px; justify-content: center;';
        
        items.forEach((item, index) => {
            const element = document.createElement('div');
            element.className = 'collection-item';
            element.textContent = item;
            
            // Add index for ArrayList
            if (elementId.includes('arraylist')) {
                element.innerHTML = `<small>[${index}]</small><br>${item}`;
                element.style.minWidth = '60px';
                element.style.textAlign = 'center';
            }
            
            itemsContainer.appendChild(element);
        });
        
        container.appendChild(itemsContainer);
    }
}

// Utility function to update output
function updateOutput(elementId, message) {
    const output = document.getElementById(elementId);
    if (output) {
        const timestamp = new Date().toLocaleTimeString();
        output.innerHTML += `<div>[${timestamp}] ${message}</div>`;
        output.scrollTop = output.scrollHeight;
    }
}

// Tab switching functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedContent = document.getElementById(tabName + '-tab');
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// ArrayList Functions
function addToArrayList() {
    const input = document.getElementById('arraylist-input');
    const value = input.value.trim();
    
    if (value === '') {
        alert('Please enter a value');
        return;
    }
    
    arrayList.push(value);
    input.value = '';
    
    updateVisualization('arraylist-visualization', arrayList);
    updateOutput('arraylist-output', `Added "${value}" to ArrayList. Size: ${arrayList.length}`);
    logOperation('ADD', 'ArrayList', value);
}

function removeFromArrayList() {
    const input = document.getElementById('arraylist-input');
    const value = input.value.trim();
    
    if (value === '') {
        if (arrayList.length > 0) {
            const removed = arrayList.pop();
            updateVisualization('arraylist-visualization', arrayList);
            updateOutput('arraylist-output', `Removed "${removed}" from ArrayList. Size: ${arrayList.length}`);
            logOperation('REMOVE', 'ArrayList', removed);
        } else {
            updateOutput('arraylist-output', 'ArrayList is empty');
        }
    } else {
        const index = arrayList.indexOf(value);
        if (index !== -1) {
            arrayList.splice(index, 1);
            updateVisualization('arraylist-visualization', arrayList);
            updateOutput('arraylist-output', `Removed "${value}" from ArrayList. Size: ${arrayList.length}`);
            logOperation('REMOVE', 'ArrayList', value);
        } else {
            updateOutput('arraylist-output', `"${value}" not found in ArrayList`);
        }
    }
    
    input.value = '';
}

function getFromArrayList() {
    const indexInput = document.getElementById('arraylist-index');
    const index = parseInt(indexInput.value);
    
    if (isNaN(index) || index < 0 || index >= arrayList.length) {
        updateOutput('arraylist-output', `Invalid index: ${indexInput.value}. Valid range: 0-${Math.max(0, arrayList.length - 1)}`);
        return;
    }
    
    const value = arrayList[index];
    updateOutput('arraylist-output', `arrayList.get(${index}) = "${value}"`);
    logOperation('GET', 'ArrayList', `index ${index}: ${value}`);
}

function insertIntoArrayList() {
    const input = document.getElementById('arraylist-input');
    const indexInput = document.getElementById('arraylist-index');
    const value = input.value.trim();
    const index = parseInt(indexInput.value);
    
    if (value === '') {
        alert('Please enter a value');
        return;
    }
    
    if (isNaN(index) || index < 0 || index > arrayList.length) {
        updateOutput('arraylist-output', `Invalid index: ${indexInput.value}. Valid range: 0-${arrayList.length}`);
        return;
    }
    
    arrayList.splice(index, 0, value);
    input.value = '';
    indexInput.value = '';
    
    updateVisualization('arraylist-visualization', arrayList);
    updateOutput('arraylist-output', `Inserted "${value}" at index ${index}. Size: ${arrayList.length}`);
    logOperation('INSERT', 'ArrayList', `${value} at index ${index}`);
}

function clearArrayList() {
    arrayList = [];
    updateVisualization('arraylist-visualization', arrayList);
    updateOutput('arraylist-output', 'ArrayList cleared');
    logOperation('CLEAR', 'ArrayList');
}

// LinkedList Functions
function addToLinkedList() {
    const input = document.getElementById('linkedlist-input');
    const value = input.value.trim();
    
    if (value === '') {
        alert('Please enter a value');
        return;
    }
    
    linkedList.push(value);
    input.value = '';
    
    updateVisualization('linkedlist-visualization', linkedList);
    updateOutput('linkedlist-output', `Added "${value}" to end of LinkedList. Size: ${linkedList.length}`);
    logOperation('ADD_LAST', 'LinkedList', value);
}

function addFirstToLinkedList() {
    const input = document.getElementById('linkedlist-input');
    const value = input.value.trim();
    
    if (value === '') {
        alert('Please enter a value');
        return;
    }
    
    linkedList.unshift(value);
    input.value = '';
    
    updateVisualization('linkedlist-visualization', linkedList);
    updateOutput('linkedlist-output', `Added "${value}" to beginning of LinkedList. Size: ${linkedList.length}`);
    logOperation('ADD_FIRST', 'LinkedList', value);
}

function removeFromLinkedList() {
    if (linkedList.length > 0) {
        const removed = linkedList.pop();
        updateVisualization('linkedlist-visualization', linkedList);
        updateOutput('linkedlist-output', `Removed "${removed}" from end of LinkedList. Size: ${linkedList.length}`);
        logOperation('REMOVE_LAST', 'LinkedList', removed);
    } else {
        updateOutput('linkedlist-output', 'LinkedList is empty');
    }
}

function removeFirstFromLinkedList() {
    if (linkedList.length > 0) {
        const removed = linkedList.shift();
        updateVisualization('linkedlist-visualization', linkedList);
        updateOutput('linkedlist-output', `Removed "${removed}" from beginning of LinkedList. Size: ${linkedList.length}`);
        logOperation('REMOVE_FIRST', 'LinkedList', removed);
    } else {
        updateOutput('linkedlist-output', 'LinkedList is empty');
    }
}

function clearLinkedList() {
    linkedList = [];
    updateVisualization('linkedlist-visualization', linkedList);
    updateOutput('linkedlist-output', 'LinkedList cleared');
    logOperation('CLEAR', 'LinkedList');
}

// HashSet Functions
function addToHashSet() {
    const input = document.getElementById('hashset-input');
    const value = input.value.trim();
    
    if (value === '') {
        alert('Please enter a value');
        return;
    }
    
    const sizeBefore = hashSet.size;
    hashSet.add(value);
    input.value = '';
    
    updateVisualization('hashset-visualization', Array.from(hashSet));
    
    if (hashSet.size > sizeBefore) {
        updateOutput('hashset-output', `Added "${value}" to HashSet. Size: ${hashSet.size}`);
        logOperation('ADD', 'HashSet', value);
    } else {
        updateOutput('hashset-output', `"${value}" already exists in HashSet. Size: ${hashSet.size}`);
    }
}

function removeFromHashSet() {
    const input = document.getElementById('hashset-input');
    const value = input.value.trim();
    
    if (value === '') {
        alert('Please enter a value');
        return;
    }
    
    const removed = hashSet.delete(value);
    input.value = '';
    
    updateVisualization('hashset-visualization', Array.from(hashSet));
    
    if (removed) {
        updateOutput('hashset-output', `Removed "${value}" from HashSet. Size: ${hashSet.size}`);
        logOperation('REMOVE', 'HashSet', value);
    } else {
        updateOutput('hashset-output', `"${value}" not found in HashSet`);
    }
}

function containsInHashSet() {
    const input = document.getElementById('hashset-input');
    const value = input.value.trim();
    
    if (value === '') {
        alert('Please enter a value');
        return;
    }
    
    const contains = hashSet.has(value);
    updateOutput('hashset-output', `hashSet.contains("${value}") = ${contains}`);
    logOperation('CONTAINS', 'HashSet', `${value}: ${contains}`);
}

function clearHashSet() {
    hashSet.clear();
    updateVisualization('hashset-visualization', Array.from(hashSet));
    updateOutput('hashset-output', 'HashSet cleared');
    logOperation('CLEAR', 'HashSet');
}

// TreeSet Functions (using sorted array to simulate)
function addToTreeSet() {
    const input = document.getElementById('treeset-input');
    const value = input.value.trim();
    
    if (value === '') {
        alert('Please enter a value');
        return;
    }
    
    if (!treeSet.includes(value)) {
        treeSet.push(value);
        treeSet.sort();
        updateOutput('treeset-output', `Added "${value}" to TreeSet. Size: ${treeSet.length}`);
        logOperation('ADD', 'TreeSet', value);
    } else {
        updateOutput('treeset-output', `"${value}" already exists in TreeSet. Size: ${treeSet.length}`);
    }
    
    input.value = '';
    updateVisualization('treeset-visualization', treeSet);
}

function removeFromTreeSet() {
    const input = document.getElementById('treeset-input');
    const value = input.value.trim();
    
    if (value === '') {
        alert('Please enter a value');
        return;
    }
    
    const index = treeSet.indexOf(value);
    if (index !== -1) {
        treeSet.splice(index, 1);
        updateOutput('treeset-output', `Removed "${value}" from TreeSet. Size: ${treeSet.length}`);
        logOperation('REMOVE', 'TreeSet', value);
    } else {
        updateOutput('treeset-output', `"${value}" not found in TreeSet`);
    }
    
    input.value = '';
    updateVisualization('treeset-visualization', treeSet);
}

function firstInTreeSet() {
    if (treeSet.length > 0) {
        const first = treeSet[0];
        updateOutput('treeset-output', `treeSet.first() = "${first}"`);
        logOperation('FIRST', 'TreeSet', first);
    } else {
        updateOutput('treeset-output', 'TreeSet is empty');
    }
}

function lastInTreeSet() {
    if (treeSet.length > 0) {
        const last = treeSet[treeSet.length - 1];
        updateOutput('treeset-output', `treeSet.last() = "${last}"`);
        logOperation('LAST', 'TreeSet', last);
    } else {
        updateOutput('treeset-output', 'TreeSet is empty');
    }
}

function clearTreeSet() {
    treeSet = [];
    updateVisualization('treeset-visualization', treeSet);
    updateOutput('treeset-output', 'TreeSet cleared');
    logOperation('CLEAR', 'TreeSet');
}

// HashMap Functions
function putInHashMap() {
    const keyInput = document.getElementById('hashmap-key');
    const valueInput = document.getElementById('hashmap-value');
    const key = keyInput.value.trim();
    const value = valueInput.value.trim();
    
    if (key === '' || value === '') {
        alert('Please enter both key and value');
        return;
    }
    
    const existed = hashMap.has(key);
    const oldValue = hashMap.get(key);
    hashMap.set(key, value);
    
    keyInput.value = '';
    valueInput.value = '';
    
    updateVisualization('hashmap-visualization', hashMap, true);
    
    if (existed) {
        updateOutput('hashmap-output', `Updated key "${key}": "${oldValue}" → "${value}". Size: ${hashMap.size}`);
    } else {
        updateOutput('hashmap-output', `Put "${key}" → "${value}" in HashMap. Size: ${hashMap.size}`);
    }
    
    logOperation('PUT', 'HashMap', `${key} → ${value}`);
}

function getFromHashMap() {
    const keyInput = document.getElementById('hashmap-key');
    const key = keyInput.value.trim();
    
    if (key === '') {
        alert('Please enter a key');
        return;
    }
    
    if (hashMap.has(key)) {
        const value = hashMap.get(key);
        updateOutput('hashmap-output', `hashMap.get("${key}") = "${value}"`);
        logOperation('GET', 'HashMap', `${key}: ${value}`);
    } else {
        updateOutput('hashmap-output', `Key "${key}" not found in HashMap`);
    }
}

function removeFromHashMap() {
    const keyInput = document.getElementById('hashmap-key');
    const key = keyInput.value.trim();
    
    if (key === '') {
        alert('Please enter a key');
        return;
    }
    
    if (hashMap.has(key)) {
        const value = hashMap.get(key);
        hashMap.delete(key);
        updateVisualization('hashmap-visualization', hashMap, true);
        updateOutput('hashmap-output', `Removed "${key}" → "${value}" from HashMap. Size: ${hashMap.size}`);
        logOperation('REMOVE', 'HashMap', `${key} → ${value}`);
    } else {
        updateOutput('hashmap-output', `Key "${key}" not found in HashMap`);
    }
    
    keyInput.value = '';
}

function clearHashMap() {
    hashMap.clear();
    updateVisualization('hashmap-visualization', hashMap, true);
    updateOutput('hashmap-output', 'HashMap cleared');
    logOperation('CLEAR', 'HashMap');
}

// TreeMap Functions (using Map with sorted key display)
function putInTreeMap() {
    const keyInput = document.getElementById('treemap-key');
    const valueInput = document.getElementById('treemap-value');
    const key = keyInput.value.trim();
    const value = valueInput.value.trim();
    
    if (key === '' || value === '') {
        alert('Please enter both key and value');
        return;
    }
    
    const existed = treeMap.has(key);
    const oldValue = treeMap.get(key);
    treeMap.set(key, value);
    
    // Create sorted map for display
    const sortedMap = new Map([...treeMap.entries()].sort());
    
    keyInput.value = '';
    valueInput.value = '';
    
    updateVisualization('treemap-visualization', sortedMap, true);
    
    if (existed) {
        updateOutput('treemap-output', `Updated key "${key}": "${oldValue}" → "${value}". Size: ${treeMap.size}`);
    } else {
        updateOutput('treemap-output', `Put "${key}" → "${value}" in TreeMap. Size: ${treeMap.size}`);
    }
    
    logOperation('PUT', 'TreeMap', `${key} → ${value}`);
}

function getFromTreeMap() {
    const keyInput = document.getElementById('treemap-key');
    const key = keyInput.value.trim();
    
    if (key === '') {
        alert('Please enter a key');
        return;
    }
    
    if (treeMap.has(key)) {
        const value = treeMap.get(key);
        updateOutput('treemap-output', `treeMap.get("${key}") = "${value}"`);
        logOperation('GET', 'TreeMap', `${key}: ${value}`);
    } else {
        updateOutput('treemap-output', `Key "${key}" not found in TreeMap`);
    }
}

function firstKeyInTreeMap() {
    if (treeMap.size > 0) {
        const sortedKeys = [...treeMap.keys()].sort();
        const firstKey = sortedKeys[0];
        const value = treeMap.get(firstKey);
        updateOutput('treemap-output', `treeMap.firstKey() = "${firstKey}" → "${value}"`);
        logOperation('FIRST_KEY', 'TreeMap', `${firstKey} → ${value}`);
    } else {
        updateOutput('treemap-output', 'TreeMap is empty');
    }
}

function lastKeyInTreeMap() {
    if (treeMap.size > 0) {
        const sortedKeys = [...treeMap.keys()].sort();
        const lastKey = sortedKeys[sortedKeys.length - 1];
        const value = treeMap.get(lastKey);
        updateOutput('treemap-output', `treeMap.lastKey() = "${lastKey}" → "${value}"`);
        logOperation('LAST_KEY', 'TreeMap', `${lastKey} → ${value}`);
    } else {
        updateOutput('treemap-output', 'TreeMap is empty');
    }
}

function clearTreeMap() {
    treeMap.clear();
    updateVisualization('treemap-visualization', treeMap, true);
    updateOutput('treemap-output', 'TreeMap cleared');
    logOperation('CLEAR', 'TreeMap');
}

// Queue Functions (using LinkedList simulation)
function enqueue() {
    const input = document.getElementById('queue-input');
    const value = input.value.trim();
    
    if (value === '') {
        alert('Please enter a value');
        return;
    }
    
    queue.push(value);
    input.value = '';
    
    updateVisualization('queue-visualization', queue, false, true);
    updateOutput('queue-output', `Enqueued "${value}". Size: ${queue.length}`);
    logOperation('ENQUEUE', 'Queue', value);
}

function dequeue() {
    if (queue.length > 0) {
        const removed = queue.shift();
        updateVisualization('queue-visualization', queue, false, true);
        updateOutput('queue-output', `Dequeued "${removed}". Size: ${queue.length}`);
        logOperation('DEQUEUE', 'Queue', removed);
    } else {
        updateOutput('queue-output', 'Queue is empty');
    }
}

function peekQueue() {
    if (queue.length > 0) {
        const front = queue[0];
        updateOutput('queue-output', `queue.peek() = "${front}"`);
        logOperation('PEEK', 'Queue', front);
    } else {
        updateOutput('queue-output', 'Queue is empty');
    }
}

function clearQueue() {
    queue = [];
    updateVisualization('queue-visualization', queue, false, true);
    updateOutput('queue-output', 'Queue cleared');
    logOperation('CLEAR', 'Queue');
}

// PriorityQueue Functions
function addToPriorityQueue() {
    const input = document.getElementById('priorityqueue-input');
    const value = parseInt(input.value);
    
    if (isNaN(value)) {
        alert('Please enter a valid number');
        return;
    }
    
    priorityQueue.push(value);
    priorityQueue.sort((a, b) => a - b); // Min heap simulation
    input.value = '';
    
    updateVisualization('priorityqueue-visualization', priorityQueue);
    updateOutput('priorityqueue-output', `Added ${value} to PriorityQueue. Size: ${priorityQueue.length}`);
    logOperation('ADD', 'PriorityQueue', value);
}

function pollFromPriorityQueue() {
    if (priorityQueue.length > 0) {
        const removed = priorityQueue.shift(); // Remove smallest (highest priority)
        updateVisualization('priorityqueue-visualization', priorityQueue);
        updateOutput('priorityqueue-output', `Polled ${removed} from PriorityQueue. Size: ${priorityQueue.length}`);
        logOperation('POLL', 'PriorityQueue', removed);
    } else {
        updateOutput('priorityqueue-output', 'PriorityQueue is empty');
    }
}

function peekPriorityQueue() {
    if (priorityQueue.length > 0) {
        const front = priorityQueue[0];
        updateOutput('priorityqueue-output', `priorityQueue.peek() = ${front}`);
        logOperation('PEEK', 'PriorityQueue', front);
    } else {
        updateOutput('priorityqueue-output', 'PriorityQueue is empty');
    }
}

function clearPriorityQueue() {
    priorityQueue = [];
    updateVisualization('priorityqueue-visualization', priorityQueue);
    updateOutput('priorityqueue-output', 'PriorityQueue cleared');
    logOperation('CLEAR', 'PriorityQueue');
}

// Initialize the demo when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all visualizations
    updateVisualization('arraylist-visualization', arrayList);
    updateVisualization('linkedlist-visualization', linkedList);
    updateVisualization('hashset-visualization', Array.from(hashSet));
    updateVisualization('treeset-visualization', treeSet);
    updateVisualization('hashmap-visualization', hashMap, true);
    updateVisualization('treemap-visualization', treeMap, true);
    updateVisualization('queue-visualization', queue, false, true);
    updateVisualization('priorityqueue-visualization', priorityQueue);
    
    // Add welcome messages to outputs
    const outputs = [
        'arraylist-output', 'linkedlist-output', 'hashset-output', 'treeset-output',
        'hashmap-output', 'treemap-output', 'queue-output', 'priorityqueue-output'
    ];
    
    outputs.forEach(outputId => {
        updateOutput(outputId, 'Welcome to Java Collections Interactive Demo! Start by adding some elements.');
    });
    
    console.log('Java Collections Framework Demo initialized successfully!');
});