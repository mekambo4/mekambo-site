import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  FlaskConical,
  Globe2,
  Landmark,
  Leaf,
  MessageSquare,
  Rocket,
  Sigma,
  Sparkles,
} from 'lucide-react';

const APPS = [
  {
    id: 'earth-space',
    name: 'Earth & Space Science',
    subtitle: 'Available now',
    examDate: 'June 18, 2026',
    comingSoon: false,
    icon: Leaf,
    image:
      'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2200&auto=format&fit=crop',
    description:
      'Practice Regents-style questions, build vocabulary fluency, and sharpen strategy with tools built by a teacher.',
    appStoreUrl: 'https://apps.apple.com/us/app/earth-science-regents-study/id378695932',
    features: [
      {
        title: 'Past Regents Practice',
        body: 'Train with exam-style prompts and immediate feedback to build confidence before test day.',
      },
      {
        title: 'Vocab Notecards',
        body: 'Memorize key Earth and Space Science terms with focused flashcard review.',
      },
      {
        title: 'Study Strategies',
        body: 'Use targeted tips to get more points from reference tables and common question types.',
      },
    ],
  },
  {
    id: 'biology',
    name: 'Biology',
    subtitle: 'Coming soon',
    examDate: 'June 2026',
    comingSoon: true,
    icon: FlaskConical,
    image:
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2200&auto=format&fit=crop',
    description:
      'A future Regents prep app focused on life systems, experiments, and exam-ready reasoning.',
    features: [],
  },
  {
    id: 'global-history',
    name: 'Global History',
    subtitle: 'Coming soon',
    examDate: 'June 2026',
    comingSoon: true,
    icon: Globe2,
    image:
      'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2200&auto=format&fit=crop',
    description:
      'A future Regents prep app focused on major eras, global themes, and evidence-based writing.',
    features: [],
  },
  {
    id: 'us-history',
    name: 'United States History',
    subtitle: 'Coming soon',
    examDate: 'June 2026',
    comingSoon: true,
    icon: Landmark,
    image:
      'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2200&auto=format&fit=crop',
    description:
      'A future Regents prep app focused on core periods, civic structures, and argumentative writing.',
    features: [],
  },
  {
    id: 'algebra-1',
    name: 'Algebra I',
    subtitle: 'Coming soon',
    examDate: 'June 2026',
    comingSoon: true,
    icon: Sigma,
    image:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2200&auto=format&fit=crop',
    description:
      'A future Regents prep app focused on fluency, procedural confidence, and model-based problem solving.',
    features: [],
  },
];

const THEMES = {
  'earth-space': {
    moss: '#1B2E24',
    cream: '#F4F7F5',
    accent: '#69C7A6',
    ink: '#0C1712',
  },
  biology: {
    moss: '#1D3121',
    cream: '#F3F8F2',
    accent: '#84C768',
    ink: '#0E1A11',
  },
  'global-history': {
    moss: '#332620',
    cream: '#FAF5EF',
    accent: '#D6A06B',
    ink: '#17110D',
  },
  'us-history': {
    moss: '#1A2A45',
    cream: '#F3F6FA',
    accent: '#7FA7DA',
    ink: '#0E1625',
  },
  'algebra-1': {
    moss: '#2E2143',
    cream: '#F7F4FC',
    accent: '#A987E2',
    ink: '#171022',
  },
};

const BASE_PATH = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

const normalizePath = (path) => {
  if (!path) return '/';
  const withoutTrailingSlash = path.replace(/\/+$/, '');
  return withoutTrailingSlash || '/';
};

const withBasePath = (path) => {
  const normalized = normalizePath(path);
  return BASE_PATH ? `${BASE_PATH}${normalized === '/' ? '' : normalized}` : normalized;
};

const stripBasePath = (pathname) => {
  const normalized = normalizePath(pathname);
  if (BASE_PATH && normalized.startsWith(BASE_PATH)) {
    const remainder = normalized.slice(BASE_PATH.length);
    return remainder || '/';
  }
  return normalized;
};

const parseRoute = (pathname) => {
  const relative = stripBasePath(pathname);
  if (relative === '/') return { page: 'landing' };

  const feedbackMatch = /^\/apps\/([^/]+)\/feedback$/.exec(relative);
  if (feedbackMatch) return { page: 'feedback', appId: decodeURIComponent(feedbackMatch[1]) };

  const appMatch = /^\/apps\/([^/]+)$/.exec(relative);
  if (appMatch) return { page: 'app', appId: decodeURIComponent(appMatch[1]) };

  return { page: 'not_found' };
};

