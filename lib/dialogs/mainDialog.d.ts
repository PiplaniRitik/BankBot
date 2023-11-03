import { TurnContext } from 'botbuilder';
import { ComponentDialog, DialogTurnResult } from 'botbuilder-dialogs';
export declare class MainDialog extends ComponentDialog {
    constructor();
    run(context: TurnContext, accessor: any): Promise<DialogTurnResult>;
}
