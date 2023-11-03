// LanguageDialog.ts
import { ComponentDialog, DialogTurnResult, PromptOptions, WaterfallDialog, WaterfallStepContext } from 'botbuilder-dialogs';
const languageOptions = ['English', 'Philippines'];
export class LanguageDialog extends ComponentDialog {
  constructor() {
    super('LanguageDialog');

    // this.addDialog(new TextPrompt('languagePrompt'));

    this.addDialog(new WaterfallDialog('languageFlow', [
      this.promptForLanguage.bind(this),
      this.processLanguageSelection.bind(this),
    ]));
  }

  private async promptForLanguage(step: WaterfallStepContext): Promise<DialogTurnResult> {
    const promptOptions: PromptOptions = {
        prompt: {
          type: 'message',
          text: 'Please select an option:',
          suggestedActions: {
            to: [step.context.activity.from.id],
            actions: languageOptions.map(option => ({ type: 'imBack', title: option, value: option })),
          },
        },
      };
      
      return await step.prompt('textPrompt', promptOptions);
  }

  private async processLanguageSelection(step: WaterfallStepContext): Promise<DialogTurnResult> {
    const selectedLanguage = step.result;
    // const selectedOption = step.result;

    if (selectedLanguage === 'English' || selectedLanguage === 'Philippines') {
        const userLanguage = step.context.turnState.get('userLanguage') || {};
        userLanguage[step.context.activity.from.id] = selectedLanguage;
        step.context.turnState.set('userLanguage', userLanguage);
      return await step.beginDialog('tncDialog');
    } else {
      await step.context.sendActivity('Please make a proper selection of language to continue.');
      return await step.replaceDialog(this.id);
    }
   

    // return await step.beginDialog('tncDialog');
  }
}
