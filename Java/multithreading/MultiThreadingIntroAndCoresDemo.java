/**
 * Introduction to Multithreading & CPU Cores
 * Demonstrates:
 * 1. CPU Cores detection via Runtime.getRuntime().availableProcessors()
 * 2. The Main Thread (created automatically by the JVM)
 * 3. Creating multiple threads from the SAME Thread class
 * 4. Creating threads from DIFFERENT Thread classes
 * 5. Running threads all at once concurrently
 */
public class MultiThreadingIntroAndCoresDemo {

    // -------------------------------------------------------------
    // Example 1: Same Thread Class (creating multiple instances)
    // -------------------------------------------------------------
    static class NumberThread extends Thread {
        public NumberThread(String name) {
            super(name); // assigns a name to the thread
        }

        @Override
        public void run() {
            for (int i = 1; i <= 3; i++) {
                System.out.println("  [" + getName() + "] Count: " + i);
                try {
                    Thread.sleep(100); // small pause to observe concurrent interleaving
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }

    // -------------------------------------------------------------
    // Example 2: Different Thread Classes (different tasks)
    // -------------------------------------------------------------
    static class TaskAThread extends Thread {
        public TaskAThread(String name) {
            super(name);
        }

        @Override
        public void run() {
            for (int i = 1; i <= 3; i++) {
                System.out.println("  [" + getName() + "] Task A printing step " + i);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }

    static class TaskBThread extends Thread {
        public TaskBThread(String name) {
            super(name);
        }

        @Override
        public void run() {
            for (int i = 1; i <= 3; i++) {
                System.out.println("  [" + getName() + "] Task B printing step " + i);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==================================================");
        System.out.println("   JAVA MULTITHREADING & CPU CORES DEMO          ");
        System.out.println("==================================================");

        // 1. Hardware CPU Cores Detection
        int cores = Runtime.getRuntime().availableProcessors();
        System.out.println("\n[STEP 1: DETECT CPU CORES]");
        System.out.println("  Available CPU Cores: " + cores);
        if (cores > 1) {
            System.out.println("  >> Multi-Core CPU detected! True parallel hardware execution is supported.");
        } else {
            System.out.println("  >> Single-Core CPU detected. Runs via time-sliced concurrency.");
        }

        // 2. Main Thread Inspection
        System.out.println("\n[STEP 2: THE DEFAULT MAIN THREAD]");
        Thread mainThread = Thread.currentThread();
        System.out.println("  Thread Name  : " + mainThread.getName());
        System.out.println("  Thread State : " + mainThread.getState());
        System.out.println("  Thread ID    : " + mainThread.getId());

        // 3. Creating Multiple Threads from the SAME Thread Class
        System.out.println("\n[STEP 3: MULTIPLE THREADS FROM THE SAME CLASS]");
        NumberThread t1 = new NumberThread("Thread-1");
        NumberThread t2 = new NumberThread("Thread-2");

        System.out.println("  Starting Thread-1 and Thread-2 at once...");
        t1.start(); // starts Thread-1 concurrently
        t2.start(); // starts Thread-2 concurrently

        // Wait for both threads to finish before moving to Step 4
        t1.join();
        t2.join();

        // 4. Creating Threads from DIFFERENT Thread Classes
        System.out.println("\n[STEP 4: THREADS FROM DIFFERENT CLASSES]");
        TaskAThread threadA = new TaskAThread("TaskA-Worker");
        TaskBThread threadB = new TaskBThread("TaskB-Worker");

        System.out.println("  Starting TaskA-Worker and TaskB-Worker at once...");
        threadA.start(); // starts TaskA concurrently
        threadB.start(); // starts TaskB concurrently

        // Wait for both threads to finish
        threadA.join();
        threadB.join();

        System.out.println("\n[SUMMARY]");
        System.out.println("  All threads executed and completed. Main thread finishes!");
    }
}
