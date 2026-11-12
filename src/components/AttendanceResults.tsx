import React from 'react';
import { AttendanceReportData } from '../types';

interface AttendanceResultsProps {
  report: AttendanceReportData;
  onClear: () => void;
}

export const AttendanceResults: React.FC<AttendanceResultsProps> = ({ report, onClear }) => {
  const handlePrint = () => {
    window.print();
  };

  const isEligible = report.attendancePercentage >= 75;

  return (
    <div
      className="mt-6 bg-white border border-[#b8b8b8] w-full max-w-[850px] text-[11px] font-sans"
      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      {/* Report Header Bar */}
      <div
        className="bg-[#f2f2f2] border-b border-[#c8c8c8] px-3 py-1 flex items-center justify-between"
        style={{ minHeight: '24px' }}
      >
        <span
          className="font-bold uppercase tracking-tight text-[12px]"
          style={{ color: '#A66332' }}
        >
          ATTENDANCE DETAILS — {report.termDescription.toUpperCase()}
        </span>
        <div className="flex items-center space-x-2 text-[11px]">
          <button
            type="button"
            onClick={handlePrint}
            className="text-[#003399] hover:underline cursor-pointer font-normal"
            title="Print Report"
          >
            [ Print ]
          </button>
          <span className="text-[#999999]">|</span>
          <button
            type="button"
            onClick={onClear}
            className="text-[#003399] hover:underline cursor-pointer font-normal"
            title="Close Report"
          >
            [ Close ]
          </button>
        </div>
      </div>

      <div className="p-3 text-[#222222]">
        {/* Student Verification Strip */}
        <div className="bg-[#f9fbfd] border border-[#d6e3f0] p-2.5 mb-3 text-[11px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <span className="font-bold text-black">Student Name: </span>
              <span>{report.studentName}</span>
            </div>
            <div>
              <span className="font-bold text-black">Campus ID: </span>
              <span>{report.campusId}</span>
            </div>
            <div>
              <span className="font-bold text-black">Course: </span>
              <span>{report.course} ({report.career})</span>
            </div>
            <div>
              <span className="font-bold text-black">Selected Term: </span>
              <span>{report.term}</span>
            </div>
          </div>
        </div>

        {/* Aggregate Summary Box */}
        <div className="mb-4">
          <div className="font-bold text-[#003366] text-[12px] mb-1.5 pb-0.5 border-b border-[#d8d8d8]">
            Attendance Summary
          </div>
          <table className="w-full sm:w-[500px] border-collapse border border-[#c5c5c5] text-[11px]">
            <tbody>
              <tr className="border-b border-[#e0e0e0] bg-[#fafafa]">
                <td className="p-1.5 font-bold text-black border-r border-[#c5c5c5] w-1/2">
                  Total Classes Scheduled:
                </td>
                <td className="p-1.5 font-semibold text-[#111111]">
                  {report.totalClasses}
                </td>
              </tr>
              <tr className="border-b border-[#e0e0e0]">
                <td className="p-1.5 font-bold text-black border-r border-[#c5c5c5]">
                  Classes Attended:
                </td>
                <td className="p-1.5 font-semibold text-[#006600]">
                  {report.classesAttended}
                </td>
              </tr>
              <tr className="border-b border-[#e0e0e0] bg-[#fafafa]">
                <td className="p-1.5 font-bold text-black border-r border-[#c5c5c5]">
                  Classes Absent:
                </td>
                <td className="p-1.5 font-semibold text-[#b30000]">
                  {report.classesAbsent}
                </td>
              </tr>
              <tr className="border-b border-[#c5c5c5] bg-[#edf4fb]">
                <td className="p-1.5 font-bold text-[#003366] border-r border-[#c5c5c5]">
                  Attendance Percentage:
                </td>
                <td className="p-1.5 font-bold text-[#003366] text-[12px]">
                  {report.attendancePercentage.toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td className="p-1.5 font-bold text-black border-r border-[#c5c5c5]">
                  Academic Standing:
                </td>
                <td className="p-1.5 font-bold">
                  {isEligible ? (
                    <span className="text-[#007700]">Eligible for Examination (≥ 75%)</span>
                  ) : (
                    <span className="text-[#cc0000]">Shortage of Attendance (&lt; 75%)</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Subject-Wise Attendance Breakdown Table */}
        <div>
          <div className="font-bold text-[#003366] text-[12px] mb-1.5 pb-0.5 border-b border-[#d8d8d8]">
            Course / Subject Breakdown
          </div>
          <div className="overflow-x-auto border border-[#c5c5c5]">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#e7eef6] text-[#003366] font-bold border-b border-[#c5c5c5]">
                  <th className="p-1.5 border-r border-[#c5c5c5]">Subject Code</th>
                  <th className="p-1.5 border-r border-[#c5c5c5]">Subject Title</th>
                  <th className="p-1.5 border-r border-[#c5c5c5]">Instructor</th>
                  <th className="p-1.5 text-center border-r border-[#c5c5c5]">Total</th>
                  <th className="p-1.5 text-center border-r border-[#c5c5c5]">Attended</th>
                  <th className="p-1.5 text-center border-r border-[#c5c5c5]">Absent</th>
                  <th className="p-1.5 text-center border-r border-[#c5c5c5]">Percentage</th>
                  <th className="p-1.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {report.subjects.map((sub, idx) => (
                  <tr
                    key={sub.code}
                    className={`border-b border-[#e5e5e5] ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
                    }`}
                  >
                    <td className="p-1.5 font-bold text-[#003399] border-r border-[#e5e5e5]">
                      {sub.code}
                    </td>
                    <td className="p-1.5 text-[#222222] border-r border-[#e5e5e5]">
                      {sub.name}
                    </td>
                    <td className="p-1.5 text-[#555555] border-r border-[#e5e5e5]">
                      {sub.faculty}
                    </td>
                    <td className="p-1.5 text-center border-r border-[#e5e5e5]">
                      {sub.totalClasses}
                    </td>
                    <td className="p-1.5 text-center text-[#006600] font-semibold border-r border-[#e5e5e5]">
                      {sub.attended}
                    </td>
                    <td className="p-1.5 text-center text-[#b30000] font-semibold border-r border-[#e5e5e5]">
                      {sub.absent}
                    </td>
                    <td className="p-1.5 text-center font-bold border-r border-[#e5e5e5]">
                      {sub.percentage.toFixed(2)}%
                    </td>
                    <td className="p-1.5 text-center font-semibold">
                      <span
                        className={
                          sub.status === 'Eligible'
                            ? 'text-[#007700]'
                            : sub.status === 'Shortage'
                            ? 'text-[#cc7700]'
                            : 'text-[#cc0000]'
                        }
                      >
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#edf4fb] font-bold text-[#003366] border-t-2 border-[#b0c4de]">
                  <td colSpan={3} className="p-1.5 text-right border-r border-[#c5c5c5]">
                    Aggregate Total:
                  </td>
                  <td className="p-1.5 text-center border-r border-[#c5c5c5]">
                    {report.totalClasses}
                  </td>
                  <td className="p-1.5 text-center text-[#006600] border-r border-[#c5c5c5]">
                    {report.classesAttended}
                  </td>
                  <td className="p-1.5 text-center text-[#b30000] border-r border-[#c5c5c5]">
                    {report.classesAbsent}
                  </td>
                  <td className="p-1.5 text-center text-[12px] border-r border-[#c5c5c5]">
                    {report.attendancePercentage.toFixed(2)}%
                  </td>
                  <td className="p-1.5 text-center">
                    {isEligible ? (
                      <span className="text-[#007700]">Eligible</span>
                    ) : (
                      <span className="text-[#cc0000]">Shortage</span>
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Notice Footer */}
        <div className="mt-3 text-[10px] text-[#777777] italic flex justify-between">
          <span>Report Generated: {report.generatedDate}</span>
          <span>System Authority: Student Academic Portal — Attendance Subsystem</span>
        </div>
      </div>
    </div>
  );
};
