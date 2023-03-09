const router = require('express').Router();
const db = require('../models');
const productService = require('../services/productService');
//const validate = require('validate.js');

router.get('/:name/posts', (req, res) => {
	const name = req.params.name;
	productService.getByScore(name).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.get('/', (req, res) => {
	try {
		db.score.findAll().then((result) => {
			res.send(result);
		});
	} catch {
		res.send(`Unable to get scores`);
	}
});

router.delete('/', (req, res) => {
	const id = req.body.id;
	if (!id) {
		res.status(400).send('Id är onligatoriskt');
	} else {
		db.score.destroy({ where: { id: req.body.id } }).then(() => {
			res.send(`score with id ${req.body.id} has been deleted`);
		});
	}
});

module.exports = router;
