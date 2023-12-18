# Youtube Homepage Clone from Web Dev Simplified

TODOS:

## Youtube Homepage Design

1. the sidebar, navbar, and categories are fixed on the screen
2. the sidebar is scrollable and responsive

## General Notes

1. Pass all props to a component: {...data}

## Approach

1. assign page to be 100% viewport and only allow content to be scrollable instead of fixing header/sidebar
2. use flexbox to build the page header into three sections
3. use grid to build the sidebar and content section which are effectively two columns below header

## Tailwind

1. max-h-screen = 100vh
2. justify-between = horizontal alignment with max space between elements
3. items-center = veritcal alignment in middle of section
4. flex-shrink-0 = prevent elements from resizing on page
5. define custom colors in tailwind config theme/extend/colors/secondary
6. flex-grow = allow element to grow to max size
7. overflow-auto = enable scrolling with flex-grow
8. overflow-x-hidden = enable category navigation with arrow icons

## Class-Variance-Authority

1. library to help toggle styling between different buttons
2. first argument is an array of base utility classes
3. second argument is a config object to specify variants and defaults

## Header

1. first section:

- hamburger icon and logo
- positioned in top left corner of the screen

2. second section:

- search bar and microphone icon
- search bar grows to max width with screen size
- search bar is hidden on small screens and enabled with search icon
- search icon enables full width search bar when clicked

3. third section:

- user icons
- positioned in top right corner of the screen

4. Responsiveness

- use state variable to conditionally render search bar and icons

## Content Section

1. category pills:

- arrow icons should appear on smaller screens
- categories are positioned relative to arrow icons, which are only visible on smaller screens
- enable arrow scrolling by shifting/translating 200 pixels/click along x axis
- use div container ref to determine size of screen
- add style prop to each category pill to incorporate current value of translate state
- translate left back to starting state, 200px at a time
- translate right 200px from end of client width to scroll width
  - client width is viewable width, where scroll width incorporates all content

2. content:

- utilize auto-repeat setup for videos
  - min size 300px and max 1fr
- each VideoGridItem contains a video and description with a gap of 2
- anchor element:
  - video positioned relative for automatic positioning of duration and video corners
  - sizing handled with aspect-video utility class
  - img element for the video thumbnail:
    - display block for image to appear on its own line
    - stretch with w-full, h-full
    - object-cover to size image to its container
    - rounded corners with rounded-xl
  - timestamps:
    - position in bottom right corner with [absolute bottom-1 right-1]

3. video autoplay:

- use video ref and useEffect hook to play the video when the user's mouse hovers the element
- video should be muted and play inline to prevent fullscreen on mobile
- video should cover container: h-full object-cover absolute inset-0
- allow video autoplay to fade in: transition-opacity duration-200
- corners should gracefully unround when video is playing
- video should not play until corners unround: delay-200

## Sidebar

- use aside element
- enable scrolling: overflow-y-auto
- implement custom scrollbar, so hide default: scrollbar-hidden
- implement small sidebar viewable on md screens

1. Large Sidebar

- viewable by default on large screens => position: sticky
- viewable by clicking hamburger menu icon on smaller screens => position: absolute
- items should be divided into sections
- each section can have a title
- each section should some number of visible items
- any remaining items should be viewable from a dropdown menu in a given section

2. Scrollbar

- content section should display a scroll bar
- sidebar scrollbar should only display when user hovers section
- requires custom css to implement
  - scrollbar-hidden
    - use bg-transparent to hide scrollbar by default
    - user hover effect to update background to bg-secondary-hover
  - enable scrollbar
    - webkit-scrollbar
  - render to all elements:
    - webkit-scrollbar-thumb
  - Note: only works in chrome browsers
- Dynamically render large or small sidebar using context provider
  - tailwind large screen >= 1024
  - large screens expand sidebar by default
  - small screens expand sidebar when large sidebar enabled from hamburger menu icon
  - fix the menu icon and logo as sticky when the large sidebar is open on smaller screens
  - apply gray effect to rest of screen when large sidebar open on smaller screens
  - use event listener to automatically update sidebar context when screen resizes
