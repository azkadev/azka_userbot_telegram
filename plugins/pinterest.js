var fetch = require("node-fetch")
var pinterest = {
    name: 'pnterest',
    status: true,
    clue: ['Fungsi: upload file', 'Format: /pinterest ronaldo'],
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

        if (new RegExp("^[\/\.\!]pinterest ", "i").exec(text)) {
            var response = await fetch(`https://azkadev.herokuapp.com/api/pinterest?text=${text.replace(/([.*pinterest ])/ig,"")}`).then(response => response.json())
            if (response) {
                var hasil = response[Math.floor(Math.random() * response.length)]
                if (!outgoing) {
                    return tg.sendPhoto(chat_id, hasil, "hay")
                } else {
                    return tg.sendPhoto(chat_id, hasil, "hay")
                }
            }   else    {
                if (!outgoing) {
                    return tg.sendMessage(chat_id, `Gagal Mendapatkan data`);
                } else {
                    return tg.editMessageText(chat_id, msg_id, `Gagal mungkin sedang perbaikan`);
                }
            }
        } 
    }
}
module.exports = {
    pinterest
}
