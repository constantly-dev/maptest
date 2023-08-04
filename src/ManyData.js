import { styled } from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { LocationData } from './assets/data/LocationData';

const ManyData = () => {
  const { kakao } = window;
  const container = useRef(null);

  useEffect(() => {
    const map = new kakao.maps.Map(container.current, {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 2,
    });
    var imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    LocationData.map((data) => {
      var imageSize = new kakao.maps.Size(24, 35);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const latitude = parseFloat(data.latitude);
      const longitude = parseFloat(data.longitude);
      const markerLocation = new kakao.maps.LatLng(latitude, longitude);

      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: markerLocation, // 마커를 표시할 위치
        title: data.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
      marker.setMap(map);
    });
  }, []);

  return (
    <MapContainer ref={container}>
      {/* {!location.isLoading && (
        <div>
          <div style={{ padding: '5px', color: '#000' }}>
            {location.errMsg ? location.errMsg : '여기에 계신가요?!'}
          </div>
        </div>
      )} */}
    </MapContainer>
  );
};

const MapContainer = styled.div`
  width: 50%;
  height: 600px;
`;
export default ManyData;
