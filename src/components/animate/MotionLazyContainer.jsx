import { LazyMotion } from "framer-motion";

// ----------------------------------------------------------------------

const loadFeatures = () => import("./features.js").then((res) => res.default);

export default function MotionLazyContainer({ children }) {
  return (
    <LazyMotion strict features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}
