import { shuffle } from "../utils/utils";

function getCards(card_count)
{
    const card_pairs = card_count / 2;

    let file_names = ["bug.png", "dih_to_yo.jpg", "mr_beast.jpg", "s1mple.jpg", "you_should_switch_to_linux.jpg"];

    file_names = shuffle(file_names);
    file_names = file_names.slice(0, card_pairs);

    let cards = [...file_names, ...file_names];
    cards = shuffle(cards);
    
    return cards;
}

export { getCards }
