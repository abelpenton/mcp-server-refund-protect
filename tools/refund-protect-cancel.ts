import { z } from "zod";
import fetch from "node-fetch";
import { ToolResponse } from "../types/toolResponse";

type TransactionParams = {
  VendorCode: string;
  Secret: string;
  BookingReference: string;
};

export const refundProtectCancelTool = [
  "refund-protect-cancel",
  "Cancel a transaction for Refund Protect using a Booking Reference",
  {
    VendorCode: z.string().describe("Vendor code (member ID)"),
    Secret: z.string().describe("Vendor secret"),
    BookingReference: z.string().describe("Booking reference"),
  },
  async ({ VendorCode, Secret, BookingReference }: TransactionParams) => {
    const url = `https://api.protectgroup.com/test/dynamic?saleId=${BookingReference}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-pg-client-id": VendorCode,
          "X-RefundProtect-VendorId": VendorCode,
          "x-pg-client-secret": Secret
        }        
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