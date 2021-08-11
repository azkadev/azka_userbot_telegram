var fetch = require("node-fetch")
var fs = require("fs")
var carbon = {
    name: 'carbon',
    status: true,
    clue: ['Fungsi: upload file', 'Format: /carbon code'],
    run: async function (airgram, msg,tg) {
        var chat_id = msg.chat.id;
        var user_id = msg.from.id;
        var chat_type = msg.chat.type;
        var text = msg.text;
        var msg_id = msg.message_id;
        var msgr = msg.reply_to_message ? msg.reply_to_message : false;
        var outgoing = msg.outgoing ? true : false;

        if (new RegExp("^[\/\.\!]carbon ", "i").exec(text)) {
            if (!outgoing) {
                return tg.sendMessage(chat_id, "Hanya pemilik yang bisa melakukanya");
            } else {
                return tg.sendPhoto(chat_id, `https://carbonnowsh.herokuapp.com/?code=${encodeURI(text.replace(/([\/\.\!]carbon )/ig,""))}&theme=darcula&backgroundColor=rgba(144, 19, 254, 100)`)   
            }
        }
    }
}
module.exports = {
    carbon
}

