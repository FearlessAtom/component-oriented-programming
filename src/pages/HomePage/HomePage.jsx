import styles from "../HomePage/HomePage.module.css";
import { useForm } from "react-hook-form";
import { gameSettings } from "../../config";
import { ErrorMessage } from "@hookform/error-message"; 
import { useNavigate } from "react-router";
import Slider from "../../components/Slider/Slider";
import { useSettingsStore } from "../../stores";
import { useGameControl } from "../../hooks";

function HomePage() {
    const cardCount = useSettingsStore(state => state.cardCount);
    const setCardCount = useSettingsStore(state => state.setCardCount);
    const cardsToMatch = useSettingsStore(state => state.cardsToMatch);
    const setCardsToMatch = useSettingsStore(state => state.setCardsToMatch);
    const isMoveLimited = useSettingsStore(state => state.isMoveLimited);
    const setIsMoveLimited = useSettingsStore(state => state.setIsMoveLimited);
    const moveLimit = useSettingsStore(state => state.moveLimit);
    const setMoveLimit = useSettingsStore(state => state.setMoveLimit);
    const isGameGoing = useSettingsStore(state => state.isGameGoing);

    const { resetGame } = useGameControl();

    const navigate = useNavigate();

    const onPlay = () => {
        resetGame();
        navigate("/game");
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        defaultValues: { cardCount, isMoveLimited, moveLimit, cardsToMatch}
    });

    return <div className={styles.container}>
        <div>
            <form onSubmit={handleSubmit(onPlay)} className={styles["modal-window"]}>
                <p style={{margin: "0 0 1rem 0"}} className={styles.label}>Number of cards</p>

                <Slider min={gameSettings.minCardCount} max={gameSettings.maxCardCount} initialValue={cardCount}
                    register={register("cardCount", { required: true,
                        min: { value: gameSettings.minCardCount, message: `The minumum number of cards is ${gameSettings.minCardCount}!` },
                        max: { value: gameSettings.maxCardCount, message: `The muximum number of cards is ${gameSettings.maxCardCount}!` },
                        onBlur: (e) => setCardCount(e.target.value), validate: (value) => {
                            if (value % cardsToMatch != 0) return `The number of cards must be divisible by ${cardsToMatch}!`;
                            return true;
                        }})}
                ></Slider>

                <ErrorMessage errors={errors} name="cardCount"
                    render={({message}) => <p className={styles["error-message"]}>{message}</p>}
                />

                <p style={{margin: "0 0 1rem 0"}} className={styles.label}>Number of cards to match</p>

                <Slider min={gameSettings.minCardsToMatch} max={gameSettings.maxCardsToMatch} initialValue={cardsToMatch}
                    register={register("cardsToMatch", { required: true, onBlur: (e) => setCardsToMatch(e.target.value),
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
                        { onChange: () => setIsMoveLimited(!isMoveLimited) })} />

                    <label className={styles.label} htmlFor="is-move-limited-checkbox">Limit the amount of moves</label>
                </div>

                {isMoveLimited &&
                    <>
                        <Slider min={gameSettings.minCardCount / gameSettings.minCardsToMatch}
                            initialValue={moveLimit} register={register("moveLimit",
                            { required: true, onBlur: (e) => setMoveLimit(e.target.value), validate: value => {
                                if (value * 2 < cardCount) return "Move limit must be at least half of the number of cards!";
                                return true;
                            } })}
                        ></Slider>

                        <ErrorMessage errors={errors} name="moveLimit"
                            render={({message}) => <p className={styles["error-message"]}>{message}</p>}
                        />
                    </>
                }

                { isGameGoing ?
                    <input type="submit" className={styles["button"] + " " + styles["play-button"]} value="New Game" />
                    :
                    <input type="submit" className={styles["button"] + " " + styles["play-button"]} value="Play" />
                }
            </form>

            { isGameGoing &&

                <button className={styles["button"] + " " + styles["results-button"]}
                     onClick={() => navigate("/game")}
                >Continue</button>
            }
            

            <button className={styles["button"] + " " + styles["results-button"]}
                 onClick={() => navigate("/results")}
            >Results</button>
        </div>
    </div>
}

export default HomePage;
