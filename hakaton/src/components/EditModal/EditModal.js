import { Button, Modal, Text } from '@nextui-org/react'
import React from 'react'
import styles from './EditModal.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, createMeal, editMeal } from '@/store/menu.slice';

export default function EditModal({ data, isOpen, handleClose }) {
  const { categories } = useSelector((state) => state.food);
  const dispatch = useDispatch();
  const [category, setCategory] = useState()
  const [card, setCard] = useState({
    ...data,
    title: data?.title || '',
    description: data?.description || '',
    price: data?.price || '',
    image: data?.image || '',
    discount: data?.discount || '',
    category: data?.category || ''
  })

  const handleChangeCategory = (e) => {
    let obj = {
      ...category,
      [e.target.name]: e.target.value
    }
    setCategory(obj)
  }

  const handleChange = (e, type) => {
    console.log(e.target.value, 'VAL');
    if (type === 'category') {
      let data = {
        ...card,
        [e.target.name]: Number(e.target.value)
      }
      setCard(data)
    } else if (type === 'image') {
      let data = {
        ...card,
        [e.target.name]: e.target.files[0]
      }
      setCard(data)
    }
    else {
      let data = {
        ...card,
        [e.target.name]: e.target.value
      }
      setCard(data)
    }
  }

  const saveEdited = () => {
    if (data.isCreateCategory) {
      dispatch(createCategory(category))
      handleClose(false)
      console.log('click-2');
    } else if (data.isCreateMeal) {
      dispatch(createMeal(card, categories[0]))
      handleClose(false)
    } else {
      console.log('click-4');
      dispatch(editMeal(card))
      handleClose(false)
    }
  }

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={isOpen}
      onClose={() => handleClose(false)}
      className={styles.modal}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          {data.isCreateCategory ? 'Добавить категорию' : data.isCreateMeal ? 'Добавить блюдо' : 'Изменить'}
        </Text>
      </Modal.Header>
      <Modal.Body>
        {
          data.isCreateCategory ?
            <div className={styles.form} >
              <input
                onChange={(e) => handleChangeCategory(e)}
                className={styles.inputs}
                placeholder="Название"
                name="name"
              />
              <input
                onChange={(e) => handleChangeCategory(e)}
                className={styles.inputs}
                placeholder="Слаг"
                name="slug"
              />
            </div>
            :
            <div className={styles.form} >
              <input
                onChange={(e) => handleChange(e)}
                className={styles.inputs}
                placeholder="Название"
                name="title"
                value={card.title}
              />
              <input
                onChange={(e) => handleChange(e)}
                className={styles.inputs}
                name='description'
                placeholder="Описание"
                value={card.description}
              />
              <input
                onChange={(e) => handleChange(e)}
                className={styles.inputs}
                name='price'
                placeholder="Цена"
                type='number'
                value={card.price}
              />
              <input
                onChange={(e) => handleChange(e, 'image')}
                className={styles.inputs}
                name='image'
                placeholder="Фото"
                type='file'
              />
              <input
                onChange={(e) => handleChange(e)}
                className={styles.inputs}
                name='discount'
                placeholder="Скидка %"
                type='number'
                value={card.discount}
              />
              <label htmlFor="select_category">Категория</label>
              <div className="select">
                <select onChange={(e) => handleChange(e)} name="category" id="select_category">
                  {categories?.map((item, index) => (
                    <option
                      key={item.name + index}
                      onChange={(e) => handleChange(e)}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
                <span className="focus"></span>
              </div>
            </div>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error"
          onPress={saveEdited}
        >
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
