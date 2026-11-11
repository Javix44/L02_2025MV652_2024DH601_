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

export const createPublicacion = async ({ titulo, descripcion }) => {
    const [[{ idPublicacion }]] = await pool.query("SELECT UUID() AS idPublicacion");
    await pool.query(
        "INSERT INTO publicaciones (publicacion_id, titulo, descripcion) VALUES (?, ?, ?)",
        [idPublicacion, titulo, descripcion || null]
    );
    return getPublicacionById(idPublicacion);
};

export const updatePublicacion = async (idPublicacion, { titulo, descripcion }) => {
    await pool.query(
        "UPDATE publicaciones SET titulo = ?, descripcion = ? WHERE publicacion_id = ?",
        [titulo, descripcion || null, idPublicacion]
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
