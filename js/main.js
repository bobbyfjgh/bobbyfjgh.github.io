/**
 * main.js
 * Manages navigation between main sections and sub-tabs.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------
    // 1. MAIN NAVIGATION MANAGEMENT (Shows/Hides sections)
    // ------------------------------------------------------------------

    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');

    // Function to hide all sections except the target one
    const showSection = (targetId) => {
        sections.forEach(section => {
            section.style.display = 'none';
        });
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    };

    // Handles click on main navigation links
    const handleMainNavigation = (event) => {
        event.preventDefault(); // Crucial: Prevents default anchor link scrolling
        const targetId = event.target.getAttribute('href');
        
        // Update URL
        history.pushState(null, '', targetId); 

        // Update 'active' class for the navigation link
        navLinks.forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');
        
        showSection(targetId);
    };

    navLinks.forEach(link => {
        link.addEventListener('click', handleMainNavigation);
    });

    // Initialization: Show section based on URL or default
    const initialHash = window.location.hash || '#welcome';
    showSection(initialHash);
    const activeLink = document.querySelector(`nav a[href="${initialHash}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // ------------------------------------------------------------------
    // 2. SUB-TAB MANAGEMENT (Tabs)
    // ------------------------------------------------------------------
    
    document.querySelectorAll('.tabs-nav').forEach(nav => {
        const tabLinks = nav.querySelectorAll('.tab-link');

        tabLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = event.target.getAttribute('href');
                const parentSection = event.target.closest('section');
                
                // Remove 'active' from all links and content in this section
                parentSection.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
                parentSection.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                
                // Activate the clicked link and its content
                event.target.classList.add('active');
                const targetContent = document.querySelector(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
        
        // Ensures one tab is active by default (clicks the first one if none is active)
        const firstLink = nav.querySelector('.tab-link');
        const activeContent = nav.closest('section').querySelector('.tab-content.active');
        
        if (!activeContent && firstLink) {
             firstLink.click();
        } else if (activeContent) {
             // If active content is set, ensure the corresponding link is active too
             const correspondingLink = nav.querySelector(`a[href="#${activeContent.id}"]`);
             if (correspondingLink) {
                 correspondingLink.classList.add('active');
             }
        }
    });

    // ------------------------------------------------------------------
    // 3. PROJECT INJECTION (Future use of JSON)
    // ------------------------------------------------------------------
    // Placeholder function
    const loadProjects = () => {};
    
    loadProjects();
});