import { Router } from "express";
import db from "../services/mysql.db.js";

const router = Router()

router.get('/all-movies', (req, res) => {
    const count = parseInt(req.query.count) || 25;
    const sortBy = req.query.sortBy || "Ranking";
    let orderBy;
    switch (sortBy) {
        case "Ranking":
            orderBy = "order by rating desc"
            break;
        case "Alphabetical":
            orderBy = "order by name";
            break;
        case "Number of ratings":
            orderBy = "order by votes desc"
            break;
        case "Runtime":
            orderBy = "order by cast(substring_index(runtime, ' ', 1) as unsigned) desc"
            break
        default:
            orderBy = "order by rating desc"
    }
    const movies = `select * from movies ${orderBy} limit ?`;
    db.query(movies, [count], (err, data) => {
        if (err) {
            return res.json({error: true, message: err.message})
        } else {
            return res.json({success: true, message: data})
        }
    })
})

router.get("/search-movie", (req, res) => {
    const { search } = req.query;
    let searchMovieQuery = "SELECT * FROM movies";
    const queryParams = [];
    if (search && search.trim()) {
        searchMovieQuery += " WHERE name LIKE ?";
        queryParams.push(`%${search}%`);
    }
    db.query(searchMovieQuery, queryParams, (err, data) => {
        if (err) {
            return res.json({ error: true, message: `Database error: ${err.message}` });
        }
        if (data.length === 0) {
            return res.json({error: true, message: "Nothing was found!"})
        }
        res.json({ success: true, message: data });
    });
})

export default router