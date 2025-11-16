import { describe, expect, it, jest } from '@jest/globals';
import { ChatPostMessageResponse, ConversationsArchiveResponse, ConversationsCreateResponse, ConversationsInviteResponse } from '@slack/web-api';

import { SlackOperations } from '../src/slack-operations';
import { AddChannelResponseDataType } from "../src/types/data";

jest.mock('@slack/web-api', () => {
    return {
        WebClient: jest.fn(() => ({
            chat: {
                postMessage: jest.fn<() => Promise<ChatPostMessageResponse>>().mockResolvedValue({
                    ts: '1643723400.123456',
                    ok: true,
                }),
            },
            conversations: {
                create: jest.fn<() => Promise<ConversationsCreateResponse>>().mockResolvedValue({
                    channel: {
                        id: 'C123456',
                        name: 'test-channel',
                    },
                    ok: true
                }),
                invite: jest.fn<() => Promise<ConversationsInviteResponse>>().mockResolvedValue({
                    channel: {
                        id: 'C123456',
                    },
                    ok: true
                }),
                archive: jest.fn<() => Promise<ConversationsArchiveResponse>>().mockResolvedValue({
                    ok: true
                }),
            },
        }))
    };
});

describe('SlackOperations', () => {
    it('should add a channel', async () => {
        const result = await new SlackOperations().addChannel('test-channel');
        expect(result.isSuccess).toBeTruthy();
        expect((result.data as AddChannelResponseDataType).channelId).toEqual('C123456');
    });

    it('should add a user to a channel', async () => {
        const userId = 'U123456';
        const channel = 'C123456';
        const result = await new SlackOperations().addUserToChannel(channel, userId);
        expect(result.isSuccess).toBeTruthy();
        expect(result.data).toBe(`User ${userId} added to channel ${channel}`);
    });

    it('should send a message to a channel', async () => {
        const result = await new SlackOperations().addMessage('C123456', 'Hello from Slack API!');
        expect(result.isSuccess).toBeTruthy();
        expect(result.data).toBe('Message sent to channel C123456 with ts: 1643723400.123456');
    });

    it('should remove a channel', async () => {
        const result = await new SlackOperations().removeChannel('C123456');
        expect(result.isSuccess).toBeTruthy();
        expect(result.data).toBe('Channel C123456 removed');
    });
});

