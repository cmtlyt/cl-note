import { ActionFunctionArgs, useSubmit } from 'react-router-dom';
import { useCallback, useRef } from 'react';
import { $ } from 'jotai-signal';
import { useSetAtom } from 'jotai';

import { Form } from './scoped/Edit/components';
import { getEditStorage, typeAtom, updateEditStorage } from './scoped/Edit/state';
import { typeOptions } from './scoped/Edit/constant';

import { Select } from '@/components/Select';
import { PageTitle } from '@/components/PageTitle';
import { SvgIcon } from '@/components/SvgIcon';
import { Card } from '@/components/Card';
import { getDataFromForm, getDataFromFormData } from '@/utils';
import { getConsumeTypeList } from '@/api/consumeType';
import { useActionDataReload } from '@/hooks/useActionDataReload';
import { createBill } from '@/api/bill';
import { getAccountTypeList } from '@/api/accountType';

export default function Edit() {
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();
  const changeTypeAtom = useSetAtom(typeAtom);
  const actionData = useActionDataReload();

  const submitForm = useCallback(() => {
    const data = getDataFromForm(formRef.current!, ['type', 'consumeType', 'date', 'payType', 'amount', 'title']);
    if (Object.values(data).some((value) => !value)) return console.log('请填写完整', data);
    submit(formRef.current);
  }, [submit]);

  console.log('render', actionData);

  return (
    <>
      <PageTitle hasBack hasFixed>
        <Select
          slot="title"
          placement="bottomcenter"
          defaultValue={$(typeAtom)}
          options={typeOptions}
          onChange={({ value }) => changeTypeAtom(value)}
        >
          <SvgIcon slot="icon" name="arrow-bottom" un-size="[1rem]" un-color="$detail-text-color" un-m="l-[0.5em]" />
        </Select>
        <Card slot="right" un-text="[1.3rem]" un-p="x-[1em] y-[0.25em]" onClick={submitForm}>
          提交
        </Card>
      </PageTitle>

      <Form ref={formRef} />
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const data = getDataFromFormData(await request.formData());
  const res = await createBill({
    consumeTypeId: data.consumeTypeId,
    date: data.date,
    amount: Number(data.amount),
    title: data.title,
    type: data.type,
    accountTypeId: data.accountTypeId,
  });
  return { test: res };
}

export async function loader() {
  const list = getEditStorage();
  const queue = [];
  const newStorage: Record<string, unknown> = {};
  if (!list.consumeTypeList?.length) {
    queue.push(getConsumeTypeList().then((res) => (newStorage.consumeTypeList = res.data.consumeTypes)));
  }
  if (!list.accountTypeList?.length) {
    queue.push(getAccountTypeList().then((res) => (newStorage.accountTypeList = res.data.accountTypes)));
  }
  await Promise.all(queue);

  Object.keys(newStorage).length && updateEditStorage(newStorage);
  return {};
}
