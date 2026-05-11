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
