import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavigationService } from './navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ProCom';

  // constructor(private router: Router, private navigationService: NavigationService) {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationStart) {
  //       if (!this.navigationService.isValidNavigation()) {
  //         this.router.navigateByUrl('/user'); // Redirect to a valid page
  //       }
  //     }
  //   });
  // }

  ngOnInit(): void {
    initFlowbite();
  }
}
