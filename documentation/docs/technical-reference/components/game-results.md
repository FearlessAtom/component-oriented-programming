---
id: game-results
title: GameResults
sibebar_label: GameResults
---

# Game Results

The `GameResults` component provides a summary of the user's performance at the end of a game session. It displays the outcome (Victory or Loss), time elapsed, moves taken, and percentage.

## Usage

This component is typically rendered inside a `Modal` and `Portal` on the `GamePage` when the game concludes.

```jsx
{ isGameResultsModalOpen && 
    <Portal>
        <Modal>
            <GameResults />
        </Modal>
    </Portal>
}
