import dotenv from 'dotenv';
import { WebClient } from '@slack/web-api';

import { ResponseObject } from './response-object';

dotenv.config();

export class SlackOperations {

    private web: WebClient;

    constructor() {
        const token = process.env.SLACK_TOKEN;
        this.web = new WebClient(token);
    }

    async addMessage(channel: string, text: string): Promise<ResponseObject> {
        try {
            const result = await this.web.chat.postMessage({
                channel,
                text,
            });
            return ResponseObject.success(`Message sent to channel ${channel} with ts: ${result.ts}`);
        }
        catch (error: any) {
            return ResponseObject.error(error.message);
        }
    }

    async addUserToChannel(channel: string, userId: string): Promise<ResponseObject> {
        try {
            await this.web.conversations.invite({
                channel,
                users: userId,
            });
            return ResponseObject.success(`User ${userId} added to channel ${channel}`);
        }
        catch (error: any) {
            return ResponseObject.error(error.message);
        }
    }

    async addChannel(channelName: string): Promise<ResponseObject> {
        try {
            const result = await this.web.conversations.create({
                name: channelName,
            });
            if (!result.channel) {
                throw new Error('Channel creation failed');
            }
            return ResponseObject.success({
                channelId: result.channel.id,
                channelName: result.channel.name,
            });
        }
        catch (error: any) {
            return ResponseObject.error(error.message);
        }
    }

    async removeChannel(channelId: string): Promise<ResponseObject> {
        try {
            await this.web.conversations.archive({
                channel: channelId,
            });
            return ResponseObject.success(`Channel ${channelId} removed`);
        }
        catch (error: any) {
            return ResponseObject.error(error.message);
        }
    }
}

