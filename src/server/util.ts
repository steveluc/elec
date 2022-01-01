export function createQueryString(params: any): string {
  let result = "";

  Object.keys(params).forEach((key) => {
    let currentString = `${key}=${encodeURIComponent(params[key])}&`;
    result += currentString;
  });

  return result.substring(0, result.length - 1);
}
