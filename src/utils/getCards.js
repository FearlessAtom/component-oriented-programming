import getCardImageNames from "./getCardImageNames";
import { get_uuid } from "./utils";

function getCards (settings) {
    const cardImageNames = getCardImageNames(settings.cardCount, settings.cardsToMatch);

    const cardsData = cardImageNames.map((cardImageName, i) => {
        return {
            cardImageName,
            position: i + 1,
            cardId: get_uuid(),
        };
    });

    return cardsData;
}

export default getCards;
