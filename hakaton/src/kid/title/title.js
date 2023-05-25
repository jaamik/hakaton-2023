import React from 'react'
import styles from './title.module.scss';

export default function Title({ id = '', text, linedText = '' }) {
  return (
    <h3 id={id} className={styles.title}>
      {text}
      <span>{linedText}</span>
    </h3>
  )
}
