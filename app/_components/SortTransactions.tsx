import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

const SortTransactions: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramCategory = searchParams.get("category");

  const handleEvent = (value: string) => {
    if (paramCategory) {
      router.push(`/transactions/?category=${paramCategory}&sort=${value}`);
    } else {
      router.push(`/transactions/?sort=${value}`);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Select onValueChange={handleEvent}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Sort transactions" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="lowestAmount">Lowest Amount</SelectItem>
          <SelectItem value="highestAmount">Highest Amount</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortTransactions;
