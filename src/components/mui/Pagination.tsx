import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationProps {
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function PaginationRounded({ count, onChange }: PaginationProps) {
  return (
    <Stack justifyContent={"end"} display={"flex"} spacing={2}>
      <Pagination
        color="primary"
        count={count}
        shape="rounded"
        onChange={onChange}
      />
    </Stack>
  );
}
