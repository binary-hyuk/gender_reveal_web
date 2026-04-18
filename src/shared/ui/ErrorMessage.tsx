import { AlertCircle } from "lucide-react";

interface Props {
  message: string | null;
}

export function ErrorMessage({ message }: Props) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="flex items-start gap-2 rounded-2xl border border-red-200/60 bg-red-50/70 px-4 py-3 text-sm text-red-600 backdrop-blur"
    >
      <AlertCircle size={16} strokeWidth={2.25} className="mt-0.5 flex-shrink-0" aria-hidden />
      <span className="flex-1">{message}</span>
    </p>
  );
}
