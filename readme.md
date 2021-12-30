# Azka Userbot Telegram

## Feature
- Support User and Bot
- Login in Bot
- Multiple Client

## Example Create Plugin

- For Update message text
```json
{
    "text": "hello",
    "regex": false,
    "flags": "i",
    "respond": [
        {
            "method": "sendMessage",
            "text": "Hello world"
        }
    ]
}
```