import QRCode from 'qrcode';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Classe pour générer des QR codes au format SVG
 */
class QRCodeSVGGenerator {
  constructor(options = {}) {
    this.options = {
      errorCorrectionLevel: options.errorCorrectionLevel || 'M', // L, M, Q, H
      type: 'svg',
      quality: options.quality || 0.92,
      margin: options.margin || 4,
      color: {
        dark: options.darkColor || '#000000',
        light: options.lightColor || '#FFFFFF'
      },
      width: options.width || 300
    };
  }

  /**
   * Génère un QR code SVG pour une référence donnée
   * @param {string} reference - La référence à encoder (ex: "E10000")
   * @param {string} outputPath - Chemin du fichier de sortie (optionnel)
   * @returns {Promise<string>} - Le contenu SVG du QR code
   */
  async generateQRCode(reference, outputPath = null) {
    try {
      // Génération du SVG
      const svgString = await QRCode.toString(reference, {
        ...this.options,
        type: 'svg'
      });

      // Si un chemin de sortie est spécifié, sauvegarder le fichier
      if (outputPath) {
        await this.saveSVG(svgString, outputPath);
        console.log(`✓ QR code généré avec succès: ${outputPath}`);
      }

      return svgString;
    } catch (error) {
      console.error('Erreur lors de la génération du QR code:', error);
      throw error;
    }
  }

  /**
   * Génère plusieurs QR codes pour une liste de références
   * @param {Array<string>} references - Liste des références
   * @param {string} outputDir - Répertoire de sortie
   * @returns {Promise<Array>} - Liste des fichiers générés
   */
  async generateBatch(references, outputDir = './output') {
    try {
      // Créer le répertoire de sortie s'il n'existe pas
      await fs.mkdir(outputDir, { recursive: true });

      const results = [];

      for (const ref of references) {
        const filename = `QR_${ref}.svg`;
        const outputPath = path.join(outputDir, filename);

        await this.generateQRCode(ref, outputPath);
        results.push({
          reference: ref,
          path: outputPath,
          success: true
        });
      }

      console.log(`\n✓ ${results.length} QR codes générés avec succès dans ${outputDir}`);
      return results;
    } catch (error) {
      console.error('Erreur lors de la génération en batch:', error);
      throw error;
    }
  }

  /**
   * Génère un QR code avec des données personnalisées (URL, texte, etc.)
   * @param {string} data - Données à encoder
   * @param {string} outputPath - Chemin du fichier de sortie
   * @param {string} prefix - Préfixe optionnel (ex: "https://example.com/ref/")
   * @returns {Promise<string>} - Le contenu SVG du QR code
   */
  async generateWithPrefix(data, outputPath, prefix = '') {
    const fullData = prefix + data;
    return await this.generateQRCode(fullData, outputPath);
  }

  /**
   * Sauvegarde le contenu SVG dans un fichier
   * @param {string} svgContent - Contenu SVG
   * @param {string} outputPath - Chemin du fichier de sortie
   */
  async saveSVG(svgContent, outputPath) {
    const dir = path.dirname(outputPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(outputPath, svgContent, 'utf8');
  }

  /**
   * Configure les options du générateur
   * @param {Object} newOptions - Nouvelles options
   */
  setOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
  }
}

export default QRCodeSVGGenerator;
