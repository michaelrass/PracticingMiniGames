export default function MemoryGame() {
	let cardsChosen = [];
	let cardsChosenIds = [];
	let cardsWon = [];

	const bodyMemoryGame = document.querySelector('.body-memorygame');
 	const gridContainer = document.querySelector('.memory-game__grid');
	const resultDisplay = document.querySelector('.memory-game__result');
	const congratulations = document.querySelector('.congratulations');
	const buttonGoAgain = document.querySelector('.congratulations__button-go-again');

	const cardsArray = [
		{
			name: 'burger',
			image: '/assets/memorygame/burger.jpg'
		},
		{
			name: 'car',
			image: '/assets/memorygame/car.jpg'
		},
		{
			name: 'gloves',
			image: '/assets/memorygame/gloves.jpg'
		},
		{
			name: 'milkshake',
			image: '/assets/memorygame/milkshake.jpg'
		},
		{
			name: 'plane',
			image: '/assets/memorygame/plane.jpg'
		},
		{
			name: 'shoe',
			image: '/assets/memorygame/shoe.jpg'
		},
		{
			name: 'burger',
			image: '/assets/memorygame/burger.jpg'
		},
		{
			name: 'car',
			image: '/assets/memorygame/car.jpg'
		},
		{
			name: 'gloves',
			image: '/assets/memorygame/gloves.jpg'
		},
		{
			name: 'milkshake',
			image: '/assets/memorygame/milkshake.jpg'
		},
		{
			name: 'plane',
			image: '/assets/memorygame/plane.jpg'
		},
		{
			name: 'shoe',
			image: '/assets/memorygame/shoe.jpg'
		},

	]
	cardsArray.sort(() => 0.5 - Math.random());
	if (bodyMemoryGame) {
		resultDisplay.innerHTML = 0;
		buttonGoAgain.addEventListener('click', handleButtonGoAgain);
		
		
		function handleButtonGoAgain() {
			resetMemoryGame();
		}
		
		function resetMemoryGame() {
			location.reload();
		}
		
		function createBoard() {
			for (let index = 0; index < cardsArray.length; index += 1) {
				const card = document.createElement('img');
				card.setAttribute('src', '/assets/memorygame/backside.png');
				card.setAttribute('data-id', index);
				card.classList.add('memory-game__image');
				gridContainer.appendChild(card);
				card.addEventListener('click', flipCard);
			}
		}
		
		createBoard();
		
		function checkMatch() {
			const cards = document.querySelectorAll('.memory-game__grid img');
			const optionOneId = cardsChosenIds[0];
			const optionTwoId = cardsChosenIds[1];
			
			if (cardsChosen[0] === cardsChosen[1]) {
				cards[optionOneId].setAttribute('src', '/assets/memorygame/blank.png');
				cards[optionTwoId].setAttribute('src', '/assets/memorygame/blank.png');
				
				cards[optionOneId].removeEventListener('click', flipCard);
				cards[optionTwoId].removeEventListener('click', flipCard);
				
				cards[optionOneId].style.cursor = 'unset';
				cards[optionTwoId].style.cursor = 'unset';
				
				cardsWon.push(cardsChosen);
			} else {
				cards[optionOneId].setAttribute('src', '/assets/memorygame/backside.png');
				cards[optionTwoId].setAttribute('src', '/assets/memorygame/backside.png');
			}

			cardsChosen = [];
			cardsChosenIds = [];
			resultDisplay.innerText = cardsWon.length;
			
			if (cardsWon.length === cardsArray.length / 2) {
				congratulations.classList.add('congratulations--active');
			} else {
				congratulations.classList.remove('congratulations--active');
			}
		}
		
		
		function flipCard() {
			const cardId = this.getAttribute('data-id');
			cardsChosen.push(cardsArray[cardId].name);
			cardsChosenIds.push(cardId);
			this.setAttribute('src', cardsArray[cardId].image);
			console.log(cardsChosen);
			console.log(cardsChosenIds);
			if (cardsChosen.length === 2) {
				setTimeout(checkMatch, 500);
			}
		}
	}
}