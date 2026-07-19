/*
  One-time scroll-triggered intro reveal (nav hidden + hero centered until
  first scroll input). Scoped to index.html (body.landing-experiment) via
  the body.intro-pending class that ships in the markup — see
  landing-experiment-additions.css for the paired styles.

  Fires on ANY scroll intent, not just an actual scroll delta on #main
  (some contexts don't reliably dispatch 'scroll'): wheel, touchmove,
  scroll-relevant keydown, plus a low-frequency scrollTop poll as a last
  resort backup. Whichever fires first wins; the rest tear down immediately.

  Reveal is a single one-time class swap (.intro-pending -> .intro-revealed):
  the nav fades/expands in and the hero docks tight beneath it purely via
  CSS transitions already defined for the unqualified selectors in
  landing-experiment-additions.css. The hero itself is never made
  position:sticky/fixed — it stays a plain, normal-flow element, so once
  docked it scrolls away like anything else; only the nav (its own
  position:fixed box) stays put.
*/
(() => {
    const init = () => {
        const body = document.body;
        if (!body.classList.contains('landing-experiment')) return;
        if (!body.classList.contains('intro-pending')) return;

        const mainEl = document.querySelector('#wrapper.screen #main');
        const scrollKeys = new Set(['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Spacebar', 'End', 'Home']);

        let done = false;
        let pollId = null;

        const teardown = () => {
            if (mainEl) mainEl.removeEventListener('scroll', onScroll);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('wheel', onWheel, { passive: true });
            window.removeEventListener('touchmove', onTouchMove, { passive: true });
            window.removeEventListener('keydown', onKeyDown);
            if (pollId) clearInterval(pollId);
        };

        const reveal = () => {
            if (done) return;
            done = true;
            body.classList.remove('intro-pending');
            body.classList.add('intro-revealed');
            teardown();
        };

        function onScroll() {
            reveal();
        }
        function onWheel(e) {
            if (e.deltaY !== 0 || e.deltaX !== 0) reveal();
        }
        function onTouchMove() {
            reveal();
        }
        function onKeyDown(e) {
            if (scrollKeys.has(e.key)) reveal();
        }

        if (mainEl) mainEl.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('wheel', onWheel, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('keydown', onKeyDown);

        let pollCount = 0;
        pollId = setInterval(() => {
            pollCount += 1;
            const scrolled = (mainEl && mainEl.scrollTop > 0) || window.scrollY > 0;
            if (scrolled) { reveal(); return; }
            if (pollCount > 400) clearInterval(pollId); // ~60s safety stop, in case of no-scroll sessions
        }, 150);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
