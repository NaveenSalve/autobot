export function PageHeader({ title, description, action }) {
  return <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div><h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1><p className="mt-1 max-w-2xl text-sm text-muted">{description}</p></div>
    {action}
  </div>;
}
