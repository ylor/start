import { config } from "./config";

export const id = element => document.getElementById(element);

export function mouseHandler(element) {
  // Add event listener to only change focus via mouse if mouse is moving. Helps maintain integrity of input when suggestions are being returned and typing has continued from there
  id(element).addEventListener("mousemove", event => changeFocus(element));
}

export function changeFocus(element) {
  id(element).focus();
}


export function restoreInput(text) {
  id("search-input").value = text;
}


export function parseInput(rawInput) {
  const input = rawInput.toLowerCase();

  const { commands } = config;
  //console.log("config commands", commands)
  const keys = commands.map(command => command.key);
  //console.log("keys", keys)

  const localTopLevelDomains = [
    "0",
    "0.0.0.0",
    "127.0.0.1",
    "localhost",
    ".local"
  ];

  const topLevelDomains = [
    ".co.uk",
    ".co",
    ".com",
    ".edu",
    ".gov",
    ".io",
    ".net",
    ".org",
    ".to"
  ];

  // begin conditionals for the parser

  //handle match to key in config
  if (keys.includes(input)) {
    return commands.find(x => x.key === input).url;
  }
  // handle local tlds in case they include a port number that conflicts with the search delimiter (e.g. 'localhost:3000')
  if (localTopLevelDomains.some(tld => input.includes(tld))) {
    return input.startsWith("http") ? input : "http://" + input;
  }

  // handle input that begins with http
  if (input.startsWith("http")) {
    return input;
  }

  //handle search
  if (input.includes(":")) {
    const key = input.split(":")[0];
    //console.log(key)
    const query = input.split(":")[1].trimStart();
    //console.log(search)

    if (commands.find(command => command.key === key).search) {
      return (
        commands.find(command => command.key === key).url +
        commands
          .find(command => command.key === key)
          .search.replace("{}", query)
      );
    } else {
      return (
        commands.find(command => command.key === "*").url +
        commands
          .find(command => command.key === "*")
          .search.replace("{}", query)
      );
    }
  }

  // if input contains a space go straight to search
  if (input.includes(" ")) {
    return (
      commands.find(command => command.key === "*").url +
      commands.find(command => command.key === "*").search.replace("{}", input)
    );
  }

  //handle paths
  if (input.includes("/")) {
    const key = input.split("/")[0];
    //console.log(key)
    const path = input.split("/")[1];
    //console.log(path)
    return commands.find(command => command.key === key).url + "/" + path;
  }

  //handle internet tlds
  if (topLevelDomains.some(tld => input.includes(tld))) {
    return input.startsWith("http") ? input : "https://" + input;
  }

  // search google
  return (
    commands.find(command => command.key === "*").url +
    commands.find(command => command.key === "*").search.replace("{}", input)
  );
}
