import { FormControl, FormGroup } from "@mui/material";
import Modal from "@mui/material/Modal";
import Input from "../general/Input";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const formStyle = {
  display: "flex",
  flexDirection: "row !important",
};

interface BasicModalProps {
  open: boolean;
  onClose: () => void;
  addEvent: (newEvent: formData) => void;
}

type formData = {
  title: any;
  start_time: Date;
  end_time: Date;
};

export default function BasicModal({
  open,
  onClose,
  addEvent,
}: BasicModalProps) {
  const [formData, setFormData] = useState<formData>({
    title: "",
    start_time: new Date(),
    end_time: new Date(),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addEvent(formData);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormControl
          component="form"
          sx={style}
          onSubmit={handleSubmit}
        >
          <FormGroup>
            <Input
              type="text"
              placeholder="Title"
              id="title"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              value={formData.title}
            />
          </FormGroup>
          <FormGroup
            sx={formStyle}
            className="flex gap-2 flex-row items-center"
          >
            <div className="font-[roboto] md:w-1/4 w-1/2 text-sm md:text-md">
              Select start date:
            </div>
            <DatePicker
              className="border md:flex-1 rounded-xl w-full py-2 px-4 font-[roboto] font-medium text-sm outline-none"
              selected={formData.start_time}
              onChange={(date: Date | null) =>
                setFormData({
                  ...formData,
                  start_time: date || new Date(),
                })
              }
            />
          </FormGroup>
          <FormGroup
            sx={formStyle}
            className="flex gap-2 flex-row items-center"
          >
            <div className="font-[roboto] md:w-1/4 text-sm md:text-md">
              Select end date:
            </div>
            <DatePicker
              className="border flex-1 rounded-xl w-full py-2 px-4 font-[roboto] font-medium text-sm outline-none"
              selected={formData.end_time}
              onChange={(date: Date | null) =>
                setFormData({
                  ...formData,
                  end_time: date || new Date(),
                })
              }
            />
          </FormGroup>

          <button
            type="submit"
            className="bg-[#000] text-[#fff] font-[roboto] font-medium text-sm rounded-xl py-2 px-4"
          >
            Tədbiri əlavə et
          </button>
        </FormControl>
      </Modal>
    </div>
  );
}
