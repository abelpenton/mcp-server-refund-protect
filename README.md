# 🧠 Model Context Protocol (MCP) Guide for Refund Protect Integration

## 1. MCP Summary

The **Model Context Protocol (MCP)** is a protocol that allows LLM agents (such as ChatGPT or Claude) to dynamically interact with APIs and tools through a shared context. MCP bridges the gap between natural language interfaces and programmable systems, enabling context-aware execution of code, API calls, and plugin usage—all through structured prompts.

#### [Official Doc](https://modelcontextprotocol.io)

## 2. Official MCP Server examples

### 2.1 These official reference servers demonstrate core MCP features and SDK usage:

- **Slack**: Channel management and messaging capabilities
- **Google Drive**: File access and search capabilities for Google Drive
- **GitHub**: Repository management, file operations, and GitHub API integration

#### [More Examples](https://modelcontextprotocol.io/examples)

## 3. Configuration in Agents

### 3.1 What is a Client Agent?

A **Client Agent** is an AI model or chatbot (ChatGPT, Claude, DeepSeek) configured to interact with external tools or services using the MCP specification. These agents can interpret prompts and execute actions through MCP-enabled tools.

### 3.2 Agents that Support MCP Integration

- **Cursor**
- **Claude (via Cursor)**
- **Windsurf by Codeium**
- **ChatGPT (coming soon)**

### 3.3 ChatGPT Support

Support for **ChatGPT with MCP** is **coming soon**. Once integrated, you will be able to use the same MCP commands within ChatGPT Pro environments, with persistent tool context and streamlined API interaction.

---

## 4. Refund Protect MCP Server

**Refund Protect MCP Server** is an AI server agent will allows you to interact with Protect Group API using natural language. Creating Quotes, Transaction, do cancellation and many other features supported by the Official API.

Using prompt engineer you will be able to vibe coding Protect Group integrations method, from installing and render Refund Protect content in your source code to creating services in any programing language or frameworks that will connect with Protect Group API in behind.

---

## 5. MCP Server Setup

Each AI agent have different way to configure MCP servers, use the JSON below to add Refund Protect Server:

```json
{
  "mcpServers": {
    "rp-mcp-server": {
      "command": "npx",
      "args": ["-y", "@abelpenton_dev/rp-mcp-server"]
    }
  }
}
```

### 5.1 Setup in Claude

1. Download Claude Destokp.
2. From Claude Desktop, click on Settings.
3. Go to **Developer Section**.
4. Clicking in Edit Config.
5. Add RP Server settings in `claude_desktop_config.json` file.
6. Restart the app and start prompting Claude using natural language.

### 5.2 Setup in Cursor (For Developers)

1. Download Cursor IDE
2. Open Cursor and go to **MCP Setting** .
3. Click on Add new global MCP Server.
4. Add RP Server setting on `mcp.json` file.
5. Open the chat in agent mode with `Ctrl + I`.
6. Start interacting with tools by writing prompts in the MCP-aware interface.

---

## 6. Interactive Prompts with Refund Protect API

Use these prompts to interact with the **Refund Protect API** via MCP tools:

**Sample Prompt:**

> These are my API credential for Refund Protect API.
> Vendor Code: `vendorCode`
> Secret: `secret`

> Give me a Refund Protect quote for my flight July 15 which I paid 540 EUR.

> Give me the details for the Quote: `quoteID`.

> Create a transaction for Refund Protect using the generated quote.

> Give me the details for the transaction with Booking Reference: `bookingReference`

> Cancel the transaction with Booking Reference: `bookingReference`

---

## 7. Vibe Coding Refund Protect Integrations

Use these tool prompts to auto-generate installable or embeddable code:

**Sample Prompt:**

> Generate the code to install Refund Protect javascript widget and Generate the code to render the widget

> Generate the code to install and render Refund Protect react component

> Create a service in Dotnet that implements Refund Protect Quote request

---

## 8. Chat Example

Here’s a real-world conversational example using MCP-enabled prompts:

```
User: I need a Refund Protect quote for my hotel booking on May 22. It cost 320 EUR.
Agent: Sure, fetching the quote for 320 EUR on May 22…
→ Executes refundProtectQuoteTool

User: Can you show me the details of that quote?
→ Executes refundProtectQuoteLookupTool

User: Book it using that quote.
→ Executes refundProtectSalesTool

User: Actually, cancel the booking. Use the reference code I gave earlier.
→ Executes refundProtectCancelTool
```
