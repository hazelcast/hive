// Useful to override current time for our code in tests, leaving third-party code untouched.
export class TimeService {
  public static currentTimestamp() {
    return Date.now()
  }
}
