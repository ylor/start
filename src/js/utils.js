import { config } from "./config";

export const byId = id => document.getElementById(id);

//TODO: refactor this to a switch?
export function keyHandler(event) {
  //Listen for esc
  if (event.key === "Escape") {
    //if search-input is focused then clear the input
    if (document.activeElement === byId("search-input")) {
      clearInput();
    } else {
      //Else restore the focus to the search-input
      changeFocus("search-input");
    }
  } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    // TODO
    // Change focus as if ArrowUp === Shitf+Tab
    // Change focus as if ArrowDown === Tab
  }
  //else give focus to search-input
  else if (event.key === "Tab" || event.key === "Shift") {
    // do nothing
  } else {
    changeFocus("search-input");
  }
}

export function mouseHandler(element) {
  // Add event listener to only change focus if mouse is moving. Helps maintain integrity of input when suggestions are being returned and typing has continued from there
  byId(element).addEventListener("mousemove", event => changeFocus(element));
}

export function changeFocus(element) {
  byId(element).focus();
}

export function replaceInput(suggestion) {
  byId("search-input").value = byId(suggestion).textContent;
}

export function restoreInput(text) {
  byId("search-input").value = text;
}

export function clearInput() {
  byId("search-input").value = "";
}

export function parseInput(rawInput) {
  //const input = "server.local:32400/web".toLowerCase();
  const input = rawInput.toLowerCase();

  const { commands } = config;
  //console.log("config commands", commands);
  const keys = commands.map(command => command.key);
  //console.log("keys", keys);

  const localTopLevelDomains = ["localhost", ".local"];
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

  // if input contains a space go straight to search
  if (input.includes(" ")) {
    return (
      commands.find(command => command.key === "*").url +
      commands.find(command => command.key === "*").search.replace("{}", input)
    );
  }
  // handle local tlds in case they include a port number that conflicts with the search delimiter (e.g. 'localhost:3000')
  if (localTopLevelDomains.some(tld => input.includes(tld))) {
    return "https://" + input;
  }
  //handle search
  else if (input.includes(":")) {
    const key = input.split(":")[0];
    //console.log(key);
    const query = input.split(":")[1];
    //console.log(search);
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
  //handle paths
  else if (input.includes("/")) {
    const key = input.split("/")[0];
    //console.log(key);
    const path = input.split("/")[1];
    //console.log(path);
    return commands.find(command => command.key === key).url + "/" + path;
  }
  //handle internet tlds
  else if (topLevelDomains.some(tld => input.includes(tld))) {
    return "https://" + input;
  } else {
    if (keys.includes(input)) {
      return commands.find(x => x.key === input).url;
    } else {
      // search google
      return (
        commands.find(command => command.key === "*").url +
        commands
          .find(command => command.key === "*")
          .search.replace("{}", input)
      );
    }
  }
}

function toUrl(url) {
  return new URL(url);
}

export function submitInput(destination) {
  window.location.href = destination;
}
