var exec = {
    name: 'exec',
    status: true,
    clue: ['Fungsi: Test respon bot', 'Format: <code>.exec</code>'],
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
        if (RegExp("^[\/\.\!]exec ", "i").exec(text)) {
            if (!outgoing) {
                return tg.sendMessage(chat_id, "maaf hanya bisa di lakukan oleh userbot saja")
            } else {
                var data = await eval(msg.text.replace(/([\/\.\!]exec )/ig,""))
                return tg.sendMessage(chat_id, JSON.stringify(data, null,2));
            }
        }
    }
}
module.exports = {
    exec
}
