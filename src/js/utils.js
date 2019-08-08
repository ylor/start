import { config } from "./config";
import { navigate } from "@reach/router";

export const id = element => document.getElementById(element);
export const mathPattern = new RegExp(/^[()\d\s.+\-*/=]*$/g);

// function showElement(element) {
//   if (id(element).style.visibility === "hidden") {
//     id(element).style.visibility = "visible";
//   }

//   if (id(element).style.display === "none") {
//     id(element).style.display = "block";
//   }
// }

// function hideElement(element) {
//   id(element).style.visibility = "hidden";
// }

// function getVisibility(element) {
//   if (getComputedStyle(id(element)).visibility === "visible") {
//     return true;
//   } else {
//     return false;
//   }
// }

function toggleVisibility(element) {
  if (getComputedStyle(id(element)).visibility === "hidden") {
    id(element).style.visibility = "visible";
  } else {
    id(element).style.visibility = "hidden";
  }

  if (getComputedStyle(id(element)).display === "none") {
    id(element).style.display = "block";
  } else {
    id(element).style.display = "none";
  }
}

// TODO: refactor this to a switch?
export function keyHandler(event) {
  if (event.key === "?") {
    event.preventDefault();
    //toggleVisibility("links");
    return;
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
    console.log(document.getElementsByClassName("move"));
    var elements = document.getElementsByClassName("move");
    for (var x = 0; x < elements.length; x++) {
      console.log(elements[x]);
      elements[x].focus();
    }
  }

  // listen for equals key to do some math inline
  if (event.key === "=") {
    if (id("search-input").value.match(mathPattern)) {
      try {
        event.preventDefault();
        const expression = id("search-input").value;
        // disabling eslint for line containing `eval` because I'm prevalidating the input with mathPattern
        // eslint-disable-next-line
        const answer = eval(id("search-input").value);

        return (id("search-input").value =
          expression + "=" + answer.toString());
      } catch {
        // Cases where this fails includes incomplete expressions like `2+=`
        return false;
      }
    }
  }

  // Listen for esc
  if (event.key === "Escape") {
    // // If search-input is focused then clear the input
    if (document.activeElement !== id("search-input")) {
      return changeFocus("search-input");
    }
    // Else restore the focus to the search-input
    // changeFocus("search-input");
    //(document.activeElement === id("search-input")) {
    //   hideElement("search-input");
    //   hideElement("search-suggestions");
    //   hideElement("links");
    //   showElement("clock");
    //   clearInput();
  } else {
    changeFocus("search-input");
  }

  //   return;
  // }

  if (event.key === "Backspace") {
    // if (id("search-input").value === "") {
    //   hideElement("search-input");
    //   hideElement("search-suggestions");
    //   hideElement("links");
    //   showElement("clock");
    // }
    return;
  }

  // Make these keys not trigger anything
  const gatedKeys = [
    "Alt",
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
    "ArrowLeft",
    "CapsLock",
    "Control",
    "Escape",
    "Enter",
    "OS",
    "Shift",
    "Tab"
  ];
  if (gatedKeys.includes(event.key) || event.code === "Space") {
    return;
  }

  // hideElement("clock");
  // hideElement("links");
  // showElement("search-input");
  // showElement("search-suggestions");
  if (window.location.pathname !== "/search") {
    return navigate("/search");
  }
  changeFocus("search-input");
}

export function mouseHandler(element) {
  // Add event listener to only change focus via mouse if mouse is moving. Helps maintain integrity of input when suggestions are being returned and typing has continued from there
  id(element).addEventListener("mousemove", event => changeFocus(element));
}

export function changeFocus(element) {
  id(element).focus();
}

export function replaceInput(suggestion) {
  id("search-input").value = id(suggestion).textContent;
}

export function restoreInput(text) {
  id("search-input").value = text;
}

export function clearInput() {
  id("search-input").value = null;
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

export function submitInput(destination) {
  window.location.href = destination;
}
