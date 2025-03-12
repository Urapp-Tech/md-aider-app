export function addCustomStylesToIonPickerInternal(ionDatetimeId: string) {
  const ionDatetimeElement = document.getElementById(ionDatetimeId);
  if (!ionDatetimeElement) {
    return;
  }
  const ionDatetimeShadowRoot = ionDatetimeElement.shadowRoot;
  if (!ionDatetimeShadowRoot) {
    return;
  }

  const datetimeHeader =
    ionDatetimeShadowRoot.querySelector('.datetime-header');
  if (datetimeHeader) {
    datetimeHeader.prepend(
      Object.assign(document.createElement('style'), {
        innerText: `
        .datetime-header {
          background-color: rgb(var(--color-app-primary)) !important;
        }
      `,
      })
    );
  }

  const ionPicker = ionDatetimeShadowRoot.querySelector('ion-picker');
  if (!ionPicker) {
    return;
  }

  const ionPickerColumnOptions = ionPicker.querySelectorAll(
    'ion-picker-column-option'
  );
  ionPickerColumnOptions.forEach((ionPickerColumnOption) => {
    ionPickerColumnOption?.prepend(
      Object.assign(document.createElement('style'), {
        innerText: `
        ion-picker-column-option {
          font-family: Anek Gurmukhi, serif !important;
          color: rgb(var(--color-app-black)) !important;
          font-weight: 600 !important;
        }

        ion-picker-column-option.option-active {
          color: rgb(var(--color-app-primary)) !important;
          font-weight: 700 !important;
        }
      `,
      })
    );
  });
}
