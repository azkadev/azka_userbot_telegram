var fetch = require("node-fetch")
var pinterest = {
    name: 'pnterest',
    status: true,
    clue: ['Fungsi: upload file', 'Format: /pinterest ronaldo'],
    run: async function (airgram, msg,tg) {
        var chat_id = msg.chat.id;
        var user_id = msg.from.id;
        var chat_type = msg.chat.type;
        var text = msg.text;
        var msg_id = msg.message_id;
        var msgr = msg.reply_to_message ? msg.reply_to_message : false;
        var outgoing = msg.outgoing ? true : false;

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
