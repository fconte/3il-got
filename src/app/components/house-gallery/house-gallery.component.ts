import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-house-gallery',
  templateUrl: './house-gallery.component.html',
  styleUrls: ['./house-gallery.component.scss'],
})
export class HouseGalleryComponent implements OnInit {
  @Input() characters: Character[];


  slideOpts = {
    slidesPerView: 2.5,
    spaceBetween: 10,
    freeMode: true,
  };

  constructor() { }

  ngOnInit() { }

}
