const covid = require("covid19-scrape")
var covid19 = {
    name: 'covid',
    status: true,
    clue: ['Fungsi: Test respon bot', 'Format: <code>/info</code>'],
    run: async function (airgram, msg,tg) {
        var chat_id = msg.chat.id;
        var user_id = msg.from.id;
        var chat_type = msg.chat.type;
        var text = msg.text;
        var msg_id = msg.message_id;
        var msgr = msg.reply_to_message ? msg.reply_to_message : false;
        var outgoing = msg.outgoing ? true : false;

        if (new RegExp("^\/covid ", "i").exec(text)) {
            var data = (await covid.covid(text.replace(/(\/covid )/ig, ""))).message;
            if (!outgoing) {
                return tg.sendMessage(chat_id, data, { parse_mode: "html" })
            } else {
                return tg.editMessageText(chat_id, msg_id, data);
            }
        }

    }
}
module.exports = {
    covid19
}
