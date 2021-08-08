var fetch = require("node-fetch")
var carbon = {
    name: 'carbon',
    status: true,
    clue: ['Fungsi: upload file', 'Format: /carbon code'],
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

        if (new RegExp("^[\/\.\!]cuaca ", "i").exec(text)) {
            var json = {
                "backgroundColor": "rgba(144, 19, 254, 100)",
                "code": text.replace(/([\/\.\!]cuaca )/ig, ""),
                "theme": "dracula"
            }
            var option = {
                "method": "post",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(json)
            }
            var response = await fetch(`https://carbonnowsh.herokuapp.com/`, option);
            if (!outgoing) {
                return tg.sendMessage(chat_id, "Hanya pemilik yang bisa melakukanya");
            } else {
                tg.editMessageText(chat_id, msg_id, "Mohon tunggu sebentar kak");
                return tg.sendDocument(chat_id, response)
            }
        }
    }
}
module.exports = {
    carbon
}

