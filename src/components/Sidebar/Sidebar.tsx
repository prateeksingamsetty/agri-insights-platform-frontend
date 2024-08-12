import SidebarLink from './SidebarLink'
import '@styles/globals.css'

const Sidebar: React.FC = () => {
  return (
    // <div className='fixed bottom-0 left-0 top-[108px] z-30 w-64 overflow-y-auto bg-white p-4 text-red-800'>
    <div className='sidebar w-64 flex-shrink-0 bg-white p-4 text-red-800'>
      {/* <div className='max-h-screen w-64 flex-shrink-0 overflow-y-auto bg-white p-4 text-red-800'> */}
      <ul className='flex flex-col space-y-4'>
        <SidebarLink href='/dairy'>Dairy Landing Page</SidebarLink>
        <SidebarLink href='/tomato'>Tomato Landing Page</SidebarLink>
        <SidebarLink href='/prices/dairy'>Dairy Price Data</SidebarLink>
        <SidebarLink href='/prices/mailbox_appalachain'>
          Mailbox Appalachain Price Data
        </SidebarLink>
        <SidebarLink href='/prices/tomato'>Tomato Price Data</SidebarLink>
        <SidebarLink href='/dairyEnterprise'>
          Dairy Enterprise Budget
        </SidebarLink>
        <SidebarLink href='/feedComposition'>
          Feed Compostion and Source
        </SidebarLink>
        <SidebarLink href='/ghg'>GHG Model</SidebarLink>
        <SidebarLink href='/digestorFeasibility'>
          Digestor Feasibility
        </SidebarLink>
        <SidebarLink href='/resources'>Resources</SidebarLink>
        <SidebarLink href='/'>Enterprise Budget Analysis</SidebarLink>
        <SidebarLink href='/about'>Disease Management Model</SidebarLink>
      </ul>
    </div>
  )
}

export default Sidebar
