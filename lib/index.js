"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv_1 = require("dotenv");
const path = __importStar(require("path"));
const restify = __importStar(require("restify"));
const botbuilder_1 = require("botbuilder");
const dialogBot_1 = require("./bots/dialogBot");
const mainDialog_1 = require("./dialogs/mainDialog");
const ENV_FILE = path.join(__dirname, '.env');
dotenv_1.config({ path: ENV_FILE });
const botFrameworkAuthentication = new botbuilder_1.ConfigurationBotFrameworkAuthentication(process.env);
const adapter = new botbuilder_1.CloudAdapter(botFrameworkAuthentication);
adapter.onTurnError = (context, error) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(`\n [onTurnError] unhandled error: ${error}`);
    yield context.sendTraceActivity('OnTurnError Trace', `${error}`, 'https://www.botframework.com/schemas/error', 'TurnError');
    yield context.sendActivity('The bot encounted an error or bug.');
    yield context.sendActivity('To continue to run this bot, please fix the bot source code.');
    yield conversationState.delete(context);
});
const memoryStorage = new botbuilder_1.MemoryStorage();
const conversationState = new botbuilder_1.ConversationState(memoryStorage);
const userState = new botbuilder_1.UserState(memoryStorage);
const dialog = new mainDialog_1.MainDialog();
const bot = new dialogBot_1.DialogBot(conversationState, userState, dialog);
const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${server.name} listening to ${server.url}.`);
    console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});
server.post('/api/messages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield adapter.process(req, res, (context) => bot.run(context));
}));
//# sourceMappingURL=index.js.map