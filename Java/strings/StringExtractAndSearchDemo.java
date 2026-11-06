/**
 * Topic: Extracting Characters & Searching Strings in Java
 * Real-World Context: IRCTC SMS Ticket Parsing & UPI Handle Verification
 */
public class StringExtractAndSearchDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("  SCENARIO 1: PARSING IRCTC TICKET SMS MESSAGE   ");
        System.out.println("==================================================");

        String irctcMsg = "IRCTC: PNR 4528190342 | Trn 12723 Telangana Exp | B1-42 (CNF)";
        System.out.println("Raw SMS: " + irctcMsg);

        // 1. Extract PNR number using indexOf and substring
        String pnrKeyword = "PNR ";
        int pnrStart = irctcMsg.indexOf(pnrKeyword) + pnrKeyword.length();
        int pnrEnd = irctcMsg.indexOf(" |", pnrStart);
        String pnr = irctcMsg.substring(pnrStart, pnrEnd);
        System.out.println("Extracted 10-Digit PNR : [" + pnr + "]");

        // 2. Extract Train Number using charAt & substring
        int trnIndex = irctcMsg.indexOf("Trn ") + 4;
        String trainNumber = irctcMsg.substring(trnIndex, trnIndex + 5);
        System.out.println("Extracted Train Number  : [" + trainNumber + "]");

        // 3. Extract Coach & Berth status
        int lastPipe = irctcMsg.lastIndexOf("|");
        String berthDetails = irctcMsg.substring(lastPipe + 2);
        System.out.println("Berth & Status Info    : [" + berthDetails + "]");

        // 4. Converting to char[] to count digits
        char[] chars = pnr.toCharArray();
        System.out.print("PNR Individual Digits  : ");
        for (char ch : chars) {
            System.out.print(ch + " ");
        }
        System.out.println();

        System.out.println("\n==================================================");
        System.out.println("  SCENARIO 2: INDIAN MOBILE & UPI VALIDATIONS     ");
        System.out.println("==================================================");

        String phone1 = "+919876543210";
        String phone2 = "09876543210";
        String phone3 = "1234567890";

        validateIndianPhone(phone1);
        validateIndianPhone(phone2);
        validateIndianPhone(phone3);

        System.out.println("\n--- UPI Payment VPA Validation ---");
        String upi1 = "ananya.sharma@oksbi";
        String upi2 = "swiggy.orders@icici";
        String upi3 = "invalid_user_address";

        validateUpiId(upi1);
        validateUpiId(upi2);
        validateUpiId(upi3);
    }

    private static void validateIndianPhone(String phone) {
        if (phone.startsWith("+91")) {
            System.out.println("[VALID] " + phone + " has standard +91 Indian country code.");
        } else if (phone.startsWith("0")) {
            System.out.println("[VALID] " + phone + " has domestic STD trunk 0 prefix.");
        } else {
            System.out.println("[WARNING] " + phone + " missing Indian code (+91 or 0).");
        }
    }

    private static void validateUpiId(String vpa) {
        if (vpa.contains("@") && (vpa.endsWith("@oksbi") || vpa.endsWith("@icici") || vpa.endsWith("@paytm"))) {
            int atIndex = vpa.indexOf("@");
            String username = vpa.substring(0, atIndex);
            String bankHandle = vpa.substring(atIndex);
            System.out.println("[SUCCESS] Valid VPA: User='" + username + "', Bank Handle='" + bankHandle + "'");
        } else {
            System.out.println("[REJECTED] Invalid VPA: '" + vpa + "' missing '@' or recognized bank PSP handle.");
        }
    }
}

