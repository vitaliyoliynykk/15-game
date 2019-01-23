import './index.css';

const getXY = (source) => {
	const y = source.findIndex(arr => arr.includes(null));
	const x = source[y].findIndex(x => x === null);
	return { y, x };
};

const fifteen = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, null, 15]
];

const xy = getXY(fifteen);

const shuffleState = (state) => {
	const suffleArr = (inputArr) => {
		const arr = [...inputArr];
		for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
		return arr;
	}
	const flattenArr = state.reduce((acc, val) => {
		return [...acc, ...val]
	}, []);
	const shuffledArr = suffleArr(flattenArr);
	return [
		shuffledArr.slice(0,4),
		shuffledArr.slice(4,8),
		shuffledArr.slice(8,12),
		shuffledArr.slice(12,16),
	]
}

const renderRow = (arr) => `<div class='square'>${arr.join('</div><div class=\'square\'>')}</div>`;

const renderRows = (arr) => {
	return arr.reduce((acc, current) => {
		return acc + renderRow(current);
	}, '');
};

const renderGame = (shuffledArray, domNode = document.getElementById('app')) => {
	const rows = renderRows(shuffledArray).replace(
		'<div class=\'square\'></div>',
		'<div class=\'square empty\'></div>'
	);
	domNode.innerHTML = rows;
};

let state = shuffleState(fifteen);
renderGame(state);

const winingState = (currentState) => {
	let c = 1;
	currentState.forEach((arr) => {
		arr.forEach((e) => {
			if(e === c){
				c++;
			}
		})
	});
	if(c >= 14){
		return true;
	}
	else{
		return false;
	}
}



document.addEventListener('keydown', (e) => {
	const xyOfEmptyCell = getXY(state);
		if (e.keyCode === 38) {
			// up arrow
			if (xyOfEmptyCell.y === 3) return; // figure out why we have this checking
			const nextY = xyOfEmptyCell.y + 1;
			const nextX = xyOfEmptyCell.x;
			state[xyOfEmptyCell.y][xyOfEmptyCell.x] = state[nextY][nextX];
			state[nextY][nextX] = null;
			renderGame(state);
		}
		if (e.keyCode === 40) {
			// down
			if (xyOfEmptyCell.y === 0) return; 
			const nextY = xyOfEmptyCell.y - 1;
			const nextX = xyOfEmptyCell.x;
			state[xyOfEmptyCell.y][xyOfEmptyCell.x] = state[nextY][nextX];
			state[nextY][nextX] = null;
			renderGame(state);
		}
		if (e.keyCode === 39) {
			// rigth
			if (xyOfEmptyCell.x === 0) return; 
			const nextY = xyOfEmptyCell.y;
			const nextX = xyOfEmptyCell.x - 1;
			state[xyOfEmptyCell.y][xyOfEmptyCell.x] = state[nextY][nextX];
			state[nextY][nextX] = null;
			renderGame(state);
		}

		if (e.keyCode === 37) {
			// left
			if (xyOfEmptyCell.x === 3) return; 
			const nextY = xyOfEmptyCell.y;
			const nextX = xyOfEmptyCell.x + 1;
			state[xyOfEmptyCell.y][xyOfEmptyCell.x] = state[nextY][nextX];
			state[nextY][nextX] = null;
			renderGame(state);
		}

		if(winingState(state) === true){
			alert('You won!');
			state = shuffleState(fifteen);
			renderGame(state);
		}
});

