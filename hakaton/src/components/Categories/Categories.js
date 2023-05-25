import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { getCategories } from '@/store/menu.slice';
import styles from './Categories.module.scss';
import removeIcon from '../../assets/img/trashBlack.png';
import Image from 'next/image';


export default function Categories({ handleClickCallback, handleDelete }) {
  const dispatch = useDispatch();
  const { categories, token } = useSelector((state) => state.food);
  const [active, setActive] = useState()

  const clickActive = (item) => {
    handleClickCallback(item);
    setActive(item.name)
  }

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className={styles.category}>
      {categories?.map((item, index) => (
        <div key={index + item.name} className={styles.block_wrapper}>
          {token?.access || token?.refresh ? <div className={styles.block_inner}>
            <Image className={styles.icons} src={removeIcon} onClick={() => handleDelete(item, 'category')} alt="img-category" />
          </div> : ''}
          <Button
            className={`${styles.category_btn} ${active === item.name ? styles.activeCayegory : ''}`}
            auto rounded bordered
            onPress={() => clickActive(item)}
          >
            {item.name}
          </Button>
        </div>
      ))}
    </div>
  )
}
