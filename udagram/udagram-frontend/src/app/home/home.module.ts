import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FeedModule } from '../feed/feed.module';
import { HomePage } from './homepage/home.page';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  imports: [
    FeedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HomeRoutingModule
  ],
  declarations: [HomePage],
  providers: []
})
export class HomePageModule {}
