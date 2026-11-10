/**
 * Synchronized Methods & Synchronized Blocks Demonstration
 * 
 * Demonstrates:
 * 1. Synchronized Instance Method (locks on 'this')
 * 2. Synchronized Block with Private Lock (fine-grained locking)
 * 3. Static Synchronized Method (locks on ClassName.class)
 * 4. Reentrant Nature of Java Intrinsic Locks
 */
public class SynchronizedMethodsAndBlocksDemo {

    // -------------------------------------------------------------------------
    // 1. Synchronized Instance Method
    // -------------------------------------------------------------------------
    static class InstanceSyncDemo {
        public synchronized void printNumbers(String threadName) {
            System.out.println("  [" + threadName + "] Entered synchronized method (Lock: this)");
            for (int i = 1; i <= 3; i++) {
                System.out.println("  [" + threadName + "] Method count: " + i);
                try { Thread.sleep(50); } catch (InterruptedException ignored) {}
            }
            System.out.println("  [" + threadName + "] Exiting synchronized method");
        }
    }

    // -------------------------------------------------------------------------
    // 2. Synchronized Block with Private Lock (Fine-Grained)
    // -------------------------------------------------------------------------
    static class BlockSyncDemo {
        private final Object lock = new Object(); // Private lock object

        public void executeTask(String threadName) {
            // Unsynchronized section runs concurrently!
            System.out.println("  [" + threadName + "] Concurrent preparation (outside lock)");

            // Synchronized block: only this critical section is locked
            synchronized (lock) {
                System.out.println("  [" + threadName + "] >> ENTERED synchronized block (Lock: private lock)");
                for (int i = 1; i <= 2; i++) {
                    System.out.println("  [" + threadName + "] >> Critical work: " + i);
                    try { Thread.sleep(50); } catch (InterruptedException ignored) {}
                }
                System.out.println("  [" + threadName + "] >> EXITED synchronized block");
            }
        }
    }

    // -------------------------------------------------------------------------
    // 3. Reentrant Lock Demonstration
    // -------------------------------------------------------------------------
    static class ReentrantDemo {
        public synchronized void outerMethod() {
            System.out.println("  [OuterMethod] Acquired lock. Now calling innerMethod()...");
            innerMethod(); // Re-enters synchronized method on the SAME lock!
            System.out.println("  [OuterMethod] Successfully completed innerMethod()");
        }

        public synchronized void innerMethod() {
            System.out.println("  [InnerMethod] Successfully re-entered with same lock! No deadlock occurred.");
        }
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================");
        System.out.println("   SYNCHRONIZED METHODS & BLOCKS: CONCURRENCY DEMO        ");
        System.out.println("==========================================================");

        // --- 1. Synchronized Method Test ---
        System.out.println("\n--- 1. Testing Synchronized Instance Method ---");
        InstanceSyncDemo methodDemo = new InstanceSyncDemo();

        Thread t1 = new Thread(() -> methodDemo.printNumbers("Thread-1"));
        Thread t2 = new Thread(() -> methodDemo.printNumbers("Thread-2"));

        t1.start();
        t2.start();
        t1.join();
        t2.join();

        // --- 2. Synchronized Block Test ---
        System.out.println("\n--- 2. Testing Synchronized Block (Fine-Grained) ---");
        BlockSyncDemo blockDemo = new BlockSyncDemo();

        Thread t3 = new Thread(() -> blockDemo.executeTask("Thread-A"));
        Thread t4 = new Thread(() -> blockDemo.executeTask("Thread-B"));

        t3.start();
        t4.start();
        t3.join();
        t4.join();

        // --- 3. Reentrant Lock Test ---
        System.out.println("\n--- 3. Testing Lock Reentrancy ---");
        ReentrantDemo reentrantDemo = new ReentrantDemo();
        reentrantDemo.outerMethod();

        System.out.println("\n==========================================================");
        System.out.println("All synchronization mechanisms demonstrated successfully!");
        System.out.println("==========================================================");
    }
}

