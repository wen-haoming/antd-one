export class CreateOptions {
  public options: Record<string, any>;
  constructor() {
    this.options = {};
  }
  reset() {
    this.options = {};
    return this.options;
  }
  set(key: string, value: any) {
    this.options[key] = value;
  }
  del(key: string) {
    return Reflect.deleteProperty(this.options, key);
  }
}
