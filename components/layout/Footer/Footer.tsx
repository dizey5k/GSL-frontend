import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/constants";
import styles from "./Footer.module.scss";
import { Fragment } from "react/jsx-runtime";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.desc}>
          Статистика каптов, семей и игроков Majestic RP.
          <br />
          Фан-проект. Не связан с Majestic RP и не является официальным
          ресурсом.
          <br />
          Данные предоставлены{" "}
          <a
            href="https://majestic-rp.ru/"
            target="_blank"
            rel="noopener noreferrer"
          >
            majestic-rp.ru
          </a>
          .
        </p>

        <nav className={styles.links}>
          {FOOTER_LINKS.map((link, index) => (
            <Fragment key={link.href}>
              <Link href={link.href}>{link.label}</Link>
              {index < FOOTER_LINKS.length - 1 && (
                <span className={styles.sep}>·</span>
              )}
            </Fragment>
          ))}
        </nav>

        <p className={styles.copy}>© 2026 GSL.BEST. Все права защищены.</p>
      </div>
    </footer>
  );
}
