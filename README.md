# MLX MALILOG EXPO 2027
## Dossier de production — Version finale

**Organisé par GRAPHIC COM · Commissaire Général : Aboubacar BATHILY**
**contact@salonsigma.com · +223 63 15 14 60 · salonsigma.com**

---

## 📁 STRUCTURE DU PROJET

```
mlx-malilog-expo-2027/
├── index.html                              ← Page principale (HTML structuré & commenté)
├── README.md                               ← Ce fichier
├── assets/
│   ├── css/
│   │   └── main.css                        ← Feuille de style (Design System v3 + DELTA REFINEMENTS)
│   └── js/
│       └── main.js                         ← Scripts (nav, menu, FAQ, compteurs, …)
└── img/
    ├── hero-logistics-corridor.jpg         ← HERO principal — 1440×1080 (328KB)
    ├── strategic-vision.jpg                ← Section Vision — 900×672 (89KB)
    ├── bamako-aerial-overview.jpg          ← Section Bamako bg — 1200×896 (213KB)
    ├── logistics-investment-background.jpg ← CTA + footer bg — 1200×896 (193KB)
    ├── international-business-forum.jpg    ← Mosaïque — événements — 900×675 (95KB)
    ├── international-visibility.jpg        ← Carte Visibilité — 700×525 (51KB)
    ├── regional-business-development.jpg   ← Carte Business — 700×522 (48KB)
    ├── institutional-leadership.jpg        ← Carte Influence — 700×522 (56KB)
    ├── regional-logistics-network.jpg      ← Carte Réseau — 700×522 (55KB)
    ├── strategic-partnerships.jpg          ← Why Partner — collaboration — 700×469 (77KB)
    ├── infrastructure-development.jpg      ← Why Partner — infrastructure — 700×522 (100KB)
    ├── regional-cooperation-network.jpg    ← Why Partner — réseau — 700×522 (64KB)
    ├── logo-mlx-white.png                  ← Logo MLX blanc (utilisé nav + footer)
    ├── logo-mlx-orange.png                 ← Logo MLX orange (fond clair)
    ├── logo-mlx.png                        ← Logo MLX (base)
    ├── logo-graphiccom.png                 ← Logo GRAPHIC COM (footer)
    ├── favicon.png                         ← Favicon site (64×64)
    └── partners/
        ├── fondateur-1/2/3.png             ← Logos Partenaires Fondateurs
        ├── platine-1→5.png                 ← Logos Sponsors Platine
        ├── media-1→6.png                   ← Logos Partenaires Médias
        └── instit-1→6.png                  ← Logos Partenaires Institutionnels
```

### 🗂️ Organisation du code (HTML / CSS / JS)

Depuis la refactorisation, le code est divisé en 3 fichiers pour plus de maintenabilité :

| Fichier | Rôle | Sections commentées |
|---|---|---|
| `index.html` | Structure & contenu | 5 blocs `<head>` + 16 sections `<body>` + footer |
| `assets/css/main.css` | Styles (Design System v3 + DELTA REFINEMENTS) | 29 sections (tokens, layout, nav, hero, responsive, …) |
| `assets/js/main.js` | Comportements | 10 modules (nav scroll, menu mobile, smooth scroll, reveal, compteurs, FAQ, lazy-load, newsletters, …) |

> **Note** : les images de fond définies dans `main.css` utilisent le chemin `../../img/…` (relatif au fichier CSS). Ne pas les re-renommer `img/…` sous peine de casser le rendu.

---

## 🚀 DÉPLOIEMENT cPANEL

1. Connectez-vous à cPanel
2. Gestionnaire de fichiers → `public_html/`
3. Uploadez le ZIP → Clic droit → **Extract**
4. Déplacez le contenu de `mlx-malilog-expo-2027/` à la racine de `public_html/`
5. Vérifiez que `index.html` et le dossier `img/` sont au même niveau

---

## 🖼️ REMPLACER UNE IMAGE

Gardez **exactement le même nom de fichier**, remplacez-le dans le bon dossier.

| Section | Fichier à remplacer |
|---|---|
| Photo principale (Hero) | `img/hero-logistics-corridor.jpg` |
| Section Vision | `img/strategic-vision.jpg` |
| Section Bamako | `img/bamako-aerial-overview.jpg` |
| CTA + Footer | `img/logistics-investment-background.jpg` |
| Mosaïque conférences | `img/international-business-forum.jpg` |
| Logo MLX (nav + footer) | `img/logo-mlx-white.png` |
| Favicon | `img/favicon.png` |
| Partenaire Fondateur 1 | `img/partners/fondateur-1.png` |

---

## ✏️ MODIFIER LE TEXTE

Ouvrez `index.html` dans VS Code, Notepad++ ou Sublime Text.

| Chercher | Modifier |
|---|---|
| `Octobre 2027` | Date de l'événement |
| `contact@salonsigma.com` | Email de contact |
| `+223 63 15 14 60` | Téléphone mobile |
| `20 28 48 19` | Téléphone bureau |
| `Aboubacar BATHILY` | Commissaire Général |
| `Centre International de Conférences de Bamako` | Lieu exact |

---

## 🔧 CONNECTER LE FORMULAIRE

Remplacez la ligne `onclick="alert(...)` du bouton par une action Formspree :

```html
<!-- Dans index.html, trouvez le bouton Envoyer et ajoutez action au form -->
<form action="https://formspree.io/f/VOTRE_ID" method="POST">
```

Ou utilisez le script PHP de votre hébergeur.

---

## 📋 PROMPT CLAUDE — pour continuer les modifications

```
Tu es un développeur web senior.
Tu travailles sur le site MLX MALILOG EXPO 2027.

RÈGLES :
- Ne reconstruis JAMAIS depuis zéro.
- Travaille uniquement sur index.html fourni.
- Conserve : palette #E8651A (orange) / #0B1D35 (navy), Inter + Playfair Display.
- Toutes les images sont dans img/ et img/partners/.
- Logos partenaires : img/partners/*.png — ne jamais modifier les fichiers logo.
- Année de référence : 2027.

CONTEXTE :
Site : MLX MALILOG EXPO 2027, premier salon logistique du Mali.
Organisateur : GRAPHIC COM / Aboubacar BATHILY, Bamako.
Contact : contact@salonsigma.com / +223 63 15 14 60.

MODIFICATIONS :
[Décrivez ici précisément ce que vous souhaitez]
```

---

*Version 2027 · Produit par GRAPHIC COM · Bamako, Mali*
