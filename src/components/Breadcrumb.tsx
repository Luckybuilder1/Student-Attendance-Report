import React from 'react';

export const Breadcrumb: React.FC = () => {
  return (
    <div
      className="w-full bg-[#b5ceea] border-b border-[#8eaecd] px-2 py-[2px] flex items-center text-[11px] font-sans select-none text-[#003366]"
      style={{ minHeight: '22px' }}
      role="navigation"
      aria-label="Breadcrumb navigation"
    >
      <div className="flex items-center space-x-1 flex-wrap">
        {/* Favorites dropdown trigger (showpiece) */}
        <span
          className="cursor-pointer hover:underline flex items-center pr-1 text-[#003366] font-normal"
          title="Favorites"
        >
          Favorites
          <span className="ml-[3px] text-[8px] text-[#003366] leading-none inline-block">▼</span>
        </span>

        {/* Separator */}
        <span className="text-[#8eaecd] font-light">|</span>

        {/* Main Menu dropdown trigger (showpiece) */}
        <span
          className="cursor-pointer hover:underline flex items-center px-1 text-[#003366] font-normal"
          title="Main Menu"
        >
          Main Menu
          <span className="ml-[3px] text-[8px] text-[#003366] leading-none inline-block">▼</span>
        </span>

        {/* Breadcrumb arrow */}
        <span className="text-[#003366] font-bold text-[10px] mx-[2px]">&gt;</span>

        {/* Student Academic Reports */}
        <span
          className="cursor-pointer hover:underline flex items-center text-[#003366] font-normal"
          title="Student Academic Reports"
        >
          Student Academic Reports
          <span className="ml-[3px] text-[8px] text-[#003366] leading-none inline-block">▼</span>
        </span>

        {/* Breadcrumb arrow */}
        <span className="text-[#003366] font-bold text-[10px] mx-[2px]">&gt;</span>

        {/* Student Attendance Report - Active page */}
        <span className="text-[#222222] font-normal" title="Student Attendance Report">
          Student Attendance Report
        </span>
      </div>
    </div>
  );
};
