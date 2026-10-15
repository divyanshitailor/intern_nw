import './contact.css';

export default function Contact() {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been received.');
    e.target.reset();
  };

  return (
    <main className="contact-page">

      {/* ================= HERO ================= */}

      <section className="contact-hero">
        <div className="container">

          <span className="contact-eyebrow">
            ✦ GET IN TOUCH
          </span>

          <h1>
            Let's start a
            <br />
            <em>conversation.</em>
          </h1>

          <p>
            Have a question about a property, listing or RentNest?
            We're here to help.
          </p>

        </div>
      </section>


      {/* ================= CONTACT CONTENT ================= */}

      <section className="contact-section">

        <div className="container">

          <div className="row g-5 align-items-start">

            {/* LEFT INFORMATION */}

            <div className="col-lg-5">

              <div className="contact-info">

                <span className="contact-section-label">
                  CONTACT US
                </span>

                <h2>
                  We're here when
                  <br />
                  you need us.
                </h2>

                <p className="contact-description">
                  Whether you're looking for your next home or need help
                  with a property listing, send us a message and our team
                  will get back to you.
                </p>


                <div className="contact-details">

                  <div className="contact-detail">

                    <div className="contact-icon">
                      @
                    </div>

                    <div>
                      <span>Email</span>
                      <strong>hello@rentnest.com</strong>
                    </div>

                  </div>


                  <div className="contact-detail">

                    <div className="contact-icon">
                      ⌖
                    </div>

                    <div>
                      <span>Location</span>
                      <strong>India</strong>
                    </div>

                  </div>


                  <div className="contact-detail">

                    <div className="contact-icon">
                      ◷
                    </div>

                    <div>
                      <span>Availability</span>
                      <strong>Mon — Fri · 9AM — 6PM</strong>
                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* FORM */}

            <div className="col-lg-7">

              <div className="contact-card">

                <div className="contact-card-header">

                  <div>
                    <span>DROP US A LINE</span>
                    <h3>Send a message</h3>
                  </div>

                  <div className="contact-card-number">
                    01
                  </div>

                </div>


                <form onSubmit={handleSubmit}>

                  <div className="row g-4">

                    <div className="col-md-6">

                      <div className="contact-field">

                        <label>Your name</label>

                        <input
                          type="text"
                          placeholder="John Doe"
                          required
                        />

                      </div>

                    </div>


                    <div className="col-md-6">

                      <div className="contact-field">

                        <label>Email address</label>

                        <input
                          type="email"
                          placeholder="name@example.com"
                          required
                        />

                      </div>

                    </div>


                    <div className="col-12">

                      <div className="contact-field">

                        <label>Subject</label>

                        <input
                          type="text"
                          placeholder="How can we help?"
                          required
                        />

                      </div>

                    </div>


                    <div className="col-12">

                      <div className="contact-field">

                        <label>Message</label>

                        <textarea
                          rows="5"
                          placeholder="Tell us a little about what you need..."
                          required
                        ></textarea>

                      </div>

                    </div>


                    <div className="col-12">

                      <button
                        type="submit"
                        className="contact-submit"
                      >
                        Send message
                        <span>→</span>
                      </button>

                    </div>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= BOTTOM CTA ================= */}

      <section className="contact-bottom">

        <div className="container">

          <div className="contact-bottom-box">

            <div>

              <span>
                LOOKING FOR A HOME?
              </span>

              <h2>
                Your next place
                <br />
                could be <em>closer than you think.</em>
              </h2>

            </div>

            <a
              href="/properties"
              className="contact-explore"
            >
              Explore properties
              <span>→</span>
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}
