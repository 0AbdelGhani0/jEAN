javascript:(function(){
    /**************************************************
     *                CONFIGURATION
     **************************************************/
    const productName = "GARBIT COUSCOUS POULE";
    const quantity = Math.floor(Math.random() * 4) + 3; // Nombre aléatoire entre 3 et 6
    const unitPrice = 5.82;
    const total = quantity * unitPrice;
    const tax = (total * 0.055).toFixed(2);
    
    // Fonction pour générer une date aléatoire entre 18/02/2025 et 20/03/2025
    function generateRandomDate() {
        const startDate = new Date(2025, 1, 18);
        const endDate   = new Date(2025, 2, 20, 23, 59, 59);
        const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
        const randomDate = new Date(randomTime);
        
        // Exclure les dimanches
        if (randomDate.getDay() === 0) {
            randomDate.setDate(randomDate.getDate() + 1);
        }
        // Fixer l'heure entre 9h et 20h
        randomDate.setHours(9 + Math.floor(Math.random() * 11), Math.floor(Math.random() * 60));
        return randomDate;
    }
    
    const randomDate = generateRandomDate();
    const pad = n => n.toString().padStart(2, '0');
    const date1 = `${pad(randomDate.getDate())}/${pad(randomDate.getMonth() + 1)}/${randomDate.getFullYear()} à ${pad(randomDate.getHours())}h${pad(randomDate.getMinutes())}`;
    
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
    
    console.log('[Sejda-Auto] Script démarré');
    console.log('[Sejda-Auto] Produit:', productName);
    console.log('[Sejda-Auto] Quantité:', quantity);
    console.log('[Sejda-Auto] Prix unitaire:', unitPrice);
    console.log('[Sejda-Auto] Total:', total.toFixed(2));
    console.log('[Sejda-Auto] Date générée:', date1);
    
    /**************************************************
     *         FONCTION: updateElements()
     **************************************************/
    function updateElements() {
        console.log('[updateElements] Mise à jour des éléments...');
        const elements = document.querySelectorAll('div, span, p');
        
        elements.forEach(element => {
            const originalText = element.textContent.trim();
            
            // Remplacement classique
            if (textReplacements[originalText]) {
                try {
                    element.click();
                    setTimeout(() => {
                        try {
                            const activeElement = document.activeElement;
                            if (activeElement && activeElement.tagName === 'TEXTAREA') {
                                activeElement.value = textReplacements[originalText];
                                activeElement.dispatchEvent(new Event('input', { bubbles: true }));
                            } else {
                                element.textContent = textReplacements[originalText];
                            }
                            console.log(`[updateElements] "${originalText}" → "${textReplacements[originalText]}"`);
                        } catch (e) {
                            console.error('[updateElements] Erreur lors du remplacement:', e);
                        }
                    }, 200);
                } catch (e) {
                    element.textContent = textReplacements[originalText];
                }
            }
            
            // Remplacement de dates
            if (dateReplacements[originalText]) {
                try {
                    element.click();
                    setTimeout(() => {
                        try {
                            const activeElement = document.activeElement;
                            if (activeElement && activeElement.tagName === 'TEXTAREA') {
                                activeElement.value = dateReplacements[originalText];
                                activeElement.dispatchEvent(new Event('input', { bubbles: true }));
                            } else {
                                element.textContent = dateReplacements[originalText];
                            }
                            console.log(`[updateElements] DATE "${originalText}" → "${dateReplacements[originalText]}"`);
                        } catch (e) {
                            console.error('[updateElements] Erreur lors du remplacement de date:', e);
                        }
                    }, 200);
                } catch (e) {
                    element.textContent = dateReplacements[originalText];
                }
            }
        });
    }
    
    /**************************************************
     *       FONCTION: clickApplyButton()
     **************************************************/
    function clickApplyButton() {
        console.log('[clickApplyButton] Recherche du bouton "Appliquer les changements"...');
        let applyButton = document.getElementById('save-pdf-btn');
        
        if (!applyButton) {
            const buttons = document.querySelectorAll('button.btn');
            for (const btn of buttons) {
                if (btn.textContent.includes('Appliquer les changements')) {
                    applyButton = btn;
                    break;
                }
            }
        }
        
        if (!applyButton) {
            const containers = document.querySelectorAll('.submit-button-container');
            for (const container of containers) {
                const btns = container.querySelectorAll('button');
                for (const b of btns) {
                    if (b.textContent.includes('Appliquer')) {
                        applyButton = b;
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
            console.error('[clickApplyButton] Bouton non trouvé !');
            return false;
        }
    }
    
    /**************************************************
     *  FONCTION: checkUrlAndOpenCopy()
     *  Si l'URL contient "/pdf-editor#results", ouvre la
     *  même page dans un nouvel onglet (duplique la page)
     **************************************************/
    function checkUrlAndOpenCopy() {
        const currentUrl = window.location.href;
        console.log('[checkUrlAndOpenCopy] URL actuelle:', currentUrl);
        if (currentUrl.includes('/pdf-editor#results')) {
            console.log('[checkUrlAndOpenCopy] Nouvelle page détectée ! Ouverture d\'une copie dans un nouvel onglet dans 2s...');
            setTimeout(() => {
                window.open(currentUrl, '_blank');
                console.log('[checkUrlAndOpenCopy] Copie de la page ouverte.');
            }, 2000);
        }
    }
    
    /**************************************************
     *     FONCTION: setupUrlChangeDetection()
     **************************************************/
    function setupUrlChangeDetection() {
        let lastUrl = window.location.href;
        const intervalId = setInterval(() => {
            if (window.location.href !== lastUrl) {
                console.log(`[setupUrlChangeDetection] URL changée : ${lastUrl} → ${window.location.href}`);
                lastUrl = window.location.href;
                setTimeout(checkUrlAndOpenCopy, 1500);
                if (window.location.href.includes('/pdf-editor#results')) {
                    setTimeout(() => clearInterval(intervalId), 10000);
                }
            }
        }, 500);
        setTimeout(() => clearInterval(intervalId), 60000);
    }
    
    /**************************************************
     *              SCÉNARIO PRINCIPAL
     **************************************************/
    if (window.location.href.includes('/pdf-editor#results')) {
        console.log('[Main] Déjà sur la page de résultats. Ouverture d\'une copie dans 2s...');
        setTimeout(() => {
            window.open(window.location.href, '_blank');
            console.log('[Main] Copie de la page ouverte.');
        }, 2000);
    } else {
        console.log('[Main] Page d\'édition détectée : exécution de la séquence (updateElements, puis clic "Appliquer", puis surveillance de l’URL)...');
        setTimeout(updateElements, 1000);
        setTimeout(updateElements, 3000);
        setTimeout(() => {
            if (clickApplyButton()) {
                setupUrlChangeDetection();
            } else {
                console.warn('[Main] Impossible de cliquer sur "Appliquer les changements".');
            }
        }, 5000);
    }
    
    console.log('[Sejda-Auto] Script prêt !');
})();
