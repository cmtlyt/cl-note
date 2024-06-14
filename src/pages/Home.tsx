import { Outlet, Link, useSubmit } from 'react-router-dom';

export default function Home() {
  const submit = useSubmit();

  return (
    <div>
      home <Link to={'/about'}>to about</Link>
      <button
        onClick={() => {
          submit({ test: { aaa: 123 } }, { method: 'post', action: '/', encType: 'application/json', navigate: false });
        }}
      >
        aaa
      </button>
      <Outlet />
    </div>
  );
}

export function loader(ctx: unknown) {
  console.log('loader', ctx);
  return {};
}

export async function action({ request }: { request: Request }) {
  const data = await request.json();
  console.log(data);
  return {};
}
