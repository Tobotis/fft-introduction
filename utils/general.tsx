import React from 'react'

export function arraysEqual(a: Array<any>, b: Array<any>) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export type Alignment = 'r' | 'l' | 't' | 'b' | 'tl' | 'tr' | 'br' | 'bl' | 'c'

export function alignmentToRelativeDeviationFromCenter(
  alignment: Alignment
): Array<number> {
  switch (alignment) {
    case 'c':
      return [0, 0]
    case 'r':
      return [-0.5, 0]
    case 'l':
      return [0.5, 0]
    case 't':
      return [0, -0.5]
    case 'b':
      return [0, 0.5]
    case 'tl':
      return [0.5, -0.5]
    case 'bl':
      return [0.5, 0.5]
    case 'tr':
      return [-0.5, -0.5]
    case 'br':
      return [-0.5, 0.5]
    default:
      return [0, 0]
  }
}

export interface HTMLStyleObject {
  transform?: string
  width?: string
  height?: string
  display?: string
  verticalAlign?: string
}

export default function useOnScreen(ref: any) {
  const [isIntersecting, setIntersecting] = React.useState(false)

  if (typeof window !== 'undefined') {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    )
    React.useEffect(() => {
      observer.observe(ref.current)
      // Remove the observer as soon as the component is unmounted
      return () => {
        observer.disconnect()
      }
    }, [])
  }

  return isIntersecting
}
