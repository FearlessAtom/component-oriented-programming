import styles from "../Board/Board.module.css";

function Board({  children })
{
    return <div className={ styles.board }>
        { children }
    </div>
}

export { Board };
