# Générateur de QR Codes SVG

Un outil Node.js simple et efficace pour générer des QR codes au format SVG à partir de références.

## 🚀 Fonctionnalités

- ✅ Génération de QR codes au format SVG
- ✅ Support des références simples (ex: E10000)
- ✅ Génération en batch de plusieurs QR codes
- ✅ Support des URLs complètes
- ✅ Personnalisation des couleurs et dimensions
- ✅ Niveaux de correction d'erreur configurables
- ✅ Export dans des fichiers ou obtention du contenu SVG en mémoire

## 📦 Installation

```bash
npm install
```

## 🎯 Utilisation

### Exemple simple

```javascript
import QRCodeSVGGenerator from './src/qrGenerator.js';

const generator = new QRCodeSVGGenerator();

// Générer un QR code pour la référence E10000
await generator.generateQRCode('E10000', './output/QR_E10000.svg');
```

### Génération en batch

```javascript
const references = ['E10000', 'E10001', 'E10002', 'E10003'];
await generator.generateBatch(references, './output');
```

### QR code avec URL

```javascript
await generator.generateWithPrefix(
  'E10000',
  './output/QR_E10000_URL.svg',
  'https://example.com/reference/'
);
```

### Personnalisation

```javascript
const generator = new QRCodeSVGGenerator({
  width: 400,              // Largeur en pixels
  margin: 3,               // Marge autour du QR code
  errorCorrectionLevel: 'H', // L, M, Q, H
  darkColor: '#1a73e8',    // Couleur des modules
  lightColor: '#f0f0f0'    // Couleur de fond
});
```

## 🏃 Exécution des exemples

```bash
npm run generate
```

Cette commande génère plusieurs QR codes d'exemple dans le dossier `./output/`.

## 📁 Structure du projet

```
SVG_QRCODE/
├── src/
│   └── qrGenerator.js       # Module principal
├── examples/
│   └── generateReference.js # Exemples d'utilisation
├── output/                  # Dossier des QR codes générés
├── package.json
└── README.md
```

## 📖 API

### `QRCodeSVGGenerator(options)`

Crée une nouvelle instance du générateur.

**Options:**
- `width` (number): Largeur du QR code en pixels (défaut: 300)
- `margin` (number): Marge autour du QR code (défaut: 4)
- `errorCorrectionLevel` (string): Niveau de correction d'erreur - 'L', 'M', 'Q', 'H' (défaut: 'M')
- `darkColor` (string): Couleur des modules du QR code (défaut: '#000000')
- `lightColor` (string): Couleur de fond (défaut: '#FFFFFF')

### `generateQRCode(reference, outputPath)`

Génère un QR code SVG pour une référence.

**Paramètres:**
- `reference` (string): La référence à encoder (ex: "E10000")
- `outputPath` (string, optionnel): Chemin du fichier de sortie

**Retourne:** Promise<string> - Le contenu SVG

### `generateBatch(references, outputDir)`

Génère plusieurs QR codes en une seule opération.

**Paramètres:**
- `references` (Array<string>): Liste des références
- `outputDir` (string): Répertoire de sortie (défaut: './output')

**Retourne:** Promise<Array> - Liste des résultats

### `generateWithPrefix(data, outputPath, prefix)`

Génère un QR code avec un préfixe (utile pour les URLs).

**Paramètres:**
- `data` (string): Données à encoder
- `outputPath` (string): Chemin du fichier de sortie
- `prefix` (string): Préfixe à ajouter (ex: "https://example.com/ref/")

**Retourne:** Promise<string> - Le contenu SVG

## 🎨 Niveaux de correction d'erreur

- **L (Low)**: ~7% de correction
- **M (Medium)**: ~15% de correction (recommandé)
- **Q (Quartile)**: ~25% de correction
- **H (High)**: ~30% de correction

Plus le niveau est élevé, plus le QR code peut être endommagé tout en restant lisible, mais il sera aussi plus dense.

## 📝 Exemples de cas d'usage

### 1. Système d'inventaire
Générer des QR codes pour des références produits:
```javascript
await generator.generateBatch(['E10000', 'E10001', 'E10002'], './inventory');
```

### 2. Traçabilité
Créer des QR codes avec URLs complètes:
```javascript
await generator.generateWithPrefix('E10000', './trace/E10000.svg', 'https://tracking.example.com/item/');
```

### 3. Étiquettes personnalisées
Générer des QR codes avec des couleurs de marque:
```javascript
const brandedGenerator = new QRCodeSVGGenerator({
  darkColor: '#FF6600',
  lightColor: '#FFFFFF',
  width: 500
});
```

## 🔧 Technologies utilisées

- Node.js (ES Modules)
- [qrcode](https://www.npmjs.com/package/qrcode) - Bibliothèque de génération de QR codes

## 📄 Licence

MIT
