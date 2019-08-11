export default function keyHandler(event, props) {
  const keyBlacklist = [
    "Alt",
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
    "ArrowLeft",
    "Backspace",
    "CapsLock",
    "Control",
    "Escape",
    "Meta",
    "OS",
    "Shift",
    "Spacebar",
    "Tab"
  ];
  // Make these keys not trigger anything
  if (keyBlacklist.includes(event.key)) {
    event.preventDefault();
    return;
  }

  if ((event.metaKey || event.ctrlKey) && event.key === "r") {
    event.preventDefault();
    window.location.reload();
    return;
  }

  if (event.key === "?") {
    event.preventDefault();
    return props.history.push("/links");
  }

  if (window.location.pathname !== "/search") {
    props.history.push("/search");
  }
}
