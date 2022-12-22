export const parseUsername = (url) => {
  let output = url;
  if (output) {
    let matches;
    matches = url.match(
      /(?:https?:\/\/)?(?:www.)?(?:twitter|linkedin|facebook|instagram)(?:.com\/)?([@a-zA-Z0-9-_]+)/im
    );
    output = matches?.length ? matches[1] : output;
  }
  return output;
};
