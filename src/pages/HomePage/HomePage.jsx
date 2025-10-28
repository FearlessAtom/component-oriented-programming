import { useRef } from "react";
import { useSettings } from "../../providers";
import styles from "../HomePage/HomePage.module.css";

function HomePage({ navigate })
{
    const settings = useSettings();
    const inputRef = useRef();

    const play = () =>
    {
        settings.setCardCount(inputRef.current.value);
        navigate("/game");
    }

    return (
        <div className={styles.container}>
            <div>
                <input ref={inputRef} style={{fontSize: 30}} type="number"
                    defaultValue={12} min="2" max="24" step="2"/>

                <button className={styles.play_button}onClick={play}>
                    Play
                </button>
            </div>
        </div>
    );
}

export default HomePage;
