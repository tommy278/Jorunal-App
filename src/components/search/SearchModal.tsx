"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode
}

export default function AnimatedModal({isOpen, onClose, children}: ModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="backdrop"
                    initial = {{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    style ={{
                        position: "fixed",
                        inset: 0,
                        background: "black",
                        zIndex: 50,
                    }}>
                        <motion.div
                            key="modal"
                            initial={{ scale: 0.8, opacity: 0}}
                            animate={{ scale: 1, opacity: 1}}
                            exit={{ scale: 0.8, opacity: 0}}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                position: "absolute",
                                top: "20%",
                                left: "30%",
                                transform: "translate(-50%, -50%)",
                                background: "white",
                                color: "black",
                                padding: "2rem",
                                borderRadius: "10px",
                                width: "50%",
                                maxWidth: "500px",
                                zIndex: 51
                            }}>
                                {children}
                            </motion.div>
                    </motion.div>
            )}
        </AnimatePresence>
    )
}