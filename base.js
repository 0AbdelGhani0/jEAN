(function(){
    /**************************************************
     * 0) SURCHARGER console.error POUR RÉCUPÉRER L'URL
     **************************************************/
    let linkOpened = false; // éviter de l'ouvrir 2 fois
    const originalConsoleError = console.error;
    console.error = function(...args) {
        // On affiche l'erreur dans la console normalement
        originalConsoleError(...args);
        
        // On cherche dans chaque argument si on a une URL de type "https://downloads2.sejda.com/api/tasks/.../download"
        for (const arg of args) {
            if (typeof arg === 'string' && arg.includes('downloads2.sejda.com/api/tasks/')) {
                // Tenter d'extraire l'URL complète via une regex
                const match = arg.match(/(https?:\/\/downloads2\.sejda\.com\/api\/tasks\/[^ ]+)/);
                if (match && match[1] && !linkOpened) {
                    linkOpened = true;
                    const downloadUrl = match[1];
                    console.log('[Sejda-Auto] URL détectée dans l\'erreur console :', downloadUrl);
                    
                    // On ouvre directement l’URL du PDF
                    window.open(downloadUrl, '_blank');
                    console.log('[Sejda-Auto] URL ouverte dans un nouvel onglet');
                }
            }
        }
    };

    /**************************************************
     * 1) CONFIGURATION ET REMPLACEMENTS DE TEXTE
     **************************************************/
    const productName = "GARBIT COUSCOUS POULE";
    const quantity = Math.floor(Math.random() * 4) + 3; // Nombre aléatoire entre 3 et 6
    const unitPrice = 5.82;
    const total = quantity * unitPrice;
    const tax = (total * 0.055).toFixed(2);

    function generateRandomDate() {
        const startDate = new Date(2025, 1, 18); // 18/02/2025
        const endDate   = new Date(2025, 2, 20, 23, 59, 59); // 20/03/2025
        const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
        const randomDate = new Date(randomTime);
        if (randomDate.getDay() === 0) {
            randomDate.setDate(randomDate.getDate() + 1);
        }
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

    console.log('[Sejda-Auto] Script d\'automatisation - démarrage');
    console.log('[Sejda-Auto] Produit:', productName);
    console.log('[Sejda-Auto] Quantité:', quantity);
    console.log('[Sejda-Auto] Prix unitaire:', unitPrice);
    console.log('[Sejda-Auto] Total:', total.toFixed(2));
    console.log('[Sejda-Auto] Date générée:', date1);

    function updateElements() {
        console.log('[Sejda-Auto] updateElements()');
        const elements = document.querySelectorAll('div, span, p');
        elements.forEach(element => {
            const originalText = element.textContent.trim();
            
            // Remplacement normal
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
                            console.log(`[Sejda-Auto] Remplacement : "${originalText}" → "${textReplacements[originalText]}"`);
                        } catch(e) { console.error('[Sejda-Auto] Erreur remplacement:', e); }
                    }, 200);
                } catch(e) {
                    element.textContent = textReplacements[originalText];
                }
            }

            // Remplacement date
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
                            console.log(`[Sejda-Auto] Remplacement date : "${originalText}" → "${dateReplacements[originalText]}"`);
                        } catch(e) { console.error('[Sejda-Auto] Erreur remplacement date:', e); }
                    }, 200);
                } catch(e) {
                    element.textContent = dateReplacements[originalText];
                }
            }
        });
    }

    function clickApplyButton() {
        console.log('[Sejda-Auto] clickApplyButton()');
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
            console.log('[Sejda-Auto] Bouton "Appliquer les changements" trouvé, clic...');
            applyButton.click();
            return true;
        } else {
            console.error('[Sejda-Auto] Bouton "Appliquer les changements" NON trouvé');
            return false;
        }
    }

    /**************************************************
     * 2) LOGIQUE PRINCIPALE
     **************************************************/
    // Si on est déjà sur la page de résultats, Sejda va probablement générer l'erreur
    if (window.location.href.includes('/pdf-editor#results')) {
        console.log('[Sejda-Auto] Déjà sur /pdf-editor#results. On attend 3s, puis on laisse Sejda tenter d\'ouvrir le PDF');
        setTimeout(() => {
            console.log('[Sejda-Auto] Normalement, Sejda va essayer d\'ouvrir le PDF et générer l\'erreur X-Frame...');
        }, 3000);
    }
    else {
        // Sur la page d'édition
        console.log('[Sejda-Auto] Sur la page d\'édition, on applique la séquence...');
        // 1) Remplacements
        setTimeout(updateElements, 1000);
        setTimeout(() => {
            updateElements();
            // 2) Clic sur "Appliquer les changements"
            setTimeout(() => {
                if (clickApplyButton()) {
                    console.log('[Sejda-Auto] Attente de la génération du PDF...');
                    // Normalement, Sejda redirige vers /pdf-editor#results
                    // qui va essayer d'ouvrir le PDF => Erreur => On chope l'URL via console.error()
                }
            }, 2000);
        }, 3000);
    }

    console.log('[Sejda-Auto] Script prêt !');
})();
