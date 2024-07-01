const multer = require('multer');
const express = require('express');
const { login } = require('../controllers/authcontroller');
const {list } =require ('../controllers/listController');
const { registerProduct,purchase,counterOffer } = require('../controllers/productController');
const router = express.Router();

// Login 
router.post('/login', login);

// Product registration 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'E:/bloghunch/frontend/src/chobi2');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
  const upload = multer({storage});
router.post('/register',upload.single("image") ,registerProduct);

// Product list

router.get('/list', list);

// Purchase product
router.post('/purchase',purchase);

// counterOffer

router.post('/counterOffer',counterOffer);




module.exports = router;
