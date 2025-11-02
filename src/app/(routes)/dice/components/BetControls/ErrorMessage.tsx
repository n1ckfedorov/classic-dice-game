'use client';

type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-2.5 text-center text-sm text-red-400">
      {message}
    </div>
  );
}
