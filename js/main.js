// js/main.js

// --- 1. LOGIQUE DE GESTION DE LA NAVIGATION PRINCIPALE ---

// Fonction pour masquer toutes les sections et n'afficher que la cible
function showSection(targetId) {
    // Masquer toutes les sections principales
    document.querySelectorAll('main section').forEach(section => {
        section.style.display = 'none';
    });

    // Afficher la section ciblée
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.style.display = 'block';
        window.scrollTo(0, 0); 
    }
}

// Fonction pour gérer le clic sur les liens de navigation principale
function handleMainNavigation(event) {
    const target = event.target.getAttribute('href');
    
    if (target && target.startsWith('#')) {
        event.preventDefault(); 
        const targetId = target.substring(1); 
        showSection(targetId);
        
        // OPTIONNEL: Mettre à jour l'URL sans recharger
        history.pushState(null, null, target);

        // Au changement de section principale, réinitialiser les sous-onglets à l'onglet "active"
        if (targetSection) {
             const firstTab = targetSection.querySelector('.tabs-nav .tab-link.active');
             if (firstTab) {
                 handleTabClick({ target: firstTab });
             }
        }
    }
}


// --- 2. LOGIQUE DE GESTION DES SOUS-ONGLETS ---

function handleTabClick(event) {
    const clickedLink = event.target;
    const targetHref = clickedLink.getAttribute('href');

    if (targetHref && targetHref.startsWith('#')) {
        event.preventDefault(); 
        const targetId = targetHref.substring(1); 
        const currentSection = clickedLink.closest('section');
        
        if (!currentSection) return;

        // 1. Masquer tous les contenus d'onglets dans cette section
        currentSection.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
            content.classList.remove('active');
        });

        // 2. Désactiver tous les liens d'onglets dans cette section
        currentSection.querySelectorAll('.tab-link').forEach(link => {
            link.classList.remove('active');
        });

        // 3. Afficher le contenu ciblé
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.style.display = 'block';
            targetContent.classList.add('active');
            clickedLink.classList.add('active');
        }
    }
}


// --- 3. INITIALISATION ET CHARGEMENT DES PROJETS ---

document.addEventListener('DOMContentLoaded', () => {
    
    // Attacher le gestionnaire d'événement à la navigation principale
    document.querySelector('header nav').addEventListener('click', handleMainNavigation);
    
    // Attacher le gestionnaire d'événement aux onglets
    document.querySelectorAll('.tabs-nav').forEach(nav => {
        nav.addEventListener('click', handleTabClick);
    });

    // Au chargement, s'assurer que seule la section 'welcome' est visible
    showSection('welcome');

    // --- Logique de chargement des Projets (Dynamique) ---
    const projectsContainer = document.getElementById('projects-list');
    
    // Chargement des données JSON
    fetch('data/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Échec de la récupération des données : HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            
            projectsContainer.innerHTML = '';
            
            if (data.length === 0) {
                projectsContainer.innerHTML = '<p>Aucun projet à afficher pour le moment.</p>';
            }
            
            data.forEach(project => {
                // Construction du HTML pour la carte de projet...
                const githubLink = project.lien_github ? `<a href="${project.lien_github}" target="_blank" class="btn">Code Source (GitHub)</a>` : '';
                const demoLink = project.lien_demo ? `<a href="${project.lien_demo}" target="_blank" class="btn">Voir la Démo</a>` : '';
                const technologiesList = project.technologies ? project.technologies.join(', ') : '';

                const projectElement = document.createElement('article');
                projectElement.className = 'project-card'; 

                projectElement.innerHTML = `
                    <h3>${project.titre}</h3>
                    <p><strong>Domaine :</strong> ${project.rubrique} (${project.date})</p>
                    <p>${project.description}</p>
                    <p class="tech"><strong>Technologies :</strong> ${technologiesList}</p>
                    <div class="links">
                        ${githubLink}
                        ${demoLink}
                    </div>
                `;

                projectsContainer.appendChild(projectElement);
            });
        })
        .catch(error => {
            console.error('Erreur de chargement JSON:', error);
            projectsContainer.innerHTML = '<p style="color: red;">Erreur de chargement des projets. Vérifiez le fichier JSON.</p>'; 
        });
});