import { resolveForwardRef } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Photo } from '../../interfaces/photo';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {

  id: string;
  photo: Photo;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private ps: PhotoService
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      this.ps.getPhoto(this.id)
        .subscribe(
          res => {
            console.log(res),
            this.photo = res
          },

          err => console.log(err)

        )

    })
  }

  deletePhoto(id: string) {
    this.ps.deletePhoto(id)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/photos']);
        });
  }

  updatePhoto(title: HTMLInputElement, description: HTMLInputElement): boolean {
    this.ps.updatePhoto( this.photo._id, title.value, description.value)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/photos']);
      });
    return false;
  }


}
