Première partie - Récupération des données depuis internet et premier affichage
===

home.page.ts
---
* Créer deux variables: un tableau de maison nommé houses et un tableau de personnage nommé characters. Ces variables sont publiques.
* Alimenter ces tableaux avec de fausses données (2 maison, 3 personnages)
* Créer une méthode filterCharacters qui prend pour l’instant un seul paramètre (house de  type House). Cette méthode doit retourner les characters qui ont parmi leurs houses, la house passée en paramètre.
* Dans home.page.html, faire une boucle sur les houses puis afficher dans une balise h1 le nom de la maison
* Dans cette boucle, faire une deuxième boucle en utilisant la méthode filterCharacters afin d’avoir l’ensemble des characters de la maison courante. Afficher les noms dans un ul/li


data.service.ts
---

Créer le service avec la commande
```ionic g service services/data —nospec```

- Définir les propriétés suivantes:
	- characters (public) qui est un tableau de Character
	- houses (public) qui est un tableau de House
	- dataLoaded qui est un BehaviorSubject de type boolean (https://www.learnrxjs.io/subjects/behaviorsubject.html)

Dans le fichier src/app/app.module.ts, dans le module, spécifier qu’il doit importer HttpClientModule ( depuis @angular/common/http)  (juste après BrowserModule)
Injecter private http: HttpClient (depuis @angular/common/http)  dans le constructeur



La listes des maisons est disponible à cette adresse: https://3il-got.s3.eu-west-3.amazonaws.com/houses.json

La listes des personnages est disponible à cette adresse : https://3il-got.s3.eu-west-3.amazonaws.com/characters.json

Dans le constructeur, écrire le code pour récupérer la liste des maisons et la liste des personnages et les affecter dans leurs variables respectives.

Aide: 

* Regarder l’exemple 1: https://www.learnrxjs.io/operators/combination/forkjoin.html, cela permet d’être sur que les deux fichiers sont récupérés
* Penser à typer le retour attendu d’une requête: this.http.get<MonObjetAttendu>(url)
* Penser à émettre une nouvelle valeur pour dataLoaded


home.page.ts - Lien avec le data service
====
* Dans home.page.ts, injecter dans le constructeur le dataService précédemment créé.
* Se subscribe à dataLoaded (et penser à s’unsuscribe). Lorsque dataLoaded vaut TRUE, alors affecter aux variables locales characters et houses du service.