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

}


module.exports.postProductApi = async (req, res, next) =>{
    await Product.create(req.body)
}

module.exports.deleteProductApi = async (req, res, next) =>{
    const id = req.params.apiID;
    await Product.deleteOne({_id : id})
}

module.exports.putProductApi = async (req, res, next) =>{
    const id = {
        _id : req.params.apiID
    };
    
    const updatedPUT = await Product.update(id, req.body)
    res.json(updatedPUT)
}

module.exports.patchProductApi = async (req, res, next) =>{
    const id = {
        _id : req.params.apiID
    };
    
    const updatedPATCH = await Product.update(id, req.body)
    res.json(updatedPATCH)
}