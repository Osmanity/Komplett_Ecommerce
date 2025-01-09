import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.campaignHero}>
        <img
          alt="Helt Galna Priser"
          className={styles.mainImage}
          loading="lazy"
          title="Helt Galna Priser"
          src="https://www.komplett.se/marketingmedia/161147/k_lowprices_q424_pt1_motherbrd_se.jpg"
        />
        <img
          alt="Månadens gaming deals"
          className={styles.secondaryImage}
          loading="lazy"
          title="Månadens gaming deals"
          src="https://www.komplett.se/marketingmedia/153652/k_mgd_q324_gamerlivingroom_amd_servicebrd_se.jpg"
        />
      </div>
    </div>
  );
}

export default Home;
