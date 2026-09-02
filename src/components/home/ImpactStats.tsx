import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function useCounter(target: number, duration: number = 2000, trigger: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration, trigger]);

  return count;
}

export default function ImpactStats() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const countStudents = useCounter(28500, 2200, inView);
  const countPrograms = useCounter(124, 1800, inView);
  const countFaculty = useCounter(1200, 2000, inView);
  const countCampuses = useCounter(3, 1000, inView);

  return (
    <section ref={ref} className="py-16 bg-[#F4F6F8] border-b border-gray-200">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
          {/* Featured Navy Card (AAU Signature Anchor) */}
          <div className="bg-[#00486E] text-white p-8 rounded-sm shadow flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-3 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">
                INSTITUTIONAL METRICS
              </span>
              <h3 className="text-2xl font-extrabold font-heading leading-tight">
                Our Impact in Numbers
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Wollega University is dedicated to human capital development, technological innovation, and societal transformation.
              </p>
            </div>
            <div className="pt-6 relative z-10">
              <Link
                to="/campuses"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider hover:text-[#00A3E0] transition-colors"
              >
                <span>Explore All Programs</span>
                <span>↗</span>
              </Link>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
          </div>

          {/* Stat 1: Campuses */}
          <div className="bg-white p-8 rounded-sm border border-gray-200 shadow-sm flex flex-col justify-center text-center hover:border-[#0073AA] transition-colors">
            <span className="text-4xl sm:text-5xl font-black text-[#00486E] font-heading">
              {countCampuses}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9251D] mt-2">
              Campuses
            </span>
            <span className="text-xs text-gray-500 mt-1">Nekemte • Shambu • Gimbi</span>
          </div>

          {/* Stat 2: Academic Programs */}
          <div className="bg-white p-8 rounded-sm border border-gray-200 shadow-sm flex flex-col justify-center text-center hover:border-[#0073AA] transition-colors">
            <span className="text-4xl sm:text-5xl font-black text-[#00486E] font-heading">
              {countPrograms}+
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9251D] mt-2">
              Programs
            </span>
            <span className="text-xs text-gray-500 mt-1">Undergraduate & Postgrad</span>
          </div>

          {/* Stat 3: Enrolled Students */}
          <div className="bg-white p-8 rounded-sm border border-gray-200 shadow-sm flex flex-col justify-center text-center hover:border-[#0073AA] transition-colors">
            <span className="text-4xl sm:text-5xl font-black text-[#00486E] font-heading">
              {countStudents.toLocaleString()}+
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9251D] mt-2">
              Active Learners
            </span>
            <span className="text-xs text-gray-500 mt-1">Regular, Evening & Summer</span>
          </div>

          {/* Stat 4: Academic Faculty */}
          <div className="bg-white p-8 rounded-sm border border-gray-200 shadow-sm flex flex-col justify-center text-center hover:border-[#0073AA] transition-colors">
            <span className="text-4xl sm:text-5xl font-black text-[#00486E] font-heading">
              {countFaculty.toLocaleString()}+
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9251D] mt-2">
              Instructors & Staff
            </span>
            <span className="text-xs text-gray-500 mt-1">Professors, Doctors & Lecturers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
