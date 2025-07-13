import { NextResponse } from "next/server";
import { ai } from "../generate-course-content/route.jsx";

const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format.
Schema:{
  chapterName: <>,
  {
    topic: <>,
    content: <>
  }
}
: User Input:
`;

export async function POST(req) {
  const { courseJson, courseTitle, courseId } = await req.json();

  const promises = courseJson?.chapters?.map(async(chapter) => {
    const config = {
      responseMimeType: "text/plain",
    };
    const model = "gemini-2.0-flash";
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: PROMPT + JSON.stringify(chapter),
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });
    const RawResp = response.candidates[0].content.parts[0].text;
    console.log(RawResp);
    const RawJson = RawResp.replace("```json", "").replace("```", "");
    const JSONResp = JSON.parse(RawJson);

    //Get Youtube videos
    return JSONResp;
  });

  const CourseContent=await Promise.all(promises) 

  return NextResponse.json({
    courseName: courseTitle,
    CourseContent: CourseContent
  });
}
