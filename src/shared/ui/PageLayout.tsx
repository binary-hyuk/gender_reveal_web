import { NavBar } from "./NavBar";

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function PageLayout({ title, description, children }: Props) {
  return (
    <div className="app-bg flex min-h-screen flex-col">
      <NavBar />
      <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-8">
        <div className="mb-8 w-full max-w-sm text-left">
          <h1 className="text-[26px] font-bold leading-tight tracking-tight text-fg">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              {description}
            </p>
          )}
        </div>
        {children}
      </main>
    </div>
  );
}
