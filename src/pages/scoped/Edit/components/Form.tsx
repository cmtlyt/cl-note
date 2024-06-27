import { DatePicker } from 'antd';
import { gc } from '@cmtlyt/base';
import dayjs from 'dayjs';
import { forwardRef, memo, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { Form as RouterForm } from 'react-router-dom';
import { $ } from 'jotai-signal';

import { accountTypeListAtom, consumeTypeListAtom, typeAtom } from '../state';
import { typeOptions } from '../constant';

import { OptionItem } from './OptionItem';

import { GridCircleRadioBox } from '@/components/GridCircleRadioBox';
import { FieldWrapper } from '@/components/FieldWrapper';
import { Select } from '@/components/Select';

function AccountTypeSelect() {
  const type = useAtomValue(typeAtom);
  const accountTypes = useAtomValue(accountTypeListAtom);

  const label = typeOptions.find((item) => item.value === type)?.label || '';

  const accountTypeOptions = useMemo(() => {
    return accountTypes.map((item) => ({
      value: item.id,
      label: item.name,
      icon: item.icon,
    }));
  }, [accountTypes]);

  return (
    <FieldWrapper label={`${label}账户`}>
      <Select
        name="accountTypeId"
        required
        options={accountTypeOptions}
        OptionComp={OptionItem}
        optionWrapperClass={gc('w-full! ml-[-1rem]')}
      >
        {OptionItem}
      </Select>
    </FieldWrapper>
  );
}

function ConsumeTypeSelect() {
  const consumeTypes = useAtomValue(consumeTypeListAtom);

  const radioList = useMemo(() => {
    return consumeTypes.map((item) => ({
      value: item.id,
      icon: item.icon,
      label: item.name,
    }));
  }, [consumeTypes]);

  return <GridCircleRadioBox name="consumeTypeId" required radioList={radioList} colNum={5} />;
}

interface FormProps {}

export const Form = memo(
  forwardRef<HTMLFormElement, FormProps>(function Form(_props, formRef) {
    return (
      <RouterForm ref={formRef} method="post" un-p="x-[1rem] y-[1.5rem]">
        <input type="hidden" name="type" value={$(typeAtom)} />
        <ConsumeTypeSelect />
        <FieldWrapper label="日期">
          <DatePicker
            name="date"
            required
            defaultValue={dayjs()}
            className={gc('border-none w-full focus-within:shadow-none p-0')}
          />
        </FieldWrapper>
        <AccountTypeSelect />
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
