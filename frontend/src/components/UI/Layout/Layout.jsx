import Nav from "../../Nav/Nav.jsx";
import Footer from "../../Footer/Footer.jsx";
import Main from "../Main/Main.jsx";

const Layout = ({ children }) => {
  return (
    <div
      className="
    min-h-screen w-full dark:bg-dark-400
    "
    >
      <Nav />
      <div className="pt-20"></div>
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};
export default Layout;
