interface RecommendationListProps {
  title: string;
  items: string[];
}

export function RecommendationList({ title, items }: RecommendationListProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="font-medium mb-2">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-gray-600">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
} 