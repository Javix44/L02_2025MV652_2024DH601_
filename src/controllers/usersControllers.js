import * as userService from '../services/userServices.js';

export const getObtenerTodosLosUsuarios = async (req, res, next) => {
    try {
        const usuarios = await userService.getAllUsers();
        res.json(usuarios);
    }
    catch (error) {
        next(error);
    }  
};

export const getObtenerPorEmail = async (req, res, next) => {
    const { email } = req.params;
    try {
        const [usuario] = await userService.getUserbyEmail(email);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }  
        res.json(usuario);
    }
    catch (error) {
        next(error);
    }
};

export const getBuscarPorNombre = async (req, res, next) => {  

    const { nombre } = req.params;
    try {
        const usuarios = await userService.getBusquedaPorNombre(nombre);
        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios con ese nombre' });
        }
        res.json(usuarios);
    }
    catch (error) {
        next(error);
    }
};

export const postCrearUsuario = async (req, res, next) => {
    const { nombre_usuario, clave, nombre, apellido, rol_id } = req.body;
    try {
        const nuevoUsuario = await userService.postCrearUsuario(nombre_usuario, clave, nombre, apellido, rol_id);
        res.status(201).json(nuevoUsuario);
    }
    catch (error) {
        next(error);
    }
};

export const putActualizarUsuario = async (req, res, next) => {
    const { id_usuario } = req.params;
    const { nombre_usuario, clave, nombre, apellido, rol_id } = req.body;
    try {
        const usuarioActualizado = await userService.putActualizarUsuario(id_usuario, {
            nombre_usuario,
            clave,
            nombre,
            apellido,
            rol_id
        });
        res.json(usuarioActualizado);
    }
    catch (error) {
        next(error);
    }
};

export const deleteEliminarUsuario = async (req, res, next) => {
    const { id_usuario } = req.params;
    try {
        const resultado = await userService.eliminarUsuario(id_usuario);
        res.json(resultado);
    }
    catch (error) {
        next(error);
    }
};