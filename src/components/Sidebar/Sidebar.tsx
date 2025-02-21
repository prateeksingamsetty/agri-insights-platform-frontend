import SidebarLink from './SidebarLink';
import '@styles/globals.css';
import { usePathname } from 'next/navigation';
import { useAuth } from 'src/context/AuthContext';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { loggedIn } = useAuth(); // Get login status from context

  return (
    <div className='sidebar w-64 flex-shrink-0 bg-white p-4 text-red-800'>
      <ul className='flex flex-col space-y-4'>

        {/* Always visible */}
        {pathname !== '/' && <SidebarLink href='/'>Home</SidebarLink>}

        {/* Dairy Landing Page */}
        {(pathname === '/' ||
          pathname === '/prices/dairy' ||
          pathname === '/dairyEnterprise' || pathname === '/dairyFeedModel' ||
          pathname === '/ghgModel' || pathname === '/prices/mailbox_appalachian') && (
          <SidebarLink href='/dairy'>Dairy Landing Page</SidebarLink>
        )}

        {/* Weather Data (Restricted) */}
        {loggedIn && pathname === '/' && (
          <SidebarLink href='/weather'>Weather Data</SidebarLink>
        )}

        {/* Relative Humidity (Restricted) */}
        {loggedIn && pathname === '/' && (
          <SidebarLink href='/relativeHumidity'>Relative Humidity</SidebarLink>
        )}

        {/* Disease Severity (Restricted) */}
        {loggedIn && pathname === '/' && (
          <SidebarLink href='/diseaseSeverity'>Disease Severity</SidebarLink>
        )}

        {/* Tomato Landing Page */}
        {pathname === '/' && (
          <SidebarLink href='/tomato'>Tomato Landing Page</SidebarLink>
        )}

        {/* Dairy Enterprise Budget Model */}
        {(pathname === '/dairy' || pathname === '/prices/dairy' || pathname === '/dairyFeedModel' ||
          pathname === '/ghgModel' || pathname === '/prices/mailbox_appalachian') && (
          <SidebarLink href='/dairyEnterprise'> Dairy Enterprise Budget Model </SidebarLink>
        )}

        {/* Dairy Feed Model */}
        {(pathname === '/' || pathname === '/ghgModel' || pathname === '/dairyEnterprise' ||
          pathname === '/prices/dairy' || pathname === '/prices/mailbox_appalachian' || pathname === '/dairy') && (
          <SidebarLink href='/dairyFeedModel'>Dairy Feed Model</SidebarLink>
        )}

        {/* Dairy GHG Model */}
        {(pathname === '/' || pathname === '/dairyEnterprise' || pathname === '/prices/dairy' ||
          pathname === '/prices/mailbox_appalachian' || pathname === '/dairy' || pathname === '/dairyFeedModel') && (
          <SidebarLink href='/ghgModel'>Dairy GHG Model</SidebarLink>
        )}

        {/* Dairy Prices Data (Restricted) */}
        {loggedIn && (pathname === '/' ||
          pathname === '/dairyEnterprise' ||
          pathname === '/dairy' || pathname === '/dairyFeedModel' || pathname === '/ghgModel' ||
          pathname === '/prices/mailbox_appalachian') && (
          <SidebarLink href='/prices/dairy'>Dairy Price Data</SidebarLink>
        )}

        {/* Mailbox Prices (Restricted) */}
        {loggedIn && (pathname === '/' || pathname === '/dairy' || pathname === '/dairyFeedModel' ||
          pathname === '/ghgModel' || pathname === '/dairyEnterprise' || pathname === '/prices/dairy') && (
          <SidebarLink href='/prices/mailbox_appalachian'> Mailbox Appalachian Price Data </SidebarLink>
        )}

        {/* Tomato Price Data (Restricted) */}
        {loggedIn && pathname === '/' && (
          <SidebarLink href='/prices/tomato'>Tomato Price Data</SidebarLink>
        )}

        {/* Always visible */}
        <SidebarLink href='/resources'>Resources</SidebarLink>

      </ul>
    </div>
  );
};

export default Sidebar;
