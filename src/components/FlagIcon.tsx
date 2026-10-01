import React from 'react';

export type LanguageCode = 'pt' | 'en' | 'es';

interface FlagIconProps {
  country: LanguageCode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FlagIcon: React.FC<FlagIconProps> = ({ 
  country, 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-3',
    md: 'w-5 h-3.5',
    lg: 'w-7 h-5',
  };

  const baseClasses = `inline-block shrink-0 rounded-xs overflow-hidden shadow-xs border border-black/10 object-cover ${sizeClasses[size]} ${className}`;

  if (country === 'pt') {
    // Brazil Flag (Representing Portuguese in this CRM)
    return (
      <svg 
        viewBox="0 0 720 504" 
        className={baseClasses}
        aria-label="Português (Brasil)"
        role="img"
      >
        <rect width="720" height="504" fill="#009c3b" />
        <polygon points="360,54 666,252 360,450 54,252" fill="#ffdf00" />
        <circle cx="360" cy="252" r="126" fill="#002776" />
        {/* Celestial white curve */}
        <path 
          d="M 234 252 A 130 130 0 0 1 486 252" 
          stroke="#ffffff" 
          strokeWidth="16" 
          fill="none" 
        />
        {/* Representative stars */}
        <circle cx="360" cy="220" r="4" fill="#ffffff" />
        <circle cx="380" cy="235" r="4" fill="#ffffff" />
        <circle cx="340" cy="270" r="4" fill="#ffffff" />
        <circle cx="370" cy="285" r="5" fill="#ffffff" />
        <circle cx="395" cy="275" r="4" fill="#ffffff" />
        <circle cx="325" cy="290" r="4" fill="#ffffff" />
      </svg>
    );
  }

  if (country === 'en') {
    // USA Flag (Representing English)
    return (
      <svg 
        viewBox="0 0 741 390" 
        className={baseClasses}
        aria-label="English (US)"
        role="img"
      >
        <rect width="741" height="390" fill="#b22234" />
        {/* White stripes */}
        <path d="M0,30H741M0,90H741M0,150H741M0,210H741M0,270H741M0,330H741" stroke="#ffffff" strokeWidth="30" />
        {/* Blue canton */}
        <rect width="296" height="210" fill="#3c3b6e" />
        {/* Star representation grid */}
        <g fill="#ffffff">
          <circle cx="35" cy="26" r="8" />
          <circle cx="95" cy="26" r="8" />
          <circle cx="155" cy="26" r="8" />
          <circle cx="215" cy="26" r="8" />
          <circle cx="270" cy="26" r="8" />
          <circle cx="65" cy="52" r="8" />
          <circle cx="125" cy="52" r="8" />
          <circle cx="185" cy="52" r="8" />
          <circle cx="245" cy="52" r="8" />
          <circle cx="35" cy="78" r="8" />
          <circle cx="95" cy="78" r="8" />
          <circle cx="155" cy="78" r="8" />
          <circle cx="215" cy="78" r="8" />
          <circle cx="270" cy="78" r="8" />
          <circle cx="65" cy="104" r="8" />
          <circle cx="125" cy="104" r="8" />
          <circle cx="185" cy="104" r="8" />
          <circle cx="245" cy="104" r="8" />
          <circle cx="35" cy="130" r="8" />
          <circle cx="95" cy="130" r="8" />
          <circle cx="155" cy="130" r="8" />
          <circle cx="215" cy="130" r="8" />
          <circle cx="270" cy="130" r="8" />
          <circle cx="65" cy="156" r="8" />
          <circle cx="125" cy="156" r="8" />
          <circle cx="185" cy="156" r="8" />
          <circle cx="245" cy="156" r="8" />
          <circle cx="35" cy="182" r="8" />
          <circle cx="95" cy="182" r="8" />
          <circle cx="155" cy="182" r="8" />
          <circle cx="215" cy="182" r="8" />
          <circle cx="270" cy="182" r="8" />
        </g>
      </svg>
    );
  }

  // Spain Flag (Representing Spanish)
  return (
    <svg 
      viewBox="0 0 750 500" 
      className={baseClasses}
      aria-label="Español (España)"
      role="img"
    >
      <rect width="750" height="500" fill="#c60b1e" />
      <rect width="750" height="250" y="125" fill="#ffc400" />
      {/* Coat of arms silhouette */}
      <g transform="translate(180, 200) scale(0.65)">
        <circle cx="50" cy="50" r="45" fill="#c60b1e" opacity="0.85" />
        <rect x="25" y="30" width="50" height="40" rx="6" fill="#ffc400" />
        <circle cx="50" cy="20" r="10" fill="#ffc400" />
      </g>
    </svg>
  );
};
