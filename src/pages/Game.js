import React, { useState, useEffect } from "react";
import "../App.css";
import Container from "react-bootstrap/Container";
import { createDeck } from "../components/Deck";
import { Row, Col, Toast, Button, ToastContainer } from "react-bootstrap";
import getBlackJackStats from "../components/StatsService";

function Game() {
  // Deck of cards used to play the game.
  const [deck, setDeck] = useState(createDeck());

  // Current phase of game: player turn, dealer turn, game over
  const [phase, setPhase] = useState(null);

  /**
   * Player and dealer's hands, with an array to hold the card objects
   *  and a dynamically calculated value that is the sum of the cards in the hand.
   */
  const [playerHand, setPlayerHand] = useState({ cards: [], value: 0 });
  const [dealerHand, setDealerHand] = useState({ cards: [], value: 0 });

  // Message diplayed, indicating whose turn it is or who won the game.
  const [message, setMessage] = useState("Place a bet and Deal.");

  // Hint shown to player, letting them know the action most likely to win.
  const [hint, setHint] = useState("Place a bet and Deal.");

  // Hides or displays the hint.
  const [showHint, setShowHint] = useState(false);

  // Used to manage the player's bet.
  const [bet, setBet] = useState(0);

  // Used for the player's current locked bet.
  const [currentBet, setCurrentBet] = useState(0);

  // The player's current total chip count.
  const [chips, setChips] = useState(100);

  // Sets the historical win statistics
  const [stats, setStats] = useState([]);

  const toggleShowHint = () => {
    setShowHint(!showHint); // Show or hide the hint.
  };

  useEffect(() => {
    getBlackJackStats().then((stats) => setStats(stats)); // Retrieve the stats
  }, []);

  /**
   *  Determine the best possible action the player can take and
   *  populate the toggleable hint box with the suggested action.
   */
  useEffect(() => {
    let hasSoftAce = false;
    for (let i = 0; i < playerHand.cards.length; i++) {
      if (playerHand.cards[i].value === "A") {
        hasSoftAce = true;
      }
      if (phase === "player") {
        switch (playerHand.value) {
          case 21:
            if (playerHand.cards.length === 2) {
              setHint("You have Blackjack!");
            } else {
              setHint("You should stand.");
            }
            break;
          case 20:
            setHint("You should stand.");
            break;
          case 19:
            if (
              playerHand.cards.length === 2 &&
              hasSoftAce &&
              dealerHand.value === 6
            ) {
              setHint("You should double.");
            } else {
              setHint("You should stand.");
            }
            break;
          case 18:
            if (hasSoftAce) {
              if (playerHand.cards.length === 2 && dealerHand.value <= 6) {
                setHint("You should double.");
              } else if (dealerHand.value > 8) {
                setHint("You should hit.");
              } else {
                setHint("You should stand.");
              }
            } else {
              setHint("You should stand.");
            }
            break;
          case 17:
            if (hasSoftAce) {
              if (dealerHand.value === 2 || dealerHand.value > 6) {
                setHint("You should hit.");
              } else {
                setHint("You should double.");
              }
            } else {
              setHint("You should stand.");
            }
            break;
          case 16:
          case 15:
            if (hasSoftAce) {
              if (
                playerHand.cards.length === 2 &&
                dealerHand.value > 3 &&
                dealerHand.value < 7
              ) {
                setHint("You should double.");
              } else {
                setHint("You should hit.");
              }
            } else if (dealerHand.value > 6) {
              setHint("You should hit.");
            } else {
              setHint("You should stand.");
            }
            break;
          case 14:
          case 13:
            if (hasSoftAce) {
              if (
                playerHand.cards.length === 2 &&
                dealerHand.value > 4 &&
                dealerHand.value < 7
              ) {
                setHint("You should double.");
              } else {
                setHint("You should hit.");
              }
            } else if (dealerHand.value > 6) {
              setHint("You should hit.");
            } else {
              setHint("You should stand.");
            }
            break;
          case 12:
            if (dealerHand.value > 3 && dealerHand.value < 7) {
              setHint("You should stand.");
            } else {
              setHint("You should hit.");
            }
            break;
          case 11:
            if (playerHand.cards.length === 2) {
              setHint("You should double.");
            } else {
              setHint("You should hit.");
            }
            break;
          case 10:
            if (playerHand.cards.length === 2 && dealerHand.value < 10) {
              setHint("You should double.");
            } else {
              setHint("You should hit.");
            }
            break;
          case 9:
            if (
              playerHand.cards.length === 2 &&
              dealerHand.value < 7 &&
              dealerHand.value > 2
            ) {
              setHint("You should double.");
            } else {
              setHint("You should hit.");
            }
            break;
          case 8:
          case 7:
          case 6:
          case 5:
          case 4:
            setHint("You should hit.");
            break;
          default:
            setHint("Oh No!");
            break;
        }
      }
    }
  }, [playerHand.value]);

  /**
   *  Handle soft/hard aces, blackjack, and bust for player.
   */
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
          card.value = "H";
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

  /**
   *  Dealer's turn - determine whether dealer should hit or not
   */
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
        // This is where Insurance would go. Not sure about that yet.
      }
    }
    if (phase === "dealer") {
      if (dealerHand.value < 17) {
        let hasAce = false;
        for (let i = 0; i < dealerHand.cards.length; i++) {
          let card = dealerHand.cards[i];
          if (card.value === "A") {
            hasAce = true;
            card.value = "H";
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

  /**
   *  Manage phases of the game and determine who won.
   */
  useEffect(() => {
    if (phase === "dealer") {
      let card = dealerHand.cards[0];
      card.visible = true;
      setDealerHand((prev) => ({
        ...prev,
        value: prev.value + evalCard(card),
      }));
    } else if (phase === "game over") {
      setHint("Place a bet and Deal.");
      if (dealerHand.value > 21 && playerHand.value <= 21) {
        setMessage("Dealer Busted!");
        playerWin();
      } else if (dealerHand.value > playerHand.value) {
        setMessage("Dealer Wins!");
        setCurrentBet(0);
      } else if (dealerHand.value < playerHand.value) {
        if (playerHand.value > 21) {
          setMessage("Player Busted!");
          setCurrentBet(0);
        } else {
          setMessage("Player Wins!");
           playerWin();
        }
      } else {
        setMessage("Push!");
      }
    }
  }, [phase]);

  const newHand = () => {
    setDeck(clearTable());

    setPhase("player");

    // Deal first 4 cards
    dealPlayer(deck[0]);
    dealDealer(deck[1], false); // Face-down card for dealer
    dealPlayer(deck[2]);
    dealDealer(deck[3]);
    setMessage("Player's turn!");
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
  const evalCard = (card) => {
    switch (card.value) {
      case "K":
      case "Q":
      case "J":
        return 10;
      case "H": // Hard Ace
        return 1;
      case "A":
        return 11;
      default:
        return parseInt(card.value);
    }
  };

  // Deal a card from the deck to the player
  const dealPlayer = (card) => {
    if (card.value === "H") {
      card.value = "A";       // Reset Hard Aces
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
    if (card.value === "H") {
      card.value = "A";       // Reset Hard Aces
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

  // Only allow player to hit on their turn
  const playerHit = () => {
    if (phase === "player") {
      dealPlayer(deck[0]);
    } else {
      window.alert("It's not your turn!");
    }
  };

  // End turn after player doubles and double bet.
  const doubleDown = () => {
    if (phase === "player") {
      if (chips >= currentBet) {
        setChips(chips => chips - currentBet);
        setCurrentBet(currentBet => currentBet * 2)
        dealPlayer(deck[0]);
        setPhase("dealer");
      } else {
        window.alert("You don't have enough chips to double!");
      }
    } else {
      window.alert("It's not your turn!");
    }
  };

  // Ends the player's turn, reveals Dealer's card
  const endTurn = () => {
    if (phase === "player") {
      setPhase("dealer");
      setMessage("Dealer's turn!");
      dealerHand.cards[0].visible = true;
    } else {
      window.alert("It's not your turn!");
    }
  };

  const placeBet = () => {
    if (bet > currentBet) {
      setChips(chips => (chips - bet + currentBet));
      setCurrentBet(bet);
    } else if (bet < currentBet) {
      setChips(chips => (chips + currentBet - bet));
      setCurrentBet(bet);
    }
  };

  const incrementBet = () => {
    if (bet + 5 <= chips) {
      setBet(bet + 5);
    }
  };

  const decrementBet = () => {
    if (bet >= 5) {
      setBet(bet - 5);
    }
  };

  const playerWin = (winnings = currentBet) => {
    setChips(chips => (chips + winnings));
  };

  return (
    <Container className="p-1">
      <Row>
        <Col>
          {stats.map((e) => (
            <Col>
              <th>
                {e.title} {e.count}
              </th>
            </Col>
          ))}
        </Col>
        <Col xs={8} className="header">
          
        </Col>
        <Col className="header">
          <th> Your Chips: {chips}</th>
        </Col>
      </Row>
      <Container className="p-3 mb-4 bg-secondary rounded-3">
        <h1 className="header">Dealer's Hand  &#40; { dealerHand.value } &#41;</h1>
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
      </Container>

      <Container className="p-3 mb-4 bg-secondary rounded-3">
        <h1 className="header">Your Hand  &#40; { playerHand.value } &#41;</h1>
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
        <div className="d-flex justify-content-center p-2" style={{"font-size":"24px"}}>Current Bet: { currentBet }</div>
      </Container>

      <Row xs={10}>
        <Col xs={3}>
          <Button onClick={toggleShowHint} className="mb-2 btn-info">
            Show Hint
          </Button>
          <ToastContainer containerPosition="position-fixed">
            <Toast show={showHint} onClose={toggleShowHint} className="mb-2">
              {/* <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">
                For the best chance of winning:
              </strong>
            </Toast.Header> */}
              <Toast.Body> {hint} </Toast.Body>
            </Toast>
          </ToastContainer>
        </Col>

        <Col xs={1}>
          <button
            type="button"
            className="btn btn-success p-3 pt-5 pb-5 b-2"
            onClick={() => {
              newHand();
            }}
          >
            Deal
          </button>
        </Col>
        <Col xs={4}>
          <Container>
            <Row>
              <h3 className="header">{message}</h3>
            </Row>

            <Row>
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
                {/* <button
            type="button"
            className="btn btn-primary"
            onClick={() => console.log("split")}
          >
            Split
          </button> */}
              </div>
            </Row>
          </Container>
        </Col>
        <Col md="auto">
          <Row>
            <div className="d-flex justify-content-center">
              <h4>Change Bet: {bet}</h4>
            </div>
          </Row>
          <Row>
            <div className="btn-group btn-group-xs p-3 b-5">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  decrementBet();
                }}
              >
                Bet Less
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  placeBet();
                }}
              >
                Place Bet
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  incrementBet();
                }}
              >
                Bet More
              </button>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Game;
