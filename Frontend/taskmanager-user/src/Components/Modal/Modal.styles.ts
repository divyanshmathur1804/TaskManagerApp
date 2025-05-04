import styled from 'styled-components';
import { Modal as AntModal } from 'antd';

export const Modal = styled(AntModal)`
  margin: 0;
  top: 0;
  padding: 0px;

  .ant-modal-close {
    right: unset;
    left: 0;
    align-items: center;
    justify-content: center;
    padding-top: 20px;

    position: unset;
    display: flex;
    width: 40%;
    justify-content: flex-start;
  }
  .ant-modal-close-x {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(4px);
    margin-right: 5px
  }

  .ant-modal-close-x span[role='img'] {
    padding: 4px;
    border: 2px solid #000000;
    border-radius: 7px;
  }

  .ant-modal-close-x span[role='img'] svg {
    font-size: 12px;
    color: #000000;
    font-weight: bolder;
  }

  .ant-modal-close::after {
    content: 'Close';
    color: var(--heading-color);
  }

  .ant-modal-header {
    text-align: right;
    position: absolute;
    right: 0;
    top: 0px;
  }

  .ant-modal-body {
    padding: 0px;
  }

  .ant-form.ant-form-vertical {
    padding: 14px 14px 24px 24px;
  }

  .ant-modal {
    margin: 0;
    top: 0px;
  }
`;

export {};
