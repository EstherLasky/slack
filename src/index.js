const slackOperations = require('./slack-operations');
function main() {
    slackOperations.addChannel('chanel-test-2')
        .then(response => {
        if (response.isSuccess) {
            const channelId = response.data.channelId;
            const userId = process.env.USER_ID;
            console.log(response, userId, channelId);
            slackOperations.addUserToChannel(channelId, userId)
                .then(response => console.log(response))
            slackOperations.addMessage(channelId, 'Hello from Slack API!')
                .then(response => console.log(response));
            slackOperations.removeChannel(channelId)
                .then(response => console.log(response));
        }
        })
        .catch(error => console.log(error));
}

main();
