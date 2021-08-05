const covid = require("covid19-scrape")
var covid19 = {
    name: 'covid',
    status: true,
    clue: ['Fungsi: Test respon bot', 'Format: <code>/info</code>'],
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
