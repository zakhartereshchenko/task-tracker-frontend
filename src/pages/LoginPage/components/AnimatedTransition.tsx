import { motion } from "framer-motion"
import { LOGIN_MODE } from "../../../constants/forms"
import type { TLoginMode } from "../../../types/forms";

interface IProps {
    mode: TLoginMode;
    children: React.ReactNode;
}

export const AnimatedTransition: React.FC<IProps> = ({ children, mode }) => {
    return (
        <motion.div
            className="flex w-[200%] h-full"
            animate={{
                x: mode === LOGIN_MODE.SIGN_IN ? "0%" : "-50%",
            }}
            transition={{
                type: "spring",
                stiffness: 140,
                damping: 22,
                mass: 0.9,
            }}
        >
            {children}
        </motion.div>
    )
}