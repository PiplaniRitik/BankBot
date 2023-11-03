import { ComponentDialog, PromptOptions, WaterfallDialog } from 'botbuilder-dialogs';
const serviceOptions = ['Credit Card'];
export class NameDialog extends ComponentDialog {
  constructor() {
    super('nameDialog');

    this.addDialog(new WaterfallDialog('nameDialogFlow', [
      this.askName.bind(this),
      this.processName.bind(this),
      this.askService.bind(this),
      this.processService.bind(this),
    ]));
  }

  private async askName(step) {
    if (step.options && step.options.stepIndex !== 1){
    console.log(this.id);
    return await step.prompt('textPrompt', 'Great! What is your name?');
    }
    return await step.next();
  }

  private async processName(step) {
    if (step.options && step.options.stepIndex !== 1){
    const userName = step.result;
    await step.context.sendActivity(`Hello, ${userName}!`);
    }
    return await step.next();
  }
  private async askService(step) {
    const promptOptions: PromptOptions = {
      prompt: {
        type: 'message',
        text: 'Select a service:',
        suggestedActions: {
          to: [step.context.activity.from.id],
          actions: serviceOptions.map(option => ({ type: 'imBack', title: option, value: option })),
        },
      },
    };

    return await step.prompt('textPrompt', promptOptions);
  }
  private async processService(step) {
    const selectedOption = step.result;

    if (selectedOption === 'Credit Card') {
      return await step.beginDialog('creditCardDialog');
    } else {
      await step.context.sendActivity('You must select one of the mentioned Services.');
      return await step.replaceDialog(this.id, { stepIndex: 1 });
    }
  }
}
