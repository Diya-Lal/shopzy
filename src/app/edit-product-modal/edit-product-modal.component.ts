import {Component, effect, inject, input, model, output, signal} from "@angular/core";
import {DialogModule} from "primeng/dialog";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {Product} from "../models/product.model";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CheckboxModule} from "primeng/checkbox";

@Component({
  selector: 'edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    CheckboxModule
  ],
  //signal: true,
  styleUrls: ['./edit-product-modal.component.scss']
})
export class EditProductModalComponent {
  visible = model.required<boolean>();

  value = input.required<Product>();
  mode = input.required<'create' | 'update'>();

  save = output<Partial<Product>>();

  fb = inject(FormBuilder);
  form = this.fb.group({
    name: [''],
    description: [''],
    price: [0],
    quantity: [0],
    onSale: [false],
    salePrice: [0]
  });

  constructor() {
    effect(() => {
      this.form.patchValue({...this.value()});
    });
  }

  saveProduct() {
    this.visible.set(false);
    const changes = this.form.value as Partial<Product>; // the form has a partial product
    if (this.mode() === 'update') {
      changes.id = this.value().id;
    }
    this.save.emit(changes);
  }

  onCancel() {
    this.visible.set(false);
  }
}
