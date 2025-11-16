require('dotenv').config();
const { WebClient } = require('@slack/web-api');

const responseObject = require('./response-object');

module.exports = new class SlackOperations {
    
    constructor() {
        let token = process.env.SLACK_TOKEN;
        this.web = new WebClient(token);
    }
    
    async addMessage(channel, text) {
        try {
            const result = await this.web.chat.postMessage({
                channel: channel,
                text: text,
            });
            return responseObject.success(`Message sent to channel ${channel} with ts: ${result.ts}`);
        }
        catch (error) {
            return responseObject.error(error.message);
        }
    }

    async addUserToChannel(channel, userId) {
        try {
            await this.web.conversations.invite({
                channel: channel,
                users: userId,
            });
            return responseObject.success(`User ${userId} added to channel ${channel}`);
        }
        catch (error) {
            return responseObject.error(error);
        }
    }
    async addChannel(channelName) {
        try {
            const result = await this.web.conversations.create({
                name: channelName,
            });
            return responseObject.success({channelId: result.channel.id, channelName: result.channel.name});
        }
        catch (error) {
            return responseObject.error(error);
        }
    }
    async removeChannel(channelId) {
        try {
            await this.web.conversations.archive({
                channel: channelId,
            });
            return responseObject.success(`Channel ${channelId} removed`);
        }
        catch (error) {
            return responseObject.error(error);
        }
    }
}
