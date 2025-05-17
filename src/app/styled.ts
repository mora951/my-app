import styled from 'styled-components';

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: grey;
  opacity: 0.8;
`;

export const SuccessfulOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: grey;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SuccessfulMessageContainer = styled.div`
  width: 400px;
  height: 150px;
  display: flex;
  flex-direction: column;
  //   align-items: end;
  //   justify-content: center;
  background: white;
  border-radius: 3px;
`;

export const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
`;

export const Icon = styled.div`
  margin: 5px 10px 0px 0px;
  font-size: 22px;
  cursor: pointer;
`;
