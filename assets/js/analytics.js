!(function (t, e) {
  var o, n, p, r;
  e.__SV ||
    ((window.posthog = e),
    (e._i = []),
    (e.init = function (i, s, a) {
      function g(t, e) {
        var o = e.split(".");
        (2 == o.length && ((t = t[o[0]]), (e = o[1])),
          (t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          }));
      }
      (((p = t.createElement("script")).type = "text/javascript"),
        (p.crossOrigin = "anonymous"),
        (p.async = !0),
        (p.src =
          s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js"),
        (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r));
      var u = e;
      for (
        void 0 !== a ? (u = e[a] = []) : (a = "posthog"),
          u.people = u.people || [],
          u.toString = function (t) {
            var e = "posthog";
            return ("posthog" !== a && (e += "." + a), t || (e += " (stub)"), e);
          },
          u.people.toString = function () {
            return u.toString(1) + ".people (stub)";
          },
          o =
            "init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),
          n = 0;
        n < o.length;
        n++
      )
        g(u, o[n]);
      e._i.push([i, s, a]);
    }),
    (e.__SV = 1));
})(document, window.posthog || []);

posthog.init("phc_tkexiQSSBUEiAQCWDod7Kz82PWqdAfvQG6cSU426Ao7o", {
  api_host: "https://us.i.posthog.com",
  defaults: "2026-05-30",
  capture_pageview: true,
  session_recording: {
    maskAllInputs: false,
  }
});

// Google Analytics 4 - gtag is loaded via script tag in HTML
// Wait for gtag to be available before using it
function waitForGtag(callback) {
  if (typeof gtag !== 'undefined') {
    callback();
  } else {
    setTimeout(() => waitForGtag(callback), 100);
  }
}

// Utility: Get UTM parameters from URL
function getUTMParameters() {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') || 'direct',
    medium: params.get('utm_medium') || 'organic',
    campaign: params.get('utm_campaign') || 'none',
    content: params.get('utm_content') || 'none'
  };
}

// Utility: Store UTM in sessionStorage for tracking across page navigations
function storeUTMParameters() {
  const utm = getUTMParameters();
  sessionStorage.setItem('utm_source', utm.source);
  sessionStorage.setItem('utm_medium', utm.medium);
  sessionStorage.setItem('utm_campaign', utm.campaign);

  // Set PostHog properties for all subsequent events
  posthog.register({
    'utm_source': utm.source,
    'utm_medium': utm.medium,
    'utm_campaign': utm.campaign,
    'page_type': getPageType()
  });
}

// Utility: Determine page type
function getPageType() {
  const path = window.location.pathname;
  if (path.includes('project-')) return 'project_case_study';
  if (path === '/' || path === '/index.html') return 'home';
  return 'other';
}

// Utility: Get project name from filename or page
function getProjectName() {
  const path = window.location.pathname;
  const match = path.match(/project-(\w+)/);
  return match ? match[1] : null;
}

// Section Tracking: Use Intersection Observer to track when sections come into view
function initSectionTracking() {
  const sectionIds = ['overview', 'overview-section', 'problem', 'ideation', 'solution', 'reflection'];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionName = entry.target.id;
        const projectName = getProjectName() || 'home';

        posthog.capture('scrolled_to_section', {
          section: sectionName,
          project: projectName,
          page_type: getPageType()
        });

        // Also send to GA4 if available
        if (typeof gtag !== 'undefined') {
          gtag('event', 'scroll_to_section', {
            section: sectionName,
            project: projectName
          });
        }

        // Unobserve after triggering (only track once per section)
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3 // Trigger when 30% of section is visible
  });

  // Observe all sections
  sectionIds.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }
  });
}

// Resume Download Tracking
function initResumeTracking() {
  const resumeLinks = document.querySelectorAll('a[href*="resume"], a[data-static="resume"]');

  resumeLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const projectName = getProjectName() || 'home';

      posthog.capture('resume_clicked', {
        project: projectName,
        page_type: getPageType(),
        location: link.className || 'navigation'
      });

      if (typeof gtag !== 'undefined') {
        gtag('event', 'file_download', {
          file_name: 'resume.pdf',
          location: projectName
        });
      }
    });
  });
}

