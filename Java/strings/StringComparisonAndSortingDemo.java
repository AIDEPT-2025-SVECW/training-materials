/**
 * Topic: String Comparison Methods, == vs .equals(), and Lexicographical Sorting
 * Real-World Context: Indian NetBanking OTP & College Student Roll-Call Sorting
 */
public class StringComparisonAndSortingDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("  SCENARIO 1: == vs .equals() (NETBANKING OTP)    ");
        System.out.println("==================================================");

        // Server generated OTP in memory:
        String serverOtp = "849201";

        // Customer enters OTP through mobile app (parsed into new Heap object):
        String userOtp = new String("849201");

        // Danger of ==
        System.out.println("Using == operator       : " + (serverOtp == userOtp)); // false!
        if (serverOtp == userOtp) {
            System.out.println("Transaction Approved (==)");
        } else {
            System.out.println("[BUGGY REJECTION] serverOtp == userOtp failed due to memory address difference!");
        }

        // Correct way using .equals()
        System.out.println("Using .equals() method  : " + serverOtp.equals(userOtp)); // true!
        if (serverOtp.equals(userOtp)) {
            System.out.println("[SUCCESS] OTP Verified via .equals()! Payment of Rs. 4,500 Authorized.");
        }

        System.out.println("\n==================================================");
        System.out.println("  SCENARIO 2: CASE-INSENSITIVE CITY MATCHING      ");
        System.out.println("==================================================");

        String registeredCity = "Hyderabad";
        String userSearchInput = "hyderabad";

        System.out.println("Strict equals()         : " + registeredCity.equals(userSearchInput));          // false
        System.out.println("equalsIgnoreCase()      : " + registeredCity.equalsIgnoreCase(userSearchInput));// true

        // contentEquals with StringBuilder:
        StringBuilder dynamicBuffer = new StringBuilder("Hyderabad");
        System.out.println("contentEquals(StringBuilder) : " + registeredCity.contentEquals(dynamicBuffer)); // true

        System.out.println("\n==================================================");
        System.out.println("  SCENARIO 3: SORTING STUDENT NAMES (compareTo)   ");
        System.out.println("==================================================");

        String[] students = { "Vikram Reddy", "Ananya Sharma", "Deepak Verma", "Bhavna Patel", "Aditi Rao" };

        System.out.println("Before Sorting (Unordered Admissions):");
        for (String s : students) System.out.println(" - " + s);

        // Bubble Sort using compareTo to arrange alphabetically:
        for (int i = 0; i < students.length - 1; i++) {
            for (int j = 0; j < students.length - 1 - i; j++) {
                // If students[j] comes alphabetically AFTER students[j+1], swap them!
                if (students[j].compareTo(students[j + 1]) > 0) {
                    String temp = students[j];
                    students[j] = students[j + 1];
                    students[j + 1] = temp;
                }
            }
        }

        System.out.println("\nAfter Sorting (Alphabetical Class Roll-Call Register):");
        for (int i = 0; i < students.length; i++) {
            System.out.println(" Roll No " + (i + 1) + ": " + students[i]);
        }
    }
}

