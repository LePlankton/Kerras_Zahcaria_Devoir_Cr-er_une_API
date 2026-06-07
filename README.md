# Port de Plaisance Russell - API

Application de gestion des catways et réservations du port de plaisance Russell.

## Lien de l'application

https://kerras-zahcaria-devoir-cr-er-une-api.onrender.com

> **Note :** L'application est hébergée sur Render en plan gratuit. Le serveur se met en veille après 15 minutes d'inactivité. Le premier chargement après une période d'inactivité peut prendre 30 à 50 secondes.

## Fonctionnalités

- Authentification par token JWT
- Gestion des catways (CRUD)
- Gestion des réservations (CRUD)
- Gestion des utilisateurs (CRUD)
- Interface web complète
- API REST documentée

## Technologies utilisées

- Node.js / Express.js
- MongoDB Atlas / Mongoose
- JSON Web Token (JWT)
- bcrypt
- EJS (templates)
- express-session

## Installation en local

```bash
git clone https://github.com/LePlankton/Kerras_Zahcaria_Devoir_Cr-er_une_API
cd Kerras_Zahcaria_Devoir_Cr-er_une_API
npm install
```

Créer un fichier `.env` à la racine :

```
MONGO_URI=votre_uri_mongodb
JWT_SECRET=votre_secret
PORT=3000
```

Lancer le serveur :

```bash
npm start
```

## Routes API

| Méthode | Route | Description |
|---|---|---|
| POST | /auth/login | Connexion |
| GET | /catways | Liste des catways |
| GET | /catways/:id | Détail d'un catway |
| POST | /catways | Créer un catway |
| PUT | /catways/:id | Modifier un catway |
| DELETE | /catways/:id | Supprimer un catway |
| GET | /catways/:id/reservations | Réservations d'un catway |
| POST | /catways/:id/reservations | Créer une réservation |
| GET | /users | Liste des utilisateurs |
| POST | /users | Créer un utilisateur |
| PUT | /users/:email | Modifier un utilisateur |
| DELETE | /users/:email | Supprimer un utilisateur |

## Compte de test

Pour tester l'application, créer un utilisateur via `POST /users` ou utiliser l'interface web.
