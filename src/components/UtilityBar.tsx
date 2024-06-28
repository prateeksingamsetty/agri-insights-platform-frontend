// src/components/UtilityBar.tsx

import { useEffect } from 'react';

const UtilityBar = () => {
  useEffect(() => {
    // Ensure the script is added to the document
    const script = document.createElement('script');
    script.src = 'https://cdn.ncsu.edu/brand-assets/utility-bar/v3/ncstate-utility-bar.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="ncstate-utility-bar" data-prop-show-brick="1" data-prop-cse-id="00578865650663686:7xmauxacbr4"></div>
  );
};

export default UtilityBar;
