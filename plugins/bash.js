const shelljs = require("shelljs")

var bash = {
    name: 'bash',
    status: true,
    clue: ['Fungsi: Test respon bot', 'Format: <code>/bash ls</code>'],
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

        if (new RegExp("^\/bash ", "i").exec(text)) {
            try {
                var data = shelljs.exec(text.replace(/(\/bash )/ig, ""), { async: true })
                data.stdout.on('data', function (data) {
                    if (!outgoing) {
                        return tg.sendMessage(chat_id, data)
                    } else {
                        return tg.editMessageText(chat_id, msg_id, data);
                    }
                });
            } catch (e) {
                var data = `Eror ${e.message}`
                if (!outgoing) {
                    return tg.sendMessage(chat_id, teks)
                } else {
                    return tg.editMessageText(chat_id, msg_id, teks);
                }
            }
        }

    }
}
module.exports = {
    bash
}
