---
id: score-board
title: ScoreBoard
sibebar_label: ScoreBoard
---

# ScoreBoard

The `ScoreBoard` component renders a live heads-up display during an active game session. It reads directly from three stores — settings, score, and timer — and displays the current timer, move count, and match percentage in real time. It also provides a **Main Menu** button that navigates the player back to the home route.

## Props

This component takes no props. All data is sourced internally from global stores.

## Store Dependencies

| Store | Fields Used | Description |
| :--- | :--- | :--- |
| `useSettingsStore` | `settingsSnapshot.moveLimit`, `settingsSnapshot.isMoveLimited` | Reads the move cap and whether the current game enforces a move limit. |
| `useScoreStore` | `moves`, `percentage` | Current number of moves made and the live match percentage. |
| `useTimerStore` | `seconds` | Elapsed seconds, formatted for display via `formatSeconds`. |

## Displayed Stats

| Label | Condition | Displayed Value |
| :--- | :--- | :--- |
| Timer | Always | Elapsed time, formatted by `formatSeconds(seconds)` |
| Moves | `isMoveLimited: false` | Total moves used |
| Moves left | `isMoveLimited: true` | `moveLimit - moves` left |
| Percentage | Always | Current match score as `percentage`% |

## Usage

`ScoreBoard` is rendered inside `Board` on the `GamePage`, conditionally shown while a game session is active via the `isGameGoing` flag:

```jsx
<Board>
    { cardElements }
    { isGameGoing && <ScoreBoard /> }
</Board>
```

It is unmounted as soon as `isGameGoing` becomes `false` (e.g. when the game ends and the results modal opens), so it never displays stale stats over the `GameResults` modal.

:::note
`ScoreBoard` reads from `settingsSnapshot` rather than live settings. This ensures the move limit displayed during a game reflects the settings that were active **when the game started**, and is not affected by any settings changes made mid-session.
:::
