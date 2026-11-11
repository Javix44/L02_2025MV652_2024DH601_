import { pool } from "../db.js";

export const getAllPublicaciones = async () => {
    const [rows] = await pool.query(
        "SELECT publicacion_id, titulo, descripcion, usuario_id FROM publicaciones ORDER BY titulo"
    );
    return rows;
};

export const getPublicacionById = async (idPublicacion) => {
    const [rows] = await pool.query(
        "SELECT publicacion_id, titulo, descripcion, usuario_id FROM publicaciones WHERE publicacion_id = ?",
        [idPublicacion]
    );
    return rows[0] ?? null;
};

export const createPublicacion = async (publicacion) => {
    const { titulo, descripcion, usuario_id } = publicacion;
    await pool.query(
        "INSERT INTO publicaciones (titulo, descripcion, usuario_id) VALUES (?, ?, ?)",
        [titulo, descripcion, usuario_id]
    );
};

export const updatePublicacion = async (idPublicacion, { titulo, descripcion, usuario_id }) => {
    await pool.query(
        "UPDATE publicaciones SET titulo = ?, descripcion = ? , usuario_id = ? WHERE publicacion_id = ?",
        [titulo, descripcion || null, usuario_id, idPublicacion]
    );
    return getPublicacionById(idPublicacion);
};

export const deletePublicacion = async (idPublicacion) => {
    const publicacion = await getPublicacionById(idPublicacion);
    if (!publicacion) {
        return null;
    }
    await pool.query("DELETE FROM publicaciones WHERE publicacion_id = ?", [idPublicacion]);
    return publicacion;
};
