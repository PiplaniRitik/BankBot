"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogBot = void 0;
const botbuilder_1 = require("botbuilder");
class DialogBot extends botbuilder_1.ActivityHandler {
    /**
     *
     * @param {ConversationState} conversationState
     * @param {UserState} userState
     * @param {Dialog} dialog
     */
    constructor(conversationState, userState, dialog) {
        super();
        if (!conversationState)
            throw new Error('[DialogBot]: Missing parameter. conversationState is required');
        if (!userState)
            throw new Error('[DialogBot]: Missing parameter. userState is required');
        if (!dialog)
            throw new Error('[DialogBot]: Missing parameter. dialog is required');
        this.conversationState = conversationState;
        this.userState = userState;
        this.dialog = dialog;
        this.dialogState = this.conversationState.createProperty('DialogState');
        this.onMessage((context, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('Running dialog with Message Activity.');
            yield this.dialog.run(context, this.dialogState);
            yield next();
        }));
        this.onDialog((context, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.conversationState.saveChanges(context, false);
            yield this.userState.saveChanges(context, false);
            yield next();
        }));
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
exports.DialogBot = DialogBot;
//# sourceMappingURL=dialogBot.js.map