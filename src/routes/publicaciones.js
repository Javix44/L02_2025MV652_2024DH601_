import { Router } from "express";
import * as publicacionesController from "../controllers/publicacionesController.js";
import { publicacionValidation1, runValidations } from "../middlewares/validators.js";

const router = Router();

router.get("/", publicacionesController.getAllPublicaciones);
router.get("/:publicacion_id", publicacionesController.getPublicacionById);
router.post("/", publicacionesController.createPublicacion);
router.put("/:publicacion_id",  publicacionesController.updatePublicacion);
router.delete("/:publicacion_id", publicacionesController.deletePublicacion);

export default router;
