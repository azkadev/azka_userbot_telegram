var client = {
    "app_id": Number(process.env.app_id ?? 5220087),
    "app_hash": String(process.env.app_hash ?? "0c21ac5e2bec1cce2665bc81739d7bb8"),
    "token_bot": String(process.env.token_bot ?? ""),
    "bot_user_id": Number(String(process.env.token_bot).split(":")[0]),
    "user_user_id": Number(process.env.user_user_id ?? 0),
    "phone_number": String(process.env.phone_number ?? "62812345678"),
    "admins_user_id": [],
    "version": {
        "userbot": "v0.0.0 AzkaUserBot",
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

if (typeof client["app_id"] != "number") {
    console.log("app_id seharusnya number!\nTolong perbaiki ya");
    process.exit();
}
if (typeof client["app_hash"] != "string") {
    console.log("app_hash seharusnya string!\nTolong perbaiki ya");
    process.exit();
}
if (typeof client["bot_user_id"] != "number") {
    console.log("bot_user_id seharusnya number!\nTolong perbaiki ya");
    process.exit();
}
module.exports = {
    client
};