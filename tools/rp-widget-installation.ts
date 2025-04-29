import { z } from "zod";
import { ToolResponse } from "../types/toolResponse";


type WidgetScriptParams = {
  VendorCode: string;
  CurrencyCode: string;
  LanguageCode: string;
};

export const rpWidgetInstallation = [
  "rp-widget-installation",
  "Install Refund Protect javascript widget, this should be created once in the source code. Insert the code returned as an script",
  {
    VendorCode: z.string().describe("Vendor code (member ID)"),
    CurrencyCode: z.string().default('USD').describe("Currency code (default USD)"),
    LanguageCode: z.string().default('en').describe("Language code (default en)")
  },
  async ({ VendorCode, CurrencyCode, LanguageCode }: WidgetScriptParams) => {
    const widgetScript = `
<script>
(function (P, R, O, t, E, C, T) {
    P[t] = P[t] || function () { (P[t].q = P[t].q || []).push(arguments) };
    C = R.createElement(O), T = R.getElementsByTagName(O)[0];
    C.id = t; C.src = E; C.async = 1; T.parentNode.insertBefore(C, T);
}(window, document, 'script', '_pgr', 'https://test.widget.protectgroup.com/dynamic-widget.js'));

window._pgr('init', {
    environment: 'test',
    debug: true,
    vendorCode: '${VendorCode}',
    currencyCode: '${CurrencyCode}',
    languageCode: '${LanguageCode}',
    eventDateFormat: 'yyyy-MM-ddTHH:mm:ss:FFFFFzzz',
    containerSize: 'medium',
    initializationCode: 'st',
    useSaleAction: false
});
</script>
    `.trim();

    const toolResponse: ToolResponse = {
      content: [
        {
          type: "text",
          text: widgetScript
        }
      ]
    };
    return toolResponse;
  }
] as const; 