import { Bookmark, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  type: string;
  remote: boolean;
  salary: string;
  description: string;
  iconBg: string;
  experienceLevel?: string;
  location?: string;
}

export default function JobCard({ job }: { job: Job }) {
  const handleShare = async () => {
    const shareData = {
      title: `Job Opportunity: ${job.title} at ${job.company}`,
      text: job.description,
      url: `${window.location.origin}/job/${job.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group relative">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={`${job.iconBg} p-3 rounded-2xl text-white`}>
            {/* Using a placeholder icon based on title */}
            <div className="w-8 h-8 flex items-center justify-center font-bold text-xl">
              {job.company[0]}
            </div>
          </div>
          <div>
            <Link to={`/job/${job.id}`} className="text-xl font-bold text-gray-900 hover:text-blue-700 transition-colors">
              {job.title}
            </Link>
            <p className="text-gray-500 text-sm font-medium">{job.company}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all">
            <Bookmark size={20} />
          </button>
          <button 
            onClick={handleShare}
            className="p-2 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-semibold">Remote</span>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-semibold">{job.type}</span>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-semibold">{job.salary}</span>
      </div>

      <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
        {job.description}
      </p>
    </div>
  );
}
