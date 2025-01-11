import express from "express";
import {
  deleteUsers,
  getAdminDashboard,
  getAdminUsers,
  updateUser,
  getUserDetails,
} from "../admin";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API for admin management and operations
 */

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get admin dashboard
 *     description: Fetch the admin dashboard details, including system statistics and recent activity.
 *     responses:
 *       200:
 *         description: Successful response with dashboard data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userCount:
 *                   type: integer
 *                   description: Total number of users.
 *                 latestUsers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       belong:
 *                         type: string
 *                       userType:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Server error.
 */
router.get("/dashboard", getAdminDashboard);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get admin user list
 *     description: Fetch a list of all users for admin purposes, including their full information.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by user name.
 *       - in: query
 *         name: belong
 *         schema:
 *           type: string
 *         description: Filter by user belong.
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter by user role.
 *       - in: query
 *         name: permission
 *         schema:
 *           type: string
 *         description: Filter by user permission.
 *     responses:
 *       200:
 *         description: Successful response with user data.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   belong:
 *                     type: string
 *                   userType:
 *                     type: string
 *                   permission:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error.
 */
router.get("/users", getAdminUsers);

/**
 * @swagger
 * /admin/users:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete selected users
 *     description: Delete multiple users based on their IDs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of user IDs to be deleted.
 *     responses:
 *       200:
 *         description: Successful deletion of users.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Server error.
 */
router.delete("/users", deleteUsers);

/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get user details
 *     description: Fetch the full details of a specific user by userId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The userId of the user.
 *     responses:
 *       200:
 *         description: Successful response with user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: Unique identifier of the user.
 *                 name:
 *                   type: string
 *                   description: Full name of the user.
 *                 belong:
 *                   type: string
 *                   description: The user's affiliation.
 *                 userType:
 *                   type: string
 *                   description: Type of user (player, coach, external).
 *                 email:
 *                   type: string
 *                   format: email
 *                 school:
 *                   type: string
 *                 studentId:
 *                   type: string
 *                 positions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of positions.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
router.get("/users/:id", getUserDetails);

/**
 * @swagger
 * /admin/users/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Update a user's information
 *     description: Update the information of a specific user including belong, role, permission, name, nickname, email, school, studentId, and positions.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The userId of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               belong:
 *                 type: string
 *                 description: User's belong.
 *               role:
 *                 type: string
 *                 description: User's role.
 *               permission:
 *                 type: string
 *                 description: User's permission level.
 *               name:
 *                 type: string
 *                 description: User's full name.
 *               nickname:
 *                 type: string
 *                 description: User's nickname (optional).
 *               email:
 *                 type: string
 *                 description: User's email address.
 *               school:
 *                 type: string
 *                 description: User's school.
 *               studentId:
 *                 type: string
 *                 description: User's student ID.
 *               positions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of positions the user holds.
 *     responses:
 *       200:
 *         description: Successful update of the user's information.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
router.put("/users/:id", updateUser);

export default router;
