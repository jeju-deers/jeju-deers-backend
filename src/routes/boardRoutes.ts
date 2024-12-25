import { Router } from "express";
import {
  boards,
  board,
  createBoard,
  updateBoards,
  deleteBoard,
} from "../Board";
import { authenticateToken } from "../sessionCheck";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: API for managing boards
 */

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Retrieve all boards
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: A list of boards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Board'
 */
router.get("/", boards);
/**
 * @swagger
 * /boards/{id}:
 *   get:
 *     summary: Retrieve a single board by ID
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the board
 *     responses:
 *       200:
 *         description: The board details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       404:
 *         description: Board not found
 */
router.get("/:id", board);
/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create a new board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Board'
 *     responses:
 *       201:
 *         description: Board created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       400:
 *         description: Invalid input
 */
router.post("/", authenticateToken, createBoard);
/**
 * @swagger
 * /boards/{id}:
 *   put:
 *     summary: Update a board by ID
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the board to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Board'
 *     responses:
 *       200:
 *         description: Board updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       404:
 *         description: Board not found
 */
router.put("/:id", authenticateToken, updateBoards);
/**
 * @swagger
 * /boards/{id}:
 *   delete:
 *     summary: Delete a board by ID
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the board to delete
 *     responses:
 *       200:
 *         description: Board deleted successfully
 *       404:
 *         description: Board not found
 */
router.delete("/:id", authenticateToken, deleteBoard);

export default router;
