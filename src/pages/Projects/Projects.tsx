import React, {useState} from 'react'
import ProjectsComponent from '../../components/projects/projectsComponent';
import GetQuotes from "../../components/getQuotes/GetQuotes"
import styles from './Projects.module.css'
import Loader from "../../components/Loader/Loader"


const Projects = () => {
  const [loading, setLoading] = useState(true);

  

  return (
   <div>
  <section className={styles.hero}>
    <div className={styles.container}>

      <div className={styles.container_text}>
        <h1>We Deliver the best app products research</h1>
      </div>
    </div>
  </section>
  <section className= {styles.bg}>
    <ProjectsComponent />
    <GetQuotes />
  </section>

</div>

  

  
   

  )
}

export default Projects