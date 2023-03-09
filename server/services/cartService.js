const db = require('../models');
const validate = require('validate.js');
const {
	createResponseError,
	createResponseMessage,
	createResponseSuccess,
} = require('../helpers/responseHelper');

async function getById(id) {
	if (!id) {
		return createResponseError(422, `cart id not defined`);
	}
	try {
		const cart = await db.cart.findOne({
			where: { id },
			include: [db.product],
		});
		return createResponseSuccess(cart);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function addProduct(cartId, productId) {
	if (!cartId || !productId) {
		return createResponseError(422, 'Id not defined');
	}
	try {
		const existingCart = await db.cart.findOne({ where: { id: cartId } });
		const existingProduct = await db.product.findOne({
			where: { id: productId },
		});

		const existingCartProduct = await db.cartProduct.findOne({
			where: { cartId, productId },
		});
		console.log(existingCartProduct);
		if (existingCartProduct) {
			existingCartProduct.amount += 1;
			await db.cartProduct.update(existingCartProduct, {
				where: { id: existingCartProduct.id },
			});
		} else {
			await existingCart.addProduct(existingProduct);
		}
		existingCart.priceTotal += existingProduct.price;
		await db.cart.update(existingCart, { where: { id: cartId } });

		return createResponseSuccess(existingCartProduct);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function create(cart) {
	cart.priceTotal = 0;
	try {
		const newCart = await db.cart.create(cart);

		return createResponseSuccess(newCart);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function update(id, cart) {
	if (!id) {
		return createResponseError(422, 'cart id not defined');
	}

	try {
		const existingCart = await db.cart.findOne({ where: { id } });
		if (!existingCart) {
			return createResponseError(404, `product with id ${id} not found`);
		}
		await db.cart.update(cart, { where: { id } });

		return createResponseMessage(200, `cart with id ${id} has been updated`);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function destroy(id) {
	if (!id) {
		return createResponseError(422, 'Id not defined');
	}
	try {
		await db.cart.destroy({ where: { id } });
		return createResponseMessage(200, `cart with id ${id} has been deleted`);
	} catch {
		return createResponseError(error.status, error.message);
	}
}

module.exports = {
	getById,
	create,
	update,
	destroy,
	addProduct,
};
