import { config } from "./config";

const byId = id => document.getElementById(id);

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

export function parseInput() {
  const { commands } = config;
  //console.log("config commands", commands);
  const keys = commands.map(command => command.key);
  console.log("keys", keys);

  const input = "od";

  if (input.includes("-")) {
    //handle search
    const key = input.split("-")[0];
    //console.log(key);
    const search = input.split("-")[1];
    //console.log(search);

    console.log(
      commands.find(command => command.key === key).url +
        commands
          .find(command => command.key === key)
          .search.replace("{}", search)
    );
  } else if (input.includes("/")) {
    //handle path
    const key = input.split("/")[0];
    //console.log(key);
    const path = input.split("/")[1];
    //console.log(path);

    console.log(commands.find(command => command.key === key).url + "/" + path);
  } else {
    if (
      input.includes(
        ".com" ||
          ".org" ||
          ".net" ||
          ".io" ||
          ".co" ||
          ".co.uk" ||
          ".edu" ||
          ".gov"
      )
    ) {
      console.log(input);
    } else if (keys.includes(input)) {
      console.log(commands.find(x => x.key === input));
      // go to website
      console.log(commands.find(x => x.key === input).url);
    } else {
      // search google
      console.log(
        commands.find(command => command.key === "*").url +
          commands
            .find(command => command.key === "*")
            .search.replace("{}", input)
      );
    }
  }
  //window.location.href = destination;
}

function toUrl(url) {
  return new URL(url);
}

export function submitInput(destination) {
  window.location.href = destination;
}
