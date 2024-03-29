import { Button, TextField, Typography } from '@mui/material';

function CartAdd({ onAdd }) {
	let qty = 1;
	return (
		<>
			<Typography variant="h6">Add to Cart:</Typography>
			<TextField
				InputProps={{ inputProps: { min: 0 } }}
				defaultValue={1}
				id="outlined-basic"
				label="Amount:"
				variant="outlined"
				type="number"
				onChange={(e) => {
					qty = e.target.value;
				}}
			/>
			<Button variant="contained" onClick={() => onAdd(1, qty)}>
				Add product(s)
			</Button>
		</>
	);
}

export default CartAdd;
