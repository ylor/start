import { config } from "../../config";

export default function parseInput(rawInput) {
  const { commands } = config;

  const input = rawInput.toLowerCase();
  const keysList = commands.map(command => command.keys).flat();
  const ipPattern = new RegExp(/^((2(?!5?[6-9])|1|(?!0\B))\d\d?\.?\b){4}$/g);
  const urlPattern = new RegExp(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gi
  );

  // begin conditionals for the parser
  // handle match to key in config
  if (keysList.includes(input)) {
    return commands.find(v => v.keys.includes(input)).url;
  }

  // handle urls
  if (
    input.match(urlPattern) ||
    input.match(ipPattern) ||
    input.includes("localhost")
  ) {
    if (
      input.match(ipPattern) ||
      input.includes(".local") ||
      input.includes("localhost")
    ) {
      return input.startsWith("http") ? rawInput : "http://" + rawInput;
    } else {
      return input.startsWith("http") ? rawInput : "https://" + rawInput;
    }
  }

  // handle search with a matched key
  if (input.includes(":") && keysList.includes(input.split(":")[0])) {
    const key = input.split(":")[0];
    const query = rawInput.split(":")[1].trimStart();
    console.log(commands.find(command => command.keys.includes(key)).search);

    if (commands.find(command => command.keys.includes(key)).search) {
      return commands
        .find(command => command.keys.includes(key))
        .search.replace("{}", query);
    }
  }

  // handle paths with a matched key
  if (input.includes("/") && keysList.includes(input.split("/")[0])) {
    const key = input.split("/")[0];
    const path = rawInput.split("/")[1];
    return (
      commands.find(command => command.keys.includes(key)).url + "/" + path
    );
  }

  // search google
  else
    return commands
      .find(command => command.keys === "*")
      .search.replace("{}", encodeURIComponent(rawInput));
}
