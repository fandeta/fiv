import { StrictMode, useEffect} from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Link, Routes, Route } from 'react-router-dom';
import ScrollReveal from "scrollreveal";
import './global.css'

// [-] The Application Components
import ScrollToTopButton from './components/scrollToTop/scrollToTop';
import Header from "./components/header/header"
import LandingPage from "./components/landing/landing"
import SectionTitle from "./components/sectionTitle/sectionTitle"

import Vulnerabilities from "./components/vulnsSection/vulnerabilitiesSection"
import {Bug} from "./components/vulnsSection/vulnerabilitiesSection"

import AboutMe from "./components/aboutSection/aboutSection"
import {Card} from "./components/aboutSection/aboutSection"

import WhatIsSection from "./components/whatIsSection/whatIsSection"
import {Question} from "./components/whatIsSection/whatIsSection"

import Footer from "./components/footer/footer"
import NotFound404 from "./components/404/404"

// Start Import the Bugs Articles.
import XSS from './components/bugs/xss';
import DXSS from './components/bugs/d-xss';
import SXSS from './components/bugs/s-xss';
import RXSS from './components/bugs/r-xss';
import CSRF from './components/bugs/csrf';
import SSRF from './components/bugs/ssrf';
import OSCommand from './components/bugs/os-injection';
import PathTraversal from './components/bugs/path-traversal';
import SQLi from './components/bugs/sqli';
import LFI from './components/bugs/lfi';
import RFI from './components/bugs/rfi';
import FileUpload from './components/bugs/file-upload';
import XXEInjection from './components/bugs/xxe-injection';
// [-] Rendering All Components Inside The Page 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/'
      element={
        <>
        {/* Import All Scroll Reveal Events To Only Use The Class In Element without repeat myself! */}
      <SrEvents/>
      <ScrollToTopButton/>
      {/* ----- Start Designing The Page Structure ----- */}
      <Header/>
      <LandingPage/>
      {/* ----- Vulnerabilities Section -----  */}
      <SectionTitle sectionName={"Vulnerabilities Section"}/>
      <Vulnerabilities>
        <Bug imgSrc={"/imgs/bugs/xss.jpg"} goTo={"xss"}/>
        <Bug imgSrc={"/imgs/bugs/csrf.jpg"} goTo={"csrf"}/>
        <Bug imgSrc={"/imgs/bugs/ssrf.jpg"} goTo={"ssrf"}/>
        <Bug imgSrc={"/imgs/bugs/dom-xss.jpg"} goTo={"d-xss"}/>
        <Bug imgSrc={"/imgs/bugs/stored-xss.jpg"} goTo={"s-xss"}/>
        <Bug imgSrc={"/imgs/bugs/lfi.jpg"} goTo={"lfi"}/>
        <Bug imgSrc={"/imgs/bugs/rfi.jpg"} goTo={"rfi"}/>
        <Bug imgSrc={"/imgs/bugs/path-traversal.jpg"} goTo={"path-traversal"}/>
        <Bug imgSrc={"/imgs/bugs/os-command-injection.jpg"} goTo={"os-injection"}/>
        <Bug imgSrc={"/imgs/bugs/file-upload.jpg"} goTo={"file-upload"}/>
        <Bug imgSrc={"/imgs/bugs/xxe-injection.jpg"} goTo={"xxe-i"}/>
        <Bug imgSrc={"/imgs/bugs/sqli.jpg"} goTo={"sqli"}/>
      </Vulnerabilities>
      {/* ----- About me Section ----- */}
      <SectionTitle sectionName={"About Me"}/>
      <AboutMe>
        <Card number={"1"} title={"Who am i ??"}>
        Hey! I'm <span>Waleed Sameer</span>, a 
        cybersecurity enthusiast and the creator of <span>FIV</span>. <br/>
        I built this platform to help developers, beginner pentesters, 
        and bug bounty hunters improve their web security skills in a hands-on way.
        </Card>
        <Card number={"2"} title={"My Skills & Knowledge"}>
          <span>HTML, CSS, JavaScript</span> <br/> 
          <span>SASS, Tailwindcss</span> <br/> 
          <span>PHP, SQL</span> <b style={{fontSize: "14px",color:"#999",paddingLeft: "7px"}}>Basic Knowledge</b>  <br/>
          <span>Linux+, Network+</span> <br/>
          <span>Docker, Git&Github, </span>
        </Card>
        <Card number={"3"} title={"Why did I create FIV ??"}>
          I started this project because I know how hard it can be to learn web security without practical experience. <br/>
          FIV is a safe environment where you can understand how vulnerabilities work.
          My goal is to make security learning fun and accessible for everyone!
        </Card>
        <Card number={"4"} title={"My Vision for the Future"}>
        This is just the beginning! <br/> I plan to expand FIV with more labs, challenges, and learning resources to make it an essential tool for anyone in cybersecurity.
        I'm here to help, improve, and enhance the security community.
        </Card>
        <Card number={"5"} title={"What can you expect from FIV ??"}>
        Realistic security challenges to practice your skills.
        A beginner friendly approach no complex setups!
        Continuous improvements and new vulnerabilities to explore.
        The goal? Make security learning fun, practical, and accessible to everyone!
        </Card>
      </AboutMe> 
      {/* ----- What's FIV Section ----- */}
      <SectionTitle sectionName={"What's FIV ??"}/>
      <WhatIsSection>
        <Question theQuestion={"What's FIV?"}>
        FIV (Fandeta Is Vulnerable) is a deliberately vulnerable web application designed for security researchers,
        ethical hackers,
        and penetration testers to practice and understand common web vulnerabilities through interactive labs
        and educational articles.
        </Question>
        <Question theQuestion={"Who is FIV for?"}>
        FIV (Fandeta Is Vulnerable) is a deliberately vulnerable web application designed for security researchers,
        ethical hackers,
        and penetration testers to practice and understand common web vulnerabilities through interactive labs
        and educational articles.
        </Question>
        <Question theQuestion={"What kind of vulnerabilities can I practice on FIV?"}>
        <b>FIV provides hands-on labs for multiple web vulnerabilities, including:</b><br/><br/>
                1. Cross-Site Scripting (XSS) - Reflected, Stored, and DOM-based<br/>
                2. Cross-Site Request Forgery (CSRF)<br/>
                3. Server-Side Request Forgery (SSRF)<br/>
                4. File Upload Vulnerabilities<br/>
                5. OS Command Injection<br/>
                6. SQL Injection (SQLi)<br/>
                7. Local & Remote File Inclusion (LFI/RFI)<br/>
                8. Path Traversal<br/>
                9. XML External Entity (XXE) Attacks<br/><br/>
                <b>- More vulnerabilities and labs will be added over time!</b>
        </Question>
        <Question theQuestion={"Are the articles beginner-friendly?"}>
          Yes! Each article breaks down vulnerabilities in a simple and structured way,
          covering their concept, exploitation, and real-world impact. 
          Whether you're new to security or already familiar with it, 
          FIV's articles will help deepen your understanding.
        </Question>
        <Question theQuestion={"Will new vulnerabilities and content be added?"}>
        Absolutely! FIV is constantly evolving. New vulnerabilities,
        challenges, and articles will be added over time to keep up with emerging threats and attack techniques.
        Stay tuned for updates!
        </Question>
        <Question theQuestion={"How can I start using FIV?"}>
        Simply navigate to the "Hack now!" Button, choose a vulnerability,
        and start experimenting! Read the related articles,
        try different attack techniques, and level up your security skills. 🚀
        </Question>
      </WhatIsSection>
      {/* ----- The Footer ----- */}
      <Footer/>
        </>
      }/> 
      <Route path="*" element={<NotFound404/>}/>
      <Route path='/xss' element={<XSS/>}/>
      <Route path='/d-xss' element={<DXSS/>}/>
      <Route path='/s-xss' element={<SXSS/>}/>
      <Route path='/r-xss' element={<RXSS/>}/>
      <Route path='/ssrf' element={<SSRF/>}/>
      <Route path='/csrf' element={<CSRF/>}/>
      <Route path='/rfi' element={<RFI/>}/> {/* This */}
      <Route path='/lfi' element={<LFI/>}/>
      <Route path='/os-injection' element={<OSCommand/>}/>
      <Route path='/file-upload' element={<FileUpload/>}/> {/* This */}
      <Route path='/sqli' element={<SQLi/>}/>
      <Route path='/path-traversal' element={<PathTraversal/>}/>
      <Route path='/xxe' element={<XXEInjection/>}/> {/* This */}
    </Routes>
    </BrowserRouter>
  </StrictMode>
)
// Function to Call All Scroll Events From "ScrollReveal" Library. 
export function SrEvents() {
  useEffect(() => {
      ScrollReveal().reveal(".SR-top", {
        delay: 500,
        reset: true,
        distance: "50px",
        duration: 1500,
        origin: "top"
      } );
    }, []);
    useEffect(() => {
      ScrollReveal().reveal(".SR-left", {
        delay: 500,
        reset: true,
        distance: "70px",
        duration: 1500,
        origin: "left",
      } );
    }, []);
    useEffect(() => {
      ScrollReveal().reveal(".SR-right", {
        reset: true,
        distance: "30px",
        duration: 1500,
        origin: "right"
      } );
    }, []);
    useEffect(() => {
      ScrollReveal().reveal(".SR-bottom", {
        reset: true,
        distance: "30px",
        duration: 1500,
        origin: "bottom"
      } );
    }, []);
}