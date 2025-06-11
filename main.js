document.addEventListener('DOMContentLoaded', function() {
    const container = document.createElement('div');
    container.className = 'scale-container';
    document.body.prepend(container);
    while(document.body.children.length > 1) {
        container.appendChild(document.body.children[1]);
    }
    
    function updateScale() {
        const scale = Math.min(
        window.innerWidth / 1920, 
        window.innerHeight / 1080
        );
        container.style.transform = `scale(${scale})`;
        container.style.width = `${1600 / scale}px`;
        container.style.height = `${900 / scale}px`;
    }
    
    window.addEventListener('resize', updateScale);
    updateScale();
});