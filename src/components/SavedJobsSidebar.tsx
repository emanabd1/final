import { X } from 'lucide-react';

const savedJobs = [
  { id: '1', title: 'UI/UX Designer', company: 'Barone LLC.', salary: '$200 - $800' },
  { id: '2', title: 'Social Media Manager', company: 'Big Kahuna Burger Ltd.', salary: '$400 - $1000' },
  { id: '3', title: 'Graphic Designer', company: 'Biffco Enterprises Ltd.', salary: '$200 - $800' },
  { id: '4', title: 'Sales Executive', company: 'Acme Co.', salary: '$200 - $800' },
];

export default function SavedJobsSidebar() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full max-w-xs h-fit">
      <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Saved Jobs</h2>
      
      <div className="space-y-4">
        {savedJobs.map((job) => (
          <div key={job.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50 relative group">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors">
              <X size={14} />
            </button>
            <h3 className="text-sm font-bold text-gray-900 mb-1 pr-4">{job.title}</h3>
            <p className="text-xs text-gray-500 mb-2">{job.company}</p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 font-medium">Remote</span>
              <span className="text-[10px] text-gray-400 font-medium">{job.salary}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
