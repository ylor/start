const byId = id => document.getElementById(id);

//TODO: refactor this to a switch?
export function keyHandler(event) {
  //Listen for esc
  if (event.key === "Escape") {
    //if search-input is focused then clear the input
    if (document.activeElement === document.getElementById("search-input")) {
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
  document.getElementById(element).focus();
}

export function parseInput(destination) {
  window.location.href = destination;
}

export function replaceInput(suggestion) {
  document.getElementById("search-input").value = document.getElementById(
    suggestion
  ).textContent;
}

export function restoreInput(text) {
  document.getElementById("search-input").value = text;
}

export function clearInput() {
  document.getElementById("search-input").value = "";
}
