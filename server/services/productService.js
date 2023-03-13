const db = require('../models');
const validate = require('validate.js');
const {
	createResponseError,
	createResponseMessage,
	createResponseSuccess,
} = require('../helpers/responseHelper');
const constraints = {
	name: {
		length: {
			minimum: 3,
			maximum: 100,
			tooShort: '^The name must be at least %{count} characters long',
			tooLong: "'The name can not be longer than %{count} characters",
		},
	},
};

async function getById(id) {
	if (!id) {
		return createResponseError(422, `Id not defined`);
	}
	try {
		const product = await db.product.findOne({
			where: { id },
			include: [db.score],
		});
		return createResponseSuccess(product);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function getAll() {
	try {
		const allproducts = await db.product.findAll({
			include: [db.score],
		});
		return createResponseSuccess(allproducts);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function getScores(id) {
	const product = await getById(id);
	try {
		const productScores = product.data.scores;
		if (!productScores) {
			return createResponseError(404, 'no scores found for product');
		} else {
			return createResponseSuccess(productScores);
		}
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function addScore(id, score) {
	if (!id) {
		return createResponseError(422, 'Id of product not defined');
	}
	try {
		score.productId = id;
		const newScore = await db.score.create(score);
		return createResponseSuccess(newScore);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function create(product) {
	console.log(product);
	const invalidData = validate(product, constraints);
	if (invalidData) {
		return createResponseError(422, invalidData);
	}
	try {
		const newProduct = await db.product.create(product);

		return createResponseSuccess(newProduct);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function update(id, product) {
	const invalidData = validate(product, constraints);
	if (!id) {
		return createResponseError(422, 'Id not defined');
	}
	if (invalidData) {
		return createResponseError(422, invalidData);
	}
	try {
		const existingProduct = await db.product.findOne({ where: { id } });
		if (!existingProduct) {
			return createResponseError(404, `product with id ${id} not found`);
		}
		await db.product.update(product, { where: { id } });

		return createResponseMessage(200, `product with id ${id} has been updated`);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function destroy(id) {
	if (!id) {
		return createResponseError(422, 'Id not defined');
	}
	try {
		await db.product.destroy({ where: { id } });
		return createResponseMessage(200, `product with id ${id} has been deleted`);
	} catch {
		return createResponseError(error.status, error.message);
	}
}

module.exports = {
	getAll,
	create,
	update,
	destroy,
	getById,
	addScore,
	getScores,
};
