# Azka Userbot Telegram

## Demo

## Feature
- Support User and Bot
- Login in Bot
- Multiple Client

## Example Create Plugin

- For Update message text
```js
var plugins = {
    "name": "ping",
    "is_active": true,
    "script": async function (tg, update, is_userbot) {
        if (typeof update["message"] == "object") {
            if (typeof update["message"]["text"] == "string") {
                if (RegExp("^/ping$", "i").exec(update["message"]["text"])) {
                    if (is_userbot) {
                        if (update["message"]["is_outgoing"]) {
                            return await tg.request("editMessageText", {
                                "chat_id": msg["chat"]["id"],
                                "message_id": msg["message_id"],
                                "text": "Pong"
                            });
                        }
                    }
                    return await tg.request("sendMessage", {
                        "chat_id": msg["chat"]["id"],
                        "text": "Pong"
                    });
                }
            }
        }
    }
};
module.exports = {
    plugins
};
```


```bash
.
├── assets
├── client
│   ├── bot
│   │   ├── animations
│   │   ├── documents
│   │   ├── music
│   │   ├── passport
│   │   ├── photos
│   │   ├── profile_photos
│   │   ├── secret
│   │   ├── secret_thumbnails
│   │   ├── stickers
│   │   ├── temp
│   │   ├── thumbnails
│   │   ├── video_notes
│   │   ├── videos
│   │   ├── voice
│   │   └── wallpapers
│   └── userbot
│       ├── animations
│       ├── documents
│       ├── music
│       ├── passport
│       ├── photos
│       ├── profile_photos
│       ├── secret
│       ├── secret_thumbnails
│       ├── stickers
│       ├── temp
│       ├── thumbnails
│       ├── video_notes
│       ├── videos
│       ├── voice
│       └── wallpapers
├── db
├── docs
├── plugin
└── util

70 directories
```