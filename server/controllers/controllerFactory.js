import mongoose from "mongoose";

import catchAsync from "../helpers/catchAsync.js";
import AppError from "../helpers/appError.js";

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on product
    let filter = {};
    if (req.params.productId) filter = { product: req.params.productId };

    console.log("Model name:", Model.modelName);
    console.log("Collection:", Model.collection.name);

    const nativeCount = await mongoose.connection
      .collection("products")
      .countDocuments({});
    console.log("DB:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
    console.log("native products count:", nativeCount);

    const doc = await Model.find(filter);

    // SEND RESPONSE
    res.status(200).json({
      status: "sucess",
      length: doc.length,
      data: { doc },
    });
  });

const getOne = (Model, populateField) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id).populate(populateField);

    if (!doc) {
      return next(new AppError("There is no document with that ID", 404));
    }

    res.status(200).json({
      status: "sucess",
      data: { doc },
    });
  });

const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "sucess",
      data: { doc },
    });
  });

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(201).json({
      status: "sucess",
      data: {
        data: doc,
      },
    });
  });

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "sucess",
      data: null,
    });
  });

export default { getAll, createOne, updateOne, deleteOne, getOne };
