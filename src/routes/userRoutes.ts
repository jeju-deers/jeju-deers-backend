import { Router } from "express";
import { getUsers, findUserById, updateUser } from "../user";
import { authenticateToken } from "../sessionCheck";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
router.get("/", getUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the user to retrieve
 *           example: "64aeb4f5e526b7d8b7c0f4c9"
 *     responses:
 *       200:
 *         description: User information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:id", authenticateToken, findUserById);
/**
 * @swagger
 * /users/edit/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the user to update
 *           example: "64aeb4f5e526b7d8b7c0f4c9"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userType:
 *                 type: string
 *                 description: The updated user type
 *                 enum: [player, coach, external]
 *                 example: player
 *               name:
 *                 type: string
 *                 description: The updated name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The updated email of the user
 *                 example: john.doe@example.com
 *               school:
 *                 type: string
 *                 description: The updated school name
 *                 example: "Some University"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.put("/edit/:id", authenticateToken, updateUser);

export default router;
