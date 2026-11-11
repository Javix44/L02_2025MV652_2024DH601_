import { pool } from '../db.js';

export const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows;
};

export const getBusquedaPorNombre = async (nombre) => {
        const buscar = `%${nombre}%`;
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE nombre LIKE ?', [buscar]);
        return rows;
}

export const getBusquedaPorApellido = async (apellido) => {
        const buscar = `%${apellido}%`;
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE apellido LIKE ?', [buscar]);
        return rows;
}

export const postCrearUsuario = async (nombre_usuario, clave, nombre, apellido, rol_id) => {
        const query = `INSERT INTO usuarios
            (nombre_usuario, clave, nombre, apellido, rol_id)
            VALUES (?, ?, ?, ?, ?)`;
        await pool.query(query, [nombre_usuario, clave, nombre, apellido, rol_id]);

        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE nombre_usuario = ?',
            [nombre_usuario]);

        return rows[0];
}

export const putActualizarUsuario = async (idUsuario, usuario) => {
        const { nombre_usuario, clave, nombre, apellido, rol_id } = usuario;
        const query = `UPDATE usuarios
            SET nombre_usuario = ?, clave = ?, nombre = ?, apellido = ?, rol_id = ?
            WHERE usuario_id = ?`;
        const [result] = await pool.query(query, [
            nombre_usuario,
            clave,
            nombre,
            apellido,
            rol_id,
            idUsuario
        ]);
        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE usuario_id = ?',
            [idUsuario]);

        return rows[0];
}


export const eliminarUsuario = async (idUsuario) => {
        const [usuarios] = await pool.query('SELECT * FROM usuarios WHERE usuario_id = ?', [idUsuario]);
        if (usuarios.length === 0) throw new Error('Usuario no encontrado');
        await pool.query('DELETE FROM usuarios WHERE usuario_id = ?', [idUsuario]);
        return {message: 'Usuario eliminado correctamente', usuario: usuarios[0]};
        //Usar Mysql cambia un poco el metodo de hacerlo pero funciona
}