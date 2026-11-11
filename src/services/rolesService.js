import { pool } from '../db.js';

export const getAllRoles = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM roles');
    return rows;
}   

export const getRoleById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM roles WHERE rol_id = ?', [id]);
    return rows[0];
}

export const postCrearRole = async (rol) => {
    const [result] = await pool.query('INSERT INTO roles (rol) VALUES (?)', [rol]);
    const [rows] = await pool.query('SELECT * FROM roles WHERE rol_id = ?', [result.insertId]);
    return rows[0];
}

export const putActualizarRole = async (id, rol) => {
    await pool.query('UPDATE roles SET rol = ? WHERE rol_id = ?', [rol, id]);
    const [rows] = await pool.query('SELECT * FROM roles WHERE rol_id = ?', [id]);
    return rows[0];
}

export const eliminarRole = async (id) => {
    const [roles] = await pool.query('SELECT * FROM roles WHERE rol_id = ?', [id]);
    if (roles.length === 0) throw new Error('Role no encontrado');
    await pool.query('DELETE FROM roles WHERE rol_id = ?', [id]);
    return {message: 'Role eliminado correctamente', role: roles[0]};
}