var fetch = require("node-fetch")
var cuaca = {
    name: 'cuaca',
    status: true,
    clue: ['Fungsi: upload file', 'Format: /cuaca kota'],
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
            var response = await fetch(`https://azkadev.herokuapp.com/api/information/cuaca?text${text.replace(/(.*cuaca )/ig,"")}`).then(response => response.json())
            if (response.status) {
                var hasil = response.message;
                if (!outgoing) {
                    return tg.sendMessage(chat_id, hasil);
                } else {
                    return tg.editMessageText(chat_id, msg_id, hasil);
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
    cuaca
}

