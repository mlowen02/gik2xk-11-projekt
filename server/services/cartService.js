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
		if (!cart) {
			return createResponseError(404, 'Cart not found');
		}
		return createResponseSuccess(_cleanCartObj(cart));
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function addProduct(cartId, productId, amount) {
	if (!cartId || !productId || !amount) {
		return createResponseError(422, 'Request incomplete');
	}
	try {
		const existingCart = await db.cart.findOne({ where: { id: cartId } });
		const existingProduct = await db.product.findOne({
			where: { id: productId },
		});

		if (!existingCart) {
			return createResponseError(422, 'Invalid cart id');
		}
		if (!existingProduct) {
			return createResponseError(422, 'Invalid product id');
		}

		let existingCartProduct = await db.cartProduct.findOne({
			where: { cartId, productId },
		});
		if (existingCartProduct) {
			existingCartProduct.amount += +amount;
		} else {
			await existingCart.addProduct(existingProduct);
			existingCartProduct = await db.cartProduct.findOne({
				where: { cartId, productId },
			});
			existingCartProduct.amount = amount;
		}

		existingCart.priceTotal += existingProduct.price * amount;
		await existingCartProduct.save();
		await existingCart.save();
		return createResponseSuccess(existingCartProduct);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function removeProduct(cartId, productId, amount) {
	if (!cartId || !productId || !amount) {
		return createResponseError(422, 'Request incomplete');
	}
	try {
		const existingCart = await db.cart.findOne({
			where: { id: cartId },
			include: [db.product],
		});
		const existingProduct = await db.product.findOne({
			where: { id: productId },
		});
		if (!existingCart) {
			return createResponseError(422, 'Invalid cart id');
		}

		let existingCartProduct = await db.cartProduct.findOne({
			where: { cartId, productId },
		});
		if (!existingCartProduct) {
			return createResponseError(422, 'Item not in cart');
		}
		if (existingCartProduct.amount <= +amount) {
			existingCart.priceTotal =
				existingCart.priceTotal -
				existingCartProduct.amount * existingProduct.price;
			await existingCartProduct.destroy();
		} else {
			existingCartProduct.amount -= +amount;
			existingCart.priceTotal -= amount * existingProduct.price;
		}
		await existingCartProduct.save();
		await existingCart.save();
		return createResponseSuccess(existingCartProduct);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function create(cart, id) {
	try {
		cart.userId = id;
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
			return createResponseError(404, `cart with id ${id} not found`);
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

function _cleanCartObj(cart) {
	const cartObj = {
		id: cart.id,
		priceTotal: cart.priceTotal,
		createdAt: cart.createdAt,
	};
	if (cart.products) {
		cartObj.products = [];
		cart.products.map((product) => {
			return cartObj.products.push({
				id: product.id,
				name: product.name,
				description: product.description,
				imageUrl: product.imageUrl,
				price: product.price,
				amount: product.cartProduct.amount,
			});
		});
	}
	return cartObj;
}

module.exports = {
	getById,
	create,
	update,
	destroy,
	addProduct,
	removeProduct,
};
