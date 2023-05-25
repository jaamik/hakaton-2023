import Link from 'next/link';
import styles from './Footer.module.scss';
export default function Footer() {

  const footerItems = [
    {
      title: 'Магнат',
      description: 'Доставка вкуснейших блюд прямо к вашей двери!'
    },
    {
      title: 'Лучшая чайхана в городе',
      description: `Спасибо, что выбираете нас - ждем Вас вновь в чайхане`
    },
    {
      title: 'Доставка',
      description: `Мы предлагаем доставку вкуснейших вкуснейших блюд прямо к вашей двери!`
    },
    {
      title: '+996 755 551 707',
      description: ' Г. Ош, микрарайон Анар, 1В/2',
      isNumber: true
    },
  ]
  return (
    <div id='contacts' className={styles.footer_wrapper}>
      {footerItems.map((item, index) => (
        <div 
          key={item.description}
          className={styles.footer_card}
        >
          {item.isNumber ? 
            <h3>
              <Link style={{color: 'white', textDecoration: 'none'}} href={'tel:+996755551707'}>{item.title}</Link>
            </h3>
            : 
            <h3>{item.title}</h3>
          }
          <span> {item.description} </span>
        </div>
      ))}
    </div>
  )
}
