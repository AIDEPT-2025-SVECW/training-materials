/**
 * Thread Priorities and Daemon Threads Demonstration
 * 
 * Demonstrates:
 * 1. Thread priority constants (MIN_PRIORITY=1, NORM_PRIORITY=5, MAX_PRIORITY=10)
 * 2. Priority inheritance from the parent (main) thread
 * 3. Changing priorities via setPriority() and inspecting with getPriority()
 * 4. User thread vs Daemon thread behavior with setDaemon() and isDaemon()
 * 5. JVM shutdown behavior when only daemon threads remain
 */
public class ThreadPrioritiesDaemonDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================");
        System.out.println("    THREAD PRIORITIES & DAEMON THREADS DEMONSTRATION      ");
        System.out.println("==========================================================");

        // ---------------------------------------------------------------------
        // 1. Thread Priority Constants & Inspection
        // ---------------------------------------------------------------------
        System.out.println("\n--- 1. Thread Priority Constants ---");
        System.out.println("  Thread.MIN_PRIORITY  : " + Thread.MIN_PRIORITY);  // 1
        System.out.println("  Thread.NORM_PRIORITY : " + Thread.NORM_PRIORITY); // 5
        System.out.println("  Thread.MAX_PRIORITY  : " + Thread.MAX_PRIORITY);  // 10

        Thread current = Thread.currentThread();
        System.out.println("\n  Main Thread Priority: " + current.getPriority()); // 5
        System.out.println("  Main Thread isDaemon: " + current.isDaemon());     // false (user thread)

        // ---------------------------------------------------------------------
        // 2. Setting Custom Thread Priorities
        // ---------------------------------------------------------------------
        System.out.println("\n--- 2. Setting Custom Thread Priorities ---");
        Thread lowPriorityThread = new Thread(() -> {
            System.out.println("  [LowThread] Running with Priority: " + Thread.currentThread().getPriority());
        }, "LowThread");
        lowPriorityThread.setPriority(Thread.MIN_PRIORITY); // 1

        Thread highPriorityThread = new Thread(() -> {
            System.out.println("  [HighThread] Running with Priority: " + Thread.currentThread().getPriority());
        }, "HighThread");
        highPriorityThread.setPriority(Thread.MAX_PRIORITY); // 10

        lowPriorityThread.start();
        highPriorityThread.start();
        lowPriorityThread.join();
        highPriorityThread.join();

        // ---------------------------------------------------------------------
        // 3. User Thread vs Daemon Thread
        // ---------------------------------------------------------------------
        System.out.println("\n--- 3. User Thread vs Daemon Thread ---");
        Thread userThread = new Thread(() -> {
            System.out.println("  [UserThread] Started. isDaemon: " + Thread.currentThread().isDaemon());
            System.out.println("  [UserThread] JVM will WAIT for me to finish before exiting!");
        }, "UserThread");

        Thread daemonThread = new Thread(() -> {
            System.out.println("  [DaemonThread] Started. isDaemon: " + Thread.currentThread().isDaemon());
            System.out.println("  [DaemonThread] I provide background service (like Garbage Collection).");
            try {
                // Sleep for 3 seconds; but JVM exits when UserThread & main finish!
                Thread.sleep(3000);
                System.out.println("  [DaemonThread] This will NOT print if JVM exits early!");
            } catch (InterruptedException e) {
                System.out.println("  [DaemonThread] Interrupted.");
            }
        }, "DaemonServiceThread");

        // Set daemonThread to true BEFORE calling start()
        daemonThread.setDaemon(true);

        userThread.start();
        daemonThread.start();

        userThread.join();
        // Give daemon thread a brief moment to print initial output
        Thread.sleep(200);

        System.out.println("\n--- 4. JVM Automatic Shutdown ---");
        System.out.println("  [Main Thread] Main thread and UserThread have both finished.");
        System.out.println("  [Main Thread] Only DaemonServiceThread is running.");
        System.out.println("  [Main Thread] Result: JVM terminates immediately without waiting for daemon!");
        System.out.println("==========================================================");
    }
}

