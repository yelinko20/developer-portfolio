import { navLinks } from "@/Data/Data"
import {usePathname} from "next/navigation"
import Link from "next/link";
import { motion } from "framer-motion";
import {HiOutlineMenuAlt4,HiX} from "react-icons/hi"
import {AiFillGithub,AiFillInstagram,AiFillTwitterCircle} from "react-icons/ai"
import { useEffect, useState } from "react";
export default function Navbar() {
  const [showMenu,setShowMenu] = useState<boolean>(false)
  const [navScroll,setNavScroll] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    function scrollActive() {
      setNavScroll(window.scrollY > 20)
    }
    window.addEventListener("scroll", scrollActive)
    return () => window.removeEventListener("scroll", scrollActive)
  },[])
  const menuVariants = {
    hidden: {
      scale: 0
    },
    visible: {
      scale: 40,
      transition: {
        type: "tween",
        duration: 0.5
      }
    }
  }
  const navLinkVariants = {
    hidden: {
      display: "none",
      opacity: 0
    }, 
    visible: {
      opacity: 1,
      y: -30,
      transition: {
        delay: 0.7
      }
    }
  }
  const isActive = (path: string) => (
    pathname === path ? "text-Orange" : "text-WhiteGray"
  )
  const socialClassNames = "text-3xl cursor-pointer text-White"
  return (
    <header className={`fixed w-full top-0 left-0 z-20 ${navScroll ? "bg-Glass backdrop-blur-sm" : ""}`}>
      <nav className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${showMenu ? "hidden" : ""}`}>
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-3xl text-WhiteGray">Mozorozov</Link>
          <div className="hidden md:flex items-center justify-center space-x-4">
            {navLinks.map(navLink => (
              <Link key={navLink.path} href={navLink.path} className={`text-lg uppercase font-medium TextShadow ${isActive(navLink.path)}`}>
                {navLink.label}
              </Link>
            ))}
          </div>
          <div className="flex md:hidden items-center">
            <HiOutlineMenuAlt4 className="text-White cursor-pointer w-6 h-6" onClick={() => setShowMenu(!showMenu)}/>
          </div>
        </div>
      </nav>
      <motion.div variants={menuVariants} initial="hidden" animate={showMenu ? "visible": "hidden"}  className="bg-Black fixed top-0 right-0 w-16 h-16 rounded-full"></motion.div>
      <motion.nav variants={navLinkVariants} animate={showMenu ? "visible" : "hidden"} className="h-screen md:hidden flex flex-col justify-center">
        {navLinks.map(navLink => (
          <Link key={navLink.label} href={navLink.path} className={`block px-3 py-2 text-5xl font-medium ${isActive(navLink.path)}`} onClick={(prev) => setShowMenu(!prev)}>
            {navLink.label}
          </Link>
        ))}
        <div className="fixed bottom-4 left-6 flex items-center flex-col gap-4">
          <Link href="https://www.github.com">
            <AiFillGithub className={socialClassNames}/>
          </Link>
          <Link href="https://www.instagram.com">
            <AiFillInstagram className={socialClassNames}/>
          </Link>
          <Link href="https://www.twitter.com">
            <AiFillTwitterCircle className={socialClassNames}/>
          </Link>
        </div>
        <HiX className="absolute text-White top-20 right-8 w-6 h-6 cursor-pointer" onClick={(prev) => setShowMenu(!prev)}/>
      </motion.nav>
    </header>
  )
}
