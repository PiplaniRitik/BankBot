import { TurnContext } from 'botbuilder';
import { ComponentDialog, DialogSet, DialogTurnResult, DialogTurnStatus, TextPrompt} from 'botbuilder-dialogs';
import { tncDialog } from './tncDialog';
import { NameDialog } from './nameDialog';
import { CreditCardDialog } from './creditCardDialog';
import { LanguageDialog } from './languageDialog';

export class MainDialog extends ComponentDialog {
  constructor() {
    super('MainDialog');
    
    // this.addDialog(new WaterfallDialog('mainFlow', [
    //   this.startDialog.bind(this),
    //   // this.processTNC.bind(this),
    //   // this.processName.bind(this),
    //   // this.processCreditCard.bind(this),
    // ]));
    this.addDialog(new LanguageDialog());
    this.addDialog(new tncDialog());
    this.addDialog(new TextPrompt('textPrompt'));

    this.addDialog(new NameDialog());
    this.addDialog(new CreditCardDialog());
  }

  public async run(context: TurnContext, accessor: any): Promise<DialogTurnResult> {
    const dialogSet = new DialogSet(accessor);
    // console.log('this',this);
    dialogSet.add(this);
  
    const dialogContext = await dialogSet.createContext(context);
  
    const results = await dialogContext.continueDialog();
    // console.log("result", results);
    // console.log(this.id);
    
    if (results?.status === DialogTurnStatus.empty) {
      // console.log("gg",this.id);
      return await dialogContext.beginDialog(this.id);
    }
  
    return results;
    // console.log('try');
    // return await dialogContext.beginDialog(this.id);
    

  }

  

  // private async startDialog(step: WaterfallStepContext) {
  //   
  //   console.log({step});
  //   const tncDialogOnStack = step.activeDialog?.id === 'tncDialog';
  
  //   
   
  //   if (!tncDialogOnStack) {
  //     console.log("hwdbj");
  //     return await step.beginDialog('tncDialog');
  //   }
  
  //   
  //   return await step.next();
  // }
  
  
}
