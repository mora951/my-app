/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  FieldContainer,
  StyledInputField,
  StyledCaption,
  InputContainer,
  StyledMessage,
  StyledLabel,
} from "./styled";

type Props = {
  name: string;
  label: string;
  caption?: string | undefined;
  type: string;
  shouldClear: boolean;
  formUtils: {
    register: any;
    errors: any;
    clearErrors: any;
  };
};

const InputField = ({
  name,
  label,
  caption,
  type,
  shouldClear,
  formUtils,
}: Props) => {
  const { register, errors, clearErrors } = formUtils;

  const hasError = !!errors?.[name];
  const message = errors?.[name]?.message;

  const [value, setValue] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  const onChangeHandler = (event: any) => {
    const inputVal: string = event.target.value;

    setIsEmpty(!inputVal);
    setValue(inputVal);

    if (inputVal !== "") {
      clearErrors(name);
    }
  };

  useEffect(() => {
    if (shouldClear) {
      setIsEmpty(true);
      setValue("");
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
