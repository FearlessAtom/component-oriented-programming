---
id: result-entry
title: ResultEntry
sibebar_label: ResultEntry
---

# ResultEntry

The `ResultEntry` component renders a single game result as a summary card. It displays the outcome badge, move stats, card count, pairs, and final score for one completed game session. It is a **presentational component** — it receives all data via props and emits a click event for navigation.

## Props

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `result` | `object` | **Required** | The result data object. See [Result Object Shape](#result-object-shape) below. |
| `index` | `number` | **Required** | The 1-based display index shown as `#1`, `#2`, etc. |
| `onClick` | `function` | **Required** | Callback triggered when the card is clicked, typically used to navigate to the full result detail page. |

## Result Object Shape

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string \| number` | Unique identifier for the result, used as a React key and for navigation. |
| `percentage` | `number` | Final score as a percentage (0–100). A value of `100` renders a **Victory** badge; anything less renders a **Loss** badge. |
| `moves` | `number` | Number of moves made during the game. |
| `moveLimit` | `number` | The move cap for the session. Only relevant when `isMoveLimited` is `true`. |
| `isMoveLimited` | `boolean` | When `true`, the moves stat displays as "Moves left out of N" instead of total moves used. |
| `cards` | `array` | The array of cards in the game. Its `length` is used to compute card count and pairs. |
| `cardsToMatch` | `number` | Number of cards that form a matching group, used to derive pair count (`cards.length / cardsToMatch`). |

## Usage

In `ResultsPage`, results are pulled from `useResultsStore`, mapped to `ResultEntry` components in reverse chronological order, and each one navigates to its detail route on click:

```jsx
const results = useResultsStore(state => state.results);

let resultEntries = results.map((result, index) => (
    <ResultEntry
        onClick={() => navigate("/results/" + result.id)}
        result={result}
        index={index + 1}
        key={result.id}
    />
));

resultEntries = resultEntries.reverse();
```

## Displayed Stats

Each `ResultEntry` card renders the following stats:

| Stat | Condition | Displayed Value |
| :--- | :--- | :--- |
| Moves | `isMoveLimited: false` | Total moves used |
| Moves left | `isMoveLimited: true` | `moveLimit - moves` out of `moveLimit` |
| Cards | Always | `cards.length` |
| Pairs | Always | `cards.length / cardsToMatch` |
| Score | Always | `percentage`% |
