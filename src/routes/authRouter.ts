import express from 'express';
import { login, logout, refreshToken } from '../controllers/authController';

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginWithUsername:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: User's username
 *         password:
 *           type: string
 *           description: User's password hashed with bcrypt
 *       example:
 *         username: user
 *         password: $2b$04$7z8TTcl3P/zi4G3QZN3zweaAeVv7KSLLfrWjmTntFQjiyXAuHrWn.
 *   
 *     LoginWithEmail:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password hashed with bcrypt
 *       example:
 *         email: user@gmail.com
 *         password: $2b$04$7z8TTcl3P/zi4G3QZN3zweaAeVv7KSLLfrWjmTntFQjiyXAuHrWn.
 * 
 *     CustomError:
 *       type: object
 *       required:
 *         - status
 *         - message
 *       properties:
 *         status:
 *           type: string
 *           description: Error
 *         message:
 *           type: string
 *           description: Error message
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/LoginWithUsername'
 *               - $ref: '#/components/schemas/LoginWithEmail'
 *     responses:
 *       200:
 *         description: Successful login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                 type: object
 *                 description: User's payload
 *               accessToken:
 *                 type: string
 *                 description: Access Token
 *               refreshToken:
 *                 type: string
 *                 description: Refresh Token
 *               example:
 *                 user: {}
 *                 accessToken: $2b$04$7z8TTcl3P/zi4G3QZN3zweaAeVv7KSLLfrWjmTntFQjiyXAuHrWn
 *                 refreshToken: $2b$04$7z8TTcl3P/zi4G3QZN3zweaAeVv7KSLLfrWjmTntFQjiyXAuHrWn.
 *       400:
 *         description: Validation Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomError'
 *       401:
 *         description: Unauthorized Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomError'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomError'
 */

/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     summary: Log out
 *     tags: [Authentication]
 *     requestBody:
 *     responses:
 *       205:
 *         description: Successfully logged out, cookies deleted.
 *         content:
 *       401:
 *         description: Unauthorized Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomError'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomError'
 */

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   get:
 *     summary: Refresh tokens
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         schema:
 *           type: string
 *     tags: [Authentication]
 *     requestBody:
 *     responses:
 *       200:
 *         description: Successful refreshed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                 type: object
 *                 description: User's payload
 *               accessToken:
 *                 type: string
 *                 description: Access Token
 *               refreshToken:
 *                 type: string
 *                 description: Refresh Token
 *               example:
 *                 user: {}
 *                 accessToken: $2b$04$7z8TTcl3P/zi4G3QZN3zweaAeVv7KSLLfrWjmTntFQjiyXAuHrWn
 *                 refreshToken: $2b$04$7z8TTcl3P/zi4G3QZN3zweaAeVv7KSLLfrWjmTntFQjiyXAuHrWn.
 *       401:
 *         description: Unauthorized Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomError'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomError'
 */

const authRouter = express.Router();

authRouter.route('/login').post(login);
authRouter.route('/logout').get(logout);
authRouter.route('/refresh').get(refreshToken);

export default authRouter;