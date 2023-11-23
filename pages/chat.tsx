import styles from "../styles/chat.module.scss";

function chat() {
  return (
    <div className={styles.background}>
      <img src="/background.png" alt="background" className={styles.image} />
    </div>
  );
}

export default chat;
