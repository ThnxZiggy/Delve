import React, { useState } from "react";

export default function About({ setState }) {
  const exit = () => {
    setState((prev) => ({ ...prev, aboutPage: false }));
  };

  console.log("hello world");

  return (
    <div className="about-shadow">
      <div className="about-container">
        <button onClick={exit} className="close">
          &#x2718;
        </button>
        <div className="about-us">
          <div className="profile">
            <img
              src="https://media-exp2.licdn.com/dms/image/C5603AQEIIyxwFiXsCQ/profile-displayphoto-shrink_800_800/0/1573512899213?e=1660780800&v=beta&t=r-sj0JkzhebtlbLwBnlFUamMq2htt9SpFaUGp0JTYTU"
              alt="Nadya profile picture"
              width="200"
              height="200"
            />
            <h1>Nadya Corscadden</h1>
            <h3>Full-stack Developer</h3>
            <h4>
              Nadya is a Full Stack Web Developer with a background in theatre
              and arts. She is well-versed in JavaScript, HTML, CSS, EJS,
              NodeJS, ReactJS, Express, jQuery and SQL. Her theatre background
              taught about hard work and perseverance and helped develop her
              passion for creativity and learning new things. She enjoys
              creating clear, clean, creative products with an intuitive user
              experience.
            </h4>
            <div className="profile-links">
              <a
                href="https://www.linkedin.com/in/nadya-corscadden-34222054/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
              <a
                href="https://github.com/NadyaCodes"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ion-icon name="logo-github"></ion-icon>
              </a>
            </div>
          </div>

          <div className="profile">
            <img
              src="https://media-exp2.licdn.com/dms/image/C4E03AQFYv34RamatyQ/profile-displayphoto-shrink_800_800/0/1524095683018?e=1660780800&v=beta&t=vcZPdpNqCiBtIOfaJzANRJcbIw3CmY1WeC7-9IQauXo"
              alt="Ziggy profile picture"
              width="200"
              height="200"
            />
            <h1>Manmohit Matharu</h1>
            <h3>Full-stack Developer</h3>
            <h4>
              Manmohit is a Software Developer with a background in HR
              consutling, supply chain and logistics. With a sound backgorund in
              Agile methodology, Manmohit is always looking to improve his
              coding skills and building scalable apps. When not busy console
              logging, you can find him in the gym, camping, or riding his
              motorcycle.
            </h4>
            <div className="profile-links">
              <a
                href="https://www.linkedin.com/in/manmohitmatharu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
              <a
                href="https://github.com/ThnxZiggy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ion-icon name="logo-github"></ion-icon>
              </a>
            </div>
          </div>

          <div className="profile">
            <img
              src="https://media-exp2.licdn.com/dms/image/C5603AQEjnv1VZqPSjw/profile-displayphoto-shrink_800_800/0/1653239110445?e=1660780800&v=beta&t=OqeuBKnFHReWA6D_1x9l2gIQZFqp2e3NeK7GnwRmjUA"
              alt="Nathan profile picture"
              width="200"
              height="200"
            />
            <h1>Nathan Lunn</h1>
            <h3>Full-stack Developer</h3>
            <h4>
              Nathan is a hardworking, problem solving, Full Stack Developer
              with business management experience. He is comfortable in
              JavaScript, React, Express, Ruby, Rails, HTML5, and CSS3. He
              gravitates towards TDD or EDD when working on personal projects,
              depending on the scale and time frame. He is extremely motivated
              when learning new skills and practices, and improving as a
              developer is his number one goal!
            </h4>
            <div className="profile-links">
              <a
                href="https://www.linkedin.com/in/nathan-lunn-06a1a7225/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
              <a
                href="https://github.com/nathanlunn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ion-icon name="logo-github"></ion-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
