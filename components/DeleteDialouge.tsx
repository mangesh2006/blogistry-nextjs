"use client"
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DeleteDialouge = () => {
  const [token, settoken] = useState("")
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token ){
      console.log("Token not found")
      return;
    }

    settoken(token)
  })

  const handleDelete = async () => {
    const res = await fetch(`/api/deleteprofile`, {
      method: "DELETE",
      body: JSON.stringify({token}),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      toast.success(data.message);
      localStorage.removeItem("token");
      router.push("/");
      setIsDialogOpen(false);
    } else if (res.status === 500) {
      toast.error(data.message);
      setIsDialogOpen(false);
    } else if (res.status === 404) {
      toast.error(data.message);
      setIsDialogOpen(false);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex gap-2 items-center bg-red-600 hover:bg-red-700 text-white"
        >
          <Trash2 size={18} /> Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white/5 backdrop-blur-md border border-white/10 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
        </DialogHeader>
        <p className="text-gray-500 dark:text-gray-300">
          Are you sure you want to delete your account? This action is
          irreversible.
        </p>
        <div className="flex gap-4 mt-4">
          <Button
            variant="outline"
            className="bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 w-1/2"
          >
            Yes, Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialouge;
