export function parseError(error: string) {
  let reasonRegex = /reverted with reason string '([^']+)'/;
  let matches = error.match(reasonRegex);
  let reason = matches && matches[1];

  if (!reason) {
    reasonRegex = /execution reverted: (.*?)"/;
    matches = error.match(reasonRegex);
    reason = matches && matches[1];
  }

  return reason || error;
}
