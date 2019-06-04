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

  public houses: House[];
  public characters: Character[];

  // Liste de toutes les saisons
  public seasons = [1, 2, 3, 4, 5, 6, 7, 8];
  public seasonsSelected = [];

  private dataLoadedSubscription: Subscription;

  constructor(public dataService: DataService) {

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

  ngOnInit() {
    this.dataLoadedSubscription = this.dataService.dataLoaded.subscribe(dataLoaded => {
      if (dataLoaded) {
        this.characters = this.dataService.characters;
        this.houses = this.dataService.houses;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.dataLoadedSubscription) {
      this.dataLoadedSubscription.unsubscribe();
    }
  }



}
