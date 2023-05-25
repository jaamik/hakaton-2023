import Title from '@/kid/title/title';
import React, { useState } from 'react';
import Categories from '../Categories/Categories';
import Card from '../Card/Card';
import styles from './Menu.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuByCategory } from '@/store/menu.slice';
import EditModal from '../EditModal/EditModal';
import Image from 'next/image';
import createImg from '../../assets/img/add.png'
import Confirmation from '../Confirmation/Confirmation';

export default function Menu({ data }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState();
  const [currentEditMeal, setCurrentEditMeal] = useState()
  const [isConfirm, setIsConfirm] = useState(false)
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.food);

  const handleClickCallback = (item) => {
    setCurrentCategory(item.name)
    dispatch(getMenuByCategory(item.id))
  }
  const handleEdit = (item) => {
    setCurrentEditMeal({ ...item })
    setIsOpenModal(true)
  }
  const handleDelete = (item, type) => {
    setIsConfirm({ isOpen: true, id: item.id, deleteType: type })
  }

  const handleCreateMeal = () => {
    setCurrentEditMeal({ isCreateMeal: true })
    setIsOpenModal(true)
  }
  const handleCreateCategory = () => {
    setCurrentEditMeal({ isCreateCategory: true })
    setIsOpenModal(true)
  }
  const handleClose = () => {
    document.body.style.overflow = 'scroll';
    document.body.style.overflowX = 'hidden';

    setIsOpenModal(false)
  }
  const handleCloseConfirm = () => {
    setIsConfirm({ isOpen: false })
  }

  return (
    <div id='menu' className={styles.menu}>
      <Title text={'Меню'} />
      { token?.access || token?.refresh ?
        <div>
          <h4 style={{ margin: '0 0 10px' }}>Добавить категорию</h4>
          <Image onClick={handleCreateCategory} className={styles.addIcon} src={createImg} alt="create-category-icon" />
        </div>
        : ''
      }
      <Categories
        handleClickCallback={handleClickCallback}
        handleDelete={handleDelete}
      />
      {token?.access || token?.refresh ? <div>
        <h4 style={{ margin: '0 0 10px' }}>Добавить блюдо</h4>
        <Image onClick={handleCreateMeal} className={styles.addIcon} src={createImg} alt="create-menu-icon" />
      </div> : ''}

      <div style={{ width: '100%', textAlign: 'center', marginTop: '50px' }}>
        <Title text={currentCategory && currentCategory} />
      </div>

      <Confirmation data={isConfirm} handleClose={handleCloseConfirm} />

      {isOpenModal && <EditModal data={currentEditMeal} isOpen={isOpenModal} handleClose={handleClose} />}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {data?.results?.map((card, index) => (
          <Card
            item={card}
            key={index}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}
