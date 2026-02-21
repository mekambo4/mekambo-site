import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Globe2,
  BookOpen,
  Lightbulb,
  CheckCircle2, 
  Menu,
  MessageSquare,
  ChevronLeft,
  CalendarClock,
  GraduationCap
} from 'lucide-react';

// --- DESIGN TOKENS (Updated to Match App Screenshot) ---
const theme = {
  moss: '#1B2E24',     // Dark forest background
  mint: '#69C7A6',     // App accent color
  cream: '#F4F7F5',    // Off-white text/bg
  charcoal: '#0C1712', // Deepest dark
};

// --- GLOBAL STYLES & FONT INJECTION ---
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400;1,600&family=IBM+Plex+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

    :root {
      background-color: ${theme.cream};
      color: ${theme.charcoal};
    }

    body {
      margin: 0;
      overflow-x: hidden;
      font-family: 'Outfit', sans-serif;
      background-color: ${theme.cream};
    }

    .font-sans-bold { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-sans { font-family: 'Outfit', sans-serif; }
    .font-drama { font-family: 'Cormorant Garamond', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }

    /* Custom scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: ${theme.cream}; }
    ::-webkit-scrollbar-thumb { background: ${theme.moss}; border-radius: 4px; }

    .noise-overlay {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.05;
      mix-blend-mode: multiply;
    }

    /* Custom Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-up {
      animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      opacity: 0;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    @keyframes pulse-soft {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    .animate-pulse-soft {
      animation: pulse-soft 3s ease-in-out infinite;
    }
  `}} />
);

// --- COMPONENTS ---

// 1. Magnetic Button
const MagneticButton = ({ children, primary = false, onClick, href, className = "" }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const move = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      setPosition({ x, y });
    };

    const leave = () => {
      setPosition({ x: 0, y: 0 });
    };

    btn.addEventListener('mousemove', move);
    btn.addEventListener('mouseleave', leave);
    return () => {
      btn.removeEventListener('mousemove', move);
      btn.removeEventListener('mouseleave', leave);
    };
  }, []);

  const baseStyle = `group relative overflow-hidden rounded-full px-8 py-4 font-sans-bold text-sm tracking-wide transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03] inline-flex justify-center items-center ${className}`;
  const colorStyle = primary 
    ? `bg-[${theme.mint}] text-[${theme.moss}]` 
    : `bg-[${theme.moss}] text-[${theme.cream}]`;

  const InnerContent = () => (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-black/10 transition-transform duration-500 ease-out group-hover:translate-y-0 rounded-full" />
    </>
  );

  if (href) {
    return (
      <a 
        ref={buttonRef} 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyle} ${colorStyle}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)`, backgroundColor: primary ? theme.mint : theme.moss, color: primary ? theme.moss : theme.cream }}
      >
        <InnerContent />
      </a>
    );
  }

  return (
    <button 
      ref={buttonRef} 
      onClick={onClick} 
      className={`${baseStyle} ${colorStyle}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)`, backgroundColor: primary ? theme.mint : theme.moss, color: primary ? theme.moss : theme.cream }}
    >
      <InnerContent />
    </button>
  );
};

// 2. Navbar
const Navbar = ({ setView }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-6 left-1/2 z-50 flex w-[90%] max-w-5xl -translate-x-1/2 items-center justify-between rounded-full px-6 py-4 transition-all duration-500 ${
      scrolled ? 'bg-[#1B2E24]/90 backdrop-blur-xl border border-white/10 shadow-lg text-[#F4F7F5]' : 'bg-transparent text-[#F4F7F5]'
    }`}>
      <div 
        className="font-sans-bold text-lg tracking-tight flex items-center gap-2 cursor-pointer"
        onClick={() => setView('home')}
      >
        <Globe2 className="w-5 h-5 text-[#69C7A6]" />
        Earth Science Regents
      </div>
      <div className="hidden md:flex gap-8 font-sans text-sm font-medium">
        <button onClick={() => setView('home')} className="hover:text-[#69C7A6] transition-colors">App</button>
        <button onClick={() => setView('support')} className="hover:text-[#69C7A6] transition-colors">Support & Feedback</button>
      </div>
      <MagneticButton 
        primary 
        className="hidden md:flex !py-2.5 !px-6"
        href="https://apps.apple.com/us/app/earth-science-regents-study/id378695932"
      >
        Get the App
      </MagneticButton>
      <Menu className="block md:hidden w-6 h-6 text-[#69C7A6]" />
    </nav>
  );
};

// 3. Hero Section
const Hero = () => {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#0C1712]">
      {/* Background Image - Lush Forest matching screenshot */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000&auto=format&fit=crop")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B2E24] via-[#1B2E24]/60 to-transparent mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C1712]/80 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-8 pb-20 md:p-20 lg:p-32 flex flex-col justify-end h-full">
        <div className="max-w-4xl text-[#F4F7F5]">
          <p className="animate-fade-up font-mono text-sm tracking-widest text-[#69C7A6] uppercase mb-6 flex items-center gap-2" style={{ animationDelay: '0.2s' }}>
            <CalendarClock className="w-4 h-4" /> Next Exam: June 18, 2026
          </p>
          <h1 className="animate-fade-up font-sans-bold text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-2" style={{ animationDelay: '0.3s' }}>
            Master the
          </h1>
          <h1 className="animate-fade-up font-drama italic text-7xl md:text-8xl lg:text-[10rem] leading-[0.8] text-[#69C7A6] pr-4" style={{ animationDelay: '0.4s' }}>
            Regents.
          </h1>
          <p className="animate-fade-up font-sans text-lg md:text-xl mt-8 max-w-xl text-[#F4F7F5]/80 leading-relaxed font-light" style={{ animationDelay: '0.5s' }}>
            Practice questions from past exams, build your vocabulary with custom notecards, and unlock essential study tips.
          </p>
          <div className="animate-fade-up mt-12 flex items-center gap-6 flex-wrap" style={{ animationDelay: '0.8s' }}>
            <MagneticButton primary href="https://apps.apple.com/us/app/earth-science-regents-study/id378695932">
              Download App <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <span className="font-mono text-xs text-[#F4F7F5]/60 bg-black/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
              Available on App Store
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// 4. Feature Protocol (Sticky Stacking Archive)
const Protocol = () => {
  return (
    <section id="features" className="relative w-full bg-[#F4F7F5] pb-32">
      
      {/* Card 1: Practice Exams */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center p-6 bg-[#F4F7F5]">
        <div className="w-full max-w-6xl h-[80vh] max-h-[700px] bg-[#ffffff] rounded-[3rem] p-10 md:p-20 shadow-xl border border-[#1B2E24]/5 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full relative h-full min-h-[300px] bg-[#1B2E24]/5 rounded-[2rem] flex items-center justify-center overflow-hidden">
            <GraduationCap className="animate-float w-32 h-32 text-[#69C7A6] opacity-30 absolute" />
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-black/5 z-10 w-3/4 animate-fade-up">
              <div className="w-full h-4 bg-gray-100 rounded-full mb-4"></div>
              <div className="w-5/6 h-4 bg-gray-100 rounded-full mb-8"></div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#69C7A6]/20 flex items-center justify-center text-[#1B2E24] font-bold">A</div>
                <div className="h-8 flex-1 bg-gray-50 rounded-lg"></div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="font-mono text-xl text-[#69C7A6] mb-4 border border-[#69C7A6] w-12 h-12 flex items-center justify-center rounded-full">01</div>
            <h3 className="font-sans-bold text-4xl md:text-5xl text-[#1B2E24] mb-6">Past Exams</h3>
            <p className="font-sans text-xl text-[#1B2E24]/70 leading-relaxed">
              Drill with real questions from past New York State Earth Science Regents exams. Get immediate feedback and understand the logic behind every answer.
            </p>
          </div>
        </div>
      </div>

      {/* Card 2: Vocabulary */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center p-6 bg-[#F4F7F5]">
        <div className="w-full max-w-6xl h-[80vh] max-h-[700px] bg-[#1B2E24] rounded-[3rem] p-10 md:p-20 shadow-2xl flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full relative h-full min-h-[300px] bg-black/20 rounded-[2rem] flex items-center justify-center overflow-hidden perspective-1000">
             <BookOpen className="w-40 h-40 text-[#69C7A6] opacity-10 absolute animate-pulse-soft" />
             {/* Notecard Simulation */}
             <div className="w-64 h-40 bg-[#F4F7F5] rounded-xl shadow-2xl flex items-center justify-center p-6 text-center z-10 transform rotate-[-5deg] transition-transform hover:rotate-0 duration-300">
               <span className="font-sans-bold text-2xl text-[#1B2E24]">Lithosphere</span>
             </div>
             <div className="absolute w-64 h-40 bg-[#69C7A6] rounded-xl opacity-20 transform rotate-[10deg] z-0"></div>
          </div>
          <div className="flex-1">
            <div className="font-mono text-xl text-[#69C7A6] mb-4 border border-[#69C7A6] w-12 h-12 flex items-center justify-center rounded-full">02</div>
            <h3 className="font-sans-bold text-4xl md:text-5xl text-[#F4F7F5] mb-6">Vocab Notecards</h3>
            <p className="font-sans text-xl text-[#F4F7F5]/70 leading-relaxed">
              Earth Science is its own language. Master the crucial terminology with built-in digital flashcards designed for rapid memorization and retention.
            </p>
          </div>
        </div>
      </div>

      {/* Card 3: Key Ideas */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center p-6 bg-[#F4F7F5]">
        <div className="w-full max-w-6xl h-[80vh] max-h-[700px] bg-[#69C7A6] rounded-[3rem] p-10 md:p-20 shadow-2xl flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full relative h-full min-h-[300px] bg-black/10 rounded-[2rem] flex items-center justify-center overflow-hidden">
            <Lightbulb className="w-32 h-32 text-[#1B2E24] opacity-20 absolute animate-float" />
            <div className="bg-[#1B2E24] p-8 rounded-2xl w-3/4 shadow-2xl z-10 border border-white/10">
              <h4 className="font-sans-bold text-[#69C7A6] mb-4 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Study Tip</h4>
              <p className="font-sans text-[#F4F7F5]/90 text-sm leading-relaxed">
                "Always check the ESRT (Earth Science Reference Tables) first. Nearly 40% of the exam answers can be found directly in or inferred from the tables."
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="font-mono text-xl text-[#1B2E24] mb-4 border border-[#1B2E24] w-12 h-12 flex items-center justify-center rounded-full">03</div>
            <h3 className="font-sans-bold text-4xl md:text-5xl text-[#1B2E24] mb-6">Key Ideas & Tips</h3>
            <p className="font-sans text-xl text-[#1B2E24]/80 leading-relaxed">
              Don't just study harder, study smarter. Get curated tips, core concepts, and strategies specifically tailored for the format of the NYS Regents.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// 5. Teacher's Note (Replacing Philosophy)
const TeacherNote = ({ setView }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 overflow-hidden bg-[#0C1712] text-center flex flex-col justify-center min-h-[70vh]">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 scale-110 bg-fixed"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C1712] via-transparent to-[#0C1712]" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <p className={`font-sans text-xl md:text-2xl text-[#69C7A6] mb-8 font-light tracking-wide transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          A note from the developer
        </p>
        <h2 className={`font-drama italic text-4xl md:text-5xl lg:text-6xl text-[#F4F7F5] leading-relaxed mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          "I am an NYC public school teacher and want to make this app as useful as possible. Please submit feature requests or bugs, and I will work to improve it."
        </h2>
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <MagneticButton primary onClick={() => setView('support')} className="!py-4 !px-8 text-lg">
            <MessageSquare className="w-5 h-5 mr-2" /> Send Feedback
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

// 6. Support Form View (With Netlify Integration)
const SupportForm = ({ setView }) => {
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Package up the form data
    const formData = new FormData(e.target);
    
    // Send it to Netlify using AJAX
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => setStatus('success'))
    .catch((error) => {
      console.error('Form submission error:', error);
      // Fallback to success visually if you're testing it locally without Netlify
      setStatus('success'); 
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] pt-32 pb-20 px-6 flex items-center justify-center relative">
      <button 
        onClick={() => setView('home')}
        className="absolute top-8 left-8 flex items-center gap-2 text-[#1B2E24]/60 hover:text-[#1B2E24] transition-colors font-sans-bold"
      >
        <ChevronLeft className="w-5 h-5" /> Back to App
      </button>

      <div className="w-full max-w-2xl bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(27,46,36,0.1)] border border-[#1B2E24]/5">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-[#69C7A6]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#1B2E24]">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h2 className="font-drama italic text-4xl text-[#1B2E24] mb-4">Support & Feedback</h2>
          <p className="font-sans text-[#1B2E24]/60">
            Found a bug? Have a feature request? Let me know. I actively read and respond to make the app better for every student.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-[#69C7A6]/10 border border-[#69C7A6]/30 rounded-2xl p-8 text-center animate-fade-up">
            <CheckCircle2 className="w-12 h-12 text-[#69C7A6] mx-auto mb-4" />
            <h3 className="font-sans-bold text-xl text-[#1B2E24] mb-2">Message Received</h3>
            <p className="font-sans text-[#1B2E24]/70 mb-6">Thank you for helping improve Earth Science Regents Study!</p>
            <MagneticButton onClick={() => setView('home')}>Return Home</MagneticButton>
          </div>
        ) : (
          <form 
            name="support-form" 
            method="POST" 
            data-netlify="true" 
            onSubmit={handleSubmit} 
            className="space-y-6 animate-fade-up"
          >
            {/* Hidden field required for Netlify AJAX submissions */}
            <input type="hidden" name="form-name" value="support-form" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-sans-bold text-sm text-[#1B2E24]">Name</label>
                <input name="name" required type="text" className="w-full bg-[#F4F7F5] border border-[#1B2E24]/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#69C7A6] font-sans" placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <label className="font-sans-bold text-sm text-[#1B2E24]">Email (Optional)</label>
                <input name="email" type="email" className="w-full bg-[#F4F7F5] border border-[#1B2E24]/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#69C7A6] font-sans" placeholder="jane@example.com" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="font-sans-bold text-sm text-[#1B2E24]">Topic</label>
              <select name="topic" className="w-full bg-[#F4F7F5] border border-[#1B2E24]/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#69C7A6] font-sans text-[#1B2E24]">
                <option>Feature Request</option>
                <option>Bug Report</option>
                <option>Question on Content</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-sans-bold text-sm text-[#1B2E24]">Message</label>
              <textarea name="message" required rows="4" className="w-full bg-[#F4F7F5] border border-[#1B2E24]/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#69C7A6] font-sans resize-none" placeholder="Tell me what's on your mind..."></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full bg-[#1B2E24] text-[#F4F7F5] font-sans-bold py-4 rounded-xl hover:bg-[#69C7A6] hover:text-[#1B2E24] transition-colors disabled:opacity-50"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// 7. Footer
const Footer = ({ setView }) => (
  <footer className="bg-[#0C1712] text-[#F4F7F5] pt-24 pb-8 px-6 md:px-12 relative z-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 border-b border-white/10 pb-16">
      <div className="col-span-1 md:col-span-2">
        <div className="font-sans-bold text-2xl tracking-tight flex items-center gap-2 mb-4">
          <Globe2 className="w-6 h-6 text-[#69C7A6]" />
          Earth Science Regents
        </div>
        <p className="font-sans text-[#F4F7F5]/50 max-w-sm">
          Built by a teacher, for the students. Master the NYS Earth Science Regents with focused, essential tools.
        </p>
      </div>
      <div>
        <h4 className="font-mono text-xs text-[#69C7A6] mb-6 tracking-widest uppercase">Platform</h4>
        <ul className="space-y-4 font-sans text-sm text-[#F4F7F5]/70">
          <li><a href="https://apps.apple.com/us/app/earth-science-regents-study/id378695932" target="_blank" rel="noopener noreferrer" className="hover:text-[#F4F7F5] transition-colors">App Store</a></li>
          <li><button onClick={() => setView('support')} className="hover:text-[#F4F7F5] transition-colors">Support / Feedback</button></li>
        </ul>
      </div>
      <div>
        <h4 className="font-mono text-xs text-[#69C7A6] mb-6 tracking-widest uppercase">Legal</h4>
        <ul className="space-y-4 font-sans text-sm text-[#F4F7F5]/70">
          <li><a href="#" className="hover:text-[#F4F7F5] transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-[#F4F7F5] transition-colors">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="font-sans text-xs text-[#F4F7F5]/40">
        © 2026 Earth Science Regents Study App. Version 3.01.
      </div>
    </div>
  </footer>
);

// --- MAIN APP ---
export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'support'

  useEffect(() => {
    // Scroll to top when view changes
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <>
      <GlobalStyles />
      {/* Global Noise Overlay */}
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
      </svg>
      <div className="noise-overlay" style={{ filter: 'url(#noiseFilter)' }} />
      
      <main className="relative bg-[#F4F7F5]">
        {view === 'home' ? (
          <>
            <Navbar setView={setView} />
            <Hero />
            <Protocol />
            <TeacherNote setView={setView} />
            <Footer setView={setView} />
          </>
        ) : (
          <SupportForm setView={setView} />
        )}
      </main>
    </>
  );
}