import * as publicacionService from "../services/publicacionService.js";

export const getAllPublicaciones = async (req, res, next) => {
    try {
        res.json(await publicacionService.getAllPublicaciones());
    } catch (error) {
        next(error);
    }
};

export const getPublicacionById = async (req, res, next) => {
    try {
        const publicacion = await publicacionService.getPublicacionById(req.params.publicacion_id);
        if (!publicacion) {
            return res.status(404).json({ message: "Publicacion no encontrada" });
        }
        res.json(publicacion);
    } catch (error) {
        next(error);
    }
};

export const createPublicacion = async (req, res, next) => {
    try {
        const publicacion = await publicacionService.createPublicacion(req.body);
        res.status(201).json(publicacion);
    } catch (error) {
        next(error);
    }
};

export const updatePublicacion = async (req, res, next) => {
    try {
        const publicacion = await publicacionService.updatePublicacion(req.params.publicacion_id, req.body);
        if (!publicacion) {
            return res.status(404).json({ message: "Publicacion no encontrada" });
        }
        res.json(publicacion);
    } catch (error) {
        next(error);
    }
};

export const deletePublicacion = async (req, res, next) => {
    try {
        const publicacion = await publicacionService.deletePublicacion(req.params.publicacion_id);
        if (!publicacion) {
            return res.status(404).json({ message: "Publicacion no encontrada" });
        }
        res.json({ message: "Publicacion eliminada correctamente", publicacion });
    } catch (error) {
        next(error);
    }
};
