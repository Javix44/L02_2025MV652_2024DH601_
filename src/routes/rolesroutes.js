import { Router } from "express";
import * as roleController from "../controllers/rolesController.js";
import { runValidations, createUserValidation2 } from "../middlewares/validators.js";

const router = Router();

router.get("/", roleController.getObtenerTodosLosRoles);

router.get("/buscarPorID/:id", roleController.getObtenerPorID);

router.post("/", runValidations(createUserValidation2), roleController.postCrearRole);

router.put("/:id_rol", roleController.putActualizarRole);

router.delete("/:id_rol", roleController.deleteEliminarRole);

export default router;