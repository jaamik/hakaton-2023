import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AboutUs from '@/components/AboutUs/AboutUs';
import Basket from '@/components/Basket/Basket';
import Deliver from '@/components/Deliver/Deliver';
import Elements from '@/components/Elements/Elements';
import Footer from '@/components/Footer/Footer';
import HeroSection from '@/components/HeroSection/HeroSection';
import Menu from '@/components/Menu/Menu';
import { getAllMenu, isTokenRefresh } from '@/store/menu.slice';
import Header from '@/components/Header/Header';
import styles from '../styles/home.module.scss'
import { v4 as uuidv4 } from 'uuid';
import EditModal from '@/components/EditModal/EditModal';
import PhoneModal from '@/components/Phonemodal/Phonemodal';

export default function Home() {
  const [isOpenBasket, setIsOpenBasket] = useState(false);
  const [isOpenPhone, setIsOpenPhone] = useState(false);
  const dispatch = useDispatch();
  const { menu, toggleEditModal, basket } = useSelector((state) => state.food);
  const id = uuidv4();


  const handleOpenBasket = () => {
    setIsOpenBasket(true)
  }

  const handleCloseBasket = () => {
    setIsOpenBasket(false)
  }
  const handleOpenPhonemodal = () => {
    setIsOpenPhone(true)
  }
  const handleClosePhonemodal = () => {
    setIsOpenPhone(false)
  }

  useEffect(() => {
    dispatch(getAllMenu());
    dispatch(isTokenRefresh());
  }, [])

  return (
    <div className={styles.home}>
      <Header id={'header' + id} handleOpenBasket={handleOpenBasket} />
      <HeroSection />
      <Basket
        handleOpenBasket={handleOpenBasket}
        handleCloseBasket={handleCloseBasket}
        visible={isOpenBasket}
        basket={basket}
      />
      <EditModal data={toggleEditModal} />

      <div className={styles.home_wrapper}>
        <div className={styles.home_inner}>
          <Elements />
        </div>
        <div className={styles.home_inner}>
          <Menu data={menu} />
        </div>
        <div className={styles.home_inner_box_shadow}>
          <AboutUs />
        </div>
        <div className={styles.home_inner}>
          <Deliver />
        </div>
      </div>

      <PhoneModal handleClosePhonemodal={handleClosePhonemodal} isOpen={isOpenPhone} />

      <div className={styles.call} onClick={handleOpenPhonemodal}>
        <i className={`${styles.Phone} ${styles.isAnimating}`}></i>
      </div>
      <Footer />
    </div>
  )
}
