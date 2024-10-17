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
          pathname === '/dairyEnterprise') && (
          <SidebarLink href='/dairy'>Dairy Landing Page</SidebarLink>
        )}
        {(pathname === '/' ||
          pathname === '/dairyEnterprise' ||
          pathname === '/dairy') && (
          <SidebarLink href='/prices/dairy'>Dairy Price Data</SidebarLink>
        )}
        <SidebarLink href='/prices/mailbox_appalachian'>
          Mailbox Appalachian Price Data
        </SidebarLink>
        {pathname === '/' && (
          <SidebarLink href='/tomato'>Tomato Landing Page</SidebarLink>
        )}
        {pathname === '/' && (
          <SidebarLink href='/prices/tomato'>Tomato Price Data</SidebarLink>
        )}

        {(pathname === '/dairy' || pathname === '/prices/dairy') && (
          <SidebarLink href='/dairyEnterprise'>
            Dairy Enterprise Budget
          </SidebarLink>
        )}
        <SidebarLink href='/resources'>Resources</SidebarLink>
      </ul>
    </div>
  )
}

export default Sidebar
