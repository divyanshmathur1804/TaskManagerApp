import React from 'react';
import { Modal as AntdModal, ModalProps as AntModalProps } from 'antd';
import { modalSizes } from 'Constants/modalSizes';
import * as S from './Modal.styles';

export const { info: InfoModal, success: SuccessModal, warning: WarningModal, error: ErrorModal } = AntdModal;

interface ModalProps extends AntModalProps {
    size?: 'small' | 'medium' | 'large';
  }
export const Modal: React.FC<ModalProps> = ({ size = 'large', children, ...props })=>{
    const modalSize = Object.entries(modalSizes).find((sz) => sz[0] === size)?.[1];
    return (
        <S.Modal
          getContainer={false}
          width={modalSize}
          {...props}
          centered={true}
          bodyStyle={{
            height: '400px',
            maxHeight: 'calc(100vh - 74px)',
            overflowX: 'hidden',
          }}
          // style={{ right: 0, top: 0, position: 'fixed' }}
        >
          {children}
        </S.Modal>
      );

}