"use client";
import Image from "next/image";
import React from "react";
import logo from "../favicon.ico";
export default function Navbar() {
	return (
		<div className="bg-transparent absolute text-white h-[50px] w-full z-10 flex justify-between">
			<Image src={logo} className="aspect-square" />
			<ul className="flex justify-around items-center h-full w-[200px]">
				<li className="cursor-pointer">
					<p>HOME</p>
				</li>
				<li className="cursor-pointer">
					<p>ABOUT</p>
				</li>
				<li className="cursor-pointer">
					<p>CONTACT</p>
				</li>
			</ul>
		</div>
	);
}
