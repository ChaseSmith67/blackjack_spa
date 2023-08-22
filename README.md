# Blackjack Trainer by Chase Smith

## About

This application is a simple web app intended to teach the
user basic blackjack strategy. It was built for a Software
Engineering course as my final project for the term. The
application is built with Node.JS, React.JS, and React-Bootstrap.

## Installation

To install and run the application, you need to have Node 
installed on your system. Clone the repository and run 
'npm install' in the terminal to download and install all the
necessary dependencies. Once the dependencies are intstalled,
type 'npm start' to run the program. The application has a 
Tutorial Page that explains how to play the game.

## Known Issues and Limitations

The game was designed to have a statistics tracking system
that allows the player to track their progress. It was 
implemented as a separate microservice, which is not yet 
integrated into this release completely. 

The game also does not currently include the ability for the 
player to split their hand, though that is something I would
like to add when I find the time.

The game currently uses a single deck by default. This can be
changed easily in the Deck.js component. However, as it is 
currently implemented, the application generates a brand new
deck (or decks) each hand, so the player cannot use this game
to learn how to count cards.
