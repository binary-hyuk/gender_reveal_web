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
      <main className="flex flex-1 flex-col items-center px-5 pb-24 pt-12">
        <div className="mb-10 w-full max-w-sm">
          <h1 className="text-2xl font-semibold leading-snug tracking-tight text-fg">
            {title}
          </h1>
          {description && (
            <p className="mt-3 text-sm leading-loose text-fg-muted">
              {description}
            </p>
          )}
        </div>
        {children}
      </main>
    </div>
  );
}
