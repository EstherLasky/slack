const slackOperations = require('../src/slack-operations');

jest.mock('@slack/web-api', () => {
    const mockWebClient = {
        chat: {
            postMessage: jest.fn().mockResolvedValue({
                ts: '1643723400.123456',
            }),
        },
        conversations: {
            create: jest.fn().mockResolvedValue({
                channel: {
                    id: 'C123456',
                    name: 'test-channel',
                },
            }),
            invite: jest.fn().mockResolvedValue({
                channel: {
                    id: 'C123456',
                },
                user: {
                    id: 'U123456',
                },
            }),
            archive: jest.fn().mockResolvedValue({
                channel: {
                    id: 'C123456',
                },
            }),
        },
    };
    return { WebClient: jest.fn(() => mockWebClient) };
});


describe('SlackOperations', () => {
    it('should add a channel', async () => {
        const result = await slackOperations.addChannel('test-channel');
        expect(slackOperations.web.conversations.create).toHaveBeenCalledTimes(1);
        expect(result.isSuccess).toBeTruthy();
        expect(result.data.channelId).toEqual('C123456');
    });

    it('should add a user to a channel', async () => {
        const userId = 'U123456';
        const channel = 'C123456';
        const result = await slackOperations.addUserToChannel(channel, userId);
        expect(slackOperations.web.conversations.invite).toHaveBeenCalledTimes(1);
        expect(result.isSuccess).toBeTruthy();
        expect(result.data).toBe(`User ${userId} added to channel ${channel}`);
    });

    it('should send a message to a channel', async () => {
        const result = await slackOperations.addMessage('C123456', 'Hello from Slack API!');
        expect(slackOperations.web.chat.postMessage).toHaveBeenCalledTimes(1);
        expect(result.isSuccess).toBeTruthy();
        expect(result.data).toBe('Message sent to channel C123456 with ts: 1643723400.123456');
    });

    it('should remove a channel', async () => {
        const result = await slackOperations.removeChannel('C123456');
        expect(slackOperations.web.conversations.archive).toHaveBeenCalledTimes(1);
        expect(result.isSuccess).toBeTruthy();
        expect(result.data).toBe('Channel C123456 removed');
    });
});
