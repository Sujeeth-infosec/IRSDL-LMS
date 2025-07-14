import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2Icon, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs
import { useRouter } from "next/navigation";

function AddNewCourseDialog({ children }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    noOfChapters: 1,
    includeVideo: false,
    level: "",
    category: "",
  });
  const router = useRouter();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

  const onGenerate = async () => {
    console.log(formData);
    const courseId = uuidv4(); // Generate a unique course ID
    try {
      setLoading(true);
      const result = await axios.post("/api/generate-course-layout", {
        ...formData,
        courseId: courseId, // Assuming courseId is generated in the API
      });
      console.log(result.data);
      setLoading(false);
      router.push("/workspace/edit-course/" + result.data?.courseId);
    } catch (e) {
      {
        setLoading(false);
        console.log(e);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course Using AI</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-4 mt-3">
              <div>
                <label className="font-bold">Course Name</label>
                <Input
                  placeholder="Enter course name"
                  onChange={(event) =>
                    onHandleInputChange("name", event?.target.value)
                  }
                />
              </div>
              <div>
                <label className="font-bold">
                  Course Description (Optional){" "}
                </label>
                <Textarea
                  placeholder="Course Description"
                  onChange={(event) =>
                    onHandleInputChange("description", event?.target.value)
                  }
                />
              </div>
              <div>
                <label className="font-bold">No. of Chapters</label>
                <Input
                  placeholder="Enter number of chapters"
                  type="number"
                  onChange={(event) =>
                    onHandleInputChange("noOfChapters", event?.target.value)
                  }
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="font-bold">Include Video</label>
                <Switch
                  onCheckedChange={(value) =>
                    onHandleInputChange("includeVideo", !formData?.includeVideo)
                  }
                />
              </div>
              <div>
                <label className="font-bold">Difficulty level</label>
                <Select
                  onValueChange={(value) => onHandleInputChange("level", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="font-bold">Category</label>
                <Input
                  placeholder="Category (Separated by commas)"
                  onChange={(event) =>
                    onHandleInputChange("category", event?.target.value)
                  }
                />
              </div>
              <div className="mt-5">
                <Button
                  className={"w-full"}
                  onClick={onGenerate}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <Sparkle />
                  )}{" "}
                  Generate Course
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewCourseDialog;
