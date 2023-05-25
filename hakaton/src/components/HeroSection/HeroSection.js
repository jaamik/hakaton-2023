import React from 'react'
import styles from './HeroSection.module.scss';

export default function HeroSection() {
  return (
    <div className={styles.hero_wrapper}>
      <div className={styles.hero}>
        <div className={styles.hero_left}>
          <h3>"Магнат" - доставка вкуснейших блюд прямо к вашей двери! </h3>
          <p>Мы предлагаем доставку вкуснейших блюд прямо к вашей двери. Закажите прямо сейчас и наслаждайтесь вкусом настоящей национальной кухни!</p>
          <a href='#menu'>
            <button >Заказать еду</button>
          </a>
        </div>
        <div className={styles.hero_right}>

        </div>

      </div>
    </div>
  )
}
