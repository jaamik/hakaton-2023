import React, { useState } from 'react'
import styles from './Form.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { authAdmin } from '@/store/menu.slice';
import SuccessText from '@/kid/successText/sucessText';

export default function Form() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.food);
  const [isValid, setIsValid] = useState(true);
  const [admin, setAdmin] = useState({
    username: '',
    password: ''
  })

  const handleChange = (value, name) => {
    let data = {
      ...admin,
      [name]: value
    }
    if (data.username.trim() && data.password.trim()) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    setAdmin(data);
  }

  const handleLogin = () => {
    // 'username: Chief'
    // 'password: foodgood'
    dispatch(authAdmin(admin));
  }

  return (
    <div className={styles.form_wrapper}>
      <div className={styles.form}>
        
        <div className={styles.form_inner_left}>
          <div className={styles.form_left}>
            <h1 className={styles.form_left__title}>Login</h1>
            <div className={styles.block_input}>
              <h5>
                Name
              </h5>
              <input onChange={(e) => handleChange(e.target.value, e.target.name)} name='username' placeholder='Name' />
            </div>
            <div className={styles.block_input}>
              <h5>
                Password
              </h5>
              <input onChange={(e) => handleChange(e.target.value, e.target.name)} name='password' placeholder='Password' />
            </div>
            <button onClick={() => handleLogin()} disabled={isValid} className={styles.form_login}>
              Войти
            </button>
            { token && <SuccessText text={'Вы успешно вошли в систему!'} /> } 
          </div>
        </div>
        <div className={styles.form_inner_right}>
        </div>
      </div>
    </div>
  )
}
