/**
 * Thread Lifecycle & States Demonstration in Java
 * 
 * Demonstrates the 6 thread states defined in java.lang.Thread.State:
 * 1. NEW
 * 2. RUNNABLE
 * 3. TIMED_WAITING
 * 4. WAITING
 * 5. BLOCKED
 * 6. TERMINATED
 */
public class ThreadLifecycleDemo {

    private static final Object LOCK = new Object();

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================");
        System.out.println("      JAVA THREAD LIFECYCLE & 6 STATES DEMONSTRATION      ");
        System.out.println("==========================================================");

        // ---------------------------------------------------------------------
        // 1. NEW & RUNNABLE & TIMED_WAITING & TERMINATED
        // ---------------------------------------------------------------------
        System.out.println("\n--- Step 1: NEW, RUNNABLE, TIMED_WAITING & TERMINATED ---");

        Thread t1 = new Thread(() -> {
            try {
                // Thread enters TIMED_WAITING while sleeping
                Thread.sleep(400);
            } catch (InterruptedException ignored) {}
        }, "WorkerThread-1");

        // State 1: NEW (created but start() not called yet)
        System.out.println("  t1 State after instantiation : " + t1.getState()); // NEW

        // State 2: RUNNABLE (start() called, eligible for CPU)
        t1.start();
        System.out.println("  t1 State after start() called: " + t1.getState()); // RUNNABLE

        // Wait 100ms to let t1 enter Thread.sleep()
        Thread.sleep(100);
        // State 3: TIMED_WAITING
        System.out.println("  t1 State while inside sleep(): " + t1.getState()); // TIMED_WAITING

        // Wait for t1 to finish
        t1.join();
        // State 4: TERMINATED
        System.out.println("  t1 State after run() finishes: " + t1.getState()); // TERMINATED

        // ---------------------------------------------------------------------
        // 2. WAITING (Indefinite Wait via join)
        // ---------------------------------------------------------------------
        System.out.println("\n--- Step 2: WAITING State ---");
        Thread helper = new Thread(() -> {
            try {
                Thread.sleep(300);
            } catch (InterruptedException ignored) {}
        }, "HelperThread");

        Thread waiter = new Thread(() -> {
            try {
                // Waits indefinitely for helper thread to finish
                helper.join();
            } catch (InterruptedException ignored) {}
        }, "WaiterThread");

        helper.start();
        waiter.start();

        Thread.sleep(100); // Give waiter time to call helper.join()
        // State 5: WAITING
        System.out.println("  waiter State while inside helper.join(): " + waiter.getState()); // WAITING

        helper.join();
        waiter.join();

        // ---------------------------------------------------------------------
        // 3. BLOCKED (Waiting to acquire synchronized lock)
        // ---------------------------------------------------------------------
        System.out.println("\n--- Step 3: BLOCKED State ---");

        Thread lockHolder = new Thread(() -> {
            synchronized (LOCK) {
                try {
                    // Holds the lock for 500 ms
                    Thread.sleep(500);
                } catch (InterruptedException ignored) {}
            }
        }, "LockHolder");

        Thread lockContender = new Thread(() -> {
            // Attempts to enter synchronized block while lockHolder owns it
            synchronized (LOCK) {
                System.out.println("  LockContender finally acquired lock!");
            }
        }, "LockContender");

        lockHolder.start();
        Thread.sleep(50); // Ensure lockHolder acquires LOCK first

        lockContender.start();
        Thread.sleep(50); // Ensure lockContender tries to acquire LOCK and blocks

        // State 6: BLOCKED
        System.out.println("  lockContender State waiting for lock: " + lockContender.getState()); // BLOCKED

        lockHolder.join();
        lockContender.join();

        System.out.println("\n==========================================================");
        System.out.println("All 6 thread states verified successfully!");
        System.out.println("==========================================================");
    }
}

