/*
 * The category, name, key, url, search and for each command.
 * If none of the specified keys are matched, the '*' key is used.
 * Commands without a category won't populate the links list
 */

export const config = {
  commands: [
    {
      name: "Google",
      key: "*",
      url: "https://google.com",
      search: "https://google.com/search?q={}"
    },
    // Server
    {
      name: "Pi-hole",
      key: ["pi", "pihole"],
      url: "http://pi.hole/admin"
    },
    {
      name: "Homebridge",
      key: "homebridge",
      url: "http://docker.local:8181"
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
      name: "Radarr",
      key: "radarr",
      url: "http://docker.local:7878"
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
      category: "Me",
      name: "About",
      key: "about",
      url: "https://about.rolyreyes.com"
    },
    {
      category: "Me",
      name: "Blog",
      key: "blog",
      url: "https://rolyreyes.com"
    },
    {
      category: "Me",
      name: "Dotfiles",
      key: "dot",
      url: "https://github.com/ylor/dotfiles"
    },
    {
      category: "Me",
      name: "Github",
      key: "git",
      url: "https://github.com/ylor?tab=repositories",
      search: "https://github.com/search?q={}"
    },
    {
      category: "Me",
      name: "Start",
      key: "start",
      url: "https://start.rolyreyes.com"
    },
    //Work
    {
      category: "MDC",
      name: "MDC",
      key: "mdc",
      url: "http://www.mdc.edu"
    },
    {
      category: "MDC",
      name: "MDC - Employee",
      key: "emp",
      url: "https://wapi.mdc.edu/NTAuth/account_admin.asp",
      search: "https://wapi.mdc.edu/NTAuth/user_data.asp?UserID={}"
    },
    {
      category: "MDC",
      name: "MDC - Student",
      key: "stu",
      url: "https://mdcwapi.mdc.edu:8001/ntauthstudent",
      search:
        "https://mdcwapi.mdc.edu:8001/ntauthstudent/StudentData.aspx?AcctNm={}"
    },
    {
      category: "MDC",
      name: "JAMF",
      key: "jamf",
      url: "https://kmacdep.kendall.mdcc.edu:8443"
    },
    {
      category: "MDC",
      name: "Timeclock",
      key: ["tc", "timeclock"],
      url: "https://timeclock.mdc.edu"
    },
    // Internet
    {
      name: "1Password Password Generator",
      key: "pw",
      url: "https://1password.com/password-generator"
    },
    {
      name: "Amazon",
      key: "a",
      url: "https://www.amazon.com",
      search: "https://www.amazon.com/s?k={}"
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
      url: "https://drive.google.com"
    },
    {
      name: "Epic Game Store",
      key: "egs",
      url: "https://www.epicgames.com/store",
      search: "https://www.epicgames.com/store/store-search/?q={}"
    },
    {
      name: "Giant Bomb",
      key: "gb",
      url: "https://www.giantbomb.com",
      search: "https://www.giantbomb.com/search/?i=&q={}"
    },
    {
      name: "Giant Bomb Infinite",
      key: "gb8",
      url: "https://www.giantbomb.com/infinite"
    },
    {
      name: "Giphy",
      key: "gif",
      url: "https://giphy.com",
      search: "https://giphy.com/search/{}"
    },
    {
      name: "Hacker News",
      key: "hn",
      url: "https://news.ycombinator.com",
      search: "https://hn.algolia.com/?&query={}"
    },
    {
      name: "How Long to Beat",
      key: "hltb",
      url: "https://howlongtobeat.com",
      search: "https://howlongtobeat.com/?q={}"
    },
    {
      name: "iCloud",
      key: "icloud",
      url: "https://www.icloud.com"
    },
    {
      name: "iCloud Mail",
      key: "mail",
      url: "https://www.icloud.com/#mail"
    },
    {
      name: "JSFiddle",
      key: "fiddle",
      url: "https://jsfiddle.net"
    },
    {
      name: "MyAnimeList",
      key: "mal",
      url: "https://myanimelist.net",
      search: "https://myanimelist.net/search/all?q={}"
    },
    {
      name: "Netflix",
      key: "netflix",
      url: "https://www.netflix.com",
      search: "https://www.netflix.com/search?q={}"
    },
    {
      name: "Node Package Manager",
      key: "npm",
      url: "https://www.npmjs.com",
      search: "https://www.npmjs.com/search?q={}"
    },
    {
      name: "Nyaa",
      key: "nyaa",
      url: "https://nyaa.si",
      search: "https://nyaa.si/?f=0&c=0_0&q={}"
    },
    {
      name: "OneDrive",
      key: "od",
      url: "https://onedrive.live.com"
    },
    {
      name: "Plex.tv",
      key: "plextv",
      url: "https://app.plex.tv/desktop"
    },
    {
      name: "RARBG",
      key: "rarbg",
      url: "https://rarbg.to/torrents",
      search: "https://rarbg.to/torrents?search={}"
    },
    {
      name: "Reddit",
      key: "r",
      url: "https://www.reddit.com/r",
      search: "https://www.reddit.com/r/search?q={}"
    },
    {
      name: "Simplenote",
      key: "sn",
      url: "https://app.simplenote.com"
    },
    {
      name: "Spotify",
      key: "spotify",
      url: "https://open.spotify.com"
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
      search: "https://store.steampowered.com/search/?term={}"
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
      search: "https://twitter.com/search?q={}"
    },
    {
      name: "Yarn",
      key: "yarn",
      url: "https://yarnpkg.com",
      search: "https://yarnpkg.com//en/packages?q={}"
    },
    {
      name: "YouTube",
      key: "yt",
      url: "https://youtube.com",
      search: "https://youtube.com/results?search_query={}"
    },
    // Destiny
    {
      category: "Destiny",
      name: "Destiny Item Manager",
      key: "dim",
      url: "https://app.destinyitemmanager.com"
    },
    {
      category: "Destiny",
      name: "Destiny Sets",
      key: "sets",
      url: "https://destinysets.com"
    },
    {
      category: "Destiny",
      name: "Light.gg",
      key: "light",
      url: "https://light.gg"
    },
    // Reddit
    {
      category: "Reddit",
      name: "/r/DestinyTheGame",
      key: "dtg",
      url: "https://www.reddit.com/r/destinythegame",
      search:
        "https://www.reddit.com/r/destinythegame/search?q={}&restrict_sr=1"
    },
    {
      category: "Reddit",
      name: "/r/HipHopHeads",
      key: "r/hhh",
      url: "https://www.reddit.com/r/hiphopheads",
      search: "https://www.reddit.com/r/hiphopheads/search?q={}&restrict_sr=1"
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
