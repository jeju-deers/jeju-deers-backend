import express, { Router } from "express";
import {
  createGameSchedule,
  getGameSchedules,
  getGameSchedule,
  updateGameSchedule,
  deleteGameSchedule,
} from "../gameSchedule";
import { authenticateToken } from "../sessionCheck";

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: GameSchedules
 *   description: API for managing game schedules
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GameSchedule:
 *       type: object
 *       required:
 *         - date
 *         - location
 *         - homeTeam
 *         - awayTeam
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the schedule
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time of the game
 *           example: "2025-01-15T18:00:00Z"
 *         location:
 *           type: string
 *           description: The location of the game
 *           example: "Stadium A"
 *         homeTeam:
 *           type: string
 *           description: The name of the home team
 *           example: "Team A"
 *         homeScore:
 *           type: number
 *           description: The score of the home team
 *           example: 3
 *         awayTeam:
 *           type: string
 *           description: The name of the away team
 *           example: "Team B"
 *         awayScore:
 *           type: number
 *           description: The score of the away team
 *           example: 2
 */

/**
 * @swagger
 * /game-schedules:
 *   get:
 *     summary: Retrieve all game schedules
 *     tags: [GameSchedules]
 *     responses:
 *       200:
 *         description: A list of game schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GameSchedule'
 */
router.get("/", authenticateToken, getGameSchedules);

/**
 * @swagger
 * /game-schedules/{id}:
 *   get:
 *     summary: Retrieve a specific game schedule
 *     tags: [GameSchedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the game schedule
 *     responses:
 *       200:
 *         description: A single game schedule
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameSchedule'
 *       404:
 *         description: Schedule not found
 */
router.get("/:id", authenticateToken, getGameSchedule);

/**
 * @swagger
 * /game-schedules:
 *   post:
 *     summary: Create a new game schedule
 *     tags: [GameSchedules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameSchedule'
 *     responses:
 *       201:
 *         description: Game schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameSchedule'
 *       400:
 *         description: Bad request
 */
router.post("/", authenticateToken, createGameSchedule);

/**
 * @swagger
 * /game-schedules/{id}:
 *   put:
 *     summary: Update a specific game schedule
 *     tags: [GameSchedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the game schedule to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameSchedule'
 *     responses:
 *       200:
 *         description: Game schedule updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameSchedule'
 *       404:
 *         description: Schedule not found
 */
router.put("/:id", authenticateToken, updateGameSchedule);

/**
 * @swagger
 * /game-schedules/{id}:
 *   delete:
 *     summary: Delete a specific game schedule
 *     tags: [GameSchedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the game schedule to delete
 *     responses:
 *       200:
 *         description: Game schedule deleted successfully
 *       404:
 *         description: Schedule not found
 */
router.delete("/:id", authenticateToken, deleteGameSchedule);

export default router;
