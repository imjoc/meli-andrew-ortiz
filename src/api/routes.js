import express from "express";
import itemsController from "./controllers/ItemController";

const router = express.Router();

router.get("/items", async (req, res) => { await itemsController.search(req, res); });
router.get("/items/:id/:description?", async (req, res) => { await itemsController.show(req, res); });

export default router;