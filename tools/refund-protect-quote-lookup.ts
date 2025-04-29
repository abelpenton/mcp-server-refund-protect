import { z } from "zod";
import fetch from "node-fetch";
import { ToolResponse } from "../types/toolResponse";

type QuoteLookupParams = {
  VendorCode: string;
  Secret: string;
  QuoteId: string;
};

export const refundProtectQuoteLookupTool = [
  "refund-protect-quote-lookup",
  "Lookup for an existing Quote for Refund Protect product using QuoteId",
  {
    VendorCode: z.string().describe("Vendor code (member ID)"),
    Secret: z.string().describe("Vendor secret"),
    QuoteId: z.string().describe("Quote ID to lookup for")
  },
  async ({ VendorCode, Secret, QuoteId }: QuoteLookupParams) => {
    const url = `https://api.protectgroup.com/test/dynamic/quote/${QuoteId}?member=${VendorCode}`;
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
            text: `Error fetching quote: ${error.message}`
          }
        ]
      };
      return toolResponse;
    }
  }
] as const; 