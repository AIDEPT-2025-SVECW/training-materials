/**
 * Race Conditions & Thread Synchronization Demonstration
 * 
 * Demonstrates:
 * 1. A Race Condition with shared mutable state (count++)
 * 2. Why count++ is non-atomic (Read - Modify - Write)
 * 3. Fixing the race condition using Java synchronization (synchronized)
 */
public class RaceConditionAndSyncDemo {

    // -------------------------------------------------------------------------
    // Case 1: Unsynchronized Counter (Causes Race Condition)
    // -------------------------------------------------------------------------
    static class UnsafeCounter {
        private int count = 0;

        // Non-atomic operation: 3 steps (read, increment, write)
        public void increment() {
            count++;
        }

        public int getCount() {
            return count;
        }
    }

    // -------------------------------------------------------------------------
    // Case 2: Synchronized Counter (Thread-Safe)
    // -------------------------------------------------------------------------
    static class SafeCounter {
        private int count = 0;

        // Synchronized: only 1 thread can execute this method at a time
        public synchronized void increment() {
            count++;
        }

        public synchronized int getCount() {
            return count;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================");
        System.out.println("     RACE CONDITIONS & SYNCHRONIZATION DEMONSTRATION      ");
        System.out.println("==========================================================");

        final int INCREMENTS_PER_THREAD = 10000;

        // ---------------------------------------------------------------------
        // PART 1: UNSYNCHRONIZED EXECUTION (RACE CONDITION)
        // ---------------------------------------------------------------------
        System.out.println("\n--- PART 1: Unsafe Counter (No Synchronization) ---");
        UnsafeCounter unsafeCounter = new UnsafeCounter();

        Thread t1 = new Thread(() -> {
            for (int i = 0; i < INCREMENTS_PER_THREAD; i++) {
                unsafeCounter.increment();
            }
        }, "UnsafeWorker-1");

        Thread t2 = new Thread(() -> {
            for (int i = 0; i < INCREMENTS_PER_THREAD; i++) {
                unsafeCounter.increment();
            }
        }, "UnsafeWorker-2");

        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("  Expected Count: " + (INCREMENTS_PER_THREAD * 2));
        System.out.println("  Actual Count  : " + unsafeCounter.getCount());
        if (unsafeCounter.getCount() < INCREMENTS_PER_THREAD * 2) {
            System.out.println("  >> RACE CONDITION DETECTED! Lost updates occurred.");
        } else {
            System.out.println("  >> Race condition may happen intermittently due to scheduling.");
        }

        // ---------------------------------------------------------------------
        // PART 2: SYNCHRONIZED EXECUTION (THREAD-SAFE)
        // ---------------------------------------------------------------------
        System.out.println("\n--- PART 2: Safe Counter (With Synchronization) ---");
        SafeCounter safeCounter = new SafeCounter();

        Thread t3 = new Thread(() -> {
            for (int i = 0; i < INCREMENTS_PER_THREAD; i++) {
                safeCounter.increment();
            }
        }, "SafeWorker-1");

        Thread t4 = new Thread(() -> {
            for (int i = 0; i < INCREMENTS_PER_THREAD; i++) {
                safeCounter.increment();
            }
        }, "SafeWorker-2");

        t3.start();
        t4.start();
        t3.join();
        t4.join();

        System.out.println("  Expected Count: " + (INCREMENTS_PER_THREAD * 2));
        System.out.println("  Actual Count  : " + safeCounter.getCount());
        System.out.println("  >> SUCCESS: Synchronized access guaranteed 100% correctness!");
        System.out.println("==========================================================");
    }
}

