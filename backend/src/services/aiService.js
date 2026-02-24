import Groq from "groq-sdk";
import { serverConfig } from "../config/server.config.js";
const groq = new Groq({ apiKey: serverConfig.GROQ_AI_API_KEY });
const generateAiResponse = async (content) => {
  const systemPrompt = `
   You are an expert ATS system, career coach, and recruiter.

   Given the text context of a resume. You need validate that is it resume file or not.If it is resume file then you need to analyze and provide feedback on the resume based on the following criteria : "isValidResume: true", otherwise you need to respond in "isValidResume: false".

   Your task is to analyze and provide feedback on a resume based on the following criteria:
   - ATScore : Based on the resume, provide a clear ATS score out of 100.
   - ATSSuggestion : Based on the ATS score, provide a clear ATS suggestion.(max 2 sentences).
   - Summery : Summarize the resume highlights skills, education and experience(max 3-4 sentences).
   - Strengths: Identify potential strengths and areas for improvement(max 3-4 sentences).
   - Weaknesses: Identify potential weaknesses and areas for improvement (max 3-4 sentences).
   - Skill Gap: Identify potential skill gaps and areas for improvement (max 3-4 sentences).
   - Skill Snap: Identify potential skills and provide array of skill snaps as per resume out of 100. Take best 6 skills. Ex: [ { "skill": "React", "score": 80 }, { "skill": "Node.js", "score": 70 } ]
   - Future Roadmap: Based on the resume, provide a clear roadmap for future career development.(max 3-4 sentences).
   - Job Search Params: Provide job search parameters based on the resume.
  
   Your responses should be in the following format as a JSON object:
   {
     "IsValidResume": boolean,
     "ATScore": number,
     "ATSSuggestion": "string",
     "Summery": "string",
     "Strengths": "string",
     "Weaknesses": "string",
     "SkillGap": "string",
     "SkillSnap": "array",
     "FutureRoadmap": "string",
     "JobSearchParams": "array"
   }
  `;

  const userMessage = `Resume Content: \n\n${content}`;
  const response = await groq.chat.completions.create({
    model: serverConfig.GROQ_AI_MODEL,
    // model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    max_tokens: 2000,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "resume_analysis",
        strict: true,
        schema: {
          type: "object",
          properties: {
            IsValidResume: { type: "boolean" },
            ATScore: { type: "number" },
            ATSSuggestion: { type: "string" },
            Summery: { type: "string" },
            Strengths: { type: "string" },
            Weaknesses: { type: "string" },
            SkillGap: { type: "string" },
            SkillSnap: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  skill: { type: "string" },
                  score: { type: "number" },
                },
                required: ["skill", "score"],
                additionalProperties: false,
              },
            },
            FutureRoadmap: { type: "string" },
            JobSearchParams: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: [
            "IsValidResume",
            "ATScore",
            "ATSSuggestion",
            "Summery",
            "Strengths",
            "Weaknesses",
            "SkillGap",
            "SkillSnap",
            "FutureRoadmap",
            "JobSearchParams",
          ],
          additionalProperties: false,
        },
      },
    },
  });
  return JSON.parse(response.choices[0].message.content || "{}");
  // return completetions;
};

export { generateAiResponse };
