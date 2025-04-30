import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface EditDialougeProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const EditDialouge: React.FC<EditDialougeProps> = ({
  username,
  setUsername,
}) => {
  const [newUsername, setNewUsername] = useState(username);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/edit", {
      method: "PUT",
      body: JSON.stringify({ token, username: newUsername }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      toast.success(data.message);
      setUsername(newUsername); // Update username in ProfilePage
    } else {
      toast.error(data.message);
    }
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setNewUsername(username); // Reset to initial username on cancel
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="flex gap-2 items-center bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Pencil size={18} /> Edit Username
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white/5 backdrop-blur-md border border-white/10 dark:border-gray-700 rounded-lg p-6 max-w-sm w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-white">
            Edit Username
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-500 dark:text-gray-300 mb-4">
          Update your username below:
        </p>
        <Input
          placeholder="Enter new username"
          value={newUsername}
          onChange={handleInputChange}
          className="mb-4 p-3 rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            className="bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialouge;
