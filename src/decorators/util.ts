/* eslint-disable @typescript-eslint/no-explicit-any */
export class DecoratorControler {
  private static setProperty(target: any, key: string, value: any) {
    Reflect.defineProperty(target, key, {
      enumerable: false,
      value,
      writable: false,
      configurable: true,
    });
  }
  private static getConfig(target: any, key: string, checkTarget = false): any {
    if (checkTarget && typeof target !== 'object') {
      target = target.prototype;
    }
    const config = Reflect.get(target, key);
    if (config !== undefined) {
      return config;
    }
    const superClass = Reflect.getPrototypeOf(target);
    if (!superClass || superClass.constructor.name === 'BaseEntity') {
      return undefined;
    }
    return this.getConfig(superClass, key);
  }

  static setFieldConfig(target: any, key: string, fieldConfigKey: string, fieldConfig: any) {
    this.setProperty(target, `${fieldConfigKey}[${key}]`, fieldConfig);
  }
  static getFieldConfig(target: any, key: string, fieldConfigKey: string): any {
    return this.getConfig(target, `${fieldConfigKey}[${key}]`);
  }

  static setClassConfig(target: any, classConfigKey: string, classConfig: any) {
    this.setProperty(target.prototype, classConfigKey, classConfig);
  }
  static getClassConfig(target: any, classConfigKey: string): any {
    return this.getConfig(target, classConfigKey);
  }
}
