import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Atom,
  FlaskConical,
  Globe2,
  Landmark,
  Leaf,
  MessageSquare,
  Rocket,
  Sigma,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

const APPS = [
  {
    id: 'earth-space',
    name: 'Earth & Space Science',
    subtitle: 'Available now',
    description:
      'Practice with Regents-style questions, build vocabulary, and learn high-impact test strategies.',
    icon: Leaf,
    comingSoon: false,
    appStoreUrl: 'https://apps.apple.com/us/app/earth-science-regents-study/id378695932',
    features: [
      {
        title: 'Past Regents Practice',
        copy: 'Train with exam-style prompts and immediate feedback to build confidence before test day.',
      },
      {
        title: 'Vocabulary Notecards',
        copy: 'Memorize core Earth and Space Science terms with focused flashcard-style review.',
      },
      {
        title: 'Study Strategies',
        copy: 'Use targeted tips to make the most of your review time and reference tables.',
      },
    ],
  },
  {
    id: 'biology',
    name: 'Biology',
    subtitle: 'Coming soon',
    description:
      'A future Regents prep app focused on life science concepts, labs, and exam strategy.',
    icon: FlaskConical,
    comingSoon: true,
    features: [],
  },
  {
    id: 'global-history',
    name: 'Global History',
    subtitle: 'Coming soon',
    description:
      'A future Regents prep app focused on themes, documents, and long-essay preparation.',
    icon: Globe2,
    comingSoon: true,
    features: [],
  },
  {
    id: 'us-history',
    name: 'United States History',
    subtitle: 'Coming soon',
    description:
      'A future Regents prep app focused on key eras, civic understanding, and evidence-based writing.',
    icon: Landmark,
    comingSoon: true,
    features: [],
  },
  {
    id: 'algebra-1',
    name: 'Algebra I',
    subtitle: 'Coming soon',
    description:
      'A future Regents prep app focused on core algebra skills, fluency, and exam pacing.',
    icon: Sigma,
    comingSoon: true,
    features: [],
  },
];

const THEMES = {
  'earth-space': {
    ink: '#10251E',
    shell: '#F3F7F3',
    accent: '#66C8A3',
    accentSoft: '#D5F2E8',
    muted: '#4C6960',
    panel: '#FFFFFF',
  },
  biology: {
    ink: '#16261B',
    shell: '#F4F8F2',
    accent: '#7AC65A',
    accentSoft: '#E1F4D6',
    muted: '#506A4B',
    panel: '#FFFFFF',
  },
  'global-history': {
    ink: '#271D18',
    shell: '#FAF5EF',
    accent: '#D4975B',
    accentSoft: '#F3E2CE',
    muted: '#7A5A45',
    panel: '#FFFFFF',
  },
  'us-history': {
    ink: '#132238',
    shell: '#F3F6FA',
    accent: '#5D8ECB',
    accentSoft: '#D8E7F8',
    muted: '#4B6286',
    panel: '#FFFFFF',
  },
  'algebra-1': {
    ink: '#25193A',
    shell: '#F7F4FC',
    accent: '#9B77D7',
    accentSoft: '#E7DDF8',
    muted: '#665284',
    panel: '#FFFFFF',
  },
};

const BASE_PATH = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

const normalizePath = (path) => {
  if (!path) return '/';
  const withoutTrailingSlash = path.replace(/\/+$/, '');
  return withoutTrailingSlash || '/';
};

const stripBasePath = (pathname) => {
  const normalized = normalizePath(pathname);
  if (BASE_PATH && normalized.startsWith(BASE_PATH)) {
    const sliced = normalized.slice(BASE_PATH.length);
    return sliced || '/';
  }
  return normalized;
};

const withBasePath = (path) => {
  const normalized = normalizePath(path);
  return BASE_PATH ? `${BASE_PATH}${normalized === '/' ? '' : normalized}` : normalized;
};

