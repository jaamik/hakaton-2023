import React, { useState } from 'react';
import styles from '../styles/order.module.scss'
import Header from '@/components/Header/Header';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '@/store/menu.slice';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Order() {
  const [orderCheck, setOrderCheck] = useState({})
  const [validate, setValidate] = useState(false)
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.food);
  const router = useRouter()
  const id = uuidv4();

  const handleOpenBasket = () => {
    setIsOpenBasket(true)
  }

  const handleChange = (e) => {
    let obj = {
      ...orderCheck,
      [e.target.name]: e.target.value
    }
    setOrderCheck(obj)
  }
  const handleClick = () => {
    let validate = Object.values(orderCheck).length
    console.log(orderCheck, 'orderCheck');
    if (validate < 4) {
      setValidate(true)
    } else {
      setValidate(false)
      dispatch(createOrder(orderCheck))
    }
  }
  const handleOpenLink = () => {
    localStorage.removeItem('basket');
  }
  return (
    <div className={styles.order}>
      <Header id={'header' + id} handleOpenBasket={handleOpenBasket} anotherPage={true} />
      {
        order ?
          <div className={styles.ordered}>
            <div>
              <h4>Уважаемый покупатель! Ваш заказ успешно оформлен!</h4>
            </div>
            <div>
              <h4 style={{color: 'green'}}>Перейдите по ссылке чтобы сообщить нам о заказе!</h4>
            </div>
            <Link onClick={handleOpenLink} href={order}>
              WhatsApp
            </Link>
          </div>
          :
          <div className={styles.order_inner}>

            <div className={styles.order_block}>
              <h3>Данные получателя:</h3>
              <div className={styles.block_input}>
                <h5>
                  Имя
                </h5>
                <input onChange={(e) => handleChange(e)} name='client_name' placeholder='Имя' />
              </div>
              <div className={styles.block_input}>
                <h5>
                  Почта
                </h5>
                <input onChange={(e) => handleChange(e)} name='email' placeholder='Почта' />
              </div>
              <div className={styles.block_input}>
                <h5>
                  Телефон
                </h5>
                <input onChange={(e) => handleChange(e)} type='number' name='client_phone' placeholder='Телефон' />
              </div>
              <div className={styles.block_input}>
                <h5>
                  Адрес
                </h5>
                <input onChange={(e) => handleChange(e)} name='client_address' placeholder='Адрес' />
              </div>
              {validate && <div className={styles.block_input}>
                <h5 style={{ color: 'red' }}>Заполните все поля!</h5>
              </div>}
              <button className={styles.btnOrder} onClick={handleClick} >
                Сделать заказ
              </button>
            </div>
          </div>
      }
    </div>
  )
}
