
const bmkg = require("bmkg-scrape")
var gempa = {
    name: 'gempa',
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
        
        if (new RegExp("^\/gempa", "i").exec(text)) {
            var data = (await bmkg.autogempa()).message
            if (data.Infogempa && data.Infogempa.gempa) {
                var hasil = data.Infogempa.gempa
                var teks = `Hasil gempa ${hasil.Tanggal}`
                teks += `\nJam ${hasil.Jam}`
                teks += `\nWilayah ${hasil.Wilayah}`
                teks += `\nPotensi ${hasil.Potensi}`
            }   else    {
                var teks = "gagal mungkin sedang dalam perbaikan"
            }
            if (!outgoing) {
                return tg.sendMessage(chat_id, teks)
            } else {
                return tg.editMessageText(chat_id, msg_id, teks);
            }
        }
    }
}
module.exports = {
    gempa
}
