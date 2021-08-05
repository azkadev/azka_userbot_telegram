var ping = {
    name: 'ping',
    status: true,
    clue: ['Fungsi: Test respon bot', 'Format: <code>.pong</code>'],
    run: async function (update) {
        var airgram = update[0];
        var message = update[1];
        var tg = update[2]
        var chat_id = message.chatId;
        var user_id = message.sender.userId;
        var msg_id = message.id;
        var msgr_id = message.replyToMessageId ? message.replyToMessageId : false;
        var text = message.content.text.text ? message.content.text.text : false;
        var outgoing = message.isOutgoing ? true : false;
        if (RegExp("^[\/\.\!]ping$", "i").exec(text)) {
            var time = (Date.now() / 1000) - message.date
            var data = `Pong ${time.toFixed(3)}`
            if (!outgoing) {
                return tg.sendMessage(chat_id, data)
            } else {
                return tg.editMessageText(chat_id, msg_id, data);
            }
        }
    }
}
module.exports = {
    ping
}
