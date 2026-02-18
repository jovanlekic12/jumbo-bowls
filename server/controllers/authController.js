import jwt from "jsonwebtoken";
import { promisify } from "util";
import catchAsync from "../helpers/catchAsync.js";
import User from "../models/userModel.js";
import AppError from "../helpers/appError.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_STRING, {
    expiresIn: "90d",
  });
};

const createSendToken = (res, statusCode, user) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: {
        ...user.toObject(),
        password: undefined,
      },
    },
  });
};

const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;

  // 1. Create new user
  const newUser = await User.create({
    name,
    email,
    role,
    password,
    passwordConfirm,
  });

  // 2. Sign token and send success response
  createSendToken(res, 201, newUser);
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide both email and password", 404));
  }

  // 2. Check if the user exists && password is correct
  const currentUser = await User.findOne({ email }).select("+password");

  if (
    !currentUser ||
    !(await currentUser.correctPassword(password, currentUser.password))
  ) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3. If everything ok, send token to client
  createSendToken(res, 200, currentUser);
});

const authenticateUser = async (req, res, next) => {
  // 1. Get the token and check if it exists
  let token;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in! Please log in.", 401));
  }

  // 2. Validate the token
  const decodeTokenFn = promisify(jwt.verify);

  let decodedTokenObj;
  try {
    decodedTokenObj = await decodeTokenFn(token, process.env.JWT_SECRET_STRING);
  } catch (error) {
    return next(
      new AppError("The user belonging to the jwt token doesn't exist!", 400),
    );
  }

  // 3. Check if user still exists
  const currentUser = await User.findById(decodedTokenObj.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to the token no longer exists", 400),
    );
  }

  return currentUser;
};

const getUserWithToken = catchAsync(async (req, res, next) => {
  const currentUser = await authenticateUser(req, res, next);

  if (!currentUser) return next();

  res.status(200).json({
    status: "success",
    data: {
      user: currentUser,
    },
  });
});

const protect = catchAsync(async (req, res, next) => {
  const currentUser = await authenticateUser(req, res, next);

  if (!currentUser) return;

  req.body = { ...req.body, currentUser };
  return next();
});

const restrictTo = (role = "admin") => {
  return (req, res, next) => {
    const userWithPrivilege = role.includes(req.body.currentUser.role);

    if (!userWithPrivilege) {
      return next(
        new AppError(
          "You do not have permission to perfom this operation",
          403,
        ),
      );
    }

    return next();
  };
};

const logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ status: "success" });
};

export default {
  signUp,
  login,
  getUserWithToken,
  logout,
  protect,
  restrictTo,
};
