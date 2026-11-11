import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import rolesRoutes from "./routes/rolesroutes.js";
import comentariosRoutes from "./routes/comentariosroutes.js";
import calificacionRoutes from "./routes/calificacionroutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import publicacionesRoutes from "./routes/publicaciones.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.use("/users", userRoutes);
app.use("/roles", rolesRoutes);
app.use("/comentarios", comentariosRoutes);
app.use("/calificaciones", calificacionRoutes);
app.use("/publicaciones", publicacionesRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT || 3000}`);
});