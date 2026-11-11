import * as userService from '../services/calificacionService.js';

export const getObtenerTodosLasCalificaciones = async (req, res, next) => {
    try {
        const calificaciones = await userService.getAllCalificaciones();
        res.json(calificaciones);
    }
    catch (error) {
        next(error);
    }  
};

export const getObtenerPorCalificacion = async (req, res, next) => {
    const { id } = req.params;
    try {
        const calificacion = await userService.getBusquedaPorID(id);
        if (!calificacion) {
            return res.status(404).json({ message: 'Calificación no encontrada' });
        }  
        res.json(calificacion);
    }
    catch (error) {
        next(error);
    }
};

export const postCrearCalificacion = async (req, res, next) => {
    const { publicacion_id, usuario_id, calificacion } = req.body;
    try {
        const nuevaCalificacion = await userService.postCrearCalificacion(publicacion_id, usuario_id, calificacion);
        res.status(201).json(nuevaCalificacion);
    }
    catch (error) {
        next(error);
    }
};

export const putActualizarCalificacion = async (req, res, next) => {
    const { id_calificacion } = req.params;
    const { publicacion_id, usuario_id, calificacion } = req.body;
    try {
        const calificacionActualizada = await userService.putActualizarCalificacion(id_calificacion, {
            publicacion_id,
            usuario_id,
            calificacion
        });
        res.json(calificacionActualizada);
    }
    catch (error) {
        next(error);
    }
};

export const deleteEliminarCalificacion = async (req, res, next) => {
    const { id_calificacion } = req.params;
    try {
        const resultado = await userService.eliminarCalificacion(id_calificacion);
        res.json(resultado);
    }
    catch (error) {
        next(error);
    }
};