import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  constructor( private gifService:GifsService) { }
  //! ->not null assertion operator
  @ViewChild('txtSearch') txtSearch!:ElementRef<HTMLInputElement>;
  search(){
    const v=this.txtSearch.nativeElement.value;

    if (v.trim().length ===0 ){
      return;
    }

    this.gifService.searchGifs(v);
    this.txtSearch.nativeElement.value='';
  }

}
