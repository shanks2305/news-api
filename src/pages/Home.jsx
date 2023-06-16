import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../component/Spinner';
import { keys } from '../config';
import Layout from '../layout/Layout';

const CardDeck = React.lazy(() => import('../component/CardDeck'))
const SearchComponent = React.lazy(() => import('../component/SearchComponent'))

export default function Category() {
  let { category } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)
  const [slug, setSlug] = useState('')
  const [hidden, setHidden] = useState([])

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    setSlug('')
    fetchData();
  }, [category])

  useEffect(() => {
    if (localStorage.getItem('hided')) {
      let t = JSON.parse(localStorage.getItem('hided'));
      setHidden(t)
    }
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${keys.uri}/top-headlines`, {
        params: {
          apiKey: keys.api_key,
          country: 'in',
          category: category,
          pageSize: 20,
          page: page,
          q: slug
        },
      });
      setData(res.data);
      setLoading(false);
    } catch (error) {
      //handle Logging
      setLoading(false);
    }
  };

  const handlePagination = (action) => {
    let total = Math.ceil(data.totalResults / 20)
    switch (action) {
      case 'inc':
        if (page < total) {
          setPage(page + 1)
        }
        break
      case 'dec':
        if (page > 1) {
          setPage(page - 1)
        }
        break
      default:
        break
    }
  }

  function hidePost(title) {
    if (localStorage.getItem('hided')) {
      let hided = JSON.parse(localStorage.getItem('hided'));
      if (!hided.includes(title)) {
        hided.push(title);
      }
      setHidden(hided)
      localStorage.setItem('hided', JSON.stringify(hided));
    } else {
      let hided = [title];
      setHidden(hided)
      localStorage.setItem('hided', JSON.stringify(hided));
    }
  }




  if (loading) {
    return (
      <>
        <div className="h-screen w-screen flex justify-center items-center">
          <Spinner />
        </div>
      </>
    );
  }


  return (
    <>
      <Layout selected={category}>
        <SearchComponent slug={slug} setSlug={setSlug} handleSearch={fetchData} />
        {
          data && (
            <CardDeck data={data.articles.filter((item) => !hidden.includes(item.title))} handlePagination={handlePagination} currentPage={page} hidePost={hidePost} />
          )
        }
      </Layout>
    </>
  );
}
