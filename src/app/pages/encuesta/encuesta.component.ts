import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/core/model/encuesta';
import { Marca } from 'src/app/core/model/marca';
import { EncuestaService } from 'src/app/service/encuesta.service';
import { MarcaService } from 'src/app/service/marca.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {


  loading = false;
  isOkLoading = false;
  isVisible = false;
  titleModal = '';
  form: FormGroup;
  isCreate = false;
  marcas: Marca[] = [];

  constructor(private marcaService: MarcaService,
    private encuestaService: EncuestaService,
    private fb: FormBuilder, private messageService: MessageService) {
    this.form = fb.group({});
  }

  ngOnInit(): void {
    this.getAllMarca();
    this.initForm();
  }

  compareFn = (o1: Marca, o2: Marca) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

  private initForm(): void {
    this.form = this.fb.group({
      id: this.fb.control(null, Validators.nullValidator),
      marca: this.fb.control(null, Validators.required),
      nombres: this.fb.control(null, Validators.required),
      apellidos: this.fb.control(null, Validators.required),
      email: this.fb.control(null, [Validators.required, Validators.email])
    })
  }

  private getAllMarca(): void {
    this.loading = true;
    this.marcaService.getAll().subscribe(resp => {
      if (resp.success) {
        this.marcas = resp.data;
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    })
  }

  private create(entity: Encuesta): void {
    this.isOkLoading = true;
    this.encuestaService.create(entity).subscribe(resp => {
      if (resp.success) {
        this.messageService.success(resp.message);
      }
      this.reset();
      //this.getAll();
    }, () => {
      this.reset();
    })
  }

  /*private update(entity: Encuesta): void {
    this.isOkLoading = true;
    this.encuestaService.update(entity).subscribe(resp => {
      if (resp.success) {
        this.messageService.success(resp.message);
      }
      this.reset();
      //this.getAll();
    }, () => {
      this.reset();
    })
  }*/

  handleShowCreate(): void {
    this.isVisible = true;
    this.titleModal = 'Crear';
    this.isCreate = true;

  }

  handleShowEdit(entity: Encuesta): void {
    this.isVisible = true;
    this.isCreate = false;
    this.titleModal = 'Editar';

  }


  handleCancel(): void {
    this.isVisible = false;
    this.reset();
  }

  public reset(): void {
    this.isVisible = false;
    this.isOkLoading = false;
    this.form.reset();
    this.isCreate = false;
  }

  submitForm(): void {
    if (this.form?.valid) {
      const entity: Encuesta = this.form?.value;
      //if (this.isCreate) {
        this.create(entity);
      //} else {
        //this.update(entity);
      //}
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