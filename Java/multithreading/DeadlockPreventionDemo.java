import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Deadlock Prevention Demonstration (Indian Bank Account Transfer Scenario)
 *
 * Demonstrates two production-grade precautions to prevent deadlock:
 * 1. Global Lock Ordering: Always lock lower account ID first (breaks Circular Wait)
 * 2. Timed Locks (ReentrantLock.tryLock): Back off instead of waiting forever (breaks Hold & Wait)
 */
public class DeadlockPreventionDemo {

    static class BankAccount {
        private final int id;
        private final String owner;
        private int balance;
        private final ReentrantLock lock = new ReentrantLock();

        public BankAccount(int id, String owner, int balance) {
            this.id = id;
            this.owner = owner;
            this.balance = balance;
        }

        public int getId() {
            return id;
        }

        public String getOwner() {
            return owner;
        }

        public int getBalance() {
            return balance;
        }

        public void debit(int amount) {
            balance -= amount;
        }

        public void credit(int amount) {
            balance += amount;
        }
    }

    // -------------------------------------------------------------------------
    // PRECAUTION 1: Consistent Global Lock Ordering (using synchronized)
    // -------------------------------------------------------------------------
    public static void transferOrdered(BankAccount from, BankAccount to, int amount) {
        if (from.getId() == to.getId()) {
            return; // Self-transfer guard
        }
        // Global ordering: always acquire the lower account ID lock first
        BankAccount firstLock = (from.getId() < to.getId()) ? from : to;
        BankAccount secondLock = (from.getId() < to.getId()) ? to : from;

        synchronized (firstLock) {
            // Brief pause would have deadlocked opposite-order code, but stays safe here!
            try { Thread.sleep(40); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }

            synchronized (secondLock) {
                if (from.getBalance() >= amount) {
                    from.debit(amount);
                    to.credit(amount);
                    System.out.println("  [Ordered][" + Thread.currentThread().getName() + "] Transferred Rs."
                            + amount + " from " + from.getOwner() + " to " + to.getOwner());
                } else {
                    System.out.println("  [Ordered][" + Thread.currentThread().getName() + "] Insufficient balance for " + from.getOwner());
                }
            }
        }
    }

    // -------------------------------------------------------------------------
    // PRECAUTION 2: Timed tryLock() with Backoff (using ReentrantLock)
    // -------------------------------------------------------------------------
    public static boolean transferWithTimeout(BankAccount from, BankAccount to, int amount) {
        if (from.getId() == to.getId()) {
            return false;
        }
        for (int attempt = 1; attempt <= 6; attempt++) {
            boolean gotFirst = false;
            boolean gotSecond = false;
            try {
                gotFirst = from.lock.tryLock(50, TimeUnit.MILLISECONDS);
                if (gotFirst) {
                    // Simulate slight overlap between acquiring first and second lock
                    Thread.sleep(20);
                    gotSecond = to.lock.tryLock(50, TimeUnit.MILLISECONDS);
                    if (gotSecond) {
                        if (from.getBalance() >= amount) {
                            from.debit(amount);
                            to.credit(amount);
                            System.out.println("  [tryLock][" + Thread.currentThread().getName() + "] Transferred Rs."
                                    + amount + " from " + from.getOwner() + " to " + to.getOwner()
                                    + " (attempt " + attempt + ")");
                        }
                        return true;
                    }
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return false;
            } finally {
                // Always release acquired locks in reverse order inside finally!
                if (gotSecond) to.lock.unlock();
                if (gotFirst) from.lock.unlock();
            }

            // Randomized backoff prevents both threads from retrying in lockstep (prevents Livelock)
            try { Thread.sleep(15 + (long) (Math.random() * 35)); } catch (InterruptedException e) { Thread.currentThread().interrupt(); return false; }
        }
        System.out.println("  [tryLock][" + Thread.currentThread().getName() + "] Could not complete transfer safely after retries.");
        return false;
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================");
        System.out.println("       DEADLOCK PREVENTION IN JAVA: SAFE TRANSFERS        ");
        System.out.println("==========================================================");

        // PART 1: Safe Global Lock Ordering
        BankAccount rahul = new BankAccount(101, "Rahul", 10000);
        BankAccount pooja = new BankAccount(102, "Pooja", 8000);

        System.out.println("\n--- Part 1: Consistent Lock Ordering (ID 101 -> ID 102) ---");
        Thread t1 = new Thread(() -> transferOrdered(rahul, pooja, 2000), "Transfer-1");
        Thread t2 = new Thread(() -> transferOrdered(pooja, rahul, 1500), "Transfer-2");

        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("  Final Balances -> Rahul: Rs." + rahul.getBalance() + ", Pooja: Rs." + pooja.getBalance());

        // PART 2: Timed Locks with tryLock()
        BankAccount amit = new BankAccount(201, "Amit", 6000);
        BankAccount neha = new BankAccount(202, "Neha", 5000);

        System.out.println("\n--- Part 2: ReentrantLock tryLock() with Timeout & Retry ---");
        Thread t3 = new Thread(() -> transferWithTimeout(amit, neha, 1000), "Transfer-3");
        Thread t4 = new Thread(() -> transferWithTimeout(neha, amit, 500), "Transfer-4");

        t3.start();
        t4.start();
        t3.join();
        t4.join();

        System.out.println("  Final Balances -> Amit: Rs." + amit.getBalance() + ", Neha: Rs." + neha.getBalance());
        System.out.println("\n==========================================================");
        System.out.println("All concurrent opposite transfers completed without deadlock!");
        System.out.println("==========================================================");
    }
}
