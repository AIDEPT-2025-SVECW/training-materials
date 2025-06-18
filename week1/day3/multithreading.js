// Multi-threading Concepts Interactive Demo JavaScript
// Global variables for managing demos and simulations
let threadCounter = 0;
let demoThreads = [];
let lifecycleThread = null;
let raceConditionCounter = 0;
let syncCounter = 0;
let atomicCounter = 0;
let lockCounter = 0;
let producerConsumerActive = false;
let queue = [];
let producerConsumerIntervals = [];

// Tab Management
function showTab(tabName) {
    // Hide all tab contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tab buttons
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Utility function to log messages
function logMessage(logElementId, message) {
    const logElement = document.getElementById(logElementId);
    if (logElement) {
        const timestamp = new Date().toLocaleTimeString();
        logElement.innerHTML += `[${timestamp}] ${message}\n`;
        logElement.scrollTop = logElement.scrollHeight;
    }
}

// Utility function to clear logs
function clearLog(logElementId) {
    const logElement = document.getElementById(logElementId);
    if (logElement) {
        logElement.innerHTML = '';
    }
}

// ============ BASICS TAB FUNCTIONS ============

function runSingleThreaded() {
    const demoElement = document.getElementById('execution-demo');
    const logElement = 'demo-log';
    
    clearLog(logElement);
    demoElement.innerHTML = '<div style="padding: 20px; background: #ffeb3b; border-radius: 10px; margin: 10px 0;">Processing tasks sequentially...</div>';
    
    logMessage(logElement, 'Starting single-threaded execution...');
    
    // Simulate sequential task execution
    setTimeout(() => {
        logMessage(logElement, 'Task 1: Downloading file1.txt... STARTED');
        setTimeout(() => {
            logMessage(logElement, 'Task 1: Downloading file1.txt... COMPLETED');
            logMessage(logElement, 'Task 2: Downloading file2.txt... STARTED');
            setTimeout(() => {
                logMessage(logElement, 'Task 2: Downloading file2.txt... COMPLETED');
                logMessage(logElement, 'Task 3: Downloading file3.txt... STARTED');
                setTimeout(() => {
                    logMessage(logElement, 'Task 3: Downloading file3.txt... COMPLETED');
                    logMessage(logElement, 'All tasks completed! Total time: ~9 seconds');
                    demoElement.innerHTML = '<div style="padding: 20px; background: #4caf50; color: white; border-radius: 10px; margin: 10px 0;">All tasks completed sequentially!</div>';
                }, 3000);
            }, 3000);
        }, 3000);
    }, 100);
}

function runMultiThreaded() {
    const demoElement = document.getElementById('execution-demo');
    const logElement = 'demo-log';
    
    clearLog(logElement);
    demoElement.innerHTML = '<div style="padding: 20px; background: #2196f3; color: white; border-radius: 10px; margin: 10px 0;">Processing tasks concurrently...</div>';
    
    logMessage(logElement, 'Starting multi-threaded execution...');
    
    // Simulate concurrent task execution
    setTimeout(() => {
        logMessage(logElement, 'Thread 1: Downloading file1.txt... STARTED');
        logMessage(logElement, 'Thread 2: Downloading file2.txt... STARTED');
        logMessage(logElement, 'Thread 3: Downloading file3.txt... STARTED');
        
        setTimeout(() => {
            logMessage(logElement, 'Thread 1: Downloading file1.txt... COMPLETED');
        }, 2800);
        
        setTimeout(() => {
            logMessage(logElement, 'Thread 2: Downloading file2.txt... COMPLETED');
        }, 3100);
        
        setTimeout(() => {
            logMessage(logElement, 'Thread 3: Downloading file3.txt... COMPLETED');
            logMessage(logElement, 'All tasks completed! Total time: ~3 seconds');
            demoElement.innerHTML = '<div style="padding: 20px; background: #4caf50; color: white; border-radius: 10px; margin: 10px 0;">All tasks completed concurrently - 3x faster!</div>';
        }, 3200);
    }, 100);
}

function clearDemo() {
    document.getElementById('execution-demo').innerHTML = '';
    clearLog('demo-log');
}

// ============ THREAD CREATION TAB FUNCTIONS ============

function createThreadElement(name, type, state = 'running') {
    const thread = document.createElement('div');
    thread.className = `thread ${state}`;
    thread.innerHTML = `<div>${name}</div><div style="font-size: 12px;">${type}</div>`;
    thread.onclick = () => toggleThreadState(thread);
    return thread;
}

function toggleThreadState(threadElement) {
    const states = ['running', 'blocked', 'waiting'];
    const currentState = states.find(state => threadElement.classList.contains(state)) || 'running';
    const currentIndex = states.indexOf(currentState);
    const nextState = states[(currentIndex + 1) % states.length];
    
    threadElement.className = `thread ${nextState}`;
}

function createThreadByExtending() {
    const container = document.getElementById('thread-container');
    const threadName = `ExtendThread-${++threadCounter}`;
    const thread = createThreadElement(threadName, 'Extends Thread');
    container.appendChild(thread);
    
    // Simulate thread execution
    setTimeout(() => {
        thread.classList.remove('running');
        thread.classList.add('waiting');
        setTimeout(() => {
            thread.classList.remove('waiting');
            thread.style.background = 'linear-gradient(45deg, #795548, #5d4037)';
            thread.innerHTML = `<div>${threadName}</div><div style="font-size: 12px;">TERMINATED</div>`;
        }, 3000);
    }, 2000);
}

function createThreadByRunnable() {
    const container = document.getElementById('thread-container');
    const threadName = `RunnableThread-${++threadCounter}`;
    const thread = createThreadElement(threadName, 'Implements Runnable');
    container.appendChild(thread);
    
    // Simulate thread execution
    setTimeout(() => {
        thread.classList.remove('running');
        thread.classList.add('blocked');
        setTimeout(() => {
            thread.classList.remove('blocked');
            thread.classList.add('running');
            setTimeout(() => {
                thread.style.background = 'linear-gradient(45deg, #795548, #5d4037)';
                thread.innerHTML = `<div>${threadName}</div><div style="font-size: 12px;">TERMINATED</div>`;
            }, 2000);
        }, 1500);
    }, 1000);
}

function createThreadByLambda() {
    const container = document.getElementById('thread-container');
    const threadName = `LambdaThread-${++threadCounter}`;
    const thread = createThreadElement(threadName, 'Lambda Expression');
    container.appendChild(thread);
    
    // Simulate quick execution
    setTimeout(() => {
        thread.style.background = 'linear-gradient(45deg, #795548, #5d4037)';
        thread.innerHTML = `<div>${threadName}</div><div style="font-size: 12px;">TERMINATED</div>`;
    }, 1500);
}

function clearThreads() {
    document.getElementById('thread-container').innerHTML = '';
    threadCounter = 0;
}

// ============ THREAD LIFECYCLE TAB FUNCTIONS ============

function startLifecycleDemo() {
    const statusElement = document.getElementById('lifecycle-status');
    const logElement = 'lifecycle-log';
    
    clearLog(logElement);
    
    statusElement.innerHTML = '<div class="state new">NEW</div>';
    logMessage(logElement, 'Thread created - State: NEW');
    
    setTimeout(() => {
        statusElement.innerHTML = '<div class="state runnable">RUNNABLE</div>';
        logMessage(logElement, 'Thread.start() called - State: RUNNABLE');
        
        setTimeout(() => {
            statusElement.innerHTML = '<div class="state running">RUNNING</div>';
            logMessage(logElement, 'Thread scheduled by OS - State: RUNNING');
            
            setTimeout(() => {
                statusElement.innerHTML = '<div class="state waiting">TIMED_WAITING</div>';
                logMessage(logElement, 'Thread.sleep() called - State: TIMED_WAITING');
                
                setTimeout(() => {
                    statusElement.innerHTML = '<div class="state runnable">RUNNABLE</div>';
                    logMessage(logElement, 'Sleep completed - State: RUNNABLE');
                    
                    setTimeout(() => {
                        statusElement.innerHTML = '<div class="state terminated">TERMINATED</div>';
                        logMessage(logElement, 'Thread execution completed - State: TERMINATED');
                    }, 1000);
                }, 2000);
            }, 1500);
        }, 1000);
    }, 1000);
}

function interruptThread() {
    const statusElement = document.getElementById('lifecycle-status');
    const logElement = 'lifecycle-log';
    
    statusElement.innerHTML = '<div class="state terminated">TERMINATED</div>';
    logMessage(logElement, 'Thread interrupted - State: TERMINATED');
}

function resetLifecycle() {
    document.getElementById('lifecycle-status').innerHTML = '';
    clearLog('lifecycle-log');
}

// ============ CONCURRENCY ISSUES TAB FUNCTIONS ============

function demonstrateRaceCondition() {
    const counterElement = document.getElementById('race-counter');
    const logElement = 'race-log';
    
    raceConditionCounter = 0;
    counterElement.textContent = raceConditionCounter;
    clearLog(logElement);
    
    logMessage(logElement, 'Starting race condition demonstration...');
    logMessage(logElement, 'Creating 5 threads to increment counter 1000 times each');
    
    // Simulate race condition with multiple "threads"
    for (let i = 1; i <= 5; i++) {
        simulateRaceConditionThread(i, logElement, counterElement);
    }
    
    setTimeout(() => {
        logMessage(logElement, `Expected result: 5000, Actual result: ${raceConditionCounter}`);
        logMessage(logElement, 'Race condition detected! Results are unpredictable.');
    }, 3000);
}

function simulateRaceConditionThread(threadId, logElement, counterElement) {
    logMessage(logElement, `Thread ${threadId} started`);
    
    let iterations = 0;
    const interval = setInterval(() => {
        // Simulate non-atomic increment (race condition)
        const temp = raceConditionCounter;
        setTimeout(() => {
            raceConditionCounter = temp + 1;
            counterElement.textContent = raceConditionCounter;
        }, Math.random() * 5);
        
        iterations++;
        if (iterations >= 200) { // Reduced for demo purposes
            clearInterval(interval);
            logMessage(logElement, `Thread ${threadId} completed`);
        }
    }, 10);
}

function clearRaceDemo() {
    document.getElementById('race-counter').textContent = '0';
    clearLog('race-log');
    raceConditionCounter = 0;
}

function demonstrateDeadlock() {
    const statusElement = document.getElementById('deadlock-status');
    const logElement = 'deadlock-log';
    
    clearLog(logElement);
    statusElement.innerHTML = `
        <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <div class="thread blocked">Thread 1<br>Waiting for Lock B</div>
            <div class="thread blocked">Thread 2<br>Waiting for Lock A</div>
        </div>
    `;
    
    logMessage(logElement, 'Demonstrating deadlock scenario...');
    logMessage(logElement, 'Thread 1: Acquired Lock A, trying to acquire Lock B');
    logMessage(logElement, 'Thread 2: Acquired Lock B, trying to acquire Lock A');
    logMessage(logElement, 'DEADLOCK: Both threads waiting indefinitely!');
    logMessage(logElement, 'Solution: Always acquire locks in the same order');
}

function clearDeadlockDemo() {
    document.getElementById('deadlock-status').innerHTML = '';
    clearLog('deadlock-log');
}

// ============ SOLUTIONS TAB FUNCTIONS ============

function demonstrateSynchronized() {
    const counterElement = document.getElementById('sync-counter');
    const logElement = 'solutions-log';
    
    syncCounter = 0;
    counterElement.textContent = syncCounter;
    
    logMessage(logElement, 'Testing synchronized solution...');
    logMessage(logElement, 'Creating 5 threads with synchronized increment');
    
    // Simulate synchronized access (no race condition)
    for (let i = 1; i <= 5; i++) {
        simulateSynchronizedThread(i, logElement, counterElement);
    }
    
    setTimeout(() => {
        logMessage(logElement, `Synchronized result: ${syncCounter} (Expected: 1000)`);
        logMessage(logElement, 'SUCCESS: No race condition with synchronization!');
    }, 3000);
}

function simulateSynchronizedThread(threadId, logElement, counterElement) {
    logMessage(logElement, `Synchronized Thread ${threadId} started`);
    
    let iterations = 0;
    const interval = setInterval(() => {
        // Simulate atomic/synchronized increment (no race condition)
        syncCounter++;
        counterElement.textContent = syncCounter;
        
        iterations++;
        if (iterations >= 200) {
            clearInterval(interval);
            logMessage(logElement, `Synchronized Thread ${threadId} completed`);
        }
    }, 10);
}

function demonstrateAtomic() {
    const counterElement = document.getElementById('atomic-counter');
    const logElement = 'solutions-log';
    
    atomicCounter = 0;
    counterElement.textContent = atomicCounter;
    
    logMessage(logElement, 'Testing atomic operations...');
    logMessage(logElement, 'Using AtomicInteger for thread-safe operations');
    
    // Simulate atomic operations
    for (let i = 1; i <= 5; i++) {
        simulateAtomicThread(i, logElement, counterElement);
    }
    
    setTimeout(() => {
        logMessage(logElement, `Atomic result: ${atomicCounter} (Expected: 1000)`);
        logMessage(logElement, 'SUCCESS: Atomic operations are thread-safe!');
    }, 3000);
}

function simulateAtomicThread(threadId, logElement, counterElement) {
    logMessage(logElement, `Atomic Thread ${threadId} started`);
    
    let iterations = 0;
    const interval = setInterval(() => {
        // Simulate atomic increment
        atomicCounter++;
        counterElement.textContent = atomicCounter;
        
        iterations++;
        if (iterations >= 200) {
            clearInterval(interval);
            logMessage(logElement, `Atomic Thread ${threadId} completed`);
        }
    }, 8);
}

function demonstrateLocks() {
    const counterElement = document.getElementById('lock-counter');
    const logElement = 'solutions-log';
    
    lockCounter = 0;
    counterElement.textContent = lockCounter;
    
    logMessage(logElement, 'Testing ReentrantLock solution...');
    logMessage(logElement, 'Using explicit locks for thread safety');
    
    // Simulate lock-based synchronization
    for (let i = 1; i <= 5; i++) {
        simulateLockThread(i, logElement, counterElement);
    }
    
    setTimeout(() => {
        logMessage(logElement, `Lock result: ${lockCounter} (Expected: 1000)`);
        logMessage(logElement, 'SUCCESS: Explicit locks provide thread safety!');
    }, 3000);
}

function simulateLockThread(threadId, logElement, counterElement) {
    logMessage(logElement, `Lock Thread ${threadId} started`);
    
    let iterations = 0;
    const interval = setInterval(() => {
        // Simulate lock-protected increment
        lockCounter++;
        counterElement.textContent = lockCounter;
        
        iterations++;
        if (iterations >= 200) {
            clearInterval(interval);
            logMessage(logElement, `Lock Thread ${threadId} completed`);
        }
    }, 12);
}

function clearSolutionsDemo() {
    document.getElementById('sync-counter').textContent = '0';
    document.getElementById('atomic-counter').textContent = '0';
    document.getElementById('lock-counter').textContent = '0';
    clearLog('solutions-log');
    syncCounter = 0;
    atomicCounter = 0;
    lockCounter = 0;
}

// ============ SYNCHRONIZATION TAB FUNCTIONS ============

function startProducerConsumer() {
    if (producerConsumerActive) return;
    
    producerConsumerActive = true;
    queue = [];
    const queueElement = document.getElementById('queue-contents');
    const sizeElement = document.getElementById('queue-size');
    const logElement = 'producer-consumer-log';
    
    clearLog(logElement);
    logMessage(logElement, 'Starting Producer-Consumer demonstration...');
    
    // Producer simulation
    const producerInterval = setInterval(() => {
        if (!producerConsumerActive) {
            clearInterval(producerInterval);
            return;
        }
        
        if (queue.length < 5) {
            const item = Math.floor(Math.random() * 100);
            queue.push(item);
            queueElement.textContent = `[${queue.join(', ')}]`;
            sizeElement.textContent = queue.length;
            logMessage(logElement, `Producer: Added item ${item} to queue`);
        } else {
            logMessage(logElement, 'Producer: Queue full, waiting...');
        }
    }, 1500);
    
    // Consumer simulation
    const consumerInterval = setInterval(() => {
        if (!producerConsumerActive) {
            clearInterval(consumerInterval);
            return;
        }
        
        if (queue.length > 0) {
            const item = queue.shift();
            queueElement.textContent = `[${queue.join(', ')}]`;
            sizeElement.textContent = queue.length;
            logMessage(logElement, `Consumer: Consumed item ${item} from queue`);
        } else {
            logMessage(logElement, 'Consumer: Queue empty, waiting...');
        }
    }, 2000);
    
    producerConsumerIntervals = [producerInterval, consumerInterval];
}

function stopProducerConsumer() {
    producerConsumerActive = false;
    producerConsumerIntervals.forEach(interval => clearInterval(interval));
    producerConsumerIntervals = [];
    logMessage('producer-consumer-log', 'Producer-Consumer demo stopped');
}

function clearProducerConsumer() {
    stopProducerConsumer();
    queue = [];
    document.getElementById('queue-contents').textContent = '[]';
    document.getElementById('queue-size').textContent = '0';
    clearLog('producer-consumer-log');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set up initial state
    showTab('basics');
    
    // Add some interactive hints
    const threads = document.querySelectorAll('.thread');
    threads.forEach(thread => {
        thread.title = 'Click to cycle through thread states';
    });
    
    console.log('Multi-threading demo initialized successfully!');
});