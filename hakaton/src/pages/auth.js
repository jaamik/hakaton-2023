import React from 'react';
import Header from '@/components/Header/Header';
import Form from '@/components/Form/Form';
import { useEffect } from 'react';
import { isTokenRefresh } from '@/store/menu.slice';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

export default function Auth() {
  const dispatch = useDispatch();
  const id = uuidv4();

  useEffect(() => {
    dispatch(isTokenRefresh());
  }, [])

  return (
    <div>
      <Header id={'auth' + id} anotherPage={true} />
      <div>
        <Form />
      </div>
    </div>
  )
}
