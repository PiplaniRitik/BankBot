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
exports.NameDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const serviceOptions = ['Credit Card'];
class NameDialog extends botbuilder_dialogs_1.ComponentDialog {
    constructor() {
        super('nameDialog');
        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog('nameDialogFlow', [
            this.askName.bind(this),
            this.processName.bind(this),
            this.askService.bind(this),
            this.processService.bind(this),
        ]));
    }
    askName(step) {
        return __awaiter(this, void 0, void 0, function* () {
            if (step.options && step.options.stepIndex !== 1) {
                console.log(this.id);
                return yield step.prompt('textPrompt', 'Great! What is your name?');
            }
            return yield step.next();
        });
    }
    processName(step) {
        return __awaiter(this, void 0, void 0, function* () {
            if (step.options && step.options.stepIndex !== 1) {
                const userName = step.result;
                yield step.context.sendActivity(`Hello, ${userName}!`);
            }
            return yield step.next();
        });
    }
    askService(step) {
        return __awaiter(this, void 0, void 0, function* () {
            const promptOptions = {
                prompt: {
                    type: 'message',
                    text: 'Select a service:',
                    suggestedActions: {
                        to: [step.context.activity.from.id],
                        actions: serviceOptions.map(option => ({ type: 'imBack', title: option, value: option })),
                    },
                },
            };
            return yield step.prompt('textPrompt', promptOptions);
        });
    }
    processService(step) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedOption = step.result;
            if (selectedOption === 'Credit Card') {
                return yield step.beginDialog('creditCardDialog');
            }
            else {
                yield step.context.sendActivity('You must select one of the mentioned Services.');
                return yield step.replaceDialog(this.id, { stepIndex: 1 });
            }
        });
    }
}
exports.NameDialog = NameDialog;
//# sourceMappingURL=nameDialog.js.map