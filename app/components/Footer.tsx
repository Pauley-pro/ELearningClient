import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Image from 'next/image';
import Link from 'next/link'
import React, { useState } from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
    const categories = categoriesData?.layout.categories
    const [category, setCategory] = useState("All");
    const [showAll, setShowAll] = useState(false);

    return (
        <footer>
            <div className="pt-[100px] lg:pt-[100px]">
                <div className="flex items-center justify-center">
                    <div className="border border-[#000000e] w-[95%] dark:border-[#ffffff1e]" />
                </div>
                <br />
                <div className="w-[95%] mx-auto grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-8 border-b-[1.5px] dark:border-[#ffffff1e] border-opacity-20">
                    <div>
                        <Link href="/">
                            <Image
                                src={"https://res.cloudinary.com/polad/image/upload/v1742228489/mindzyte_u9rvtw.png"}
                                alt="logo"
                                height={150}
                                width={150}
                            />
                        </Link>

                        <p className="text-[#000000] text-opacity-50 dark:text-white dark:text-opacity-50">
                            Best online platform for your self-development
                        </p>
                        <div className="flex items-center space-x-4 mt-6">
                            <FaFacebook className="w-6 h-6 text-blue-600" />
                            <FaTwitter className="w-6 h-6 text-sky-500" />
                            <FaYoutube className="w-6 h-6 text-red-700" />
                            <FaInstagram className="w-6 h-6 text-pink-600" />
                        </div>
                    </div>
                    <div>
                        <h1 className="footer__heading">Categories</h1>
                        {categories && categories.slice(0, showAll ? categories.length : 4).map((item: any, index: number) => (
                            <div key={index}>
                                <p
                                    className={`${category === item.title ? "footer__link--active" : "footer__link"} cursor-pointer`}
                                    onClick={() => setCategory(item.title)}
                                >
                                    {item.title}
                                </p>
                            </div>
                        ))}

                        {categories && categories.length > 4 && (
                            <p
                                className="footer__link cursor-pointer underline"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? "See Less" : "See More"}
                            </p>
                        )}

                        {/*{categories && categories.map((item: any, index: number) => (
                        <div key={index}>
                            <p
                                className={`${category === item.title ? "footer__link" : "footer__link"} cursor-pointer`}
                                onClick={() => setCategory(item.title)}
                            >
                                {item.title}
                            </p>
                        </div>
                    ))}*/}
                    </div>
                    <div>
                        <h1 className="footer__heading">Quick Link</h1>
                        <p className="footer__link"><a href="/">Home</a></p>
                        <p className="footer__link"><a href="/about">About</a></p>
                        <p className="footer__link"><a href="/courses">Courses</a></p>
                        <p className="footer__link"><a href="/policy">Policy</a></p>
                        <p className="footer__link"><a href="/faq">FAQ</a></p>
                    </div>
                    <div>
                        <h1 className="footer__heading">Contact Info</h1>
                        <p className="footer__span">Call us: <span className="footer__link">+1-234-567-890</span></p>
                        <p className="footer__span">Mail Us: <span className="footer__link">admin@mindzyte.com</span></p>
                    </div>
                </div>
                <p className="text-center text-black dark:text-white pt-[30px] pb-[30px]">
                    Copyright &copy; {new Date().getFullYear()} Mindzyte | All RIghts Reserved
                </p>
            </div>
        </footer>
    )
}

export default Footer

/*import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
    return (
        <footer>
            <div className="border border-[#000000e] dark:border-[#ffffff1e]" />
            <br />
            <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 pt-[40px] sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-black dark:text-white">About</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/about" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                    Our Story
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-black dark:text-white">Quick Links</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/courses" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link href="/course-dashboard" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                    Course Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-black dark:text-white">Social Links</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="www.youtube.com" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                    YouTube
                                </Link>
                            </li>
                            <li>
                                <Link href="instagram.com" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link href="facebook.com" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                    Facebook
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-black dark:text-white">Contact Info</h3>
                        <p className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                            Call Us: +1-234-567-890
                        </p>
                        <p className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                            Address: XYZ Palace
                        </p>
                        <p className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                            Mail Us: admin@mindzyte.com
                        </p>
                    </div>
                </div>
                <br />
                <p className="text-center text-black dark:text-white pt-[80px] pb-[60px]">
                    Copyright &copy; {new Date().getFullYear()} Mindzyte | All RIghts Reserved
                </p>
            </div>
        </footer>
    )
}

export default Footer*/