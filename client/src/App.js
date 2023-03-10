import './App.css';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Route, Routes, Link } from 'react-router-dom';
import Products from './views/Products';
import ProductEdit from './views/ProductEdit';
import ProductDetail from './views/ProductDetail';
import Home from './views/Home';
import CartDrawer from './components/CartDrawer';

function App() {
	return (
		<div className="App">
			<h1>Ecom store</h1>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
							<Link to="/">Home</Link>
						</Typography>
						<Typography variant="h6" component="div" sx={{ flexGrow: 0.5 }}>
							<Link to="/Products">All products</Link>
						</Typography>
						<Typography variant="h6" component="div" sx={{ flexGrow: 0.5 }}>
							<Link to="/Products/new">Create product</Link>
						</Typography>
						<CartDrawer />
					</Toolbar>
				</AppBar>
			</Box>
			<div>
				<Routes>
					<Route exact path="/" element={<Home></Home>}></Route>
					<Route exact path="/Products" element={<Products></Products>}></Route>
					<Route
						exact
						path="/users/:id/Products"
						element={<Products></Products>}
					></Route>
					<Route
						exact
						path="/tags/:name/Products"
						element={<Products></Products>}
					></Route>
					<Route
						exact
						path="/Products/new"
						element={<ProductEdit></ProductEdit>}
					></Route>
					<Route
						exact
						path="/Products/:id/edit"
						element={<ProductEdit></ProductEdit>}
					></Route>
					<Route
						exact
						path="/Products/:id"
						element={<ProductDetail></ProductDetail>}
					></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
