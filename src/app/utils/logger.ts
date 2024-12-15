/* eslint-disable */
export class Logger {
  private context: string;
  private colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    gray: "\x1b[90m",
    bold: "\x1b[1m",
  };

  constructor(context: string) {
    this.context = context;
  }

  private formatMessage(level: string, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const prefix = `${timestamp} ${this.context}:`;
    return { prefix, message, ...(data && { data }) };
  }

  private colorize(color: keyof typeof this.colors, text: string): string {
    return `${this.colors[color]}${text}${this.colors.reset}`;
  }

  private formatLogLevel(level: string): string {
    return `[${level.toUpperCase()}]`;
  }

  private formatOutput({
    prefix,
    message,
    data,
    level,
  }: {
    prefix: string;
    message: string;
    data?: any;
    level: string;
  }): string {
    const colorizedLevel = this.colorize(
      level === "error"
        ? "red"
        : level === "warn"
          ? "yellow"
          : level === "info"
            ? "blue"
            : "gray",
      this.formatLogLevel(level)
    );

    return `${this.colorize("gray", prefix)} ${colorizedLevel} ${message}${
      data ? ` ${JSON.stringify(data)}` : ""
    }`;
  }

  log(level: string, message: string, data?: any) {
    const formattedMessage = this.formatMessage(level, message, data);
    console.log(
      this.formatOutput({
        ...formattedMessage,
        level,
      })
    );
  }

  error(message: string, data?: any) {
    this.log("error", message, data);
  }

  warn(message: string, data?: any) {
    this.log("warn", message, data);
  }

  info(message: string, data?: any) {
    this.log("info", message, data);
  }

  debug(message: string, data?: any) {
    this.log("debug", message, data);
  }
}
