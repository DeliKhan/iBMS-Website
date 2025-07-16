'use client'
import { motion } from "motion/react";
import { Highlight } from "../_components/hero-highlight"
import { CircleCheckBig } from "lucide-react";

export function OrderConfirmed() {
  return (
    <div className="flex flex-row gap-x-8 items-center justify-items-center">
        <motion.h1
        initial={{
            opacity: 0,
            y: 20,
        }}
        animate={{
            opacity: 1,
            y: [20, -5, 0],
        }}
        transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
        }}
        className="flex flex-row gap-x-8 text-2xl px-4 py-8 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
        >
            <CircleCheckBig className="text-green-300 size-16"/>
            <Highlight className="text-white">
                Order Confirmed
            </Highlight>
        </motion.h1>
    </div>
  );
}
