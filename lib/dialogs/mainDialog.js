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
exports.MainDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const tncDialog_1 = require("./tncDialog");
const nameDialog_1 = require("./nameDialog");
const creditCardDialog_1 = require("./creditCardDialog");
const languageDialog_1 = require("./languageDialog");
class MainDialog extends botbuilder_dialogs_1.ComponentDialog {
    constructor() {
        super('MainDialog');
        // this.addDialog(new WaterfallDialog('mainFlow', [
        //   this.startDialog.bind(this),
        //   // this.processTNC.bind(this),
        //   // this.processName.bind(this),
        //   // this.processCreditCard.bind(this),
        // ]));
        this.addDialog(new languageDialog_1.LanguageDialog());
        this.addDialog(new tncDialog_1.tncDialog());
        this.addDialog(new botbuilder_dialogs_1.TextPrompt('textPrompt'));
        this.addDialog(new nameDialog_1.NameDialog());
        this.addDialog(new creditCardDialog_1.CreditCardDialog());
    }
    run(context, accessor) {
        return __awaiter(this, void 0, void 0, function* () {
            const dialogSet = new botbuilder_dialogs_1.DialogSet(accessor);
            // console.log('this',this);
            dialogSet.add(this);
            const dialogContext = yield dialogSet.createContext(context);
            const results = yield dialogContext.continueDialog();
            // console.log("result", results);
            // console.log(this.id);
            if ((results === null || results === void 0 ? void 0 : results.status) === botbuilder_dialogs_1.DialogTurnStatus.empty) {
                // console.log("gg",this.id);
                return yield dialogContext.beginDialog(this.id);
            }
            return results;
            // console.log('try');
            // return await dialogContext.beginDialog(this.id);
        });
    }
}
exports.MainDialog = MainDialog;
//# sourceMappingURL=mainDialog.js.map