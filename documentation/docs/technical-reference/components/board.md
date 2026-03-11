---
id: board
title: Board
sibebar_label: Board
---

# Board

The `Board` component is a flexible grid container that dynamically calculates its layout based on the number of cards in the current game settings. It acts as the primary layout wrapper for the game tiles.

## Props

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `node` | **Required** | The elements to be rendered inside the grid (typically an array of `Card` components). |

## Usage

The `Board` is used within the `GamePage` to wrap the mapped `cardElements`:

```jsx
<Board>
    { cardElements }
    { isGameGoing && <ScoreBoard /> }
</Board>
```

## Source

```jsx
import { useSettingsStore } from "../../stores";
import styles from "../Board/Board.module.css";

const getGridColumnCount = (cardCount) => {
    let root = Math.floor(Math.sqrt(cardCount));
    while (cardCount % root != 0) {
        root = root - 1;
    }

    return Number(cardCount / root);
}

function Board({ children }) {
    const { cardCount } = useSettingsStore(state => state.settingsSnapshot);

    console.log(cardCount);

    const gridColumnCount = getGridColumnCount(cardCount);

    return <div className={styles.board} style={{ gridTemplateColumns: `repeat(${gridColumnCount}, 1fr)` }}>
        { children }
    </div>
}

export default Board;
```
