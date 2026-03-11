---
id: results-store
title: resultsStore
sidebar_label: resultsStore
---

# useResultsStore

`useResultsStore` is a **persisted Zustand store** that holds the history of completed game sessions. It stores up to the **10 most recent results**, automatically discarding older entries as new ones are added. Results are persisted to `localStorage` under the key `"results-storage"` and survive page refreshes.

## State

| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `results` | `array` | `[]` | An ordered list of completed game result objects, capped at 10 entries. The most recent result is always at the end of the array. |

For the shape of each result object, see [`ResultEntry` — Result Object Shape](../components/result-entry.md#result-object-shape).

## Actions

| Action | Signature | Description |
| :--- | :--- | :--- |
| `addResult` | `(result: object) => void` | Appends a new result to the list and trims the array to the 10 most recent entries. |
| `clearResults` | `() => void` | Empties the results list entirely. |
| `findResultById` | `(id: string \| number) => object \| undefined` | Looks up a single result by its `id`. Reads directly from `getState()` rather than subscribed state, so it is safe to call outside of React's render cycle. |

:::note
`addResult` uses `.slice(-10)` to enforce the 10-result cap. When the list is full, the oldest result (index 0) is dropped to make room for the new one.
:::

## Persistence

This store uses Zustand's `persist` middleware. The full `results` array is automatically saved to and restored from `localStorage` under the key `"results-storage"` on page load.

## Usage

Adding a result at the end of a game (called inside [`useGameControl`](../hooks/use-game-control.md)):

```js
const addResult = useResultsStore(state => state.addResult);

addResult({
    id: get_uuid(),
    cards,
    moves,
    isMoveLimited,
    moveLimit,
    cardsToMatch,
    percentage,
});
```

Reading all results in `ResultsPage`:

```js
const results = useResultsStore(state => state.results);
```

Looking up a specific result by ID (e.g. on a result detail page):

```js
const result = useResultsStore.getState().findResultById(id);
```
