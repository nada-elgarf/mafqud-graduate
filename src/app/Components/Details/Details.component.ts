import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { MafqudService } from 'src/app/Mafqud.service';
import { foundChildren } from 'src/app/Models/foundChildren';

@Component({
  selector: 'app-Details',
  templateUrl: './Details.component.html',
  styleUrls: ['./Details.component.css']
})
export class DetailsComponent implements OnInit {
  child: foundChildren | undefined;
  userName: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private foundService: MafqudService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getChildFoundById();
    this.userName = this.authService.getLoggedInUserName();
  }

  getChildFoundById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.foundService.getChildFoundById(id).subscribe(
      (data: foundChildren) => {
        this.child = data;
        console.log('Child details:', this.child);
      },
      error => {
        console.error('Error retrieving child details:', error);
      }
    );
  }

  deleteFoundChild(id: number): void {
    this.foundService.deleteFoundChildById(id).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error deleting child:', error);
      }
    );
  }
}
