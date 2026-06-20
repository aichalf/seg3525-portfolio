# Mise à jour des palettes — SEG3525

Ce dossier contient les fichiers complets à remplacer dans le dépôt `seg3525-portfolio-v2`.

## Fichiers

- `service-website.html` : page principale NutriVie avec la nouvelle palette naturelle.
- `service-details.html` : pages de détails des services avec la même identité NutriVie.
- `memory-game.html` : jeu Mémoria avec une palette distincte bleu/lavande/turquoise.
- `index-card-update.html` : petit extrait à utiliser dans la carte Design 02 du portfolio.

## Palette NutriVie

- Vert profond : `#2F6658`
- Vert sauge : `#9FBFAE`
- Ivoire : `#FAF7F0`
- Corail : `#E28B6D`
- Texte foncé : `#24332D`
- Beige clair : `#E8DED0`

## Palette Mémoria

- Bleu nuit : `#1D2433`
- Lavande : `#6C7BD9`
- Turquoise : `#4CB7A5`
- Fond bleu très pâle : `#F3F6FC`
- Rouge doux pour les erreurs : `#C65C5C`

## Installation

1. Copiez les trois fichiers HTML à la racine du dépôt.
2. Acceptez le remplacement des anciens fichiers.
3. Dans `index.html`, modifiez seulement le lien de la carte Design 02 à l'aide de `index-card-update.html`.
4. Testez localement :

```bash
python -m http.server 8080
```

5. Ouvrez :

```text
http://localhost:8080/service-website.html
http://localhost:8080/service-details.html?service=initial&lang=fr
http://localhost:8080/memory-game.html
```

## Vérifications effectuées

- structure HTML analysée;
- absence d'identifiants HTML dupliqués;
- syntaxe JavaScript vérifiée pour les deux pages NutriVie;
- fonctionnement existant de Mémoria conservé, seules les couleurs ont été remplacées.
