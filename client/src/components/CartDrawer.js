import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { addToCart, getCartById, removeFromCart } from '../models/CartModel';
import ProductItemSmall from './ProductItemSmall';
import { Button, Grid, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartDrawer() {
	const [cart, setCart] = React.useState({});
	React.useEffect(() => {
		getCartById(1).then((cart) => setCart(cart));
	}, []);
	const [state, setState] = React.useState({
		right: false,
	});
	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};
	function editItemInCart(cartId, productId, qty) {
		if (qty < 0) {
			removeFromCart(cartId, productId, -qty).then((result) =>
				console.log(result, 'removed')
			);
		} else {
			addToCart(cartId, productId, qty).then((result) => console.log(result));
		}
	}

	const list = (anchor) => (
		<Box
			sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500 }}
			role="presentation"
			onClick={toggleDrawer(anchor, true)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{cart?.products &&
					cart.products.map((product) => {
						return (
							<li key={`cartItemId_${product.id}`}>
								<Grid container columnSpacing={2} p={2}>
									<Grid item xs={12} md={6}>
										<ProductItemSmall product={product} />
									</Grid>
									<Grid item xs={12} md={6}>
										<TextField
											InputProps={{ inputProps: { min: 0 } }}
											defaultValue={product.cartProduct.amount}
											id="outlined-basic"
											label="Amount:"
											variant="outlined"
											type="number"
											onChange={(e) => {
												editItemInCart(
													1,
													product.id,
													e.target.value - product.cartProduct.amount
												);
											}}
										/>
										<p>Price: {product.cartProduct.amount * product.price}</p>
										<Button
											variant="contained"
											color="primary"
											onClick={() => {}}
										>
											<DeleteIcon />
										</Button>
									</Grid>
								</Grid>
								<Divider />
							</li>
						);
					})}
				{cart?.products && <p>Total: {cart.priceTotal}</p>}
			</List>
		</Box>
	);

	return (
		<div>
			{['right'].map((anchor) => (
				<React.Fragment key={anchor}>
					<IconButton onClick={toggleDrawer(anchor, true)}>
						<ShoppingCartIcon />
					</IconButton>
					<Drawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
					>
						{list(anchor)}
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
}
