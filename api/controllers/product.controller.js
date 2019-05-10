const Product = require('../../models/product.model')

module.exports.product = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}
module.exports.getOneProduct= async (req, res, next)=>{
    const id = req.params.apiID;
    const products = await Product.find({_id : id}) // database return back one array
    products.forEach(product =>{
        console.log(product)
    })
    res.json(products)
}


module.exports.postProductApi = async (req, res, next) =>{
    const products = await Product.create(req.body)
    res.json(products)
}

module.exports.deleteProductApi = async (req, res, next) =>{
    const id = req.params.apiID;
    const products = await Product.deleteOne({_id : id})
    res.json(products)
}

module.exports.putProductApi = async (req, res, next) =>{
    const id = {
        _id : req.params.apiID
    };
    
    const updatedPUT = await Product.updateOne(id, req.body)
    res.json(updatedPUT)
}

// module.exports.patchProductApi = async (req, res, next) =>{
//     const id = {
//         _id : req.params.apiID
//     };
    
//     const updatedPATCH = await Product.update(id, req.body)
//     res.json(updatedPATCH)
// }