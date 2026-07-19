/*
  Home-view continuous-scroll behavior (index.html only — guarded by the
  body.landing-experiment check, which only that page carries).

  - The "work" nav link gets a scroll-spy .active state while #projects is
    in view, since work is now part of the continuous scroll rather than a
    click-to-switch panel.
  - Torn down when leaving view-home (e.g. if something elsewhere still
    triggers the old view-work/expt/about panel switch), so it never bleeds
    into those views.
*/
(() => {
    const init = () => {
        const body = document.body;
        if (!body.classList.contains('landing-experiment')) return;

        const projects = document.querySelector('#projects.work-panel');
        const workLinks = document.querySelectorAll('.top-site-links a[data-view="work"], .mob-menu-link[data-view="work"]');
        if (!projects || !workLinks.length) return;

        let workSpyObserver = null;
        let isActive = false;

        const startWorkSpyObserver = () => {
            workSpyObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        workLinks.forEach((link) => link.classList.toggle('active', entry.isIntersecting));
                    });
                },
                { threshold: 0.2 }
            );
            workSpyObserver.observe(projects);
        };

        const teardown = () => {
            if (workSpyObserver) { workSpyObserver.disconnect(); workSpyObserver = null; }
            workLinks.forEach((link) => link.classList.remove('active'));
        };

        const sync = () => {
            const shouldBeActive = body.classList.contains('view-home');
            if (shouldBeActive === isActive) return;
            isActive = shouldBeActive;
            teardown();
            if (isActive) startWorkSpyObserver();
        };

        sync();
        new MutationObserver(sync).observe(body, { attributes: true, attributeFilter: ['class'] });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
