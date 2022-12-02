export default function Breakout() {
	
	const grid = document.querySelector('.body__breakout');
	const user = document.createElement('div');
	const ball = document.createElement('div');

	const blockWidth = 100;
	const blockHeight = 20;
	const boardWidth = 700;
	const boardHeight = 600;
	const ballDiameter = 20;
	const userStartPosition = [280, 20]
	let ballStartPosition = [330, 40];
	let userCurrentPosition = userStartPosition;
	let ballCurrentPosition = ballStartPosition;
	let timerId;
	let xDirection = 2;
	let yDirection = 2;
	
	window.addEventListener('keydown', handleWindowKeydown);
	document.addEventListener('keydown', handledocumentKeydown);
		
	class Block {
		constructor(xAxis, yAxis) {
			this.bottomLeft = [xAxis, yAxis];
			this.bottomRight = [xAxis + blockWidth, yAxis];
			this.topLeft = [xAxis, yAxis + blockHeight];
			this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
		} 
	}
	
	// Generate Blocks and position. Adding levels is possible.
	const blocks = [
		new Block(20, 550),
		new Block(130, 550),
		new Block(240, 550),
		new Block(350, 550),
		new Block(460, 550),
		new Block(570, 550),
		
		new Block(20, 500),
		new Block(130, 500),
		new Block(240, 500),
		new Block(350, 500),
		new Block(460, 500),
		new Block(570, 500),

		new Block(20, 450),
		new Block(130, 450),
		new Block(240, 450),
		new Block(350, 450),
		new Block(460, 450),
		new Block(570, 450),

	]

	function handleWindowKeydown(event) {
		moveUser(event);
	}
	
	function handledocumentKeydown(event) {
		startTheGame(event);
	}
	
	function startTheGame(event) {
		if (event.key === 'Enter') {
			timerId = setInterval(moveBall, 15);
		}
	}
	
	function moveUser(event) {
		switch(event.key) {
			case 'ArrowLeft':
				if (userCurrentPosition[0] > 0) {
					userCurrentPosition[0] -= 10;
					renderUser();
				}
				break;
				
				case 'ArrowRight':
					if (userCurrentPosition[0] < boardWidth - blockWidth) {
						userCurrentPosition[0] += 10;
						renderUser();
					}
					break;
				}
			}
			
			function renderUser() {
				user.classList.add('user');
				user.style.left = userCurrentPosition[0] + 'px';
				user.style.bottom = userCurrentPosition[1] + 'px';
				grid.appendChild(user);
			}
			
	function renderBall() {
		ball.classList.add('ball');
		ball.style.left = ballCurrentPosition[0] + 'px';
		ball.style.bottom = ballCurrentPosition[1] + 'px';
		grid.appendChild(ball);
	}
	
	function renderBlocks() {
		for (let index = 0; index < blocks.length; index += 1) {
			const block = document.createElement('div');
			block.classList.add('block');
			block.style.left = blocks[index].bottomLeft[0] + 'px';
			block.style.bottom = blocks[index].bottomLeft[1] + 'px';
			grid.appendChild(block);
		}
	}
	
	function moveBall() {
		ballCurrentPosition[0] += xDirection;
		ballCurrentPosition[1] += yDirection;
		renderBall();
		checkForCollisions();
	}
	
	function checkForCollisions() {
		//Check for collisions with the wall
		if (ballCurrentPosition[0] >= boardWidth - ballDiameter ||
			ballCurrentPosition[1] >= boardHeight - ballDiameter ||
			ballCurrentPosition[0] <= 0) {
				changeDirection();
			}
			
			//check for game over
			if (ballCurrentPosition[1] <= 0) {
				clearInterval(timerId);
			}
		}
		
		function changeDirection() {
			if (xDirection === 2 && yDirection === 2) {
				xDirection = -2;
				return;
			}
			
			if (xDirection === -2 && yDirection === 2) {
				yDirection = -2;
				return;
			}
			
			if (xDirection === -2 && yDirection === -2) {
				xDirection = 2;
				return;
			}
		}
				
		renderUser();
		renderBall();
		renderBlocks();
		moveBall();
	}