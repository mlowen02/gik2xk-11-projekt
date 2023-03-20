import { Grid } from '@mui/material';
import ProductList from '../components/ProductList';

function Home() {
	return (
		<Grid container columnSpacing={2} className="Home">
			<Grid item xs={12} md={12}></Grid>
			<Grid className="Home__grid-item" item xs={12} md={6}>
				<ProductList></ProductList>
			</Grid>
			<Grid className="Home__grid-item" item xs={12} md={6}></Grid>
		</Grid>
	);
}

export default Home;
