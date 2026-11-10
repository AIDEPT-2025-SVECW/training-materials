/**
 * Inter-Thread Communication Demonstration in Java
 * 
 * Demonstrates:
 * 1. The wait() and notify() mechanisms
 * 2. Why wait() must be called in a while loop
 * 3. Simple alternating Producer-Consumer coordination with simple prints
 */
public class InterThreadCommunicationDemo {

    // A simple 1-item shared buffer
    static class SimpleBuffer {
        private int data;
        private boolean hasData = false;

        // Producer calls this
        public synchronized void produce(int value) {
            // Wait while buffer is full
            while (hasData) {
                try {
                    wait(); // Releases lock and enters Wait Set
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }

            this.data = value;
            this.hasData = true;
            System.out.println("  [Producer] Produced data item: " + value);

            // Notify consumer that data is ready
            notify();
        }

        // Consumer calls this
        public synchronized int consume() {
            // Wait while buffer is empty
            while (!hasData) {
                try {
                    wait(); // Releases lock and enters Wait Set
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }

            int value = this.data;
            this.hasData = false;
            System.out.println("  [Consumer] Consumed data item: " + value);

            // Notify producer that buffer is empty
            notify();
            return value;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================");
        System.out.println("    INTER-THREAD COMMUNICATION: wait() & notify() DEMO    ");
        System.out.println("==========================================================");

        SimpleBuffer buffer = new SimpleBuffer();

        // Producer Thread
        Thread producer = new Thread(() -> {
            for (int i = 1; i <= 3; i++) {
                buffer.produce(i * 100);
                try { Thread.sleep(50); } catch (InterruptedException ignored) {}
            }
        }, "ProducerThread");

        // Consumer Thread
        Thread consumer = new Thread(() -> {
            for (int i = 1; i <= 3; i++) {
                buffer.consume();
                try { Thread.sleep(50); } catch (InterruptedException ignored) {}
            }
        }, "ConsumerThread");

        consumer.start(); // Start consumer first to prove it waits!
        Thread.sleep(100);
        producer.start();

        producer.join();
        consumer.join();

        System.out.println("\n==========================================================");
        System.out.println("Inter-thread communication demonstrated successfully!");
        System.out.println("==========================================================");
    }
}
