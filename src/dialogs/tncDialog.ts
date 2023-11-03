import { ComponentDialog, WaterfallDialog, WaterfallStepContext, DialogTurnResult, PromptOptions } from 'botbuilder-dialogs';
const tncOptions = ['Yes, accept', 'No, don\'t accept'];
export class tncDialog extends ComponentDialog {
  constructor() {
    super('tncDialog');

    this.addDialog(new WaterfallDialog('tncDialogFlow', [
      this.showTNC.bind(this),
      this.processTNC.bind(this),
    ]));
  }

  private async showTNC(step: WaterfallStepContext): Promise<DialogTurnResult> {

    // await step.context.sendActivity('Please read and accept the Terms and Conditions:');
    const userLanguage = step.context.turnState.get('userLanguage') || {};
    const selectedLanguage = userLanguage[step.context.activity.from.id] || 'English';
  
    let tncMessage = '';
    if (selectedLanguage === 'English') {
      tncMessage = 'Please read and accept the Terms and Conditions:';
    } else if (selectedLanguage === 'Philippines') {
      tncMessage = 'Mangyaring basahin at tanggapin ang mga Tuntunin at Kondisyon:';
    } else {
      tncMessage = 'Please read and accept the Terms and Conditions:';
    }
  
    await step.context.sendActivity(tncMessage);
    
    const promptOptions: PromptOptions = {
      prompt: {
        type: 'message',
        text: 'Please select an option:',
        suggestedActions: {
          to: [step.context.activity.from.id],
          actions: tncOptions.map(option => ({ type: 'imBack', title: option, value: option })),
        },
      },
    };
    
    return await step.prompt('textPrompt', promptOptions);
  }

  private async processTNC(step: WaterfallStepContext): Promise<DialogTurnResult> {

    console.log("tnt", step.context.activity);
    const selectedOption = step.result;

    if (selectedOption === 'Yes, accept') {
      return await step.beginDialog('nameDialog');
    } else {
      await step.context.sendActivity('You must accept the Terms and Conditions to proceed.');
      return await step.replaceDialog(this.id);
    }
  }
}