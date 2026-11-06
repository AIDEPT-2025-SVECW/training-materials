/**
 * Topic: Java String Fundamentals, String Constant Pool (SCP) & Immutability
 * Context: Indian Citizen Registration & City Tracking
 */
public class StringMemoryAndPoolDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("  DEMO 1: STRING LITERALS vs 'new' KEYWORD (SCP)  ");
        System.out.println("==================================================");

        // 1. Two String literals pointing to the exact same object in SCP:
        String city1 = "Bengaluru";
        String city2 = "Bengaluru";

        // 2. Created using 'new' -> forces separate objects in General Heap:
        String city3 = new String("Bengaluru");
        String city4 = new String("Bengaluru");

        // Reference comparison (== checks memory address):
        System.out.println("city1 == city2 (Both literals in SCP) : " + (city1 == city2));      // true
        System.out.println("city1 == city3 (SCP vs Heap Object)   : " + (city1 == city3));      // false
        System.out.println("city3 == city4 (Two separate Heaps)   : " + (city3 == city4));      // false

        // Content comparison (.equals checks characters inside):
        System.out.println("city1.equals(city3) (Content match)   : " + city1.equals(city3)); // true

        // Using intern() to retrieve SCP pooled reference:
        String internedCity = city3.intern();
        System.out.println("city1 == city3.intern() (Pulled to SCP): " + (city1 == internedCity)); // true!

        System.out.println("\n==================================================");
        System.out.println("  DEMO 2: PROVING STRING IMMUTABILITY IN ACTION   ");
        System.out.println("==================================================");

        String state = "Telangana";
        System.out.println("Original State String : " + state);

        // Calling concat() without storing the returned reference:
        state.concat(" State");
        System.out.println("After state.concat()  : " + state); // Still 'Telangana'! Not mutated!

        // Correct way: Assign the new String object returned by concat:
        String updatedState = state.concat(" State, India");
        System.out.println("Assigned new String   : " + updatedState);

        System.out.println("\n==================================================");
        System.out.println("  DEMO 3: CharSequence POLYMORPHISM IN ACTION     ");
        System.out.println("==================================================");

        // Polymorphism: CharSequence can refer to String, StringBuilder, StringBuffer
        CharSequence cs1 = "Aadhaar-1234-5678";
        CharSequence cs2 = new StringBuilder("PAN-ABCDE1234F");

        inspectSequence(cs1);
        inspectSequence(cs2);
    }

    // Helper method demonstrating reusable CharSequence parameter:
    private static void inspectSequence(CharSequence seq) {
        System.out.println("Sequence Length: " + seq.length() + 
                           " | First Char: " + seq.charAt(0) + 
                           " | Value: " + seq.toString());
    }
}

