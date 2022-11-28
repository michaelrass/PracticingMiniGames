export default function RockPaperScissors() {
	const gameContainer = document.querySelector('.game');
	const buttonRock = document.querySelector('.buttons__rock');
	const buttonPaper = document.querySelector('.buttons__paper');
	const buttonScissors = document.querySelector('.buttons__scissors');
	const computerChoiceDisplay = document.querySelector('.computer-choice__choice');
	const yourChoiceDisplay = document.querySelector('.your-choice__choice');
	const resultDisplay = document.querySelector('.result__result');
	const displayDraw = document.querySelector('.flash-container-draw--hidden');
	const displayWin = document.querySelector('.flash-container-win--hidden');
	const displayLose = document.querySelector('.flash-container-lose--hidden');
	const winStreakDisplay = document.querySelector('.strak__value');

	let computerChoice;
	let userChoice;
	let winStreak = 0;
	
	winStreakDisplay.innerText = winStreak;

	if (gameContainer) {
		buttonRock.addEventListener('click', handleButtonRockClick);
		buttonPaper.addEventListener('click', handleButtonPaperClick);
		buttonScissors.addEventListener('click', handleButtonScissorsClick);
	}
	
	function handleButtonRockClick() {
		chooseRock();
		generateComputerChoice();
		getResult();
	}
	
	function handleButtonPaperClick() {
		choosePaper();
		generateComputerChoice();
		getResult();
	}
	
	function handleButtonScissorsClick() {
		chooseScissors();
		generateComputerChoice();
		getResult();
	}

	function chooseRock() {
		yourChoiceDisplay.innerText = buttonRock.innerText;
		userChoice = 'Rock';
	}
	
	function choosePaper() {
		yourChoiceDisplay.innerText = buttonPaper.innerText;
		userChoice = 'Paper';
	}
	
	function chooseScissors() {
		yourChoiceDisplay.innerText = buttonScissors.innerText;
		userChoice = 'Scissors';
	}

	function generateComputerChoice() {
		let randomNumber = Math.floor(Math.random() * 3 + 1);

		if (randomNumber === 1) {
			computerChoice = 'Rock';
		}

		if (randomNumber === 2) {
			computerChoice = 'Paper';
		}

		if (randomNumber === 3) {
			computerChoice = 'Scissors';
		}

		computerChoiceDisplay.innerText = computerChoice;
	}

	function getResult() {
		if (computerChoice === userChoice) {
			renderDraw();
		}

		if (computerChoice === 'Rock' && userChoice === 'Paper') {
			renderWin();
		}

		if (computerChoice === 'Paper' && userChoice === 'Rock') {
			renderLose();
		}

		if (computerChoice === 'Scissors' && userChoice === 'Paper') {
			renderLose();
		}

		if (computerChoice === 'Rock' && userChoice === 'Scissors') {
			renderLose();
		}

		if (computerChoice === 'Paper' && userChoice === 'Scissors') {
			renderWin();
		}
	}

	function renderWin() {
		displayDraw.classList.remove('flash-container-draw--active');
		displayLose.classList.remove('flash-container-lose--active');
		displayWin.classList.add('flash-container-win--active');
		winStreak += 1;
		winStreakDisplay.innerText = winStreak;
	}
	
	function renderLose() {
		displayDraw.classList.remove('flash-container-draw--active');
		displayWin.classList.remove('flash-container-win--active');
		displayLose.classList.add('flash-container-lose--active');
		winStreak = 0;
		winStreakDisplay.innerText = winStreak;
	}
	
	function renderDraw() {
		displayWin.classList.remove('flash-container-win--active');
		displayLose.classList.remove('flash-container-lose--active');
		displayDraw.classList.add('flash-container-draw--active');
	}
}