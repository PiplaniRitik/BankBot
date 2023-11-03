import { config } from 'dotenv';
import * as path from 'path';
import * as restify from 'restify';
import {
    CloudAdapter,
    ConfigurationBotFrameworkAuthentication,
    ConfigurationBotFrameworkAuthenticationOptions,
    ConversationState,
    MemoryStorage,
    UserState
} from 'botbuilder';

import { DialogBot } from './bots/dialogBot';
import { MainDialog } from './dialogs/mainDialog';

const ENV_FILE = path.join(__dirname, '.env');
config({ path: ENV_FILE });

const botFrameworkAuthentication = new ConfigurationBotFrameworkAuthentication(process.env as ConfigurationBotFrameworkAuthenticationOptions);

const adapter = new CloudAdapter(botFrameworkAuthentication);

adapter.onTurnError = async (context, error) => {

    console.error(`\n [onTurnError] unhandled error: ${error}`);

    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${error}`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    await context.sendActivity('The bot encounted an error or bug.');
    await context.sendActivity('To continue to run this bot, please fix the bot source code.');
    await conversationState.delete(context);
};

const memoryStorage = new MemoryStorage();

const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

const dialog = new MainDialog();
const bot = new DialogBot(conversationState, userState, dialog);

const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${server.name} listening to ${server.url}.`);
    console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});

server.post('/api/messages', async (req, res) => {
    await adapter.process(req, res, (context) => bot.run(context));
});
