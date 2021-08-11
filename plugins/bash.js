const shelljs = require("shelljs")

var bash = {
    name: 'bash',
    status: true,
    clue: ['Fungsi: Test respon bot', 'Format: <code>/bash ls</code>'],
    run: async function (update) {
        var airgram = update[0];
        var msg = update[1];
        var tg = update[2]
        var chat_id = msg.chat.id;
        var user_id = msg.from.id;
        var chat_type = msg.chat.type;
        var text = msg.text;
        var msg_id = msg.message_id;
        var msgr = msg.reply_to_message ? msg.reply_to_message : false;
        var outgoing = msg.outgoing ? true : false;

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
