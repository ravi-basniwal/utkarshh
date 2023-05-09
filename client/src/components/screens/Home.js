import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
const Home  = ()=>{
 
   return  (

<div>
    <main>
      <section id="about-us">
        <div class="row">
          <div class="columnm">
          <img src={require('../../logoutkarsh.png')} alt="Utkarsh Photo" style={{filter: "contrast(180%)"}}/>
          </div>
          <div class="column">
            <p>We are Utkarsh, an online common service center providing various online application services to our customers.</p>
            <p>At the Online Common Service Center, we offer a diverse range of services, including government services, financial services, healthcare services, education services, and many more. </p>
            <p>Our services are designed to simplify your life by reducing the hassle of paperwork and long waiting times.</p>
            <p> Our aim is to bridge the digital divide and empower citizens to access essential services online. We strive to create a platform that is inclusive and accessible to all, regardless of their technological proficiency. Our vision is to create a digital India where everyone can access services with ease and convenience.</p>
          </div>
        </div>
      </section>
       <section id="flip-cards">
        <h2>Most Applied Applications</h2>
        <div class="container">
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <h3>Aadhar Card Update</h3>
                <img src={require('../../aadhaar-cardp.webp')} alt="Aadhar Card"  class="flip-card-img"/>
              </div>
              <div class="flip-card-back">
                <p>Update Aadhar card information like name, phone number, address, etc. We help you make changes efficiently and ensure your Aadhar card remains up-to-date.</p>
                <a href="/create" class="apply-btn">Apply Now</a>
              </div>
            </div>
          </div>
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <h3>Financial Services</h3>
                <img src={require('../../Financial-services.jpg')}  alt="Financial Services"  class="flip-card-img"/>
              </div>
              <div class="flip-card-back">
                <p>Pay your bills and taxes, transfer money, and apply for loans and insurance online. Our platform provides a secure and hassle-free experience for all your financial needs.</p>
                <a href="/create" class="apply-btn">Apply Now</a>
              </div>
            </div>
          </div>
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <h3>Job application</h3>
                <img src={require('../../jobaa.avif')}  alt="Job Application"  class="flip-card-img"/>
              </div>
              <div class="flip-card-back">
                <p>Apply for recent government jobs or fill application forms for competitive exams. Our platform makes it easy to submit applications and track their status.</p>
                <a href="/create" class="apply-btn">Apply Now</a>
              </div>
            </div>
          </div>
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <h3>Education Services</h3>
                <img src={require('../../educationser.jpeg')} alt="Education Services"  class="flip-card-img"/>
              </div>
              <div class="flip-card-back">
                <p>Apply for college admissions, access study materials, and enroll in online courses. Our platform connects you with the right educational opportunities and resources.</p>
                <a href="/create" class="apply-btn">Apply Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <section id="contact-us">
        <h2>Contact Us</h2>
        <p>Utkarshonlinecsc@gmail.com</p>
      </section>
      <p>&copy; 2023 Utkarsh Online Common Service Center</p>
    </footer>
  </div>
   )
}


export default Home
