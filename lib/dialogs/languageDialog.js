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
exports.LanguageDialog = void 0;
// LanguageDialog.ts
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const languageOptions = ['English', 'Philippines'];
class LanguageDialog extends botbuilder_dialogs_1.ComponentDialog {
    constructor() {
        super('LanguageDialog');
        // this.addDialog(new TextPrompt('languagePrompt'));
        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog('languageFlow', [
            this.promptForLanguage.bind(this),
            this.processLanguageSelection.bind(this),
        ]));
    }
    promptForLanguage(step) {
        return __awaiter(this, void 0, void 0, function* () {
            const promptOptions = {
                prompt: {
                    type: 'message',
                    text: 'Please select an option:',
                    suggestedActions: {
                        to: [step.context.activity.from.id],
                        actions: languageOptions.map(option => ({ type: 'imBack', title: option, value: option })),
                    },
                },
            };
            return yield step.prompt('textPrompt', promptOptions);
        });
    }
    processLanguageSelection(step) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedLanguage = step.result;
            // const selectedOption = step.result;
            if (selectedLanguage === 'English' || selectedLanguage === 'Philippines') {
                const userLanguage = step.context.turnState.get('userLanguage') || {};
                userLanguage[step.context.activity.from.id] = selectedLanguage;
                step.context.turnState.set('userLanguage', userLanguage);
                return yield step.beginDialog('tncDialog');
            }
            else {
                yield step.context.sendActivity('Please make a proper selection of language to continue.');
                return yield step.replaceDialog(this.id);
            }
            // return await step.beginDialog('tncDialog');
        });
    }
}
exports.LanguageDialog = LanguageDialog;
//# sourceMappingURL=languageDialog.js.map