/**
 * Topic: String Modifications, Data Conversion, split, join, and format
 * Real-World Context: Swiggy Order CSV Parsing, Aadhaar Masking & Rupee Receipt
 */
public class StringModifyAndConversionDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("  SCENARIO 1: PARSING SWIGGY ORDER CSV RECORD     ");
        System.out.println("==================================================");

        // Raw CSV line: OrderID, Customer, Item, Quantity, Price, PaymentMode
        String csvRecord = "SWIG-9402,Ananya Sharma,Hyderabadi Chicken Biryani,2,340.0,UPI";
        System.out.println("Raw CSV Line: " + csvRecord);

        // Tokenizing using split(",")
        String[] tokens = csvRecord.split(",");
        String orderId = tokens[0];
        String customerName = tokens[1];
        String item = tokens[2];
        int qty = Integer.parseInt(tokens[3]);
        double unitPrice = Double.parseDouble(tokens[4]);
        String paymentMode = tokens[5];

        double totalBill = qty * unitPrice;

        // Printing formatted invoice receipt using String.format:
        System.out.println("\n--- Swiggy Invoice Slip ---");
        System.out.println(String.format("Order Ref    : %s", orderId));
        System.out.println(String.format("Customer     : %s", customerName));
        System.out.println(String.format("Item Ordered : %s (Qty: %d)", item, qty));
        System.out.println(String.format("Total Amount : Rs. %,.2f (Paid via %s)", totalBill, paymentMode));

        System.out.println("\n==================================================");
        System.out.println("  SCENARIO 2: JOINING INDIAN ADDRESS TOKENS       ");
        System.out.println("==================================================");

        // Assembling structured Indian address without trailing comma headaches:
        String deliveryAddress = String.join(", ", 
            "Flat 402, Sri Sai Nilayam", 
            "Road No. 12, Banjara Hills", 
            "Hyderabad", 
            "Telangana", 
            "500034"
        );
        System.out.println("Assembled Delivery Address:\n" + deliveryAddress);

        System.out.println("\n==================================================");
        System.out.println("  SCENARIO 3: AADHAAR MASKING (replaceAll & regex)");
        System.out.println("==================================================");

        // Masking first 8 digits of 12-digit Aadhaar for privacy & compliance
        String rawAadhaar = "5489 2014 9876";
        // Regex: replace first 8 digits with 'XXXX XXXX '
        String maskedAadhaar = rawAadhaar.replaceAll("^\\d{4} \\d{4}", "XXXX XXXX");

        System.out.println("Original Aadhaar Number : " + rawAadhaar);
        System.out.println("Masked Aadhaar for UI   : " + maskedAadhaar);

        System.out.println("\n==================================================");
        System.out.println("  SCENARIO 4: NULL-SAFE String.valueOf()          ");
        System.out.println("==================================================");

        Object nullableCoupon = null;
        // nullableCoupon.toString() would crash with NullPointerException!
        String safeCouponStr = String.valueOf(nullableCoupon);
        System.out.println("String.valueOf(null) safely returned : \"" + safeCouponStr + "\"");
    }
}

