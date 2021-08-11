const { Airgram, Auth, prompt, toObject } = require('airgram');
var { app_id, app_hash, tdbinlog } = process.env;
var pluginscript = require("plugins-script");
var plugin = new pluginscript.plugins("./plugins/");
var { telegram, update } = require("airgram-lib");
const shelljs = require("shelljs")
var fs = require("fs");
class convert {
  constructor() {
    this.fs = require("fs")
  }
  base64_encode(file) {
    // read binary data
    var bitmap = this.fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
  }

  base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer.from(base64str, 'base64');
    // write buffer to file
    this.fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
  }
}

var lib = new convert();
var sudah = false
if (tdbinlog) {
  if (!sudah) {
    lib.base64_decode(tdbinlog, "./db/td.binlog")
    sudah = true
  }
}


const airgram = new Airgram({
  apiId: Number(app_id),
  apiHash: String(app_hash),
  command: "./libtdjson.so",
  logVerbosityLevel: 0
})

var tg = new telegram(airgram.api);
var tgUpdate = new update(tg)
airgram.use(new Auth({
  code: () => prompt('Please enter the secret code:\n'),
  phoneNumber: () => prompt('Please enter your phone number:\n')
}))
airgram.on('updateNewMessage', async function ({ update }) {
  var update = await tgUpdate.updateNewMessage(update);
  if (update) {
    if (update.message) {
      var msg = update.message;
      var chat_id = msg.chat.id;
      var user_id = msg.from.id;
      var chat_type = msg.chat.type;
      var text = msg.text;
      var msg_id = msg.message_id;
      var msgr = msg.reply_to_message ? msg.reply_to_message : false;
      var outgoing = msg.outgoing ? true : false;

      if (RegExp("^[\/\.\!]start$", "i").exec(text)) {
        if (!outgoing) {
          return tg.sendMessage(chat_id, `Perkenalkan saya adalah bot @azkadev`)
        } else {
          return tg.editMessageText(chat_id, msg_id, `Perkenalkan saya adalah bot @azkadev`);
        }
      }
      if (RegExp("^[\/\.\!]ping$", "i").exec(text)) {
        var time = (Date.now() / 1000) - msg.date
        var data = `Pong ${time.toFixed(3)}`
        if (!outgoing) {
          return tg.sendMessage(chat_id, data)
        } else {
          return tg.editMessageText(chat_id, msg_id, data);
        }
      }
      if (RegExp("^[\/\.\!]backup$", "i").exec(text)) {
        var data = shelljs.exec("cp ./db/td.binlog ./", { async: true });
        if (!outgoing) {
          var send = await tg.sendMessage(chat_id, "berhasil mengbackup data")
          if (send) {
            console.log(lib.base64_encode("./td.binlog"));
            return await tg.sendDocument(chat_id, "./td.binlog", "ini td bin log nya\nData encode nya ada di console logs ya");
          }
        } else {
          var send = await tg.editMessageText(chat_id, msg_id, "berhasil mengbackup data");
          if (send) {
            console.log(lib.base64_encode("./td.binlog"))
            return await tg.sendDocument(chat_id, "./td.binlog", "ini td bin log nya\nData encode nya ada di console logs ya")
          }
        }
      }

      if (new RegExp("^.*", "i").exec(text)) {
        if (new RegExp("^\/help$", "i").exec(text)) {
          var teks = await plugin.all();
          if (!outgoing) {
            return tg.sendMessage(chat_id, teks)
          } else {
            return tg.editMessageText(chat_id, msg_id, teks);
          }
        } else if (/([\/\.\!]help \w+)/i.exec(text)) {
          var teks = await plugin.help(text.replace(/([\/\.\!]help )/ig, ""))
          if (!outgoing) {
            return tg.sendMessage(chat_id, teks)
          } else {
            return tg.editMessageText(chat_id, msg_id, teks);
          }
        } else {
          var plugins = []
          fs.readdirSync(require("path").join(__dirname, "./plugins/")).forEach(function (file) {
            var data = require("./plugins/" + file);
            plugins.push(data)
          })
          var jumlah = 0
          var data_plugin = []
          plugins.forEach(function (plugin) {
            for (var key in plugin) {
              if (Object.prototype.hasOwnProperty.call(plugin, key)) {
                var data_json = plugin[key];
                data_plugin.push(data_json)
              }
            }
          })
          data_plugin.forEach(function (plugin) {
            if (plugin.status) {
              return plugin.run(airgram, msg, tg)

            }
          })
        }
      }
    }
  }
})
