const router = require('express').Router();
const db = require('../models');
const productService = require('../services/productService');
const validate = require('validate.js');

const constraints = {
	email: {
		length: {
			minimum: 4,
			maximum: 200,
			tooShort: '^Email måste vara minst %{count} tecken lång',
			tooLong: '^Email får inte vara längre än %{count} tecken',
		},
		email: {
			message: '^Email är i ett felaktigt format',
		},
	},
	username: {
		length: {
			minimum: 3,
			maximum: 50,
			tooShort: '^Användarnamnet måste vara minst %{count} tecken långt',
			tooLong: '^Användarnamnet får inte vara längre än %{count} tecken',
		},
	},
	imageUrl: {
		url: {
			message: '^Url:en är i felaktigt format',
		},
	},
};

router.get('/:id/posts', (req, res) => {
	const id = req.params.id;
	productService.getByAuthor(id).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.get('/', (req, res) => {
	try {
		db.user.findAll().then((result) => {
			res.send(result);
		});
	} catch {
		res.send(`Unable to get users`);
	}
});

router.post('/', (req, res) => {
	try {
		const invalidData = validate(req.body, constraints);
		console.log(invalidData);
		if (invalidData) {
			res.status(400).send(invalidData);
		} else {
			db.user.create(req.body).then((result) => {
				res.send(result);
			});
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

router.put('/', (req, res) => {
	const invalidData = validate(req.body, constraints);
	const id = req.body.id;
	if (invalidData || !id) {
		res.status(400).json(invalidData || 'user id not defined');
	} else {
		db.user.update(req.body, { where: { id: req.body.id } }).then(() => {
			db.user.findOne({ where: { id: req.body.id } }).then((result) => {
				res.send(result);
			});
		});
	}
});

router.delete('/', (req, res) => {
	const id = req.body.id;
	if (!id) {
		res.status(400).send('Id är obligatoriskt');
	} else {
		db.user.destroy({ where: { id: req.body.id } }).then(() => {
			res.send(`user with id ${req.body.id} has been deleted`);
		});
	}
});

module.exports = router;
