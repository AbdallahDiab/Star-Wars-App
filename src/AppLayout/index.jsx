import { useLocation } from "react-router-dom";
import Header from "../components/header";

export default function AppLayout({ children }) {
  const routesWithoutLayout = ["/login"];
  const location = useLocation();
  const showLayout = !routesWithoutLayout.includes(location.pathname);
  if (showLayout) {
    return (
      <>
        <Header />
        <main>{children}</main>
      </>
    );
  }
  return children;
}
