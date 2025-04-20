const GetConnected = () => {
  return (
    <section className="get-connected-section">
      <div className="get-connected-text">
        <h2>
          The first step in your relationship with Christ starts with identity.
          Tap in with our community!
        </h2>
      </div>

      <form className="get-connected-form">
        <div className="form-row">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="City" required />

        <div className="form-row">
          <select required>
            <option value="">-Select State-</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
          </select>
          <select required>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <select required>
          <option value="">How did you hear about us?</option>
          <option value="friend">From a Friend</option>
          <option value="social">Social Media</option>
          <option value="church">Church</option>
        </select>

        <div className="captcha-placeholder">
          <input type="checkbox" required /> I'm not a robot
        </div>

        <button type="submit" className="connect-btn">Get Connected</button>
      </form>
    </section>
  );
};

export default GetConnected;
