import { OfficialSeal } from '@/components/OfficialSeal';
import { CarPlate } from '@/components/CarPlate';

export default function User() {
  return (
    <div>
      User{' '}
      <OfficialSeal
        topText="测试文本测试文本测试文本"
        bottomText="测试文本测"
        middleText="测试文本测试文"
        un-size="[96px]"
      />
      <CarPlate label="车主姓名" space="：" value="陈哲哲" />
    </div>
  );
}
