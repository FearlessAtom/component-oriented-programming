import { useState, useEffect, createContext, useContext } from "react";
import { useScore } from "./ScoreProvider";
import { useSettings } from "./SettingsProvider";

const BoardContext = createContext();

function BoardProvider({ children })
{
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    const score = useScore();
    const settings = useSettings();

    useEffect(() =>
    {
        const percentage = matchedCards.length / settings.cardCount * 100;

        score.setPercentage(Math.floor(percentage));
    }, [matchedCards]);

    useEffect(() =>
    {
        if (flippedCards.length < 2) return

        score.setMoves(previous_value => previous_value + 1);

        let matched = true;

        for (let i = 0; i < flippedCards.length - 1; i++)
        {
            if (flippedCards[i].cardImageName != flippedCards[i + 1].cardImageName) matched = false;
        }

        if (matched)
        {
            setMatchedCards([...matchedCards, ...flippedCards]);
            setFlippedCards([]);
        }

        else
        {
            setTimeout(() => 
            {
                while(flippedCards.length > 0)
                {
                    resetCard(flippedCards[0].cardId);
                }
            }, 1000)
        }
    }, [flippedCards]);

    const resetCard = (cardId) => 
    {
        const index = flippedCards.map(card => card.cardId).indexOf(cardId);

        if (index == -1) return;

        const card = flippedCards[index];

        card.setFlipped(false);

        flippedCards.splice(flippedCards.map(card => card.cardId).indexOf(cardId), 1);
        setFlippedCards(flippedCards);
    }

    const flipCard = (card) =>
    {
        if (matchedCards.map(card => card.cardId).includes(card.cardId)) return;

        if (!flippedCards.map(card => card.cardId).includes(card.cardId))
        {
            if(flippedCards.length >= 2) return;

            card.setFlipped(true);
            setFlippedCards([...flippedCards, card]);
        }
    };

    return <BoardContext.Provider value={ flipCard }>
        { children }
    </BoardContext.Provider>
}

function useBoard()
{
    const context = useContext(BoardContext);

    if (!context)
    {
        throw new Error('useBoard must be used within BoarderProvider');
    }

    return context;
}

export { BoardProvider, useBoard }
