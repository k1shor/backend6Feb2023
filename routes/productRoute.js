const express = require('express')
const { addProduct, getAllProducts, getProductsByCategory, getProductDetails, updateProduct, deleteProduct, getFilteredProducts, getRelatedProducts } = require('../controller/productController')
const { requireSignin } = require('../controller/userController')
const upload = require('../utils/fileUpload')
const { productCheck, validate } = require('../validation/validator')
const router = express.Router()

router.post('/addproduct',upload.single('product_image'), productCheck, validate, requireSignin, addProduct)
router.get('/getallproducts', getAllProducts)
router.get('/productsbycategory/:categoryid', getProductsByCategory)
router.get('/productdetails/:id', getProductDetails)
router.put('/updateproduct/:id', upload.single('product_image'), requireSignin, updateProduct)
router.delete('/deleteproduct/:id', requireSignin, deleteProduct)

router.post('/getfilteredproducts', getFilteredProducts)
router.get('/getrelatedproducts/:id', getRelatedProducts)


module.exports = router