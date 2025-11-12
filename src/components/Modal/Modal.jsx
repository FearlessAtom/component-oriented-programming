import styles from "../Modal/Modal.module.css";

function Modal(props)
{
    return <>
        <div className={styles.container}>{ props.children } </div>
        <div className={styles.background}> </div>
    </>
}

export { Modal };
