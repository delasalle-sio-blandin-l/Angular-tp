import { GameFilter } from './../game-list-filter/game-list-filter.component';
import { Component, OnInit } from '@angular/core';
import { GameApiService } from '../game-api.service';


import { Game } from './game';
import { GameActions } from './game-actions';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  defaultSize = 300;
  width = this.defaultSize;

  entities;

  filteredEntities = this.entities;
  totalRecords: Number;
  page: Number=1;
  private filterForm: GameFilter; 
  constructor(private gameapiService: GameApiService) { }


  ngOnInit() {
    this.gameapiService.getGames().subscribe((data) => {
      this.entities = data;
      console.log(`Entities : ${JSON.stringify(this.entities)}`);
      this.totalRecords = this.entities.length;
      console.log(`TotalRecords : ${this.totalRecords}`);
      this.filter();
    });
  }

  truncate(value: string) {
    const words = value.split(' ', 20);

    return words.join(' ') + (words.length > 20 ? + '...' : '');
  }

  sizeUp() {
    this.width += 10;
  }

  sizeDown() {
    this.width = Math.max(100, this.width - 10);
  }

  sizeReset() {
    this.width = this.defaultSize;
  }

  onActionClick(action: GameActions, game: Game) {
    alert(`${['follow', 'share', 'buy'][action]} the game nammed ${game.name}`);
  }

  delete(id) {
    console.log(id);
    this.gameapiService.deleteGame(id).subscribe();
  }

  onFilter(filterForm: GameFilter) {
    this.filterForm = filterForm;
    this.filter();
  }

  private filter() {
    if (this.entities && this.filterForm)
      this.filteredEntities = this.entities

          .filter(e => (!this.filterForm.name || e.title.toLowerCase().includes(this.filterForm.name))
          
              && (!this.filterForm.category || e.genres.find(genre => genre.name === this.filterForm.category))
          );
            //&& (!this.filterForm.editor || e.editor.toLowerCase().includes(this.filterForm.editor)));
    else
    this.filteredEntities = this.entities;
  }

}