const getAppIdFromPath = (pathname) => {
  const relativePath = stripBasePath(pathname);
  if (relativePath === '/') return null;
  const match = /^\/apps\/([^/]+)$/.exec(relativePath);
  return match ? decodeURIComponent(match[1]) : '__not_found__';
};

const pageWrapStyle = (theme) => ({
  backgroundColor: theme.shell,
  color: theme.ink,
  minHeight: '100vh',
});

function LandingPage({ onSelect }) {
  return (
    <div className="min-h-screen px-6 py-10 md:px-12 lg:px-20" style={pageWrapStyle(THEMES['earth-space'])}>
      <header className="mx-auto flex max-w-6xl items-center justify-between py-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Atom className="h-5 w-5" /> Regents Prep Apps
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 pb-8 pt-14 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <p className="mb-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: '#E4F1EC', color: '#1E3A31' }}>
            Teacher-built learning tools
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">Choose your Regents prep app</h1>
          <p className="mt-5 max-w-2xl text-lg" style={{ color: '#3E5B52' }}>
            Every app uses the same clean experience with its own subject-specific color identity.
            Earth & Space Science is live now. Other subjects are coming soon.
          </p>
        </div>
        <div className="rounded-3xl p-6" style={{ backgroundColor: '#0F241E', color: '#EEF7F3' }}>
          <p className="text-sm uppercase tracking-[0.2em]" style={{ color: '#9CCCB9' }}>
            Current release
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Earth & Space Science</h2>
          <p className="mt-2 text-sm" style={{ color: '#BBD9CE' }}>
            Interactive marketing and support page now available.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 pb-12 md:grid-cols-2 lg:grid-cols-3">
        {APPS.map((app) => {
          const theme = THEMES[app.id];
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              type="button"
              onClick={() => onSelect(app.id)}
              className="rounded-3xl border p-6 text-left transition hover:-translate-y-1 hover:shadow-xl"
              style={{ backgroundColor: theme.panel, borderColor: theme.accentSoft }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: theme.accentSoft, color: theme.ink }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: theme.muted }}>
                  {app.subtitle}
                </span>
              </div>
              <h3 className="text-2xl font-semibold" style={{ color: theme.ink }}>{app.name}</h3>
              <p className="mt-3 text-sm" style={{ color: theme.muted }}>{app.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: theme.ink }}>
                View Page <ArrowRight className="h-4 w-4" />
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
}

function FeedbackForm({ app, theme }) {
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

  if (status === 'success') {
    return (
      <div className="rounded-3xl border p-8" style={{ borderColor: theme.accentSoft, backgroundColor: theme.panel }}>
        <CheckCircle2 className="mb-4 h-10 w-10" style={{ color: theme.accent }} />
        <h3 className="text-2xl font-semibold">Thanks for the feedback</h3>
        <p className="mt-2" style={{ color: theme.muted }}>
          Your message was sent and tagged for {app.name}.
        </p>
      </div>
    );
  }

  return (
    <form
      name="support-form"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border p-8"
      style={{ borderColor: theme.accentSoft, backgroundColor: theme.panel }}
    >
      <input type="hidden" name="form-name" value="support-form" />
      <input type="hidden" name="app_id" value={app.id} />
      <input type="hidden" name="app_name" value={app.name} />

      <div>
        <h3 className="text-2xl font-semibold">Feedback</h3>
        <p className="mt-2" style={{ color: theme.muted }}>
          This form is tagged for: <strong>{app.name}</strong>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="name"
          required
          type="text"
          placeholder="Name"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
          style={{ borderColor: theme.accentSoft }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email (optional)"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
          style={{ borderColor: theme.accentSoft }}
        />
      </div>

      <select
        name="topic"
        className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
        style={{ borderColor: theme.accentSoft }}
      >
        <option>Feature Request</option>
        <option>Bug Report</option>
        <option>Question</option>
        <option>Other</option>
      </select>

      <textarea
        name="message"
        required
        rows="4"
        placeholder="What would you like to share?"
        className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
        style={{ borderColor: theme.accentSoft }}
      />

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition disabled:opacity-60"
        style={{ backgroundColor: theme.ink, color: '#FFFFFF' }}
      >
        <MessageSquare className="h-4 w-4" />
        {status === 'submitting' ? 'Sending...' : 'Send Feedback'}
      </button>
    </form>
  );
}

function AppPage({ app, onBack }) {
  const theme = THEMES[app.id];
  const Icon = app.icon;

  return (
    <div style={pageWrapStyle(theme)}>
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-12 lg:px-0">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border px-4 py-2 text-sm font-semibold"
          style={{ borderColor: theme.accentSoft }}
        >
          Back to all apps
        </button>
        <div className="text-sm font-semibold" style={{ color: theme.muted }}>
          Regents Prep App Series
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-16 md:px-12 lg:px-0">
        <section
          className="rounded-3xl border px-8 py-12 md:px-12 md:py-16"
          style={{ backgroundColor: theme.panel, borderColor: theme.accentSoft }}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide" style={{ backgroundColor: theme.accentSoft, color: theme.ink }}>
            <Sparkles className="h-3.5 w-3.5" />
            {app.subtitle}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: theme.accentSoft }}>
              <Icon className="h-6 w-6" style={{ color: theme.ink }} />
            </span>
            <h1 className="text-4xl font-bold md:text-5xl">{app.name}</h1>
          </div>
          <p className="mt-5 max-w-3xl text-lg" style={{ color: theme.muted }}>
            {app.description}
          </p>

          {!app.comingSoon && (
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
                style={{ backgroundColor: theme.ink, color: '#FFFFFF' }}
              >
                Download on App Store <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </section>

        {app.comingSoon ? (
          <section className="mt-8 rounded-3xl border p-10" style={{ backgroundColor: theme.panel, borderColor: theme.accentSoft }}>
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase" style={{ backgroundColor: theme.accentSoft, color: theme.ink }}>
              <Rocket className="h-3.5 w-3.5" /> In development
            </div>
            <h2 className="mt-4 text-3xl font-semibold">Coming soon</h2>
            <p className="mt-3 max-w-2xl" style={{ color: theme.muted }}>
              This page is intentionally live so you can submit feedback early. Content and app links will be published here when development is ready.
            </p>
          </section>
        ) : (
          <section className="mt-8 grid gap-5 md:grid-cols-3">
            {app.features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border p-6"
                style={{ backgroundColor: theme.panel, borderColor: theme.accentSoft }}
              >
                <h2 className="text-xl font-semibold">{feature.title}</h2>
                <p className="mt-3 text-sm" style={{ color: theme.muted }}>{feature.copy}</p>
              </article>
            ))}
          </section>
        )}

        <section className="mt-8">
          <FeedbackForm app={app} theme={theme} />
        </section>
      </main>
    </div>
  );
}

export default function App() {
  const [routeAppId, setRouteAppId] = useState(() => getAppIdFromPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setRouteAppId(getAppIdFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPath = useCallback((path, replace = false) => {
    const next = withBasePath(path);
    if (replace) {
      window.history.replaceState({}, '', next);
    } else {
      window.history.pushState({}, '', next);
    }
    setRouteAppId(getAppIdFromPath(window.location.pathname));
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (routeAppId === '__not_found__') {
      navigateToPath('/', true);
    }
  }, [routeAppId, navigateToPath]);

  const selectedApp = useMemo(
    () => APPS.find((app) => app.id === routeAppId) || null,
    [routeAppId],
  );

  if (routeAppId === '__not_found__') {
    return null;
  }

  if (!routeAppId || !selectedApp) {
    return <LandingPage onSelect={(id) => navigateToPath(`/apps/${id}`)} />;
  }

  return <AppPage app={selectedApp} onBack={() => navigateToPath('/')} />;
}
