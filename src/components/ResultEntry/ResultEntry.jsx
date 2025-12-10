import styles from "./ResultEntry.module.css";

function ResultEntry({ result, index, onClick }) {
    return <div>
        <div className={ styles.result_card } onClick={ onClick }>
            <div className={ styles.result_header }>
                <div className={ styles.result_title }>
                    <span className={ styles.result_number }>#{ index }</span>
                </div>
                { result.percentage === 100 ?
                    <span className={`${styles.badge} ${styles.badge_victory}`}>
                        Victory
                    </span>
                    :
                    <span className={`${styles.badge} ${styles.badge_loss}`}>
                        Loss
                    </span>
                }
            </div>

            <div className={ styles.result_stats }>
                <div className={ styles.stat_item }>
                    <div className={ styles.stat_info }>
                        { result.isMoveLimited ? 

                            <>
                                <div className={ styles.stat_title }>Moves left out of { result.moveLimit }</div>
                                <div className={ styles.stat_number }>{ result.moveLimit - result.moves }</div>
                            </>
                        :
                            <>
                                <div className={ styles.stat_title }>Moves</div>
                                <div className={ styles.stat_number }>{result.moves}</div>
                            </>
                        }

                    </div>
                </div>

                <div className={ styles.stat_item }>
                    <div className={ styles.stat_info }>
                        <div className={ styles.stat_title }>Cards</div>
                        <div className={ styles.stat_number }>
                            { result.cards ? result.cards.length : 0 }
                        </div>
                    </div>
                </div>

                <div className={ styles.stat_item }>
                    <div className={ styles.stat_info }>
                        <div className={ styles.stat_title }>Pairs</div>
                        <div className={ styles.stat_number }>
                            { result.cards.length / result.cardsToMatch }
                        </div>
                    </div>
                </div>

                <div className={ styles.stat_item }>
                    <div className={ styles.stat_info }>
                        <div className={ styles.stat_title }>Score</div>
                        <div className={ styles.stat_number }>{ result.percentage }%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ResultEntry;
