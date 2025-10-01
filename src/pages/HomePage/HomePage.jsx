import styles from "../HomePage/HomePage.module.css";

function HomePage({ navigate })
{
    return <div className={styles.container}>
        <p className={styles.header_text}>Memory card game</p>

        <button
            className={styles.play_button}
            onClick={ () => navigate("/game") }
        >Play</button>
    </div>
}

export default HomePage;
