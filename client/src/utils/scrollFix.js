export const observeContainer = () => {
    const container = document.querySelector('.product-tables-container');

    const observer = new MutationObserver((mutations) => {
        // Whenever a new node is added to the container:
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Scroll the container to the left (to show the new item)
                container.scrollLeft = container.scrollWidth - container.clientWidth;
            }
        });
    });

    observer.observe(container, { childList: true });
}