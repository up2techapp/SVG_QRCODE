import QRCodeSVGGenerator from './src/qrGenerator.js';

/**
 * Script de démarrage rapide pour générer un QR code
 * Usage: node quick-start.js [référence] [chemin_sortie]
 * Exemple: node quick-start.js E10000 ./mon-qr.svg
 */

async function quickStart() {
  const args = process.argv.slice(2);

  // Valeurs par défaut
  const reference = args[0] || 'E10000';
  const outputPath = args[1] || `./output/QR_${reference}.svg`;

  console.log('🔄 Génération du QR code...');
  console.log(`   Référence: ${reference}`);
  console.log(`   Sortie: ${outputPath}`);
  console.log('');

  try {
    const generator = new QRCodeSVGGenerator({
      width: 300,
      margin: 2,
      errorCorrectionLevel: 'M'
    });

    await generator.generateQRCode(reference, outputPath);

    console.log('✅ QR code généré avec succès!');
    console.log(`   📁 Fichier: ${outputPath}`);
    console.log('');
    console.log('💡 Astuce: Ouvrez le fichier SVG dans un navigateur ou un éditeur SVG');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

quickStart();
