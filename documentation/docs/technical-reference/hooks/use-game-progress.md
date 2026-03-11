---
id: use-game-progress
title: useGameProgress
sidebar_label: useGameProgress
---

# useGameProgress

`useGameProgress` is a **side-effect-only hook** that watches game state and automatically triggers the end of a session when a win or loss condition is met. It returns nothing — its sole responsibility is to observe changes and call [`endGame`](./use-game-control.md#endgame) at the right moment.

It is called unconditionally on every render inside [`useBoard`](./use-board.md).

## Returns

This hook returns nothing. It only registers reactive side effects.

## Store Dependencies

| Store | Fields Read | Fields Written |
| :--- | :--- | :--- |
| `useBoardStore` | `matchedCards` | — |
| `useScoreStore` | `moves`, `percentage` | `setPercentage` |
| `useSettingsStore` | `settingsSnapshot.isMoveLimited`, `settingsSnapshot.moveLimit`, `settingsSnapshot.cardCount` | — |

## Effects

The hook registers three `useEffect` calls, each watching a different slice of state:

### 1. Move Limit Check — fires on `moves` change

Triggers `endGame` when the player has exhausted their move allowance.

```
if isMoveLimited && moveLimit - moves === 0 → endGame (after 500ms)
```

Only active when `isMoveLimited` is `true` in `settingsSnapshot`. If the game is not move-limited, this effect always returns early.

### 2. Victory Check — fires on `percentage` change

Triggers `endGame` when the player has matched all cards.

```
if percentage === 100 → endGame (after 500ms)
```

### 3. Percentage Recalculation — fires on `matchedCards` change

Recomputes the current match percentage whenever the matched card list grows and writes it back to `useScoreStore`.

```
percentage = Math.floor(matchedCards.length / cardCount * 100)
```

This updated value is what the victory check (effect 2) and `ScoreBoard` read from the store.

## Usage

`useGameProgress` is called inside `useBoard` with no arguments:

```js
// inside useBoard
useGameProgress();
```

Because it has no return value, the call is purely for its side effects. It must be called on every render so its `useEffect` dependencies stay in sync with the latest store state.
