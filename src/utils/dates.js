export function getFormattedDateTime(date = new Date()) {
  return `${date.getMonth() +
    1}/${date.getDate()} ${date.getHours()}:${padLeadingZero(
    date.getMinutes()
  )}:${padLeadingZero(date.getSeconds())}`;
}

export function padLeadingZero(value) {
  if (isNaN(value)) {
    throw new Error("Numbers only.");
  }
  return value > 9 ? `${value}` : `0${value}`;
}
