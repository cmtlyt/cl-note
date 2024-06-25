import { DatePicker } from 'antd';
import { gc } from '@cmtlyt/base';
import dayjs from 'dayjs';
import { Form as RouterForm } from 'react-router-dom';
import { forwardRef, memo } from 'react';
import { $ } from 'jotai-signal';
import { useAtomValue } from 'jotai';

import { typeAtom } from '../state';

import { OptionItem } from './OptionItem';

import { GridCircleRadioBox } from '@/components/GridCircleRadioBox';
import { FieldWrapper } from '@/components/FieldWrapper';
import { consumeList, payTypeOptions } from '@/constant/editPageData';
import { Select } from '@/components/Select';

function PayTypeSelect() {
  const type = useAtomValue(typeAtom);

  return (
    <FieldWrapper label={`${type}方式`}>
      <Select
        name="payType"
        required
        options={payTypeOptions}
        OptionComp={OptionItem}
        optionWrapperClass={gc('w-full! ml-[-1rem]')}
      >
        {OptionItem}
      </Select>
    </FieldWrapper>
  );
}

interface FormProps {}

export const Form = memo(
  forwardRef<HTMLFormElement, FormProps>(function Form(_props, formRef) {
    return (
      <RouterForm ref={formRef} method="post" un-p="x-[1rem] t-[1.5rem]">
        <input type="hidden" name="type" value={$(typeAtom)} />
        <GridCircleRadioBox name="consumeType" required radioList={consumeList} colNum={5} />
        <FieldWrapper label="日期">
          <DatePicker
            name="date"
            required
            defaultValue={dayjs()}
            className={gc('border-none w-full focus-within:shadow-none p-0')}
          />
        </FieldWrapper>
        <PayTypeSelect />
        <FieldWrapper label="金额">
          <input type="number" required name="amount" placeholder="请输入金额" un-w="full" />
        </FieldWrapper>
        <FieldWrapper label="详情">
          <input type="text" required name="title" placeholder="请输入详情" un-w="full" />
        </FieldWrapper>
      </RouterForm>
    );
  }),
);
