import { pool } from '../db.js';

export const getAllCalificaciones = async () => {
    const [rows] = await pool.query('SELECT * FROM calificaciones');
    return rows;
};


export const getBusquedaPorID = async (id) => {
        const [rows] = await pool.query('SELECT * FROM calificaciones WHERE calificacion_id = ?', [id]);
        return rows[0];
}

export const postCrearCalificacion = async (publicacion_id, usuario_id, calificacion) => {
    const [result] = await pool.query('INSERT INTO calificaciones (publicacion_id, usuario_id, calificacion) VALUES (?, ?, ?)', [publicacion_id, usuario_id, calificacion]);
    const [rows] = await pool.query('SELECT * FROM calificaciones WHERE calificacion_id = ?', [result.insertId]);
    return rows[0];
}

export const putActualizarCalificacion = async (idCalificacion, calificacion) => {
        const { publicacion_id, usuario_id, calificacionnum } = calificacion;
        const query = `UPDATE calificaciones
            SET publicacion_id = ?, usuario_id = ?, calificacion = ?
            WHERE calificacion_id = ?`;
        const [result] = await pool.query(query, [
            publicacion_id,
            usuario_id,
            calificacionnum,
            idCalificacion
        ]);
        const [rows] = await pool.query(
            'SELECT * FROM calificaciones WHERE calificacion_id = ?',
            [idCalificacion]);

        return rows[0];
}


export const eliminarCalificacion = async (idCalificacion) => {
        const [calificaciones] = await pool.query('SELECT * FROM calificaciones WHERE calificacion_id = ?', [idCalificacion]);
        if (calificaciones.length === 0) throw new Error('Calificación no encontrada');
        await pool.query('DELETE FROM calificaciones WHERE calificacion_id = ?', [idCalificacion]);
        return {message: 'Calificación eliminada correctamente', calificacion: calificaciones[0]};
        //Usar Mysql cambia un poco el metodo de hacerlo pero funciona
}