import React, { useEffect, useState } from "react";
import { Modal, Button, Text } from "@nextui-org/react";
import styles from './Basket.module.scss';
import Image from "next/image";
import { useRouter } from "next/router";

export default function Basket({ visible, handleCloseBasket, basket }) {
  const [cards, setCards] = useState(basket);
  const router = useRouter();

  const order = () => {
    router.push('/order');
    localStorage.setItem('basket', JSON.stringify(cards))
  }

  const summOfOrder = (basket) => {
    if (basket) {
      return basket.reduce((acc, product) => acc + product.price, 0);
    }
  }

  const handleChangeCount = (e, id) => {
    const newArr = cards.map((item, index) => {
      if (item.id === id) {
        return {
          ...item,
          count: e.target.value
        }
      } else {
        return item
      }
    })

    setCards(newArr);
  }
  const close = () => {
    localStorage.setItem('basket', JSON.stringify(cards))
    handleCloseBasket(false);
  }
  
  useEffect(() => {
    setCards(basket)
  }, [basket])

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={() => close()}
      className={styles.test}
      width="80%"
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Ваш заказ
        </Text>
      </Modal.Header>
      <Modal.Body style={{ overflowY: 'scroll' }}>
        {cards && cards.length ? cards?.map((item, index) => (
          <div className={styles.card} key={index}>
            <Image className={styles.card_img} width={100} height={100} src={item.image} alt="basket" />
            <div className={styles.card_wrapper_inner}>
              <div>
                <h3 className={styles.card_title}>{item.title}</h3>
                <h4 className={styles.card_price}>{item.price} сом</h4>
              </div>
              <div className={styles.card__inner} >
                <div className={styles.card__inner_right}>
                  <input 
                    style={{width: '30px'}} type="number" 
                    onChange={(e) => handleChangeCount(e, item.id)} 
                    value={item.count} 
                  />
                </div>
              </div>
              <button>
                <Image width={20} src={close} alt="close" />
              </button>
            </div>
          </div>
        )
        ) :
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'end', height: '200px' }}>
            <h3>Ваша корзина пуста !</h3>
          </div>
        }
      </Modal.Body>
      <Modal.Footer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h3>Сумма заказа: <span style={{ color: 'red' }}>{summOfOrder(basket)} сом</span></h3>
        <Button className={styles} auto flat onPress={() => order()}>
          Оформить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}