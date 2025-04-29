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

export const apiQuoteImplementation = [
  "api-quote-implementation",
  "Return API contract for Refund Protect Quote request to be use in a service",
  {
    VendorCode: z.string().describe("Vendor code to use in the API header"),
    Secret: z.string().describe("Vendor secret to be use in the API header"),
    BookingReference: z.string().describe("Booking reference to be use in the API body"),
    EventDate: z.string().describe("Event date in ISO format (e.g., 2025-05-01T18:30:00Z) to be use in the API body"),
    LanguageCode: z.string().describe("Language code (e.g., EN) to be use in the API body"),
    NumberOfTicket: z.number().describe("Number of tickets to be use in the API body"),
    TotalValue: z.number().describe("Total booking value to be use in the API body"),
    CurrencyCode: z.string().describe("Currency code (e.g., USD) to be use in the API body")
  },
  async ({ VendorCode, Secret, BookingReference, EventDate, LanguageCode, NumberOfTicket, TotalValue, CurrencyCode }: QuoteParams) => {
    try {
      const data = {
        "title":"New Quote",
        "description":"Returns both json and html content of the refundable quote ",
        "method":"POST",
        "url":"https://api.protectgroup.com/test/dynamic/quote",
        "requestHeaders":{"table":[["Name","Required","Type","Example","Description"],["x-pg-client-id","true","string","<<YourClientId>>","Your Client Id."],["x-pg-client-secret","true","string","<<YourSecret>>","Your Client Secret."]],"defaultJson":{}},"requestParameters":{"table":[[""]],"defaultJson":{}},"requestBody":{"table":[["Name","Required","Type","Example","Description"],["accommodationName","false","string(500)","Hotel","Name of accommodation (if applicable)."],["airline","false","string(500)","Jet2","Flight airline (if applicable)."],["arrivalAirportCode","false","string(500)","MVD","Arrival airport code."],["arrivalCountry","false","string(500)","UY","Country of the event."],["currencyCode","true","string(3)","GBP, USD","Currency code of transaction."],["customerDateOfBirth","false","string(500)","01-01-1980","Lead customer date of birth."],["customerGender","false","string(500)","male","Lead customer gender."],["departureAirportCode","false","string(500)","LBA","Departure airport code."],["departureCountry","false","string(500)","UK","Country the customer is departing from."],["eventName ","false","string(500)","Event 1","Name of the event."],["eventTravelClass","false","string(500)","Business","Type of travel to the event."],["eventTravelDateTime","true","string(500)","2030-12-01T12:14:28.416493+00:00","Date/Time of the event (yyyy-MM-ddTHH:mm:ss.FFFFFFzzz). Only future event dates and times are permissible, any dates set in the past will be rejected."],["flightType","false","string(500)","Economy","Type of flight on the booking (if applicable)."],["languageCode","true","string(5)","en, en-GB, en-US","Language code."],["member","true","string(100)","<<YourClientId>>","Your member vendor code."],["numberOfTickets","true","integer","1","Number of tickets on the booking."],["riskType","false","string(500)","HTL, PKG, TKT","The Protect Group product code for the booking."],["ticketType","false","string","GA","Type of ticket on the booking (if applicable)."],["totalValue","true","double","1000","Total value of the booking."],["tourOperator","false","string(500)","Operator name","The booking tour operator (if applicable)."],["venue","false","string(500)","Meeting Rooms","The venue of the booking (if applicable)."],["source","false","string(500)","Web, Mobile","Use it to specify the source of your request so widget content is generated according to it."],["returnHtml","false","boolean","true","Returns pre-built/styled html for the refundable content (defaults to true)."],["returnContent ","false","boolean","false","Returns json object that represents the refundable content (defaults to false)."],["salesTax","false","double","10","Apply sales tax percent to the refundable booking cost."],["client","false","string(500)","Sub Company Name","Use it to specify any sub company information buying the protection through your membership agreement."]],"defaultJson":{"accommodationName":"string","airline":"string","arrivalAirportCode":"string","arrivalCountry":"string","currencyCode":"string","customerDateOfBirth":"string","customerGender":"string","departureAirportCode":"string","departureCountry":"string","eventName":"string","eventTravelClass":"string","eventTravelDateTime":"string","flightType":"string","languageCode":"string","member":"string","numberOfTickets":"integer","riskType":"string","ticketType":"string","totalValue":"double","tourOperator":"string","venue":"string","source":"string","returnHtml":"boolean","returnContent":"boolean","salesTax":"double","client":"string"}},"responseOk":{"table":[["Name","Required","Type","Example","Description"],["quoteId","false","string(60)","q_123_ABC","Quote id."],["languageCode","false","string(5)","en","Language code of the transaction."],["products[].productId","false","integer","16","The reference of the product"],["products[].code","false","string(500)","TKT","The Protect Group product code for the booking."],["products[].title","false","string(500)","Select a Refundable Booking","Widget content for title."],["products[].optInLabel","false","string(500)","Refundable Booking","Widget content for opt in label."],["products[].optOutLabel","false","string(500)","Non-Refundable Booking","Widget content for opt out label."],["products[].features[].text","false","string(500)","[\"Positive test Covid\"]","Widget content for features text."],["products[].tsAndCsUrl","false","string(500)","https://www.refundable.me/extended/en/","Url to Protect terms and conditions."],["products[].offeringMethod","false","string(500)","OPT-OUT","Offering method code of how the products is presented to the customer."],["products[].currencyCode","false","string(3)","USD","Code of the booking currency."],["products[].html","false","string","<html>...</html>","Html code with the widget content ready to render."],["products[].bookingStage","false","string(500)","Journey, Payment","Specifies which part of the checkout process the product should be displayed."],["products[].productPrice","true","double","100","If price per ticket is enabled, will be the total price of the product / the number of tickets supplied in the request. Otherwise will be the same as totalProductPrice"],["products[].pricePerTicket","true","boolean","true","Flag to specify if you want to display price per ticket"],["totalProductPrice","true","double","100","This field will always be the total price of the product. It MUST be included in the basket. Ensure that this field is populated with the accurate total product price."]],"defaultJson":{"quoteId":"string","languageCode":"string","products":[{"productId":"integer","productPrice":"decimal","pricePerTicket":"boolean","code":"string","title":"string","optInLabel":"string","optOutLabel":"string","features":[{"text":"string"}],"tsAndCsUrl":"string","offeringMethod":"string","currencyCode":"string","html":"string","bookingStage":"string"}],"totalProductPrice":"double"}},"acceptedResponse":{"table":[[""]],"defaultJson":{}},"responseBadRequest":{"table":[["Name","Required","Type","Example","Description"],["message","false","string","This will be either a single message or the number of the potential validation errors below","Principal error message."],["message","false","propertyError[]","{\"property\": \"EventTravelDateTime\", \"errors\": [ \"Must be in the future\", \"Must be in the format 'yyyy-MM-ddTHH:mm:ss.FFFFFFzzz'\"]}","Error messages details per properties."]],"defaultJson":{"message":"This will be either a single message or the number of the potential validation errors below","detail":[{"property":"EventTravelDateTime","errors":["Must be in the future","Must be in the format 'yyyy-MM-ddTHH:mm:ss.FFFFFFzzz'"]},{"property":"Member","errors":["Must be a valid value"]},{"property":"TotalValue","errors":["Must be greater than 0"]},{"property":"NumberOfTickets","errors":["Must be greater than 0"]},{"property":"CurrencyCode","errors":["Must be a valid value"]},{"property":"LanguageCode","errors":["Must be a valid ISO 639-1 language code"]}]}},"unauthorized":{"table":[["Response: 401 Unauthorized"],["Invalid or expired membership credentials."]],"defaultJson":{"type":"https://tools.ietf.org/html/rfc7235#section-3.1","title":"Unauthorized","status":401,"traceId":"|9887ue-9789798uosds98"}},"notFound":{"table":[[""]],"defaultJson":{}},"notAllowed":{"table":[["Response: 405 Method not Allowed"],["The supplied HTTP verb is not supported."]],"defaultJson":{}},"internalError":{"table":[["Response: 500 Error"],["Internal server error."]],"defaultJson":{}},"position":1,"verticals":"1,2,3,4,5,6,7","region":8,"hasChange":true}

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