import { z } from "zod";
import fetch from "node-fetch";
import { ToolResponse } from "../types/toolResponse";

type QuoteParams = {
  VendorCode: string;
  Secret: string;
  BookingReference: string;
  EventDate: string;
  LanguageCode: string;
  NumberOfTicket: number;
  TotalValue: number;
  CurrencyCode: string;
};

export const refundProtectQuoteTool = [
  "refund-protect-quote",
  "Create, obtain or generate a Quote for Refund Protect product",
  {
    VendorCode: z.string().describe("Vendor code (member ID)"),
    Secret: z.string().describe("Vendor secret"),
    BookingReference: z.string().describe("Booking reference"),
    EventDate: z.string().describe("Event date in ISO format (e.g., 2025-05-01T18:30:00Z)"),
    LanguageCode: z.string().describe("Language code (e.g., EN)"),
    NumberOfTicket: z.number().describe("Number of tickets"),
    TotalValue: z.number().describe("Total booking value"),
    CurrencyCode: z.string().describe("Currency code (e.g., USD)")
  },
  async ({ VendorCode, Secret, BookingReference, EventDate, LanguageCode, NumberOfTicket, TotalValue, CurrencyCode }: QuoteParams) => {
    const url = "https://api.protectgroup.com/test/dynamic/quote";
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
          currencyCode: CurrencyCode,
          eventTravelDateTime: EventDate,
          languageCode: LanguageCode,
          member: VendorCode,
          numberOfTickets: NumberOfTicket,
          totalValue: TotalValue,
          returnContent: true,
          returnHtml: true
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
            text: `Error fetching quote: ${error.message}`
          }
        ]
      };
      return toolResponse;
    }
  }
] as const; 