import Button from '@/components/atoms/Button'

const ThemeButton = () => {
  const switchDarkMode = () => {
    document.getElementsByTagName('html')[0].classList.toggle('dark')
  }

  return (
    <Button domProps={{ onClick: () => switchDarkMode() }}>Change Theme</Button>
  )
}

export default ThemeButton
