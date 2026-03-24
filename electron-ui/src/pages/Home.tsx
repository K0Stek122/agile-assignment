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
import { SidebarWrapper } from '../components/sidebar-wrapper'



function Home() {
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

export default Home
