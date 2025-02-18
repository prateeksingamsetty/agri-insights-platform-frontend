import SidebarLink from './SidebarLink'
import '@styles/globals.css'
import { usePathname } from 'next/navigation'

const Sidebar: React.FC = () => {
  const pathname = usePathname()

  return (
    <div className='sidebar w-64 flex-shrink-0 bg-white p-4 text-red-800'>
      <ul className='flex flex-col space-y-4'>
        {pathname !== '/' && <SidebarLink href='/'>Home</SidebarLink>}
        {(pathname === '/' ||
          pathname === '/prices/dairy' ||
          pathname === '/dairyEnterprise' || pathname === '/dairyFeedModel' ||
          pathname === '/ghgModel' || pathname === '/prices/mailbox_appalachian') && (
          <SidebarLink href='/dairy'>Dairy Landing Page</SidebarLink>
        )}
        {(pathname === '/' ||
          pathname === '/dairyEnterprise' ||
          pathname === '/dairy' || pathname === '/dairyFeedModel' || pathname === '/ghgModel' || 
          pathname === '/prices/mailbox_appalachian'
        ) && (
          <SidebarLink href='/prices/dairy'>Dairy Price Data</SidebarLink>
        )}

        {(pathname === '/' || pathname === '/dairy' || pathname === '/dairyFeedModel' ||
          pathname === '/ghgModel' || pathname === '/dairyEnterprise' || pathname === '/prices/dairy') && (
          <SidebarLink href='/prices/mailbox_appalachian'> Mailbox Appalachian Price Data </SidebarLink>
        )}

        {(pathname === '/') && (
          <SidebarLink href='/weather'>Weather Data</SidebarLink>
        )}
        
        {(pathname === '/') && (
          <SidebarLink href='/relativeHumidity'>RelativeHumidity</SidebarLink>
        )}

        {(pathname === '/') && (
          <SidebarLink href='/diseaseSeverity'>Disease Severity</SidebarLink>
        )}

        {pathname === '/' && (
          <SidebarLink href='/tomato'>Tomato Landing Page</SidebarLink>
        )}
        {pathname === '/' && (
          <SidebarLink href='/prices/tomato'>Tomato Price Data</SidebarLink>
        )}

        {(pathname === '/dairy' || pathname === '/prices/dairy' || pathname === '/dairyFeedModel' ||
          pathname === '/ghgModel' || pathname === '/prices/mailbox_appalachian'
        ) && (
          <SidebarLink href='/dairyEnterprise'> Dairy Enterprise Budget Model </SidebarLink>
        )}
        {(pathname === '/' || pathname === '/ghgModel' || pathname === '/dairyEnterprise' || 
          pathname === '/prices/dairy' || pathname === '/prices/mailbox_appalachian' || pathname === '/dairy') && (
          <SidebarLink href='/dairyFeedModel'>Dairy Feed Model</SidebarLink>
        )}
        {(pathname === '/' || pathname === '/dairyEnterprise' || pathname === '/prices/dairy' || 
          pathname === '/prices/mailbox_appalachian' || pathname === '/dairy'
        ) && (
          <SidebarLink href='/ghgModel'>Dairy GHG Model</SidebarLink>
        )}
        <SidebarLink href='/resources'>Resources</SidebarLink>
      </ul>
    </div>
  )
}

export default Sidebar
