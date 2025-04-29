import { z } from "zod";
import fetch from "node-fetch";
import { ToolResponse } from "../types/toolResponse";

type TransactionLookupParams = {
  VendorCode: string;
  Secret: string;
  BookingReference: string;
};

export const refundProtectSalesLookupTool = [
  "refund-protect-sales-lookup",
  "Lookup for an existing transaction for Refund Protect using a Booking Reference or Sales Id",
  {
    VendorCode: z.string().describe("Vendor code (member ID)"),
    Secret: z.string().describe("Vendor secret"),
    BookingReference: z.string().describe("Booking reference to lookup for")
  },
  async ({ VendorCode, Secret, BookingReference }: TransactionLookupParams) => {
    const url = `https://api.protectgroup.com/test/dynamic/sale/${BookingReference}?member=${VendorCode}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-pg-client-id": VendorCode,
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
            text: `Error lookup sale: ${error.message}`
          }
        ]
      };
      return toolResponse;
    }
  }
] as const; 