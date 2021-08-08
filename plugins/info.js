const os = require("os")
function systeminfo(name) {
    /*
    lib @azkadev
    */
    function file_Size(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        for (var i = 0; i < sizes.length; i++) {
            if (bytes <= 1024) {
                return bytes + ' ' + sizes[i];
            } else {
                bytes = parseFloat(bytes / 1024).toFixed(2)
            }
        }
        return bytes + ' P';
    }

    function formatsc(seconds) {
        function pad(s) {
            return (s < 10 ? '0' : '') + s;
        }
        var hours = Math.floor(seconds / (60 * 60));
        var minutes = Math.floor(seconds % (60 * 60) / 60);
        var seconds = Math.floor(seconds % 60);
        var msg = ``
        if (pad(hours) == 00) {
    
        } else {
            msg += pad(hours) + " Hours "
        }
    
        if (pad(minutes) == 00) {
    
        } else {
            msg += pad(hours) + " Minutes "
        }
        msg += pad(seconds) + " Seconds"
    
        return msg
    }

    var free = file_Size(os.freemem())
    var ram = file_Size(os.totalmem())
    var data = os.cpus()
    var json = {}

    json.os = `${os.type()} ${os.hostname()}`
    json.ram = `${ram} / ${free}`
    json.uptimeos = formatsc(os.uptime())
    json.uptimescript = formatsc(process.uptime())

    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var element = data[i];
            json.cpu = element.model
        }
    }
    var caption = "\n╭" + "─".repeat(10) + `「 ℹ️ Info Bot ℹ️ 」`.padStart(15)
    caption += "\n│"
    caption += "\n├ •" + "OS".padStart(3) + ":".padStart(25) + `${os.type()}`.padStart(5)
    caption += "\n├ •" + `CPU`.padStart(4) + `:`.padStart(22) + json.cpu.padStart(10)
    caption += "\n├ •" + `RAM`.padStart(4) + `:`.padStart(22) + `${ram} / ${free} Free`.padStart(9)
    caption += "\n├ •" + `Node-Js`.padStart(8) + `:`.padStart(16) + process.version.padStart(2)
    caption += "\n├ •" + `Uptime-OS`.padStart(10) + `:`.padStart(11) + formatsc(os.uptime()).padStart(23)
    caption += "\n├ •" + `Uptime-Script`.padStart(14) + `:`.padStart(6) + formatsc(process.uptime()).padStart(10)
    caption += "\n│"
    caption += "\n╰" + "─".repeat(3) + `「 ${name?name:`@azkadev`} 」`.padStart(8)
    json.message = caption
    return json
}

var info = {
    name: 'info',
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

        if (new RegExp("^\/info$", "i").exec(text)) {
            try {
                var data = systeminfo().message
                
            } catch (e) {
                var data = `Error ${e.message}`;
            }
            
            if (!outgoing) {
                return tg.sendPhoto(chat_id, `https://raw.githubusercontent.com/azkadev/azkadev/main/azkauserbot.jpg`, data);
            } else {
                return tg.sendPhoto(chat_id, `https://raw.githubusercontent.com/azkadev/azkadev/main/azkauserbot.jpg`, data);
            }
        }

    }
}
module.exports = {
    info
}
