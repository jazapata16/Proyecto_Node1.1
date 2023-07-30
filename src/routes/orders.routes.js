import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrdersAdmin,
  getOrders,
  updateOrder,
  updateOrderOperador,
} from "../controllers/orders.controllers.js";
import { auth,authoperador } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createOrderSchema } from "../schemas/order.schema.js";
import {
  login,
  logout
} from "../controllers/auth.controller.js";


const router = Router();

router.get("/orders", auth, getOrders);

router.get("/orders/admin", getOrdersAdmin);

router.post("/orders", auth, validateSchema(createOrderSchema), createOrder);

router.post("/orders/shipping");

router.get("/orders/:id", auth, getOrder);

router.put("/orders/:id", auth, updateOrder);

router.delete("/orders/:id", auth, deleteOrder);


//API ORDENES (ENDPOINT)
router.put("/operador",auth,updateOrderOperador);
router.post("/orders/operador/login", login);
router.post("/orders/operador/logout", logout);



export default router;
