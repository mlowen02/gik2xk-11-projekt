import { Button, Divider, Grid, TextField } from '@mui/material';
import ProductItemSmall from './ProductItemSmall';
import DeleteIcon from '@mui/icons-material/Delete';
function CartListItem({ onEdit, product }) {
	return (
		<>
			<Grid container columnSpacing={2} p={2}>
				<Grid item xs={12} md={6}>
					<ProductItemSmall product={product} />
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						value={product.amount}
						InputProps={{ inputProps: { min: 0 } }}
						id="outlined-basic"
						label="Amount:"
						variant="outlined"
						type="number"
						onChange={(e) =>
							onEdit(1, product.id, e.target.value - product.amount)
						}
						onWheel={(event) => event.target.blur()}
					/>
					<p>Price: {product.amount * product.price}</p>
					<Button
						variant="contained"
						color="primary"
						onClick={(e) => onEdit(1, product.id, -product.amount)}
					>
						<DeleteIcon />
					</Button>
				</Grid>
			</Grid>
			<Divider />
		</>
	);
}

export default CartListItem;
