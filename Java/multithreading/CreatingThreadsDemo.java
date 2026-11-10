import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

/**
 * Creating Threads in Java Demonstration
 * 
 * Demonstrates the 3 mechanisms to create and run threads in Java:
 * 1. Extending java.lang.Thread
 * 2. Implementing java.lang.Runnable (Class and Lambda)
 * 3. Implementing java.util.concurrent.Callable with FutureTask
 */
public class CreatingThreadsDemo {

    // -------------------------------------------------------------------------
    // Approach 1: Extending the Thread class
    // -------------------------------------------------------------------------
    static class MyThread extends Thread {
        public MyThread(String name) {
            super(name); // Set custom thread name
        }

        @Override
        public void run() {
            System.out.println("  [Thread Class] Hello from MyThread! Thread Name: " + getName());
        }
    }

    // -------------------------------------------------------------------------
    // Approach 2: Implementing the Runnable interface
    // -------------------------------------------------------------------------
    static class MyRunnable implements Runnable {
        @Override
        public void run() {
            System.out.println("  [Runnable] Hello from MyRunnable! Thread Name: " + Thread.currentThread().getName());
        }
    }

    // -------------------------------------------------------------------------
    // Approach 3: Implementing the Callable interface
    // -------------------------------------------------------------------------
    static class MyCallable implements Callable<String> {
        @Override
        public String call() throws Exception {
            System.out.println("  [Callable] Computing on thread: " + Thread.currentThread().getName());
            return "SUCCESS_DATA_100"; // Can return a value!
        }
    }

    public static void main(String[] args) throws InterruptedException, ExecutionException {
        System.out.println("==========================================================");
        System.out.println("     CREATING THREADS IN JAVA: THREE CORE MECHANISMS      ");
        System.out.println("==========================================================");

        // --- 1. Extending Thread Class ---
        System.out.println("\n--- 1. Extending Thread Class ---");
        MyThread t1 = new MyThread("WorkerThread-1");
        t1.start();
        t1.join(); // Wait so console output displays in order

        // --- 2. Implementing Runnable Interface ---
        System.out.println("\n--- 2. Implementing Runnable Interface ---");
        MyRunnable myTask = new MyRunnable();
        Thread t2 = new Thread(myTask, "WorkerRunnable-2");
        t2.start();
        t2.join();

        // --- 2b. Runnable using Modern Lambda (Java 8+) ---
        System.out.println("\n--- 2b. Runnable using Modern Lambda (Java 8+) ---");
        Thread t3 = new Thread(() -> {
            System.out.println("  [Lambda] Quick inline task running on: " + Thread.currentThread().getName());
        }, "LambdaThread-3");
        t3.start();
        t3.join();

        // --- 3. Implementing Callable & FutureTask ---
        System.out.println("\n--- 3. Implementing Callable & FutureTask ---");
        Callable<String> callableTask = new MyCallable();
        FutureTask<String> futureTask = new FutureTask<>(callableTask);
        Thread t4 = new Thread(futureTask, "CallableThread-4");
        t4.start();

        // futureTask.get() blocks until the thread finishes and returns the result
        String result = futureTask.get();
        System.out.println("  [Main Thread] Received returned result from Callable: " + result);

        System.out.println("\n==========================================================");
        System.out.println("All thread creation demonstrations executed successfully!");
        System.out.println("==========================================================");
    }
}

