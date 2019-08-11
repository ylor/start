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
  const input = rawInput.toLowerCase();
  const { commands } = config;
  const keys = commands.map(command => command.key);
  const localTopLevelDomains = ["0.0.0.0", "127.0.0.1", "localhost", ".local"];
  const urlPattern = new RegExp(
    /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/gi
  );

  // begin conditionals for the parser
  //handle match to key in config
  if (keys.includes(input)) {
    return commands.find(x => x.key === input).url;
  }

  //handle search
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

  //handle paths that match keys
  else if (input.includes("/") && keys.includes(input.split("/")[0])) {
    const key = input.split("/")[0];
    const path = input.split("/")[1];
    return commands.find(command => command.key === key).url + "/" + path;
  }
  //handle urls
  else if (input.match(urlPattern)) {
    return input.startsWith("http") ? input : "https://" + input;
  }

  // handle local tlds in case they include a port number that conflicts with the search delimiter (e.g. 'localhost:3000')
  else if (localTopLevelDomains.some(tld => input.includes(tld))) {
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
