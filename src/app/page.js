'use client'

import { MyProvider } from '@/FirstContext.js';
import Form from '../components/Form.js';
import React from'react';
import Calendar from '../components/Calendar.js';


export default function Home() {
 

  return (
    <MyProvider>
      <Form />
      <Calendar></Calendar>
    </MyProvider>
  
  );
}
