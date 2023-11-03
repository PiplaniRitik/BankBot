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
exports.tncDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const tncOptions = ['Yes, accept', 'No, don\'t accept'];
class tncDialog extends botbuilder_dialogs_1.ComponentDialog {
    constructor() {
        super('tncDialog');
        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog('tncDialogFlow', [
            this.showTNC.bind(this),
            this.processTNC.bind(this),
        ]));
    }
    showTNC(step) {
        return __awaiter(this, void 0, void 0, function* () {
            // await step.context.sendActivity('Please read and accept the Terms and Conditions:');
            const userLanguage = step.context.turnState.get('userLanguage') || {};
            const selectedLanguage = userLanguage[step.context.activity.from.id] || 'English';
            let tncMessage = '';
            if (selectedLanguage === 'English') {
                tncMessage = 'Please read and accept the Terms and Conditions:';
            }
            else if (selectedLanguage === 'Philippines') {
                tncMessage = 'Mangyaring basahin at tanggapin ang mga Tuntunin at Kondisyon:';
            }
            else {
                tncMessage = 'Please read and accept the Terms and Conditions:';
            }
            yield step.context.sendActivity(tncMessage);
            const promptOptions = {
                prompt: {
                    type: 'message',
                    text: 'Please select an option:',
                    suggestedActions: {
                        to: [step.context.activity.from.id],
                        actions: tncOptions.map(option => ({ type: 'imBack', title: option, value: option })),
                    },
                },
            };
            return yield step.prompt('textPrompt', promptOptions);
        });
    }
    processTNC(step) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("tnt", step.context.activity);
            const selectedOption = step.result;
            if (selectedOption === 'Yes, accept') {
                return yield step.beginDialog('nameDialog');
            }
            else {
                yield step.context.sendActivity('You must accept the Terms and Conditions to proceed.');
                return yield step.replaceDialog(this.id);
            }
        });
    }
}
exports.tncDialog = tncDialog;
//# sourceMappingURL=tncDialog.js.map