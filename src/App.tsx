import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AppRoutes from "./routes/routes";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 120,
      easing: "ease-out",
    });

    AOS.refresh();
  }, []);

  return (
    <div>
      <AppRoutes />
    </div>
  );
}
