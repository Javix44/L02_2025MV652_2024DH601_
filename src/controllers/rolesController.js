import * as userService from '../services/rolesService.js';

export const getObtenerTodosLosRoles = async (req, res, next) => {
    try {
        const roles = await userService.getAllRoles();
        res.json(roles);
    }
    catch (error) {
        next(error);
    }  
};

export const getObtenerPorID = async (req, res, next) => {
    const { id } = req.params;
    try {
        const [rol] = await userService.getRoleById(id);
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }  
        res.json(rol);
    }
    catch (error) {
        next(error);
    }
};

export const postCrearRole = async (req, res, next) => {
    const { rol } = req.body;
    try {
        const nuevoRole = await userService.postCrearRole(rol);
        res.status(201).json(nuevoRole);
    }
    catch (error) {
        next(error);
    }
};

export const putActualizarRole = async (req, res, next) => {
    const { id_rol } = req.params;
    const { rol } = req.body;
    try {
        const roleActualizado = await userService.putActualizarRole(id_rol, rol);
        res.json(roleActualizado);
    }
    catch (error) {
        next(error);
    }
};

export const deleteEliminarRole = async (req, res, next) => {
    const { id_rol } = req.params;
    try {
        const resultado = await userService.eliminarRole(id_rol);
        res.json(resultado);
    }
    catch (error) {
        next(error);
    }
};