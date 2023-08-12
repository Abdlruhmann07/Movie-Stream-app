import { Component } from '@angular/core';
// Decorator (meta data)
@Component({
  selector: 'app-root', // component directive
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'House shop';
}
