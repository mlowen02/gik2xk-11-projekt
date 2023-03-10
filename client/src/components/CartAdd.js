import { Button, TextField, Typography } from '@mui/material';

function CartAdd() {
	return (
		<>
			<Typography variant="h6">Add to Cart:</Typography>
			<TextField
				id="outlined-basic"
				label="Amount:"
				variant="outlined"
				type="number"
			/>
			<Button variant="contained">Add product(s)</Button>
		</>
	);
}

export default CartAdd;
