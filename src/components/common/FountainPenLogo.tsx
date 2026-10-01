import React from 'react';

interface FountainPenLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const FountainPenLogo: React.FC<FountainPenLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Sizes increased by exactly 6px (xs: 28->34px, sm: 32->38px, md: 40->46px, lg: 48->54px, xl: 64->70px)
  const sizeClasses = {
    xs: 'h-[34px] w-[34px]',
    sm: 'h-[38px] w-[38px]',
    md: 'h-[46px] w-[46px]',
    lg: 'h-[54px] w-[54px]',
    xl: 'h-[70px] w-[70px]',
  }[size];

  return (
    <div
      className={`relative ${sizeClasses} shrink-0 bg-transparent border-0 shadow-none p-0 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center ${className}`}
    >
      <img
        src="/images/fountain-pen-logo.png"
        alt="Christian Martins Gold Fountain Pen Logo"
        className="h-full w-full object-contain select-none pointer-events-none"
        loading="eager"
      />
    </div>
  );
};


