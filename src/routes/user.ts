//routes.user.ts

import express, { Request, Response } from "express";
import UserController from "../controllers/userController";
import { authenticateJWT } from "../../config/auth";

const router = express.Router();
const userController = new UserController();

router.post("/register", async (req: Request, res: Response) => {
  try{
    const response = await userController.register(req.body);
    return res.status(200).send(response === "User registered successfully" );
      
} catch (error) {
  res.status(400).send(error);
}
});

router.post("/login", async (req: Request, res: Response) => {
  try{
    const response = await userController.login(req.body);
    return res.status(200).send(response);
  }catch(error){
    res.status(400).send(error);
  }
});

router.get("/findAll", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await userController.findAll();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/findById/:id", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await userController.findById(req.params.id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.patch("/update", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await userController.update(req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/delete/:id", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await userController.delete(req.params.id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});



export default router;
