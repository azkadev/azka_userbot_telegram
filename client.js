var client = {
    "token_bot": String(process.env.token_bot ?? ""),
    "bot_user_id": Number(String(process.env.token_bot).split(":")[0]),
    "user_user_id": Number(process.env.user_user_id ?? 0),
    "phone_number": String(process.env.phone_number ?? "62812345678"),
    "admins_user_id": [],
    "version": {
        "userbot": "v0.0.3 AzkaUserBot",
        "developer": "@azkadev",
        "links": {
            "github": "https://github.com/azkadev",
            "youtube": "https://youtube.com",
            "website": "https://azkadev.netlify.app"
        }
    }
};

var getAdminsUserId = String(process.env.admins_user_id ?? "null").split(",");
for (var index = 0; index < getAdminsUserId.length; index++) {
    var element = getAdminsUserId[index];
    if (RegExp("^-?[0-9]+$", "i").exec(element)) {
        client["admins_user_id"].push(Number(element));
    }
}
if (!client["token_bot"]){
    throw {
        "message": "token bot is false"
    };
}
module.exports = {
    client
};