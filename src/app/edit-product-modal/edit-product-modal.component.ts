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
  // model input to control the visibility of the dialog
  // you can read and write to this signal
  // two-way binding
  visible = model.required<boolean>();

  // value input signal to hold the current product
  // you can only read from this signal
  value = input.required<Product>();
  mode = input.required<'create' | 'update'>();

  // output signal to emit the changes to the product
  // partial product because we only want to update the changed fields
  save = output<Partial<Product>>();

  // inject the form builder to create the form
  // injection is done lazily
  fb = inject(FormBuilder);

  // form object to hold the product data
  // the form is initialized with the default values
  // the form is updated with the current product when the value signal changes
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
      // runs whenever any of the signals used inside change the value -> will run when this.value() changes
      // update the form with the provided (in this case current) product
      // all properties of this.value() signal are copied to the form
      this.form.patchValue({...this.value()});

      console.log(`EditProductModalComponent: `, this.value());
    });
  }

  // save the product
  public saveProduct() {
    this.visible.set(false);
    const changes = this.form.value as Partial<Product>; // the form has a partial product
    if (this.mode() === 'update') {
      changes.id = this.value().id;
    }
    this.save.emit(changes);
  }

  public onCancel() {
    this.visible.set(false);
  }
}
