const express = require("express");
const bodyParser = require("body-parser")
const session = require("express-session")
const accountRouter = require("./routes/account")
const app = express()
const PORT = 3000

// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

var animeList = [
    {
        id:0,
        data: {
            eng_title: "Full Metal Alchemist: Brotherhood",
            o_lang_title: "Title",
            alt_titles: ["alternate title 1", "alternate title 2"],
            genre_tags: ["Fantasy", "Action", "Adventure"],
            franchise_id: 100,
            release_year: 2015,
            release_season: "Spring",

            short_desc: "lorem ipsum",
            long_desc: "lorem ipsum",
            lang: ["Japanese", "English"],
            tags: ["science", "magic", "alchemy"],

            seasons: [
                {
                    title: "Season 1",
                    release_year: "2015",
                    season: "Summer",
                    episodes: [
                        {
                            number: 1,
                            title: "The Beginning",
                            desc: "Lorem"
                        },

                        {
                            number: 2,
                            title: "Can't remember to not forget.",
                            desc: "Lorem"
                        }
                    ]
                }
            ],
            
            characters: {
                protagonists: [
                    {
                        name: "Edward Elric",
                        desc: "Lorem ipsum",
                    },

                    {
                        name: "Alphose Elric",
                        desc: "Lorem ipsum",
                    },
                ],

                supporting: [
                    {
                        name: "Winry Rockbell",
                        desc: "Lorem ipsum"
                    },

                    {
                        name: "Hughes",
                        desc: "Lorem ipsum"
                    }
                ]
            },

            relations: [1, 2, 3] //ids of other entries

        }
    }, 

    {
        id:1,
        data: {
            eng_title: "Demon Slayer",
            o_lang_title: "Title",
            alt_titles: ["alternate title 1", "alternate title 2"],
            genre_tags: ["Fantasy", "Action", "Adventure"],
            franchise_id: 105,
            release_year: 2019,
            release_season: "Summer",

            short_desc: "lorem ipsum",
            long_desc: "lorem ipsum",
            lang: ["Japanese", "English"],
            tags: ["demons"],

            seasons: [
                {
                    title: "Season 1",
                    release_year: "2019",
                    seasons: "Summer",
                    episodes: [
                        {
                            number: 1,
                            title: "Everybody Dies",
                            desc: "Lorem"
                        },

                        {
                            number: 2,
                            title: "Except for...",
                            desc: "Lorem"
                        }
                    ]
                }
            ],
            
            characters: {
                protagonists: [
                    {
                        name: "Tanjiro",
                        desc: "Lorem ipsum",
                    },

                    {
                        name: "Nezuko",
                        desc: "Lorem ipsum",
                    },
                ],

                supporting: [
                    {
                        name: "Zenitsu",
                        desc: "Lorem ipsum"
                    },

                    {
                        name: "Inosuke",
                        desc: "Lorem ipsum"
                    }
                ]
            },

            relations: [50] //ids of other entries
            
            
        } 
    }
]

app.set("view engine", "pug")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))

app.use(session({
    secret: "All your dependencies are belong to us! No npm-san!",
    resave: false,
    saveUninitialized: true,
}))

app.use("/account", accountRouter)
// app.use(
//     session({
//       secret: "you don't know my session secret, ha!",
//       resave: false,
//       saveUninitialized: true
//     })
//   );


// app.use(bodyParser.json())

// app.post("/", (req, res) => {
//     console.log(req.body);
//     res.send("OK")
// })

app.get("/", (req, res) => {
    res.render("index")
})


app.get("/feedback", (req, res) => {
    res.render("feedback")
})

app.get("/anime", (req, res) => {

    res.render("shows", {animeList: animeList})
    //Anime page
    // res.send("<h1> List of Anime </h1>")
})

/**
 * @TODO Fix this searcher
 */
app.get("/anime/tags/:tags", (req, res) => {
    let searchTagList = req.params.tags.split("&");
    let listLength = searchTagList.length;
    let tagHits = 0;
    let itemsFound;
    for (tag of searchTagList) {

    }

    for (tag of searchTagList) {
        itemsFound = animeList.filter((entry) => {
            return entry.data.tags.some((item) => {
                return item == tag
            })
    })}
    res.json(itemsFound)
})

app.get("/anime/genre", (req, res) => {
    //List of genres
    res.send("<h1> Genre List </h1>")
})

app.get("/anime/genre/:genre", (req, res) => {
    //List of shows in the genre.
    let searchGenre = req.params.genre
    let itemsFound = []
    for (let entry of animeList) {
        let itemMatch = false;
        for (let genre of entry.data.genre_tags) {
            if (genre == searchGenre) {
                itemMatch = true
            }
        }

        if (itemMatch) {
            itemsFound.push(entry)
        }
    }
    res.json(itemsFound)
})

app.get("/anime/year/", (req, res) => {
    res.send("<h1>Year List</h1>");
})

app.get("/anime/year/:year", (req, res) => {
    let itemsFound = []
    let searchYear = req.params.year
    for (let entry of animeList) {
        let itemMatch = false;
        if (entry.data.release_year == searchYear) {
            itemMatch = true;
        } else {
            for (let season of entry.data.seasons) {
                if (season.release_year == searchYear) {
                    itemMatch = true;
                }
            }

        }

        if (itemMatch) {
            itemsFound.push(entry)
        }
    }
    res.json(itemsFound)
})

app.get("/anime/year/:year/season/:season", (req, res) => {
    let itemsFound = []
    let searchYear = req.params.year
    let searchSeason = req.params.season
    for (let entry of animeList) {
        let itemMatch = false;
        if (entry.data.release_year == searchYear && entry.data.release_season == searchSeason) {
            itemMatch = true;
        } else {
            for (let season of entry.data.seasons) {
                if (season.release_year == searchYear && season.release_season == searchSeason) {
                    itemMatch = true;
                }
            }

        }

        if (itemMatch) {
            itemsFound.push(entry)
        }
    }
    
    res.json(itemsFound)
})

app.get("/anime/:id", (req, res) => {
    //Individual Media page
    let itemFound = false;
    for (let entry of animeList) {
        if (entry.id == req.params.id) {
            res.render("show-details",{
                entry: entry,
                favList: req.session.userFavList
            })
            itemFound = true
            break;
        }
    }
    if (!itemFound) {
        res.send("No content found.")
    }
    // res.send(`<h1> My Anime ${req.params.id} </h1>`)
})

app.post("/feedback/give", (req, res) => {
    // console.log(req.body)
    res.redirect("/")
})

app.get("/saveShow/:id", (req, res) => {
    if (req.session.userFavList) {

        for (let entry of animeList) {
            // console.log(entry)
            if (entry.id == req.params.id) {
                req.session.userFavList.push(entry) 
            }
        }
        res.redirect("back")
    } else {
        res.redirect("/account")
    }
})






// app.listen(PORT, () => {
//     console.log(`Express has started on Port ${PORT}`)
// })

app.listen(PORT, () => {
    console.log(`Server active on Port: ${PORT}.`)
})