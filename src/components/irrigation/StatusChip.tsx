
import { Chip } from "@mui/material";
import { FC } from "react";

interface StatusChipProps {
  status: string;
}

const StatusChip: FC<StatusChipProps> = ({ status }) => {
  switch (status) {
    case "Done":
      return <Chip label="Done" color="success" size="small" />;
    case "In Progress":
      return <Chip label="In Progress" color="primary" size="small" />;
    case "Pending":
      return <Chip label="Pending" color="warning" size="small" />;
    default:
      return <Chip label={status} color="default" size="small" />;
  }
};

export default StatusChip;
