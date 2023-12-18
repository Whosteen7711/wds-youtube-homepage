import React, { useState } from 'react'
import logo from '../assets/react.svg'
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from 'lucide-react'
import Button from '../components/button'
import { useSidebarContext } from '../context/sidebar-context'

type Props = {}

const PageHeader = (props: Props) => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false)
  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
      <form
        className={`flex-grow justify-center gap-4 ${
          showFullWidthSearch ? 'flex' : 'hidden md:flex'
        }`}
      >
        {showFullWidthSearch && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
            onClick={() => setShowFullWidthSearch(false)}
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="flex-shrink-0 py-2 px-4 rounded-r-full border border-secondary-border border-l-0">
            <Search />
          </Button>
        </div>
        <Button type="button" size="icon" className="flex-shrink-0">
          <Mic />
        </Button>
      </form>
      <div
        className={`flex-shrink-0 md:gap-5 ${
          showFullWidthSearch ? 'hidden md:flex' : 'flex'
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setShowFullWidthSearch(true)}
        >
          <Search />
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Mic />
        </Button>
        <Button variant="ghost" size="icon">
          <Upload />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
        <Button variant="ghost" size="icon">
          <User />
        </Button>
      </div>
    </div>
  )
}

export default PageHeader

type PageHeaderFirstSectionProps = {
  hidden?: boolean
}

export const PageHeaderFirstSection = ({
  hidden = false,
}: PageHeaderFirstSectionProps) => {
  const { toggle } = useSidebarContext()
  return (
    <div
      className={`gap-4 items-center ${
        hidden ? 'hidden' : 'flex flex-shrink-0'
      }`}
    >
      <Button onClick={toggle}>
        <Menu />
      </Button>
      <a href="/">
        <img src={logo} className="h-6" />
      </a>
    </div>
  )
}
