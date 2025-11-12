import { useEffect } from "react";
import { useScore, useSettings } from "../providers/index";

function useCardMatching(props) {

    const settings = useSettings();
    const score = useScore();

    const startGame = props.startGame;
    const stopGame = props.stopGame;
    const resetCard = props.resetCard;

    const setFlippedCards = props.setFlippedCards;
    const setMatchedCards = props.setMatchedCards;

    const flippedCards = props.flippedCards;
    const matchedCards = props.matchedCards;

    useEffect(() => {
        startGame();

        return () => stopGame;
    }, []);

    useEffect (() => {
        if (!settings.isGameGoing) return;
        if (!(settings.isMoveLimited && settings.moveLimit - score.moves == 0)) return;

        setTimeout(stopGame, 500);
    }, [score.moves]);

    useEffect(() => {
        if (!settings.isGameGoing) return;
        if (score.percentage != 100) return

        setTimeout(stopGame, 500);
    }, [score.percentage]);

    useEffect(() => {
        const percentage = matchedCards.length / settings.cardCount * 100;

        score.setPercentage(Math.floor(percentage));
    }, [props.matchedCards]);

    useEffect(() => {
        if (flippedCards.length < settings.cardsToMatch) return

        score.setMoves(previous_value => previous_value + 1);

        let matched = true;

        for (let i = 0; i < flippedCards.length - 1; i++) {
            if (flippedCards[i].cardImageName != flippedCards[i + 1].cardImageName) matched = false;
        }

        if (matched) {
            setMatchedCards([...matchedCards, ...flippedCards]);
            setFlippedCards([]);
        }

        else {
            setTimeout(() => {
                while(flippedCards.length > 0) {
                    resetCard(flippedCards[0].cardId);
                }
            }, 1000)
        }
    }, [flippedCards]);

    return 
}

export { useCardMatching };
