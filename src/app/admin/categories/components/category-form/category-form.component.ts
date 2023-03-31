import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

//import { CategoriesService } from '../../../../core/services/categories.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { MyValidators } from 'src/app/utils/validators';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  image$: Observable<string>;
  isNew: boolean = true;

  @Input()
  set category(data: Category) {
    if (data) {
      this.isNew = false;
      this.form.patchValue(data);
    }
  }
  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();
  //categoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    // private categoriesService: CategoriesService,
    // private router: Router,
    private storage: AngularFireStorage // private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   this.categoryId = params.id;
    //   if (this.categoryId) {
    //     this.getCategory();
    //   }
    // });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(4)],
        // MyValidators.validateCategory(this.categoriesService),
      ],
      image: ['', Validators.required],
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }

  save() {
    if (this.form.valid) {
      if (this.isNew) {
        //this.updateCategory();
        this.create.emit(this.form.value);
      } else {
        //this.createCategory();
        this.update.emit(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  // private createCategory() {
  //   const data = this.form.value;
  //   this.categoriesService.createCategory(data).subscribe((rta) => {
  //     this.router.navigate(['./admin/categories']);
  //   });
  // }

  // private updateCategory() {
  //   const data = this.form.value;
  //   this.categoriesService
  //     .updateCategory(this.categoryId, data)
  //     .subscribe((rta) => {
  //       this.router.navigate(['./admin/categories']);
  //     });
  // }

  // private getCategory() {
  //   this.categoriesService.getCategory(this.categoryId).subscribe((data) => {
  //     this.form.patchValue(data);
  //   });
  // }

  fileUpload(event) {
    const image = event.target.files[0];
    const name = 'category.png';
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const urlImage$ = ref.getDownloadURL();
          urlImage$.subscribe((url) => {
            console.log(url);
            this.imageField.setValue(url);
          });
        })
      )
      .subscribe();
  }
}
