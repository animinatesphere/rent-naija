export default function OccupancyBadge({ occupied }: { occupied: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
        occupied ? "bg-blue-100 text-blue-700" : "bg-zinc-100 text-zinc-500"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${occupied ? "bg-blue-600" : "bg-zinc-400"}`} />
      {occupied ? "Occupied" : "Vacant"}
    </span>
  );
}
