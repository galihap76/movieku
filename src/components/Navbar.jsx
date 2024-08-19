export default function Navbar() {
  return (
    <div>
      <nav
        className="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="bi bi-film me-2"></i>
            Movieku
          </a>
        </div>
      </nav>
    </div>
  );
}
