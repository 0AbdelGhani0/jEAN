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
                    }, 200);
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
                    }, 200);
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
    
    // Fonction pour extraire et cliquer sur le lien de téléchargement
    function extractAndClickDownloadLink() {
        console.log('Recherche du lien de téléchargement...');
        
        // Créer un élément div pour afficher le statut (feedback visuel)
        const statusDiv = document.createElement('div');
        statusDiv.style.position = 'fixed';
        statusDiv.style.top = '10px';
        statusDiv.style.right = '10px';
        statusDiv.style.padding = '10px';
        statusDiv.style.background = 'rgba(0, 0, 0, 0.8)';
        statusDiv.style.color = 'white';
        statusDiv.style.borderRadius = '5px';
        statusDiv.style.zIndex = '9999';
        statusDiv.style.fontSize = '14px';
        statusDiv.textContent = 'Recherche du bouton de téléchargement...';
        document.body.appendChild(statusDiv);
        
        // Rechercher le bouton ou lien de téléchargement
        const downloadButton = document.getElementById('download-btn') || 
                              document.querySelector('a[download][id="download-btn"]') ||
                              document.querySelector('a.btn[download]') ||
                              document.querySelector('a[data-original-title="Download files"]') ||
                              Array.from(document.querySelectorAll('a')).find(a => 
                                a.textContent.includes('Télécharger') && a.href.includes('download')
                              );
        
        if (downloadButton) {
            console.log('Bouton de téléchargement trouvé:', downloadButton);
            statusDiv.innerHTML = `Bouton trouvé!<br>Clic en cours...`;
            statusDiv.style.background = 'rgba(0, 128, 0, 0.8)';
            
            // Simuler le clic sur le bouton/lien
            downloadButton.click();
            console.log('Clic sur le bouton de téléchargement effectué.');
            
            setTimeout(() => {
                statusDiv.remove();
            }, 5000);
            return true;
        } else {
            console.error('Bouton de téléchargement non trouvé!');
            statusDiv.textContent = 'Bouton de téléchargement non trouvé!';
            statusDiv.style.background = 'rgba(255, 0, 0, 0.8)';
            
            console.log('Liste de tous les liens sur la page:');
            document.querySelectorAll('a').forEach((link, index) => {
                console.log(`Lien ${index}:`, {
                    text: link.textContent.trim(),
                    href: link.href,
                    id: link.id,
                    class: link.className,
                    attributes: Array.from(link.attributes).map(attr => `${attr.name}="${attr.value}"`).join(', ')
                });
            });
            
            setTimeout(() => {
                statusDiv.remove();
            }, 5000);
            return false;
        }
    }
    
    // Fonction de vérification de l'URL pour déterminer l'étape
    function checkUrlAndProceed() {
        const currentUrl = window.location.href;
        console.log('URL actuelle:', currentUrl);
        
        if (currentUrl.includes('/pdf-editor#results')) {
            // Nous sommes sur la page de résultats, attendre que la page se charge puis extraire et cliquer sur le lien de téléchargement
            console.log('Page de résultats détectée, attente du chargement complet...');
            setTimeout(extractAndClickDownloadLink, 3000);
        } else if (currentUrl.includes('/pdf-editor')) {
            console.log('Page d\'édition détectée');
        } else {
            console.log('Page non reconnue');
        }
    }
    
    // Détection des changements d'URL
    function setupUrlChangeDetection() {
        let lastUrl = location.href;
        const urlCheckInterval = setInterval(() => {
            if (location.href !== lastUrl) {
                console.log(`URL changée: ${lastUrl} → ${location.href}`);
                lastUrl = location.href;
                setTimeout(checkUrlAndProceed, 2000);
                if (location.href.includes('/pdf-editor#results')) {
                    setTimeout(() => {
                        clearInterval(urlCheckInterval);
                    }, 10000);
                }
            }
        }, 500);
        
        setTimeout(() => {
            clearInterval(urlCheckInterval);
        }, 60000);
    }
    
    // Exécution du script principal
    if (window.location.href.includes('/pdf-editor#results')) {
        console.log('Déjà sur la page de résultats, tentative d\'extraction du bouton de téléchargement...');
        setTimeout(extractAndClickDownloadLink, 3000);
    } else {
        // Sur la page d'édition, appliquer les modifications puis lancer le processus
        setTimeout(updateElements, 1000);
        setTimeout(() => {
            updateElements();
            setTimeout(() => {
                if (clickApplyButton()) {
                    setupUrlChangeDetection();
                    // Fallback : vérifier après un délai fixe
                    setTimeout(() => {
                        if (window.location.href.includes('/pdf-editor#results')) {
                            console.log('Page de résultats détectée après délai fixe');
                            extractAndClickDownloadLink();
                        }
                    }, 10000);
                }
            }, 2000);
        }, 3000);
    }
    
    console.log('Script d\'automatisation prêt!');
})();
