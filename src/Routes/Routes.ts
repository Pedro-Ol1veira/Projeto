import { Controller } from "@/Controllers/Controller";
import checkAluno from "@/middlewares/checkAluno";
import checkBody from "@/middlewares/checkBody";
import { Router } from "express";

const Routes = Router();
const controller = new Controller();

Routes.post("/", checkBody, controller.create);
Routes.put("/", checkAluno, checkBody, controller.updateAluno);
Routes.post("/materias", checkAluno, checkBody, controller.cadastrarMateria);
Routes.post("/tasks/:codigoMateria", checkBody, checkAluno, controller.cadastrarTask);
Routes.get("/materias", checkAluno, controller.getMaterias);
Routes.delete("/materias/:codigo", checkAluno, controller.deleteMateria);
Routes.put("/materias/:codigo", checkAluno, checkBody, controller.updateMateria);
Routes.get("/materias/:codigo/tasks", checkAluno, controller.getTasks);
Routes.patch("/materias/:codigo/tasks/:id", checkAluno, checkBody, controller.concluirTask);
Routes.delete("/materias/:codigo/tasks/:id", checkAluno, controller.deleteTask);
Routes.get("/materias/:codigo/tasks/:id", checkAluno, controller.getTask);
Routes.put("/materias/:codigo/tasks/:id", checkAluno, checkBody, controller.uptadeTask);

export default Routes;