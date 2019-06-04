import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Character } from 'src/app/interfaces/character.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {

  /**
   * Personnage à afficher
   */
  public character: Character;

  /**
   * Subscription qui permet de savoir si les données sont chargées ou non
   */
  public dataLoadedSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    // On récupère l'identifiant du personnage passé dans l'url
    const characterId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    // On enregitre la subscription pour pouvoir la détruire plus tard
    this.dataLoadedSubscription = this.dataService.dataLoaded.subscribe(dataLoaded => {
      // Si le dataService dit que les données sont disponibles
      if (dataLoaded) {
        // Alors on cherche puis affecte le personnage à la variable locale
        this.character = this.dataService.getCharacterById(characterId);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.dataLoadedSubscription) {
      this.dataLoadedSubscription.unsubscribe();
    }
  }

}
