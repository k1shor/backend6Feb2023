const Product = require('../models/productModel')

// to add new product
exports.addProduct = async (req, res) => {
    if(!req.file){
        return res.status(400).json({error:"Product image is required"})
    }
    let productToAdd = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        product_image: req.file.path,
        count_in_stock: req.body.count_in_stock,
        category: req.body.category
    })
    productToAdd = await productToAdd.save()
    if(!productToAdd){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(productToAdd)
}

// to view all products
exports.getAllProducts = async (req, res) => {
    let products = await Product.find().populate('category','category_name')
    // .select([product_name])
    // .sort([['product_name','descending']])
    if(!products){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(products)
}

// to get products of same category
exports.getProductsByCategory = async (req, res)=> {
    let products = await Product.find({category: req.params.categoryid})
    if(!products){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(products)

}

// to get product details
exports.getProductDetails = async (req, res) => {
    let product = await Product.findById(req.params.id).populate('category','category_name')
    if(!product){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(product)
}

// to update product
exports.updateProduct = async (req, res) => {
    let productToUpdate = await Product.findByIdAndUpdate(req.params.id, 
        req.file ? 
        {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        category: req.body.category,
        count_in_stock: req.body.count_in_stock,
        rating: req.body.rating,
        product_image: req.file.path
    }:{
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        category: req.body.category,
        count_in_stock: req.body.count_in_stock,
        rating: req.body.rating, 
    }
    ,{new:true})
    if(!productToUpdate){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(productToUpdate)
}

// delete product
exports.deleteProduct = (req, res) => {
    Product.findByIdAndRemove(req.params.id)
    .then(productToDelete=>{
        if(!productToDelete){
            return res.status(400).json({error:"Product not found"})
        }
        res.send({message:"Product Deleted Successfully"})
    })
    .catch(err=>res.status(400).json({error:err.message}))

}