import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { AiOutlineLike } from "react-icons/ai"
import { BiHide } from "react-icons/bi"

export default function Card({ data, hidePost }) {

  const [likes, setLikes] = useState([])


  useEffect(() => {
    if (localStorage.getItem('likes')) {
      let t = JSON.parse(localStorage.getItem('likes'));
      setLikes(t)
    }
  }, [])


  function likePost(title) {
    if (localStorage.getItem('likes')) {
      let likes = JSON.parse(localStorage.getItem('likes'));
      if (!likes.includes(title)) {
        likes.push(title);
      }
      setLikes(likes)
      localStorage.setItem('likes', JSON.stringify(likes));
    } else {
      let likes = [title];
      setLikes(likes)
      localStorage.setItem('likes', JSON.stringify(likes));
    }
  }

  function dislikePost(title) {
    if (localStorage.getItem('likes')) {
      let likes = JSON.parse(localStorage.getItem('likes'));
      let newArr = likes.filter((item) => item !== title);
      setLikes(newArr)
      localStorage.setItem('likes', JSON.stringify(newArr));
    }
  }



  return (
    <>
      <div className="w-full lg:max-w-md h-[560px] border border-gray-200 rounded-lg shadow p-2 relative">
        <a href={data.url} target="_blank" rel="noreferrer">
          <img
            className="rounded-t-lg h-64 object-cover rounded w-full"
            src={data.urlToImage}
            alt={data.source.name}
            loading='lazy'
          />
          <div className="p-5">
            <h3 className="mb-2 text-xl font-medium tracking-tight">{data.title}</h3>
            {
              data.author && (
                <span className='bg-gray-500 my-2 rounded  p-1 text-xs text-white' >{data.author}</span>
              )
            }
            <span className='bg-gray-500 my-2 rounded  p-1 text-xs text-white ml-2' >
              {moment(data.publishedAt).format('ll')}
            </span>
            <div className='mt-4 flex flex-row-reverse gap-4 absolute right-4 bottom-6'  >
              <button className='flex gap-1 items-center bg-gray-500 text-white rounded px-4 py-1'
                onClick={(e) => {
                  e.preventDefault()
                  hidePost(data.title)
                }}
              >
                <BiHide size={20} />
                hide
              </button>
              {
                likes.includes(data.title) ? (
                  <>
                    <button className='flex gap-1 items-center border text-white bg-red-600 rounded px-4 py-1'
                      onClick={(e) => {
                        e.preventDefault()
                        dislikePost(data.title)
                      }}
                    >
                      <AiOutlineLike size={20} />
                      Liked
                    </button>
                  </>

                ) : (
                  <button className='flex gap-1 items-center border border-red-600 text-red-600 rounded px-4 py-1'
                    onClick={(e) => {
                      e.preventDefault()
                      likePost(data.title)
                    }}
                  >
                    <AiOutlineLike size={20} />
                    Like
                  </button>
                )
              }
            </div>
          </div>
        </a>
      </div>
    </>
  );
}
