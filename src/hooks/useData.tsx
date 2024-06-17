import { dataItemProps } from "@/const/types";
import { useQuery } from "@tanstack/react-query";

const useData = () => {
  const parentheses = ["(", ")"];
  const operations = ["+", "-", "/", "*"];
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const response = await fetch(
          "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
        );
        const data = (await response.json()) as dataItemProps[];
        if (data) {
          let initialNames = data.map((el) => el.name);
          return {
            data: data,
            initialNames: initialNames,
            options: [...initialNames, ...operations, ...parentheses],
          };
        }
      } catch (err) {
        console.log(err);
      }
    },
    queryKey: ["data"],
  });
  return { data, isLoading };
};

export default useData;
