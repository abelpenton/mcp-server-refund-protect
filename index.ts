#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { refundProtectQuoteTool } from "./tools/refund-protect-quote.js";
import { refundProtectQuoteLookupTool } from "./tools/refund-protect-quote-lookup.js"
import { refundProtectSalesTool } from "./tools/refund-protect-sales.js";
import { refundProtectSalesLookupTool } from "./tools/refund-protect-sales-lookup.js"
import  {refundProtectCancelTool } from "./tools/refund-protect-cancel.js"
import { rpWidgetInstallation } from "./tools/rp-widget-installation.js";
import { rpWidgetRender } from "./tools/rp-widget-render.js";
import { rpReactComponentInstallationTool } from "./tools/rp-react-component-installation.js";
import { rpReactComponentRenderTool } from "./tools/rp-react-component-render.js";
import { apiQuoteImplementation } from './tools/api-quote-implementation.js'

const server = new McpServer({
  name: "Refund Protect MCP Server",
  version: "1.0.0"
});

//1. API Interaction

// These are my API credential for Refund Protect API. 
// Vendor Code: <vendor>
// Secret: <secret>

// Give me a Refund Protect quote for my flight July 15 which I paid 540 EUR
server.tool(refundProtectQuoteTool[0], refundProtectQuoteTool[1], refundProtectQuoteTool[2], refundProtectQuoteTool[3]);

// Give me the details for the Quote: <quoteId>
server.tool(refundProtectQuoteLookupTool[0], refundProtectQuoteLookupTool[1], refundProtectQuoteLookupTool[2], refundProtectQuoteLookupTool[3]);

// Create a transaction for Refund Protect using this quote
server.tool(refundProtectSalesTool[0], refundProtectSalesTool[1], refundProtectSalesTool[2], refundProtectSalesTool[3]);

// Give me the details for the transaction with Booking Reference: <bookingReference>
server.tool(refundProtectSalesLookupTool[0], refundProtectSalesLookupTool[1], refundProtectSalesLookupTool[2], refundProtectSalesLookupTool[3]);

// Cancel the transaction with Booking Reference: <bookingReference>
server.tool(refundProtectCancelTool[0], refundProtectCancelTool[1], refundProtectCancelTool[2], refundProtectCancelTool[3]);

// 2. Vibe Coding

// Generate the code to install Refund Protect javascript widget
server.tool(rpWidgetInstallation[0], rpWidgetInstallation[1], rpWidgetInstallation[2], rpWidgetInstallation[3]);

// Generate the code to render Refund Protect javascript widget
server.tool(rpWidgetRender[0], rpWidgetRender[1], rpWidgetRender[2], rpWidgetRender[3]);

// Generate the code to install Refund Protect react component
server.tool(rpReactComponentInstallationTool[0], rpReactComponentInstallationTool[1], rpReactComponentInstallationTool[2], rpReactComponentInstallationTool[3]);

// Generate the code to render Refund Protect react component
server.tool(rpReactComponentRenderTool[0], rpReactComponentRenderTool[1], rpReactComponentRenderTool[2], rpReactComponentRenderTool[3]);

// Create a service in C# that implements Refund Protect Quote request
server.tool(apiQuoteImplementation[0], apiQuoteImplementation[1], apiQuoteImplementation[2], apiQuoteImplementation[3])

const transport = new StdioServerTransport();
await server.connect(transport);
