/* eslint-disable @next/next/no-img-element */
'use client'
import Navbar from './components/frontend/Navbar'
import Footer from './components/frontend/Footer'

export default function Home(props) {
  return (
    <>
      <Navbar />

      {/* banner starts */}
      <div className='w-100 bg-banner'>
        <div className='w-50'>
          <div className='text-center banner-text'>Empower Your Digital Presence with Expert Web Solutions</div>
        </div>
        <div className='w-50'>
          <div className='text-center banner-icon'><i className="fa-brands fa-battle-net fa-beat fa-2xl"></i></div>
        </div>
      </div>
      {/* banner ends */}

      {/* section 1 starts */}
      <div className="container mt-5">
        <div className="row">
          <center>
            <div className='fs-5 mb-4'>PN INFOSYS is a leading global business consulting and IT service company, Whether you need to run your business more efficiently or accelerate revenue growth, PN INFOSYS can get you there.
            </div>
          </center>
          <div className="col-md-3 mt-4">
            <div className='card-body-custom'>
              <center>
                <div className='card-img-custom'>
                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/home-%3Efeature%2Fcollaborative1.jpg?alt=media&token=b8ce06a7-a1c9-41e7-a4ed-3e65be127f11" className='w-100' alt="" />
                </div>
                <div className='my-3 fs-5'>Collaborative Spirit</div>
                <div>We believe in developing true partnerships and making clients happy.</div>
              </center>
            </div>
          </div>
          <div className="col-md-3 mt-4">
            <div className='card-body-custom'>
              <center>
                <div className='card-img-custom'>
                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/home-%3Efeature%2Fthinking.png?alt=media&token=a4d7e55a-cc39-443b-bcbc-92921ae35f6a" className='w-100' alt="" />
                </div>
                <div className='my-3 fs-5'>Expert Thinking</div>
                <div>We brings robust skill and forward looking perspectives to solve customer challenges.</div>
              </center>
            </div>
          </div>
          <div className="col-md-3 mt-4">
            <div className='card-body-custom'>
              <center>
                <div className='card-img-custom'>
                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/home-%3Efeature%2Fdedication.jpg?alt=media&token=2b6177d8-816a-45d8-acec-ca235232235e" className='w-100' alt="" />
                </div>
                <div className='my-3 fs-5'>Exorbitant Dedication</div>
                <div>PN Infosys is driven to meet client needs with determination and grit.</div>
              </center>
            </div>
          </div>
          <div className="col-md-3 mt-4">
            <div className='card-body-custom'>
              <center>
                <div className='card-img-custom'>
                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/home-%3Efeature%2Ftraining.png?alt=media&token=9f731de1-607f-4ce5-999b-3b5b940a78ae" className='w-100' alt="" />
                </div>
                <div className='my-3 fs-5'>Industrial Training</div>
                <div>We provide free Industrial Internship to novice undergratuates.</div>
              </center>
            </div>
          </div>
        </div>
      </div>
      {/* section 1 ends */}

      {/* section 2 starts */}
      <div className="w-100 py-5 mt-5" style={{ background: '#FCE09B' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className='fs-1'>Learning Environment,Free Internship To Novice Students.</div>
              <div className="row mt-4">
                <div className="col-md-1">
                  <center>
                    <i className='fa-solid fa-laptop fs-3 text-primary'></i>
                  </center>
                </div>
                <div className="col-md-11">
                  <div>WEB DESIGNING</div>
                  <small>Something which makes PN INFOSYS different from other IT companies is that we train novice students and also make them work on Live projects.</small>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-1">
                  <center>
                    <i className='fa-solid fa-desktop fs-3 text-danger'></i>
                  </center>
                </div>
                <div className="col-md-11">
                  <div>WEB DEVELOPMENT</div>
                  <small>Something which makes PN INFOSYS different from other IT companies is that we train novice students and also make them work on Live projects.</small>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-1">
                  <center>
                    <i className='fa-solid fa-mobile-screen fs-3 text-secondary'></i>
                  </center>
                </div>
                <div className="col-md-11">
                  <div>WEB DEVELOPMENT</div>
                  <small>Something which makes PN INFOSYS different from other IT companies is that we train novice students and also make them work on Live projects.</small>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-1">
                  <center>
                    <i className='fa-solid fa-display fs-3'></i>
                  </center>
                </div>
                <div className="col-md-11">
                  <div>WEB DEVELOPMENT</div>
                  <small>Something which makes PN INFOSYS different from other IT companies is that we train novice students and also make them work on Live projects.</small>
                </div>
              </div>

            </div>

            <div className="col-md-6">
              <div className='section-two-icon'>
                <div className='text-center'>
                  <img src="/codingStudent.png" className='codingStudent w-100' alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* section 2 ends */}

      {/* section 3 starts */}
      <div className="container mt-4 mb-4">
        <div className='fs-1 text-center'>News Events</div>
        <div className="row">
          <div className="col-md-4 mt-4">
            <div className='card-body-custom'>
              <center>
                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/home-%3Eclient%2Fe1.jpg?alt=media&token=e6e44a43-8e57-4d03-a8c5-5c120f33f9f0" className='rounded max-width-100 max-height-250px' alt="" />
                <div className='fs-4 my-3'>Workshop by Senior Advisor</div>
                <div>Workshop was enacted by Vaibhav Shrivastava, who is Product Owner at Xiaomi , China. He is our Senior Advisor, he conducted the workhop in which he holistically motivated the team of PN INFOSYS.</div>
              </center>
            </div>
          </div>
          <div className="col-md-4 mt-4">
            <div className='card-body-custom'>
              <center>
                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/home-%3Eclient%2Fe2.jpg?alt=media&token=858212a2-77c6-4932-9a26-06eeccb44168" className='rounded max-width-100 max-height-250px' alt="" />
                <div className='fs-4 mt-3 mb-1'>PNINFOSYS invited as Chief Guest</div>
                <div>Rustamji Institute of Technology, BSF Academy, Tekanpur invited PN INFOSYS as a Cheif Guest in their Software Tech-Fest. Rustamji Institute of Technology.</div>
              </center>
            </div>
          </div>
          <div className="col-md-4 mt-4">
            <div className='card-body-custom'>
              <center>
                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/home-%3Eclient%2Fe5.jpg?alt=media&token=1a40c8b1-c469-48b6-b0ad-608edae9543c" className='rounded max-width-100 max-height-250px' alt="" />
                <div className='fs-4 mt-1'>New Branch opening in Indore</div>
                <div>PN INFOSYS has a new branch in Indore also. It was a grand launch of our new branch in Indore. We are thrilled to announce the grand launch of PN INFOSYS newest branch in the vibrant city of Indore. This marks a significant milestone in our journey.</div>
              </center>
            </div>
          </div>
        </div>
      </div>
      {/* section 3 ends */}

      {/* section 4 starts */}
      <div className="container mt-5 mb-4">
        <div className='fs-1 text-center'>Technologies We Work on</div>
        <div className="row">
          <div className="col-md-3 mt-4">
            <center>
              <i className="fa-solid fa-n fa-beat-fade bg-dark text-white fs-100px rounded-circle p-4 fw-normal"></i>
              <div className='fs-2 my-3'>NEXTJS</div>
            </center>
          </div>
          <div className="col-md-3 mt-4">
            <center>
              <i className="fa-brands fa-react fa-spin react-icon-bg text-white fs-100px rounded-circle p-4 fw-normal"></i>
              <div className='fs-2 my-3'>ReactJS</div>
            </center>
          </div>
          <div className="col-md-3 mt-4">
            <center>
              <i className="fa-brands fa-angular fa-flip bg-danger text-white fs-100px rounded-circle p-4 fw-normal"></i>
              <div className='fs-2 my-3'>AngularJS</div>
            </center>
          </div>
          <div className="col-md-3 mt-4">
            <center>
              <i className="fa-brands fa-laravel fa-shake laravel-icon-bg text-white fs-100px rounded-circle p-4 fw-normal"></i>
              <div className='fs-2 my-3'>Laravel</div>
            </center>
          </div>
        </div>
      </div>
      {/* section 4 ends */}

      <Footer />
    </>
  )
}
