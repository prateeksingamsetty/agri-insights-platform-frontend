import SidebarLink from './SidebarLink'

const Sidebar: React.FC = () => {
  return (
    <div className='w-64 flex-shrink-0 bg-white p-4 text-red-800'>
      <ul className='flex flex-col space-y-4'>
        <SidebarLink href='/dairy'>Dairy Landing Page</SidebarLink>
        <SidebarLink href='/tomato'>Tomato Landing Page</SidebarLink>
        <SidebarLink href='/prices/dairy'>Dairy Price Data</SidebarLink>
        <SidebarLink href='/prices/mailbox_appalachain'>
          Mailbox Appalachain Price Data
        </SidebarLink>
        <SidebarLink href='/prices/tomato'>Tomato Price Data</SidebarLink>
        <SidebarLink href='/feedComposition'>
          Feed Compostion and Source
        </SidebarLink>
        <SidebarLink href='/ghg'>GHG Model</SidebarLink>
        <SidebarLink href='/digestorFeasibility'>
          Digestor Feasibility
        </SidebarLink>
        <SidebarLink href='/resources'>Resources</SidebarLink>
        <SidebarLink href='/productionDetails'>Production Details</SidebarLink>
        <SidebarLink href='/financialAssumptions'>
          Financial Assumptions
        </SidebarLink>
        <SidebarLink href='/operatingCosts'>Operating Costs</SidebarLink>
        <SidebarLink href='/'>Enterprise Budget Analysis</SidebarLink>
        <SidebarLink href='/about'>Disease Management Model</SidebarLink>
      </ul>
    </div>
  )
}

export default Sidebar
