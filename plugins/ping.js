var ping = {
    name: 'ping',
    status: true,
    clue: ['Fungsi: Test respon bot', 'Format: <code>.pong</code>'],
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
