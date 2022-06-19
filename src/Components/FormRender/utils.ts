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
  del(keys: string | string[]) {
    if (typeof keys === 'string') {
      return Reflect.deleteProperty(this.options, keys);
    } else {
      keys.forEach((key) => {
        Reflect.deleteProperty(this.options, key);
      });
    }
  }
}


export const splitCol = (length: number  )=>{
  return Math.floor(24 / length)
}
