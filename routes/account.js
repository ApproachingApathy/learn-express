const express = require("express")
const router = express.Router()

router.post("/signin", (req, res) => {
    if (req.session.isAuthenticated) {
        // res.redirect("dashboard")
        // console.log([req.session, req.session.isAuthenticated])
        // console.log(req.body)
    } else {
        req.session.isAuthenticated = true
        req.session.user = req.body.user || null
    }
    res.redirect("dashboard")
})

router.post("/signup", (req, res) => {
    console.log(req.body.user)
    console.log(req.body.password)
    res.redirect("/account/signin")
})

router.get("/", (req, res) => {
    // console.log([req.session, req.session.isAuthenticated])
    if (req.session && req.session.user) {
        res.redirect("account/dashboard")
    } else {
        res.redirect("account/signin")
    }
})

router.get("/signup", (req, res) => {
    res.render("account/signup");
})

router.get("/signin", (req,res) => {
    if(req.session.isAuthenticated) {
        res.redirect("dashboard")
    } else {
        // req.session.isAuthenticated = true
        // req.session.user = req.body.user || null
        res.render("account/signin")
    }
})

// router.get("account/signin", (req, res) => {
//     res.render("account/signin")
// })

router.get("/dashboard", (req, res) => {
    if (req.session.isAuthenticated) {
        if (!req.session.userFavList) req.session.userFavList = []
        res.render("account/dashboard", {
            user: req.session.user,
            favList: req.session.userFavList
        })
    } else {
        res.redirect("/")
    }
})



// "account/saveShow/" + entry.id
// router.get("/saveShow/:id", (req, res) => {
//     if (req.session.userFavList) {

//         for (let entry of animeList) {
//             console.log(entry)
//             if (entry.id == req.params.id) {
//                 req.session.userFavList.push(entry) 
//             }
//         }
//         res.redirect("back")
//     } else {
//         res.redirect("/")
//     }
// })




module.exports = router; 