import { Router } from "express";
import { signup, login } from "../auth";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for user authentication
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User signup
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userType
 *               - userId
 *               - password
 *               - passwordConfirm
 *               - name
 *               - email
 *             properties:
 *               userType:
 *                 type: string
 *                 description: Type of the user (player, coach, external)
 *                 enum: [player, coach, external]
 *                 example: player
 *               userId:
 *                 type: string
 *                 description: Unique ID for the user
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: "securepassword123"
 *               passwordConfirm:
 *                 type: string
 *                 description: Confirmation of the user's password
 *                 example: "securepassword123"
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *                 example: john.doe@example.com
 *     responses:
 *       201:
 *         description: User successfully signed up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Signup successful
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
router.post("/signup", signup);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - password
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User's unique ID
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.post("/login", login);

export default router;
