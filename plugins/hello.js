var namaplugin = {
    name: 'hello',
    status: true,
    clue: ['Fungsi: plugin kamu', 'Format: <code>.helo</code>'],
    run: async function (airgram, msg, tg) {
        //--! variable tambahan !--\\
        var chat_id = msg.chat.id;
        var user_id = msg.from.id;
        var chat_type = msg.chat.type;
        var text = msg.text;
        var msg_id = msg.message_id;
        var msgr = msg.reply_to_message ? msg.reply_to_message : false;
        var outgoing = msg.outgoing ? true : false;

        //--! Deteksi kata user !--\\
        //--! Jika ada kata helo ke bot maka bot akan merespons hello world !--\\
        if (RegExp("^[\/\.\!]helo", "i").exec(text)) {
            //--! paste your code here !--\\
            return tg.sendMessage(chat_id, "hello azka tech enthusiast")
        }
    }
}
module.exports = {
    //--! isi sesuai nama plugin kamu not jangan memakai spasi dan - usahakan tanpa tanda simbol !--\\
    namaplugin
};