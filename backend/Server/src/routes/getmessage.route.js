import express from "express";
const router=express.Router();
import { sendMessage } from "../controller/getMessage.js";

router.post('/send-message',sendMessage);

export default router