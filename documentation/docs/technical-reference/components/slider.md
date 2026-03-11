---
id: slider
title: Slider
sibebar_label: Slider
---

# Slider

The `Slider` component is a controlled input of type `range`. It is designed to integrate with `react-hook-form` and provide real-time visual feedback of the selected value.

## Props

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `min` | `number` | **Required** | The minimum value for the slider. |
| `max` | `number` | **Required** | The maximum value for the slider. |
| `register` | `object` | **Required** | The registration object from `react-hook-form`. |
| `initialValue` | `number` | **Required** | The starting value used for the local state display. |

## Usage

The `Slider` is typically used within a form to configure game settings such as card count or move limits.

```jsx
<Slider 
  min={gameSettings.minCardCount} 
  max={gameSettings.maxCardCount} 
  initialValue={cardCount}
  register={register("cardCount", { 
    required: true,
    onBlur: (e) => setCardCount(e.target.value)
  })}
/>

```

## Source

```jsx
import { useState } from "react";
import styles from "../Slider/Slider.module.css";

function Slider({min, max, register, initialValue}) {
    const [value, setValue] = useState(initialValue);

    return <div className={styles.container}>
        <input type="range" className={styles.slider} min={min} max={max} {...register} onChange={e => setValue(e.target.value)} />
        
        <p className={styles["value"]}>{value}</p>
    </div>
}

export default Slider;
```
