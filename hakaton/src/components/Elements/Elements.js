import Image from 'next/image'
import React from 'react'
import styles from './Elements.module.scss'
import quick from '../../assets/img/fast.png';
import foodServing from '../../assets/img/foodServing.png';
import delivery from '../../assets/img/delivery.png';

export default function Elements() {
  const elements = [
    {
      name: 'БЫСТРО',
      description: 'Быстрый и удобный сервис доставки - надежный путь получить заказ вовремя и без лишних хлопот.',
      img: quick
    },
    {
      name: 'ВКУСНО',
      description: 'Отведайте наши блюда и ощутите настоящее наслаждение - только у нас вкусно и качественно!',
      img: foodServing
    },
    {
      name: 'БЕСПЛАТНАЯ ДОСТАВКА',
      description: 'Наши клиенты заслуживают лучшего - бесплатная доставка при заказе от определенной суммы в нашем сервисе',
      img: delivery
    },
  ]
  return (
    <div className={styles.elements}>
      {elements.map((item, index) => (
        <div key={item.name} className={styles.elements_inner}>
          <div className={styles.elements_inner_left}>
            <Image
              src={item.img}
              alt="img-element"
              width={100}
              height={100}
            />
          </div>
          <div className={styles.elements_inner_right}>
            <h4>{item.name}</h4>
            <p>{item.description}</p>
          </div>
        </div>
      ))}

    </div>
  )
}
