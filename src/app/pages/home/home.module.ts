import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { HouseGalleryComponent } from '../../components/house-gallery/house-gallery.component';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }),
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage, HouseGalleryComponent]
})
export class HomePageModule { }
