"use client"

import { useState, useEffect, useRef } from "react"

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  delay?: number
  suffix?: string
  prefix?: string
  className?: string
}

export default function CountUp({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  suffix = "",
  prefix = "",
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(start)
  const countRef = useRef<number>(start)
  const [isInView, setIsInView] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isInView) return

    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const currentCount = Math.floor(progress * (end - start) + start)

      countRef.current = currentCount
      setCount(currentCount)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    const timeoutId = setTimeout(() => {
      window.requestAnimationFrame(step)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [start, end, duration, delay, isInView])

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

