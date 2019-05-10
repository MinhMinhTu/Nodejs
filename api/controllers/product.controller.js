const Product = require('../../models/product.model')

//get all product with two a way
module.exports.product = async (req, res) => {

    // a way 1
    // const products = await Product.find()
    // res.json(products)

    // a way 2
    Product.find()
            .then(products =>{
                res.send(products)
            }).catch(err => {
                res.status(404).send({
                    message : "not find Products" || err.message
                })
            })
}

//get one product with two a way
module.exports.getOneProduct= async (req, res, next)=>{

    // a way 1
    // const id = req.params.apiID;
    // const products = await Product.find({_id : id}) // database return back one array
    // products.forEach(product =>{
    //     console.log(product)
    // })
    // res.json(products)

    // a way 2
    Product.findById(req.params.apiID)
            .then(product => {
                if(!product){
                    res.status(404).send({
                        message : `Not found product from ${req.params.apiID}`
                    })
                }
                res.status(200).send(product)
            }).catch(err=>{
                if(err.kind === 'ObjectId'){
                    return res.status(403).send({
                        message : `Not found product from ${req.params.apiID}`
                    })
                }
                return res.status(500).send({
                    message : `Not found product from ${req.params.apiID}`
                })
            })
}

//create one product with two a way
module.exports.postProductApi = async (req, res, next) =>{
    if(!req.body){
        return res.status(400).send({
            message : "content request on server is empty"
        })
    }
    // a way 1
    // const products = await Product.create(req.body)
    // res.json(products)
    const product = new Product({
        name : req.body.name,
        image :  req.body.image,
        description :  req.body.description 
    })

    // a way 2
    product.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message : err
                })
            })
    
}

//delete one product with two a way
module.exports.deleteProductApi = async (req, res, next) =>{

    // a way 1
    // const id = req.params.apiID;
    // const products = await Product.deleteOne({_id : id})
    // res.json(products)

    // a way 2
    Product.findByIdAndRemove(req.params.apiID)
            .then(product =>{
                if(!product){
                    res.status(404).send({
                        message : `Not found product from ${req.params.apiID}`
                    })
                }
                res.status(200).send({
                    message : "Product delete is successfully!"
                })
            }).catch(err=>{
                if(err.kind === 'ObjectId'){
                    return res.status(403).send({
                        message : `Not found product from ${req.params.apiID}`
                    })
                }
                return res.status(500).send({
                    message : `Cannot Delete product from ${req.params.apiID}`
                })
            })
}

//update one product with two way
module.exports.putProductApi = async (req, res, next) =>{

    // a way 1
    // const id = {
    //     _id : req.params.apiID
    // };
    // const updatedPUT = await Product.updateOne(id, req.body)
    // res.json(updatedPUT)

    // a way 2
    if(!req.body.name){
        return res.status(400).send({
            message : "Nothing to Update"
        })
    }
    Product.findByIdAndUpdate(req.params.apiID, {
        name : req.body.name,
        image : req.body.image,
        description : req.body.description
    },{new : true})
                .then(product => {
                    if(!product){
                        return res.status(404).send({
                            message : "Not found " || err.message
                        })
                    }
                    return res.status(200).send({
                        message : "Update product is successfully!"
                    })
                }).catch(err => {
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Product not found with id " + req.params.noteId
                        });                
                    }
                    return res.status(500).send({
                        message: "Error updating Product with id " + req.params.noteId
                    });
                });
}
