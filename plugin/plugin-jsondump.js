var plugins = {
    "name": "jsondump",
    "is_active": true,
    "script": async function (tg_client, update, is_userbot) {
        if (typeof update["message"] == "object") {
            if (typeof update["message"]["text"] == "string") {
                if (RegExp("^/jsondump$", "i").exec(update["message"]["text"])) {
                    var message = JSON.stringify(update, null, 2);
                    if (is_userbot) {
                        if (update["message"]["is_outgoing"]) {
                            return await tg_client.request("editMessageText", {
                                "chat_id": update["message"]["chat"]["id"],
                                "message_id": msg["message_id"],
                                "text": message
                            });
                        }
                    }
                    return await tg_client.request("sendMessage", {
                        "chat_id": update["message"]["chat"]["id"],
                        "text": message
                    });
                }
            }
        }
    }
};
module.exports = plugins;