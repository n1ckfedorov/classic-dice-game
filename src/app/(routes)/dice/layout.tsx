import '@/styles/global.css';

export default function DiceLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {props.children}
    </div>
  );
}
