// 1. Fetch your portfolio JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Target your HTML container box
        const container = document.getElementById('card-container');

        // 2. We only want to look at "Senior Year" projects for now
        const seniorProjects = data["Senior Year"];

        // 3. Loop through just the Senior Year projects
        seniorProjects.forEach(project => {
            
            // Create a column for Bootstrap grid
            const cardColumn = document.createElement('div');
            cardColumn.classList.add('col');

            // If an image is missing, use a placeholder so the card doesn't look broken
            const projectImage = project.image || 'https://via.placeholder.com/300x150?text=Project+Image';

            // If a link doesn't exist, we hide the button or point it somewhere safe
            const projectLink = project.link || '#';

            // 4. Build the HTML for the card
            cardColumn.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${projectImage}" class="card-img-top" alt="${project.title}">
                    <div class="card-body">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text">${project.description}</p>
                    </div>
                    <div class="card-footer bg-transparent border-top-0">
                        <a href="${projectLink}" target="_blank" class="btn btn-primary btn-sm w-100">View Project</a>
                    </div>
                </div>
            `;

            // 5. Throw the finished card into your HTML grid container!
            container.appendChild(cardColumn);
        });
    })
    .catch(error => console.error('Error loading portfolio data:', error));