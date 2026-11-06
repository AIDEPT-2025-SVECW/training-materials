public class IrctcPnrExtractorSolution {
    public static void main(String[] args) {
        String sms = "PNR:6549281034|TRAIN:12723|ROUTE:HYB-NDLS|SEAT:B2-19|AMT:1850.00";

        // Split by pipe '|' (escaped as \\| because pipe is regex OR operator):
        String[] parts = sms.split("\\|");

        StringBuilder ticketCard = new StringBuilder();
        ticketCard.append("======================================\n")
                  .append("         IRCTC E-TICKET CARD          \n")
                  .append("======================================\n");

        for (String part : parts) {
            String[] kv = part.split(":");
            ticketCard.append(String.format("%-12s : %s\n", kv[0], kv[1]));
        }
        ticketCard.append("======================================\n");

        System.out.println(ticketCard.toString());
    }
}

