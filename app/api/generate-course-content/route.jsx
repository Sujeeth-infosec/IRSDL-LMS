import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";

const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format (Avoid without numbering or metadata like [5]).
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

  const promises = courseJson?.chapters?.map(async (chapter) => {
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
    // console.log(response.candidates[0].content.parts[0].text);
    const RawResp = response.candidates[0].content.parts[0].text;
    const RawJson = RawResp.replace("```json", "").replace("```", "");
    const JSONResp = JSON.parse(RawJson);

    //Get Youtube videos

    const youtubeData = await GetYoutubeVideo(chapter?.chaptername);
    console.log({
      youtubeVideo: youtubeData,
      CourseData: JSONResp,
    })
    return {
      youtubeVideo: youtubeData,
      CourseData: JSONResp,
    };
  });

  const CourseContent = await Promise.all(promises);

  return NextResponse.json({
    courseName: courseTitle,
    CourseContent: CourseContent,
  });
}

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const GetYoutubeVideo = async (topic) => {
  const params = {
    part: "snippet",
    maxResults: 1,
    q: topic,
    type: "video",
    key: process.env.YOUTUBE_API_KEY,
  };
  const resp = await axios.get(YOUTUBE_BASE_URL, { params });
  const youtubeVideoListResp = resp.data.items;
  const youtubeVideoList = [];
  youtubeVideoListResp.forEach((item) => {
    const data = {
      videoId: item.id?.videoId,
      title: item?.snippet?.title,
      // description:item.snippet.description,
      // thumbnail:item.snippet.thumbnails.default.url
    };
    youtubeVideoList.push(data);
  });
  console.log("youtubeVideoList", youtubeVideoList);
  return youtubeVideoList;
};
