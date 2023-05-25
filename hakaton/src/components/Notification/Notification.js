import React from 'react'
import styles from './Notification.module.scss';
import { useDispatch } from 'react-redux';
import { isBasketAdded } from '@/store/menu.slice';

export default function Notification({ isOpen, title, duration = 1200 }) {
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(isBasketAdded(false))
  }, duration)

  return isOpen && (
    <div className={styles.block}>
      <h5>{title}</h5>
    </div>
  )
}
