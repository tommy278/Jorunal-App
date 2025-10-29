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
                    animate={{ opacity: 0.85 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black flex items-center justify-center"
                    >
                        <motion.div
                            key="modal"
                            initial={{ scale: 0.8, opacity: 0}}
                            animate={{ scale: 1, opacity: 1}}
                            exit={{ scale: 0.8, opacity: 0}}
                            onClick={(e) => e.stopPropagation()}
                            className="flex flex-col items-center bg-gray-800 h-[80%] w-[84%] max-w-lg p-8
                            translate-y-[1%] rounded-lg shadow-2xl"
                            >
                                {children}
                            </motion.div>
                    </motion.div>
            )}
        </AnimatePresence>
    )
}