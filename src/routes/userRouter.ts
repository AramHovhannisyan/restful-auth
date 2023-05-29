import express from 'express';
import { register, getAll } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: Mongoose Schema Objectid
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: User's username
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password hashed with bcrypt
 *       example:
 *         username: user
 *         email: user@gmail.com
 *         password: $2b$04$7z8TTcl3P/zi4G3QZN3zweaAeVv7KSLLfrWjmTntFQjiyXAuHrWn.
 */

/**
 * @swagger
 * /api/v1/user/:
 *   get:
 *     summary: Lists all the Users
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized Error
 *   post:
 *     summary: Register new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized Error
 *       409:
 *         description: Conflict. User with provided email username already exists.
 *       500:
 *         description: Some server error
 *
 */

const userRouter = express.Router();
userRouter.route('/')
          .post(register)
          .get(authMiddleware, getAll);

export default userRouter;