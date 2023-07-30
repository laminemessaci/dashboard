import React, { createContext, ReactNode, useContext } from "react";
import { ITheme } from "../types/themes";
import { coffeeTheme } from './themes';




/* Get Theme depending on target */
export const getTheme = (): ITheme => {
  return coffeeTheme;
};

const ThemeContext = createContext < ITheme > (getTheme());

interface IProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: IProps) => (
  <ThemeContext.Provider value={getTheme()}>{children}</ThemeContext.Provider>
);

export const withTheme = (Component: any) =>
  function wrapperComponent(props: any) {
    const themeDataContext = useContext(ThemeContext);

    return (
      <ThemeContext.Consumer>
        {() => <Component {...props} theme={themeDataContext} />}
      </ThemeContext.Consumer>
    );
  };

export const useTheme = () => useContext(ThemeContext);

export const theme = () => getTheme();

export default ThemeProvider;
