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
  // Add event listener to only change focus if mouse is moving. Helps maintain integrity of input when suggestion has been returned and typing has continued from there
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

export function parseInput(input) {
  const { commands } = config;
  console.log("config commands", commands);

  const keys = commands.map(command => command.key);
  console.log("keys", keys);

  if (keys.includes("gb")) {
    console.log(true);
    console.log(commands.find(x => x.key === "gb").url);
  } else {
    console.log(false);
    console.log(
      commands.find(command => command.key === "*").url +
        commands
          .find(command => command.key === "*")
          .search.replace("{}", "searchinput")
    );
  }
}

export function submitInput(destination) {
  window.location.href = destination;
}
