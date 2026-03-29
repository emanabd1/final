import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import FilterSidebar, { FilterState } from '../components/FilterSidebar';
import JobCard, { Job } from '../components/JobCard';
import SavedJobsSidebar from '../components/SavedJobsSidebar';

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Product Design',
    company: 'Binford Ltd.',
    logo: '',
    type: 'Full-time',
    remote: true,
    salary: '$200 - $1,200',
    description: 'Design intuitive and visually appealing user interfaces for web and mobile applications. Conduct user research and create wireframes, prototypes, and mockups to improve user experience. Work closely with developers to implement designs.',
    iconBg: 'bg-purple-500',
    experienceLevel: 'Intermediate'
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'Binford Ltd.',
    logo: '',
    type: 'Full-time',
    remote: true,
    salary: '$200 - $1,200',
    description: 'Develop and implement user-facing features using HTML, CSS, and JavaScript frameworks like React or Angular. Collaborate with UI/UX designers to ensure responsive and visually appealing web pages. Optimize applications for speed and scalability.',
    iconBg: 'bg-gray-400',
    experienceLevel: 'Junior'
  },
  {
    id: '3',
    title: 'Digital Marketing Specialist',
    company: 'Big Kahuna Burger Ltd.',
    logo: '',
    type: 'Full-time',
    remote: true,
    salary: '$200 - $1,200',
    description: 'Create and execute digital marketing campaigns to drive online traffic and increase brand awareness. Utilize SEO, SEM, and social media strategies to engage target audiences. Analyze performance metrics to optimize campaigns.',
    iconBg: 'bg-blue-500',
    experienceLevel: 'Senior'
  },
  {
    id: '4',
    title: 'Data Analyst',
    company: 'Acme Co.',
    logo: '',
    type: 'Full-time',
    remote: true,
    salary: '$200 - $1,200',
    description: 'Interpret complex datasets to provide actionable insights. Use statistical tools to identify trends and patterns. Present data-driven reports to help guide business decision-making and strategy.',
    iconBg: 'bg-indigo-900',
    experienceLevel: 'Intermediate'
  }
];

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    datePosted: 'Last 24 Hours',
    jobTypes: ['Full-time'],
    location: '',
    experienceLevel: 'Intermediate',
    salaryRange: 2000,
    currency: 'Dollar ($)'
  });

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      // Filter by Job Type
      if (filters.jobTypes.length > 0 && !filters.jobTypes.includes(job.type)) {
        return false;
      }
      // Filter by Experience Level
      if (filters.experienceLevel && job.experienceLevel !== filters.experienceLevel) {
        return false;
      }
      // Filter by Location (simple search)
      if (filters.location && !job.location?.toLowerCase().includes(filters.location.toLowerCase())) {
        // Since mock jobs don't have location field in the interface yet, let's assume they match if no location is specified in mock
      }
      return true;
    });
  }, [filters]);

  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center">
                <p className="text-gray-500 text-lg">No jobs found matching your filters.</p>
                <button 
                  onClick={() => setFilters({
                    datePosted: 'Last 24 Hours',
                    jobTypes: [],
                    location: '',
                    experienceLevel: 'Intermediate',
                    salaryRange: 2000,
                    currency: 'Dollar ($)'
                  })}
                  className="mt-4 text-blue-700 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="hidden xl:block">
            <SavedJobsSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
