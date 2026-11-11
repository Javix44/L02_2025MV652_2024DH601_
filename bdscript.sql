CREATE DATABASE blogDB;

USE blogDB;

CREATE TABLE roles (
    rol_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(50)
);

CREATE TABLE usuarios (
    usuario_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(100),
    clave VARCHAR(255),
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    rol_id INT NOT NULL,

    CONSTRAINT fk_usuarios_rol
    FOREIGN KEY (rol_id)
    REFERENCES roles (rol_id)
);

CREATE TABLE publicaciones (
    publicacion_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100),
    descripcion VARCHAR(300),
    usuario_id INT NOT NULL,

    CONSTRAINT fk_publicaciones_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios (usuario_id)
);


CREATE TABLE comentarios (
    comentario_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    publicacion_id INT NOT NULL,
    comentario VARCHAR(200),
    usuario_id INT NOT NULL,

    CONSTRAINT fk_comentarios_publicacion
    FOREIGN KEY (publicacion_id)
    REFERENCES publicaciones (publicacion_id),

    CONSTRAINT fk_comentarios_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios (usuario_id)
);

CREATE TABLE calificaciones (
    calificacion_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    publicacion_id INT NOT NULL,
    usuario_id INT NOT NULL,
    calificacion INT,

    CONSTRAINT fk_calificaciones_publicacion
    FOREIGN KEY (publicacion_id)
    REFERENCES publicaciones (publicacion_id),

    CONSTRAINT fk_calificaciones_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios (usuario_id)
);