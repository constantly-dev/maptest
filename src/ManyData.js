import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { LocationData } from './assets/data/LocationData';
import { useState, useEffect } from 'react';

const ManyData = () => {
  const [MmValue, setMnValue] = useState();
  const [nowLocation, setNowLocation] = useState({
    center: {
      lat: 37.571009, //멋사 본사
      lng: 126.9789398,
    },
    errMsg: null,
    isLoading: true,
  });

  //현재 위치
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNowLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setNowLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setNowLocation((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, []);

  return (
    <>
      <Map
        center={{ lat: 37.5007020002887, lng: 127.027820307026 }}
        style={{ width: '500px', height: '450px' }}
        level={2}
        onDragEnd={(map) =>
          // onBoundsChanged : 실시간 , onDragEnd : 이동이 끝나면
          setMnValue({
            sw: map.getBounds().getSouthWest().toString(),
            ne: map.getBounds().getNorthEast().toString(),
          })
        }
      >
        {LocationData.map((item, index) => (
          <MapMarker
            key={index}
            position={{ lat: item.latitude, lng: item.longitude }}
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
              size: {
                width: 24,
                height: 35,
              }, // 마커이미지의 크기입니다
            }}
            title={item.name} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          />
        ))}
        {!nowLocation.isLoading && (
          <MapMarker position={nowLocation.center}>
            <div style={{ padding: '5px', color: '#000' }}>
              {nowLocation.errMsg ? nowLocation.errMsg : '여기에 계신가요?!'}
            </div>
          </MapMarker>
        )}
      </Map>

      {!!MmValue && (
        <>
          <p>
            {'영역좌표는 남서쪽 위도, 경도는  ' + MmValue.sw + ' 이고'}
            <br />
            {'북동쪽 위도, 경도는  ' + MmValue.ne + '입니다'}
          </p>
        </>
      )}
    </>
  );
};
export default ManyData;
