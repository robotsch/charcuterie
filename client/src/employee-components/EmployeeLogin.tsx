export default function EmployeeLogin() {
  return (
    <div className="container-md">
      <h3>Login</h3>
      <form action="/api/login" method="post">
        <div className="form-group mb-3">
          <label for="email" className="form-label">
            Username
          </label>
          <input
            type="username"
            className="form-control"
            id="username"
            name="username"
          />
          <div className="invalid-feedback">Please enter a valid username</div>
        </div>
        <div className="form-group mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
          <div className="invalid-feedback">Please enter your password</div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}