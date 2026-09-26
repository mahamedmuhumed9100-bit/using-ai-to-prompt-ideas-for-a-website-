// The prompt library. Each entry is rendered as a card by app.js.
// Text in [SQUARE BRACKETS] is a placeholder the reader fills in; it's
// highlighted on the page so it's obvious what to change.
const PROMPTS = [
  {
    category: "Coding",
    title: "Refactor legacy code",
    summary: "Improve old code without changing what it does.",
    prompt:
      "You are a senior C# developer doing a code review.\n" +
      "Refactor the method below to improve readability and maintainability without changing its behaviour.\n\n" +
      "Reply with:\n1. The refactored code\n2. A bullet list of each change and why\n3. Edge cases I should write tests for\n\n" +
      "[PASTE METHOD HERE]",
    techniques: ["Role", "Constraint", "Output format"],
    why: "Giving a role sets the standard of review, 'without changing its behaviour' stops risky rewrites, and the numbered format makes the answer easy to check.",
  },
  {
    category: "Coding",
    title: "Debug with evidence",
    summary: "Get a root cause, not a guess.",
    prompt:
      "My [LANGUAGE] code throws this error:\n[PASTE ERROR AND STACK TRACE]\n\n" +
      "Here is the relevant code:\n[PASTE CODE]\n\n" +
      "Before suggesting a fix, explain step by step what the code is doing and where it goes wrong. " +
      "Then give the smallest change that fixes it. If you need more information, ask instead of guessing.",
    techniques: ["Context", "Step-by-step reasoning", "Permission to ask"],
    why: "The full error gives the model real evidence, reasoning first reduces confident wrong answers, and allowing questions stops it inventing missing details.",
  },
  {
    category: "Coding",
    title: "Write the tests first",
    summary: "Turn a requirement into unit tests.",
    prompt:
      "Write [pytest / xUnit] tests for a function with this behaviour:\n[DESCRIBE WHAT THE FUNCTION SHOULD DO]\n\n" +
      "Cover the normal case, boundary values, and invalid input. " +
      "Give each test a name that describes the behaviour it checks. Don't write the function itself.",
    techniques: ["Constraint", "Coverage checklist"],
    why: "Listing the kinds of case to cover (normal, boundary, invalid) is a checklist the model follows, and 'don't write the function' keeps it focused.",
  },
  {
    category: "Learning",
    title: "Explain concepts simply",
    summary: "Break down a technical topic for a beginner.",
    prompt:
      "Explain how [TOPIC, e.g. a relational database] works to a beginner.\n" +
      "Use simple language and one real-life analogy. Keep it under 200 words.\n" +
      "Then give me 5 practice questions, from easy to hard, with the answers hidden at the end.",
    techniques: ["Audience", "Length limit", "Active recall"],
    why: "Naming the audience sets the vocabulary, the word limit forces clarity, and practice questions turn reading into learning.",
  },
  {
    category: "Learning",
    title: "Socratic tutor",
    summary: "Learn by being questioned instead of told.",
    prompt:
      "Act as my tutor for [TOPIC]. Don't give me the answer directly.\n" +
      "Ask me one question at a time, wait for my reply, and use my answer to decide the next question. " +
      "If I'm wrong, give a hint rather than the correction.",
    techniques: ["Role", "Interaction rules"],
    why: "Setting rules for the conversation changes the model from an answer machine into a tutor, which is much better for actually remembering things.",
  },
  {
    category: "Learning",
    title: "Check my understanding",
    summary: "Find the gaps in what you think you know.",
    prompt:
      "Here is my explanation of [TOPIC]:\n[YOUR EXPLANATION]\n\n" +
      "Point out anything that is wrong, missing or oversimplified. " +
      "Rate my understanding from 1 to 5 and tell me the single most important thing to study next.",
    techniques: ["Critique", "Rubric"],
    why: "Asking for critique of your own words gets targeted feedback, and a single 'next thing' makes it actionable.",
  },
  {
    category: "Productivity",
    title: "Study plan generator",
    summary: "A structured revision plan for exams or coursework.",
    prompt:
      "Create a [2]-week revision plan for my [MODULE / EXAM] exam on [DATE].\n" +
      "I can study [HOURS] hours on weekdays and [HOURS] on weekends. The topics are: [LIST TOPICS].\n" +
      "Include daily tasks, practice questions and a recap day each week. Put it in a table.",
    techniques: ["Context", "Constraints", "Output format"],
    why: "Real constraints (dates, hours, topics) produce a plan you can actually follow instead of a generic template.",
  },
  {
    category: "Productivity",
    title: "Tailor my CV to a job",
    summary: "Match your experience to a job description honestly.",
    prompt:
      "Here is a job description:\n[PASTE JOB DESCRIPTION]\n\nHere is my CV:\n[PASTE CV]\n\n" +
      "List the job's top 5 requirements and, for each, the strongest evidence from my CV. " +
      "Where I have no evidence, say so — don't invent experience. Then suggest 3 bullet points I could rewrite.",
    techniques: ["Grounding", "Honesty constraint"],
    why: "Grounding the answer in two real documents and forbidding invented experience keeps the output truthful and specific.",
  },
  {
    category: "Productivity",
    title: "Meeting notes to actions",
    summary: "Turn messy notes into a clear to-do list.",
    prompt:
      "Turn these meeting notes into a table with the columns: Action, Owner, Deadline.\n" +
      "If an owner or deadline isn't mentioned, write 'TBC' rather than guessing.\n\n[PASTE NOTES]",
    techniques: ["Structured output", "No guessing"],
    why: "A fixed table shape makes the output predictable, and 'TBC' stops the model filling gaps with made-up names or dates.",
  },
];
