import { body, validationResult } from "express-validator";

export const runValidations = (validations) => {

    return async (req, res, next) => {
        for (const validation of validations) {
            await validation.run(req);
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ 
            status: "error",
            errors: errors.array() });
    };
}


export const publicacionValidation = [
    body("nombre")
        .trim()
        .notEmpty()
        .withMessage("El nombre de la publicacion es obligatorio")
        .isLength({ max: 120 })
        .withMessage("El nombre no puede superar los 120 caracteres"),
    body("descripcion")
        .optional({ values: "falsy" })
        .trim()
        .isLength({ max: 500 })
        .withMessage("La descripción no puede superar los 500 caracteres")
];


export const createUserValidation = [
    body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

    body("apellido")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio"),

    body("nombre_usuario")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio"),

    body("clave")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
];


export const createUserValidation2 = [
    body("rol")
    .trim()
    .notEmpty()
    .withMessage("El rol es obligatorio")
];

export const createUserValidation3 = [
    body("calificacion")
    .trim()
    .notEmpty()
    .withMessage("La calificación es obligatoria")
];

export const createUserValidation4 = [
    body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("El descripcion es obligatorio")
];