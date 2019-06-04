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

  constructor(public dataService: DataService) {

  }

  /**
   * Retourne les personnages d'une maison
   * @param house Maison dont on cherche les personnages
   */
  filterCharacters(house: House) {
    return this.characters.filter(character => character.houses.includes(house.id));
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

}
