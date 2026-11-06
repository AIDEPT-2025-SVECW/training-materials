public class CitizenDataSanitizerSolution {
    public static void main(String[] args) {
        String rawAadhaar = "  4829 1049 8492  ";
        String rawPan = "  bpzpk1024m  ";
        String rawMobile = "+919876543210";

        // 1. Clean input strings:
        String cleanAadhaar = rawAadhaar.trim();
        String cleanPan = rawPan.trim().toUpperCase();
        String cleanMobile = rawMobile.trim();

        // 2. Mask Aadhaar:
        String lastFour = cleanAadhaar.substring(cleanAadhaar.length() - 4);
        String maskedAadhaar = "XXXX-XXXX-" + lastFour;

        // 3. Mobile Check:
        boolean hasValidCountryCode = cleanMobile.startsWith("+91");

        // Print Summary:
        System.out.println("Sanitized PAN     : " + cleanPan);
        System.out.println("Masked Aadhaar    : " + maskedAadhaar);
        System.out.println("Valid +91 Mobile? : " + hasValidCountryCode);
    }
}

