---
id: configuration
title: Configuration
sidebar_label: Configuration
---

# Configuration

Game-wide constants are defined in `./src/config/index.js`. This file exports two objects: `gameSettings`, which defines the hard boundaries of what the game allows, and `defaultGameSettings`, which defines the values a new player starts with.

## `gameSettings`

Defines the minimum and maximum values that the settings UI enforces. No game session can be configured outside these bounds.

| Field | Value | Description |
| :--- | :--- | :--- |
| `minCardCount` | `4` | Minimum number of cards allowed on the board. |
| `maxCardCount` | `30` | Maximum number of cards allowed on the board. |
| `minCardsToMatch` | `2` | Minimum number of cards that must be flipped to form a match. |
| `maxCardsToMatch` | `10` | Maximum number of cards that must be flipped to form a match. |
| `maxGridColumnCount` | `6` | Maximum number of columns in the board grid. Controls layout, not card count. |

## `defaultGameSettings`

Defines the initial values loaded into `useSettingsStore` on first launch, before the player has changed anything.

| Field | Value | Description |
| :--- | :--- | :--- |
| `cardCount` | `30` | Default number of cards on the board. |
| `moveLimit` | `30` | Default move limit (only active when `isMoveLimited` is `true`). |
| `cardsToMatch` | `2` | Default number of cards per match group (standard pairs game). |

## Usage

```js
import { gameSettings, defaultGameSettings } from "../config";

// Enforcing limits in the settings UI
const clamped = Math.min(value, gameSettings.maxCardCount);

// Initializing store defaults
cardCount: defaultGameSettings.cardCount,
```

:::note
`cardCount` must always be divisible by `cardsToMatch` to produce whole pairs. If you change the defaults, make sure `defaultGameSettings.cardCount % defaultGameSettings.cardsToMatch === 0`.
:::
