"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { BurgerIcon } from "@/components/ui/Icons/BurgerIcon";
import { ChevronIcon } from "@/components/ui/Icons/ChevronIcon";
import styles from "./Header.module.scss";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            GSL.BEST
          </Link>

          <button
            className={styles.burger}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            <BurgerIcon width={20} height={20} />
          </button>

          <div className={`${styles.mid} ${isMenuOpen ? styles.open : ""}`}>
            {NAV_LINKS.map((item) => {
              if (item.dropdown) {
                const isOpen = openDropdown === item.label;
                return (
                  <div className={styles.dropdown} key={item.label}>
                    <button
                      className={styles.dropdownToggle}
                      onClick={() => toggleDropdown(item.label)}
                    >
                      {item.label}
                      <ChevronIcon
                        className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
                      />
                    </button>
                    <div
                      className={`${styles.dropdownPanel} ${isOpen ? styles.open : ""}`}
                    >
                      {item.dropdown.map((sub) => (
                        <Link key={sub.href} href={sub.href}>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link key={item.href} href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className={styles.right}>
            <div className={styles.onlinePill}>
              <span className={styles.onlineDot}></span>
              <span>
                <b>75</b> онлайн
              </span>
            </div>

            <div className={styles.userWrap}>
              <div className={styles.user}>
                <div className={styles.userInfo}>
                  <div className={styles.userName}>.Dizey 5K</div>
                  <div className={styles.userClan}>без клана</div>
                </div>
                <div className={styles.userAvatar}>
                  <Image
                    src="https://cdn.discordapp.com/avatars/318303108910415876/76cf699597085f37c4645e134c5d5a50.png"
                    alt="Аватар пользователя"
                    width={44}
                    height={44}
                    unoptimized // для внешних URL Discord (можно убрать, если настроен next.config)
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
