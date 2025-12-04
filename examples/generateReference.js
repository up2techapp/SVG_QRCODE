import QRCodeSVGGenerator from '../src/qrGenerator.js';

/**
 * Exemple d'utilisation du générateur de QR codes SVG
 */
async function main() {
  console.log('=== Générateur de QR Codes SVG ===\n');

  // Créer une instance du générateur
  const generator = new QRCodeSVGGenerator({
    width: 300,
    margin: 2,
    errorCorrectionLevel: 'M',
    darkColor: '#000000',
    lightColor: '#FFFFFF'
  });

  // Exemple 1: Générer un QR code simple pour la référence E10000
  console.log('1. Génération d\'un QR code simple pour E10000...');
  await generator.generateQRCode('E10000', './output/QR_E10000.svg');

  // Exemple 2: Générer plusieurs QR codes en batch
  console.log('\n2. Génération de plusieurs QR codes en batch...');
  const references = ['E10000', 'E10001', 'E10002', 'E10003', 'E10004'];
  await generator.generateBatch(references, './output');

  // Exemple 3: Générer un QR code avec une URL complète
  console.log('\n3. Génération d\'un QR code avec URL...');
  await generator.generateWithPrefix(
    'E10000',
    './output/QR_E10000_URL.svg',
    'https://example.com/reference/'
  );

  // Exemple 4: Générer un QR code personnalisé
  console.log('\n4. Génération d\'un QR code personnalisé (couleurs)...');
  const customGenerator = new QRCodeSVGGenerator({
    width: 400,
    margin: 3,
    darkColor: '#1a73e8',
    lightColor: '#f0f0f0'
  });
  await customGenerator.generateQRCode('E10000', './output/QR_E10000_custom.svg');

  // Exemple 5: Obtenir le contenu SVG sans sauvegarder
  console.log('\n5. Génération du contenu SVG en mémoire...');
  const svgContent = await generator.generateQRCode('E10000');
  console.log(`✓ SVG généré (${svgContent.length} caractères)`);
  console.log('Premier 100 caractères:', svgContent.substring(0, 100) + '...');

  console.log('\n=== Génération terminée ===');
  console.log('Les QR codes ont été sauvegardés dans le dossier ./output/');
}

// Exécuter le programme principal
main().catch(error => {
  console.error('Erreur:', error);
  process.exit(1);
});
