import React from 'react'
import Image from 'next/image';
import styles from './AboutCard.module.scss';

export default function AboutCard({title, desc, img}) {
  return (
    <div className={styles.about}>
      <div>
        <Image 
          src={img}
          alt="img"
          width={50}
          height={50}
        />
      </div>
      <div><h4 style={{textAlign: 'center'}}>{title}</h4></div>
      <div><p>{desc}</p></div>
    </div>
  )
}
