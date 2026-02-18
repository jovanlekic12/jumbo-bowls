import { Review } from "../models/reviewModel.js";
import controllerFactory from "./controllerFactory.js";

const setProductUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.body.currentUser.id;

  next();
};

const getAllReviews = controllerFactory.getAll(Review);
const getOneReview = controllerFactory.getOne(Review, "");
const createReview = controllerFactory.createOne(Review);
const updateReview = controllerFactory.updateOne(Review);
const deleteReview = controllerFactory.deleteOne(Review);

export default {
  getAllReviews,
  getOneReview,
  createReview,
  updateReview,
  deleteReview,
  setProductUserIds,
};
