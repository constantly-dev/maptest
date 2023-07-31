import { useEffect, useRef, useState } from 'react';
const Map = () => {
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
  const marker = useRef(null);
  const markerPosition = new kakao.maps.LatLng(
    location.center.lat,
    location.center.lng
  );
  const markerTest = kakao.maps.Marker({
    position: markerPosition,
  });
  markerTest.setMap(marker);
  useEffect(() => {
    new kakao.maps.Map(container.current, {
      center: new kakao.maps.LatLng(location.center.lat, location.center.lng),
      level: 3,
    });
    return () => {};
  }); // 의존성 배열..?
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
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
        errMsg: '사용 못함',
        isLoading: false,
      }));
    }
  }, []);
  return (
    <>
      <div // 지도를 표시할 Container
        style={{
          width: '50%',
          height: '600px',
        }}
        ref={container}
      >
        {!location.isLoading && (
          <div ref={marker}>
            <div style={{ padding: '5px', color: '#000' }}>
              {location.errMsg ? location.errMsg : '여기에 계신가요?!'}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Map;
