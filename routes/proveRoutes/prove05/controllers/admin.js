//const mongodb = require('mongodb');
const Product = require('../models/product');
const { validationResult } = require('express-validator');// /check
//const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
    /*if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }*/
    res.render('pages/proveAssignments/prove05/admin/edit-product', {
        pageTitle: 'Admin Add Product',
        path: '/admin/add-product',
        editing: false,
        hasError: false,
        errorMessage: null,
        validationErrors: []
        //isAuthenticated: req.session.isLoggedIn//req.isLoggedIn
    });
};


exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('pages/proveAssignments/prove05/admin/edit-product', {
            pageTitle: 'Admin Add Product',
            path: '/admin/edit-product',
            editing: false,
            hasError: true,
            product: {
                title: title,
                imageUrl: imageUrl,
                price: price,
                description: description
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
            //isAuthenticated : req.session.isLoggedIn
        });
    }

    const product = new Product({
        // _id: new mongoose.Types.ObjectId('609b36fe6b576700045f16f6'),
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user//req.session.user//req.user
    });
    //console.log(req.user);
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.redirect('products');//admin/products?
        })
        .catch(err => {
            // return res.status(500).render('admin/edit-product', {
            //   pageTitle: 'Add Product',
            //   path: '/admin/add-product',
            //   editing: false,
            //   hasError: true,
            //   product: {
            //     title: title,
            //     imageUrl: imageUrl,
            //     price: price,
            //     description: description
            //   },
            //   errorMessage: 'Database operation failed, please try again.',
            //   validationErrors: []
            // });
            //console.log(err);
            //res.redirect('/500');
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('products');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            //throw new Error("Dummy");
            if (!product) {
                return res.redirect('products');
            }
            res.render('pages/proveAssignments/prove05/admin/edit-product', {
                pageTitle: "Admin Edit Product",
                path: '/admin/edit-product',
                editing: editMode,
                product: product,
                hasError: false,
                errorMessage: null,
                validationErrors: []
                //isAuthenticated: req.session.isLoggedIn//req.isLoggedIn
            });
        })
        .catch(err => {
            //res.redirect('/500');
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('pages/proveAssignments/prove05/admin/edit-product', {
            pageTitle: 'Admin Edit Product',
            path: '/admin/edit-product',
            editing: true,
            hasError: true,
            product: {
                title: updatedTitle,
                imageUrl: updatedImageUrl,
                price: updatedPrice,
                description: updatedDesc,
                _id: prodId
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
            //isAuthenticated : req.session.isLoggedIn
        });
    }
    Product.findById(prodId)
        .then(product => {
            if (product.userId.toString() !== req.user._id.toString()
            ) {
                return res.redirect('products');
            }
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.imageUrl = updatedImageUrl;

            return product
                .save()
                .then(result => {
                    console.log('UPDATED PRODUCT!');
                    res.redirect('products');//admin/products
                });
        })

        .catch(err => //console.log(err));
        {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
};

exports.getProducts = (req, res, next) => {
    Product.find({ userId: req.user._id })
        .then(products => {
            console.log(products);
            res.render('pages/proveAssignments/prove05/admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
                //isAuthenticated: req.session.isLoggedIn//req.isLoggedIn
            });
        })
        .catch(err => //console.log(err));
        {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    //Product.findByIdAndRemove(prodId)
    Product.deleteOne({ _id: prodId, userId: req.user._id })
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.redirect('products');
        })
        .catch(err => //console.log(err));
        {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};