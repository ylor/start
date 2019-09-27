import { config } from "../../config";

export default function parseInput(rawInput) {
  const { commands } = config;

  const input = rawInput.toLowerCase();
  const keys = commands.map(command => command.key).flat();
  const urlPattern = new RegExp(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gi
  );

  // begin conditionals for the parser
  // handle match to key in config
  if (keys.includes(input)) {
    console.log(commands.filter(v => v.key.includes(input)));
    return;
  }

  // handle urls
  if (input.match(urlPattern) || input.includes("localhost")) {
    return input.startsWith("http") ? input : "http://" + input;
  }

  // handle search with a matched key
  if (input.includes(":") && keys.includes(input.split(":")[0])) {
    const key = input.split(":")[0];
    const query = rawInput.split(":")[1].trimStart();

    if (commands.find(command => command.key.includes(key)).search) {
      return commands
        .find(command => command.key === key)
        .search.replace("{}", query);
    }
  }

  // handle paths with a matched key
  if (input.includes("/") && keys.includes(input.split("/")[0])) {
    const key = input.split("/")[0];
    const path = input.split("/")[1];
    return commands.find(command => command.key.includes(key)).url + "/" + path;
  }

  // search google
  else
    return commands
      .find(command => command.key === "*")
      .search.replace("{}", encodeURIComponent(rawInput));
}
