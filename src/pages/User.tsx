import { OfficialSeal } from '@/components/OfficialSeal';
import { FieldList } from '@/components/FieldList';

export default function User() {
  const testData = {
    CarPlate: [
      {
        label: '车主姓名',
        space: '?',
        value: '陈哲哲',
      },
      {
        label: '手机号码',
        space: ':',
        value: '158****888',
      },
      {
        label: '关系',
        space: '?',
        value: '父子',
      },
    ],
  };
  return (
    <div>
      User{' '}
      <OfficialSeal
        topText="测试文本测试文本测试文本"
        bottomText="测试文本测"
        middleText="测试文本测试文"
        un-size="[96px]"
      />
      <FieldList data={testData.CarPlate} />
    </div>
  );
}
