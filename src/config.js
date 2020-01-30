/*
  At minimum each entry requires `url` & `keys` properties
  `url` must be a string
  `keys` must be an array, even if it's a single entry
 */

export const config = {
  commands: [
    {
      name: "Google",
      keys: "*",
      url: "https://google.com",
      search: "https://google.com/search?q={}"
    },
    // Server
    {
      name: "Pi-hole",
      keys: ["pihole", "pi"],
      url: "http://pi.hole/admin"
    },
    {
      name: "Homebridge",
      keys: ["homebridge", "hb"],
      url: "http://docker.local:8181"
    },
    {
      name: "Plex",
      keys: ["plex"],
      url: "http://server.local:32400/web"
    },
    {
      name: "Portainer",
      keys: ["portainer", "port"],
      url: "http://docker.local:9000"
    },
    {
      name: "Radarr",
      keys: ["radarr", "movies"],
      url: "http://docker.local:7878"
    },
    {
      name: "Sonarr",
      keys: ["sonarr", "tv"],
      url: "http://docker.local:8989"
    },
    {
      name: "Transmission",
      keys: ["transmission", "bt", "bit"],
      url: "http://docker.local:9091"
    },
    {
      name: "Unifi Controller",
      keys: ["unifi"],
      url: "http://docker.local:8080"
    },
    // Me
    {
      category: "Me",
      name: "About",
      keys: ["about"],
      url: "https://about.rolyreyes.com"
    },
    {
      category: "Me",
      name: "Blog",
      keys: ["blog"],
      url: "https://rolyreyes.com"
    },
    {
      category: "Me",
      name: "Dotfiles",
      keys: ["dot"],
      url: "https://github.com/ylor/dotfiles"
    },
    {
      category: "Me",
      name: "Github",
      keys: ["github", "git"],
      url: "https://github.com/ylor?tab=repositories",
      search: "https://github.com/search?q={}"
    },
    {
      category: "Me",
      name: "Start",
      keys: ["start"],
      url: "https://start.rolyreyes.com"
    },
    //Work
    {
      category: "MDC",
      name: "Apple School Manager",
      keys: ["apple school manager", "asm"],
      url: "http://school.apple.com"
    },
     {
      category: "MDC",
      name: "CNS Service Requests",
      keys: ["sr"],
      url:
        "http://k353077/"
    },
    {
      category: "MDC",
      name: "CNS Sharepoint",
      keys: ["cns", "sharepoint"],
      url:
        "https://sharepoint.mdc.edu/kendall/departments/cns/SitePages/CNS%20Department%20Policies%20and%20Procedures.aspx"
    },
    {
      category: "MDC",
      name: "CNS Forms",
      keys: ["form", "forms", "formgen"],
      url:
        "https://forms.office.com/Pages/ResponsePage.aspx?id=BmhisP_Ok0OCHvmj5maJOyMNwrJzQXNJtaMiAgEgrnpURDlNMExYUjZUT1BZSVBSUUtUSVVLMlRGRi4u"
    },
    {
      category: "MDC",
      name: "Fusion",
      keys: ["fusion", "kfusion"],
      url:
        "http://kfusion1.kendall.mdcc.edu/Fusion/WebClient/monitoring/pages/Default.html?sp=&rr=15"
    },
    {
      category: "MDC",
      name: "CNS Kaseya",
      keys: ["kaseya"],
      url: "https://kaseya.mdc.edu/"
    },
    {
      category: "MDC",
      name: "JAMF",
      keys: ["jamf"],
      url: "https://kmacdep.kendall.mdcc.edu:8443"
    },
    {
      category: "MDC",
      name: "Miami Dade College",
      keys: ["mdc"],
      url: "http://www.mdc.edu"
    },
    {
      category: "MDC",
      name: "Miami Dade College - NTAuth",
      keys: ["ntauth"],
      url: "http://ntauth.mdc.edu"
    },
    {
      category: "MDC",
      name: "MDC - Employee",
      keys: ["emp"],
      url: "https://wapi.mdc.edu/NTAuth/account_admin.asp",
      search: "https://wapi.mdc.edu/NTAuth/user_data.asp?UserID={}"
    },
    {
      category: "MDC",
      name: "MDC - Student",
      keys: ["stu"],
      url: "https://mdcwapi.mdc.edu:8001/ntauthstudent",
      search:
        "https://mdcwapi.mdc.edu:8001/ntauthstudent/StudentData.aspx?AcctNm={}"
    },
    {
      category: "MDC",
      name: "Timeclock",
      keys: ["timeclock", "tc"],
      url: "https://timeclock.mdc.edu"
    },
    // Internet
    {
      name: "1Password Password Generator",
      keys: ["pw"],
      url: "https://1password.com/password-generator"
    },
    {
      name: "Amazon",
      keys: ["amazon", "a"],
      url: "https://www.amazon.com",
      search: "https://www.amazon.com/s?k={}"
    },
    {
      name: "Bitwarden",
      keys: ["bitwarden", "bw"],
      url: "https://vault.bitwarden.com"
    },
    {
      name: "CamelCamelCamel",
      keys: ["camelcamelcamel", "ccc"],
      url: "https://camelcamelcamel.com/",
      search: "https://camelcamelcamel.com/search?sq={}"
    },
    {
      name: "Discord",
      keys: ["discord"],
      url: "https://discordapp.com/activity"
    },
    {
      name: "Drive",
      keys: ["drive", "gdrive"],
      url: "https://drive.google.com"
    },
    {
      name: "Epic Game Store",
      keys: ["epic game store", "egs"],
      url: "https://www.epicgames.com/store",
      search: "https://www.epicgames.com/store/store-search/?q={}"
    },
    {
      name: "Giant Bomb",
      keys: ["giant bomb", "gb"],
      url: "https://www.giantbomb.com",
      search: "https://www.giantbomb.com/search/?i=&q={}"
    },
    {
      name: "Giant Bomb Infinite",
      keys: ["giant bomb infinite", "gb8"],
      url: "https://www.giantbomb.com/infinite"
    },
    {
      name: "Giphy",
      keys: ["giphy", "gif"],
      url: "https://giphy.com",
      search: "https://giphy.com/search/{}"
    },
    {
      name: "Guess My Word",
      keys: ["guessmyword", "gmw"],
      url: "https://hryanjones.com/guess-my-word/",
    },
    {
      name: "Hacker News",
      keys: ["hacker news", "hn"],
      url: "https://news.ycombinator.com",
      search: "https://hn.algolia.com/?&query={}"
    },
    {
      name: "How Long to Beat",
      keys: ["how lont to beat", "hltb"],
      url: "https://howlongtobeat.com",
      search: "https://howlongtobeat.com/?q={}"
    },
    {
      name: "iCloud",
      keys: ["icloud"],
      url: "https://www.icloud.com"
    },
    {
      name: "iCloud Mail",
      keys: ["mail"],
      url: "https://www.icloud.com/#mail"
    },
    {
      name: "Instagram",
      keys: ["instagram","insta","ig"],
      url: "https://www.instagram.com"
    },
    {
      name: "JSFiddle",
      keys: ["jsfiddle", "fiddle"],
      url: "https://jsfiddle.net"
    },
    {
      name: "MyAnimeList",
      keys: ["myanimelist", "mal"],
      url: "https://myanimelist.net",
      search: "https://myanimelist.net/search/all?q={}"
    },
    {
      name: "Netflix",
      keys: ["netflix"],
      url: "https://www.netflix.com",
      search: "https://www.netflix.com/search?q={}"
    },
    {
      name: "Node Package Manager",
      keys: ["npm"],
      url: "https://www.npmjs.com",
      search: "https://www.npmjs.com/search?q={}"
    },
    {
      name: "Nyaa",
      keys: ["nyaa"],
      url: "https://nyaa.si",
      search: "https://nyaa.si/?f=0&c=0_0&q={}"
    },
    {
      name: "OneDrive",
      keys: ["onedrive", "od"],
      url: "https://onedrive.live.com"
    },
    {
      name: "Plex.tv",
      keys: ["plexapp", "plextv", "plex.app", "plex.tv"],
      url: "https://app.plex.tv/desktop"
    },
    {
      name: "RARBG",
      keys: ["rarbg"],
      url: "https://rarbg.to/torrents",
      search: "https://rarbg.to/torrents?search={}"
    },
    {
      name: "Reddit",
      keys: ["reddit", "r"],
      url: "https://www.reddit.com/r",
      search: "https://www.reddit.com/r/search?q={}"
    },
    {
      name: "Simplenote",
      keys: ["simplenote", "sn"],
      url: "https://app.simplenote.com"
    },
    {
      name: "Spotify",
      keys: ["spotify"],
      url: "https://open.spotify.com"
    },
    {
      name: "ResetERA",
      keys: ["resetera", "reset", "era", "re"],
      url: "https://www.resetera.com"
    },

    {
      name: "Steam",
      keys: ["steam"],
      url: "https://store.steampowered.com",
      search: "https://store.steampowered.com/search/?term={}"
    },
    {
      name: "Tumblr",
      keys: ["tumblr"],
      url: "https://tumblr.com"
    },
    {
      name: "The Movie Database",
      keys: ["tmdb"],
      url: "https://www.themoviedb.org",
      search: "https://www.themoviedb.org/search?query={}&language=en-US"
    },
    {
      name: "The TVDB",
      keys: ["tvdb"],
      url: "https://thetvdb.com",
      search: "https://thetvdb.com/search?query={}"
    },
    {
      name: "Twitch",
      keys: ["twitch"],
      url: "https://twitch.tv/directory"
    },
    {
      name: "Twitter",
      keys: ["twitter"],
      url: "https://twitter.com",
      search: "https://twitter.com/search?q={}"
    },
    {
      name: "WhatsApp",
      keys: ["whatsapp", "wa"],
      url: "https://web.whatsapp.com/"
    },
    {
      name: "Wirecutter",
      keys: ["wirecutter", "wc"],
      url: "https://thewirecutter.com/"
    },
    {
      name: "Yarn",
      keys: ["yarn"],
      url: "https://yarnpkg.com",
      search: "https://yarnpkg.com//en/packages?q={}"
    },
    {
      name: "YouTube",
      keys: ["youtube", "yt"],
      url: "https://youtube.com",
      search: "https://youtube.com/results?search_query={}"
    },
    // Destiny
    {
      category: "Destiny",
      name: "Braytech",
      keys: ["braytech"],
      url: "https://braytech.org"
    },
    {
      category: "Destiny",
      name: "D2Checklist",
      keys: ["d2checklist", "d2c"],
      url: "https://www.d2checklist.com"
    },
    {
      category: "Destiny",
      name: "Destiny Item Manager",
      keys: ["destiny item manager", "dim"],
      url: "https://app.destinyitemmanager.com"
    },
    {
      category: "Destiny",
      name: "Guardian.gg",
      keys: ["guardian", "ggg"],
      url: "https://guardian.gg"
    },
    {
      category: "Destiny",
      name: "Destiny Sets",
      keys: ["destiny sets", "sets"],
      url: "https://destinysets.com"
    },
    {
      category: "Destiny",
      name: "Light.gg",
      keys: ["lightgg", "light"],
      url: "https://light.gg"
    },
    // Reddit
    {
      category: "Reddit",
      name: "/r/DestinyTheGame",
      keys: ["r/destinythegame", "r/dtg", "dtg"],
      url: "https://www.reddit.com/r/destinythegame",
      search:
        "https://www.reddit.com/r/destinythegame/search?q={}&restrict_sr=1"
    },
    {
      category: "Reddit",
      name: "/r/HipHopHeads",
      keys: ["r/hiphopheads", "r/hhh"],
      url: "https://www.reddit.com/r/hiphopheads",
      search: "https://www.reddit.com/r/hiphopheads/search?q={}&restrict_sr=1"
    },
    // Ugh
    {
      name: "/g/ - Technology",
      keys: ["g"],
      url: "https://boards.4chan.org/g/catalog"
    },
    {
      name: "/w/ - Wallpapers",
      keys: ["w"],
      url: "https://boards.4chan.org/w/catalog"
    },
    {
      name: "/wg/ - Wallpapers General",
      keys: ["g"],
      url: "https://boards.4chan.org/wg/catalog"
    }
  ]
};
