const {check, validationResult} = require('express-validator')

exports.categoryCheck = [
    check('category_name',"Category name is required").notEmpty()
    .isLength({min:3}).withMessage("Category name must be at least 3 characters")
]

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        // return res.status(400).json({error: errors.array().map(err=>err.msg)})
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next()
}

exports.productCheck = [
    check('product_name', "Product name is required").notEmpty()
    .isLength({min:3}).withMessage("Product name must be at least 3 characters"),
    
    check('product_price',"Product price is required").notEmpty()
    .isNumeric().withMessage("Price must be a number"),

    check('product_description',"Product description is required").notEmpty()
    .isLength({min:20}).withMessage("Description must be at least 20 characters"),

    check('count_in_stock',"Count is Stock is required").notEmpty()
    .isNumeric().withMessage("Count must be a number"),

    check('category',"Category is required").notEmpty()   
]

exports.userCheck = [
    check('username',"Username is required").notEmpty()
    .isLength({min:3}).withMessage("Username must be at least 3 characters"),
    check('email',"email is required").notEmpty()
    .isEmail().withMessage("Email format incorrect"),
    check('password',"password is required").notEmpty()
    .not().isIn(['asdf1234','password','kathmandu9','nepal123']).withMessage("Common words cannot be used as password")
    .matches(/[a-z]/).withMessage("Password must consist at least 1 lowercase character.")
    .matches(/[A-Z]/).withMessage("Password must consist at least one uppercase character")
    .matches(/[0-9]/).withMessage("Password must consist at least one numeric character")
    .matches(/[+\-!@#$_]/).withMessage("Password must consist at least one special character")
    .isLength({min:8}).withMessage("Password must be at least 8 characters")
    .not().matches(/[./\\]/).withMessage("Password must not contain . or / or \\")
]