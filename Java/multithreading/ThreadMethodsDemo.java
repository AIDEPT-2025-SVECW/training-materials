/**
 * Thread Execution & Control Methods Demonstration
 * 
 * Demonstrates the 5 foundational thread control methods:
 * 1. start() vs run()
 * 2. Thread.sleep(millis)
 * 3. thread.join()
 * 4. Thread.yield()
 * 5. thread.interrupt()
 */
public class ThreadMethodsDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================");
        System.out.println("     THREAD EXECUTION & CONTROL METHODS DEMONSTRATION     ");
        System.out.println("==========================================================");

        // ---------------------------------------------------------------------
        // 1. start() vs run()
        // ---------------------------------------------------------------------
        System.out.println("\n--- 1. Testing start() vs run() ---");
        Thread directRunThread = new Thread(() -> {
            System.out.println("  [directRunThread] Executing on: " + Thread.currentThread().getName());
        });

        System.out.println("Calling .run() directly:");
        directRunThread.run(); // Runs on main thread! No new thread created.

        Thread actualThread = new Thread(() -> {
            System.out.println("  [actualThread] Executing on: " + Thread.currentThread().getName());
        }, "Worker-NewThread");

        System.out.println("Calling .start():");
        actualThread.start(); // Spawns new thread Worker-NewThread!
        actualThread.join();

        // ---------------------------------------------------------------------
        // 2. Thread.sleep()
        // ---------------------------------------------------------------------
        System.out.println("\n--- 2. Testing Thread.sleep(400) ---");
        Thread sleeper = new Thread(() -> {
            System.out.println("  [Sleeper] Thread started. Going to sleep for 400 ms...");
            try {
                Thread.sleep(400);
            } catch (InterruptedException e) {
                System.out.println("  [Sleeper] Woken up early!");
            }
            System.out.println("  [Sleeper] Woke up! Finished sleep.");
        }, "SleeperThread");

        sleeper.start();
        sleeper.join();

        // ---------------------------------------------------------------------
        // 3. thread.join()
        // ---------------------------------------------------------------------
        System.out.println("\n--- 3. Testing thread.join() ---");
        Thread childThread = new Thread(() -> {
            System.out.println("  [ChildThread] Step 1 starting...");
            try { Thread.sleep(200); } catch (InterruptedException ignored) {}
            System.out.println("  [ChildThread] Step 2 starting...");
            try { Thread.sleep(200); } catch (InterruptedException ignored) {}
            System.out.println("  [ChildThread] All steps completed!");
        }, "ChildThread");

        System.out.println("Main: Starting childThread...");
        childThread.start();
        System.out.println("Main: Calling childThread.join()... Main is waiting!");
        childThread.join(); // Main thread pauses right here until childThread finishes!
        System.out.println("Main: Resumed! Child thread has completed.");

        // ---------------------------------------------------------------------
        // 4. Thread.yield()
        // ---------------------------------------------------------------------
        System.out.println("\n--- 4. Testing Thread.yield() ---");
        Runnable yieldTask = () -> {
            for (int i = 1; i <= 3; i++) {
                System.out.println("  [" + Thread.currentThread().getName() + "] Count: " + i);
                Thread.yield(); // Voluntary hint to CPU scheduler
            }
        };

        Thread y1 = new Thread(yieldTask, "YieldThread-A");
        Thread y2 = new Thread(yieldTask, "YieldThread-B");
        y1.start();
        y2.start();
        y1.join();
        y2.join();

        // ---------------------------------------------------------------------
        // 5. thread.interrupt()
        // ---------------------------------------------------------------------
        System.out.println("\n--- 5. Testing thread.interrupt() ---");
        Thread sleepingWorker = new Thread(() -> {
            System.out.println("  [InterruptWorker] Sleeping for 4000 ms (4 seconds)...");
            try {
                Thread.sleep(4000);
                System.out.println("  [InterruptWorker] Finished sleep normally.");
            } catch (InterruptedException e) {
                System.out.println("  [InterruptWorker] Received interrupt! InterruptedException caught.");
                System.out.println("  [InterruptWorker] Safely exiting early.");
            }
        }, "InterruptWorker");

        sleepingWorker.start();
        Thread.sleep(200); // Give worker 200ms to enter sleep
        System.out.println("Main: Calling sleepingWorker.interrupt()...");
        sleepingWorker.interrupt();
        sleepingWorker.join();

        System.out.println("\n==========================================================");
        System.out.println("All thread control methods tested successfully!");
        System.out.println("==========================================================");
    }
}

