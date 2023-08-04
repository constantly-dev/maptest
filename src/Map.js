import { useEffect, useRef, useState } from 'react';
import house from '../src/assets/images/house.png';
import { AxiosGet } from './api/Get';
const Map = () => {
  const [markerData, setMarkerData] = useState([]);
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
    // 지도 객체를 생성하고 container 맵에 추가
    const map = new kakao.maps.Map(container.current, {
      center: new kakao.maps.LatLng(location.center.lat, location.center.lng),
      level: 2,
    });

    // 커스텀 마커 이미지를 생성
    const customMarkerImage = new kakao.maps.MarkerImage(
      house,
      new kakao.maps.Size(64, 69),
      {
        offset: new kakao.maps.Point(27, 69),
      }
    );

    // 마커 객체를 생성
    const markerPosition = new kakao.maps.LatLng(
      location.center.lat,
      location.center.lng
    );
    const markerTest = new kakao.maps.Marker({
      map: map,
      position: markerPosition,
      image: customMarkerImage, // 커스텀 마커 이미지를 설정
    });

    // 마커를 container 맵에 추가
    markerTest.setMap(map);

    // return () => {
    //   // 컴포넌트 언마운트 시 마커를 지도에서 제거
    //   markerTest.setMap(null);
    // };
  }, [location.center.lat, location.center.lng]);

  useEffect(() => {
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
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

  // GET api 작성 부분----------------------
  useEffect(() => {
    const fetchData = async () => {
      const data = await AxiosGet({ getData: setMarkerData });
      // AxiosGet 함수에서 데이터를 가져오고, getData 콜백을 통해 markerData state 업데이트
    };
    fetchData();
  }, []);
  // --------------------------------
  return (
    <>
      <div
        style={{
          width: '50%',
          height: '600px',
        }}
        ref={container}
      >
        {!location.isLoading && (
          <div>
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
