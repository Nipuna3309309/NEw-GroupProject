import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createPostController,
  deletePostController,
  getPostController,
  getSinglePostController,
  updatePostController,
} from "../controllers/postController.js";

const router = express.Router();

// Save posts
router.post("/create-post", requireSignIn, isAdmin, createPostController);

router.get("/get-posts", getPostController);

router.get("/get-posts/:slug", getSinglePostController);

router.put("/update-posts/:id", requireSignIn, isAdmin, updatePostController);

router.delete(
  "/delete-posts/:id",
  requireSignIn,
  isAdmin,
  deletePostController
);

export default router;
