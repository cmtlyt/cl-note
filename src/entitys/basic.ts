import { getAlias, getDefault, getFieldPrefix, getIsArray, getNoPrefix, getType } from '@/decorators/field';
import { getValueByKey } from '@/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IJson<V = any> {
  [key: string]: V;
}

export class BaseEntity {
  static fromJson(json: string) {
    return this.parse(new this() as BaseEntity, JSON.parse(json));
  }
  static fromObject(object: IJson) {
    return this.parse(new this() as BaseEntity, object);
  }
  static parse<T extends BaseEntity>(instance: T, json: IJson) {
    const fieldKeyList = Object.keys(instance);
    for (const fieldKey of fieldKeyList) {
      // 获取默认值
      const defaultValue = getDefault(instance, fieldKey);
      // 获取字段类型
      const FieldTypeClass = getType(instance, fieldKey);
      // 获取字段别名
      const fieldAliasName = getAlias(instance, fieldKey);

      // 获取json中的字段数据
      let fieldData = (() => {
        return getValueByKey(
          json,
          fieldAliasName || fieldKey,
          !getNoPrefix(instance, fieldKey) ? getFieldPrefix(instance) : '',
        );
      })();
      if (fieldData === undefined) {
        fieldData = defaultValue;
      }
      (instance as IJson)[fieldKey] = fieldData;

      if (getIsArray(instance, fieldKey)) {
        // 是数组 循环转换
        const fieldValueList: IJson[] = [];
        if (typeof fieldData === 'object' && Array.isArray(fieldData)) {
          for (let i = 0; i < fieldData.length; i += 1) {
            // 如果标记了类 需要递归处理
            if (FieldTypeClass) {
              fieldValueList[i] = this.parse(new FieldTypeClass() as BaseEntity, fieldData[i]);
            }
          }
        }
        (instance as IJson)[fieldKey] = fieldValueList;
        continue;
      }
      if (defaultValue !== undefined && (fieldData === undefined || fieldData === null || fieldData === '')) {
        // 如果有默认值 则先给上默认值
        (instance as IJson)[fieldKey] = defaultValue;
      }
      if (!FieldTypeClass || fieldData === undefined || fieldData === null) {
        // 属性值为非 ```undefined``` 和 ```null``` 时不转换
        continue;
      }

      switch (FieldTypeClass.name) {
        case 'String':
          (instance as IJson)[fieldKey] = fieldData.toString();
          break;
        case 'Number':
          // 强制转换为Number, 但如果不是标准的Number, 则忽略掉值
          (instance as IJson)[fieldKey] = Number.isNaN(parseFloat(fieldData)) ? undefined : parseFloat(fieldData);
          break;
        case 'Boolean':
          // 强制转换为布尔型
          (instance as IJson)[fieldKey] = !!fieldData;
          break;
        default:
          // 是对象 需要递归转换
          (instance as IJson)[fieldKey] = this.parse(new FieldTypeClass() as BaseEntity, fieldData);
      }
    }
    // 最后删除无用的数据
    for (const fieldKey of fieldKeyList) {
      const fieldAliasName = getAlias(instance, fieldKey);

      if (fieldAliasName && fieldAliasName !== fieldKey) {
        delete (instance as IJson)[fieldAliasName];
      }
    }
    return instance;
  }

  toObject() {
    const fieldKeyList = Object.keys(this);
    const json: IJson = {};
    for (const fieldKey of fieldKeyList) {
      const fieldValue = (this as IJson)[fieldKey];
      json[fieldKey] = fieldValue;
    }
    return json;
  }

  toJson() {
    return this.toString();
  }

  toString() {
    return JSON.stringify(this.toObject());
  }
}
