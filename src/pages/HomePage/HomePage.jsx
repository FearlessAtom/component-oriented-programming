import { useSettings } from "../../providers";
import styles from "../HomePage/HomePage.module.css";
import { useForm } from "react-hook-form";
import { gameSettings } from "../../config";
import { ErrorMessage } from "@hookform/error-message"; 
import { useNavigate } from "react-router";
import Slider from "../../components/Slider/Slider";

function HomePage() {
    const settings = useSettings();
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: "onBlur",
        defaultValues: {
            cardCount: settings.cardCount,
            isMoveLimited: settings.isMoveLimited,
            moveLimit: settings.moveLimit,
            cardsToMatch: settings.cardsToMatch,
        }
    });

    const cardCount = watch("cardCount");
    const cardsToMatch = watch("cardsToMatch");

    return <div className={styles.container}>
        <div>
            <form onSubmit={handleSubmit(() => navigate("/game"))} className={styles["modal-window"]}>
                <p style={{margin: "0 0 1rem 0"}} className={styles.label}>Number of cards</p>

                <Slider min={gameSettings.minCardCount} max={gameSettings.maxCardCount} initialValue={settings.cardCount}
                    register={register("cardCount", { required: true,
                        min: { value: gameSettings.minCardCount, message: `The minumum number of cards is ${gameSettings.minCardCount}!` },
                        max: { value: gameSettings.maxCardCount, message: `The muximum number of cards is ${gameSettings.maxCardCount}!` },
                        onBlur: (e) => settings.saveCardCount(e.target.value), validate: (value) => {
                            if (value % cardsToMatch != 0) return `The number of cards must be divisible by ${cardsToMatch}!`;
                            return true;
                        }})}
                ></Slider>

                <ErrorMessage errors={errors} name="cardCount"
                    render={({message}) => <p className={styles["error-message"]}>{message}</p>}
                />

                <p style={{margin: "0 0 1rem 0"}} className={styles.label}>Number of cards to match</p>

                <Slider min={gameSettings.minCardsToMatch} max={gameSettings.maxCardsToMatch} initialValue={settings.cardsToMatch}
                    register={register("cardsToMatch", { required: true, onBlur: (e) => settings.saveCardsToMatch(e.target.value),
                        min: { value: gameSettings.minCardsToMatch, message: `The minimum number of cards to match is ${gameSettings.minCardsToMatch}` },
                        validate: (value) => {
                            if (value * 2 > cardCount) return "You need more cards in the game to match this many at once!";
                            return true;
                        }})}
                ></Slider>

                <ErrorMessage errors={errors} name="cardsToMatch"
                    render={({message}) => <p className={styles["error-message"]}>{message}</p>}
                />

                <div className={styles["checkbox-label-container"]} style={{margin: "0 0 1rem 0"}}>
                    <input type="checkbox" id="is-move-limited-checkbox" className={styles.checkbox} {...register("isMoveLimited",
                        { onChange: () => settings.saveIsMoveLimited(!settings.isMoveLimited) })} />

                    <label className={styles.label} htmlFor="is-move-limited-checkbox">Limit the amount of moves</label>
                </div>

                {settings.isMoveLimited &&
                    <>
                        <Slider min={gameSettings.minCardCount / gameSettings.minCardsToMatch}
                            initialValue={settings.moveLimit} register={register("moveLimit",
                            { required: true, onBlur: (e) => settings.saveMoveLimit(e.target.value), validate: value => {
                                if (value * 2 < cardCount) return "Move limit must be at least half of the number of cards!";
                                return true;
                            } })}
                        ></Slider>

                        <ErrorMessage errors={errors} name="moveLimit"
                            render={({message}) => <p className={styles["error-message"]}>{message}</p>}
                        />
                    </>
                }

                <input type="submit" className={styles["button"] + " " + styles["play-button"]} value="Play" />
            </form>

            <button className={styles["button"] + " " + styles["results-button"]}
                 onClick={() => navigate("/results")}
            >Results</button>
        </div>
    </div>
}

export default HomePage;
