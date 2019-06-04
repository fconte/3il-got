Préambule
---
* Avoir créer deux pages: home et detail
* ```ionic g page pages/home```
* ```ionic g page pages/detail```
* Dans le fichier ```src/app/app-routing.module.ts``` supprimer la ligne faisant référence à ```./home/home.module#HomePageModule```
* Supprimer le dossier ```src/app/home```
* Définir les interfaces ```ìnterfaces/character.interface.ts``` et ```ìnterfaces/house.interface.ts```

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

- Dans le fichier src/app/app.module.ts, dans le module, spécifier qu’il doit importer HttpClientModule ( depuis @angular/common/http)  (juste après BrowserModule)

- Injecter private http: HttpClient (depuis @angular/common/http)  dans le constructeur du data.service



La listes des maisons est disponible à cette adresse: https://3il-got.s3.eu-west-3.amazonaws.com/houses.json

La listes des personnages est disponible à cette adresse : https://3il-got.s3.eu-west-3.amazonaws.com/characters.json

Dans le constructeur du data.service, écrire le code pour récupérer la liste des maisons et la liste des personnages et les affecter dans leurs variables respectives.

Aide: 

* Regarder l’exemple 1: https://www.learnrxjs.io/operators/combination/forkjoin.html, cela permet d’être sur que les deux fichiers sont récupérés
* Penser à typer le retour attendu d’une requête: this.http.get<MonObjetAttendu>(url)
* On souhaite avoir le resultat une seule fois. Penser à utiliser l'observable en tant que promesse
* Penser à émettre une nouvelle valeur pour dataLoaded


home.page.ts - Lien avec le data service
---
* Dans home.page.ts, injecter dans le constructeur le dataService précédemment créé.
* Se subscribe à dataLoaded (et penser à s’unsuscribe). Lorsque dataLoaded vaut TRUE, alors affecter aux variables locales characters et houses du service.



Deuxième partie - Visuel de la home
===


Création du composant HouseGallery
---

1. Créer le composant HouseGallery
```ionic g component app/components/houseGallery --no-specs```

2. Déclarer le tableau déclarations du module  ```home.module.ts```  le composant ```HouseGalleryComponent``` précédemment créé


3. Dans le composant ```HouseGalleryComponent```, définir un Input de type Character[]. L'Input permet de passer au composant des données (voir https://angular.io/guide/component-interaction#pass-data-from-parent-to-child-with-input-binding)
4. Dans ```house-gallery.component.html```, mettre le ul sur les characters précedemment créé dans ```home.page.html```. Remplacer ```filterCharacters(house)``` par la variable définie comme Input
5. Dans ```home.page.html```, supprimer le ul qui se trouve désormais dans ```house-gallery.component.html``` et le remplacer par le composant ```<app-house-gallery [characters]="filterCharacters(house)"></app-house-gallery>```
6. Vérifier que la liste des personnages est bien affichée pour chaque maison

Mise en place du ion-slides
---

1. Installer la dépendance ng-lazyload-image (```npm install ng-lazyload-image``)
2. Dans le module home.module.ts ajouter ```import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';```
puis dans l'import 
```
LazyLoadImageModule.forRoot({
  preset: intersectionObserverPreset
}),
```

2. Ajouter dans ```house-gallery.compontent.ts``` en dessous de l'Input 


```typescrypt
  slideOpts = {
    slidesPerView: 2.5,
    spaceBetween: 10,
    freeMode: true,
  };
```
3. Remplacer le contenu de ```house-gallery.component.html``` par 


```html
<ion-slides pager="false" [options]="slideOpts">
  <ion-slide *ngFor="let character of characters">
    <div class="picture" [defaultImage]="'https://www.cleyade.com/wp-content/uploads/2019/01/unknown_person.jpg'"
      [lazyLoad]="character.picture"></div>
  </ion-slide>
</ion-slides>
```

4. Définir la classe CSS .picture dans house-gallery.component.scss


```css
.picture {
    width: 40vw;
    height: 25vh;
    background-repeat:no-repeat;
    background-position:center center;
    background-size: cover;
}
```


Css page home
---

Mettre aux couleurs de votre choix l'application en définissant les couleurs de ion-toolbar et de ion-content (à faire dans global.scss)

https://ionicframework.com/docs/api/toolbar#css-custom-properties


Troisième partie - Page détail
=====


Création de la navigation
---
1. Dans le fichier ```detail.module.ts```, remplacer le path de la variable ```routes``` par ':id'. La page détail est désormais accéssible via l'url /detail/1
2. Dans le fichier ```house-gallery.component.html``` au niveau du ion-slide, ajouter le nécessaire pour rediriger vers la page détail de chaque personnage. (voir https://angular.io/guide/router#setting-the-route-parameters-in-the-list-view). Pour accéder au personnage ayant l'id 3, l'url doit être /detail/3.
3. Dans le fichier ```detail.page.html``` ajouter un ion-back-button (https://ionicframework.com/docs/api/back-button), permettant ainsi de revenir sur la home


Récupération du personnage
---
1. Dans le fichier ```detail.page.ts``` , déclarer une variable ```character```
2. Dans le fichier data.service, créer une fonction getCharacterById(id: number) qui retourne un character dont l'id correspondant à l'id passé.
3. La classe présente dans ```detail.page.ts``` aura besoin des services:
	- private route: ActivatedRoute,
	- private dataService: DataService
4. Dans le ngOnInit du fichier ```detail.page.ts``` récuperer l'id passé en paramètre (https://angular.io/guide/router#snapshot-the-no-observable-alternative), puis lorsque le dataService aura définit que les données sont disponibles (dataLoaded), affecter à la variable ```character``` le résultat de la fonction ```getCharacterById```
5. Dans le template ```detail.page.html```, mettre les données désirées (nom du personnage dans la toolbar, l'image et la description dans le ion-content ...). 
**Attention! dans le template, utiliser la directive ng-if pour vérifier que le character est bien chargé avant de tenter d'afficher une donnée du personnage.**
6. Styliser la page à votre convenance

