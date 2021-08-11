var video = {
    name: 'video',
    status: true,
    clue: ['Fungsi: upload file', 'Format: .uvideo ./video.mp4'],
    run: async function (airgram, msg,tg) {
        var chat_id = msg.chat.id;
        var user_id = msg.from.id;
        var chat_type = msg.chat.type;
        var text = msg.text;
        var msg_id = msg.message_id;
        var msgr = msg.reply_to_message ? msg.reply_to_message : false;
        var outgoing = msg.outgoing ? true : false;
        if (RegExp("^[\/\.\!]uvideo ", "i").exec(text)) {
            return tg.sendVideo(chat_id, text.replace(/(^[\/\.\!]uvideo )/ig,"")).catch(function(e){
                return tg.sendMessage(chat_id, `Error ${e.message}`)
            })
        }
    }
}
module.exports = {
    video
}
