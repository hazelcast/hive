export const getFixedTimezoneDate = (timestamp: number, timeZone = 'Europe/Istanbul'): Date =>
  new Date(new Date(timestamp).toLocaleString('en-US', { timeZone, hour12: false }))
