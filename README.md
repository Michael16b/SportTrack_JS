
# Présentation du site web : SportTrack_JS

## 1. Fonctionnalités de l’application

### **PARTIE 1 : HTML**


### 1.1. Gestion des comptes utilisateurs
L’application devra permettre de créer, de modifier et de supprimer un compte utilisateur. Lors de la création de leur compte, les utilisateurs devront renseigner les informations suivantes:

- nom,
- prénom,
- date de naissance,
- sexe,
- taille,
- poids,
- adresse électronique,
- mot de passe.
- Les utilisateurs seront identifiés par leur adresse électronique. 

L’application devra donc garantir que deux comptes ne peuvent pas être créés avec la même adresse électronique. Toutes les informations devront pouvoir être modifiées.



### **PARTIE 2 : mySQL**

### 1.2 Connexion des utilisateurs

Pour accéder à leurs données d’activité sportive et gérer ces données, les utilisateurs devront pouvoir se connecter à l’application en utilisant leur adresse électronique et leur mot de passe.

### INFO. SUP : Installation

[DB Browser](https://sqlitebrowser.org/dl/)
[SQLite](https://www.sqlite.org/download.html)

**Sur Windows**

1) Installez SQLite directement sur C:
2) Tapez sur votre barre de recherche "Système d'environnement" puis ajoutez le path de SQLite
3) Exemple path = "C:\sqlite"
4) Appliquez désormais le code suivant sur votre dossier sql de source

```bat
sqlite3 sport_track.db
.read create_db.sql
.dum
```


### **PARTIE 3 : JavaScript**
### 1.3. Gestion des fichiers de données
Après s’être connectés à l’application, les utilisateurs devront pouvoir déposer et supprimer des fichiers d’activité sportive, et avoir accès à la liste de ces fichiers.

Les fichiers seront des fichiers au format JSON. Leur structure sera la suivante:

```json
{
  "activity":{
    "date":"01/09/2022",
    "description": "IUT -> RU"
  },
  "data":[
    {"time":"13:00:00","cardio_frequency":99,"latitude":47.644795,"longitude":-2.776605,"altitude":18},
    {"time":"13:00:05","cardio_frequency":100,"latitude":47.646870,"longitude":-2.778911,"altitude":18},
    {"time":"13:00:10","cardio_frequency":102,"latitude":47.646197,"longitude":-2.780220,"altitude":18},
    {"time":"13:00:15","cardio_frequency":100,"latitude":47.646992,"longitude":-2.781068,"altitude":17},
    {"time":"13:00:20","cardio_frequency":98,"latitude":47.647867,"longitude":-2.781744,"altitude":16},
    {"time":"13:00:25","cardio_frequency":103,"latitude":47.648510,"longitude":-2.780145,"altitude":16}
  ]
}
```

### 1.4. Installation JavaScript + Express + NodeJS
  1. Installez [VSCode](https://code.visualstudio.com/)
  2. Installez les extensions : [Node JS](https://nodejs.org/),
  [Express](http://expressjs.com/)
  [Module SQLite3 for NodeJS](https://www.npmjs.com/search?q=sqlite3)


### 1.5. Lancer le fichier de test (dans le dossier racine du projet)

   1. Placez-vous dans express_webapp
   2. Copiez la ligne de commande ci-dessous :
      ```bat
      node .\sport-track-db\sport-track-db-test.js
      ```
   3. Pour lancer le site web sur votre machine, copiez la ligne de commande ci-dessous :
      ```bat
      npm start
      ```
   4. Il se pourrait que vous ayez des erreurs, notamment au niveau des modules,
      N'hésitez pas à les installer. 