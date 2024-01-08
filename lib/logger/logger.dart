import 'package:mason_logger/mason_logger.dart';

Logger logger = Logger(theme: LogTheme(
  
  success: (message) {
    return "✅️ ${message}";
  },
  err: (message) {
    return "❎️ ${message}";
  },
));
