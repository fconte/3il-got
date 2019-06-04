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

  public character: Character;

  public dataLoadedSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataLoadedSubscription = this.dataService.dataLoaded.subscribe(dataLoaded => {
      if (dataLoaded) {
        this.character = this.dataService.getCharacterById(parseInt(this.route.snapshot.paramMap.get('id'), 10));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.dataLoadedSubscription) {
      this.dataLoadedSubscription.unsubscribe();
    }
  }

}
