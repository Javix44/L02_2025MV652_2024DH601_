import { Router } from "express";
import * as userController from "../controllers/comentariosController.js";
import { runValidations, createUserValidation4 } from "../middlewares/validators.js";

const router = Router();

router.get("/", userController.getObtenerTodosLosComentarios);

router.get("/buscarporUsuario/:id", userController.getObtenerPorUsuario);

router.post("/", runValidations(createUserValidation4), userController.postCrearComentario);

router.put("/:id_comentario", userController.putActualizarComentario);

router.delete("/:id_comentario", userController.deleteEliminarComentario);

export default router;