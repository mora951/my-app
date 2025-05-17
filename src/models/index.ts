export type ThemeType = {
  colors: { [key: string]: string };
  fontSizes: { [key: string]: any };
};

export type StyledProps = {
  theme: ThemeType;
};
