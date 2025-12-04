# Archives de QR Codes

Ce dossier contient des archives de QR codes pré-générés, prêts à télécharger et utiliser.

## 📦 QR-Codes-E000000-E009999.zip

**Contenu:** 10 008 QR codes au format SVG

### Détails

| Propriété | Valeur |
|-----------|--------|
| **Plage de références** | E000000 à E009999 (+ quelques exemples) |
| **Nombre de fichiers** | 10 008 fichiers SVG |
| **Taille non compressée** | 9.04 MB |
| **Taille compressée** | 4.9 MB |
| **Taux de compression** | ~46% |
| **Format** | SVG (300x300px, scalable) |

### Comment utiliser

#### 1. Télécharger l'archive

Cliquez sur `QR-Codes-E000000-E009999.zip` dans ce dossier et téléchargez-le.

#### 2. Décompresser

**Sur Windows:**
- Clic droit sur le fichier ZIP
- Sélectionnez "Extraire tout..."

**Sur Mac:**
- Double-cliquez sur le fichier ZIP

**Sur Linux:**
```bash
unzip QR-Codes-E000000-E009999.zip -d qr-codes/
```

#### 3. Utiliser les QR codes

Une fois décompressés, vous aurez accès à tous les fichiers SVG:
- `QR_E000000.svg`
- `QR_E000001.svg`
- ...
- `QR_E009999.svg`

### Utilisation des fichiers SVG

Les fichiers SVG peuvent être:
- ✅ Ouverts dans un navigateur web
- ✅ Importés dans des logiciels de design (Illustrator, Inkscape, Figma, etc.)
- ✅ Intégrés dans des documents HTML/PDF
- ✅ Imprimés sans perte de qualité (format vectoriel)
- ✅ Redimensionnés à n'importe quelle taille

### Exemple d'utilisation HTML

```html
<img src="QR_E000000.svg" alt="QR Code E000000" width="200" height="200">
```

### Scanner un QR code

Chaque QR code encode simplement sa référence. Par exemple:
- `QR_E000000.svg` → scanne "E000000"
- `QR_E005432.svg` → scanne "E005432"
- `QR_E009999.svg` → scanne "E009999"

## 🔧 Générer vos propres QR codes

Si vous avez besoin d'autres références, utilisez le générateur:

```bash
# Cloner le repo
git clone <repo-url>
cd SVG_QRCODE

# Installer les dépendances
npm install

# Générer des QR codes personnalisés
npm run quick E123456                    # Un seul QR code
node mass-generate.js E100000 E109999    # Plage de 10,000 QR codes
```

## 📝 Notes

- Tous les QR codes ont été générés avec un niveau de correction d'erreur Medium (M)
- Dimension par défaut: 300x300 pixels
- Couleurs: noir sur blanc
- Marge: 2 modules
