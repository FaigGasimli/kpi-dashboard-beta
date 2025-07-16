import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoPlaceholder}>
          <img src="/logo.svg" alt="Logo" />
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Xoş Gəlmisiniz</h1>
          <p className={styles.subtitle}>
            Keyfiyyətli xidmət və peşəkar yanaşma ilə sizin yanınızdayıq
          </p>
          <div className={styles.notification}>Tezliklə xidmətinizdə</div>
        </section>

        <section id="elaqe" className={styles.section}>
          <h2 className={styles.sectionTitle}>Bizimlə Əlaqə</h2>
          <div className={styles.contact}>
            <div className={styles.contactInfo}>
              <p className={styles.contactItem}>
                <strong>Telefon:</strong> +994 XX XXX XX XX
              </p>
              <p className={styles.contactItem}>
                <strong>Email:</strong> info@example.com
              </p>
              <p className={styles.contactItem}>
                <strong>Ünvan:</strong> Bakı şəhəri, Azərbaycan
              </p>
            </div>
            <form className={styles.contactForm}>
              <input
                type="text"
                placeholder="Adınız"
                className={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
              />
              <textarea
                placeholder="Mesajınız"
                className={styles.textarea}
                rows={4}
              ></textarea>
              <button type="submit" className={styles.button}>
                Göndər
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>© 2025 Bütün hüquqlar qorunur</p>
      </footer>
    </div>
  );
};

export default Home;
