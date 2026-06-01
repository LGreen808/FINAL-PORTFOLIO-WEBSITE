fetch('FeaturedProjects.json')
    .then(response => response.json())
    .then(data => {
        // Helper to render a single year's carousel
        function renderYear(yearKey, containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            const projects = data[yearKey] || [];
            container.innerHTML = '';

            projects.forEach(project => {
                const img = project.image && project.image.trim() !== '' ? project.image : 'https://via.placeholder.com/600x400?text=No+Image';
                const link = project.link && project.link.trim() !== '' ? project.link : '';
                const buttonHTML = link ? `<a href="${link}" target="_blank" class="btn btn-success mt-2">View Project</a>` : '';

                const cardHTML = `
                    <div class="project-card card h-100">
                        <img src="${img}" class="card-img-top" alt="${project.title}">
                        <div class="card-body">
                            <h5 class="card-title">${project.title}</h5>
                            <p class="card-text">${project.description || 'No description provided.'}</p>
                            ${buttonHTML}
                        </div>
                    </div>
                `;

                container.innerHTML += cardHTML;
            });

            // Wire prev/next for this container
            const prevBtn = document.getElementById('prev-' + containerId.split('-').pop());
            const nextBtn = document.getElementById('next-' + containerId.split('-').pop());

            function scrollAmount(dir = 1) {
                const amount = Math.floor(container.clientWidth * 0.8) * dir;
                container.scrollBy({ left: amount, behavior: 'smooth' });
            }

            if (prevBtn) prevBtn.onclick = () => scrollAmount(-1);
            if (nextBtn) nextBtn.onclick = () => scrollAmount(1);
        }

        // Render each year into its own carousel
        renderYear('Senior Year', 'featured-senior');
        renderYear('Junior Year', 'featured-junior');
        renderYear('Sophomore Year', 'featured-soph');
    })
    .catch(error => console.error('Error:', error));
