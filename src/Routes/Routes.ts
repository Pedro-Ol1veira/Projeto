import { Controller } from "@/Controllers/Controller";
import checkAluno from "@/middlewares/checkAluno";
import { Router } from "express";

const Routes = Router();
const controller = new Controller();

Routes.post("/", controller.create);
Routes.put("/", checkAluno, controller.updateAluno);
Routes.post("/materias", checkAluno, controller.cadastrarMateria);
Routes.post("/tasks/:codigoMateria", checkAluno, controller.cadastrarTask);
Routes.get("/materias", checkAluno, controller.getMaterias);
Routes.delete("/materias/:codigo", checkAluno, controller.deleteMateria);
Routes.put("/materias/:codigo", checkAluno, controller.updateMateria);
Routes.get("/materias/:codigo/tasks", checkAluno, controller.getTasks);
Routes.patch("/materias/:codigo/tasks/:id", checkAluno, controller.concluirTask);
Routes.delete("/materias/:codigo/tasks/:id", checkAluno, controller.deleteTask);
Routes.get("/materias/:codigo/tasks/:id", checkAluno, controller.getTask);
Routes.put("/materias/:codigo/tasks/:id", checkAluno, controller.uptadeTask);

export default Routes;