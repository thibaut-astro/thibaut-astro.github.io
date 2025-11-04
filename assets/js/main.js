/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 30

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#myResearch').poptrox({
                    caption: function($a) { 
                        return $a.attr('data-caption'); // Récupère l'attribut data-caption
                    },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

            // INITIALISATION DE TOUTES VOS FONCTIONS
            addTimelineAnimationStyles();
            animateTimeline();
            animatePublicationsOnly();
            setupEmailCopy();
            animateContactContentStaggered();
            addResearchAnimationStyles();
            animateResearchItems();
            setupHeaderEmailCopy();
            setupFunAtom();

			});


// Animation de la timeline
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-item-visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Ajoute les styles CSS via JavaScript
function addTimelineAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .timeline-item:nth-child(1) { transition-delay: 0.1s; }
        .timeline-item:nth-child(2) { transition-delay: 0.2s; }
        .timeline-item:nth-child(3) { transition-delay: 0.3s; }
        .timeline-item:nth-child(4) { transition-delay: 0.4s; }
        .timeline-item:nth-child(5) { transition-delay: 0.5s; }
        .timeline-item:nth-child(6) { transition-delay: 0.6s; }
        .timeline-item:nth-child(7) { transition-delay: 0.7s; }
        .timeline-item:nth-child(8) { transition-delay: 0.8s; }
        .timeline-item:nth-child(9) { transition-delay: 0.9s; }
        .timeline-item:nth-child(10) { transition-delay: 1.0s; }
    `;
    document.head.appendChild(style);
}


// Animation pour les items de publications seulement
function animatePublicationsOnly() {
    const publicationItems = document.querySelectorAll('#publications li');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    publicationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Pour copier l'email quand on clique dessus
function setupEmailCopy() {
    const emailLink = document.getElementById('email-link');
    
    if (emailLink) {
        // Crée un tooltip
        const tooltip = document.createElement('span');
        tooltip.className = 'email-tooltip';
        tooltip.textContent = 'Click to copy :)';
        emailLink.parentNode.appendChild(tooltip);
        
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = this.getAttribute('data-email');
            
            navigator.clipboard.writeText(email).then(() => {
                // Animation de confirmation
                tooltip.textContent = 'Copied!';
                tooltip.style.opacity = '1';
                
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                }, 2000);
                
            }).catch(err => {
                window.location.href = `mailto:${email}`;
            });
        });
        
        // Affiche le tooltip au survol
        emailLink.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
        });
        
        emailLink.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    }
}

// Animation progressive pour le contenu de Get in Touch
function animateContactContentStaggered() {
    const contactElements = document.querySelectorAll(`
        #three .contact-header h3,
        #three .position,
        #three .department,
        #three .university,
        #three .address,
        #three .contact-email
    `);
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                contactElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('contact-element-visible');
                    }, index * 125); // Délai progressif
                });
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Initial state pour tous les éléments
    contactElements.forEach((element, index) => {
        element.classList.add('contact-element-hidden');
        element.style.transitionDelay = `${index * 0.1}s`; // Délai progressif
    });
    
    // Observe le container parent
    const contactContainer = document.querySelector('#three .contact-info');
    if (contactContainer) {
        observer.observe(contactContainer);
    }
}

// Animation pour les éléments de My Research
function animateResearchItems() {
    const researchItems = document.querySelectorAll('#myResearch .work-item');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('research-item-visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    researchItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Ajoute les styles CSS via JavaScript
function addResearchAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .research-item-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Pour copier l'email quand on clique sur l'icône envelope
function setupHeaderEmailCopy() {
    //const emailIcon = document.querySelector('#header .icon.fa-envelope');
    const emailIcon = document.querySelector('#header .icon.fa-envelope') 
               || document.querySelector('#footer .icon.fa-envelope');
    
    if (emailIcon) {
        // Crée un tooltip
        const tooltip = document.createElement('span');
        tooltip.className = 'email-tooltip-header';
        tooltip.textContent = 'Click to copy';
        emailIcon.parentNode.appendChild(tooltip);
        
        emailIcon.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = 't.francois@surrey.ac.uk';
            
            navigator.clipboard.writeText(email).then(() => {
                // Animation de confirmation
                tooltip.textContent = 'Copied!';
                tooltip.style.opacity = '1';
                
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                }, 2000);
                
            }).catch(err => {
                window.location.href = `mailto:${email}`;
            });
        });
        
        // Affiche le tooltip au survol
        emailIcon.addEventListener('mouseenter', () => {
            tooltip.textContent = 'Click to copy email :)';
            tooltip.style.opacity = '1';
        });
        
        emailIcon.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    }
}

// Animation fun atom
let atomInitialized = false;
function setupFunAtom() {
    if (atomInitialized) return;
    
    const atomButton = document.getElementById('fun-atom');
    
    if (atomButton && !atomInitialized) {
        // Crée le tooltip
        const tooltip = document.createElement('span');
        tooltip.className = 'atom-tooltip';
        tooltip.textContent = 'Watch out!';
        atomButton.parentNode.appendChild(tooltip);
        
        atomButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Fait disparaître le tooltip au clic
            tooltip.style.opacity = '0';
            console.log('Atom clicked!');
            createAtomExplosion();
        });
        
        // Affiche le tooltip au survol
        atomButton.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
        });
        
        atomButton.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
        
        atomInitialized = true;
    }
}

function createAtomExplosion() {
    const colors = ['#FF3B30', '#4A90E2', '#50E3C2', '#F5A623', '#9013FE'];
    
    // Récupère la position du bouton atom
    const atomButton = document.getElementById('fun-atom');
    const rect = atomButton.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    
    // Crée 15 particules (moins pour être plus fluide)
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999; /* Un peu plus bas */
            left: ${startX}px;
            top: ${startY}px;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(particle);
        
        // Animation
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 120;
        const duration = 600 + Math.random() * 400;
        
        particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { 
                transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)',
            fill: 'forwards'
        });
        
        setTimeout(() => particle.remove(), duration);
    }
    
    // Vibration seulement sur le main, pas sur tout le body
    const main = document.getElementById('main');
    if (main) {
        main.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-3px)' },
            { transform: 'translateX(3px)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 200,
            iterations: 2
        });
    }
}



// Optionnel : pour re-animer si besoin
// window.animateTimeline = animateTimeline;

})(jQuery);


