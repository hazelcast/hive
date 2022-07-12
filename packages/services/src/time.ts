// Useful to override current time for our code in tests, leaving third-party code untouched.
export class TimeService {
  public static currentTimestamp() {
    return Date.now()
  }

  public static format(source: Date): string {
    return `${TimeService.formatDate(source)} ${TimeService.formatTime(source)}`
  }

  public static formatTime(source: Date): string {
    return `${('0' + source.getHours().toString()).slice(-2)}:${('0' + source.getMinutes().toString()).slice(-2)}:${(
      '0' + source.getSeconds().toString()
    ).slice(-2)}`
  }

  public static formatDate(source: Date): string {
    return `${('0' + source.getDate().toString()).slice(-2)}-${('0' + (source.getMonth() + 1).toString()).slice(
      -2,
    )}-${source.getFullYear()}`
  }
}
