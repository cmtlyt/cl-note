import { ActionFunctionArgs, useActionData, useSubmit } from 'react-router-dom';
import { useCallback, useRef } from 'react';
import { $ } from 'jotai-signal';
import { useSetAtom } from 'jotai';

import { Form } from './scoped/Edit/components';
import { typeAtom } from './scoped/Edit/state';

import { Select } from '@/components/Select';
import { PageTitle } from '@/components/PageTitle';
import { SvgIcon } from '@/components/SvgIcon';
import { Card } from '@/components/Card';
import { getDataFromForm, getDataFromFormData } from '@/utils';
import { typeOptions } from '@/constant/editPageData';

export default function Edit() {
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();
  const actionData = useActionData();
  const needResetRef = useRef(false);
  const changeTypeAtom = useSetAtom(typeAtom);

  if (actionData) {
    if (needResetRef) formRef.current?.reset();
    needResetRef.current = false;
  }

  const submitForm = useCallback(() => {
    needResetRef.current = true;
    const data = getDataFromForm(formRef.current!, ['type', 'consumeType', 'date', 'payType', 'amount', 'title']);
    if (Object.values(data).some((value) => !value)) return;
    submit(formRef.current);
  }, [submit]);

  return (
    <>
      <PageTitle hasBack hasFixed>
        <Select
          slot="title"
          placement="bottomcenter"
          defaultValue={$(typeAtom)}
          options={typeOptions}
          onChange={(value) => changeTypeAtom(value)}
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
  console.log(data);
  return { test: 'actionData' };
}
