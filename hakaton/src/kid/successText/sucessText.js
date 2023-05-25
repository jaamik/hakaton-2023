import { useRouter } from 'next/router';
import React from 'react'
import { useState } from 'react'

export default function SuccessText({ text, size = 18, duration = 3000 }) {
  const [isActive, setIsActive] = useState(true);
  const router = useRouter()

  duration && setTimeout(() => {
    setIsActive(false)
    router.push('/')
  }, duration)

  return isActive && (
    <h3 style={{fontSize: `${size}px`, color: 'rgb(3, 167, 3)'}}>
      {text}
    </h3>
  )
}
