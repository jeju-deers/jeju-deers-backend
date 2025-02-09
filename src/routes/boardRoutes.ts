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
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - owner
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the board
 *               content:
 *                 type: string
 *                 description: The content of the board
 *               owner:
 *                 type: string
 *                 description: The owner of the board
 *               belong:
 *                 type: string
 *                 description: The department or group the board belongs to
 *               type:
 *                 type: string
 *                 description: The type of the board
 *                 enum:
 *                   - WORKOUT_SCHEDULES
 *                   - TEAM_BOARD
 *                   - COACH_BOARD
 *                   - STAFF_BOARD
 *                   - PLAYBOOK
 *                   - MEMBERSHIP_FEE
 *                   - NEWS
 *                   - GUEST_BOARD
 *                   - MEDIA
 *                   - SUPPORT
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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               owner:
 *                 type: string
 *               belong:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum:
 *                   - WORKOUT_SCHEDULES
 *                   - TEAM_BOARD
 *                   - COACH_BOARD
 *                   - STAFF_BOARD
 *                   - PLAYBOOK
 *                   - MEMBERSHIP_FEE
 *                   - NEWS
 *                   - GUEST_BOARD
 *                   - MEDIA
 *                   - SUPPORT
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
