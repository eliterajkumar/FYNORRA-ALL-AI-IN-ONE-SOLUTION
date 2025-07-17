export default function SummaryCard({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: string | number;
  color: string;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-xl text-white ${color} transition-all transform hover:scale-[1.02]`}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm opacity-80">{title}</div>
          <div className="text-3xl font-bold">{value}</div>
        </div>
        <div className="text-4xl opacity-20">{icon}</div>
      </div>
      <button className="mt-4 text-xs bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30">
        View All
      </button>
    </div>
  );
}
