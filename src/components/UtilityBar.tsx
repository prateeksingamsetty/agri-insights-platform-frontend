import { useEffect } from 'react';

const UtilityBar = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.ncsu.edu/brand-assets/utility-bar/v3/ncstate-utility-bar.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="ncstate-utility-bar" className="fixed top-0 left-0 right-0 z-30" data-prop-show-brick="1" data-prop-cse-id="00578865650663686:7xmauxacbr4"></div>
  );
};

export default UtilityBar;