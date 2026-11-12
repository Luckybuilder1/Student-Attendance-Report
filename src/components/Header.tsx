import React from 'react';

export const Header: React.FC = () => {
  return (
    <header
      className="w-full relative flex items-center justify-end select-none"
      style={{
        height: '95px',
        background: 'linear-gradient(to bottom, #4B83B5 0%, #24557D 48%, #123651 100%)',
      }}
      role="banner"
    >
      {/* Hamburger menu icon on far right */}
      <div
        className="mr-6 sm:mr-8 flex flex-col justify-between cursor-pointer"
        style={{
          width: '52px',
          height: '47px', // 3 bars of 11px + 2 gaps of 7px = 33 + 14 = 47px
        }}
        aria-label="Navigation Menu (Showpiece)"
        title="Navigation Menu"
      >
        <div
          className="w-[52px] bg-white"
          style={{
            height: '11px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.35)',
            borderRadius: '1px',
          }}
        />
        <div
          className="w-[52px] bg-white"
          style={{
            height: '11px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.35)',
            borderRadius: '1px',
          }}
        />
        <div
          className="w-[52px] bg-white"
          style={{
            height: '11px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.35)',
            borderRadius: '1px',
          }}
        />
      </div>
    </header>
  );
};
