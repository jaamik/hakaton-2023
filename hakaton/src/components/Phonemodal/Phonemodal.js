import React from "react";
import { Modal, Button } from "@nextui-org/react";
import styles from './PhoneModal.module.scss'
import Link from "next/link";

export default function PhoneModal({ isOpen, handleClosePhonemodal }) {

  const closeHandler = () => {
    handleClosePhonemodal()
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      open={isOpen}
      className={styles.modal}
      onClose={closeHandler}
    >
      <Modal.Body className={styles.modalBody}>
        <h1>Бесплатная доставка</h1>
        <Link href={'tel:+996755551707'} className={styles.number}>
          <h2>+996 (755)-551-707</h2>
        </Link>

      </Modal.Body>
      <Modal.Footer style={{padding: 0}}>
        <Button className={styles.modalClose} auto flat onPress={closeHandler}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
