import { Component } from '@angular/core';
//  import { SlugifyPipe } from './pipes/slugify.pipe';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //  providers: [ SlugifyPipe ]
})
export class AppComponent {
  //  constructor(private slugifyPipe: SlugifyPipe) {}
  title = 'mean-cms-ng';
}
