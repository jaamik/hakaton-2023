import { Navbar, Link, Text } from "@nextui-org/react";
import { useState } from "react";
import { Box } from "./Box.js";
import styles from './Header.module.scss'
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import Notification from "../Notification/Notification.js";
import Image from "next/image.js";
import basketIcon from '../../assets/img/basket.jsx'
import { useRouter } from "next/router.js";
import BasketIcon from "../../assets/img/basket.jsx";

export default function Header({ handleOpenBasket, disabled, anotherPage }) {
  const [isActive, setIsActive] = useState(false);
  const { basket, isAddedToBasket } = useSelector((state) => state.food);
  const router = useRouter()

  const id = uuidv4();
  const wrapperId = `box=${id}`

  const handlePress = (index, link) => {
    if (!disabled) {
      setIsActive((prev) => index);
    }
    if (anotherPage) {
      console.log('HERE-LOG');
      setIsActive((prev) => index);
      router.push('/#' + link)
    }
  }
  const navItems = [
    {
      name: 'Меню',
      link: 'menu'
    },
    {
      name: 'О нас',
      link: 'about'
    },
    {
      name: 'Доставка и Оплата',
      link: 'payment_order'
    },
    {
      name: 'Контакты',
      link: 'contacts'
    },
  ]
  return (
    <Box
      id={wrapperId}
      css={{
        maxW: "100%",
        position: 'sticky',
        top: '0',
        zIndex: '20',
        background: 'white'
      }}
    >
      <Navbar id={id + 'nav'} className={styles.header_nav}>
        <Navbar.Brand>
          <Navbar.Toggle className={styles.test} aria-label="toggle navigation" />
          <Text style={{margin: '0 0 0 20px', fontFamily: 'fangsong'}}>
            Oligarch
          </Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
          {navItems.map((item, index) => (
            <Link
              className={`
                ${styles.navbar__inner_item}
                ${isActive === index ? styles.navbar__inner_item_active : ''}`
              }
              onClick={() => handlePress(index, item.link)}
              key={item.link}
              href={'#' + item.link}
            >
              {item.name}
            </Link>
          ))}
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <Link href="tel:+996755551707" style={{color: 'black'}}>
              +996 (755) 551-707
            </Link>
          </Navbar.Item>
          <div color="inherit" style={{cursor: 'pointer', position: 'relative'}}
            onClick={() => !disabled && handleOpenBasket('basket')}
          >
            <Notification isOpen={isAddedToBasket} title={"Успешно добавлено!"} duration={1500} />
            {/* <Image className={styles.iconBasket} src={basketIcon} alt="icon-header" /> */}
            <BasketIcon />
            <span className={styles.basketCount}>{basket?.length}</span>
          </div>
        </Navbar.Content>
        <Navbar.Collapse>
          {navItems.map((item, index) => (
            <Navbar.CollapseItem key={item.name}>
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href={"#" + item.link}
                onClick={() => handlePress(index, item.link)}
              >
                {item.name}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </Box>
  )
}