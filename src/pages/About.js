import "../css/about.css";

const AboutPage = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>About Me</h1>
      <div className="sidebar">
        <img src="/profile.jpg" alt="Your Name" className="profile-image" />
        <p className="profilename">Sarthak Sharma</p>
        <div className="links">
          <a href="mailto:ssarthakxd@gmail.com">Email</a>
          <a
            href="https://github.com/ssarthaks"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ssarthaks"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className="aboutusParagraphs">
        <p style={{ textAlign: "justify" }}>
          I am a dedicated frontend React developer with a keen interest in
          creating dynamic and responsive web applications. My journey in web
          development has been fueled by a passion for turning ideas into
          seamless user experiences. Over the years, I've honed my skills in
          React, mastering the art of building interactive interfaces that are
          both functional and visually appealing. My enthusiasm for coding
          drives me to continuously learn and explore new technologies, always
          striving to push the boundaries of what's possible.
        </p>
        <p style={{ textAlign: "justify" }}>
          This MERN stack blog application is my first full-fledged project, and
          it has been a pivotal experience in my growth as a developer. Working
          on this project has significantly deepened my understanding of
          full-stack development, allowing me to integrate various components
          seamlessly. It has challenged me to think critically and solve complex
          problems, enhancing my technical expertise and preparing me for future
          endeavors in the ever-evolving field of web development.
        </p>
      </div>
    </>
  );
};

export default AboutPage;
