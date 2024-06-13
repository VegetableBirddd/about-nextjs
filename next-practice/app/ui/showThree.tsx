'use client'
import React, { useEffect, useRef } from 'react'
import { initThree } from './three';

function showThree() {
  const dom = useRef<HTMLDivElement|null>(null);
  useEffect(()=>{
    if(dom.current){
        initThree(dom.current);
    }
  },[])
  return (
    <div ref={dom} />
  )
}

export default showThree