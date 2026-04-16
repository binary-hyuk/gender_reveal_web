import { NavBar } from "./NavBar";

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function PageLayout({ title, description, children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <NavBar />
      <main className="flex flex-1 flex-col items-center px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold text-gray-800">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
        {children}
      </main>
    </div>
  );
}
