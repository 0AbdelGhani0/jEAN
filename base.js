javascript:(function(){
    // Configuration
    const productName = "GARBIT COUSCOUS POULE";
    const quantity = Math.floor(Math.random() * 4) + 3; // Nombre aléatoire entre 3 et 6
    const unitPrice = 5.82;
    const total = quantity * unitPrice;
    const tax = (total * 0.055).toFixed(2);
    
    // Fonction pour générer une date aléatoire entre 18/02/2025 et 20/03/2025
    function generateRandomDate() {
        // 18 février 2025 à 00:00:00
        const startDate = new Date(2025, 1, 18);
        // 20 mars 2025 à 23:59:59
        const endDate = new Date(2025, 2, 20, 23, 59, 59);
        
        const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
        const randomDate = new Date(randomTime);
        
        // Ne pas inclure les dimanches
        if (randomDate.getDay() === 0) {
            // Si c'est un dimanche, ajouter un jour
            randomDate.setDate(randomDate.getDate() + 1);
        }
        
        // Fixer l'heure entre 9h et 20h
        randomDate.setHours(9 + Math.floor(Math.random() * 11), Math.floor(Math.random() * 60));
        
        return randomDate;
    }
    
    const randomDate = generateRandomDate();
    const pad = n => n.toString().padStart(2, '0');
    const date1 = `${pad(randomDate.getDate())}/${pad(randomDate.getMonth() + 1)}/${randomDate.getFullYear()} à ${pad(randomDate.getHours())}h${pad(randomDate.getMinutes())}`;
    
    // Génération des parties de date
    const date2Parts = [
        randomDate.getDate().toString().padStart(2, '0'),
        (randomDate.getMonth() + 1).toString().padStart(2, '0'),
        randomDate.getFullYear().toString().slice(-2),
        pad(randomDate.getHours()),
        pad(randomDate.getMinutes()),
        Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
        Math.floor(Math.random() * 100).toString().padStart(2, '0'),
        Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
        Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    ];
    
    const date2 = `${date2Parts[0]}.${date2Parts[1]}.${date2Parts[2]} ${date2Parts[3]}:${date2Parts[4]} ${date2Parts[5]} ${date2Parts[6]} ${date2Parts[7]} ${date2Parts[8]}`;
    const random19Digits = Array.from({length: 19}, () => Math.floor(Math.random() * 10)).join('');
    
    // Remplacements à effectuer
    const textReplacements = {
        '25 CL RED BULL ABR': productName,
        '1 x 1.65': `${quantity} x ${unitPrice}`,
        '1.65': total.toFixed(2),
        '1.65€': total.toFixed(2) + '€',
        '0.09€': tax + '€'
    };
    
    const dateReplacements = {
        '31/12/2024 à 15h47': date1,
        '9135720000903790933': random19Digits,
        '31.12.24 15:47 8122 30 6065 0611': date2
    };
    
    console.log('🔥 Script d\'automatisation Sejda - Démarrage');
    console.log('Produit:', productName);
    console.log('Quantité:', quantity);
    console.log('Prix unitaire:', unitPrice);
    console.log('Total:', total.toFixed(2));
    console.log('Date générée:', date1);
    
    // Fonction pour mettre à jour les éléments textuels
    function updateElements() {
        console.log('Recherche et mise à jour des éléments...');
        const elements = document.querySelectorAll('div, span, p');
        
        elements.forEach(element => {
            const originalText = element.textContent.trim();
            
            if (textReplacements[originalText]) {
                try {
                    element.click();
                    setTimeout(() => {
                        try {
                            // Vérifier si un éditeur est actif
                            const activeElement = document.activeElement;
                            if (activeElement && activeElement.tagName === 'TEXTAREA') {
                                activeElement.value = textReplacements[originalText];
                                const event = new Event('input', { bubbles: true });
                                activeElement.dispatchEvent(event);
                            } else {
                                element.textContent = textReplacements[originalText];
                            }
                            console.log(`🔄 ${originalText} → ${textReplacements[originalText]}`);
                        } catch (e) {
                            console.error('Erreur lors du remplacement:', e);
                        }
                    }, 400); // Doublé de 200 à 400
                } catch (e) {
                    console.log('Impossible de cliquer sur l\'élément, tentative de modification directe');
                    element.textContent = textReplacements[originalText];
                }
            }
            
            if (dateReplacements[originalText]) {
                try {
                    element.click();
                    setTimeout(() => {
                        try {
                            // Vérifier si un éditeur est actif
                            const activeElement = document.activeElement;
                            if (activeElement && activeElement.tagName === 'TEXTAREA') {
                                activeElement.value = dateReplacements[originalText];
                                const event = new Event('input', { bubbles: true });
                                activeElement.dispatchEvent(event);
                            } else {
                                element.textContent = dateReplacements[originalText];
                            }
                            console.log(`🔄 ${originalText} → ${dateReplacements[originalText]}`);
                        } catch (e) {
                            console.error('Erreur lors du remplacement:', e);
                        }
                    }, 400); // Doublé de 200 à 400
                } catch (e) {
                    console.log('Impossible de cliquer sur l\'élément, tentative de modification directe');
                    element.textContent = dateReplacements[originalText];
                }
            }
        });
    }
    
    // Fonction pour cliquer sur le bouton "Appliquer les changements"
    function clickApplyButton() {
        console.log('Tentative de clic sur le bouton "Appliquer les changements"...');
        
        // Recherche par ID
        let applyButton = document.getElementById('save-pdf-btn');
        
        // Si non trouvé par ID, recherche par texte et classe
        if (!applyButton) {
            const buttons = document.querySelectorAll('button.btn');
            for (const button of buttons) {
                if (button.textContent.includes('Appliquer les changements')) {
                    applyButton = button;
                    break;
                }
            }
        }
        
        // Si toujours pas trouvé, recherche par conteneur
        if (!applyButton) {
            const containers = document.querySelectorAll('.submit-button-container');
            for (const container of containers) {
                const buttons = container.querySelectorAll('button');
                for (const button of buttons) {
                    if (button.textContent.includes('Appliquer')) {
                        applyButton = button;
                        break;
                    }
                }
                if (applyButton) break;
            }
        }
        
        if (applyButton) {
            console.log('Bouton "Appliquer les changements" trouvé, clic en cours...');
            applyButton.click();
            return true;
        } else {
            console.error('Bouton "Appliquer les changements" non trouvé!');
            return false;
        }
    }
    
    // Fonction améliorée pour cliquer sur le bouton "Télécharger"
    function clickDownloadButton() {
        console.log('Tentative de clic sur le bouton "Télécharger"...');
        
        // Attendre que le bouton de téléchargement soit visible et cliquable
        let attempts = 0;
        const maxAttempts = 10;
        
        function tryClickDownload() {
            attempts++;
            console.log(`Tentative ${attempts}/${maxAttempts} de trouver le bouton de téléchargement...`);
            
            // Méthode 1: Par ID
            let downloadButton = document.getElementById('download-btn');
            
            // Méthode 2: Par attribut download et texte
            if (!downloadButton) {
                const links = document.querySelectorAll('a[download]');
                for (const link of links) {
                    if (link.textContent.includes('Télécharger') || link.textContent.includes('Download')) {
                        downloadButton = link;
                        break;
                    }
                }
            }
            
            // Méthode 3: Par classe et texte
            if (!downloadButton) {
                const links = document.querySelectorAll('a.btn');
                for (const link of links) {
                    if (link.textContent.includes('Télécharger') || link.textContent.includes('Download')) {
                        downloadButton = link;
                        break;
                    }
                }
            }
            
            // Méthode 4: Par icône
            if (!downloadButton) {
                const icons = document.querySelectorAll('i.fa-arrow-to-bottom, i.fal.fa-arrow-to-bottom');
                for (const icon of icons) {
                    if (icon.parentNode && icon.parentNode.tagName === 'A') {
                        downloadButton = icon.parentNode;
                        break;
                    }
                }
            }
            
            // Méthode 5: Recherche plus générique par texte
            if (!downloadButton) {
                const allLinks = document.querySelectorAll('a');
                for (const link of allLinks) {
                    if (link.textContent.includes('Télécharger') || 
                        link.textContent.includes('Download') ||
                        link.title.includes('Download') ||
                        link.getAttribute('data-original-title')?.includes('Download')) {
                        downloadButton = link;
                        break;
                    }
                }
            }
            
            if (downloadButton) {
                console.log('Bouton "Télécharger" trouvé !', downloadButton);
                console.log('Attributs du bouton:', {
                    id: downloadButton.id,
                    href: downloadButton.href,
                    text: downloadButton.textContent.trim()
                });
                
                try {
                    // Option 1: Navigation directe
                    if (downloadButton.href) {
                        console.log('Navigation vers:', downloadButton.href);
                        window.location.href = downloadButton.href;
                    }
                    
                    // Option 2: Clic simulé
                    console.log('Tentative de clic sur le bouton de téléchargement');
                    downloadButton.click();
                    
                    return true;
                } catch (e) {
                    console.error('Erreur lors du clic sur le bouton de téléchargement:', e);
                }
            } else if (attempts < maxAttempts) {
                // Réessayer après un délai doublé
                setTimeout(tryClickDownload, 2000); // Doublé de 1000 à 2000
            } else {
                console.error('Bouton de téléchargement non trouvé après plusieurs tentatives.');
                
                // Dernier recours: afficher tous les liens de la page pour le débogage
                console.log('Liste de tous les liens sur la page:');
                document.querySelectorAll('a').forEach((link, index) => {
                    console.log(`Lien ${index}:`, {
                        text: link.textContent.trim(),
                        href: link.href,
                        id: link.id,
                        class: link.className
                    });
                });
            }
        }
        
        // Démarrer la séquence de tentatives
        tryClickDownload();
    }
    
    // Fonction de vérification de l'URL pour déterminer l'étape
    function checkUrlAndProceed() {
        const currentUrl = window.location.href;
        console.log('URL actuelle:', currentUrl);
        
        if (currentUrl.includes('/pdf-editor#results')) {
            // Nous sommes sur la page de résultats, attendre que la page se charge puis cliquer sur Télécharger
            console.log('Page de résultats détectée, attente du chargement complet...');
            // Attendre plus longtemps pour le chargement complet de la page
            setTimeout(clickDownloadButton, 6000); // Doublé de 3000 à 6000
        } else if (currentUrl.includes('/pdf-editor')) {
            // Nous sommes sur la page d'édition, continuer avec les modifications
            console.log('Page d\'édition détectée');
        } else {
            console.log('Page non reconnue');
        }
    }
    
    // Détection des changements d'URL
    function setupUrlChangeDetection() {
        let lastUrl = location.href;
        
        // Vérifier périodiquement si l'URL a changé
        const urlCheckInterval = setInterval(() => {
            if (location.href !== lastUrl) {
                console.log(`URL changée: ${lastUrl} → ${location.href}`);
                lastUrl = location.href;
                
                // Attendre un certain temps pour que la page se charge complètement
                setTimeout(checkUrlAndProceed, 4000); // Doublé de 2000 à 4000
                
                // Si nous sommes sur la page de résultats, arrêter la vérification
                if (location.href.includes('/pdf-editor#results')) {
                    clearInterval(urlCheckInterval);
                }
            }
        }, 500);
        
        // Arrêter la vérification après un délai doublé
        setTimeout(() => {
            clearInterval(urlCheckInterval);
        }, 120000); // Doublé de 60000 à 120000 (2 minutes)
    }
    
    // Exécution du script principal
    
    // Vérifier d'abord si nous sommes déjà sur la page de résultats
    if (window.location.href.includes('/pdf-editor#results')) {
        console.log('Déjà sur la page de résultats, tentative de téléchargement...');
        setTimeout(clickDownloadButton, 6000); // Doublé de 3000 à 6000
    } else {
        // Nous sommes sur la page d'édition, exécuter la séquence complète
        setTimeout(updateElements, 2000); // Doublé de 1000 à 2000
        setTimeout(() => {
            updateElements();
            setTimeout(() => {
                if (clickApplyButton()) {
                    // Configurer la détection de changement d'URL
                    setupUrlChangeDetection();
                    
                    // Comme fallback, vérifier après un délai fixe doublé
                    setTimeout(() => {
                        if (window.location.href.includes('/pdf-editor#results')) {
                            console.log('Page de résultats détectée après délai fixe');
                            clickDownloadButton();
                        }
                    }, 20000); // Doublé de 10000 à 20000
                }
            }, 4000); // Doublé de 2000 à 4000
        }, 6000); // Doublé de 3000 à 6000
    }
    
    console.log('Script d\'automatisation prêt!');
})();
