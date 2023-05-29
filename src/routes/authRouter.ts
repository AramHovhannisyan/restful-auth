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
 * /api/v1/auth/login:
 *   post:
 *     summary: Login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *         - username
 *         - password
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       400:
 *         description: Validation Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized Error
 *       500:
 *         description: Some server error
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
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized Error
 *       500:
 *         description: Some server error
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
 *         description: Successfully refreshed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized Error, refresh token not found in db or (and) cookies
 *       500:
 *         description: Some server error
 */

const authRouter = express.Router();

authRouter.route('/login').post(login);
authRouter.route('/logout').get(logout);
authRouter.route('/refresh').get(refreshToken);

export default authRouter;