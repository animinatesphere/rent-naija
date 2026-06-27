export default function AdminTopbar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-black/5 bg-white px-6 py-4">
      <h1 className="text-lg font-bold text-foreground">{title}</h1>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-white">
        AD
      </div>
    </div>
  );
}
