const router = require('express').Router();
const cartService = require('../services/cartService');

router.get('/:id', (req, res) => {
	const id = req.params.id;
	cartService.getById(id).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.post('/:cartId/addProduct/:productId', (req, res) => {
	const qty = req.body.amount;
	const productId = req.params.productId;
	const cartId = req.params.cartId;
	cartService.addProduct(cartId, productId, qty).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.post('/', (req, res) => {
	cartService.create(req.body).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.put('/', (req, res) => {
	const post = req.body;
	const id = post.id;
	cartService.update(id, post).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.delete('/', (req, res) => {
	const id = req.body.id;
	cartService.destroy(id).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.delete('/:cartId/removeProduct/:productId', (req, res) => {
	const qty = req.body.amount;
	const productId = req.params.productId;
	const cartId = req.params.cartId;
	cartService.removeProduct(cartId, productId, qty).then((result) => {
		res.status(result.status).json(result.data);
	});
});

module.exports = router;
