(function(){
    /**************************************************
     *                CONFIGURATION
     **************************************************/
    const productName = "GARBIT COUSCOUS POULE";
    const quantity = Math.floor(Math.random() * 4) + 3; // Nombre aléatoire entre 3 et 6
    const unitPrice = 5.82;
    const total = quantity * unitPrice;
    const tax = (total * 0.055).toFixed(2);

    // Dates aléatoires entre 18/02/2025 et 20/03/2025
    function generateRandomDate() {
        const startDate = new Date(2025, 1, 18); // 18/02/2025
        const endDate   = new Date(2025, 2, 20, 23, 59, 59); // 20/03/2025
        const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
        const randomDate = new Date(randomTime);
        
        // Exclure les dimanches
        if (randomDate.getDay() === 0) {
            randomDate.setDate(randomDate.getDate() + 1);
        }
        // Heure entre 9h et 20h
        randomDate.setHours(9 + Math.floor(Math.random() * 11), Math.floor(Math.random() * 60));
        return randomDate;
    }
    const randomDate = generateRandomDate();
    const pad = n => n.toString().padStart(2, '0');
    const date1 = `${pad(randomDate.getDate())}/${pad(randomDate.getMonth() + 1)}/${randomDate.getFullYear()} à ${pad(randomDate.getHours())}h${pad(randomDate.getMinutes())}`;

    // Autre format de date
    const date2Parts = [
        pad(randomDate.getDate()),
        pad(randomDate.getMonth() + 1),
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

    // Remplacements
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

    /**************************************************
     *                LOGS INIT
     **************************************************/
    console.log('🔥 Script d\'automatisation Sejda - Démarrage');
    console.log('Produit:', productName);
    console.log('Quantité:', quantity);
    console.log('Prix unitaire:', unitPrice);
    console.log('Total:', total.toFixed(2));
    console.log('Date générée:', date1);

    /**************************************************
     * 1) METTRE A JOUR LES ELEMENTS
     **************************************************/
    function updateElements() {
        console.log('[updateElements] Recherche et mise à jour des éléments...');
        const elements = document.querySelectorAll('div, span, p');
        
        elements.forEach(element => {
            const originalText = element.textContent.trim();

            // Remplacement de texte
            if (textReplacements[originalText]) {
                try {
                    element.click();
                    setTimeout(() => {
                        try {
                            const activeElement = document.activeElement;
                            if (activeElement && activeElement.tagName === 'TEXTAREA') {
                                activeElement.value = textReplacements[originalText];
                                const event = new Event('input', { bubbles: true });
                                activeElement.dispatchEvent(event);
                            } else {
                                element.textContent = textReplacements[originalText];
                            }
                            console.log(`[updateElements] Remplacement : "${originalText}" → "${textReplacements[originalText]}"`);
                        } catch (e) {
                            console.error('[updateElements] Erreur lors du remplacement:', e);
                        }
                    }, 200);
                } catch (e) {
                    console.log('[updateElements] Impossible de cliquer sur l\'élément, tentative de modification directe');
                    element.textContent = textReplacements[originalText];
                }
            }

            // Remplacement de date
            if (dateReplacements[originalText]) {
                try {
                    element.click();
                    setTimeout(() => {
                        try {
                            const activeElement = document.activeElement;
                            if (activeElement && activeElement.tagName === 'TEXTAREA') {
                                activeElement.value = dateReplacements[originalText];
                                const event = new Event('input', { bubbles: true });
                                activeElement.dispatchEvent(event);
                            } else {
                                element.textContent = dateReplacements[originalText];
                            }
                            console.log(`[updateElements] Remplacement : "${originalText}" → "${dateReplacements[originalText]}"`);
                        } catch (e) {
                            console.error('[updateElements] Erreur lors du remplacement:', e);
                        }
                    }, 200);
                } catch (e) {
                    console.log('[updateElements] Impossible de cliquer sur l\'élément, tentative de modification directe');
                    element.textContent = dateReplacements[originalText];
                }
            }
        });
    }

    /**************************************************
     * 2) CLIQUER SUR "APPLIQUER LES CHANGEMENTS"
     **************************************************/
    function clickApplyButton() {
        console.log('[clickApplyButton] Tentative de clic sur "Appliquer les changements"...');
        
        let applyButton = document.getElementById('save-pdf-btn');
        if (!applyButton) {
            const allButtons = document.querySelectorAll('button.btn');
            for (const btn of allButtons) {
                if (btn.textContent.includes('Appliquer les changements')) {
                    applyButton = btn;
                    break;
                }
            }
        }
        if (!applyButton) {
            const containers = document.querySelectorAll('.submit-button-container');
            for (const container of containers) {
                const buttons = container.querySelectorAll('button');
                for (const btn of buttons) {
                    if (btn.textContent.includes('Appliquer')) {
                        applyButton = btn;
                        break;
                    }
                }
                if (applyButton) break;
            }
        }
        
        if (applyButton) {
            console.log('[clickApplyButton] Bouton trouvé, clic en cours...');
            applyButton.click();
            return true;
        } else {
            console.error('[clickApplyButton] Bouton "Appliquer les changements" non trouvé!');
            return false;
        }
    }

    /**************************************************
     * 3) SUR LA PAGE RESULTAT, CLIQUER SUR "TELECHARGER"
     **************************************************/
    function extractAndClickDownloadLink() {
        console.log('[extractAndClickDownloadLink] Recherche du bouton/lien de téléchargement...');
        
        // Petite bannière visuelle
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
        statusDiv.textContent = 'Recherche du bouton "Télécharger"...';
        document.body.appendChild(statusDiv);
        
        // Différents sélecteurs potentiels
        const downloadButton =
            document.getElementById('download-btn') ||
            document.querySelector('a[download][id="download-btn"]') ||
            document.querySelector('a.btn[download]') ||
            document.querySelector('a[data-original-title="Download files"]') ||
            Array.from(document.querySelectorAll('a'))
                 .find(a => a.textContent.includes('Télécharger') && a.href.includes('download'));

        if (downloadButton) {
            console.log('[extractAndClickDownloadLink] Bouton trouvé :', downloadButton);
            statusDiv.innerHTML = `Bouton trouvé, clic en cours...`;
            statusDiv.style.background = 'rgba(0, 128, 0, 0.8)';
            
            // Simuler le clic
            downloadButton.click();
            console.log('[extractAndClickDownloadLink] Clic sur le bouton de téléchargement effectué.');
            
            setTimeout(() => statusDiv.remove(), 5000);
            return true;
        } else {
            console.error('[extractAndClickDownloadLink] Bouton de téléchargement NON trouvé!');
            statusDiv.textContent = 'Bouton de téléchargement non trouvé!';
            statusDiv.style.background = 'rgba(255, 0, 0, 0.8)';
            
            // Liste de tous les liens (debug)
            console.log('[extractAndClickDownloadLink] Liste de tous les liens détectés sur la page :');
            document.querySelectorAll('a').forEach((link, index) => {
                console.log(`Lien ${index}: text="${link.textContent.trim()}" href="${link.href}"`);
            });
            
            setTimeout(() => statusDiv.remove(), 8000);
            return false;
        }
    }

    /**************************************************
     * 4) SURVEILLER LE CHANGEMENT D'URL
     **************************************************/
    function checkUrlAndProceed() {
        const currentUrl = window.location.href;
        console.log('[checkUrlAndProceed] URL actuelle :', currentUrl);

        // Si on est déjà sur la page de résultats
        if (currentUrl.includes('/pdf-editor#results')) {
            console.log('[checkUrlAndProceed] Page de résultats détectée. Tentative de clic sur "Télécharger" dans 3s...');
            setTimeout(extractAndClickDownloadLink, 3000);
        }
        // Sinon, page d'édition
        else if (currentUrl.includes('/pdf-editor')) {
            console.log('[checkUrlAndProceed] Page d\'édition détectée. On laisse faire le script...');
        } else {
            console.log('[checkUrlAndProceed] Page non reconnue (ni /pdf-editor, ni /pdf-editor#results)');
        }
    }

    function setupUrlChangeDetection() {
        let lastUrl = location.href;
        const urlCheckInterval = setInterval(() => {
            if (location.href !== lastUrl) {
                console.log(`[setupUrlChangeDetection] URL changée: ${lastUrl} → ${location.href}`);
                lastUrl = location.href;
                // Attendre un peu que la page charge
                setTimeout(checkUrlAndProceed, 2000);

                // Si on arrive sur la page de résultats, on arrête après un petit délai
                if (location.href.includes('/pdf-editor#results')) {
                    setTimeout(() => clearInterval(urlCheckInterval), 10000);
                }
            }
        }, 500);
        
        // Au bout de 1 minute, on arrête de checker
        setTimeout(() => clearInterval(urlCheckInterval), 60000);
    }

    /**************************************************
     *                EXECUTION
     **************************************************/
    // Si on est déjà sur la page de résultats (cas d'un refresh ou d'un retour)
    if (window.location.href.includes('/pdf-editor#results')) {
        console.log('[Main] Déjà sur la page de résultats. Tentative de clic sur "Télécharger" dans 3s...');
        setTimeout(extractAndClickDownloadLink, 3000);
    } 
    else {
        // Sinon, on est probablement sur la page d'édition
        console.log('[Main] Page d\'édition, on exécute la séquence...');
        
        // 1) Mettre à jour les éléments
        setTimeout(updateElements, 1000);
        // 2) Re-mettre à jour au cas où certains éléments ne seraient pas encore chargés
        setTimeout(() => {
            updateElements();
            // 3) Cliquer sur "Appliquer les changements"
            setTimeout(() => {
                if (clickApplyButton()) {
                    // 4) Surveiller le changement d'URL pour détecter la page de résultats
                    setupUrlChangeDetection();
                    
                    // Fallback : au bout de 10s, on vérifie si on est passé à la page de résultats
                    setTimeout(() => {
                        if (window.location.href.includes('/pdf-editor#results')) {
                            console.log('[Fallback] Page de résultats détectée. On tente le téléchargement...');
                            extractAndClickDownloadLink();
                        }
                    }, 10000);
                }
            }, 2000);
        }, 3000);
    }

    console.log('[Main] Script d\'automatisation prêt !');
})();
