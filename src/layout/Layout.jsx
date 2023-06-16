import React from 'react';
import { MdComputer, MdOutlineSportsTennis, MdTv } from 'react-icons/md';
import { Link } from 'react-router-dom';

const size = 25;

const list = [
  { name: 'technology', icon: <MdComputer size={size} /> },
  { name: 'entertainment', icon: <MdTv size={size} /> },
  { name: 'sports', icon: <MdOutlineSportsTennis size={size} /> },
];

export default function Layout({ children, selected }) {
  return (
    <>
      <header className="container mx-auto p-4">
        <div className="border-b border-gray-200">
          <ul className="flex gap-8 flex-wrap -mb-px text-sm capitalize text-center">
            {list.map((item) => (
              <li className="mr-2" key={item.name}>
                <Link
                  to={`/${item.name}`}
                  className={`flex flex-col justify-center items-center gap-2 p-4 border-b-2  rounded-t-lg hover:text-blue-600 hover:border-blue-600  group cursor-pointer
                  ${
                    selected === item.name
                      ? 'text-blue-700 border-blue-700'
                      : 'border-transparent'
                  }
                  `}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <main className="container mx-auto p-8">{children}</main>
    </>
  );
}
