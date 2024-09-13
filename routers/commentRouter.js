import { Router } from "express";

import { addNewComment, getAllComments, deleteComment, voteComment, updateComment } from "../controllers/commentController.js";

const router = Router();

router.get("/", getAllComments)
router.post("/add", addNewComment);
router.patch("/update", updateComment)
router.delete("/delete/:commentId", deleteComment)
router.post("/vote", voteComment)


export default router;
