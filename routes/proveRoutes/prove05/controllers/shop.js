//const products = [];
const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            console.log(products);
            res.render('pages/proveAssignments/prove05/shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
                //isAuthenticated: req.session.isLoggedIn//req.isLoggedIn
            });
        })
        .catch(err => {
            //console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            //console.log(product);
            res.render('pages/proveAssignments/prove05/shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products',
                //isAuthenticated: req.session.isLoggedIn//req.isLoggedIn
            });
        })
        .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('pages/proveAssignments/prove05/shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
                ///isAuthenticated: req.session.isLoggedIn//req.isLoggedIn
            });
        })
        .catch(err => {
            //console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getCart = (req, res, next) => {
    req.user
        //req.session.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            //console.log(user.cart.items);
            const products = user.cart.items;
            res.render('pages/proveAssignments/prove05/shop/cart', {
                path: '/cart',
                pageTitle: 'Your cart',
                products: products,
                //isAuthenticated: req.session.isLoggedIn//req.isLoggedIn
            });
        })
        .catch(err => //console.log(err));
        {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    //console.log(prodId);
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            res.redirect('./cart');
        })
        .catch(err => {
            //console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user//req.session.user//
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/proveAssignments/prove05/cart');//pages/  need shop?
        })
        .catch(err => console.log(err));
};
exports.postOrder = (req, res, next) => {
    req.user//req.session.user//req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            console.log()
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: { ...i.productId._doc } };
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user
                },
                products: products

            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('orders');//check path ?proveAssignments/prove04/shop/orders
        })
        .catch(err => //console.log(err));
        {const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
};


exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render('pages/proveAssignments/prove05/shop/orders', {//pages  //pages/proveAssignments/prove04/shop/ or shop/orders
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders,
                //isAuthenticated: req.session.isLoggedIn//req.isLoggedIn
            });
        })
        .catch(err => //console.log(err));
        {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });

};
    //const products = Product.fetchAll();
    //console.log('another in the middleware');
    //res.send('<h1>Hello from Express!</h1>');
    //console.log(adminData.products);
    //res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); 
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    //const products = adminData.products;
    //res.render('shop', {prods: products, pageTitle: 'Shop', path:'/'});
