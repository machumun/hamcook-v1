export class HModal {
  constructor() {
    this.isShow = false;
  }

  SetShowStatus(isShow) {
    this.isShow = isShow;
  }
  GetShowState() {
    return this.isShow;
  }
}
