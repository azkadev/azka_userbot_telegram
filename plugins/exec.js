var exec = {
    name: 'exec',
    status: true,
    clue: ['Fungsi: Test respon bot', 'Format: <code>.exec</code>'],
    run: async function (airgram, msg,tg) {
        var chat_id = msg.chat.id;
        var user_id = msg.from.id;
        var chat_type = msg.chat.type;
        var text = msg.text;
        var msg_id = msg.message_id;
        var msgr = msg.reply_to_message ? msg.reply_to_message : false;
        var outgoing = msg.outgoing ? true : false;
        if (RegExp("^[\/\.\!]exec ", "i").exec(text)) {
            if (!outgoing) {
                return tg.sendMessage(chat_id, "maaf hanya bisa di lakukan oleh userbot saja")
            } else {
                var data = await eval(text.replace(/([\/\.\!]exec )/ig,""))
                return tg.sendMessage(chat_id, JSON.stringify(data, null,2));
            }
        }
    }
}
module.exports = {
    exec
}
