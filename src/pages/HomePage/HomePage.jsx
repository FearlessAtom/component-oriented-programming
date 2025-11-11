import { useNavigation, useSettings } from "../../providers";
import styles from "../HomePage/HomePage.module.css";
import { useForm } from "react-hook-form";
import { gameSettings } from "../../config";
import { ErrorMessage } from "@hookform/error-message"; 

function HomePage() {
    const settings = useSettings();
    const navigation = useNavigation();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: "onChange",
        defaultValues: {
            cardCount: settings.cardCount,
            isMoveLimited: settings.isMoveLimited,
            moveLimit: settings.moveLimit,
        }
    });

    const cardCount = watch("cardCount");

    return <div className={styles.container}>
        <form onSubmit={handleSubmit(() => navigation.navigate("/game"))} className={styles["modal-window"]}>
            <p style={{margin: "0 0 1rem 0"}} className={styles.label}>Number of cards</p>

            <input style={{margin: "0 0 1rem 0"}} type="number" className={styles.input} min={gameSettings.minCardCount}
                max={gameSettings.maxCardCount} step="2" {...register("cardCount", { required: true,
                min: { value: gameSettings.minCardCount, message: `The minumum number of cards is ${gameSettings.minCardCount}` },
                max: { value: gameSettings.maxCardCount, message: `The muximum number of cards is ${gameSettings.maxCardCount}` },
                onBlur: (e) => settings.saveCardCount(e.target.value)})}
            />

            <ErrorMessage errors={errors} name="cardCount"
                render={({message}) => <p className={styles["error-message"]}>{message}</p>}
            />

            <div className={styles["checkbox-label-container"]} style={{margin: "0 0 1rem 0"}}>
                <input type="checkbox" id="is-move-limited-checkbox" className={styles.checkbox} {...register("isMoveLimited",
                    { onChange: () => settings.saveIsMoveLimited(!settings.isMoveLimited) })} />

                <label className={styles.label} htmlFor="is-move-limited-checkbox">Limit the amount of moves</label>
            </div>

            {settings.isMoveLimited &&
                <>
                    <input type="number" className={styles.input} min={gameSettings.minCardCount} {...register("moveLimit",
                        { required: true, min: gameSettings.minCardCount, onChange: (e) => settings.saveMoveLimit(e.target.value), validate: value => 
                        {
                            if (value * 2 < cardCount) return "Move limit must be at least half of the number of cards!";
                            return true;
                        } })} />

                    <ErrorMessage errors={errors} name="moveLimit"
                        render={({message}) => <p className={styles["error-message"]}>{message}</p>}
                    />
                </>
            }

            <input type="submit" className={styles["play-button"]} value="Play" />
        </form>
    </div>
}

export default HomePage;
