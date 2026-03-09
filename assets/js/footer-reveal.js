(() => {
    const initFooterReveal = () => {
        const footer = document.querySelector('.global-footer');
        if (!footer) return;

        const body = document.body;
        const landingMain = document.querySelector('#wrapper.screen #main');
        const showThreshold = 10;
        const baseHideThreshold = 56;
        const maxHideThreshold = 180;
        const minScrollableDistance = 24;
        let activeScroller = null;
        let rafId = null;

        const isLandingScrollerMode = () =>
            body.classList.contains('landing-experiment') && Boolean(landingMain);

        const getScroller = () => (isLandingScrollerMode() ? landingMain : window);

        const getWindowMetrics = () => {
            const doc = document.documentElement;
            const scrollTop = window.pageYOffset || doc.scrollTop || 0;
            const viewportHeight = window.innerHeight || doc.clientHeight || 0;
            const contentHeight = Math.max(doc.scrollHeight, document.body.scrollHeight);
            const maxScroll = Math.max(0, contentHeight - viewportHeight);
            return {
                scrollTop,
                maxScroll
            };
        };

        const getElementMetrics = (element) => {
            const maxScroll = Math.max(0, element.scrollHeight - element.clientHeight);
            return {
                scrollTop: element.scrollTop || 0,
                maxScroll
            };
        };

        const getMetrics = (scroller) => {
            if (scroller === window) return getWindowMetrics();
            return getElementMetrics(scroller);
        };

        const getHideThreshold = () => {
            if (!footer.classList.contains('is-visible')) return baseHideThreshold;
            const measuredHeight = Math.round(footer.getBoundingClientRect().height || 0);
            return Math.min(maxHideThreshold, Math.max(baseHideThreshold, measuredHeight + 20));
        };

        const setFooterVisible = (visible) => {
            const currentlyVisible = footer.classList.contains('is-visible');
            if (currentlyVisible === visible) return;

            const scroller = getScroller();
            const shouldAnchorBottom =
                scroller !== window &&
                body.classList.contains('landing-experiment') &&
                !body.classList.contains('view-home');
            const wasNearBottom = shouldAnchorBottom
                ? Math.max(0, (scroller.scrollHeight - scroller.clientHeight) - (scroller.scrollTop || 0)) <= (showThreshold + 2)
                : false;

            footer.classList.toggle('is-visible', visible);

            if (wasNearBottom) {
                window.requestAnimationFrame(() => {
                    const nextMax = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
                    scroller.scrollTop = visible
                        ? nextMax
                        : Math.min(scroller.scrollTop || 0, nextMax);
                });
            }
        };

        const updateFooterVisibility = () => {
            if (body.classList.contains('landing-experiment') && body.classList.contains('view-home')) {
                setFooterVisible(false);
                return;
            }

            const scroller = getScroller();
            const { scrollTop, maxScroll } = getMetrics(scroller);
            const remaining = Math.max(0, maxScroll - scrollTop);

            if (maxScroll < minScrollableDistance) {
                setFooterVisible(false);
                return;
            }

            if (footer.classList.contains('is-visible')) {
                const hideThreshold = getHideThreshold();
                setFooterVisible(remaining <= hideThreshold);
                return;
            }

            setFooterVisible(remaining <= showThreshold);
        };

        const onScroll = () => {
            if (rafId !== null) return;
            rafId = window.requestAnimationFrame(() => {
                rafId = null;
                updateFooterVisibility();
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
        updateFooterVisibility();

        window.addEventListener('resize', updateFooterVisibility, { passive: true });
        window.addEventListener('load', updateFooterVisibility);
        window.addEventListener('hashchange', () => {
            bindScroller();
            window.setTimeout(updateFooterVisibility, 40);
        });

        const classObserver = new MutationObserver(() => {
            bindScroller();
            updateFooterVisibility();
        });
        classObserver.observe(body, { attributes: true, attributeFilter: ['class'] });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooterReveal);
    } else {
        initFooterReveal();
    }
})();
