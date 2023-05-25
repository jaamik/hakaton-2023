import Title from '@/kid/title/title'
import React from 'react'
import AboutCard from '../AboutCard/AboutCard'
import styles from './AboutUs.module.scss';
import cardImg1 from '../../assets/img/restaurant.png';
import cardImg2 from '../../assets/img/kitchen.png';
import cardImg3 from '../../assets/img/food-delivery.png';

export default function AboutUs() {
  const desc1 = 'Мы предлагаем своим гостям настоящую национальную кухню. Чайхана расположена в уютном зале, оформленном в национальном стиле, с ковровыми дорожками, мягкими диванами и кованой мебелью.'
  const desc2 = 'В меню включено множество блюд, изготовленных по оригинальным рецептам. В числе наиболее популярных блюд - плов, лагман, манты, супы, салаты и десерты. Все блюда готовятся только из свежих и качественных ингредиентов, приготовление которых контролируется опытными повара.'
  const desc3 = 'Мы предлагаем услуги доставки еды на дом. Вы можете заказать любимые блюда прямо на сайте или по тлефону и наслаждаться вкусом национальной кухни у себя дома. Все блюда упаковываются в специальные контейнеры, чтобы сохранить свежесть и аромат'
  const title1 = 'Чайхана Магнат';
  const title2 = 'Наше Меню';
  const title3 = 'Услуги';
  return (
    <div id='about' className={styles.about}>
      <Title text={'Чайхана '} linedText={'Магнат'} />
      <div className={styles.about_inner}>
        <AboutCard title={title1} desc={desc1} img={cardImg1} />
        <AboutCard title={title2} desc={desc2} img={cardImg2} />
        <AboutCard title={title3} desc={desc3} img={cardImg3} />
      </div>
    </div>
  )
}
