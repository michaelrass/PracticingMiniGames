export default function Whackamole() {
	const bodyWhackamole = document.querySelector('.body-whackamole');
	const whackamoleSection = document.querySelector('.body-whackamole__whackamole');
	const squares = document.querySelectorAll('.whackamole-grid-container__square');
	const timeLeftContainer = document.querySelector('.top-container__time-left');
	const timeLeftDisplay = document.querySelector('.time-left__value');
	const scoreContainer = document.querySelector('.top-container__your-score');
	const scoreDisplay = document.querySelector('.your-score__value');
	const buttonPlayAgain = document.querySelector('.whackamole__play-again--hidden');
	const scoreDisplayFinal = document.querySelector('.top-container__your-score-big--hidden');
	const buttonStart = document.querySelector('.whackamole__button-start');
	
	let yourScore = 0;
	let timeLeft = 60;
	let hitPosition;
	let timerId = null;
	let countdownTimerId = null;
	let squareId;
	let previousMolePosition;
	let currentClickedPosition;
	
	squares.forEach((square, index) => {
		square.addEventListener('click', () => {
			squareId = square.id;
			currentClickedPosition = index;
			handleSquareClick();
		});
	})
	
	if (bodyWhackamole) {
		buttonPlayAgain.addEventListener('click', handleButtonPlayAgainClick);
		buttonStart.addEventListener('click', handleButtonStartClick);
	}
	
	function handleButtonStartClick() {
		startTheGame();
	}

	function handleSquareClick() {
		if (squareId === hitPosition) {
			yourScore += 1;
			scoreDisplay.innerText = yourScore;
			hitPosition = null;
			randomSquareFunction();
		}	
	}

	function startTheGame() {
		buttonStart.classList.add('whackamole__button-start--hidden');
		whackamoleSection.classList.remove('body-whackamole__whackamole--hidden');

		timeLeft = 61;
		yourScore = 0;
		hitPosition = null;
		countdownTimerId = setInterval(countdown, 1000);
		
		scoreDisplay.innerText = yourScore;
		timeLeftDisplay.innerText = timeLeft;
		
		moveMoleInitialFunction();
		countdown();
		randomSquareFunction();
	}
	
	function handleButtonPlayAgainClick() {
		resetAndPlayAgain();
	}

	function moveMoleInitialFunction() {
		timerId = setInterval(randomSquareFunction, 1000);
	}
	
	function randomSquareFunction(index) {
		clearInterval(timerId);
		timerId = setInterval(randomSquareFunction, 1000);

		squares.forEach(square => {
			square.classList.remove('square__mole');
		})
		
		let randomSquare = squares[Math.floor(Math.random() * 9)];
		randomSquare.classList.add('square__mole');
		hitPosition = randomSquare.id;

		if (hitPosition === previousMolePosition) {
			randomSquareFunction();
		}
		
		previousMolePosition = randomSquare.id;
	}

	
	function countdown() {
		timeLeft -= 1;
		timeLeftDisplay.innerText = timeLeft;
		
		if (timeLeft === 0) {
			timeLeft = 0;
			clearInterval(countdownTimerId);
			buttonPlayAgain.classList.add('whackamole__play-again--active');
			clearInterval(timerId);
			scoreDisplayFinal.innerText = 'Your Total Score: ' + yourScore;
			scoreDisplayFinal.classList.add('top-container__your-score-big--active');
			scoreContainer.classList.add('top-container__your-score--hidden');
			timeLeftContainer.classList.add('top-container__your-score--hidden');
			buttonStart.classList.add('whackamole__button-start--hidden')
		}
	}
	
	function resetAndPlayAgain() {
		buttonStart.classList.remove('whackamole__button-start--hidden')
		whackamoleSection.classList.add('body-whackamole__whackamole--hidden');
		scoreDisplayFinal.classList.remove('top-container__your-score-big--active');
		scoreContainer.classList.remove('top-container__your-score--hidden');
		timeLeftContainer.classList.remove('top-container__your-score--hidden');
		buttonStart.classList.remove('whackamole__button-start--hidden');
		clearInterval(timerId);
		clearInterval(countdownTimerId);
	}
}