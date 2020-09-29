import React, {
  createContext,
  useState,
  useEffect
} from 'react'
// import { StatusBar } from 'react-native'
import { ThemeProvider } from './ThemeProvider'
import { Appearance, AppearanceProvider } from 'react-native-appearance'
import light from './light'
import dark from './dark'

// hold value of current theme
const ThemeContext = createContext({
  mode: defaultMode,
  setMode: mode => console.log(mode)
})

// helper function (from ThemeContext) to change value
export const useTheme = () => React.useContext(ThemeContext)

// sets theme state
const ManageThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = useState(defaultMode)
// changes theme state
  const setMode = mode => {
    setThemeState(mode)
  }
// listen to theme changes made by OS
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeState(colorScheme)
    })
    return () => subscription.remove()
  }, [])

  return (
    <ThemeContext.Provider value={{ mode: themeState, setMode }}>
      <ThemeProvider
        theme={themeState === 'dark' ? dark.theme : light.theme}>
        <>
          {/* <StatusBar
            barStyle={themeState === 'dark' ? 'light-content' : 'dark-content'}
          /> */}
          {children}
        </>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

//wrap root of app to make OS changes work and listen to OS subscriptions
const ThemeManager = ({ children }) => (
  <AppearanceProvider>
    <ManageThemeProvider>{children}</ManageThemeProvider>
  </AppearanceProvider>
)
export default ThemeManager