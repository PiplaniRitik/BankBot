import { ComponentDialog, DialogTurnResult, WaterfallDialog, WaterfallStepContext } from 'botbuilder-dialogs';
import { getCreditCardCarousel } from '../utils/cardCarouselUtils';

export class CreditCardDialog extends ComponentDialog {
  constructor() {
    super('creditCardDialog');

    this.addDialog(new WaterfallDialog('creditCardDialogFlow', [
      this.showCreditCardOptions.bind(this),
    ]));
  }

  private async showCreditCardOptions(step) {
    console.log(this.id);
    await step.context.sendActivity('Sure, here are the available credit cards:');

      await step.context.sendActivity({
        type: 'message',
        attachmentLayout: 'carousel',
        attachments: getCreditCardCarousel(),
      });
      // return { status: DialogTurnStatus.waiting };
      await step.context.sendActivity('Thanks for your time. Send a post request to start your bot again');
      return await step.endDialog();
  }
  

}
