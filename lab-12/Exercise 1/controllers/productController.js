let products = [
    { id: 1, name: 'Laptop', price: 50000 },
    { id: 2, name: 'Phone', price: 30000 }
];

exports.getAllProducts = (req, res) => {
    res.json(products);
};

exports.getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).send('Product not found');
    }

    res.json(product);
};

exports.createProduct = (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).send('Product not found');
    }

    product.name = req.body.name;
    product.price = req.body.price;

    res.json(product);
};

exports.deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).send('Product not found');
    }

    products.splice(index, 1);
    res.send('Product deleted successfully');
};