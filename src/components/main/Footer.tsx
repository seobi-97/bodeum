import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyRight}>2023. Team Buddy All right reserved.</p>
      <p className={styles.copyRight}>Bodeum</p>
    </footer>
  );
}

export default Footer;
