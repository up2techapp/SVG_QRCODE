import QRCodeSVGGenerator from './src/qrGenerator.js';

/**
 * Script de génération massive de QR codes
 * Usage: node mass-generate.js [début] [fin] [dossier]
 * Exemple: node mass-generate.js E000000 E009999 ./output
 */

function formatReference(prefix, number, totalDigits) {
  return prefix + String(number).padStart(totalDigits, '0');
}

function parseReference(ref) {
  const match = ref.match(/^([A-Z]+)(\d+)$/);
  if (!match) throw new Error(`Format de référence invalide: ${ref}`);
  return {
    prefix: match[1],
    number: parseInt(match[2], 10),
    digits: match[2].length
  };
}

async function massGenerate(startRef, endRef, outputDir = './output') {
  const start = parseReference(startRef);
  const end = parseReference(endRef);

  if (start.prefix !== end.prefix) {
    throw new Error('Les préfixes doivent être identiques');
  }

  if (start.number > end.number) {
    throw new Error('Le début doit être inférieur ou égal à la fin');
  }

  const totalCount = end.number - start.number + 1;
  const prefix = start.prefix;
  const digits = Math.max(start.digits, end.digits);

  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║     Génération massive de QR codes SVG                ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`📋 Configuration:`);
  console.log(`   Début:        ${startRef}`);
  console.log(`   Fin:          ${endRef}`);
  console.log(`   Total:        ${totalCount.toLocaleString()} QR codes`);
  console.log(`   Dossier:      ${outputDir}`);
  console.log('');

  const generator = new QRCodeSVGGenerator({
    width: 300,
    margin: 2,
    errorCorrectionLevel: 'M'
  });

  const startTime = Date.now();
  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  console.log('🔄 Génération en cours...\n');

  for (let i = start.number; i <= end.number; i++) {
    const reference = formatReference(prefix, i, digits);
    const filename = `QR_${reference}.svg`;
    const outputPath = `${outputDir}/${filename}`;

    try {
      await generator.generateQRCode(reference, outputPath);
      successCount++;

      // Afficher la progression toutes les 100 générations
      if (successCount % 100 === 0 || successCount === totalCount) {
        const progress = ((successCount / totalCount) * 100).toFixed(1);
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        const rate = (successCount / elapsed).toFixed(1);
        const remaining = ((totalCount - successCount) / rate).toFixed(0);

        process.stdout.write(
          `\r⏳ Progression: ${successCount.toLocaleString()}/${totalCount.toLocaleString()} ` +
          `(${progress}%) | Vitesse: ${rate}/s | Temps restant: ~${remaining}s   `
        );
      }
    } catch (error) {
      errorCount++;
      errors.push({ reference, error: error.message });
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
  const avgRate = (successCount / totalTime).toFixed(1);

  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║     Génération terminée                                ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`✅ Réussis:       ${successCount.toLocaleString()} QR codes`);
  console.log(`❌ Erreurs:       ${errorCount}`);
  console.log(`⏱️  Temps total:   ${totalTime}s`);
  console.log(`🚀 Vitesse moy.:  ${avgRate} QR codes/s`);
  console.log(`📁 Dossier:       ${outputDir}`);
  console.log('');

  if (errors.length > 0 && errors.length <= 10) {
    console.log('❌ Erreurs:');
    errors.forEach(e => console.log(`   - ${e.reference}: ${e.error}`));
    console.log('');
  } else if (errors.length > 10) {
    console.log(`❌ ${errors.length} erreurs (trop nombreuses pour afficher)`);
    console.log('');
  }

  return { successCount, errorCount, totalTime, avgRate };
}

// Arguments en ligne de commande
const args = process.argv.slice(2);
const startRef = args[0] || 'E000000';
const endRef = args[1] || 'E009999';
const outputDir = args[2] || './output';

massGenerate(startRef, endRef, outputDir).catch(error => {
  console.error('\n❌ Erreur fatale:', error.message);
  process.exit(1);
});
