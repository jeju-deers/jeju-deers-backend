import { Router } from "express";
import {
  createComment,
  readComments,
  updateComments,
  deleteComments,
} from "../comment";
import { authenticateToken } from "../sessionCheck";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API for managing comments
 */

/**
 * @swagger
 * /comments/{postId}:
 *   post:
 *     summary: Create a comment on a specific post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the post
 *           example: "64aeb4f5e526b7d8b7c0f4c9"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - belong
 *               - content
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the commenter
 *                 example: "John Doe"
 *               belong:
 *                 type: string
 *                 description: The affiliation or role of the commenter
 *                 example: "Developer"
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *                 example: "This is a comment."
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request
 */
router.post("/:id", authenticateToken, createComment);
/**
 * @swagger
 * /comments/{postId}:
 *   get:
 *     summary: Retrieve all comments for a specific post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the post
 *           example: "64aeb4f5e526b7d8b7c0f4c9"
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Post not found
 */
router.get("/:id", authenticateToken, readComments);
/**
 * @swagger
 * /comments/{commentId}:
 *   put:
 *     summary: Update a comment by its ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the comment to update
 *           example: "1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: The updated content of the comment
 *                 example: "Updated comment content."
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 */
router.put("/:commentId", authenticateToken, updateComments);
/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: Delete a comment by its ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the comment to delete
 *           example: "1"
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
router.delete("/:commentId", authenticateToken, deleteComments);

export default router;
