var { client } = require("./client");
var { telegram, telegramApi } = require("tdl-lib");
var telegrambot = new telegram(`./client/${client["bot_user_id"] ?? Date.now()}`);
var telegramuser = new telegram(`./client/${client["phone_number"] ?? Date.now()}`);
var tg = new telegramApi(telegrambot.client);
var tg_user = new telegramApi(telegramuser.client);
var fs = require("node:fs/promises");
var timer = require("node:timers");
var timers = require("node:timers/promises");
var cur_user_id = "";
var caps_lock = false;
var state_data = {
    "phone_number": client["phone_number"] ?? "62",
    "code": "",
    "password": ""
};
function acces_data(data, check_user) {
    if (typeof data != "object") {
        return false;
    }
    if (data.includes(check_user)) {
        return true;
    } else {
        return false;
    }
}

var curAuthState = {};
var curAuthData = {};
var list_plugins = [];

telegrambot.on('update', async function (update) {
    try {
        if (typeof update == "object") {
            if (typeof update["callback_query"] == "object") {
                var cb = update["callback_query"];
                var cbm = cb["message"];
                var isText = cbm["text"] ?? "";
                var cbm_caption = cbm["caption"] ?? "";
                var user_id = cb["from"]["id"];
                var chat_id = cbm["chat"]["id"];
                var chat_type = String(cbm["chat"]["type"]).replace(RegExp("super", "i"), "");
                var chat_title = cbm["chat"]["title"] ?? "";
                var chat_username = (cbm["chat"]["username"]) ? `@${cbm["chat"]["username"]}` : "";
                var msg_id = cbm["message_id"];
                var text = cb["data"];
                var fromId = cb["from"]["id"];
                var fromFname = cb["from"]["first_name"];
                var fromLname = cb["from"]["last_name"] ?? "";
                var fromFullName = `${fromFname} ${fromLname}`;
                var fromUsername = (cb["from"]["username"]) ? `@${cb["from"]["username"]}` : "";
                var fromLanguagecode = cb["from"]["language_code"] ?? "id";
                var mentionFromMarkdown = `[${fromFullName}](tg://user?id=${user_id})`;
                var mentionFromHtml = `<a href='tg://user?id=${user_id}'>${fromFullName}</a>`;
                var sub_data = text.replace(/(.*:|=.*)/ig, "");
                var sub_id = text.replace(/(.*=|\-.*)/ig, "");
                var sub_sub_data = text.replace(/(.*\-)/ig, "");
                var key = { "chat": { "id": chat_id } };


                try {
                    if (text) {
                        if (RegExp("^login$", "i").exec(text)) {
                            cur_user_id = user_id;
                            try {
                                await telegramuser.user();
                                var data = {
                                    "chat_id": chat_id,
                                    "text": `Login User Bot`,
                                };
                                return await tg.request("sendMessage", data);
                            } catch (e) {
                                return await tg.sendMessage(chat_id, "Start Client UserBot Gagal!");
                            }
                        }


                        if (RegExp("^sign:.*", "i").exec(text)) {
                            var option = {
                                "chat_id": chat_id,
                                "text": "Menu Sign",
                                "message_id": msg_id,
                            };

                            if (RegExp("^(phone_number|code|password)_add$", "i").exec(sub_data)) {
                                if (typeof cbm["reply_markup"] == "object" && typeof cbm["reply_markup"]["inline_keyboard"] == "object") {
                                    var getTypeAdd = String(sub_data).replace(/(_add.*)/i, "").toLocaleLowerCase();
                                    if (getTypeAdd == "phone_number") {
                                        state_data["phone_number"] += sub_id;
                                        option["text"] = `Sign\nPhone Number: ${state_data["phone_number"]}`;
                                    } else if (getTypeAdd == "code") {
                                        state_data["code"] += sub_id;
                                        option["text"] = `Sign\nCode: ${state_data["code"]}`;
                                    } else if (getTypeAdd == "password") {
                                        var getPasswordAdd = String(text).replace(/(.*=)/i, "");
                                        if (typeof caps_lock == "boolean" && caps_lock) {
                                            state_data["password"] += getPasswordAdd.toLocaleUpperCase();
                                        } else {
                                            state_data["password"] += getPasswordAdd.toLocaleLowerCase();
                                        }
                                        option["text"] = `Sign\nPassword: ${state_data["password"]}`;
                                    } else {
                                        return await tg.request("answerCallbackQuery", {
                                            "callback_query_id": cb["id"],
                                            "show_alert": true,
                                            "text": "Oops Ada kesalahan"
                                        });
                                    }
                                    option["reply_markup"] = cbm["reply_markup"];
                                    return await tg.request("editMessageText", option);
                                } else {
                                    option["text"] = `Ops terjadi kesalahan tolong ulangin lagi dari awal ya!`;
                                    return await tg.request("editMessageText", option);
                                }
                            }


                            if (RegExp("^(phone_number|code|password)$", "i").exec(sub_data)) {
                                if (RegExp("^clear_all$", "i").exec(sub_id)) {
                                    if (state_data[sub_data].length > 0) {
                                        state_data[sub_data] = "";
                                    } else {
                                        return await tg.request("answerCallbackQuery", {
                                            "callback_query_id": cb["id"],
                                            "show_alert": true,
                                            "text": `${sub_data} sudah di delete semuanya Tolong jangan flood ya!`
                                        });
                                    }
                                } else {
                                    if (state_data[sub_data].length > 0) {
                                        state_data[sub_data] = state_data[sub_data].substring(0, state_data[sub_data].length - 1);
                                    } else {
                                        return await tg.request("answerCallbackQuery", {
                                            "callback_query_id": cb["id"],
                                            "show_alert": true,
                                            "text": `${sub_data} sudah di delete semuanya Tolong jangan flood ya!`
                                        });
                                    }
                                }
                                if (typeof cbm["reply_markup"] == "object" && typeof cbm["reply_markup"]["inline_keyboard"] == "object") {
                                    if (sub_data == "phone_number") {
                                        option["text"] = `Sign\nPhone Number: ${state_data["phone_number"]}`;
                                    } else if (sub_data == "code") {
                                        option["text"] = `Sign\nCode: ${state_data["code"]}`;
                                    } else if (sub_data == "password") {
                                        option["text"] = `Sign\nPassword: ${state_data["password"]}`;
                                    } else {
                                        return await tg.request("answerCallbackQuery", {
                                            "callback_query_id": cb["id"],
                                            "show_alert": true,
                                            "text": "Oops Ada kesalahan"
                                        });
                                    }
                                    option["reply_markup"] = cbm["reply_markup"];
                                    return await tg.request("editMessageText", option);
                                } else {
                                    option["text"] = `Ops terjadi kesalahan tolong ulangin lagi dari awal ya!`;
                                    return await tg.request("editMessageText", option);
                                }
                            }
                            if (RegExp("^capslock$", "i").exec(sub_data)) {
                                var setCapsLock = (String(sub_id).toLocaleLowerCase() == "on") ? true : false;
                                caps_lock = setCapsLock;
                                var textLower = "1234567890abcdefghijklmnopqrstuvwxyz";
                                var textUpper = "1234567890abcdefghijklmnopqrstuvwxyz".toLocaleUpperCase();
                                var data = [...textLower];
                                if (caps_lock) {
                                    data = [...textUpper];
                                }
                                var inline_keyboard = [];
                                for (var i = 0, ii = (data.length / 2); i < (data.length / 2); i++, ii++) {
                                    inline_keyboard.push(
                                        [
                                            {
                                                "text": String(data[i]),
                                                "callback_data": `sign:password_add=${data[i]}`
                                            },
                                            {
                                                "text": String(data[ii]),
                                                "callback_data": `sign:password_add=${data[ii]}`
                                            }
                                        ]
                                    );
                                }
                                inline_keyboard.push(
                                    [
                                        {
                                            "text": "Clear All",
                                            "callback_data": "sign:password=clear_all"
                                        },
                                        {
                                            "text": "Remove",
                                            "callback_data": "sign:password=remove"
                                        }
                                    ],
                                    [
                                        {
                                            "text": `CapsLock  ${setCapsLock ? "ON" : "OFF"}`,
                                            "callback_data": `sign:capslock=${setCapsLock ? "OFF" : "ON"}`
                                        }
                                    ],
                                    [
                                        {
                                            "text": "Send password",
                                            "callback_data": "sign:request=password"
                                        }
                                    ]
                                );
                                option["text"] = `Sign\nPassword: ${state_data["password"]}`;
                                option["reply_markup"] = {
                                    "inline_keyboard": inline_keyboard
                                }
                                return await tg.request("editMessageText", option);

                            }
                            if (RegExp("^request$", "i").exec(sub_data)) {
                                if (state_data[sub_id].length < 5) {
                                    return await tg.request("answerCallbackQuery", {
                                        "callback_query_id": cb["id"],
                                        "show_alert": true,
                                        "text": `Tolong masukan ${sub_id} terlebih dahulu dengan benar ya!`
                                    });
                                }
                                await timer.setTimeout(2000);
                                try {
                                    if (sub_id == "phone_number") {
                                        await tg_user.setAuthenticationPhoneNumber(state_data[sub_id]);
                                    } else if (sub_id == "code") {
                                        await tg_user.checkAuthenticationCode(state_data[sub_id]);
                                    } else if (sub_id == "password") {
                                        await tg_user.checkAuthenticationPassword(state_data[sub_id]);
                                    } else {
                                        return await tg.request("answerCallbackQuery", {
                                            "callback_query_id": cb["id"],
                                            "show_alert": true,
                                            "text": "Oops Ada kesalahan"
                                        });
                                    }
                                    return await tg.deleteMessage(chat_id, msg_id, true);
                                } catch (e) {
                                    return await tg.request("answerCallbackQuery", {
                                        "callback_query_id": cb["id"],
                                        "show_alert": true,
                                        "text": `Failed\n${e.message}`
                                    });
                                }
                            }
                        }

                    }
                } catch (e) {
                    var data = {
                        "chat_id": chat_id,
                        "text": e.message
                    };
                    return await tg.request("sendMessage", data);
                }

            }
            if (typeof update["message"] == "object") {
                var msg = update["message"];
                var chat_id = msg["chat"]["id"];
                var user_id = msg["from"]["id"];
                var chat_type = String(msg["chat"]["type"]).replace(/(super)/i, "");
                var text = msg["text"] ?? "";
                var is_outgoing = msg["outgoing"] ?? false;
                try {
                    if (!is_outgoing) {

                        if (text) {
                            if (RegExp("^/reload$", "i").exec(text)) {
                                var result = await fs.readdir("./plugin");
                                if (typeof result == "object" && result.length > 0) {
                                    var list_file = [];
                                    for (var index = 0; index < result.length; index++) {
                                        var loop_data = result[index];
                                        if (RegExp(`^plugin-\w+\.js$`, "i").exec(loop_data)) {
                                            list_file.push(loop_data);
                                        }
                                    }
                                    if (list_file.length > 0) {
                                        var list_plugin_loaded = [];
                                        var message = "";
                                        for (var index = 0; index < list_file.length; index++) {
                                            var loop_data = list_file[index];
                                            var plugin_load = require(`./plugin/${loop_data}`);
                                            if (plugin_load["is_active"]) {
                                                list_plugin_loaded.push(plugin_load);
                                                if (plugin_load["name"]) {
                                                    message += `\n${plugin_load["name"]}`;
                                                }
                                            }
                                        }
                                        list_plugins = list_plugin_loaded;
                                        var data = {
                                            "chat_id": chat_id,
                                            "text": `Succes reloaded plugins total ${list_plugins.length}\n${message}`
                                        };
                                        return await tg.request("sendMessage", data);
                                    } else {
                                        var data = {
                                            "chat_id": chat_id,
                                            "text": "Oops plugin kosong"
                                        };
                                        return await tg.request("sendMessage", data);
                                    }
                                }

                            }

                            if (RegExp("/start", "i").exec(text)) {
                                if (chat_type == "group") {
                                    var data = {
                                        "chat_id": chat_id,
                                        "text": "Hay perkenalkan saya adalah robot"
                                    };
                                    return await tg.request("sendMessage", data);
                                }
                                if (acces_data(client["admins_user_id"], user_id)) {
                                    var data = {
                                        "chat_id": chat_id,
                                        "text": "Hay perkenalkan saya adalah robot",
                                        "reply_markup": {
                                            "inline_keyboard": [
                                                [
                                                    {
                                                        "text": "Login User Bot",
                                                        "callback_data": "login"
                                                    }
                                                ]
                                            ]
                                        }
                                    };
                                    return await tg.request("sendMessage", data);
                                } else {
                                    return await tg.sendMessage(chat_id, "Oops command ini khusus admin tolong kamu jangan pakai ya!");
                                }

                            }
                        }
                    }
                } catch (e) {
                    var data = {
                        "chat_id": chat_id,
                        "text": e.message
                    };
                    return await tg.request("sendMessage", data);
                }
            }

            if ((typeof update["message"] == "object" || typeof update["channel_post"] == "object") && typeof list_plugins == "object" && list_plugins.length > 0) {
                for (var index = 0; index < list_plugins.length; index++) {
                    var loop_data = list_plugins[index];
                    if (typeof loop_data["script"] == "function") {
                        try {
                            await loop_data["script"](tg, update, false);
                        } catch (e) {

                        }
                    }
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
});

telegramuser.on('update', async function (update) {
    try {
        if (typeof update == "object") {
            if (typeof update["_"] == "string") {
                if (RegExp("^updateAuthorizationState$", "i").exec(update['_'])) {
                    if (acces_data(client["admins_user_id"], cur_user_id)) {
                        if (RegExp("^authorizationStateWaitPhoneNumber$", "i").exec(update["authorization_state"]['_'])) {
                            var inline_keyboard = [];
                            for (var i = 0, ii = 5; i < 5; i++, ii++) {
                                inline_keyboard.push(
                                    [
                                        {
                                            "text": String(i),
                                            "callback_data": `sign:phone_number_add=${i}`
                                        },
                                        {
                                            "text": String(ii),
                                            "callback_data": `sign:phone_number_add=${ii}`
                                        }
                                    ]
                                );
                            }
                            inline_keyboard.push(
                                [
                                    {
                                        "text": "Clear All",
                                        "callback_data": "sign:phone_number=clear_all"
                                    },
                                    {
                                        "text": "Remove",
                                        "callback_data": "sign:phone_number=remove"
                                    }
                                ],
                                [
                                    {
                                        "text": "Send Phone Number",
                                        "callback_data": "sign:request=phone_number"
                                    }
                                ]
                            );
                            var option = {
                                "chat_id": cur_user_id,
                                "text": `Silahkan isi nomor ponsel anda ya!\nsign: ${state_data["phone_number"]}`,
                                "reply_markup": {
                                    "inline_keyboard": inline_keyboard
                                }
                            };
                            return await tg.request("sendMessage", option);
                        }

                        if (RegExp("^authorizationStateWaitCode$", "i").exec(update["authorization_state"]['_'])) {
                            var inline_keyboard = [];
                            for (var i = 0, ii = 5; i < 5; i++, ii++) {
                                inline_keyboard.push(
                                    [
                                        {
                                            "text": String(i),
                                            "callback_data": `sign:code_add=${i}`
                                        },
                                        {
                                            "text": String(ii),
                                            "callback_data": `sign:code_add=${ii}`
                                        }
                                    ]
                                );
                            }
                            inline_keyboard.push(
                                [
                                    {
                                        "text": "Clear All",
                                        "callback_data": "sign:code=clear_all"
                                    },
                                    {
                                        "text": "Remove",
                                        "callback_data": "sign:code=remove"
                                    }
                                ],
                                [
                                    {
                                        "text": "Send Code",
                                        "callback_data": "sign:request=code"
                                    }
                                ]
                            );
                            var option = {
                                "chat_id": cur_user_id,
                                "text": `Silahkan isi code verifikasi dari telegram anda ya!\nPhone_number:${state_data["phone_number"]}\nCode: ${state_data["code"]}`,
                                "reply_markup": {
                                    "inline_keyboard": inline_keyboard
                                }
                            };
                            return await tg.request("sendMessage", option);
                        }

                        if (RegExp("^authorizationStateWaitPassword$", "i").exec(update["authorization_state"]['_'])) {
                            var data = [..."1234567890abcdefghijklmnopqrstuvwxyz"];
                            var inline_keyboard = [];
                            for (var i = 0, ii = (data.length / 2); i < (data.length / 2); i++, ii++) {
                                inline_keyboard.push(
                                    [
                                        {
                                            "text": String(data[i]),
                                            "callback_data": `sign:password_add=${data[i]}`
                                        },
                                        {
                                            "text": String(data[ii]),
                                            "callback_data": `sign:password_add=${data[ii]}`
                                        }
                                    ]
                                );
                            }
                            inline_keyboard.push(
                                [
                                    {
                                        "text": "Clear All",
                                        "callback_data": "sign:password=clear_all"
                                    },
                                    {
                                        "text": "Remove",
                                        "callback_data": "sign:password=remove"
                                    }
                                ],
                                [
                                    {
                                        "text": `CapsLock  ${caps_lock ? "ON" : "OFF"}`,
                                        "callback_data": `sign:capslock=${caps_lock ? "OFF" : "ON"}`
                                    }
                                ],
                                [
                                    {
                                        "text": "Send password",
                                        "callback_data": "sign:request=password"
                                    }
                                ]
                            );
                            var option = {
                                "chat_id": cur_user_id,
                                "text": `Silahkan Isi Password anda\nPassword: ${state_data["password"]}`,
                                "reply_markup": {
                                    "inline_keyboard": inline_keyboard
                                }
                            };
                            return await tg.request("sendMessage", option);
                        }

                        if (RegExp("^authorizationStateReady$", "i").exec(update.authorization_state['_'])) {
                            var get_active = await tg_user.invoke("getActiveSessions");
                            var pesan = "📥 Event: " + get_active["_"];
                            for (var x in get_active.sessions) {
                                pesan += '\n\n🔑 Api_Id: ' + get_active.sessions[x]["api_id"];
                                pesan += '\n📱 Model: ' + get_active.sessions[x]["device_model"];
                                pesan += '\n📲 Device: ' + get_active.sessions[x]["platform"];
                                pesan += '\n🔧 System: ' + get_active.sessions[x]["system_version"];
                                pesan += '\n💻 Ip: ' + get_active.sessions[x]["ip"];
                                pesan += '\n🚪 Location: ' + get_active.sessions[x]["country"];
                            }
                            await tg.sendMessage(cur_user_id, pesan);
                            var getME = await tg_user.getMe();
                            var pesan = "📥 Event: " + getME["_"];
                            pesan += '\n\n👤 First Name: ' + getME["first_name"];
                            if (getME["last_name"]) {
                                pesan += '\n👤 Last Name: ' + getME["last_name"];
                            }
                            if (getME["username"]) {
                                pesan += '\n🔰 Username: @' + getME["username"];
                            }
                            if (getME["phone_number"]) {
                                pesan += '\n☎️ sign: ' + getME["phone_number"];
                            }
                            pesan += "\n";
                            pesan += `\n- contact ${getME["is_contact"]}`;
                            pesan += `\n- mutual_contact ${getME["is_mutual_contact"]}`;
                            pesan += `\n- support ${getME["is_support"]}`;
                            await tg.sendMessage(cur_user_id, pesan);
                            var data = {
                                "chat_id": cur_user_id,
                                "text": "Menu bot"
                            };
                            return await tg.request("sendMessage", data);
                        }
                    } else {
                        return await tg.sendMessage(cur_user_id, 'Kamu tidak punya akses!');
                    }
                }
            }
            if (typeof update["message"] == "object") {
                var msg = update["message"];
                var chat_id = msg["chat"]["id"];
                var user_id = msg["from"]["id"];
                var chat_type = String(msg["chat"]["type"]).replace(/(super)/i, "");
                var text = msg["text"] ?? "";
                var is_outgoing = msg["outgoing"] ?? false;
                try {

                    if (text) {
                        if (RegExp("^/reload$", "i").exec(text)) {
                            var result = await fs.readdir("./plugin");
                            if (typeof result == "object" && result.length > 0) {
                                var list_file = [];
                                for (var index = 0; index < result.length; index++) {
                                    var loop_data = result[index];
                                    if (RegExp(`^plugin-\w+\.js$`, "i").exec(loop_data)) {
                                        list_file.push(loop_data);
                                    }
                                }
                                if (list_file.length > 0) {
                                    var list_plugin_loaded = [];
                                    var message = "";
                                    for (var index = 0; index < list_file.length; index++) {
                                        var loop_data = list_file[index];
                                        var plugin_load = require(`./plugin/${loop_data}`);
                                        if (plugin_load["is_active"]) {
                                            list_plugin_loaded.push(plugin_load);
                                            if (plugin_load["name"]) {
                                                message += `\n${plugin_load["name"]}`;
                                            }
                                        }
                                    }
                                    list_plugins = list_plugin_loaded;
                                    if (is_outgoing) {
                                        var data = {
                                            "chat_id": chat_id,
                                            "message_id": msg["message_id"],
                                            "text": `Succes reloaded plugins total ${list_plugins.length}\n${message}`
                                        };
                                        return await tg_user.request("editMessageText", data);
                                    } else {
                                        var data = {
                                            "chat_id": chat_id,
                                            "text": `Succes reloaded plugins total ${list_plugins.length}\n${message}`
                                        };
                                        return await tg_user.request("sendMessage", data);
                                    }
                                } else {
                                    var data = {
                                        "chat_id": chat_id,
                                        "text": "Oops plugin kosong"
                                    };
                                    return await tg_user.request("sendMessage", data);
                                }
                            }

                        }

                    }



                } catch (e) {
                    var data = {
                        "chat_id": chat_id,
                        "text": e.message
                    };
                    return await tg_user.request("sendMessage", data);

                }
            }

            if ((typeof update["message"] == "object" || typeof update["channel_post"] == "object") && typeof list_plugins == "object" && list_plugins.length > 0) {
                for (var index = 0; index < list_plugins.length; index++) {
                    var loop_data = list_plugins[index];
                    if (typeof loop_data["script"] == "function") {
                        try {
                            await loop_data["script"](tg_user, update, true);
                        } catch (e) {

                        }
                    }
                }
            }

        }

    } catch (e) {
        console.log(e.message);
        return await tg.sendMessage(cur_user_id, e.message);
    }
})

telegrambot.bot(client["token_bot"]).then(res => console.log("succes login")).catch(error => console.log("failed"));