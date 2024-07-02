// Tableau pour ranger les articles
let cartItems = [];

// Fonction pour ajouter un article au panier
exports.addToCart = (req, res) => {
    const { id, image, name, price, quantity } = req.body;
    cartItems.push({ id, image, name, price, quantity });
    res.redirect('/cart'); 
};

// Fonction pour afficher un panier
exports.displayCart = (req, res) => {
    res.render('pages/cart', { cartItems });
};

exports.removeFromCart = (req, res) => {
    const { id } = req.body;
    cartItems = cartItems.filter(item => item.id !== id);
    res.redirect('/cart');
};
