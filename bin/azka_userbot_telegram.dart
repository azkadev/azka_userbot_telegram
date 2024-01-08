// ignore_for_file: unnecessary_brace_in_string_interps

import 'package:azka_userbot_telegram/logger/logger.dart';
import 'package:telegram_client/telegram_client/telegram_client_core.dart';
import 'package:telegram_client/telegram_client/telegram_client_tdlib_option.dart';

void main(List<String> arguments) async {
  logger.info("""
AZKA USERBOT TELEGRAM

SCRIPT BY AZKADEV
GITHUB: https://github.com/azkadev/azka_userbot_telegram
""".trim());
  TelegramClient tg = TelegramClient();

  tg.ensureInitialized(
    telegramClientTdlibOption: TelegramClientTdlibOption(
      clientOption: {
        'api_id': 0,
        'api_hash': '',
      },
      invokeTimeOut: Duration(minutes: 1),
      delayInvoke: Duration(milliseconds: 10),
      delayUpdate: Duration.zero,
      timeOutUpdate: 1.0,
    ),
  );

  tg.on(
    event_name: tg.event_update,
    onUpdate: (updateTelegramClient) async {},
    onError: (error, stackTrace) {
      logger.err("${error} ${stackTrace}");
    },
  );
}
