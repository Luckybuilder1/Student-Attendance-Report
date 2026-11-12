import React, { useState } from 'react';
import { Breadcrumb } from './components/Breadcrumb';
import { Header } from './components/Header';
import { ReportPanel } from './components/ReportPanel';
import { TermLookup } from './components/TermLookup';
import { AttendanceResults } from './components/AttendanceResults';
import { getAttendanceReport } from './data/terms';
import { AttendanceReportData } from './types';

export default function App() {
  const [term, setTerm] = useState<string>('');
  const [isLookupOpen, setIsLookupOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [attendanceReport, setAttendanceReport] = useState<AttendanceReportData | null>(null);

  const handleTermChange = (newTerm: string) => {
    setTerm(newTerm);
    if (validationError && newTerm.trim().length > 0) {
      setValidationError(null);
    }
  };

  const handleSelectTerm = (selectedTerm: string) => {
    setTerm(selectedTerm);
    setValidationError(null);
  };

  const handleGenerateAttendance = () => {
    if (!term || term.trim() === '') {
      setValidationError('Please specify an Academic Term before generating the attendance report.');
      return;
    }

    setValidationError(null);
    setIsLoading(true);

    // Realistic brief system generation latency
    setTimeout(() => {
      const report = getAttendanceReport(term.trim());
      setAttendanceReport(report);
      setIsLoading(false);
    }, 400);
  };

  const handleClearReport = () => {
    setAttendanceReport(null);
  };

  return (
    <div
      className="min-h-screen bg-white text-[#222222] flex flex-col"
      style={{
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      {/* 1. Top Breadcrumb Bar */}
      <Breadcrumb />

      {/* 2. Main Header with Gradient & 3-bar Hamburger Icon */}
      <Header />

      {/* 3. Utility Links (Showpiece) */}
      <div className="w-full px-[18px] pt-[8px] pb-[6px] flex justify-end select-none">
        <div className="text-[11px] text-[#003399] flex items-center space-x-1">
          <span
            className="hover:underline cursor-pointer"
            title="Open in new window (Showpiece)"
          >
            New Window
          </span>
          <span className="text-[#666666] mx-[4px]">|</span>
          <span
            className="hover:underline cursor-pointer"
            title="Personalize page (Showpiece)"
          >
            Personalize Page
          </span>
        </div>
      </div>

      {/* 4. Main Body Content Area */}
      <main className="flex-1 px-[18px] pt-[4px] pb-16">
        {/* Student Attendance Report Panel (Positioned upper-left) */}
        <ReportPanel
          term={term}
          onTermChange={handleTermChange}
          onOpenLookup={() => setIsLookupOpen(true)}
          onGenerate={handleGenerateAttendance}
          isLoading={isLoading}
          validationError={validationError}
        />

        {/* Dynamic Attendance Results (Rendered directly below panel once generated) */}
        {attendanceReport && (
          <AttendanceResults report={attendanceReport} onClear={handleClearReport} />
        )}
      </main>

      {/* Term Lookup Dialog Modal */}
      <TermLookup
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
        onSelectTerm={handleSelectTerm}
        currentTerm={term}
      />
    </div>
  );
}
