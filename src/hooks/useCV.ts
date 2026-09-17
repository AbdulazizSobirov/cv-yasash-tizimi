import { useEffect, useState } from 'react';
import { CVData } from '../types/cv'; import { defaultCV } from '../utils/defaults';
const KEY='cv-studio-data';
export function useCV(){
 const [cv,setCV]=useState<CVData>(()=>{try{return {...defaultCV,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return defaultCV}});
 const [saved,setSaved]=useState(true);
 useEffect(()=>{setSaved(false); const id=setTimeout(()=>{localStorage.setItem(KEY,JSON.stringify(cv));setSaved(true)},500);return()=>clearTimeout(id)},[cv]);
 const clear=()=>{localStorage.removeItem(KEY);setCV(defaultCV)};
 return {cv,setCV,saved,clear};
}
