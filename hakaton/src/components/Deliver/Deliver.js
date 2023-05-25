import Image from 'next/image';
import React from 'react';
import deliverImg from '../../assets/img/home-delivery.jpg';
import clock from '../../assets/img/time.png';
import calendar from '../../assets/img/calendar.png';
import styles from './Deliver.module.scss';
import Title from '@/kid/title/title';
import Link from 'next/link';

export default function Deliver() {
  return (
    <>
      <Title id='payment_order' text={'Доставка и оплата'} />
      <div className={styles.deliver}>
        <div className={styles.deliver_left}>
          <Image
            src={deliverImg}
            alt="img-delivery"
            width={'100%'}
            height={'100%'}
          />
        </div>
        <div className={styles.deliver_right}>
          <div className={styles.deliver_right_inner_card}>
            <div className={styles.deliver_right_inner_card_block}>
              <Image
                src={clock}
                alt="img-delivery-2"
                width={70}
                height={70}
              />
              <div className={styles.time_work}>c 11:00 по 23:00</div>
              <div>Время доставки может меняться в зависимости от загруженности ресторана.</div>
            </div>
            <div className={styles.deliver_right_inner_card_block}>
              <Image
                src={calendar}
                alt="img-delivery-3"
                width={70}
                height={70}
              />
              <div className={styles.time_work}>c ПН по ВС</div>
              <div>Чайхана открыта ежедневно с понедельника по воскресенье.</div>
            </div>
          </div>
          <div className={styles.deliver_right_inner_btns}>
            <Link href="#menu">
              <button>Заказать еду</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
