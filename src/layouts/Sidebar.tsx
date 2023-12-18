import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music2,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from 'lucide-react'
import React, { ElementType, useState } from 'react'
import Button from '../components/button'
import { playlists, subscriptions } from '../data/sidebar'
import { useSidebarContext } from '../context/sidebar-context'
import { PageHeaderFirstSection } from './page-header'

type Props = {}

const Sidebar = (props: Props) => {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext()
  return (
    <>
      <aside
        className={`sticky flex flex-col top-0 overflow-y-auto pb-4 ml-1 scrollbar-hidden ${
          isLargeOpen ? 'lg:hidden' : 'lg:flex'
        }`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-48 lg:sticky absolute top-0 overflow-y-auto pb-4 px-2 gap-2 scrollbar-hidden ${
          isLargeOpen ? 'lg:flex lg:flex-col h-full' : 'lg:hidden'
        } ${
          isSmallOpen ? 'flex flex-col z-[999] bg-white max-h-screen' : 'hidden'
        }`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderFirstSection />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
          <LargeSidebarItem
            IconOrImgUrl={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={4}>
          <LargeSidebarItem
            IconOrImgUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            IconOrImgUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconOrImgUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              IconOrImgUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions" visibleItemCount={3}>
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSidebarItem
            IconOrImgUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" />
          <LargeSidebarItem
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSidebarItem
            IconOrImgUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItem
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSidebarItem
            IconOrImgUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
          />
        </LargeSidebarSection>
      </aside>
    </>
  )
}

export default Sidebar

type SmallSidebarItemProps = {
  Icon: ElementType
  title: string
  url: string
}

const SmallSidebarItem = ({ Icon, title, url }: SmallSidebarItemProps) => {
  return (
    <a
      href={url}
      className="flex flex-col items-center rounded-lg py-4 px-1 gap-1 hover:bg-gray-100"
    >
      <Icon classname="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  )
}

type LargeSidebarSectionProps = {
  title?: string
  children: React.ReactNode
  visibleItemCount?: number
}

const LargeSidebarSection = ({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const childrenArray = React.Children.toArray(children).flat()
  const showExpandButton = childrenArray.length > visibleItemCount
  // show all children if expanded, otherwise show only the first visibleItemCount
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount)
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown

  return (
    <div>
      {title && <div className="text-lg ml-4 mt-2 mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          className="flex items-center rounded-lg w-full p-3 gap-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ButtonIcon className="w-6 h-6" />
          <div className="text-sm">
            {isExpanded ? 'Show Less' : 'Show More'}
          </div>
        </Button>
      )}
    </div>
  )
}

type LargeSidebarItemProps = {
  IconOrImgUrl: ElementType | string
  title: string
  url: string
  isActive?: boolean
}

const LargeSidebarItem = ({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) => {
  return (
    <a
      href={url}
      className={`w-full flex items-center rounded-lg p-3 gap-2 ${
        isActive ? 'font-bold bg-neutral-100 hover:bg-secondary' : undefined
      }`}
    >
      {typeof IconOrImgUrl === 'string' ? (
        <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
      ) : (
        <IconOrImgUrl classname="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  )
}
