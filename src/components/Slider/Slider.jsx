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
