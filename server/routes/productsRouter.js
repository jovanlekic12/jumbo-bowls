import express from "express";
import productsController from "../controllers/productsController.js";
import reviewsRouter from "./reviewsRouter.js";
import authController from "../controllers/authController.js";

const router = express.Router();

// Nested routes for reviews on products
router.use("/:productId/reviews", reviewsRouter);

router
  .route("/")
  .get(authController.protect, productsController.getAllProducts)
  .post(productsController.createProduct);

router
  .route("/:id")
  .get(productsController.getOneProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

export default router;
