// ignore_for_file: non_constant_identifier_names, unused_local_variable

import 'dart:async';

import 'package:telegram_client/telegram_client/telegram_client.dart';

FutureOr<dynamic> updateMessage({required Map msg, required TelegramClient tg, required UpdateTelegramClient updateTelegramClient}) async {
  String caption = "";
  if (msg["caption"] is String) {
    caption = msg["caption"];
  }
  String text = "";
  if (msg["text"] is String) {
    text = msg["text"];
  }
  String caption_msg = "${text.trim()} ${caption.trim()}".trim();
  bool isOutgoing = false;
  if (msg["is_outgoing"] is bool) {
    isOutgoing = msg["is_outgoing"];
  }
  if (msg["chat"] is Map == false) {
    return null;
  }
  bool isAdmin = false;
  if (isOutgoing) {
    isAdmin = true;
  }
  Map msg_from = msg["from"];
  Map msg_chat = msg["chat"];

  int msg_id = (msg["id"] is int) ? (msg["id"] as int) : 0;
  int from_id = msg["from"]["id"];
  int chat_id = msg["chat"]["id"];

  if (msg["chat"]["type"] is String == false) {
    msg["chat"]["type"] = "";
  }
  String chat_type = (msg["chat"]["type"] as String).replaceAll(RegExp(r"(super)", caseSensitive: false), "");
  if (chat_type.isEmpty) {
    return null;
  }
  if (isAdmin == false) {
    return;
  }
  if (RegExp(r"^(ping)$", caseSensitive: false).hasMatch(caption_msg)) {
    return await tg.request(
      parameters: {"@type": "sendMessage", "chat_id": chat_id, "text": "PONG"},
      telegramClientData: updateTelegramClient.telegramClientData,
    );
  }

  RegExp regExp_echo = RegExp(r"^((echo[ ]+)(.*))", caseSensitive: false);
  if (regExp_echo.hasMatch(caption_msg)) {
    return await tg.request(
      parameters: {
        "@type": "sendMessage",
        "chat_id": chat_id,
        
        "text": caption_msg.replaceAll(RegExp(r"^((echo[ ]+))", caseSensitive: false), ""),
      },
      telegramClientData: updateTelegramClient.telegramClientData,
    );
  }
}
