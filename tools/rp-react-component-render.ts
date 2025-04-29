import { z } from "zod";
import { ToolResponse } from "../types/toolResponse";


export const rpReactComponentRenderTool = [
  "rp-react-component-render",
  "Render the widget content in the specified component of the source code",
  {},
  async () => {
    const reactCode = `
1. **Usage**:
Once the package is installed, use the following React code to render the widget:

\`\`\`jsx
import {
    RefundableContent,
    ProtectionChangeEventArgs,
    useRefundableActions
} from 'protect-group-dynamic-refundable-react';

function MyCheckout() {    
    const {updateQuoteData} = useRefundableActions()
    const {myInternalState} = useMyInternalStateContext()
    
    useEffect(() => {
      const {bookingCost, numberOfTickets, eventDate} = myInternalState
      updateQuoteData({
        totalValue: bookingCost, 
        numberOfTickets, 
        eventTravelDateTime: eventDate,
        nonce: '[nonce code can also be provided here, if required]'
      })
    }, [myInternalState])

    const handleProtectionChange = (args: ProtectionChangeEventArgs) => {
        // Handle protection change event
        console.log(args);
    };

    return (
        <RefundableContent onProtectionChange={handleProtectionChange} />
    );
}
\`\`\`

3. **Container**:
The \`onProtectionChange\` prop allows you to track changes to the protection details (e.g., when the user updates the booking).
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