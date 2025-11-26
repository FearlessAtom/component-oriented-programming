import { shuffle } from "../utils/utils";

function getCardImageNames(cardCount, cardsToMatch)
{
    const card_pairs = cardCount / cardsToMatch;

    let file_names = ["bug.png", "dih_to_yo.jpg", "mr_beast.jpg", "aleksib_dislike.jpg", "epstein.jpg", "black.jpg",
        "s1mple.jpg", "you_should_switch_to_linux.jpg", "bakery.jpg", "dendi.jpg", "sponge_bob.png", 
        "cat_you_cannot_ragebait_me.png", "linux.png", "balls.jpeg", "how_do_i_type.jpg"];

    file_names = shuffle(file_names);
    file_names = file_names.slice(0, card_pairs);

    let cards = []

    for (let i = 0; i < cardsToMatch; i++) {
        cards = [...cards, ...file_names];
    }

    cards = shuffle(cards);
    
    return cards;
}

export default getCardImageNames
