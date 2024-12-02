import { FormControl, FormGroup, MenuItem, Select } from "@mui/material";
import Modal from "@mui/material/Modal";
import Input from "../general/Input";
import { useState } from "react";

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

interface formData {
  name: string;
  surname: string;
  age: number;
  gender: string;
  specialty: string;
  course: string;
  higher_education: string;
  university: string;
  work: string;
}

interface BasicModalProps {
  open: boolean;
  onClose: () => void;
  addMember: (newMember: formData) => void;
}

const UserAddModal = ({ open, onClose, addMember }: BasicModalProps) => {
  const [formData, setFormData] = useState<formData>({
    name: "",
    surname: "",
    age: 0,
    gender: "",
    specialty: "",
    course: "",
    higher_education: "",
    university: "",
    work: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMember(formData);
    onClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormControl component="form" sx={style} onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              placeholder="Name"
              id="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              placeholder="Surname"
              id="surname"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, surname: e.target.value })
              }
              value={formData.surname}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              placeholder="Age"
              id="age"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, age: +e.target.value })
              }
              value={formData.age.toString()}
            />
          </FormGroup>
          <FormGroup>
            <Select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value as string })
              }
              displayEmpty
              className="w-full rounded-xl"
            >
              <MenuItem value="" disabled>
                Select Gender
              </MenuItem>
              <MenuItem value="K">Kişi</MenuItem>
              <MenuItem value="Q">Qadın</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              placeholder="Specialty"
              id="specialty"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, specialty: e.target.value })
              }
              value={formData.specialty}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              placeholder="Course"
              id="course"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, course: e.target.value })
              }
              value={formData.course}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              placeholder="Higher Education"
              id="higher_education"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, higher_education: e.target.value })
              }
              value={formData.higher_education}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              placeholder="University"
              id="university"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, university: e.target.value })
              }
              value={formData.university}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              placeholder="Work"
              id="work"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, work: e.target.value })
              }
              value={formData.work}
            />
          </FormGroup>

          <button
            type="submit"
            className="bg-[#000] text-[#fff] font-[roboto] font-medium text-sm rounded-xl py-2 px-4"
          >
            İstifadəçini əlavə et
          </button>
        </FormControl>
      </Modal>
    </div>
  );
};
export default UserAddModal;
