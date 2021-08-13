import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Marca } from 'src/app/core/model/marca';
import { MarcaService } from 'src/app/service/marca.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent implements OnInit {

  data: Marca[] = [];
  loading = false;
  isOkLoading = false;
  isVisible = false;
  titleModal = '';
  form: FormGroup;
  isCreate = false;

  constructor(private marcaService: MarcaService, private fb: FormBuilder, private messageService: MessageService) {
    this.form = fb.group({});
  }

  ngOnInit(): void {
    this.getAll();
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: this.fb.control(null, Validators.nullValidator),
      nombre: this.fb.control(null, Validators.required)
    })
  }

  private getAll(): void {
    this.loading = true;
    this.marcaService.getAll().subscribe(resp => {
      if (resp.success) {
        this.data = resp.data;
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    })
  }

  private create(entity: Marca): void {
    this.isOkLoading = true;
    this.marcaService.create(entity).subscribe(resp => {
      if (resp.success) {
        this.messageService.success(resp.message);
      }
      this.reset();
      this.getAll();
    }, () => {
      this.reset();
    })
  }

  private update(entity: Marca): void {
    this.isOkLoading = true;
    this.marcaService.update(entity).subscribe(resp => {
      if (resp.success) {
        this.messageService.success(resp.message);
      }
      this.reset();
      this.getAll();
    }, () => {
      this.reset();
    })
  }

  handleShowCreate(): void {
    this.isVisible = true;
    this.titleModal = 'Crear';
    this.isCreate = true;

  }

  handleShowEdit(entity: Marca): void {
    this.isVisible = true;
    this.isCreate = false;
    this.titleModal = 'Editar';
    this.form?.setValue({
      id: entity.id,
      nombre: entity.nombre      
    })
  }


  handleCancel(): void {
    this.isVisible = false;
    this.reset();
  }

  private reset(): void {
    this.isVisible = false;
    this.isOkLoading = false;
    this.form.reset();
    this.isCreate = false;
  }

  submitForm(): void {
    if (this.form?.valid) {
      const entity: Marca = this.form?.value;
      if (this.isCreate) {
        this.create(entity);
      } else {
        this.update(entity);
      }
    } else {
      this.markAndValidate();
    }
  }

  private markAndValidate(): void {
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
  }

}
