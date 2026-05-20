
'use client'
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import React from 'react';
const Map = dynamic(()=>import('./runtime'), { ssr:false });
export default function MapPage(){ return <Map/>; }
