import { z } from "zod";
import { ToolResponse } from "../types/toolResponse";

type ReactInstallParams = {
  VendorCode: string;
  CurrencyCode: string;
  LanguageCode: string;
  ContainerSize: string;
  UseSaleAction: boolean;
  SalesTax: number;
  Nonce: string;
};

export const rpReactComponentInstallationTool = [
  "rp-react-component-installation",
  "Generate React code to install the widget, this is a provider and should be inserted in the root level of the project",
  {
    VendorCode: z.string().describe("Vendor code (member ID)"),
    CurrencyCode: z.string().default('USD').describe("Currency code (default USD)"),
    LanguageCode: z.string().default('en').describe("Language code (default en)"),
    ContainerSize: z.string().default('medium').describe("Size of the widget container (small, medium, large)"),
    UseSaleAction: z.boolean().default(true).describe("Whether to use the sale action automatically"),
    SalesTax: z.number().default(0).describe("Sales tax to apply to refundable booking cost (default 0)"),
    Nonce: z.string().default('').describe("Nonce for inline script (CSP setup, optional)")
  },
  async ({ VendorCode, CurrencyCode, LanguageCode, ContainerSize, UseSaleAction, SalesTax, Nonce }: ReactInstallParams) => {
    const reactCode = `
1. **Installation**:
\`\`\`
npm i protect-group-dynamic-refundable-react --save
\`\`\`

2. **Usage**:
Once the package is installed, use the following React code to render the widget:

\`\`\`jsx
import {
    RefundableOptions, 
    RefundableProvider
} from 'protect-group-dynamic-refundable-react';

function MyApp() {
    const options: RefundableOptions = {
        environment: 'test',
        currencyCode: '${CurrencyCode}',
        languageCode: '${LanguageCode}',
        vendorCode: '${VendorCode}',
        eventDateFormat: 'yyyy-MM-ddTHH:mm:ss:FFFFFzzz', // optional
        containerSize: '${ContainerSize}', // optional
        useSaleAction: ${UseSaleAction}, // optional, set this to false if you intend to call our sale endpoint manually
        nonce: '${Nonce}', //optional, set this if you have a CSP set up on your site
        salesTax: ${SalesTax} // optional, apply sales tax to the refundable booking cost
    };

    const handleProtectionChange = (args: ProtectionChangeEventArgs) => {
        // Handle protection change event
        console.log(args);
    };

    return (
        <RefundableProvider options={options}>
            <RestOftheCode/>
        </RefundableProvider>
    );
}
\`\`\`
`.trim();

    const toolResponse: ToolResponse = {
      content: [
        {
          type: "text",
          text: reactCode
        }
      ]
    };
    return toolResponse;
  }
] as const; 