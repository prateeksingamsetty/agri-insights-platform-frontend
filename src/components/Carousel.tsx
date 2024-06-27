import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import CustomImage from './CustomImage'; // Adjust path as necessary

const Carousel: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'agriculture',
            apiKey: 'c4ebc4dac9f64f9eba06df325151ad2a',
            pageSize: 10
          }
        });
        setNews(response.data.articles);
      } catch (error) {
        setError('Error fetching news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Latest Agriculture News</h2>
      <Swiper
        spaceBetween={16}
        slidesPerView={4}
        navigation
        breakpoints={{
          1024: { slidesPerView: 4 },
          768: { slidesPerView: 2 },
          640: { slidesPerView: 1 },
        }}
      >
        {news.map((article, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <CustomImage
                src={article.urlToImage || '/default-image.png'}
                alt={article.title}
                width={500}
                height={300}
                className="object-cover w-full h-48 md:h-64 lg:h-80" // Example of className usage
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-gray-700 mb-4">{article.description}</p>
                <a href={article.url} className="text-blue-500 hover:underline cursor-pointer">
                  Read more
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
