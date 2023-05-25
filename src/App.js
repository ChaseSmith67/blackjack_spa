import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import { createDeck } from "./components/Deck";
import { Row, Col, Toast, Button } from "react-bootstrap";
import getBlackJackStats from "./components/StatsService";

function App() {
  const [deck, setDeck] = useState(createDeck());
  const [phase, setPhase] = useState(null); // Current phase of game: player turn, dealer turn, game over
  const [playerHand, setPlayerHand] = useState({ cards: [], value: 0 });
  const [dealerHand, setDealerHand] = useState({ cards: [], value: 0 });
  const [message, setMessage] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [hint, setHint] = useState("Place a bet and press 'Deal'.");
  const [bet, setBet] = useState(0);

  const [stats, setStats] = useState([]);

  const toggleShowHint = () => {
    setShowHint(!showHint);
  };

  useEffect(() => {
    getBlackJackStats().then((stats) => setStats(stats)); //
  }, []);

  useEffect(() => {
    console.log("message", message);
  }, [message]);

  useEffect(() => {
    if (playerHand.value === 21 && playerHand.cards.length === 2) {
      setMessage("Blackjack!");
      setPhase("game over");
    } else if (playerHand.value > 21) {
      let hasAce = false;
      for (let i = 0; i < playerHand.cards.length; i++) {
        let card = playerHand.cards[i];
        if (card.value === "A") {
          hasAce = true;
          card.value = "S";
          setPlayerHand((prev) => ({
            ...prev,
            value: prev.value + evalCard(card) - 11,
          }));
          break;
        }
      }
      if (!hasAce) {
        setMessage("Player Busted!");
        setPhase("game over");
      }
    }
  }, [playerHand]);

  useEffect(() => {
    if (dealerHand.cards.length === 2) {
      if (phase !== "dealer") {
        if (
          dealerHand.cards[0].value === "A" &&
          evalCard(dealerHand.cards[1]) === 10
        ) {
          dealerHand.cards[0].visible = true;
          setMessage("Dealer Blackjack!");
          setPhase("game over");
        }
      }
    }
    if (phase === "dealer") {
      if (dealerHand.value < 17) {
        let hasAce = false;
        for (let i = 0; i < dealerHand.cards.length; i++) {
          let card = dealerHand.cards[i];
          if (card.value === "A") {
            hasAce = true;
            card.value = "S";
            setDealerHand((prev) => ({
              ...prev,
              value: prev.value + evalCard(card) - 11,
            }));
            break;
          }
        }

        if (!hasAce && dealerHand.value >= 17) {
          setPhase("game over");
        } else if (dealerHand.value < 17) {
          setTimeout(() => {
            dealDealer(deck[0]);
          }, 500);
        }
      } else {
        setPhase("game over");
      }
    }
  }, [dealerHand]);

  useEffect(() => {
    if (phase === "dealer") {
      let card = dealerHand.cards[0];
      card.visible = true;
      setDealerHand((prev) => ({
        ...prev,
        value: prev.value + evalCard(card),
      }));
    } else if (phase === "game over") {
      if (dealerHand.value > 21 && playerHand.value <= 21) {
        setMessage("Dealer Busted!");
      } else if (dealerHand.value > playerHand.value) {
        setMessage("Dealer Wins!");
      } else if (dealerHand.value < playerHand.value) {
        if (playerHand.value > 21) {
          setMessage("Player Busted!");
        } else {
          setMessage("Player Wins!");
        }
      } else {
        setMessage("Push!");
      }
    }
  }, [phase]);

  const newHand = () => {
    setDeck(clearTable());

    console.log(phase);
    setPhase("player");
    console.log(phase);

    // // Clear hands
    // clearTable();
    console.log(deck);

    dealPlayer(deck[0]);
    // setTimeout(() => {
    dealDealer(deck[1], false);
    //   }, 500);
    //   setTimeout(() => {
    dealPlayer(deck[2]);
    //   }, 1000);
    //   setTimeout(() => {
    dealDealer(deck[3]);
    //   }, 1500);

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
  }

  // Parses the card data into numerical values
  /* TODO: Determine how to handle Aces (Soft/Hard) */
  const evalCard = (card) => {
    switch (card.value) {
      case "K":
      case "Q":
      case "J":
        return 10;
      case "S":
        return 1;
      case "A":
        return 11;
      default:
        return parseInt(card.value);
    }
  };

  // Deal a card from the deck to the player
  const dealPlayer = (card) => {
    if (card.value === "S") {
      card.value = "A";
    }
    setPlayerHand((prev) => ({
      ...prev,
      cards: [...prev.cards, card],
      value: prev.value + evalCard(card),
    }));
    setDeck((prev) => [...prev.slice(1)]);
  };

  // Deal a card from the deck to the dealer
  const dealDealer = (card, visible = true) => {
    if (card.value === "S") {
      card.value = "A";
    }
    card.visible = visible;
    if (visible) {
      setDealerHand((prev) => ({
        ...prev,
        cards: [...prev.cards, card],
        value: prev.value + evalCard(card),
      }));
    } else {
      setDealerHand((prev) => ({ ...prev, cards: [...prev.cards, card] }));
    }
    setDeck((prev) => [...prev.slice(1)]);
  };

  const playerHit = () => {
    if (phase === "player") {
      dealPlayer(deck[0]);
    } else {
      window.alert("It's not your turn!");
    }
  };

  const doubleDown = () => {
    if (phase === "player") {
      dealPlayer(deck[0]);
      setPhase("dealer");
    } else {
      window.alert("It's not your turn!");
    }
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
    <Container className="p-1">
      {stats.map((e) => (
        <td>
          <p>
            {e.title} {e.count}
          </p>
        </td>
      ))}
      <Container className="p-3 mb-4 bg-secondary rounded-3">
        <h1 className="header">Dealer's Cards</h1>
        <div className="d-flex justify-content-center">
          <td>
            <img src="images/Empty.png" alt="" width="100" height="150" />
          </td>
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
          <td>
            <img src="images/Empty.png" alt="" width="100" height="150" />
          </td>
        </div>
        <div className="d-flex justify-content-center">{dealerHand.value} </div>
      </Container>

      <Container className="p-3 mb-4 bg-secondary rounded-3">
        <h1 className="header">Your Cards</h1>
        <div className="d-flex justify-content-center">
          <td>
            <img src="images/Empty.png" alt="" width="100" height="150" />
          </td>
          {playerHand.cards.map((e) => (
            <td>
              <Container className="card p-0">
                <img src={e.image} alt="" width="100" height="150" />
              </Container>
            </td>
          ))}
          <td>
            <img src="images/Empty.png" alt="" width="100" height="150" />
          </td>
        </div>
        <div className="d-flex justify-content-center">{playerHand.value}</div>
      </Container>

      <div className="d-flex justify-content-center">
        <Col md={6} className="mb-2">
          <Button onClick={toggleShowHint} className="mb-2">
            Show Hint
          </Button>
          <Toast show={showHint} onClose={toggleShowHint}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">
                For the best chance of winning:
              </strong>
              {/* { "wins: ", stats. } */}
            </Toast.Header>
            <Toast.Body>This is where the hint message goes...</Toast.Body>
          </Toast>
        </Col>
      </div>

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
            onClick={() => doubleDown()}
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
