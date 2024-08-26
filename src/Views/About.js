import '../styles/about.css'


function About() {
    return(
        <div className="about-container">
            <h1 id='about-heading'>
                About us
            </h1>
            <main className="about-main">
            <section className="about-section" id="introduction">
                <h2>Welcome to Our Music Production Community</h2>
                <p>At our website, we are passionate about music production. We provide a platform for musicians and producers to create, share, and discover high-quality music samples. Our community is dedicated to fostering creativity and collaboration among music enthusiasts of all levels.</p>
            </section><br/>
            <section className="about-section" id="samples">
                <h2>Explore and Upload Samples</h2>
                <p>Our extensive library of samples is constantly growing, thanks to the contributions of talented artists like you. Whether you are looking for the perfect beat, a unique sound, or a complete music kit, you will find an array of options to suit your needs. Join us today and start sharing your creations with the world!</p>
            </section>
            </main>
      </div>
    );
}

export default About;