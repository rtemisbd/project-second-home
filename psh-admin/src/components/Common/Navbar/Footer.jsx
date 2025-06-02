const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="main-footer text-center">
      <strong>
        Copyright © {year} <a href="https://adminps.psh.com.bd/">PSH Admin</a>.
      </strong>
      <span> All rights reserved.</span>
    </footer>
  );
};

export default Footer;
