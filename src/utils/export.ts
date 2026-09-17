import html2canvas from 'html2canvas';import jsPDF from 'jspdf';import { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun } from 'docx';import { saveAs } from 'file-saver';import { CVData } from '../types/cv';import { t } from '../translations';
export async function exportPDF(el:HTMLElement,file='cv.pdf'){
 const canvas=await html2canvas(el,{scale:2,useCORS:true,backgroundColor:'#ffffff',windowWidth:el.scrollWidth,windowHeight:el.scrollHeight});
 const pdf=new jsPDF('p','mm','a4'); const pageW=210,pageH=297; const imgW=pageW; const imgH=canvas.height*imgW/canvas.width;
 let y=0,page=0; while(y<imgH){if(page>0)pdf.addPage(); pdf.addImage(canvas.toDataURL('image/jpeg',0.96),'JPEG',0,-y,imgW,imgH); y+=pageH; page++;} pdf.save(file);
}
const lines=(s:string)=>s?s.split('\n').map(x=>new Paragraph({children:[new TextRun(x)]})):[];
export async function exportDOCX(cv:CVData,file='cv.docx'){
 const p=cv.personal; const children:any[]=[new Paragraph({text:`${p.firstName} ${p.lastName}`,heading:HeadingLevel.TITLE}),new Paragraph({text:p.title}),new Paragraph({text:[p.email,p.phone,p.location,p.website,p.linkedin,p.github].filter(Boolean).join('  |  ')})];
 if(p.summary){children.push(new Paragraph({text:t(cv.lang,'personal'),heading:HeadingLevel.HEADING_1}),...lines(p.summary));}
 if(cv.experience.length){children.push(new Paragraph({text:t(cv.lang,'experience'),heading:HeadingLevel.HEADING_1}));cv.experience.forEach(x=>children.push(new Paragraph({children:[new TextRun({text:x.jobTitle,bold:true}),new TextRun(` — ${x.company}`)]}),new Paragraph({text:`${x.startDate} — ${x.current?'Present':x.endDate}${x.location?` · ${x.location}`:''}`}),...lines(x.description)));}
 if(cv.education.length){children.push(new Paragraph({text:t(cv.lang,'education'),heading:HeadingLevel.HEADING_1}));cv.education.forEach(x=>children.push(new Paragraph({children:[new TextRun({text:x.degree,bold:true}),new TextRun(` — ${x.institution}`)]}),new Paragraph({text:`${x.startDate} — ${x.endDate}`}),...lines(x.description)));}
 if(cv.skills.length)children.push(new Paragraph({text:t(cv.lang,'skills'),heading:HeadingLevel.HEADING_1}),new Paragraph({text:cv.skills.map(x=>`${x.name} (${x.level})`).join(' · ')}));
 if(cv.languages.length)children.push(new Paragraph({text:t(cv.lang,'languages'),heading:HeadingLevel.HEADING_1}),new Paragraph({text:cv.languages.map(x=>`${x.name} (${x.level})`).join(' · ')}));
 if(cv.certificates.length){children.push(new Paragraph({text:t(cv.lang,'certificates'),heading:HeadingLevel.HEADING_1}));cv.certificates.forEach(x=>children.push(new Paragraph({text:`${x.name} — ${x.organization} (${x.date})${x.link?` · ${x.link}`:''}`})));}
 if(cv.projects.length){children.push(new Paragraph({text:t(cv.lang,'projects'),heading:HeadingLevel.HEADING_1}));cv.projects.forEach(x=>children.push(new Paragraph({children:[new TextRun({text:x.name,bold:true}),new TextRun(x.technologies?` · ${x.technologies}`:'')]}),...lines(x.description),new Paragraph({text:x.link})));}
 const doc=new Document({sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:720,right:720,bottom:720,left:720}}},children}]}); saveAs(await Packer.toBlob(doc),file);
}
