"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import AddNewCourseDialog from "../AddNewCourseDialog";

function CourseList() {
  const [courseList, setCourseList] = useState([]);

  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl mb-2">Course List</h2>

      {courseList?.length == 0 ? (
        <div className="flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-secondary ">
          <Image
            src={"/online-education.png"}
            alt="edu"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h2 className="my-2 text-lg font-bold">
            Look like you haven't enrolled in any courses yet
          </h2>
          <AddNewCourseDialog>
            <Button>+ Create Your First Course</Button>
          </AddNewCourseDialog>
        </div>
      ) : (
        <div>List of Courses</div>
      )}
    </div>
  );
}

export default CourseList;
