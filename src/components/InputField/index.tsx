'use client';

import React, { useEffect, useState } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import {
  FieldContainer,
  StyledInputField,
  StyledCaption,
  InputContainer,
  StyledMessage,
  StyledLabel,
} from './styled';

type Props = {
  name: string;
  label: string;
  caption: string | undefined;
  type: string;
  shouldClear: boolean;
  formUtils: {
    register: UseFormRegister<FieldValues>;
    errors: object[];
    clearErrors: UseFormRegister<FieldValues>;
  };
};

const InputField = ({
  name,
  label,
  caption,
  type,
  shouldClear,
  formUtils,
}: Props): React$Element<any> => {
  const { register, errors, clearErrors } = formUtils;

  const hasError = !!errors?.[name];
  const message = errors?.[name]?.message;

  const [value, setValue] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);

  const onChangeHandler = (event: any) => {
    const inputVal: string = event.target.value;

    setIsEmpty(!inputVal);
    setValue(inputVal);

    if (inputVal !== '') {
      clearErrors(name);
    }
  };

  useEffect(() => {
    if (shouldClear) {
      setIsEmpty(true);
      setValue('');
    }
  }, [shouldClear]);

  return (
    <FieldContainer isInvalid={hasError} isEmpty={isEmpty}>
      {caption && <StyledCaption>{caption}</StyledCaption>}
      <InputContainer>
        <StyledInputField
          {...register(name)}
          type={type}
          onChange={onChangeHandler}
          value={value}
          isInvalid={hasError}
          isEmpty={isEmpty}
        />

        {label && <StyledLabel>{label}</StyledLabel>}
      </InputContainer>

      {message && <StyledMessage>{message}</StyledMessage>}
    </FieldContainer>
  );
};

export default InputField;
