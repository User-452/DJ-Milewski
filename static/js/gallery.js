document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modal-img');
    const modalVideo = document.getElementById('modal-video');
    const modalVideoSource = modalVideo.querySelector('source');
    const closeBtn = document.querySelector('.close');

    let currentMedia = [];
    let currentIndex = -1;

    function openModal(index, mediaList) {
        currentMedia = mediaList;
        currentIndex = index;
        updateModalContent();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modalVideo.pause();
    }

    function updateModalContent() {
        const src = currentMedia[currentIndex];
        if (src.toLowerCase().endsWith('.mp4')) {
            modalImg.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideoSource.src = src;
            modalVideo.load();
        } else {
            modalVideo.style.display = 'none';
            modalImg.style.display = 'block';
            modalImg.src = src;
        }
    }

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeModal();
            }
        }
    });

    function setupGallery(mediaType, containerId, buttonId, sourceData) {
        const container = document.getElementById(containerId);
        const showMoreButton = document.getElementById(buttonId);
        let mediaItems = [];
        let offset = 0;
        const initialLoad = 6;
        const loadMoreCount = 6;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        function createGalleryItem(src, index) {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item', 'fade-in');

            if (mediaType === 'images') {
                const img = document.createElement('img');
                img.src = src;
                img.alt = 'Zdjęcie z galerii';
                img.onload = () => {
                    galleryItem.classList.add('loaded');
                };
                galleryItem.appendChild(img);
                const overlay = document.createElement('div');
                overlay.classList.add('gallery-overlay');

                galleryItem.appendChild(overlay);
            } else if (mediaType === 'videos') {
                const video = document.createElement('video');
                video.preload = 'metadata';
                const source = document.createElement('source');
                source.src = src;
                source.type = 'video/mp4';
                video.appendChild(source);
                video.insertAdjacentText('beforeend', 'Twoja przeglądarka nie wspiera odtwarzacza wideo.');
                video.onloadeddata = () => {
                    galleryItem.classList.add('loaded');
                };
                galleryItem.appendChild(video);
                const overlay = document.createElement('div');
                overlay.classList.add('gallery-overlay');

                galleryItem.appendChild(overlay);
            }

            galleryItem.addEventListener('click', () => openModal(index, mediaItems));
            return galleryItem;
        }

        function loadItems(count) {
            const data = sourceData.slice(offset, offset + count);

            if (data.length > 0) {
                data.forEach(src => {
                    const newIndex = mediaItems.length;
                    mediaItems.push(src);
                    const newItem = createGalleryItem(src, newIndex);
                    container.appendChild(newItem);
                    observer.observe(newItem);
                });
                offset += data.length;
            }

            if (offset >= sourceData.length) {
                showMoreButton.style.display = 'none';
            }
        }

        showMoreButton.addEventListener('click', () => loadItems(loadMoreCount));
        loadItems(initialLoad);
    }

    setupGallery('images', 'gallery-images', 'show-more-images', galleryImages);
    setupGallery('videos', 'gallery-videos', 'show-more-videos', galleryVideos);

    const allButtons = document.querySelectorAll('.show-more-button, .close');
    allButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('active-flash');
            setTimeout(() => {
                this.classList.remove('active-flash');
            }, 1000);
        });
    });
});