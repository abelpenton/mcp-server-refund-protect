import { z } from "zod";
import { ToolResponse } from "../types/toolResponse";

type WidgetPlacementParams = {
  TotalValue: number;
  NumberOfTickets: number;
  EventTravelDateTime: string;
};

export const rpWidgetRender = [
  "rp-widget-render",
  "This is the code to render the Refund Protect javascript widget once its installed. Add the div with pgr-payment-container and call updateQuoteData action.",
  {
    TotalValue: z.number().describe("The total value of the booking"),
    NumberOfTickets: z.number().describe("The number of tickets"),
    EventTravelDateTime: z.string().describe("Event travel date time in ISO format")
  },
  async ({ TotalValue, NumberOfTickets, EventTravelDateTime }: WidgetPlacementParams) => {
    const widgetRenderScript = `
<script>
document.addEventListener('PgWidgetLoaded', function() {
    const data = {
        totalValue: ${TotalValue},
        numberOfTickets: ${NumberOfTickets},
        eventTravelDateTime: '${EventTravelDateTime}'
    };
    window._pgr('action', 'updateQuoteData', data);
});
</script>

<div id="pgr-payment-container"></div>
    `.trim();

    const toolResponse: ToolResponse = {
      content: [
        {
          type: "text",
          text: widgetRenderScript
        }
      ]
    };
    return toolResponse;
  }
] as const; 