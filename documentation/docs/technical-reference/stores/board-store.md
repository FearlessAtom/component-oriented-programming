---
id: board-store
title: boardStore
sidebar_label: boardStore
---

# useBoardStore

`useBoardStore` is a **persisted Zustand store** that holds all runtime board state for an active game session. It tracks the card deck, flip states, match progress, and the visibility of the results modal.

State is persisted to `localStorage` under the key `"board-storage"`, allowing an interrupted game session to be resumed after a page refresh.

## State

| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `cards` | `array` | `[]` | The full deck of card objects for the current game, each containing `cardId` and `cardImageName`. |
| `flippedCards` | `array` | `[]` | List of `cardId`s currently showing their face, including both matched and unmatched cards. |
| `cardsToMatchIds` | `array` | `[]` | Staging list of `cardId`s flipped in the current move, pending match evaluation. Capped at `cardsToMatch` from settings. |
| `matchedCards` | `array` | `[]` | List of `cardId`s that have been successfully matched and are permanently face-up. |
| `isGameResultsModalOpen` | `boolean` | `false` | Controls visibility of the results modal rendered via `Portal` and `Modal`. |

## Actions

| Action | Signature | Description |
| :--- | :--- | :--- |
| `setCards` | `(value: array) => void` | Replaces the entire card deck, called at the start of each new game. |
| `setFlippedCards` | `(value: array) => void` | Overwrites the flipped cards list. Used to both add and remove flipped cards. |
| `setCardsToMatchIds` | `(value: array) => void` | Overwrites the staging list. Cleared after every match evaluation. |
| `setMatchedCards` | `(value: array) => void` | Overwrites the matched cards list, growing it as new pairs are found. |
| `setIsGameResultsModalOpen` | `(value: boolean) => void` | Opens or closes the results modal. |

## Persistence

All fields are persisted to `localStorage` under the key `"board-storage"`. This means an in-progress game — including which cards are matched and flipped — is fully restored after a page refresh.

## Usage

```js
const cards = useBoardStore(state => state.cards);
const flippedCards = useBoardStore(state => state.flippedCards);
const matchedCards = useBoardStore(state => state.matchedCards);
const isGameResultsModalOpen = useBoardStore(state => state.isGameResultsModalOpen);
```
