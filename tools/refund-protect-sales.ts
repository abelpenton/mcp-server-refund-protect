import { z } from "zod";
import fetch from "node-fetch";
import { ToolResponse } from "../types/toolResponse";

type TransactionParams = {
  VendorCode: string;
  Secret: string;
  BookingReference: string;
  Name: string;
  LastName: string;
  QuoteId: string;
};

export const refundProtectSalesTool = [
  "refund-protect-sales",
  "Create or Generate a transaction for Refund Protect using a QuoteId",
  {
    VendorCode: z.string().describe("Vendor code (member ID)"),
    Secret: z.string().describe("Vendor secret"),
    BookingReference: z.string().describe("Booking reference"),
    Name: z.string().describe("Customer first name"),
    LastName: z.string().describe("Customer last name"),
    QuoteId: z.string().describe("Quote ID to confirm the sale for")
  },
  async ({ VendorCode, Secret, BookingReference, Name, LastName, QuoteId }: TransactionParams) => {
    const url = "https://api.protectgroup.com/test/dynamic/sale";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-pg-client-id": VendorCode,
          "x-pg-client-secret": Secret
        },
        body: JSON.stringify({
          bookingReference: BookingReference,
          customers: [
            {
              firstName: Name,
              lastName: LastName
            }
          ],
          isPaidInFull: true,
          member: VendorCode,        
          products: [
            {
              productCode: "10",
              productId: 16,
              sold: true
            }
          ],
          quoteId: QuoteId
        })
      });

      if (!response.ok) {
        throw new Error(`ProtectGroup API error: ${response.status} ${await response.text()}`);
      }

      const data = await response.json();

      const toolResponse: ToolResponse = {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2)
          }
        ]
      };
      return toolResponse;
    } catch (error: any) {
      const toolResponse: ToolResponse = {
        content: [
          {
            type: "text",
            text: `Error confirming sale: ${error.message}`
          }
        ]
      };
      return toolResponse;
    }
  }
] as const; 