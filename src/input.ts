export function getRemoteUrl() {
  if (process.argv.length > 2) {
    return process.argv[2]
  } else {
    return undefined;
  }
}