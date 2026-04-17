import { NavBar } from "./NavBar";

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function PageLayout({ title, description, children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <NavBar />
      <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-8">
        <div className="mb-8 w-full max-w-sm text-left">
          <h1 className="text-[26px] font-bold leading-tight tracking-tight text-neutral-900">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              {description}
            </p>
          )}
        </div>
        {children}
      </main>
    </div>
  );
}
