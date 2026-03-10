(() => {
    const initTopbarScroll = () => {
        const body = document.body;
        if (!body.classList.contains('landing-experiment')) return;

        const topbar = document.querySelector('.landing-topbar');
        const mainScroller = document.querySelector('#wrapper.screen #main');
        if (!topbar) return;

        let activeScroller = null;
        let rafId = null;
        const topThreshold = 8;

        const useMainScroller = () =>
            body.classList.contains('view-work') ||
            body.classList.contains('view-expt') ||
            body.classList.contains('view-about');

        const getScroller = () => (useMainScroller() && mainScroller ? mainScroller : window);

        const getScrollTop = (scroller) => {
            if (scroller === window) {
                return window.pageYOffset || document.documentElement.scrollTop || 0;
            }
            return scroller.scrollTop || 0;
        };

        const updateTopbar = () => {
            const scrollTop = getScrollTop(getScroller());
            topbar.classList.toggle('is-collapsed', scrollTop > topThreshold);
        };

        const onScroll = () => {
            if (rafId !== null) return;
            rafId = window.requestAnimationFrame(() => {
                rafId = null;
                updateTopbar();
            });
        };

        const bindScroller = () => {
            const nextScroller = getScroller();
            if (nextScroller === activeScroller) return;

            if (activeScroller) {
                activeScroller.removeEventListener('scroll', onScroll);
            }

            activeScroller = nextScroller;
            activeScroller.addEventListener('scroll', onScroll, { passive: true });
        };

        bindScroller();
        updateTopbar();

        const onViewChange = () => {
            bindScroller();
            updateTopbar();
        };

        const classObserver = new MutationObserver(onViewChange);
        classObserver.observe(body, { attributes: true, attributeFilter: ['class'] });

        window.addEventListener('hashchange', () => {
            window.setTimeout(onViewChange, 40);
        });
        window.addEventListener('resize', onViewChange, { passive: true });
        window.addEventListener('load', onViewChange);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTopbarScroll);
    } else {
        initTopbarScroll();
    }
})();
