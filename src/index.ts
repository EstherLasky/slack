import { ResponseObject } from './response-object';
import { SlackOperations } from './slack-operations';
import { AddChannelResponseDataType } from './types/data';

async function main() {
    try {
        const slackOperations = new SlackOperations();
        const addChannelResponse: ResponseObject = await slackOperations.addChannel('channel-test-2');
        if(!addChannelResponse.isSuccess) {
            throw new Error('Failed to create channel');
        }
        const channelId = (addChannelResponse.data as AddChannelResponseDataType).channelId || '';
        const userId = process.env.USER_ID as string;

        const addUserResponse = await slackOperations.addUserToChannel(channelId, userId);
        console.log(addUserResponse);

        const addMessageResponse = await slackOperations.addMessage(channelId, 'Hello from Slack API!');
        console.log(addMessageResponse);

        const removeChannelResponse = await slackOperations.removeChannel(channelId);
        console.log(removeChannelResponse);
    } catch (error) {
        console.log(error);
    }
}

main();

