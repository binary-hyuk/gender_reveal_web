interface Props {
  message: string | null;
}

/**
 * 폼 하단에 에러 메시지를 일관되게 표시. message가 null/빈 문자열이면 렌더하지 않음.
 */
export function ErrorMessage({ message }: Props) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">
      {message}
    </p>
  );
}
