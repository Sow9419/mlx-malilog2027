1. Dans cPanel (à faire manuellement, une seule fois)
A. Activer / vérifier l'accès SSH

Connecte-toi à ton cPanel de malilogexpo.com
Section Sécurité → Accès SSH
L'accès doit être activé (le shell peut rester désactivé, c'est justement notre cas de figure qui fonctionne)
B. Importer la clé publique SSH (voir partie 2 pour générer la clé)

Toujours dans Accès SSH → Gérer les clés
Clique Importer une clé
Colle le contenu du fichier deploy_key.pub (la clé PUBLIQUE)
Clique Importer
Une fois importée, clique Autoriser sur la ligne de la clé
✅ À noter : ton utilisateur cPanel et le chemin public_html sont la cible du déploiement. Vérifie que /home/<ton_user>/public_html/ existe (c'est la racine du site).

2. Sur GitHub (à faire manuellement, une seule fois)
A. Générer la clé SSH (sur ton ordinateur)

ssh-keygen -t rsa -b 4096 -m PEM -C "github-deploy" -f deploy_key
Appuie sur Entrée quand il demande une passphrase (2 fois) — pas de passphrase
Tu obtiens 2 fichiers : deploy_key (privé) et deploy_key.pub (public)
B. Créer les 3 secrets du dépôt

Va sur le dépôt GitHub de malilogexpo
Settings → Secrets and variables → Actions → New repository secret
Crée ces 3 secrets :
Nom du secret	Valeur à coller
SSH_KEY	Le contenu entier du fichier deploy_key (privé)
SSH_HOST	L'hôte cPanel (ex : nc-ph-0399-14.pactafrique.com ou IP)
SSH_USER	Ton utilisateur cPanel
⚠️ Ne jamais mettre deploy_key (privé) dans un fichier du dépôt — uniquement dans les secrets GitHub.

3. Le code à ajouter (fichier dans ton projet)
Crée le fichier .github/workflows/deploy.yml à la racine de ton projet malilogexpo :

name: Déploiement malilogexpo.com

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: SCP fichiers racine
        env:
          KEY: ${{ secrets.SSH_KEY }}
          HOST: ${{ secrets.SSH_HOST }}
          USER: ${{ secrets.SSH_USER }}
        run: |
          mkdir -p ~/.ssh
          echo "$KEY" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          scp -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no \
            index.html \
            "$USER@$HOST:/home/TON_USER/public_html/"

      - name: SCP dossier assets
        env:
          KEY: ${{ secrets.SSH_KEY }}
          HOST: ${{ secrets.SSH_HOST }}
          USER: ${{ secrets.SSH_USER }}
        run: |
          scp -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no -r \
            assets \
            "$USER@$HOST:/home/TON_USER/public_html/"
⚠️ Remplace TON_USER par ton vrai utilisateur cPanel. Si ton projet a d'autres fichiers à la racine (ex : css/, js/ séparés), ajoute un scp -r par dossier.

Points clés pour que ça marche
chmod 600 est obligatoire sur la clé, sinon SSH la refuse
-o StrictHostKeyChecking=no évite le blocage du fingerprint en CI
Le chemin cible est toujours /home/<user>/public_html/
scp fonctionne même quand le shell est désactivé — c'est le principe de cette approche
Vérification finale
git add .
git commit -m "déploiement automatique"
git push origin main