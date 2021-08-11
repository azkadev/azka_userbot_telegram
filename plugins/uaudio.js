var uaudio = {
    name: 'audio',
    status: true,
    clue: ['Fungsi: upload audio', 'Format: <code>.uaudio ./audio.mp3</code>'],
    run: async function (airgram, msg,tg) {
        var chat_id = msg.chat.id;
        var user_id = msg.from.id;
        var chat_type = msg.chat.type;
        var text = msg.text;
        var msg_id = msg.message_id;
        var msgr = msg.reply_to_message ? msg.reply_to_message : false;
        var outgoing = msg.outgoing ? true : false;
        if (RegExp("^[\/\.\!]uaudio ", "i").exec(text)) {
            return tg.sendAudio(chat_id, text.replace(/(^[\/\.\!]uaudio )/ig,"")).catch(function(e){
                return tg.sendMessage(chat_id, `Error ${e.message}`)
            })
        }
    }
}
module.exports = {
    uaudio
}
