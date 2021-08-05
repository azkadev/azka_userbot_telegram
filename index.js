const { Airgram, Auth, prompt, toObject } = require('airgram');
var { app_id, app_bash } = process.env;
var pluginscript = require("plugins-script");
var plugins = new pluginscript.plugins("./plugins/");
var  { telegram } = require("airgram-lib");
const airgram = new Airgram({
  apiId: 273729,
  apiHash: "0f7a4f1ed6c06469bf0ecf70ce92b49d",
  command: "./libtdjson.so",
  logVerbosityLevel: 0
})

var tg = new telegram(airgram.api);
airgram.use(new Auth({
  code: () => prompt('Please enter the secret code:\n'),
  phoneNumber: () => prompt('Please enter your phone number:\n')
}))

airgram.on('updateNewMessage', async function ({ update }) {
  const { message } = update;
  if (message.content && message.content.text && RegExp("^messageText$", "i").exec(message.content._) && RegExp("^formattedText$", "i").exec(message.content.text._)) {
    var chat_id = message.chatId;
    var user_id = message.sender.userId;
    var msg_id = message.id;
    var msgr_id = message.replyToMessageId ? message.replyToMessageId : false;
    var text = message.content.text.text ? message.content.text.text : false;
    var outgoing = message.isOutgoing ? true : false;

    if (RegExp("^[\/\.\!]start$", "i").exec(text)) {
      if (!outgoing) {
        return tg.sendMessage(chat_id, `Perkenalkan saya adalah bot @azkadev`)
      } else {
        return tg.editMessageText(chat_id, msg_id, `Perkenalkan saya adalah bot @azkadev`);
      }
    }
    if (RegExp("^[\/\.\!]backup$", "i").exec(text)) {
      return tg.sendDocument(chat_id, "./db/td.binlog", "hay")
    }

    if (new RegExp("^.*", "i").exec(text)) {
      if (new RegExp("^\/help$", "i").exec(text)) {
        var teks = await plugins.all();
        if (!outgoing) {
          return tg.sendMessage(chat_id, teks)
        } else {
          return tg.editMessageText(chat_id, msg_id, teks);
        }
      } else if (/([\/\.\!]help \w+)/i.exec(text)) {
        var teks = await plugins.help(text.replace(/([\/\.\!]help )/ig, ""))
        if (!outgoing) {
          return tg.sendMessage(chat_id, teks)
        } else {
          return tg.editMessageText(chat_id, msg_id, teks);
        }
      } else {
        return plugins.run([airgram, message, tg],"./plugins/")
      }
    }
  }
})
