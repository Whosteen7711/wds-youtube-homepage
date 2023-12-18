import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type SidebarContextProviderProps = {
  children: ReactNode
}

type SidebarContextType = {
  isLargeOpen: boolean
  isSmallOpen: boolean
  toggle: () => void
  close: () => void
}

const SidebarContext = createContext<SidebarContextType | null>(null)

const SidebarContextProvider = ({ children }: SidebarContextProviderProps) => {
  const [isLargeOpen, setIsLargeOpen] = useState(true)
  const [isSmallOpen, setIsSmallOpen] = useState(false)

  const isScreenSmall = () => {
    return window.innerWidth < 1024
  }

  const toggle = () => {
    if (isScreenSmall()) {
      setIsSmallOpen(!isSmallOpen)
    } else {
      setIsLargeOpen(!isLargeOpen)
    }
  }

  const close = () => {
    if (isScreenSmall()) {
      setIsSmallOpen(false)
    } else {
      setIsLargeOpen(false)
    }
  }

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) {
        setIsSmallOpen(false)
      }
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <SidebarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarContextProvider

export const useSidebarContext = () => {
  const value = useContext(SidebarContext)
  if (value === null) {
    throw new Error(
      'useSidebarContext must be used within SidebarContextProvider'
    )
  }
  return value
}
