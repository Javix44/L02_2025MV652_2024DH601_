import { Router } from "express";
import * as userController from "../controllers/calificacionController.js";
import { runValidations, createUserValidation3 } from "../middlewares/validators.js";

const router = Router();

router.get("/", userController.getObtenerTodosLasCalificaciones);

router.get("/buscarporCalificacion/:id", userController.getObtenerPorCalificacion);

router.post("/", runValidations(createUserValidation3), userController.postCrearCalificacion);

router.put("/:id_calificacion", userController.putActualizarCalificacion);

router.delete("/:id_calificacion", userController.deleteEliminarCalificacion);

export default router;