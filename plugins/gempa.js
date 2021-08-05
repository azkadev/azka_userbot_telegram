
const bmkg = require("bmkg-scrape")
var gempa = {
    name: 'gempa',
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