const getTheme = (appId) => THEMES[appId] || THEMES['earth-space'];

const GlobalStyles = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=IBM+Plex+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap');

      :root {
        font-family: 'Outfit', sans-serif;
      }

      body {
        margin: 0;
        overflow-x: hidden;
      }

      .font-title { font-family: 'Plus Jakarta Sans', sans-serif; }
      .font-serif { font-family: 'Cormorant Garamond', serif; }
      .font-mono { font-family: 'IBM Plex Mono', monospace; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(32px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-up {
        opacity: 0;
        animation: fadeUp 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }

      .noise-overlay {
        position: fixed;
        inset: 0;
        pointer-events: none;
        opacity: 0.04;
        z-index: 999;
        mix-blend-mode: multiply;
      }
    `,
    }}
  />
);

function AppCard({ app, onOpen }) {
  const theme = getTheme(app.id);
  const Icon = app.icon;

  return (
    <button
      type="button"
      onClick={() => onOpen(app.id)}
      className="rounded-[2rem] border p-6 text-left transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{ borderColor: `${theme.accent}44`, backgroundColor: '#FFFFFFEE' }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${theme.accent}33`, color: theme.moss }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span className="font-mono text-xs uppercase tracking-wider" style={{ color: theme.moss }}>
          {app.subtitle}
        </span>
      </div>
      <h3 className="font-title text-2xl" style={{ color: theme.ink }}>
        {app.name}
      </h3>
      <p className="mt-3 text-sm" style={{ color: `${theme.ink}BB` }}>
        {app.description}
      </p>
      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: theme.moss }}>
        Open Page <ArrowRight className="h-4 w-4" />
      </div>
    </button>
  );
}

function LandingPage({ onOpenApp }) {
  const baseTheme = getTheme('earth-space');

  return (
    <div style={{ backgroundColor: baseTheme.cream, color: baseTheme.ink, minHeight: '100vh' }}>
      <section className="relative overflow-hidden bg-[#0C1712]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2200&auto=format&fit=crop")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1712] via-[#0C1712B3] to-[#0C171266]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-8 pt-8 md:px-10 md:pb-10 md:pt-10 lg:px-0">
          <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.2em] text-[#9FD8C2]" style={{ animationDelay: '0.1s' }}>
            Regents Prep App Collection
          </p>
          <h1 className="animate-fade-up mt-4 max-w-4xl font-title text-5xl leading-[0.95] text-[#F4F7F5] md:text-7xl" style={{ animationDelay: '0.2s' }}>
            One platform, multiple Regents subjects.
          </h1>
          <p className="animate-fade-up mt-6 max-w-2xl text-lg text-[#E0ECE7]" style={{ animationDelay: '0.35s' }}>
            Each subject keeps the same elegant experience with a distinct color identity, visual atmosphere, and dedicated feedback channel.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:px-10 lg:px-0">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {APPS.map((app) => (
            <AppCard key={app.id} app={app} onOpen={onOpenApp} />
          ))}
        </div>
      </section>

      <footer className="px-6 pb-12 pt-6 md:px-10 lg:px-0" style={{ backgroundColor: baseTheme.ink, color: baseTheme.cream }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-white/20 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 font-title text-lg">
            <Atom className="h-5 w-5" style={{ color: baseTheme.accent }} /> Regents Prep App Series
          </div>
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold" style={{ backgroundColor: baseTheme.accent, color: baseTheme.moss }}>
            <Sparkles className="h-4 w-4" /> Select an app to continue
          </div>
        </div>
      </footer>
    </div>
  );
}

function AppNav({ app, onHome, onFeedback }) {
  const theme = getTheme(app.id);

  return (
    <nav className="fixed left-1/2 top-6 z-50 flex w-[92%] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full border px-5 py-3 backdrop-blur-xl">
      <button
        type="button"
        onClick={onHome}
        className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold"
        style={{ color: theme.cream, backgroundColor: '#00000030' }}
      >
        <ArrowLeft className="h-4 w-4" /> All Apps
      </button>
      <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: theme.cream }}>
        <app.icon className="h-4 w-4" /> {app.name}
      </div>
      <button
        type="button"
        onClick={onFeedback}
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
        style={{ color: theme.moss, backgroundColor: theme.accent }}
      >
        <MessageSquare className="h-4 w-4" /> Feedback
      </button>
    </nav>
  );
}

