import React, { createContext, ReactNode, useContext } from "react";
import { ITheme } from "../types/themes";
import { coffeeTheme, newTheme } from './themes';




/**
 * Retrieves the theme.
 *
 * @returns {ITheme} The theme object.
 */
export const getTheme = (): ITheme => newTheme;

const ThemeContext = createContext < ITheme > (getTheme());

interface IProps {
  children: ReactNode;
}

/**
 * Renders the `ThemeProvider` component.
 *
 * @param {IProps} children - The children to be rendered within the `ThemeProvider` component.
 * @return {JSX.Element} The rendered `ThemeProvider` component.
 */
const ThemeProvider = ({ children }: IProps) => (
  <ThemeContext.Provider value={getTheme()}>{children}</ThemeContext.Provider>
);

/**
 * Creates a higher-order component that wraps the given component with a theme.
 *
 * @param {any} Component - The component to be wrapped.
 * @returns {function} A wrapper component that provides the theme context to the wrapped component.
 */
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
