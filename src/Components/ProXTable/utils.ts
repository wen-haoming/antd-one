// import type { Moment } from 'moment';
// import moment, { isMoment } from 'moment';
type Moment = any;
const moment = (str: any) => str;

/**
 *   'true'  -> true
 *   'false' -> false
 *   '123'   ->  123
 *
 */
export const setOriginalValFn = (val: string | boolean): any => {
  if (val === 'true' || val === true) {
    return true;
  } else if (val === 'false' || val === false) {
    return false;
  } else if (/^[^0]+$/.test(val) && !isNaN(Number(val))) {
    // 非 0 开头的一切数字字符串都转为数字
    return Number(val);
  } else if (typeof val === 'string') {
    return val.trim();
  }
  return val;
};

export interface TransformValsOptions {
  setOriginalVals?: boolean; // 转换原始值
  transformRangeDate?: [string, string] | false; //转换日期 从 time : [moment,moment] => {timeStart:xxx,timeEnd:xxx}
  rangeDateFormat?: [
    (txt: string | Moment, key: string) => Moment | string,
    (txt: string | Moment, key: string) => Moment | string,
  ];
  transformLabelInValue?: //
  {
    valueKey?: string;
    labelKey?: string;
  };
}

export const transformVals = (
  formDataObj: Record<string, any>,
  transformValsOptions: TransformValsOptions = {},
) => {
  const {
    setOriginalVals = true,
    transformRangeDate = ['Start', 'End'],
    rangeDateFormat = [
      (start) => moment(start).format('YYYY-MM-DD 00:00:00'),
      (end) => moment(end).format('YYYY-MM-DD 23:59:59'),
    ],
    transformLabelInValue = {},
  } = transformValsOptions;

  return Object.entries(formDataObj).reduce((resultObj, [key, val]) => {
    if (val === '') {
      return resultObj;
    }

    //1. 格式化日期
    if (Array.isArray(val) && isMoment(val[0]) && Array.isArray(transformRangeDate)) {
      const [start, end] = val as [Moment, Moment];
      const [startFn, endFn] = rangeDateFormat;
      resultObj[`${key}${transformRangeDate[0]}`] = startFn(start, key);
      resultObj[`${key}${transformRangeDate[1]}`] = endFn(end, key);
    }
    // 2. 如果选择组件设置了 labelInVale 的话，需要单独处理 {label：xxx,value:xxx} 的形式
    else if (
      typeof val === 'object' &&
      val?.label &&
      typeof val.value !== 'undefined' &&
      transformLabelInValue
    ) {
      // 2.1
      if (transformLabelInValue.valueKey) {
        resultObj[transformLabelInValue.valueKey] = val.value;
      } else {
        resultObj[key] = val.value;
      }
      // 2.2
      if (transformLabelInValue.labelKey) {
        resultObj[transformLabelInValue.labelKey] = val.label;
      }
    }
    // 3. 设置原始值
    else if (setOriginalVals && typeof val !== 'object') {
      resultObj[key] = setOriginalValFn(val);
    }
    // 4. 过滤无效值
    else if (val !== '' || val !== undefined) {
      resultObj[key] = val;
    }

    return resultObj;
  }, {} as Record<string, any>);
};

// export const
