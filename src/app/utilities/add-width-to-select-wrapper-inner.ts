export default function addWidthToSelectWrapperInner(ionSelectId: string) {
  const selectElement = document.getElementById(ionSelectId);
  if (!selectElement) {
    return;
  }
  const shadowRoot = selectElement.shadowRoot;
  if (!shadowRoot) {
    return;
  }
  const selectWrapperInnerElement = shadowRoot.querySelector(
    '.select-wrapper-inner'
  );
  if (!selectWrapperInnerElement) {
    return;
  }

  selectWrapperInnerElement.setAttribute('style', 'width:100%');
}
