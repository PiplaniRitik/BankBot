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
exports.CreditCardDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const cardCarouselUtils_1 = require("../utils/cardCarouselUtils");
class CreditCardDialog extends botbuilder_dialogs_1.ComponentDialog {
    constructor() {
        super('creditCardDialog');
        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog('creditCardDialogFlow', [
            this.showCreditCardOptions.bind(this),
        ]));
    }
    showCreditCardOptions(step) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.id);
            yield step.context.sendActivity('Sure, here are the available credit cards:');
            yield step.context.sendActivity({
                type: 'message',
                attachmentLayout: 'carousel',
                attachments: cardCarouselUtils_1.getCreditCardCarousel(),
            });
            // return { status: DialogTurnStatus.waiting };
            yield step.context.sendActivity('Thanks for your time. Send a post request to start your bot again');
            return yield step.endDialog();
        });
    }
}
exports.CreditCardDialog = CreditCardDialog;
//# sourceMappingURL=creditCardDialog.js.map