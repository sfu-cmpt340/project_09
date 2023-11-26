import { useState, Component, useEffect } from 'react';
import { storage } from "./firebase";
import { ref, uploadBytes, listAll } from "firebase/storage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ModifiedPictures from './pages/ModifiedPictures';
import Home from './pages/Home';
import NavbarComp from './components/NavbarComp';

import './App.css';
import axios from 'axios';

export default function App(){
  return (
    <div>
      <NavbarComp/>
    </div>
  )
}