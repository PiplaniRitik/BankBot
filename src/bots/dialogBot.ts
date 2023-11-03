import { ActivityHandler, BotState, ConversationState, StatePropertyAccessor, UserState  } from 'botbuilder';
import { Dialog, DialogState } from 'botbuilder-dialogs';
import { MainDialog } from '../dialogs/mainDialog';
export class DialogBot extends ActivityHandler {
    private conversationState: BotState;
    private userState: BotState;
    private dialog: Dialog;
    private dialogState: StatePropertyAccessor<DialogState>;
    /**
     *
     * @param {ConversationState} conversationState
     * @param {UserState} userState
     * @param {Dialog} dialog
     */
    constructor(conversationState: BotState, userState: BotState, dialog: Dialog) {
        super();
        if (!conversationState) throw new Error('[DialogBot]: Missing parameter. conversationState is required');
        if (!userState) throw new Error('[DialogBot]: Missing parameter. userState is required');
        if (!dialog) throw new Error('[DialogBot]: Missing parameter. dialog is required');

        this.conversationState = conversationState as ConversationState;
        this.userState = userState as UserState;
        this.dialog = dialog;
        this.dialogState = this.conversationState.createProperty('DialogState');

        this.onMessage(async (context, next) => {
            console.log('Running dialog with Message Activity.');

            await (this.dialog as MainDialog).run(context, this.dialogState);

            await next();
        });

        this.onDialog(async (context, next) => {
            await this.conversationState.saveChanges(context, false);
            await this.userState.saveChanges(context, false);
            await next();
        });
        
        // this.onEvent(async (context, next) => {
        //     console.log("hellodnjha");
        //     if (context.activity.type === 'event' && context.activity.name === 'buttonClicked') {
        //         // A button is clicked
        //         const buttonValue = context.activity.value;
    
        //         // Perform actions based on the button value
        //         if (buttonValue === 'button1') {
        //             await context.sendActivity('Button 1 is clicked.');
        //         } else if (buttonValue === 'button2') {
        //             await context.sendActivity('Button 2 is clicked.');
        //         } else {
        //             await context.sendActivity('Unknown button is clicked.');
        //         }
        //     }
        // });
        
    }
}
