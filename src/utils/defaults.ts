import { CVData } from '../types/cv';
export const uid=()=>Math.random().toString(36).slice(2,10);
export const defaultCV:CVData={template:'modern',lang:'uz',personal:{firstName:'',lastName:'',title:'',phone:'',email:'',location:'',website:'',linkedin:'',github:'',dob:'',summary:''},experience:[],education:[],skills:[],languages:[],certificates:[],projects:[]};
