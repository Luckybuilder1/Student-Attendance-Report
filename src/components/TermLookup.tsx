import React, { useState } from 'react';
import { ACADEMIC_TERMS } from '../data/terms';
import { TermOption } from '../types';

interface TermLookupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTerm: (termCode: string) => void;
  currentTerm: string;
}

export const TermLookup: React.FC<TermLookupProps> = ({
  isOpen,
  onClose,
  onSelectTerm,
  currentTerm,
}) => {
  const [searchTerm, setSearchTerm] = useState(currentTerm || '');

  if (!isOpen) return null;

  const filteredTerms = ACADEMIC_TERMS.filter(
    (term) =>
      term.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lookup-dialog-title"
    >
      {/* PeopleSoft Look Up Dialog Container */}
      <div
        className="bg-white border-2 border-[#123651] shadow-2xl w-full max-w-[540px] text-[11px] font-sans"
        style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
      >
        {/* Title Bar */}
        <div className="bg-[#24557D] text-white px-3 py-1 flex items-center justify-between font-bold select-none border-b border-[#123651]">
          <span id="lookup-dialog-title" className="text-[12px] tracking-wide">
            Look Up Term
          </span>
          <button
            onClick={onClose}
            type="button"
            className="text-white hover:bg-[#123651] px-2 py-0.5 text-xs font-bold leading-none cursor-pointer"
            title="Close"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Search Header Controls */}
        <div className="p-3 bg-[#f8f9fa] border-b border-[#d8d8d8]">
          <div className="text-[11px] text-[#333333] mb-2">
            Select a Term from the list below or enter search criteria.
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <label htmlFor="term-search-input" className="font-bold text-[#333333]">
              Search by:
            </label>
            <span className="text-[#555555]">Term begins with</span>
            <input
              id="term-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-[#7f9db9] bg-white px-1.5 py-0.5 text-[11px] w-36 outline-none focus:border-[#24557D]"
              placeholder="e.g. 2025"
              autoFocus
            />
            <button
              type="button"
              onClick={() => {}}
              className="px-3 py-0.5 bg-[#f0f0f0] hover:bg-[#e4e4e4] active:bg-[#d8d8d8] border border-[#a0a0a0] text-[#222222] font-normal cursor-pointer rounded-[2px]"
            >
              Look Up
            </button>
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="px-2 py-0.5 bg-[#f0f0f0] hover:bg-[#e4e4e4] active:bg-[#d8d8d8] border border-[#a0a0a0] text-[#444444] font-normal cursor-pointer rounded-[2px]"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Search Results Grid */}
        <div className="p-3">
          <div className="text-[11px] font-bold text-[#666666] mb-1">
            Search Results ({filteredTerms.length} rows found)
          </div>

          <div className="border border-[#c5c5c5] max-h-64 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#e7eef6] border-b border-[#c5c5c5] text-[#003366] text-[11px] font-bold">
                  <th className="py-1 px-2 border-r border-[#c5c5c5]">Term</th>
                  <th className="py-1 px-2 border-r border-[#c5c5c5]">Description</th>
                  <th className="py-1 px-2 border-r border-[#c5c5c5]">Academic Career</th>
                  <th className="py-1 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTerms.length > 0 ? (
                  filteredTerms.map((term: TermOption, index: number) => {
                    const isEven = index % 2 === 0;
                    return (
                      <tr
                        key={term.code}
                        onClick={() => {
                          onSelectTerm(term.code);
                          onClose();
                        }}
                        className={`cursor-pointer hover:bg-[#fffae8] text-[11px] border-b border-[#e5e5e5] ${
                          isEven ? 'bg-white' : 'bg-[#fbfbfb]'
                        }`}
                      >
                        <td className="py-1.5 px-2 font-bold text-[#003399] underline border-r border-[#e5e5e5]">
                          {term.code}
                        </td>
                        <td className="py-1.5 px-2 text-[#333333] border-r border-[#e5e5e5]">
                          {term.description}
                        </td>
                        <td className="py-1.5 px-2 text-[#555555] border-r border-[#e5e5e5]">
                          {term.academicCareer}
                        </td>
                        <td className="py-1.5 px-2 text-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectTerm(term.code);
                              onClose();
                            }}
                            className="px-2 py-0.5 text-[10px] bg-[#fbf4e6] hover:bg-[#fae7c4] border border-[#d49b4b] text-[#222] rounded-[2px] cursor-pointer"
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-[#777777] italic">
                      No matching academic terms found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dialog Footer */}
        <div className="bg-[#f0f0f0] px-3 py-2 border-t border-[#d0d0d0] flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1 bg-white hover:bg-[#e8e8e8] border border-[#a0a0a0] text-[#333333] text-[11px] rounded-[2px] cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
