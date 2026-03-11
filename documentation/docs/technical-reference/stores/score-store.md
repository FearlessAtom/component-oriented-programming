---
id: score-store
title: scoreStore
sidebar_label: scoreStore
---

# useScoreStore

`useScoreStore` is a **persisted Zustand store** that tracks the player's score during an active game session. It holds the move count and match percentage, both of which are updated in real time as the game progresses.

State is persisted to `localStorage` under the key `"score-storage"`, so scores survive a page refresh mid-session.

## State

| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `moves` | `number` | `0` | Total number of move attempts made. Incremented by [`useBoard`](../hooks/use-board.md) each time `cardsToMatchIds` reaches the required count. |
| `percentage` | `number` | `0` | Current match percentage (0–100), recalculated by [`useGameProgress`](../hooks/use-game-progress.md) whenever `matchedCards` changes. |

## Actions

| Action | Signature | Description |
| :--- | :--- | :--- |
| `setMoves` | `(value: number) => void` | Overwrites the move count. |
| `setPercentage` | `(value: number) => void` | Overwrites the match percentage. |
| `resetScore` | `() => void` | Resets both `moves` and `percentage` to `0` in a single atomic update. Called by [`useGameControl`](../hooks/use-game-control.md) when resetting a game. |

## Persistence

All fields are persisted to `localStorage` under the key `"score-storage"`.

## Usage

```js
const moves = useScoreStore(state => state.moves);
const percentage = useScoreStore(state => state.percentage);
const { resetScore } = useScoreStore();
```
