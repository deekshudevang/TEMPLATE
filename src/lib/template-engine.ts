import { templates } from "@/templates";

export const getRandomTemplateId = (): number => {
  if (typeof window === "undefined") return 1;

  const templateCount = Object.keys(templates).length;
  let nextTemplate = Math.floor(Math.random() * templateCount) + 1;
  const lastTemplate = sessionStorage.getItem("lastTemplate");

  // Prevent same template consecutively
  if (lastTemplate && parseInt(lastTemplate) === nextTemplate) {
    nextTemplate = (nextTemplate % templateCount) + 1;
  }

  sessionStorage.setItem("lastTemplate", nextTemplate.toString());
  return nextTemplate;
};
