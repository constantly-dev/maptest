import { useEffect, useState, useRef } from 'react';
import { styled } from 'styled-components';
import house from '../src/assets/images/house.png';
import { LocationData } from './assets/data/LocationData';

const MapTest = () => {
  const [location, setLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const { kakao } = window;
  const container = useRef(null);

  useEffect(() => {
    const map = new kakao.maps.Map(container.current, {
      center: new kakao.maps.LatLng(location.center.lat, location.center.lng),
      level: 2,
    });
    const customMarkerImg = new kakao.maps.MarkerImage(
      house,
      new kakao.maps.Size(64, 69),
      {
        offset: new kakao.maps.Point(27, 69),
      }
    );
    const markerLocation = new kakao.maps.LatLng(
      location.center.lat,
      location.center.lng
    );
    const marker = new kakao.maps.Marker({
      map: map,
      position: markerLocation,
      image: customMarkerImg,
    });
    marker.setMap(map);
    //
    // test 여러 마커 구현
    LocationData.map((data) => {
      // 받은 데이터에서 위도,경도로 위치 설정
      const testLocation = new kakao.maps.LatLng(
        parseFloat(data.latitude),
        parseFloat(data.longitude)
      );
      const testMarker = new kakao.maps.Marker({
        map: map,
        position: testLocation,
      });
      testMarker.setMap(map);
    });
    // return () => {
    //   // 컴포넌트 언마운트 시 마커를 지도에서 제거
    //   marker.setMap(null);
    // };
  }, [location.center.lat, location.center.lng]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          setLocation((prev) => ({
            ...prev,
            center: {
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setLocation((prev) => ({
        ...prev,
        errMsg: '현재 위치를 받아올 수 없습니다.',
        isLoading: false,
      }));
    }
  }, []);

  return (
    <MapContainer ref={container}>
      {!location.isLoading && (
        <div>
          <div style={{ padding: '5px', color: '#000' }}>
            {location.errMsg ? location.errMsg : '여기에 계신가요?!'}
          </div>
        </div>
      )}
    </MapContainer>
  );
};

const MapContainer = styled.div`
  width: 50%;
  height: 600px;
`;

export default MapTest;
