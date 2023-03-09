import { Button, Slider } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

function ScoreField({ onSave }) {
	var score = 3;
	return (
		<>
			<Box ml={20} sx={{ width: 300 }}>
				<Slider
					aria-label="Score"
					defaultValue={3}
					valueLabelDisplay="auto"
					step={1}
					marks
					min={1}
					max={5}
					onChange={(e, val) => {
						score = val;
					}}
				/>
			</Box>
			<Button onClick={() => onSave(score)}>Add score</Button>
		</>
	);
}

export default ScoreField;
