import { config } from "./config";

export const id = element => document.getElementById(element);

export function mouseHandler(element) {
  // Add event listener to only change focus via mouse if mouse is moving. Helps maintain integrity of input when suggestions are being returned and typing has continued from there
  id(element).addEventListener("mousemove", event => changeFocus(element));
}

export function changeFocus(element) {
  id(element).focus();
}

// export function restoreInput(text) {
//   id("search-input").value = text;
// }

export function parseInput(rawInput) {
  const { commands } = config;
  const input = rawInput.toLowerCase();
  const keys = commands.map(command => command.key);
  const urlPattern = new RegExp(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gi
  );

  // begin conditionals for the parser
  //handle match to key in config
  if (keys.includes(input)) {
    return commands.find(x => x.key === input).url;
  }

  //handle search with a matched key
  else if (input.includes(":") && keys.includes(input.split(":")[0])) {
    const key = input.split(":")[0];
    const query = rawInput.split(":")[1].trimStart();

    if (commands.find(command => command.key === key).search) {
      return (
        commands.find(command => command.key === key).url +
        commands
          .find(command => command.key === key)
          .search.replace("{}", query)
      );
    }
  }

  //handle paths with a matched key
  else if (input.includes("/") && keys.includes(input.split("/")[0])) {
    const key = input.split("/")[0];
    const path = input.split("/")[1];
    return commands.find(command => command.key === key).url + "/" + path;
  }

  //handle urls
  else if (input.match(urlPattern) || input.includes("localhost")) {
    return input.startsWith("http") ? input : "http://" + input;
  }

  // search google
  else
    return (
      commands.find(command => command.key === "*").url +
      commands
        .find(command => command.key === "*")
        .search.replace("{}", encodeURIComponent(rawInput))
    );
}
