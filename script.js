fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('card-container');

        // Choose which year you want to show on this page (e.g., "Senior Year")
        const currentYearProjects = data["Senior Year"];

        currentYearProjects.forEach(project => {
            const col = document.createElement('div');
            col.className = 'col';

            // Set up fallback placeholder image if yours is blank ""
            const projectImg = project.image || "https://via.placeholder.com/300x150?text=Project+Image";
            
            // Set up fallback link if it's empty
            const projectLink = project.link || "#";

            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${projectImg}" class="card-img-top" alt="${project.title}">
                    <div class="card-body">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text text-muted">${project.description}</p>
                    </div>
                    <div class="card-footer bg-transparent border-0 pb-3">
                        <a href="${projectLink}" target="_blank" class="btn btn-outline-success w-100">View Project</a>
                    </div>
                </div>
            `;

            container.appendChild(col);
        });
    })
    .catch(error => console.error('Error fetching data:', error));