import Icons from './icons';

export default class Loading {
  constructor(art) {
    this.art = art;
    this.init();
  }

  init() {
    const { option, refs: { $loading } } = this.art;
    if (option.loading) {
      $loading.insertAdjacentHTML('beforeend', option.loading);
    } else {
      $loading.appendChild(Icons.loading);
    }
  }

  hide() {
    this.art.refs.$loading.style.display = 'none';
  }

  show() {
    this.art.refs.$loading.style.display = 'flex';
  }
}
