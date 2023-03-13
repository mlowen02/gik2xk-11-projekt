const router = require('express').Router();
const productService = require('../services/productService');

router.get('/:id', (req, res) => {
	const id = req.params.id;
	productService.getById(id).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.get('/:id/getScores', (req, res) => {
	const id = req.params.id;
	productService.getScores(id).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.get('/', (req, res) => {
	productService.getAll().then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.post('/', (req, res) => {
	productService.create(req.body).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.post('/:id/addScore', (req, res) => {
	const score = req.body;
	const id = req.params.id;
	console.log(score);
	productService.addScore(id, score).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.put('/', (req, res) => {
	const post = req.body;
	const id = post.id;
	productService.update(id, post).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.delete('/', (req, res) => {
	const id = req.body.id;
	productService.destroy(id).then((result) => {
		res.status(result.status).json(result.data);
	});
});

module.exports = router;
