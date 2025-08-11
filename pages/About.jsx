import React from 'react';
import '../src/App.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const About = () => {
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    padding: '80px 20px',
    background: 'linear-gradient(to left, #fff,rgb(236, 166, 96))',
    color: '#333',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    borderBottom: '2px solid #333',
    display: 'inline-block',
    marginBottom: '20px',
  };

  const sectionStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    paddingBottom: '40px',
  };

  const paragraphStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    textAlign: 'justify',
  };

  const listStyle = {
    textAlign: 'left',
    margin: '20px auto',
    maxWidth: '700px',
  };

  const teamContainerStyle = {
    backgroundColor: '#fff8e7',
    padding: '40px 20px',
    borderRadius: '10px',
     height:'1480px',
    width:'1413px'
  };

  const teamHeadingStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const teamCardContainer = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '40px',
    margin: 'auto',
    padding:'30px'
  };

  const teamCardStyle = {
    backgroundColor: '#ffe8bb',
    padding: '40px',
    borderRadius: '20px',
    width: '373px',
    height:'571.8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
    border: '2px solid #ccc'
  };

  const nameStyle = {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#ff7f00',
  };

  const roleStyle = {
    color: '#ff7f00',
    fontWeight: '500',
    marginBottom: '10px',
  };

  const imageStyle = {
    width: '133px',
    height: '133px',
    objectFit: 'cover',
    borderRadius: '50%',
    margin: '0 auto',
    display : 'block'
  };

  return (
    <>
    <Header/>
    <div style={containerStyle}>
      <section style={sectionStyle}>
        <h2 style={headingStyle}>ABOUT US</h2>
        <p style={paragraphStyle}>
          Skillzage brand is owned and operated by Learning Bee Education Private Limited. Young to-be graduates are
          our primary audience, and our solutions shall have direct relationships with our users. We focus on providing
          the essential non-technical skills essential in the corporate world. These skills combine soft, behavioural,
          and social skills and will help young to be graduates to be industry-ready. Professionals already in the
          workplace will also benefit from our platform. Whether they want to change jobs, seek promotions, or keep
          themselves updated with the changing corporate world demands, our platform will help them maximise their
          potential and secure career growth.
        </p>
        <p style={paragraphStyle}>
          Our pedagogy experts ensure that the content is optimised for learning and retention. To ensure the retention
          and practice of knowledge, we have multiple tools, including live sessions, events, grooming webinars and
          more. Users can access our platform from anywhere and improve their skills.
        </p>
      </section>

      <section style={teamContainerStyle}>
        <h2 style={teamHeadingStyle}>Our Team</h2>
        <p style={paragraphStyle}>
          Our team has been highly effective and cohesive in achieving many noteworthy milestones for this business.
          Combined with leadership composed of promoters, everything has fallen into the right place considering factors
          that are when referring to the distinctive scenarios and conditions.
        </p>

        <div style={teamCardContainer}>
          <div style={teamCardStyle}>
            <img
              src="https://static.wixstatic.com/media/7830c3_106522214c27428dabf4af0b345d5681~mv2.jpg/v1/fill/w_133,h_133,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/jCUVhnleSUaPMwFTyyco_Debadarsan.jpg"
              alt="Debadarsan Mohanty"
              style={imageStyle}
            />
            <p style={nameStyle}>Mr. Debadarsan Mohanty</p>
            <p style={roleStyle}>(Co-Founder & CEO)</p>
            <p style={paragraphStyle}>
              Debadarsan Mohanty has over 19 years of industry experience. He has lived and worked in the EMEA, NA and
              APAC regions. His expertise is in Management Consulting, Strategy and Innovation.
            </p>
          </div>

          <div style={teamCardStyle}>
            <img
              src="https://static.wixstatic.com/media/7830c3_962e2f4834d74861807eca21a00c2a7d~mv2.jpeg/v1/crop/x_0,y_1,w_500,h_500/fill/w_133,h_133,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5IyE0gRqanEc4kT374Ak_Sweta_3.jpeg"
              alt="Sweta Bithika Pattnaik"
              style={imageStyle}
            />
            <p style={nameStyle}>Ms. Sweta Bithika Pattnaik</p>
            <p style={roleStyle}>(Co-Founder & HR Specialist)</p>
            <p style={paragraphStyle}>
              Sweta Pattnaik is an avid learner and has done her Master's in English, MBA in HR and Operations and
              cleared her Masters of Laws exam. She has over 10 years of experience in resource management, training in
              soft skills, grooming and team building.
            </p>
          </div>

          <div style={teamCardStyle}>
            <img
              src="https://static.wixstatic.com/media/7830c3_90354a8c66e64dd199ba998b9fd978f8~mv2.jpeg/v1/fill/w_133,h_133,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/tfvf4duDSRS9tdkm3DzQ_Soumya_2.jpeg"
              alt="Sowmya Sarita Pattanaik"
              style={imageStyle}
            />
            <p style={nameStyle}>Ms. Sowmya Sarita Pattanaik</p>
            <p style={roleStyle}>(Chief Marketing Officer)</p>
            <p style={paragraphStyle}>
              Soumya Sarita Pattnaik comes with an MBA in Marketing and Finance and has over 12 years of experience in
              the financial and banking sector. Her areas of expertise are Marketing, Finance, Customer Service and
              Compliance.
            </p>
          </div>

          <div style={teamCardStyle}>
            <img
              src="https://static.wixstatic.com/media/7830c3_659653f062794a26a0cbece69e7b7c8f~mv2.jpeg/v1/fill/w_133,h_133,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/tsvVIauQ4OF9WJ1nJzOA_Atasi_Mam.jpeg"
              alt="Sowmya Sarita Pattanaik"
              style={imageStyle}
            />
            <p style={nameStyle}>Prof. Atasi Mohanty</p>
            <p style={roleStyle}>(Mentor & Guide)</p>
            <p style={paragraphStyle}>
            Prof. Atasi Mohanty is part of the Centre of Education Technology, IIT Kharagpur, and has a rich experience in Educational Psychology, Curriculum &amp; Pedagogy, Teacher Education &amp; Professional Development, Positive Mental Health &amp; Wellbeing, Psychology of Learning, Education for Sustainable Development, HR &amp; Sustainability amongst many more. Her invaluable input has helped us shape the courses and design the curriculum.
            </p>
          </div>
          <div style={teamCardStyle}>
            <img
              src="https://static.wixstatic.com/media/7830c3_6436ab542d294ceb8288f11dd8a6052d~mv2.jpg/v1/crop/x_2,y_0,w_1440,h_1440/fill/w_133,h_133,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/YEXTMd3T3ucyuqRTg2xk_Srijalina_Datta_2.jpg"
              alt="Sowmya Sarita Pattanaik"
              style={imageStyle}
            />
            <p style={nameStyle}>Ms. Srijalina Dattak</p>
            <p style={roleStyle}>(Content Analyst)</p>
            <p style={paragraphStyle}>
            Srijalina is our Content Research Analyst. She has a Master's in Applied Psychology with a specialization in Counselling. A teacher at heart, she is passionate about working for young students. She is also a counselling psychologist and a teacher with an aspiration to bring positive changes in her students with the application of knowledge. In her spare time, she loves to read books.
            </p>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};


export default About;