---
id: timer-store
title: timerStore
sidebar_label: timerStore
---

# useTimerStore

`useTimerStore` is a **persisted Zustand store** that manages the in-game timer. It tracks elapsed seconds and controls a `setInterval` internally, exposing simple `start`, `stop`, `reset`, and `cleanup` actions.

Only `seconds` is persisted to `localStorage` — the `intervalId` is excluded via `partialize` since interval handles are not serializable and must always be recreated fresh on page load.

## State

| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `seconds` | `number` | `0` | Elapsed seconds since the timer was last started. |
| `intervalId` | `number \| null` | `null` | The ID returned by `setInterval`. `null` when the timer is not running. |

## Actions

| Action | Signature | Description |
| :--- | :--- | :--- |
| `start` | `() => void` | Starts the timer by registering a 1-second interval that increments `seconds`. No-ops if an interval is already running. |
| `stop` | `() => void` | Clears the interval and sets `intervalId` to `null`. No-ops if no interval is active. |
| `reset` | `() => void` | Calls `stop`, then resets `seconds` to `0`. |
| `cleanup` | `() => void` | Clears the interval without resetting `seconds`. Intended for unmount scenarios where elapsed time should be preserved. |

## Action Behaviour Details

### `start`
Guards against double-starting by checking whether `intervalId` is already set. This means calling `start` while the timer is running is always safe and has no effect.

### `stop` vs `cleanup`
Both clear the active interval, but they differ in intent:

| | `stop` | `cleanup` |
| :--- | :--- | :--- |
| Clears interval | ✅ | ✅ |
| Resets `seconds` | ❌ | ❌ |
| Sets `intervalId` to `null` | ✅ | ✅ |
| Use case | Pausing / ending the game | Component unmount |

## Persistence

This store uses Zustand's `persist` middleware with `partialize` to selectively persist only `seconds`. The `intervalId` is intentionally excluded.

The persistence key is `"timer-storage"`.

## Usage

```js
const startTimer = useTimerStore(state => state.start);
const stopTimer = useTimerStore(state => state.stop);
const seconds = useTimerStore(state => state.seconds);
```

In `GamePage`, the timer is started and stopped in sync with the `/game` route:

```js
useEffect(() => {
    if (location.pathname === "/game") {
        startTimer();
    } else {
        stopTimer();
    }
    return () => stopTimer();
}, [location.pathname]);
```
