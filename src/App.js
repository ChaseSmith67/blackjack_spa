import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container"; 
import { createDeck } from "./components/Deck";



function App() {

	const [deck, setDeck] = useState(createDeck());
	const [phase, setPhase] = useState(null);	// Current phase of game: player turn, dealer turn, game over
	const [playerHand, setPlayerHand] = useState({ cards: [], value: 0 });
	const [dealerHand, setDealerHand] = useState({ cards: [], value: 0 });
	const [message, setMessage] = useState("");

	useEffect(() => {
		console.log("message", message)
	},[message])

	useEffect(() => {
		if (playerHand.value === 21 && playerHand.cards.length === 2) {
			setMessage("Blackjack!");
			setPhase("dealer")
		} else if (playerHand.value > 21) {
			setMessage("Player Busted!");
			setPhase("dealer")
		}
	}, [playerHand])

	useEffect(() => {
		if (dealerHand.cards.length === 2) { 
			if (phase === ("dealer")) {
				dealerHand.cards[0].visible = true;
			} else {
				if (dealerHand.cards[0].value === "A" && evalCard(dealerHand.cards[1]) === 10) {
					setPhase("game over")
					setMessage("Dealer Blackjack!");
				} 
			}
		}
	}, [dealerHand])

	const newHand = () => {

		setDeck(clearTable());

		console.log(phase)
		setPhase("player")
		console.log(phase)

		// // Clear hands
		// clearTable();
		console.log(deck)
		
		dealPlayer(deck[0]);
		dealDealer(deck[1], false);
		dealPlayer(deck[2]);
		dealDealer(deck[3]);
	
		setMessage("Player's turn!");
		// };
	  };


	// Resets Hands and Deck
	function clearTable() {
		setPlayerHand((prev) => ({ ...prev, cards: [], value: 0 }));
		setDealerHand((prev) => ({ ...prev, cards: [], value: 0 }));
		// LOGIC FOR NEW DECK
		let newDeck = createDeck();
		return newDeck;
	};

	// Parses the card data into numerical values
	/* TODO: Determine how to handle Aces (Soft/Hard) */
	const evalCard = (card) => {
		switch (card.value) {
		case "K":
		case "Q":
		case "J":
		case "1":
			return 10;
		case "A":
			return 11;
		default:
			return parseInt(card.value);
		}
	};

	// Deal a card from the deck to the player
	const dealPlayer = (card) => {
		setPlayerHand((prev) => ({ ...prev, cards: [...prev.cards, card], value: prev.value + evalCard(card) }));
		setDeck(prev => ([...prev.slice(1)]));
	};

	// Deal a card from the deck to the dealer
	const dealDealer = (card, visible=true) => {
		card.visible = visible;
		if (visible) {
			setDealerHand((prev) => ({ ...prev, cards: [...prev.cards, card], value: prev.value + evalCard(card) }));
		} else {
			setDealerHand((prev) => ({ ...prev, cards: [...prev.cards, card] }));
		}
		setDeck(prev => ([...prev.slice(1)]));
	};

	const recalculateDealerHand = () => {
		setDealerHand((prev) => ({ ...prev, value: 0 }));
		for (let i = 0; i < dealerHand.cards.length; i++) {
		if (dealerHand.cards[i].visible) {
			let cardVal = evalCard(dealerHand.cards[i]);
			setDealerHand((prev) => ({ ...prev, value: prev.value + cardVal }));
		}
		}
		return dealerHand.value;
	};

	const recalculatePlayerHand = () => {
		setPlayerHand((prev) => ({ ...prev, value: 0 }));
		for (let i = 0; i < playerHand.cards.length; i++) {
		let cardVal = evalCard(playerHand.cards[i]);
		setPlayerHand((prev) => ({ ...prev, value: prev.value + cardVal }));
		}
	};

	const playerHit = () => {
		if (phase === "player") {
			dealPlayer(deck[0]);
		} else {
			window.alert("It's not your turn!");
		}
	};

  

	const evalHands = () => {

		
	};

	const endTurn = () => {
		if (phase === "player") {
			setPhase("dealer");
			setMessage("Dealer's turn!");
			dealerHand.cards[0].visible = true;
		} else {
			window.alert("It's not your turn!");
		}
	};

	return (
		<Container className="p-3">
		<Container className="p-5 mb-4 bg-secondary rounded-3">
			<h1 className="header">Dealer's Cards</h1>
			<div className="d-flex justify-content-center">
			{dealerHand.cards.map(function (e) {
				if (e.visible) {
				return (
					<td>
					<Container className="card p-0">
						<img src={e.image} alt="" width="100" height="150" />
					</Container>
					</td>
				);
				} else {
				return (
					<td>
					<Container className="card p-0">
						<img
						src="images/Back_Covers/Pomegranate.png"
						alt=""
						width="100"
						height="150"
						/>
					</Container>
					</td>
				);
				}
			})}
			</div>
			<div className="d-flex justify-content-center">{dealerHand.value} </div>
		</Container>

		<Container className="p-5 mb-4 bg-secondary rounded-3">
			<h1 className="header">Your Cards</h1>
			<div className="d-flex justify-content-center">
			{playerHand.cards.map((e) => (
				<td>
				<Container className="card p-0">
					<img src={e.image} alt="" width="100" height="150" />
				</Container>
				</td>
			))}
			</div>
			<div className="d-flex justify-content-center">{playerHand.value}</div>
		</Container>

		<button
			type="button"
			className="btn btn-primary p-3 b-1"
			onClick={() => {
			newHand();
			}}
		>
			Deal
		</button>

		<div className="d-flex justify-content-center">
			<h3 className="header">{message}</h3>
		</div>

		<div className="d-flex justify-content-center">
			<div className="btn-group btn-group-lg p-3 b-1">
			<button
				type="button"
				className="btn btn-primary"
				onClick={() => {
				playerHit();
				}}
			>
				Hit
			</button>
			<button
				type="button"
				className="btn btn-primary"
				onClick={() => {
				endTurn();
            }}
			>
				Stand
			</button>
			<button
				type="button"
				className="btn btn-primary"
				onClick={() => console.log("double")}
			>
				Double
			</button>
			<button
				type="button"
				className="btn btn-primary"
				onClick={() => console.log("split")}
				>
				Split
			</button>
			</div>
		</div>
		</Container>
	);
	}

export default App;
