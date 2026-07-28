import { motion } from "framer-motion";

function Button({ children, ...rest }) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="btn-primary"
      {...rest}
    >
      {children}
    </motion.button>
  );
}

export default Button;
