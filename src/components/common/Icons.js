import React from 'react';

import logoIcon from 'images/logo.svg';

export const makeIcon = (iconId: string, className?: string) => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${iconId}` }/>
    </svg>
  );
};

export const LogoIcon = ({ className }) => {
  return makeIcon(logoIcon.id, className);
};
