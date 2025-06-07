import express from "express"

import { isUserLoggedIn } from "../middlewares/UserValidator.middleware.js";
import { addProblemToPlaylist, createPlayList, deletePlaylist, getAllPlayListDetails, getPlayListDetails, removeProblemFromPlaylist } from "../controllers/Playlist.controller.js";

const playlistRoutes = express.Router()

playlistRoutes.post("/create-playlist",isUserLoggedIn,createPlayList)
playlistRoutes.get("/",isUserLoggedIn,getAllPlayListDetails)
playlistRoutes.get("/:playlistId",isUserLoggedIn,getPlayListDetails)
playlistRoutes.post("/add-problem/:playlistId",isUserLoggedIn,addProblemToPlaylist)
playlistRoutes.delete("/delete-playlist/:playlistId",isUserLoggedIn,deletePlaylist)
playlistRoutes.post("/remove-problem/:playlistId" , isUserLoggedIn , removeProblemFromPlaylist)

export default playlistRoutes;