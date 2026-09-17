export type Lang='uz'|'ru'|'tr';
export type TemplateId='modern'|'professional'|'minimal'|'executive'|'creative'|'elegant';
export interface Personal { firstName:string; lastName:string; title:string; photo?:string; phone:string; email:string; location:string; website:string; linkedin:string; github:string; dob:string; summary:string; }
export interface Experience { id:string; jobTitle:string; company:string; location:string; startDate:string; endDate:string; current:boolean; description:string; }
export interface Education { id:string; degree:string; institution:string; location:string; startDate:string; endDate:string; description:string; }
export interface Skill { id:string; name:string; level:'beginner'|'intermediate'|'advanced'|'expert'; }
export interface LanguageItem { id:string; name:string; level:'beginner'|'intermediate'|'advanced'|'native'; }
export interface Certificate { id:string; name:string; organization:string; date:string; link:string; }
export interface Project { id:string; name:string; description:string; technologies:string; link:string; }
export interface CVData { template:TemplateId; lang:Lang; personal:Personal; experience:Experience[]; education:Education[]; skills:Skill[]; languages:LanguageItem[]; certificates:Certificate[]; projects:Project[]; }
