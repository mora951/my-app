"use client";

import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ThemeProvider } from "styled-components";
import { Bars } from "react-loader-spinner";

import styles from "./page.module.css";
import InputField from "@/components/InputField";
import { alphaNumericExp } from "@/config/regex";
import {
  INVALID_FORMAT,
  PASSWORD,
  REQURIED_FIELD,
  SIGN_IN,
  SIGN_IN_SUCCESSFUL,
  USERNAME,
} from "@/config/strings";
import defaultTheme from "@/styles/default-theme";
import signInApi from "@/api/account/signIn";
import {
  Overlay,
  SuccessfulMessageContainer,
  SuccessfulOverlay,
  Icon,
  InnerContainer,
  IconWrapper,
} from "./styled";

type FieldValues = { username: string; password: string };

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(alphaNumericExp, INVALID_FORMAT)
    .required(REQURIED_FIELD),
  password: yup.string().required(REQURIED_FIELD),
});

const SignInPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
  } = useForm<FieldValues>({ mode: "all", resolver: yupResolver(schema) });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [shouldClear, setShouldClear] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    try {
      const { username, password } = data;

      setIsLoading(true);

      const result = await signInApi(username, password);
      setIsLoading(false);

      if (result.data.token) {
        setIsSuccessful(true);
        setShouldClear(true);
        setTimeout(() => setShouldClear(false), 300);
        setValue("username", '');
        setValue("password", '');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <ThemeProvider theme={defaultTheme}>
        <main className={styles.main}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{SIGN_IN}</h1>

            <InputField
              name="username"
              label={USERNAME}
              type="text"
              shouldClear={shouldClear}
              formUtils={{ register, errors, clearErrors }}
            />

            <InputField
              name="password"
              label={PASSWORD}
              type="text"
              shouldClear={shouldClear}
              formUtils={{ register, errors, clearErrors }}
            />

            <input type="submit" />
          </form>
        </main>

        {isLoading && (
          <Overlay>
            <Bars
              height="80"
              width="80"
              // radius="9"
              color="blue"
              ariaLabel="loading"
            />
          </Overlay>
        )}

        {isSuccessful && (
          <SuccessfulOverlay>
            <SuccessfulMessageContainer>
              <InnerContainer>
                <IconWrapper>
                  <Icon
                    onClick={() => {
                      setIsSuccessful(false);
                    }}
                  >
                    &times;
                  </Icon>
                </IconWrapper>
                <h1>{SIGN_IN_SUCCESSFUL}</h1>
              </InnerContainer>
            </SuccessfulMessageContainer>
          </SuccessfulOverlay>
        )}
      </ThemeProvider>
    </div>
  );
};

export default SignInPage;
