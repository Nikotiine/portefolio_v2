import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  constructor(public readonly adminService: AdminService) {}
  ngOnInit(): void {
    this.adminService.adminControllerFindAllComments().subscribe({
      next: (comments) => {
        console.log(comments);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
