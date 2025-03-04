import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonPopover } from '@ionic/angular/standalone';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule],
})
export class CustomSelectComponent {
  @Input() disabled = false;

  @Input({ required: true }) name = '';

  @Input({ required: true }) items: Array<Record<string, any>> = [];

  @Input({ required: true }) displayProperty: string = '';

  @Input({ required: true }) compareProperty: string = '';

  @Input() selectedItem: Record<string, any> | null = null;

  @Output() selectedItemChanged = new EventEmitter();

  search = '';
  index: any;

  get selectedDisplayText() {
    if (!this.selectedItem) {
      return `Select ${this.name}`;
    }
    const text = this.selectedItem[this.displayProperty];
    if (!text) {
      throw new Error(
        `object does not have property named ${this.displayProperty}`
      );
    }
    return text;
  }

  getFilteredItems() {
    if (!this.search) {
      return this.items;
    }
    return this.items.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(this.search.toLowerCase())
    );
  }

  isSameItem(item: Record<string, any>) {
    if (!this.selectedItem) {
      return false;
    }
    const selectedUniqueProperty = this.selectedItem[this.compareProperty];
    const newUniqueProperty = item[this.compareProperty];

    return selectedUniqueProperty === newUniqueProperty;
  }

  getDisplayText(item: Record<string, any>) {
    const text = item[this.displayProperty];
    if (!text) {
      throw new Error(
        `object does not have property named ${this.displayProperty}`
      );
    }
    return text;
  }

  async selectItem(item: Record<string, any>, ionPopoverRef: IonPopover) {
    this.search = '';
    await ionPopoverRef.dismiss();
    if (!this.selectedItem) {
      this.selectedItemChanged.emit(item);
      return;
    }
    const selectedUniqueProperty = this.selectedItem[this.compareProperty];
    const newUniqueProperty = item[this.compareProperty];

    if (!selectedUniqueProperty) {
      throw new Error(
        `object does not have property named ${this.compareProperty}`
      );
    }
    if (!newUniqueProperty) {
      throw new Error(
        `object does not have property named ${this.compareProperty}`
      );
    }
    if (selectedUniqueProperty !== newUniqueProperty) {
      this.selectedItemChanged.emit(item);
    }
  }
}
