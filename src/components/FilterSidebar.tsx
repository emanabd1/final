import { Search, MapPin, ChevronDown } from 'lucide-react';

export interface FilterState {
  datePosted: string;
  jobTypes: string[];
  location: string;
  experienceLevel: string;
  salaryRange: number;
  currency: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const handleJobTypeChange = (type: string) => {
    const newTypes = filters.jobTypes.includes(type)
      ? filters.jobTypes.filter(t => t !== type)
      : [...filters.jobTypes, type];
    onFilterChange({ ...filters, jobTypes: newTypes });
  };

  const handleReset = () => {
    onFilterChange({
      datePosted: 'Last 24 Hours',
      jobTypes: [],
      location: '',
      experienceLevel: 'Intermediate',
      salaryRange: 2000,
      currency: 'Dollar ($)'
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full max-w-xs h-fit">
      <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Filter</h2>
      
      <div className="space-y-6">
        {/* Date Posted */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Date Posted</label>
          <div className="relative">
            <select 
              value={filters.datePosted}
              onChange={(e) => onFilterChange({ ...filters, datePosted: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400" size={16} />
          </div>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Job Type</label>
          <div className="space-y-3">
            {['Full-time', 'Part-time', 'Internship', 'Contract', 'Volunteer'].map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.jobTypes.includes(type)}
                  onChange={() => handleJobTypeChange(type)}
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Enter your location" 
              value={filters.location}
              onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level</label>
          <div className="relative">
            <select 
              value={filters.experienceLevel}
              onChange={(e) => onFilterChange({ ...filters, experienceLevel: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Intermediate</option>
              <option>Junior</option>
              <option>Senior</option>
              <option>Expert</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400" size={16} />
          </div>
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Salary Range</label>
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>$20</span>
            <span>$2,000</span>
          </div>
          <input 
            type="range" 
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            min="20"
            max="2000"
            value={filters.salaryRange}
            onChange={(e) => onFilterChange({ ...filters, salaryRange: parseInt(e.target.value) })}
          />
          <div className="mt-4">
            <p className="text-xs text-center text-gray-500 mb-2">Input Manually</p>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 mb-1">From</p>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 mb-1">To</p>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
          <div className="relative">
            <select 
              value={filters.currency}
              onChange={(e) => onFilterChange({ ...filters, currency: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Dollar ($)</option>
              <option>Euro (€)</option>
              <option>Naira (₦)</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400" size={16} />
          </div>
        </div>

        <button 
          onClick={handleReset}
          className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-md shadow-blue-200"
        >
          Reset all filter
        </button>
      </div>
    </div>
  );
}
