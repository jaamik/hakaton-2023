import React from 'react'
import { Button, Modal } from '@nextui-org/react'
import { useDispatch } from 'react-redux'
import { removeCategory, removeMeal } from '@/store/menu.slice';
export default function Confirmation({ data, handleClose }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (data.deleteType === 'category') {
      dispatch(removeCategory(data.id))
      handleClose(false)
    } else {
      dispatch(removeMeal(data.id))
      handleClose(false)
    }
  }

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={data.isOpen}
      onClose={() => handleClose(false)}
    >
      <h3>Вы точно хотите удалить?</h3>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button auto flat color="error"
          style={{ width: '150px', margin: '5px 5px 20px 5px' }}
          onPress={handleDelete}
        >
          Подтвердить
        </Button>
        
      </div>
    </Modal>
  )
}
