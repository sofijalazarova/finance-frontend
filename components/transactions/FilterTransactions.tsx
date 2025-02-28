import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoriesQuery } from "@/lib/queries/useCategoriesQuery";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import Loading from "../../app/_components/Loading";

const FilterTransactions: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramSort = searchParams.get("sort");

  const { data: categories } = useCategoriesQuery();

  if (!categories) {
    return <Loading />;
  }

  const handleEvent = (value: string) => {
    if (paramSort) {
      router.push(`/transactions/?category=${value}&sort=${paramSort}`);
    } else if (!paramSort && value !== "all") {
      router.push(`/transactions/?category=${value}`);
    } else {
      router.push(`/transactions`);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Select onValueChange={handleEvent}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {categories.map((category: CategoryModel) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterTransactions;
