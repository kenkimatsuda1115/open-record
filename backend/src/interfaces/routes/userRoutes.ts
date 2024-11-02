import express from "express";
import { UserController } from "../controllers/UserController";

const router = express.Router();

const userController = new UserController();
// router.post('/signup', userController.signUp)
// router.post('/api/auth/signup', (req, res) => {
router.post("/auth/signup", (req, res) => {
  userController.signUp(req, res);
});

router.post("/auth/login", (req, res) => {
  userController.login(req, res);
});

export default router;
