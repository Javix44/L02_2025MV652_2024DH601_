import { pool } from "../db.js";

const comentarioSelect = `
    SELECT c.comentario_id, c.publicacion_id, c.comentario, c.usuario_id,
           u.nombre_usuario, u.nombre, u.apellido
    FROM comentarios c
    INNER JOIN usuarios u ON u.usuario_id = c.usuario_id
`;

export const getAllComentarios = async () => {
    const [rows] = await pool.query(`${comentarioSelect} ORDER BY c.comentario_id`);
    return rows;
};

export const getComentarioById = async (idComentario) => {
    const [rows] = await pool.query(`${comentarioSelect} WHERE c.comentario_id = ?`, [idComentario]);
    return rows[0] ?? null;
};

export const getComentarioByPublicacion = async (idPublicacion) => {
    const [rows] = await pool.query(`${comentarioSelect} WHERE c.publicacion_id = ?`, [idPublicacion]);
    return rows[0] ?? null;
};

export const getComentarioByUsuario = async (idUsuario) => {
    const [rows] = await pool.query(`${comentarioSelect} WHERE c.usuario_id = ?`, [idUsuario]);
    return rows[0] ?? null;
};

export const createComentario = async (comentario) => {
    const { publicacion_id, comentariotext, usuario_id } = comentario;
    await pool.query(
        `INSERT INTO comentarios
            (publicacion_id, comentario, usuario_id)
         VALUES (?, ?, ?)`,
        [publicacion_id, comentariotext, usuario_id]
    );
    return getComentarioById(idComentario);
};

export const updateComentario = async (idComentario, comentario) => {
    const { publicacion_id, comentariotext, usuario_id } = comentario;
    await pool.query(
        `UPDATE doc_comentarios
         SET publicacion_id = ?, comentario = ?, usuario_id = ?
         WHERE comentario_id = ?`,
        [publicacion_id, comentariotext, usuario_id, idComentario]
    );
    return getComentarioById(idComentario);
};

export const deleteComentario = async (idComentario) => {
    const comentario = await getComentarioById(idComentario);
    if (!comentario) {
        return null;
    }
    await pool.query("DELETE FROM doc_comentarios WHERE comentario_id = ?", [idComentario]);
    return comentario;
};