function Hero({ app }) {
  const theme = getTheme(app.id);

  return (
    <section className="relative h-[74dvh] min-h-[520px] overflow-hidden" style={{ backgroundColor: theme.ink }}>
      <div className="absolute inset-0 bg-cover bg-center opacity-65" style={{ backgroundImage: `url("${app.image}")` }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${theme.ink}88 0%, ${theme.ink}CC 65%, ${theme.ink} 100%)` }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${theme.ink}CC 10%, transparent 70%)` }} />

      <div className="relative mx-auto flex h-full max-w-6xl items-center px-6 pb-2 pt-20 md:px-10 md:pb-2 md:pt-24 lg:px-0">
        <div className="max-w-4xl text-white">
          <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.2em] text-[#C3E7D9]" style={{ animationDelay: '0.15s' }}>
            <CalendarClock className="mr-2 inline h-4 w-4" /> Regents target: {app.examDate}
          </p>
          <h1 className="animate-fade-up mt-4 font-title text-5xl leading-[0.95] md:text-7xl" style={{ animationDelay: '0.25s' }}>
            Master
          </h1>
          <h2 className="animate-fade-up font-serif text-6xl italic leading-[0.9] md:text-8xl" style={{ color: theme.accent, animationDelay: '0.35s' }}>
            {app.name}
          </h2>
          <p className="animate-fade-up mt-6 max-w-xl text-lg text-white/85" style={{ animationDelay: '0.45s' }}>
            {app.description}
          </p>

          <div className="animate-fade-up mt-6 flex flex-wrap items-center gap-4" style={{ animationDelay: '0.55s' }}>
            {app.comingSoon ? (
              <span
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                style={{ backgroundColor: theme.accent, color: theme.moss }}
              >
                <Rocket className="h-4 w-4" /> Coming Soon
              </span>
            ) : (
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                style={{ backgroundColor: theme.accent, color: theme.moss }}
              >
                Download App <ArrowRight className="h-4 w-4" />
              </a>
            )}
            <span className="rounded-full border border-white/25 bg-black/25 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white/80">
              {app.subtitle}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureSection({ app }) {
  const theme = getTheme(app.id);

  if (app.comingSoon) {
    return (
      <section className="px-6 py-16 md:px-10 lg:px-0" style={{ backgroundColor: theme.cream }}>
        <div className="mx-auto max-w-6xl rounded-[2rem] border bg-white p-10" style={{ borderColor: `${theme.accent}55` }}>
          <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: theme.moss }}>
            In Development
          </p>
          <h3 className="mt-3 font-title text-4xl" style={{ color: theme.ink }}>Coming soon</h3>
          <p className="mt-4 max-w-2xl text-lg" style={{ color: `${theme.ink}BB` }}>
            This subject page is live for previews and feedback. Full prep content and app links will appear here when development is ready.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-16 md:px-10 lg:px-0" style={{ backgroundColor: theme.cream }}>
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: theme.moss }}>
          What you get
        </p>
        <h3 className="mt-3 font-title text-4xl" style={{ color: theme.ink }}>
          Designed for Regents outcomes
        </h3>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {app.features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[2rem] border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ borderColor: `${theme.accent}55` }}
            >
              <BookOpen className="animate-float h-8 w-8" style={{ color: theme.accent }} />
              <h4 className="mt-4 font-title text-xl" style={{ color: theme.ink }}>{feature.title}</h4>
              <p className="mt-3 text-sm" style={{ color: `${theme.ink}BB` }}>{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeedbackPage({ app, onBackToApp, onHome }) {
  const theme = getTheme(app.id);
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.target);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setStatus('success'))
      .catch(() => setStatus('success'));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.ink }}>
      <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url("${app.image}")` }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${theme.ink}D9 0%, ${theme.ink}F2 100%)` }} />

      <div className="relative mx-auto max-w-3xl px-6 pb-14 pt-10 md:px-10 lg:px-0">
        <div className="mb-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onHome}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All Apps
          </button>
          <button
            type="button"
            onClick={onBackToApp}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-sm font-semibold text-white"
          >
            Back to Page
          </button>
        </div>

        <div className="rounded-[2rem] border border-white/15 bg-white/95 p-8 shadow-2xl md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: theme.moss }}>
            Support & Feedback
          </p>
          <h1 className="mt-2 font-serif text-5xl leading-none" style={{ color: theme.ink }}>
            {app.name}
          </h1>
          <p className="mt-3 text-sm" style={{ color: `${theme.ink}CC` }}>
            Messages from this page are automatically tagged for <strong>{app.name}</strong>.
          </p>

          {status === 'success' ? (
            <div className="mt-7 rounded-2xl border p-6" style={{ borderColor: `${theme.accent}99`, backgroundColor: `${theme.accent}22` }}>
              <CheckCircle2 className="h-8 w-8" style={{ color: theme.moss }} />
              <h2 className="mt-3 font-title text-2xl" style={{ color: theme.ink }}>Message received</h2>
              <p className="mt-2 text-sm" style={{ color: `${theme.ink}CC` }}>
                Thank you. Your feedback is now tied to this app.
              </p>
            </div>
          ) : (
            <form name="support-form" method="POST" data-netlify="true" onSubmit={handleSubmit} className="mt-7 space-y-4">
              <input type="hidden" name="form-name" value="support-form" />
              <input type="hidden" name="app_id" value={app.id} />
              <input type="hidden" name="app_name" value={app.name} />

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="name"
                  required
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
                  style={{ borderColor: `${theme.accent}66` }}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email (optional)"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
                  style={{ borderColor: `${theme.accent}66` }}
                />
              </div>

              <select
                name="topic"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
                style={{ borderColor: `${theme.accent}66` }}
              >
                <option>Feature Request</option>
                <option>Bug Report</option>
                <option>Question</option>
                <option>Other</option>
              </select>

              <textarea
                name="message"
                required
                rows="5"
                placeholder="Tell me what you want improved or what issue you found."
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
                style={{ borderColor: `${theme.accent}66` }}
              />

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white disabled:opacity-70"
                style={{ backgroundColor: theme.moss }}
              >
                <MessageSquare className="h-4 w-4" />
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function AppPage({ app, onHome, onFeedback }) {
  const theme = getTheme(app.id);

  return (
    <div style={{ backgroundColor: theme.cream }}>
      <AppNav app={app} onHome={onHome} onFeedback={onFeedback} />
      <Hero app={app} />
      <FeatureSection app={app} />

      <footer className="px-6 pb-12 pt-6 md:px-10 lg:px-0" style={{ backgroundColor: theme.ink, color: theme.cream }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-white/20 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 font-title text-lg">
            <Atom className="h-5 w-5" style={{ color: theme.accent }} /> Regents Prep App Series
          </div>
          <button
            type="button"
            onClick={onFeedback}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
            style={{ backgroundColor: theme.accent, color: theme.moss }}
          >
            <MessageSquare className="h-4 w-4" /> Send Feedback
          </button>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (route.page === 'not_found') {
      const target = withBasePath('/');
      window.history.replaceState({}, '', target);
      setRoute({ page: 'landing' });
    }
  }, [route]);

  const goTo = (path) => {
    const target = withBasePath(path);
    window.history.pushState({}, '', target);
    setRoute(parseRoute(window.location.pathname));
    window.scrollTo(0, 0);
  };

  const selectedApp = useMemo(() => {
    if (!route.appId) return null;
    return APPS.find((app) => app.id === route.appId) || null;
  }, [route]);

  return (
    <>
      <GlobalStyles />
      <svg className="hidden" aria-hidden="true">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
      </svg>
      <div className="noise-overlay" style={{ filter: 'url(#noiseFilter)' }} />

      {route.page === 'landing' && <LandingPage onOpenApp={(appId) => goTo(`/apps/${appId}`)} />}

      {route.page === 'app' && selectedApp && (
        <AppPage
          app={selectedApp}
          onHome={() => goTo('/')}
          onFeedback={() => goTo(`/apps/${selectedApp.id}/feedback`)}
        />
      )}

      {route.page === 'feedback' && selectedApp && (
        <FeedbackPage
          app={selectedApp}
          onHome={() => goTo('/')}
          onBackToApp={() => goTo(`/apps/${selectedApp.id}`)}
        />
      )}
    </>
  );
}
