import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Bookmark, Share2, MapPin, Search, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';

const MOCK_JOBS = [
  {
    id: '1',
    title: 'Product Design',
    company: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    type: 'Full-time',
    location: 'Lagos (On-site)',
    experience: '5years',
    applicants: 40,
    salary: '$200 - $1,200',
    description: `We are seeking a highly skilled and creative Senior UI/UX Designer to join our dynamic team in Lagos. As a Senior UI/UX Designer, you will play a crucial role in designing intuitive and engaging user interfaces and enhancing user experience across various digital platforms. You will collaborate closely with cross-functional teams, including product managers, developers, and stakeholders, to bring innovative ideas to life and ensure a seamless user journey.
    
If you are passionate about creating top-notch digital experiences and have a keen eye for design, we would love to have you on board!`,
    responsibilities: [
      'Design and develop user-centric interfaces for web and mobile applications.',
      'Conduct user research, usability testing, and gather feedback to improve designs.',
      'Create wireframes, prototypes, and high-fidelity designs using design tools like Figma, Adobe XD, or Sketch.',
      'Collaborate with product managers and developers to ensure design consistency and feasibility.',
      'Stay updated with the latest UI/UX trends and best practices to ensure optimal user experience.',
      'Lead and mentor junior designers in the team, providing guidance and support.'
    ]
  }
];

const relatedJobs = [
  { id: '1', title: 'UI/UX Designer', company: 'Barone LLC.', salary: '$200 - $800' },
  { id: '2', title: 'UI/UX Designer', company: 'Acme Co.', salary: '$200 - $800' },
  { id: '3', title: 'UI/UX Designer', company: 'Big Kahuna Burger Ltd.', salary: '$200 - $800' },
  { id: '4', title: 'UI/UX Designer', company: 'Biffco Enterprises Ltd.', salary: '$200 - $800' },
];

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const job = MOCK_JOBS.find(j => j.id === id) || MOCK_JOBS[0];

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setApplying(true);
    try {
      await addDoc(collection(db, 'applications'), {
        userId: user.uid,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        status: 'pending',
        appliedAt: serverTimestamp(),
      });
      setApplied(true);
      alert('Application submitted successfully!');
    } catch (err) {
      console.error('Error applying:', err);
      alert('Failed to submit application. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `Job Opportunity: ${job.title} at ${job.company}`,
      text: job.description,
      url: window.location.href,
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
    <div className="bg-gray-50 min-h-screen">
      {/* Sub Header */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          
          <div className="flex-1 max-w-2xl mx-8 flex items-center gap-4">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 border border-gray-200 rounded-xl bg-gray-50">
              <Search className="text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Job title, Keywords, or Company name" 
                className="bg-transparent border-none focus:ring-0 w-full text-sm"
              />
            </div>
            <div className="flex items-center gap-3 px-4 py-2 border border-gray-200 rounded-xl bg-gray-50">
              <MapPin className="text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Location" 
                className="bg-transparent border-none focus:ring-0 w-32 text-sm"
              />
            </div>
            <button className="bg-blue-700 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-800 transition-all">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center p-4">
                  <img src={job.logo} alt={job.company} className="w-full" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">{job.title}</h1>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-medium">{job.company}</span>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <button className="p-2.5 text-gray-400 border border-gray-200 rounded-xl hover:bg-gray-50">
                    <Bookmark size={20} />
                  </button>
                  <button 
                    onClick={handleShare}
                    className="p-2.5 text-gray-400 border border-gray-200 rounded-xl hover:bg-gray-50"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
                <button 
                  onClick={handleApply}
                  disabled={applying || applied}
                  className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                    applied 
                      ? 'bg-green-600 text-white cursor-default' 
                      : 'bg-blue-700 text-white hover:bg-blue-800 shadow-blue-200'
                  }`}
                >
                  {applying ? 'Applying...' : applied ? 'Applied' : 'Apply now'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 py-8 border-y border-gray-100">
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Job type:</p>
                <p className="font-semibold text-gray-900">{job.type}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Location:</p>
                <p className="font-semibold text-gray-900">{job.location}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Experience:</p>
                <p className="font-semibold text-gray-900">{job.experience}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Number of Applicants:</p>
                <p className="font-semibold text-gray-900">{job.applicants}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Job description</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Related Jobs</h2>
              <div className="space-y-4">
                {relatedJobs.map((job, i) => (
                  <div key={i} className="p-4 rounded-xl border border-gray-100 bg-gray-50 relative group">
                    <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {job.company[0]}
                      </div>
                      <h3 className="text-sm font-bold text-gray-900">{job.title}</h3>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{job.company}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 font-medium">Remote</span>
                      <span className="text-[10px] text-gray-400 font-medium">{job.salary}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
