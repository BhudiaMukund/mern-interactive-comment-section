import { Router } from "express";
import { deleteUser, getCurrentUser } from "../controllers/userController.js";

const router = Router()

router.get("/current-user", getCurrentUser)
router.delete("/delete-current-user", deleteUser)

export default router