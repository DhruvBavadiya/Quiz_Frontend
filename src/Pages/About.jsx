import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

const socialMediaLinks = [
  { href: 'https://twitter.com/', icon: <TwitterIcon color="primary" fontSize="large" /> },
  { href: 'https://www.linkedin.com/', icon: <LinkedInIcon color="primary" fontSize="large" /> },
  { href: 'https://www.instagram.com/', icon: <InstagramIcon color="primary" fontSize="large" /> },
  { href: 'mailto:info@example.com', icon: <EmailIcon color="primary" fontSize="large" /> },
];

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
          {socialMediaLinks.map((link, index) => (
            <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