// Project Navigation Tracking
function initProjectNavTracking() {
  const prevLink = document.querySelector('a.nav-arrow-prev');
  const nextLink = document.querySelector('a.nav-arrow-next');
  const projectCards = document.querySelectorAll('.project-card-clickable');

  if (prevLink) {
    prevLink.addEventListener('click', () => {
      const currentProject = getProjectName();
      posthog.capture('project_nav_clicked', {
        direction: 'previous',
        from_project: currentProject,
        page_type: getPageType()
      });
    });
  }

  if (nextLink) {
    nextLink.addEventListener('click', () => {
      const currentProject = getProjectName();
      posthog.capture('project_nav_clicked', {
        direction: 'next',
        from_project: currentProject,
        page_type: getPageType()
      });
    });
  }

  // Track project card clicks from home page
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectHref = card.getAttribute('data-href');
      const projectMatch = projectHref.match(/project-(\w+)/);
      const projectName = projectMatch ? projectMatch[1] : 'unknown';

      posthog.capture('project_card_clicked', {
        project: projectName,
        page_type: getPageType()
      });
    });
  });
}

// Sidebar Navigation Tracking (for case studies)
function initSidebarNavTracking() {
  const sidebarLinks = document.querySelectorAll('.cs-local-sidebar a');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      const sectionId = link.getAttribute('href').substring(1);
      const projectName = getProjectName();

      posthog.capture('sidebar_nav_clicked', {
        section: sectionId,
        project: projectName,
        page_type: getPageType()
      });
    });
  });
}

// Social & External Link Tracking
function initExternalLinkTracking() {
  const externalLinks = document.querySelectorAll('a[target="_blank"]');

  externalLinks.forEach(link => {
    const href = link.getAttribute('href');

    link.addEventListener('click', () => {
      let linkType = 'external';
      let platform = 'unknown';

      if (href.includes('linkedin')) platform = 'linkedin';
      else if (href.includes('github')) platform = 'github';
      else if (href.includes('instagram')) platform = 'instagram';

      posthog.capture('external_link_clicked', {
        platform: platform,
        url: href,
        page_type: getPageType()
      });
    });
  });
}

// Time on Page Tracking
function initTimeTracking() {
  let timeOnPage = 0;
  const trackingInterval = 30000; // Track every 30 seconds

  const interval = setInterval(() => {
    timeOnPage += trackingInterval;

    if (timeOnPage % 60000 === 0) { // Log every 60 seconds
      posthog.capture('page_time_milestone', {
        seconds_on_page: timeOnPage,
        project: getProjectName(),
        page_type: getPageType()
      });
    }
  }, trackingInterval);

  // Send final time on unload
  window.addEventListener('beforeunload', () => {
    posthog.capture('page_exit', {
      total_time_seconds: timeOnPage,
      project: getProjectName(),
      page_type: getPageType()
    });
    clearInterval(interval);
  });
}

// Scroll Depth Tracking
function initScrollDepthTracking() {
  let scrollDepthTracked = {};

  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    const scrollPercent = Math.round((scrollTop + windowHeight) / documentHeight * 100);

    // Track at 25%, 50%, 75%, 100%
    const milestones = [25, 50, 75, 100];

    milestones.forEach(milestone => {
      if (scrollPercent >= milestone && !scrollDepthTracked[milestone]) {
        scrollDepthTracked[milestone] = true;

        posthog.capture('scroll_depth', {
          depth_percent: milestone,
          project: getProjectName(),
          page_type: getPageType()
        });
      }
    });
  });
}

// Initialize all tracking
function initializeAnalytics() {
  // Store UTM parameters first
  storeUTMParameters();

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSectionTracking();
      initResumeTracking();
      initProjectNavTracking();
      initSidebarNavTracking();
      initExternalLinkTracking();
      initTimeTracking();
      initScrollDepthTracking();
    });
  } else {
    initSectionTracking();
    initResumeTracking();
    initProjectNavTracking();
    initSidebarNavTracking();
    initExternalLinkTracking();
    initTimeTracking();
    initScrollDepthTracking();
  }
}

// Start analytics
initializeAnalytics();
