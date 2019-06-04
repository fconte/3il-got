import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../interfaces/character.interface';
import { Subject, forkJoin, Observable, of, BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { House } from '../interfaces/house.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /**
   * Observable contenant les personnages à afficher
   */
  public characters: Character[];

  /**
   * Observable contenant les maisons à afficher
   */
  public houses: House[];

  /**
   * Observable boolean qui retourne si les données sont chargées ou non
   */
  public dataLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * Constructeur
   * @param http Service permettant de faire des requêtes
   */
  constructor(private http: HttpClient) {
    forkJoin(
      // as of RxJS 6.5+ we can use a dictionary of sources
      {
        characters: this.http.get<Character[]>('assets/data/characters.json'),
        houses: this.http.get<House[]>('assets/data/houses.json')
      }
    ).toPromise().then(data => {
      this.characters = data.characters;
      this.houses = data.houses;
      this.dataLoaded.next(true);
    });

  }

  /**
   * Cherche et retourne un personnage 
   * @param id Identifiant du personnage
   */
  getCharacterById(id: number): Character | undefined {
    return this.characters.find(character => character.id === id);
  }
}
