import dynamic from 'next/dynamic';

// Define the template components for dynamic loading
// We use dynamic imports to ensure the 3D code for a template is ONLY loaded
// when a user actually is assigned to it.
export const TemplateRegistry: Record<string, React.ComponentType<{ student: { id: number; usn: string; name: string } }>> = {
  "template-01": dynamic(() => import('@/templates/template-01/Template01').catch(() => () => null), { ssr: false }),
  "template-02": dynamic(() => import('@/templates/template-02/Template02').catch(() => () => null), { ssr: false }),
  "template-03": dynamic(() => import('@/templates/template-03/Template03').catch(() => () => null), { ssr: false }),
  "template-04": dynamic(() => import('@/templates/template-04/Template04').catch(() => () => null), { ssr: false }),
  "template-05": dynamic(() => import('@/templates/template-05/Template05').catch(() => () => null), { ssr: false }),
  "template-06": dynamic(() => import('@/templates/template-06/Template06').catch(() => () => null), { ssr: false }),
  "template-07": dynamic(() => import('@/templates/template-07/Template07').catch(() => () => null), { ssr: false }),
  "template-08": dynamic(() => import('@/templates/template-08/Template08').catch(() => () => null), { ssr: false }),
  "template-09": dynamic(() => import('@/templates/template-09/Template09').catch(() => () => null), { ssr: false }),
  "template-10": dynamic(() => import('@/templates/template-10/Template10').catch(() => () => null), { ssr: false }),
  "template-11": dynamic(() => import('@/templates/template-11/Template11').catch(() => () => null), { ssr: false }),
  "template-12": dynamic(() => import('@/templates/template-12/Template12').catch(() => () => null), { ssr: false }),
  "template-13": dynamic(() => import('@/templates/template-13/Template13').catch(() => () => null), { ssr: false }),
  "template-14": dynamic(() => import('@/templates/template-14/Template14').catch(() => () => null), { ssr: false }),
  "template-15": dynamic(() => import('@/templates/template-15/Template15').catch(() => () => null), { ssr: false }),
  "template-16": dynamic(() => import('@/templates/template-16/Template16').catch(() => () => null), { ssr: false }),
  "template-17": dynamic(() => import('@/templates/template-17/Template17').catch(() => () => null), { ssr: false }),
  "template-18": dynamic(() => import('@/templates/template-18/Template18').catch(() => () => null), { ssr: false }),
  "template-19": dynamic(() => import('@/templates/template-19/Template19').catch(() => () => null), { ssr: false }),
  "template-20": dynamic(() => import('@/templates/template-20/Template20').catch(() => () => null), { ssr: false }),
};
