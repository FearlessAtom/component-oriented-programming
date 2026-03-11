---
id: settings-store
title: settingsStore
sidebar_label: settingsStore
---

# useSettingsStore

`useSettingsStore` is a **persisted Zustand store** that holds all game configuration settings. It manages both the live settings (editable by the player at any time) and a frozen `settingsSnapshot` that captures the configuration at the moment a game session starts, ensuring in-game state is never affected by mid-session setting changes.

Settings are persisted to `localStorage` under the key `"settigns-storage"` (note: this is a typo in the current implementation), so they survive page refreshes.

## State

### Live Settings

These values are editable by the player and reflected immediately in the settings UI.

| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `cardCount` | `number` | `defaultGameSettings.cardCount` | Total number of cards on the board. |
| `cardsToMatch` | `number` | `defaultGameSettings.cardsToMatch` | How many cards must be flipped together to count as a match. |
| `isMoveLimited` | `boolean` | `false` | Whether the current game enforces a move limit. |
| `moveLimit` | `number` | `defaultGameSettings.moveLimit` | Maximum number of moves allowed when `isMoveLimited` is `true`. |
| `isBoardLocked` | `boolean` | `false` | When `true`, all card interactions are disabled. Managed by [`useGameControl`](../hooks/use-game-control.md), not by the player. |
| `isGameGoing` | `boolean` | `false` | Whether a game session is currently active. |

### settingsSnapshot

A frozen copy of the live settings, captured at game start via `syncSettingsSnapshot`. This is what all in-game logic reads from, ensuring consistent behaviour for the entire duration of a session.

| Field | Type | Description |
| :--- | :--- | :--- |
| `cardCount` | `number` | Card count at the time the game started. |
| `cardsToMatch` | `number` | Cards-to-match value at the time the game started. |
| `isMoveLimited` | `boolean` | Move limit toggle at the time the game started. |
| `moveLimit` | `number` | Move limit value at the time the game started. |
| `isBoardLocked` | `boolean` | Board lock state at the time the game started. |
| `isGameGoing` | `boolean` | Game going state at the time the game started. |

:::note
The snapshot is created with `Object.freeze()`, making it immutable. The only way to update it is by calling `syncSettingsSnapshot` at the start of a new session.
:::

## Actions

| Action | Signature | Description |
| :--- | :--- | :--- |
| `setCardCount` | `(value: number) => void` | Updates the live `cardCount`. |
| `setCardsToMatch` | `(value: number) => void` | Updates the live `cardsToMatch`. |
| `setIsMoveLimited` | `(value: boolean) => void` | Toggles move-limited mode. |
| `setMoveLimit` | `(value: number) => void` | Updates the live `moveLimit`. |
| `setIsBoardLocked` | `(value: boolean) => void` | Locks or unlocks the board. |
| `setIsGameGoing` | `(value: boolean) => void` | Marks the game session as active or inactive. |
| `syncSettingsSnapshot` | `() => void` | Copies all current live settings into `settingsSnapshot` and freezes the result. Called by [`useGameControl`](../hooks/use-game-control.md) at the start of every new game. |

## Persistence

This store uses Zustand's `persist` middleware. Live settings (`cardCount`, `cardsToMatch`, `isMoveLimited`, `moveLimit`) are automatically saved to and restored from `localStorage` on page load.

## Usage

Reading live settings in a component:

```js
const { cardCount, isMoveLimited, moveLimit } = useSettingsStore(state => state.settingsSnapshot);
```

Reading the snapshot inside a hook (safe for use during a game session):

```js
const { moveLimit, isMoveLimited, cardsToMatch } = useSettingsStore(state => state.settingsSnapshot);
```

Syncing the snapshot at game start (called inside [`useGameControl`](../hooks/use-game-control.md)):

```js
const syncSettingsSnapshot = useSettingsStore(state => state.syncSettingsSnapshot);
syncSettingsSnapshot();
```
