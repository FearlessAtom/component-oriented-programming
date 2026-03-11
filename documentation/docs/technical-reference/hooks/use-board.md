---
id: use-board
title: useBoard
sidebar_label: useBoard
---

# useBoard

`useBoard` is the **central game logic hook**. It orchestrates card flipping, match detection, move counting, and board locking by reading from and writing to the board, score, and settings stores. It also bootstraps the game on mount and delegates win/loss detection to [`useGameProgress`](./use-game-progress.md).

## Returns

| Name | Type | Description |
| :--- | :--- | :--- |
| `flipCard` | `function(cardId)` | Attempts to flip a card. Silently no-ops if any flip guard condition is met (see [Flip Guards](#flip-guards)). |
| `unflipCard` | `function(cardId)` | Removes a card from the flipped state, used internally to reverse unmatched cards after a delay. |
| `isFlipped` | `function(cardId) => boolean` | Returns `true` if the given card is currently in the flipped cards list. |
| `getCardById` | `function(cardId) => object` | Looks up a card object from the board by its `cardId`. |

## Store Dependencies

| Store | Fields Read | Fields Written |
| :--- | :--- | :--- |
| `useBoardStore` | `cards`, `flippedCards`, `cardsToMatchIds`, `matchedCards` | `setFlippedCards`, `setCardsToMatchIds`, `setMatchedCards` |
| `useScoreStore` | `moves` | `setMoves` |
| `useSettingsStore` | `isGameGoing`, `isBoardLocked`, `settingsSnapshot` | — |

## Lifecycle

On mount, `useBoard` calls `startGame` from [`useGameControl`](./use-game-control.md) to initialize the board state. On unmount, the game is cleaned up by the same hook.

```js
useEffect(startGame, []);
```

[`useGameProgress`](./use-game-progress.md) is also invoked unconditionally on every render to continuously evaluate win/loss conditions as the board state changes.

## Match Detection

The core matching logic runs inside a `useEffect` that fires whenever `cardsToMatchIds` changes:

1. **Wait** until the number of staged cards equals `cardsToMatch` (from `settingsSnapshot`).
2. **Increment** the move counter.
3. **Compare** the `cardImageName` of all staged cards. If all match, add them to `matchedCards` and clear the staging list.
4. **If no match**, wait 1 second, then clear `cardsToMatchIds` and unflip any non-matched cards.

## Flip Guards

`flipCard` performs several checks before accepting a flip. It silently returns early if any of the following are true:

| Guard | Condition |
| :--- | :--- |
| Board locked | `isBoardLocked === true` |
| Move limit reached | `isMoveLimited && moves - moveLimit === 0` |
| Card already matched | `matchedCards.includes(cardId)` |
| Card already flipped | `flippedCards.includes(cardId)` |
| Card already staged | `cardsToMatchIds.includes(cardId)` |
| Staging queue full | `cardsToMatchIds.length >= cardsToMatch` |

## Usage

`useBoard` is consumed in `GamePage` to wire up the card grid:

```jsx
function GamePage() {
    const { flipCard, isFlipped } = useBoard();
    const cards = useBoardStore(state => state.cards);

    const cardElements = cards.map((card, i) =>
        <Card
            card={card}
            onFlip={() => flipCard(card.cardId)}
            isFlipped={isFlipped(card.cardId)}
            key={i}
        />
    );
    // ...
}
```
