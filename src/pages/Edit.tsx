import { DatePicker } from 'antd';
import { ActionFunctionArgs, Form } from 'react-router-dom';

import { PageTitle } from '@/components/PageTitle';

export default function Edit() {
  return (
    <>
      <PageTitle hasBack hasFixed title="编辑" />
      <Form method="post">
        <DatePicker name="date" className="w-full"></DatePicker>
        <input type="submit" value="提交" />
      </Form>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  console.log(Array.from((await request.formData()).entries()));
  return { test: 'actionData' };
}
