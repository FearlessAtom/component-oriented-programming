---
id: portal
title: Portal
sibebar_label: Portal
---

# Portal

The `Portal` component is a thin wrapper around React's `createPortal` API. It renders its children **outside the main React root** (`#root`) and into a dedicated `#portal` DOM node defined in `index.html`. This is the recommended pattern for rendering UI that needs to visually escape its parent's stacking context, such as modals, tooltips, and overlays.

## Props

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `node` | **Required** | The content to be portaled into the `#portal` DOM node. |

## How It Works

The component queries the `#portal` element from the document and uses `createPortal` to mount `children` there, regardless of where `<Portal>` is placed in the component tree.

```html title="index.html"
<body>
  <div id="root"></div>
  <div id="portal"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
```

The `#portal` div sits as a sibling to `#root`, ensuring that portaled content is rendered at the top level of the DOM and is never clipped or obscured by `overflow: hidden` or `z-index` constraints from parent components.

## Usage

In `GamePage`, `Portal` wraps the `Modal` component so that the modal overlay renders at the top of the DOM tree, independent of the game board's layout:

```jsx
{ isGameResultsModalOpen && 
    <Portal>
        <Modal>
            <GameResults />
        </Modal>
    </Portal>
}
```

The full `GamePage` context shows how `Portal` is conditionally rendered based on the `isGameResultsModalOpen` flag from the board store:

```jsx
import { Board, Card, GameResults, Modal, Portal, ScoreBoard } from "../../components";
import { useBoardStore } from "../../stores";

function GamePage() {
    const isGameResultsModalOpen = useBoardStore(state => state.isGameResultsModalOpen);

    return (
        <div className={styles["board-container"]}>
            <Board>
                { cardElements }
                { isGameGoing && <ScoreBoard /> }
            </Board>
            { isGameResultsModalOpen && 
                <Portal>
                    <Modal>
                        <GameResults />
                    </Modal>
                </Portal>
            }
        </div>
    );
}
```

## Source

```jsx
import { createPortal } from "react-dom";

const modalRootEl = document.querySelector("#portal");

function Portal(props) {
    return createPortal(<>{ props.children }</>, modalRootEl);
}

export default Portal;
```
