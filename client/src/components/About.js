import React, {useState} from 'react';

export default function About({setState}) {
  const exit = () => {
    setState(prev => ({...prev, aboutPage: false}))
  }

  console.log("hello world");

  return (
    <div> 
      <button onClick={exit}>Exit</button>
  
      <div>
        <img 
          src="https://media-exp2.licdn.com/dms/image/C5603AQEIIyxwFiXsCQ/profile-displayphoto-shrink_800_800/0/1573512899213?e=1660780800&v=beta&t=r-sj0JkzhebtlbLwBnlFUamMq2htt9SpFaUGp0JTYTU" 
          alt="Nadya profile picture" 
          width="200" 
          height="200"
        />
        <h1>Nadya Corscadden</h1>
        <h3>Full-stack Developer</h3>
        <div>
          <a href="https://www.linkedin.com/in/nadya-corscadden-34222054/" target="_blank" rel="noopener noreferrer">
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
          <a href="https://github.com/NadyaCodes" target="_blank" rel="noopener noreferrer">
            <ion-icon name="logo-github"></ion-icon>
          </a>
        </div>
      </div>

      <div>
        <img 
          src="https://media-exp2.licdn.com/dms/image/C4E03AQFYv34RamatyQ/profile-displayphoto-shrink_800_800/0/1524095683018?e=1660780800&v=beta&t=vcZPdpNqCiBtIOfaJzANRJcbIw3CmY1WeC7-9IQauXo" 
          alt="Ziggy profile picture" 
          width="200" 
          height="200"
        />
        <h1>Manmohit Matharu</h1>
        <h3>Full-stack Developer</h3>
        <div>
          <a href="https://www.linkedin.com/in/manmohitmatharu/" target="_blank" rel="noopener noreferrer">
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
          <a href="https://github.com/ThnxZiggy" target="_blank" rel="noopener noreferrer">
            <ion-icon name="logo-github"></ion-icon>
          </a>
        </div>
      </div>

      <div>
        <img 
          src="https://media-exp2.licdn.com/dms/image/C5603AQEjnv1VZqPSjw/profile-displayphoto-shrink_800_800/0/1653239110445?e=1660780800&v=beta&t=OqeuBKnFHReWA6D_1x9l2gIQZFqp2e3NeK7GnwRmjUA" 
          alt="Nathan profile picture" 
          width="200" 
          height="200"
        />
        <h1>Nathan Lunn</h1>
        <h3>Full-stack Developer</h3>
        <div>
          <a href="https://www.linkedin.com/in/nathan-lunn-06a1a7225/" target="_blank" rel="noopener noreferrer">
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
          <a href="https://github.com/nathanlunn" target="_blank" rel="noopener noreferrer">
            <ion-icon name="logo-github"></ion-icon>
          </a>
        </div>
      </div>

    </div>
  )
}