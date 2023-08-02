export function parseError(error: string) {
  const reasonRegex = /reverted with reason string '([^']+)'/;
  const matches = error.match(reasonRegex);
  const reason = matches && matches[1];
  return reason || error;
}
