import { useState } from "react";
import styles from "../Slider/Slider.module.css";

function Slider({ min=0, max=100, register, initialValue=0 }) {
    const [value, setValue] = useState(initialValue);

    return <div className={ styles.container }>
        <input
            type="range"
            { ...register }
            className={ styles.slider }
            min={ min }
            max={ max }
            onChange={ e => setValue(e.target.value) }
            defaultValue={ initialValue }
        />
        
        <p className={styles["value"]}>{ value }</p>
    </div>
}

export default Slider;
