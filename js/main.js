// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-list');

// NOUVELLE LIGNE : Référence à la section parente qui doit être rendue visible
    const projectsSection = document.getElementById('projects');

    // 1. Fonction pour récupérer les données du fichier projects.json
    fetch('data/projects.json')
        .then(response => {
            // S'assure que la réponse HTTP est OK
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            // Parse le JSON
            return response.json();
        })
        .then(data => {
		projectsContainer.innerHTML = ''; // Vide le message "Chargement..."

            // NOUVELLE LOGIQUE : Rendre la section visible si on a des données
            if (data.length > 0) {
                // Si la liste contient au moins un projet, nous affichons la section
                projectsSection.style.display = 'block'; 
            } else {
                // Si la liste est vide, on pourrait laisser la section masquée ou afficher un message
                projectsContainer.innerHTML = '<p>Aucun projet à afficher pour le moment.</p>';
                projectsSection.style.display = 'block'; // On affiche la section, mais avec le message d'absence
            }
            
            data.forEach(project => {
                // ... (Reste du code qui crée et insère les project-card)
            });
        })
        .catch(error => {
            // Affichage d'une erreur si le fichier JSON n'est pas trouvé ou est mal formaté
            projectsContainer.innerHTML = `<p style="color: red;">Erreur lors du chargement des données : ${error.message}. Vérifiez le fichier data/projects.json.</p>`;
            console.error('Erreur de chargement JSON:', error);
        });
});
