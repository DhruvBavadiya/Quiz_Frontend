import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

const About = () => {
  return (
    <div className="bg-[#282828] ml-[16.66%] flex items-center h-[100vh] justify-center">
      <div className="container p-8 text-white bg-black mx-20 rounded-xl">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p>
          Welcome to Quizzy, your go-to platform for challenging quizzes and
          engaging learning experiences. Our mission is to make learning fun,
          interactive, and accessible to everyone.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <TwitterIcon color="primary" fontSize="large" />
          </a>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon color="primary" fontSize="large" />
          </a>
          {/* Instagram */}
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <InstagramIcon color="primary" fontSize="large" />
          </a>
          {/* Email */}
          <a href="mailto:info@example.com">
            <EmailIcon color="primary" fontSize="large" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
