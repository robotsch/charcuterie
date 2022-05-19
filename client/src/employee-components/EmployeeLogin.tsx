function EmployeeLogin() {
  return (
    <div class="container-md">
      <h3>Login</h3>
      <form action="/api/login" method="post">
        <div class="form-group mb-3">
          <label for="email" class="form-label">
            Username
          </label>
          <input
            type="username"
            class="form-control"
            id="username"
            name="username"
          />
          <div class="invalid-feedback">Please enter a valid username</div>
        </div>
        <div class="form-group mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
          />
          <div class="invalid-feedback">Please enter your password</div>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EmployeeLogin;
