history.scrollRestoration = 'manual';
if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
}
window.scrollTo(0, 0);

window.initScrollReveal = () => {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
};

window.initDragScroll = (elementId) => {
    const el = document.getElementById(elementId);
    if (!el) return;
    let isDown = false, startX, scrollLeft;
    el.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; el.style.cursor = 'grabbing'; });
    el.addEventListener('mouseleave', () => { isDown = false; el.style.cursor = 'grab'; });
    el.addEventListener('mouseup',    () => { isDown = false; el.style.cursor = 'grab'; });
    el.addEventListener('mousemove',  e => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.4; });
    el.style.cursor = 'grab';
};

window.initSkillsBoard = (boardId) => {
    const board = document.getElementById(boardId);
    if (!board) return;
    let timers = [];

    const reset = () => {
        timers.forEach(clearTimeout);
        timers = [];
        board.querySelectorAll('.skill-row').forEach(row => {
            row.classList.remove('revealed');
            const fill = row.querySelector('.skill-row-bar-fill');
            if (fill) fill.style.transition = 'none';
        });
    };

    const cascade = () => {
        board.querySelectorAll('.skills-col').forEach(col => {
            col.querySelectorAll('.skill-row').forEach((row, i) => {
                const t = setTimeout(() => {
                    const fill = row.querySelector('.skill-row-bar-fill');
                    if (fill) fill.style.transition = '';
                    row.classList.add('revealed');
                }, i * 90);
                timers.push(t);
            });
        });
    };

    new IntersectionObserver(entries => {
        entries[0].isIntersecting ? cascade() : reset();
    }, { threshold: 0.15 }).observe(board);
};
