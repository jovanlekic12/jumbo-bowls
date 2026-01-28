import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      maxlength: [40, "A product name must be 40 characters or fewer"],
      required: [true, "A product must have a name"],
    },
    image: {
      type: String,
      required: [true, "A product must have an image"],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    summary: {
      type: String,
      trim: true,
      maxlength: [110, "A product summary must be 110 characters or fewer"],
      minlength: [10, "A product summary must be at least 10 characters"],
      required: [true, "A product must have a summary"],
    },
    description: {
      type: String,
      trim: true,
    },
    calories: {
      type: Number,
      required: [true, "Number of calories must be defined for the product"],
    },
    nutriScore: {
      type: Number,
      required: [true, "Nutri-score must be defined for the product"],
    },
    ingredients: {
      bases: { type: [String], default: [] },
      proteins: { type: [String], default: [] },
      mixinsAndToppings: { type: [String], default: [] },
      sauces: { type: [String], default: [] },
    },
    ingredientsImages: {
      bases: { type: [String], default: [] },
      proteins: { type: [String], default: [] },
      mixinsAndToppings: { type: [String], default: [] },
      sauces: { type: [String], default: [] },
    },
    labels: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

productSchema.index({ name: 1 }, { unique: true });

export default mongoose.model("Product", productSchema);
