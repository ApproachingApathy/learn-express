const express = require("express")
const router = express.Router()
const pgp = require('pg-promise')();
const db = require('../database.js')


router.post("/signin", async (req, res) => {
    let user = await db.getUserFromEmail(req.body.email)
    if (user && user.password == req.body.password) {
        req.session.isAuthenticated = true; 
        req.session.user = user.username || null; 
        res.redirect("dashboard");
    } else {
        res.redirect('signin')
    }
    // res.redirect("dashboard")
})

router.post("/signup", (req, res) => {
    db.registerUser(req)
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