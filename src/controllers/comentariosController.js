import * as userService from '../services/comentariosService.js';

export const getObtenerTodosLosComentarios = async (req, res, next) => {
    try {
        const comentarios = await userService.getAllComentarios();
        res.json(comentarios);
    }
    catch (error) {
        next(error);
    }  
};

export const getObtenerPorUsuario = async (req, res, next) => {
    const { email } = req.params;
    try {
        const [usuario] = await userService.getComentarioByUsuario(email);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }  
        res.json(usuario);
    }
    catch (error) {
        next(error);
    }
};

export const getObtenerPorPublicacion = async (req, res, next) => {
    const { email } = req.params;
    try {
        const [usuario] = await userService.getComentarioByPublicacion(email);
        if (!usuario) {
            return res.status(404).json({ message: 'Publicacion no encontrada' });
        }  
        res.json(usuario);
    }
    catch (error) {
        next(error);
    }
};

export const postCrearComentario = async (req, res, next) => {
    const { publicacion_id, comentario, usuario_id } = req.body;
    try {
        const nuevoComentario = await userService.postCrearComentario({ publicacion_id, comentario, usuario_id });
        res.status(201).json(nuevoComentario);
    }
    catch (error) {
        next(error);
    }
};

export const putActualizarComentario = async (req, res, next) => {
    const { id_comentario } = req.params;
    const { publicacion_id, comentario, usuario_id } = req.body;
    try {
        const comentarioActualizado = await userService.putActualizarComentario(id_comentario, {
            publicacion_id,
            comentario,
            usuario_id
        });
        res.json(comentarioActualizado);
    }
    catch (error) {
        next(error);
    }
};
           
export const deleteEliminarComentario = async (req, res, next) => {
    const { id_comentario } = req.params;
    try {
        const resultado = await userService.deleteComentario(id_comentario);
        res.json(resultado);
    }
    catch (error) {
        next(error);
    }
};