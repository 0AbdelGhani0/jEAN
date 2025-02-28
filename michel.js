const regex = /https:\/\/downloads[1-9]\.sejda\.com\/api\/tasks\/[a-zA-Z0-9-]+\/download\/[^\s?]+\.pdf\?[^\s]+/g;

// Chercher dans le code source
const codeSource = document.documentElement.outerHTML;
const urlsTrouvees = codeSource.match(regex);

if (urlsTrouvees && urlsTrouvees.length > 0) {
  // Ouvrir le premier résultat dans un nouvel onglet
  const premiereUrl = urlsTrouvees[0];
  window.open(premiereUrl, '_blank');
  console.log('🔗 Lien ouvert dans un nouvel onglet :', premiereUrl);
} else {
  console.log('❌ Aucun lien PDF Sejda trouvé');
}
