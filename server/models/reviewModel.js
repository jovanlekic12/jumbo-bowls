import mongoose, { Types, mongo } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Please add a review"],
    },

    rating: {
      type: Number,
      required: [true, "Please add a rating"],
      min: 1,
      max: 5,
    },

    createdAt: {
      type: Date,
      default: () => {
        return Date.now();
      },
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to an user"],
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.pre("save", function (next) {
  this.populate({ path: "product" });
  this.populate({ path: "user" });
  next();
});

reviewSchema.pre(/^find/, function (next) {
  //@ts-ignore
  this.populate({
    path: "user",
    select: "name photo createdAt joinedAt",
  });

  next();
});

export const Review = mongoose.model("Review", reviewSchema);
