export const getRandomTemplateId = (): number => {
  if (typeof window === "undefined") return 1;

  let nextTemplate = Math.floor(Math.random() * 20) + 1;
  const lastTemplate = sessionStorage.getItem("lastTemplate");

  // Prevent same template consecutively
  if (lastTemplate && parseInt(lastTemplate) === nextTemplate) {
    nextTemplate = (nextTemplate % 20) + 1;
  }

  sessionStorage.setItem("lastTemplate", nextTemplate.toString());
  return nextTemplate;
};
