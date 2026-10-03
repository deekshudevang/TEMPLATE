import dynamic from 'next/dynamic';

// Define the template components for dynamic loading
// We use dynamic imports to ensure the 3D code for a template is ONLY loaded
// when a user actually is assigned to it.
export const TemplateRegistry: Record<string, any> = {
  "template-01": dynamic(() => import('@/templates/template-01/Template01').catch(err => () => null), { ssr: false }),
  "template-02": dynamic(() => import('@/templates/template-02/Template02').catch(err => () => null), { ssr: false }),
  "template-03": dynamic(() => import('@/templates/template-03/Template03').catch(err => () => null), { ssr: false }),
  "template-04": dynamic(() => import('@/templates/template-04/Template04').catch(err => () => null), { ssr: false }),
  "template-05": dynamic(() => import('@/templates/template-05/Template05').catch(err => () => null), { ssr: false }),
  "template-06": dynamic(() => import('@/templates/template-06/Template06').catch(err => () => null), { ssr: false }),
  "template-07": dynamic(() => import('@/templates/template-07/Template07').catch(err => () => null), { ssr: false }),
  "template-08": dynamic(() => import('@/templates/template-08/Template08').catch(err => () => null), { ssr: false }),
  "template-09": dynamic(() => import('@/templates/template-09/Template09').catch(err => () => null), { ssr: false }),
  "template-10": dynamic(() => import('@/templates/template-10/Template10').catch(err => () => null), { ssr: false }),
  "template-11": dynamic(() => import('@/templates/template-11/Template11').catch(err => () => null), { ssr: false }),
  "template-12": dynamic(() => import('@/templates/template-12/Template12').catch(err => () => null), { ssr: false }),
  "template-13": dynamic(() => import('@/templates/template-13/Template13').catch(err => () => null), { ssr: false }),
  "template-14": dynamic(() => import('@/templates/template-14/Template14').catch(err => () => null), { ssr: false }),
  "template-15": dynamic(() => import('@/templates/template-15/Template15').catch(err => () => null), { ssr: false }),
};

// Helper function to assign a template based on the student's ID
// This ensures that a given student ALWAYS gets the same template, but 
// distributes them evenly across all 15 experiences.
export function getTemplateForStudent(studentId: number): string {
  // Use modulo 15 to map to 1-15 evenly.
  // Using a stable formula based on ID ensures the template never randomly changes
  const templateIndex = (studentId % 15) + 1;
  const formattedIndex = templateIndex.toString().padStart(2, '0'); // "01", "02", etc.
  return `template-${formattedIndex}`;
}
