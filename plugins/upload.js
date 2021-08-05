var upload = {
    name: 'upload',
    status: true,
    clue: ['Fungsi: upload file', 'Format: <code>.udoc ./package.json</code>\n.upoto ./img.jpg\n.uvideo ./video.mp4\n.uaudio ./audio.mp3'],
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
        if (RegExp("^[\/\.\!]udoc ", "i").exec(text)) {
            return tg.sendDocument(chat_id, text.replace(/(^[\/\.\!]udoc )/ig,"")).catch(function(e){
                return tg.sendMessage(chat_id, `Error ${e.message}`)
            })
        }
        if (RegExp("^[\/\.\!]upoto ", "i").exec(text)) {
            return tg.sendPhoto(chat_id, text.replace(/(^[\/\.\!]poto )/ig,"")).catch(function(e){
                return tg.sendMessage(chat_id, `Error ${e.message}`)
            })
        }
        if (RegExp("^[\/\.\!]video ", "i").exec(text)) {
            return tg.sendVideo(chat_id, text.replace(/(^[\/\.\!]video )/ig,"")).catch(function(e){
                return tg.sendMessage(chat_id, `Error ${e.message}`)
            })
        }
        if (RegExp("^[\/\.\!]audio ", "i").exec(text)) {
            return tg.sendAudio(chat_id, text.replace(/(^[\/\.\!]audio )/ig,"")).catch(function(e){
                return tg.sendMessage(chat_id, `Error ${e.message}`)
            })
        }
    }
}
module.exports = {
    upload
}
