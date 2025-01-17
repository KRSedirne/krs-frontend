import React, { useEffect, useState } from 'react';
import { getSaloonImages } from '../../api/block.js';
import { useLocation } from 'react-router-dom';

const SaloonPlan = () => {
  const location = useLocation(); 
  const [saloonImage, setSaloonImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const saloonId = queryParams.get('id');

  useEffect(() => {
    const fetchSaloonImage = async () => {
      try {
        const response = await getSaloonImages(saloonId); // saloonId'yi API'ye gönderiyoruz
        console.log(response);
        setSaloonImage(response.url);
        setLoading(false);
      } catch (error) {
        console.error('Image could not be fetched:', error);
        setLoading(false);
      }
    };

    fetchSaloonImage();
  }, [saloonId]); 
  
  console.log("saloonImage", saloonImage)
  if (loading) {
    return <p>Resim yükleniyor...</p>;
  }

  return (
    <div>
        <img src={saloonImage} alt="Saloon" style={{ width: '100%', height: '480px' }} />
    
    </div>
    
  );
};

export default SaloonPlan;