/**
 * Topic: StringBuffer vs StringBuilder Deep Dive & Palindrome Checking
 * Real-World Context: High-Speed UPI QR Assembly & Multi-Threaded Ticket Logger
 */
public class StringBufferVsBuilderDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("  SCENARIO 1: FAST UPI RECEIPT VIA StringBuilder   ");
        System.out.println("==================================================");

        // Building dynamic receipt in a single thread without creating garbage objects:
        StringBuilder receipt = new StringBuilder();
        System.out.println("Initial Default Capacity : " + receipt.capacity()); // 16

        // Fluent method chaining with append:
        receipt.append("--- UPI TRANSFER RECEIPT ---\n")
               .append("Txn ID    : UPI-IND-").append(98472910).append("\n")
               .append("Payee VPA : swiggy@icici\n")
               .append("Amount    : Rs. 650.00\n")
               .append("Status    : SUCCESS");

        System.out.println(receipt.toString());
        System.out.println("Length: " + receipt.length() + " | Resized Capacity: " + receipt.capacity());

        // Inserting a discount alert at offset 0:
        receipt.insert(0, "[CASHBACK WON: Rs. 25]\n");
        System.out.println("\nAfter insert() at top:\n" + receipt.toString());

        System.out.println("\n==================================================");
        System.out.println("  SCENARIO 2: PALINDROME CHECK USING reverse()     ");
        System.out.println("==================================================");

        String word1 = "MALAYALAM";
        String word2 = "HYDERABAD";

        checkPalindrome(word1);
        checkPalindrome(word2);

        System.out.println("\n==================================================");
        System.out.println("  SCENARIO 3: THREAD-SAFE StringBuffer SIMULATION ");
        System.out.println("==================================================");

        // Multi-thread safe buffer for concurrent Tatkal passenger allotments:
        StringBuffer sharedAuditLog = new StringBuffer("[IRCTC LOG]");

        // Two worker actions safely appending to the same buffer:
        sharedAuditLog.append(" Seat B1-21 assigned to passenger Ramesh;");
        sharedAuditLog.append(" Seat B1-22 assigned to passenger Suresh;");

        System.out.println("Final Thread-Safe Log Content:\n" + sharedAuditLog.toString());
    }

    private static void checkPalindrome(String text) {
        // 1-Line Reverse: pass text to StringBuilder, reverse, and compare with original
        String reversed = new StringBuilder(text).reverse().toString();

        if (text.equalsIgnoreCase(reversed)) {
            System.out.println("[PALINDROME] '" + text + "' reversed is '" + reversed + "' -> EXACT MATCH!");
        } else {
            System.out.println("[NOT PALINDROME] '" + text + "' reversed is '" + reversed + "'.");
        }
    }
}

