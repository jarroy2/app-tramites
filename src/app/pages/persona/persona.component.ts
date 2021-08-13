import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/core/model/persona';
import { TipoIdentificacion } from 'src/app/core/model/tipo-identificacion';
import { MessageService } from 'src/app/service/message.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TipoIdentificacionService } from 'src/app/service/tipo-identificacion.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {

  data: Persona[] = [];
  loading = false;
  isOkLoading = false;
  isVisible = false;
  titleModal = '';
  form: FormGroup;
  isCreate = false;
  tipoIdenficacion: TipoIdentificacion[] = [];

  constructor(private personaService: PersonaService,
    private tipoIdeService: TipoIdentificacionService,
    private fb: FormBuilder, private messageService: MessageService) {
    this.form = fb.group({});
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllTipoIdentificacion();
    this.initForm();
  }

  compareFn = (o1: TipoIdentificacion, o2: TipoIdentificacion) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

  private initForm(): void {
    this.form = this.fb.group({
      id: this.fb.control(null, Validators.nullValidator),
      tipoIdentificacion: this.fb.control(null, Validators.required),
      numeroIdentificacion: this.fb.control(null, Validators.required),
      nombres: this.fb.control(null, Validators.required),
      apellidos: this.fb.control(null, Validators.required),
      telefono: this.fb.control(null, Validators.required),
      email: this.fb.control(null, Validators.required),
      direccion: this.fb.control(null, Validators.nullValidator),
    })
  }

  private getAll(): void {
    this.loading = true;
    this.personaService.getAll().subscribe(resp => {
      if (resp.success) {
        this.data = resp.data;
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    })
  }

  private getAllTipoIdentificacion(): void {
    this.loading = true;
    this.tipoIdeService.getAll().subscribe(resp => {
      if (resp.success) {
        this.tipoIdenficacion = resp.data;
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    })
  }

  private create(entity: Persona): void {
    this.isOkLoading = true;
    this.personaService.create(entity).subscribe(resp => {
      if (resp.success) {
        this.messageService.success(resp.message);
      }
      this.reset();
      this.getAll();
    }, () => {
      this.reset();
    })
  }

  private update(entity: Persona): void {
    this.isOkLoading = true;
    this.personaService.update(entity).subscribe(resp => {
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

  handleShowEdit(entity: Persona): void {
    this.isVisible = true;
    this.isCreate = false;
    this.titleModal = 'Editar';
    this.form?.setValue({
      id: entity.id,
      tipoIdentificacion: entity.tipoIdentificacion,
      numeroIdentificacion: entity.numeroIdentificacion,
      nombres: entity.nombres,
      apellidos: entity.apellidos,
      telefono: entity.telefono,
      email: entity.email,
      direccion: entity.direccion
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
      const entity: Persona = this.form?.value;
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
