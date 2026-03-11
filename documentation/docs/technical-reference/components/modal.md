---
id: modal
title: Modal
sibebar_label: Modal
---

# Modal

The `Modal` component is a **presentational wrapper** that renders an overlay dialog on top of the application. It outputs two elements: a centered content container and a full-screen background overlay. It is always used together with the [`Portal`](./portal.md) component, which ensures the modal is mounted outside the main `#root` DOM node and is never obscured by parent layout or stacking contexts.

## Props

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `node` | **Required** | The content to render inside the modal container (e.g. `<GameResults />`). |

## Usage

`Modal` should always be wrapped in a `Portal` so it renders at the top of the DOM tree. In `GamePage`, it is conditionally shown based on the `isGameResultsModalOpen` flag from the board store:

```jsx
{ isGameResultsModalOpen && 
    <Portal>
        <Modal>
            <GameResults />
        </Modal>
    </Portal>
}
```

:::info
`Modal` handles **layout and styling only** — it has no open/close logic of its own. Visibility is controlled by the parent, in this case by the `isGameResultsModalOpen`.
:::

## Source

```jsx
import styles from "../Modal/Modal.module.css";

function Modal(props) {
    return <>
        <div className={styles.container}>{ props.children }</div>
        <div className={styles.background}></div>
    </>
}

export default Modal;
```
