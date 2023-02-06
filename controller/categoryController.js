const Category = require('../models/categoryModel')


// add category
exports.addCategory = async (req, res) => {
    // check if category already exists
    let category = await Category.findOne({ category_name: req.body.category_name })
    if (category) {
        return res.status(400).json({ error: "Category already exists." })
    }
    // if category do not exist, add new category
    let categoryToAdd = new Category({
        category_name: req.body.category_name
    })
    categoryToAdd = await categoryToAdd.save()
    if (!categoryToAdd) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    // else{
    res.send(categoryToAdd)
    // }
}

// to get all categories
exports.getAllCategories = async (req, res) => {
    let categories = await Category.find()
    if (!categories) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(categories)
}

// category details
exports.getCategoryDetails = async (req, res) => {
    let category = await Category.findById(req.params.id)
    if (!category) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(category)
}

// category update
exports.updateCategory = async (req, res) => {
    let categoryToUpdate = await Category.findByIdAndUpdate(
        req.params.id,
        {
            category_name: req.body.category_name
        }
        ,
        { new: true })

    if(!categoryToUpdate){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(categoryToUpdate)
}

// delete category
exports.deleteCategory = (req, res) => {
    Category.findByIdAndRemove(req.params.id)
    .then(categoryToDelete=>{
        if(!categoryToDelete){
            return res.status(400).json({error:"Category not found"})
        }
        res.send({message:"Category Deleted Successfully"})
    })
    .catch(err=>res.status(400).json({error:err.message}))

}


/*
Model.find() -> returns all data/document in array
Model.find(filter) -> returns all document in array that matches the filter
Model.findOne(filter) -> returns first document that matches the filter in object
Model.findById(id) -> returns document that has the id
Model.findByIdAndUpdate()
Model.findByIdAndDelete()*/


/*
req.body -> to get values from forms
req.params -> to get values from url
req.query -> to get values from url using variables
*/

/*
res.status(400).json({key:value})
400 - bad request
200 - Ok

res.send(obj)
*/
// to get all categories using promise (.then )
exports.categoryList = (req, res) => {
    Category.find()
        .then(categories => {
            if (!categories) {
                return res.status(400).json({ error: "Something went wrong" })
            }
            else {
                res.send(categories)
            }
        })
        .catch(err => res.status(400).json({ error: err.msg }))
}