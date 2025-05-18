export type ThemeType = {
  colors: { [key: string]: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fontSizes: { [key: string]: any };
};

export type StyledProps = {
  theme: ThemeType;
};
