const path = require("path");

const express = require("express");
const { body } = require("express-validator");

const adminCotroller = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminCotroller.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminCotroller.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title", "Title must only contain letters and numbers!")
      .isString()
      .isLength({ min: 3 })
      .trim(),
    ,
    body("price").isFloat().withMessage("Please enter a valid price!"),
    body("description")
      .isLength({ min: 5, max: 400 })
      .withMessage("Description must be between 5 and 400 characters!")
      .trim(),
  ],
  isAuth,
  adminCotroller.postAddProduct,
);

router.get("/edit-product/:productId", isAuth, adminCotroller.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Title can only contain letters and numbers!")
      .trim(),
    body("price").isFloat().withMessage("Please enter a valid price value!"),
    body("description")
      .isLength({ min: 5, max: 400 })
      .withMessage("Description should be between 5 and 400 characters!")
      .trim(),
  ],
  isAuth,
  adminCotroller.postEditProduct,
);

router.delete("/product/:productId", isAuth, adminCotroller.deleteProduct);

module.exports = router;
