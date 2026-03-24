import {
  CalendarClockIcon,
  CarFrontIcon,
  HouseIcon,
  IdCardIcon,
  LogOutIcon,
  MoonIcon,
  Settings2Icon,
  SunIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { SidebarWrapper } from './components/sidebar-wrapper'

const navigationItems = [
  { title: 'Home', href: '/', icon: HouseIcon },
  { title: 'Membership', href: '/membership', icon: IdCardIcon },
  { title: 'Parking', href: '/parking', icon: CarFrontIcon },
  { title: 'Sessions', href: '/sessions', icon: CalendarClockIcon },
  { title: 'Account Options', href: '/account-options', icon: Settings2Icon },
  { title: 'Log Out', href: '/login', icon: LogOutIcon },
]

function App() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : prefersDark

    document.documentElement.classList.toggle('dark', shouldUseDark)
    setIsDark(shouldUseDark)
  }, [])

  const toggleTheme = () => {
    setIsDark((currentValue) => {
      const nextValue = !currentValue
      document.documentElement.classList.toggle('dark', nextValue)
      localStorage.setItem('theme', nextValue ? 'dark' : 'light')
      return nextValue
    })
  }

  return (
    <div>
      <SidebarWrapper navigationItems={navigationItems} />

      <Button
        size="icon-lg"
        variant="outline"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={toggleTheme}
        className="hover:cursor-pointer hover:scale-105 fixed right-5 bottom-5 z-50 rounded-full border-border bg-background/90 shadow-lg backdrop-blur"
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </Button>
    </div>
  )
}

export default App
