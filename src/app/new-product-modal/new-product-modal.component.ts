import {Component, effect, inject, input, model, output, signal} from "@angular/core";
import {DialogModule} from "primeng/dialog";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {Product} from "../models/product.model";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'edit-product-modal',
  templateUrl: './new-product-modal.component.html',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule
  ],
  //signal: true,
  styleUrls: ['./new-product-modal.component.scss']
})
export class NewProductModalComponent {
  visible = model.required<boolean>();
  value = input.required<Product>();
  save = output<Product>();

  fb = inject(FormBuilder);
  form = this.fb.group({
    name: [''],
    description: [''],
  });

  constructor() {
    effect(() => { // effect is triggered everytime when the value of a dependent signal changes
      const product = this.value();
      this.form.patchValue({
        name: product.name,
        description: product.description,
      });
    });
  }

  saveProduct() {
    this.visible.set(false);
    const changes = this.form.value as Partial<Product>; // the form only returns a partial type, (because it is only name & description)
    this.save.emit({...this.value(), ...changes});
  }

  onCancel() {
    this.visible.set(false);
    this.form.reset();
  }
}
