var fetch = require("node-fetch")
var cuaca = {
    name: 'cuaca',
    status: true,
    clue: ['Fungsi: upload file', 'Format: /cuaca kota'],
    run: async function (airgram, msg,tg) {
        var chat_id = msg.chat.id;
        var user_id = msg.from.id;
        var chat_type = msg.chat.type;
        var text = msg.text;
        var msg_id = msg.message_id;
        var msgr = msg.reply_to_message ? msg.reply_to_message : false;
        var outgoing = msg.outgoing ? true : false;

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

