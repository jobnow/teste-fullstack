'use client'
import { Icon } from '@/components'
import { useEffect, useState } from 'react'

export function ToggleThemeButton() {
  function prefersDark() {
    if (typeof localStorage === 'undefined') return null
    return (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
  }

  const [theme, setTheme] = useState<'light' | 'dark'>(
    prefersDark() ? 'dark' : 'light',
  )

  function updateTheme(theme: 'light' | 'dark') {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', theme)
      setTheme('dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', theme)
      setTheme('light')
    }
  }

  function toggleTheme() {
    theme === 'dark' ? updateTheme('light') : updateTheme('dark')
  }

  useEffect(() => {
    updateTheme(prefersDark() ? 'dark' : 'light')
  }, [])

  return (
    <button
      type='button'
      className='text-base hover:opacity-75 transition-opacity'
      onClick={toggleTheme}
    >
      <Icon name={theme === 'dark' ? 'moon' : 'sun'} />
    </button>
  )
}
