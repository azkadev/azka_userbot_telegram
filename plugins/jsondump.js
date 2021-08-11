var jsondump = {
    name: 'jsondump',
    status: true,
    clue: ['Fungsi: Test respon bot', 'Format: <code>/jsondump</code>'],
    run: async function (airgram, msg,tg) {
        var chat_id = msg.chat.id;
        var user_id = msg.from.id;
        var chat_type = msg.chat.type;
        var text = msg.text;
        var msg_id = msg.message_id;
        var msgr = msg.reply_to_message ? msg.reply_to_message : false;
        var outgoing = msg.outgoing ? true : false;
        
        if (new RegExp("^\/jsondump", "i").exec(text)) {
            if (!outgoing) {
                return tg.sendMessage(chat_id, JSON.stringify(msg, null, 2))
            } else {
                return tg.editMessageText(chat_id, msg_id, JSON.stringify(msg, null, 2));
            }
        }
    }
}
module.exports = {
    jsondump
}
