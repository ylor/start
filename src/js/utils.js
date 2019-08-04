import { config } from "./config";

export const byId = id => document.getElementById(id);
export const mathPattern = new RegExp(/^[\d\s.+\-*/()]*$/g);

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
  }

  // listen for equals key to do some math inline
  if (event.key === "=") {
    if (byId("search-input").value.match(mathPattern)) {
      try {
        event.preventDefault();
        const expression = byId("search-input").value;
        // disabling eslint for line containing `eval` because I'm prevalidating the input with mathPattern
        // eslint-disable-next-line
        const answer = eval(byId("search-input").value);

        return (byId("search-input").value =
          expression + "=" + answer.toString());
      } catch {
        // Cases where this fails includes incomplete expressions like `2+=`
        return false;
      }
    }
  }

  if (event.key === "ArrowUp") {
    // TODO
    // Change focus as if ArrowUp === Shitf+Tab
    event.preventDefault();
    return;
  }

  if (event.key === "ArrowDown") {
    // TODO
    // Change focus as if ArrowDown === Tab
    event.preventDefault();
    return;
  }

  //else give focus to search-input
  if (event.key === "Tab" || event.key === "Shift") {
    // Do nothing so that tabbing navigation is not broken
    return;
  }

  if (document.activeElement !== byId("search-input")) {
    changeFocus("search-input");
  }
}

export function mouseHandler(element) {
  // Add event listener to only change focus via mouse if mouse is moving. Helps maintain integrity of input when suggestions are being returned and typing has continued from there
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
  const input = rawInput.toLowerCase();

  const { commands } = config;
  //console.log("config commands", commands);
  const keys = commands.map(command => command.key);
  //console.log("keys", keys);

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
    //console.log(key);
    const query = input.split(":")[1].trimStart();
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
    //console.log(key);
    const path = input.split("/")[1];
    //console.log(path);
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

function toUrl(url) {
  return new URL(url);
}

export function submitInput(destination) {
  window.location.href = destination;
}
