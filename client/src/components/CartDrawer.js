import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

export default function CartDrawer() {
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

	const list = (anchor) => (
		<Box
			sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500 }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				<div>Produkt1</div>
				<Divider />
				<div>Produkt2</div>
				<Divider />
				<div>Produkt3</div>
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
