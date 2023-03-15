import { TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { create, getOne, remove, update } from '../models/ProductModel';
function ProductEdit() {
	const params = useParams();
	const productId = params.id;
	const emptyProduct = {
		id: 0,
		name: '',
		description: '',
		price: 0,
		imageUrl: '',
		scores: [],
	};
	const [product, setProduct] = useState(emptyProduct);

	useEffect(() => {
		if (!isNaN(productId)) {
			getOne(productId).then((product) => {
				setProduct(product);
			});
		} else {
			setProduct(emptyProduct);
		}
	}, [productId]);

	function onChange(e) {
		const name = e.target.name;
		const value = e.target.value;

		const newProduct = { ...product, [name]: value };
		setProduct(newProduct);
	}
	function onSave() {
		if (product.id === 0) {
			create({ ...product, userId: 2 }).then(() =>
				console.log('skapat inlägg')
			);
		} else {
			update(product).then(() => console.log('uppdaterat inlägg'));
		}
	}

	function onDelete() {
		remove(product.id).then(() => {
			goBack(2);
		});
	}

	const navigate = useNavigate();
	const goBack = (num) => {
		navigate(-num);
	};

	return (
		<form>
			<TextField
				onChange={onChange}
				value={product.name}
				name="name"
				label="Name"
				fullWidth
			/>
			<TextField
				value={product.description}
				onChange={onChange}
				name="description"
				label="Description"
				fullWidth
				multiline
				minRows={7}
			/>
			<TextField
				value={product.price}
				onChange={onChange}
				name="price"
				label="Price"
				fullWidth
			/>
			<TextField
				onChange={onChange}
				value={product.imageUrl || ''}
				name="imageUrl"
				label="URL to image"
				fullWidth
			/>
			<Button onClick={() => goBack(1)} variant="contained" color="primary">
				Cancel
			</Button>
			<Button onClick={onSave} variant="contained" color="primary">
				Save
			</Button>

			{product.id !== 0 && (
				<Button onClick={onDelete} variant="contained" color="primary">
					Delete
				</Button>
			)}
		</form>
	);
}

export default ProductEdit;
