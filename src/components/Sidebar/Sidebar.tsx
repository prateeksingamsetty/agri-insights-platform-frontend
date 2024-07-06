import SidebarLink from './SidebarLink'

const Sidebar: React.FC = () => {
  return (
    <div className='w-64 flex-shrink-0 bg-white p-4 text-red-800'>
      <ul className='flex flex-col space-y-4'>
        <SidebarLink href='/prices/dairy'>Dairy Price Data</SidebarLink>
        <SidebarLink href='/prices/mailbox_appalachain'>
          Mailbox Appalachain Price Data
        </SidebarLink>
        <SidebarLink href='/prices/tomato'>Tomato Price Data</SidebarLink>
        <SidebarLink href='/about'>Feed Compostion and Source</SidebarLink>
        <SidebarLink href='/'>GHG Model</SidebarLink>
        <SidebarLink href='/resources'>Digestor Feasability</SidebarLink>
        <SidebarLink href='/'>Resources</SidebarLink>
        <SidebarLink href='/about'>Production Details</SidebarLink>
        <SidebarLink href='/prices'>Financial Assumptions</SidebarLink>
        <SidebarLink href='/resources'>Operating Costs</SidebarLink>
        <SidebarLink href='/'>Enterprise Budget Analysis</SidebarLink>
        <SidebarLink href='/about'>Disease Management Model</SidebarLink>
        <SidebarLink href='/prices'>Financial Assumptions</SidebarLink>
      </ul>
    </div>
  )
}

export default Sidebar
