import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable, Subscription } from 'rxjs';
import { House } from 'src/app/interfaces/house.interface';
import { map } from 'rxjs/operators';
import { Character } from 'src/app/interfaces/character.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  /**
   * Maisons affichées
   */
  public houses: House[];

  /**
   * Personnages affichés
   */
  public characters: Character[];

  /**
   * Subscription qui permet de savoir si les données sont chargées ou non
   */
  private dataLoadedSubscription: Subscription;

  /**
   * Liste de toutes les saisons
   */
  public seasons = [1, 2, 3, 4, 5, 6, 7, 8];

  /**
   * Liste de toutes les saisons à prendre en compte dans le filtre
   */
  public seasonsSelected = [];

  constructor(public dataService: DataService) {

  }

  ngOnInit() {
    // On enregitre la subscription pour pouvoir la détruire plus tard
    this.dataLoadedSubscription = this.dataService.dataLoaded.subscribe(dataLoaded => {
      // Si le dataService dit que les données sont disponibles
      if (dataLoaded) {
        // Alors on affecte à nos variables locales les données du dataService
        this.characters = this.dataService.characters;
        this.houses = this.dataService.houses;
      }
    });
  }

  ngOnDestroy(): void {
    // Si la subscription existe
    if (this.dataLoadedSubscription) {
      // On la kill
      this.dataLoadedSubscription.unsubscribe();
    }
  }

  /**
   * Au clic sur une saison
   * @param season Saison cliquée
   */
  clickOnSeason(season: number) {
    // Récupération de l'index dans le tableau des saisons sélectionnées
    const index = this.seasonsSelected.indexOf(season);

    // Si non trouvé, on l'ajoute
    if (index === -1) {
      this.seasonsSelected.push(season);
      // Sinon on le retire
    } else {
      this.seasonsSelected.splice(index, 1);
    }
  }

  /**
   * Retourne les personnages d'une maison
   * @param house Maison dont on cherche les personnages
   */
  filterCharacters(house: House) {
    // Retourne tous les personnages
    return this.characters.filter(character => {
      // qui appartiennent à la maison selectionnée
      if (character.houses.includes(house.id)) {
        // Et qui apparait dans chacune des saisons sélectionnée
        let count = 0;
        this.seasonsSelected.forEach(requestedSeason => {
          if (!character.seasons.includes(requestedSeason)) {
            return false;
          } else {
            count++;
          }
        });

        return (count === this.seasonsSelected.length);
      }
      return false;
    }
    );
  }
}
