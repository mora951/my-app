import { StyledProps, ThemeType } from '@/models';
import styled, { css } from 'styled-components';

type InputFieldProps = {
  theme: ThemeType;
  isInvalid: boolean;
  isEmpty: boolean;
};

export const StyledLabel = styled.label<StyledProps>`
  position: absolute;
  user-select: none;
  pointer-events: none;
  top: 50%;
  transform: translateY(-50%);
  left: 12px;
  max-width: 80%;
  color: ${(props) => props.theme.colors.greyScaleDarkGrey800};
  transition: 0.2s all;
  cursor: text;
`;

export const StyledInputField = styled.input<InputFieldProps>`
  border-radius: 3px;
  width: 100%;
  box-sizing: border-box;
  outline: 0;
  height: 50px;
  padding: 0 10px;
  border: ${(props) =>
    props.isInvalid ? 'none' : `thin solid ${props.theme.colors.greyScaleDarkGrey100}`};
  background: ${(props) => props.theme.colors.greyScaleDarkGrey100};
  font-size: ${(props) => props.theme.fontSizes.text.regular}rem;
  box-shadow: none;
  color: ${(props) => props.theme.colors.greyScaleDarkGrey800};
  &::-ms-reveal,
  &::-ms-clear {
    display: none;
  }

  &:focus ~ ${StyledLabel},&:-webkit-autofill {
    ${(props) => selectedInputStyle(props.theme)};
  }

  ${(props) => !props.isEmpty && selectedInputStyle(props.theme)}
`;

export const FieldContainer = styled.div<InputFieldProps>`
  color: ${(props) => props.theme.colors.greyScaleDarkGrey800};
  font-size: ${(props) => props.theme.fontSizes.text.regular}rem;
  overflow: visible;
  padding: 8px 0px;
  ${(props) =>
    props.isInvalid &&
    css`
      & ${StyledLabel}, & ${StyledMessage}, & ${StyledCaption} {
        color: ${props.theme.colors.semanticTextError};
      }

      & ${StyledInputField} {
        background: ${props.theme.colors.semanticCardError};
        color: ${props.theme.colors.semanticTextError};
      }

      & ${StyledLabel} {
        color: ${props.theme.colors.semanticTextError};
      }
    `};
`;

const selectedInputStyle = (theme: ThemeType) => {
  return css`
    & ~ ${StyledLabel} {
      font-size: ${theme.fontSizes.overline}rem;
      top: -6px;
      transform: translateY(0);
      left: 12px;
    }
  `;
};

export const StyledCaption = styled.span``;

export const InputContainer = styled.div`
  position: relative;
  margin: 7px 0;
  height: 50px;
`;

export const StyledMessage = styled.p`
  font-size: 12px;
`;
