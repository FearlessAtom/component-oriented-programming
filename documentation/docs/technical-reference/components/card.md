---
id: card
title: Card
sibebar_label: Card
---

# Card

The `Card` component represents an individual tile in the memory game. It is a **stateless (presentational) component** that relies on props to determine its visual state and handle user interactions.

## Props

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `card` | `object` | **Required** | The card data object, containing `cardId` and `cardImageName`. |
| `isFlipped` | `boolean` | `false` | Boolean flag provided by the parent to determine if the card should show its face. |
| `onFlip` | `function` | **Required** | Callback function triggered when the user clicks the card. |

## Usage

In the `GamePage`, the `Card` is mapped from the global state and controlled by the `useBoard` hook:

```jsx
const { flipCard, isFlipped } = useBoard();
const cards = useBoardStore(state => state.cards);

const cardElements = cards.map((card, i) => 
    <Card
        card={ card }
        onFlip={ () => flipCard(card.cardId) }
        isFlipped={ isFlipped(card.cardId) }
        key={ i }
    />
);
```

## Source

```jsx
import styles from "../Card/Card.module.css";

function Card({ card, isFlipped, onFlip}) {
    return <div
        className={styles.card + (isFlipped ? " " + styles.flipped : "")}
        onClick={ onFlip }
    >
        <div className={styles.card_image + " " + styles.card_image_front}>
            <p className={styles.card_image_front_text}>?</p>
        </div>

        <img
            className={styles.card_image_flipped + " " + styles.card_image}
            src={ "/src/assets/cards/" + card.cardImageName}
        />
    </div>
}

export default Card;
```
