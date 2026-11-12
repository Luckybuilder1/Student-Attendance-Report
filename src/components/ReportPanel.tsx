import React, { useState } from 'react';

interface ReportPanelProps {
  term: string;
  onTermChange: (newTerm: string) => void;
  onOpenLookup: () => void;
  onGenerate: () => void;
  isLoading: boolean;
  validationError: string | null;
}

export const ReportPanel: React.FC<ReportPanelProps> = ({
  term,
  onTermChange,
  onOpenLookup,
  onGenerate,
  isLoading,
  validationError,
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <div
      className="bg-white border border-[#b8b8b8] w-full sm:w-[365px] text-[11px] font-sans select-none"
      style={{
        boxShadow: 'none',
        borderRadius: '0px',
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      {/* Panel Heading */}
      <div
        className="bg-[#f2f2f2] border-b border-[#c8c8c8] px-2 py-[3px] flex items-center"
        style={{ minHeight: '22px' }}
      >
        <h1
          className="font-bold uppercase tracking-tight text-[13px] leading-none"
          style={{ color: '#A66332' }}
        >
          STUDENT ATTENDANCE REPORT
        </h1>
      </div>

      {/* Panel Body */}
      <form onSubmit={handleSubmit} className="p-[10px] text-[#222222]">
        {/* Validation Error Message */}
        {validationError && (
          <div
            className="mb-2 p-1.5 bg-[#fff3f3] border border-[#ff8888] text-[#c00000] text-[11px] flex items-center"
            role="alert"
          >
            <span className="font-bold mr-1">Error:</span> {validationError}
          </div>
        )}

        {/* Fields Grid */}
        <div className="space-y-[5px]">
          {/* Row 1: Name & Run Control ID */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline">
              <span className="font-bold text-[11px] w-[70px] text-black">Name:</span>
              <span className="text-[11px] text-[#333333]">Vicky Singh</span>
            </div>
            <div className="pr-3">
              <span className="font-bold text-[11px] text-black">Run Control ID</span>
            </div>
          </div>

          {/* Row 2: Career */}
          <div className="flex items-baseline">
            <span className="font-bold text-[11px] w-[70px] text-black">Career:</span>
            <span className="text-[11px] text-[#333333]">UG</span>
          </div>

          {/* Row 3: Course */}
          <div className="flex items-baseline">
            <span className="font-bold text-[11px] w-[70px] text-black">Course:</span>
            <span className="text-[11px] text-[#333333]">BCM12</span>
          </div>

          {/* Row 4: Campus ID */}
          <div className="flex items-baseline">
            <span className="font-bold text-[11px] w-[70px] text-black">Campus ID:</span>
            <span className="text-[11px] text-[#333333]">202510701120058</span>
          </div>

          {/* Row 5: Term (Only Editable Field) with Magnifying Glass */}
          <div className="flex items-center pt-[1px]">
            <label
              htmlFor="term-input"
              className="font-bold text-[11px] w-[70px] text-black cursor-pointer"
            >
              Term:
            </label>
            <div className="flex items-center space-x-1">
              <input
                id="term-input"
                type="text"
                value={term}
                onChange={(e) => onTermChange(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                className={`bg-white text-[11px] px-[2px] py-0 outline-none transition-colors ${
                  validationError ? 'border border-[#d00000]' : 'border border-[#7f9db9]'
                }`}
                style={{
                  width: '35px',
                  height: '17px',
                  borderRadius: '0px',
                  backgroundColor: '#ffffff',
                }}
                maxLength={10}
                aria-label="Term input"
                title="Enter Term"
              />

              {/* Exact PeopleSoft-Style Prompt Lookup Magnifying Glass Icon */}
              <button
                type="button"
                onClick={onOpenLookup}
                className="p-0 border-0 bg-transparent cursor-pointer flex items-center justify-center hover:opacity-80 active:translate-y-[1px]"
                title="Look up Term"
                aria-label="Look up Term"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block"
                >
                  {/* Outer circle of magnifying glass */}
                  <circle
                    cx="6.5"
                    cy="6.5"
                    r="4.5"
                    stroke="#486f96"
                    strokeWidth="1.5"
                    fill="#e4effa"
                  />
                  {/* Glass glare highlight */}
                  <path
                    d="M4.5 4.5 C5.2 3.8 6.5 3.8 7.2 4.5"
                    stroke="#ffffff"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  {/* Handle */}
                  <line
                    x1="10"
                    y1="10"
                    x2="14"
                    y2="14"
                    stroke="#3b5978"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Generate Attendance Button */}
        <div className="mt-[18px] flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`border text-[11px] py-[2px] px-2 font-normal text-[#222222] select-none cursor-pointer transition-all ${
              isLoading
                ? 'opacity-70 cursor-wait bg-[#fae5be]'
                : 'bg-gradient-to-b from-[#fbf4e6] to-[#f3dfbb] hover:from-[#fff8ec] hover:to-[#f8e7c7] active:from-[#eed3a5] active:to-[#fae5be]'
            }`}
            style={{
              width: '217px',
              height: '22px',
              borderColor: '#c99347',
              borderRadius: '2px',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
            }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-1.5 h-3 w-3 text-[#7d501b]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              'Generate Attendance'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
