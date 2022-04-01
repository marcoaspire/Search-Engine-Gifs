import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  //styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    
    get historyElements():string[]{
      return this.gifService.history2;
    }
    //inject service so now, the service is visible in this component
    constructor(private gifService: GifsService){}

    search(arg:string){
      console.log(arg);
      
      this.gifService.searchGifs(arg);
    }
}
