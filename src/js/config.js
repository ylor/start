/*
 * The category, name, key, url, search path and color for your commands.
 * If none of the specified keys are matched, the '*' key is used.
 * Commands without a category don't show up in the help menu.
 */

export const config = {
  commands: [
    {
      category: "",
      name: "Google",
      key: "*",
      url: "https://google.com",
      search: "/search?q={}"
    },
    // Local
    {
      category: "local",
      name: "Pi-hole",
      key: "pi",
      url: "http://pi.hole/admin",
      search: "/search?q={}"
    },
    {
      name: "Plex",
      key: "plex",
      url: "http://server.local:32400/web"
    },
    {
      name: "Portainer",
      key: "port",
      url: "http://docker.local:9000"
    },
    {
      name: "Sonarr",
      key: "sonarr",
      url: "http://docker.local:8989"
    },
    {
      name: "Transmission",
      key: "bt",
      url: "http://docker.local:9091"
    },
    {
      name: "Unifi Controller",
      key: "unifi",
      url: "http://docker.local:8080"
    },
    // Me
    {
      name: "About",
      key: "about",
      url: "https://about.rolyreyes.com"
    },
    {
      name: "Blog",
      key: "blog",
      url: "https://rolyreyes.com"
    },
    {
      name: "Dotfiles",
      key: "dot",
      url: "https://github.com/ylor/dotfiles"
    },
    {
      name: "Github",
      key: "git",
      url: "https://github.com/ylor?tab=repositories",
      search: "/search?q={}"
    },
    {
      name: "Start",
      key: "start",
      url: "https://start.rolyreyes.com"
    },
    //Work
    {
      name: "MDC",
      key: "mdc",
      url: "http://www.mdc.edu/"
    },
    {
      name: "MDC - Employee",
      key: "emp",
      url: "https://wapi.mdc.edu/NTAuth/",
      search: "/NTAuth/user_data.asp?UserID={}"
    },
    {
      name: "MDC - Student",
      key: "stu",
      url: "https://mdcwapi.mdc.edu:8001/ntauthstudent/",
      search: "/ntauthstudent/StudentData.aspx?AcctNm={}"
    },
    {
      name: "JAMF",
      key: "jamf",
      url: "https://kmacdep.kendall.mdcc.edu:8443/"
    },
    // Internet
    {
      name: "1Password Password Generator",
      key: "pw",
      url: "https://1password.com/password-generator/"
    },
    {
      name: "Amazon",
      key: "a",
      url: "https://www.amazon.com/",
      search: "/s?k={}"
    },
    {
      name: "Bitwarden",
      key: "bw",
      url: "https://vault.bitwarden.com"
    },
    {
      name: "Discord",
      key: "discord",
      url: "https://discordapp.com/activity"
    },
    {
      name: "Drive",
      key: "drive",
      url: "https://drive.google.com/",
      search: "/drive/search?q={}"
    },
    {
      name: "Giant Bomb",
      key: "gb",
      url: "https://giantbomb.com",
      search: "/search/?i=&q={}"
    },
    {
      name: "Giant Bomb Infinite",
      key: "gb8",
      url: "https://giantbomb.com/infinite"
    },
    {
      name: "Hacker News",
      key: "hn",
      url: "https://news.ycombinator.com/",
      search: "/search?q={}"
    },
    {
      name: "How Long to Beat",
      key: "hltb",
      url: "https://howlongtobeat.com"
    },
    {
      name: "iCloud",
      key: "icloud",
      url: "https://icloud.com"
    },
    {
      name: "iCloud Mail",
      key: "mail",
      url: "https://www.icloud.com/#mail"
    },
    {
      name: "JSFiddle",
      key: "fiddle",
      url: "https://jsfiddle.net/"
    },
    {
      name: "Netflix",
      key: "netflix",
      url: "https://www.netflix.com/browse",
      search: "/search?q={}"
    },
    {
      name: "Node Package Manager",
      key: "npm",
      url: "https://www.npmjs.com/",
      search: "/search?q={}"
    },
    {
      name: "Nyaa",
      key: "nyaa",
      url: "https://nyaa.si",
      search: "/?f=0&c=0_0&q={}"
    },
    {
      name: "OneDrive",
      key: "od",
      url: "https://onedrive.live.com"
    },
    {
      name: "Plex.tv",
      key: "plex.tv",
      url: "https://app.plex.tv"
    },
    {
      name: "RARBG",
      key: "rarbg",
      url: "https://rarbg.to/torrents",
      search: "/torrents.php?search={}"
    },
    {
      name: "Reddit",
      key: "r",
      url: "https://www.reddit.com/r",
      search: "/search?q={}"
    },
    {
      name: "Simplenote",
      key: "sn",
      url: "https://app.simplenote.com"
    },
    {
      name: "ResetERA",
      key: "re",
      url: "https://www.resetera.com"
    },
    {
      name: "Steam",
      key: "steam",
      url: "https://store.steampowered.com",
      search: "/search/?term={}"
    },
    {
      name: "Tumblr",
      key: "tumblr",
      url: "https://tumblr.com"
    },
    {
      name: "Twitch",
      key: "twitch",
      url: "https://twitch.tv/directory"
    },
    {
      name: "Twitter",
      key: "twitter",
      url: "https://twitter.com",
      search: "/search?q={}"
    },
    {
      name: "Yarn",
      key: "yarn",
      url: "https://yarnpkg.com/",
      search: "/en/packages?q={}"
    },
    {
      name: "YouTube",
      key: "yt",
      url: "https://www.youtube.com",
      search: "/results?search_query={}"
    },
    // Destiny
    {
      category: "Destiny",
      name: "Destiny Item Manager",
      key: "dim",
      url: "https://app.destinyitemmanager.com/"
    },
    {
      category: "Destiny",
      name: "Destiny Sets",
      key: "sets",
      url: "https://destinysets.com/"
    },
    {
      category: "Destiny",
      name: "Light.gg",
      key: "light",
      url: "https://light.gg/"
    },
    // Reddit
    {
      category: "Reddit",
      name: "r/DestinyTheGame",
      key: "dtg",
      url: "https://www.reddit.com/r/destinythegame",
      search: "/search?q={}&restrict_sr=1"
    },
    {
      category: "Reddit",
      name: "r/HipHopHeads",
      key: "hhh",
      url: "https://www.reddit.com/r/hiphopheads",
      search: "/search?q={}&restrict_sr=1"
    },
    // Ugh
    {
      name: "/g/ - Technology",
      key: "g",
      url: "https://boards.4chan.org/g/catalog"
    },
    {
      name: "/w/ - Wallpapers",
      key: "w",
      url: "https://boards.4chan.org/w/catalog"
    },
    {
      name: "/wg/ - Wallpapers General",
      key: "g",
      url: "https://boards.4chan.org/wg/catalog"
    }
  ]
};
