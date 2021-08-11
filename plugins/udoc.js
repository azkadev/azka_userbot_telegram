var udoc = {
    name: 'udoc',
    status: true,
    clue: ['Fungsi: upload file', 'Format: <code>.udoc ./package.json</code>'],
    run: async function (update) {
        var airgram = update[0];
        var msg = update[1];
        var tg = update[2]
        var chat_id = msg.chat.id;
        var user_id = msg.from.id;
        var chat_type = msg.chat.type;
        var text = msg.text;
        var msg_id = msg.message_id;
        var msgr = msg.reply_to_message ? msg.reply_to_message : false;
        var outgoing = msg.outgoing ? true : false;
        if (RegExp("^[\/\.\!]udoc ", "i").exec(text)) {
            return tg.sendDocument(chat_id, text.replace(/(^[\/\.\!]udoc )/ig,"")).catch(function(e){
                return tg.sendMessage(chat_id, `Error ${e.message}`)
            })
        }
    }
}
module.exports = {
    udoc
}
