import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { kakao } = window;

function MainLocationGangnam() {
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    // 카카오 맵 호출
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.5054070438773, 127.026682479708),
      level: 2,
    };
    const map = new kakao.maps.Map(container, options);

    // 마커 클러스터러 생성
    const clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      gridSize: 35,
      averageCenter: true,
      minLevel: 6,
      disableClickZoom: true,
      styles: [
        {
          width: "53px",
          height: "52px",
          background: "url(cluster.png) no-repeat",
          color: "#ff5a5a",
          textAlign: "center",
          lineHeight: "54px",
        },
      ],
    });

    // 마커 생성
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(37.5054070438773, 127.026682479708),
    });

    // 정보창
    const infowindow = new kakao.maps.InfoWindow({
      content: `
          <div style="padding:8px;min-width:120px;font-size:14px;">
            <b>SOLTech 강남지점</b><br/>
            서울특별시 강남구 봉은사로 119 성옥빌딩 5층, 6층<br/>
            <span style="color:#888;font-size:12px;">대표전화: 02-1544-0714</span>
          </div>
        `,
    });

    infowindow.open(map, marker);

    clusterer.addMarker(marker);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-[1000px] mx-auto mt-40">
        {/* 본사 / 강남지점 nav */}
        <div className="flex justify-center">
          <ul className="flex gap-x-10">
            <li
              className={`cursor-pointer transition ${
                selected === 0 ? "font-bold text-black border-b-1" : "font-semibold text-gray-400"
              }`}
              onClick={() => setSelected(0)}
            >
              <Link to="/location/jongro" className="text-base">
                <span>종로본사</span>
              </Link>
            </li>
            <li
              className={`cursor-pointer transition ${
                selected === 1 ? "font-bold text-black border-b-1" : "font-semibold text-gray-400"
              }`}
              onClick={() => setSelected(1)}
            >
              <Link to="/location/gangnam" className="text-base">
                <span>강남지점</span>
              </Link>
            </li>
          </ul>
        </div>

        <span className="mt-20 text-3xl font-extrabold">SOLTech 강남지점</span>

        {/* 회사 설명/연락 정보 */}
        <table className="w-full margin-right: calc(2%); margin-left: calc(2%); mt-15">
          <tbody>
            <tr className="h-15">
              <td className="w-[7%] bg-[#6b46c1] text-center align-middle">
                <img
                  src="https://cdn.imweb.me/upload/S202205103bbf37d4d8229/b7c3f52af5125.png"
                  className="h-[37px] inline-block"
                  draggable="false"
                />
              </td>
              <td className="w-[56%] bg-[#f1f1f1]">
                <p className="text-left my-[10px] ml-[30px]">
                  <span className="text-[18px] text-[#795ac2] font-semibold">
                    서울특별시 강남구 봉은사로 119 성옥빌딩 5층, 6층
                  </span>
                </p>
              </td>
              <td className="w-[7%] bg-[#6b46c1] text-center align-middle">
                <img
                  src="https://cdn.imweb.me/upload/S202205103bbf37d4d8229/1446d84e8babe.png"
                  className="h-[37px] inline-block"
                  draggable="false"
                />
              </td>
              <td className="w-[30%] bg-[#f1f1f1]">
                <p className="text-left my-[10px] ml-[30px]">
                  <span className="text-[18px] text-[#795ac2] font-semibold">대표번호 1544-0714</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        {/* 이미지 */}
        <div className="flex mt-25">
          <div className="basis-1/2 flex flex-col gap-y-4 mr-6">
            <div>
              <img src="/mainImages/officeimage/soltech_reception_img.png" alt="reception" />
            </div>
            <div>
              <img src="/mainImages/officeimage/soltech_office_img1.png" alt="reception" />
            </div>
            <div>
              <img src="/mainImages/officeimage/soltech_office_img2.png" alt="office" />
            </div>
          </div>
          <div className="basis-1/2 flex flex-col gap-y-4">
            <div>
              <img src="/mainImages/officeimage/soltech_isle_img.png" alt="office" />
            </div>
            <div>
              <img src="/mainImages/officeimage/soltech_meetingroom_img.png" alt="reception" />
            </div>

            <div>
              <img src="/mainImages/officeimage/soltech_rounge_img.png" alt="office" />
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-center">
          <h3 className="text-[#6b46c1] text-2xl font-bold mb-5">오시는 길</h3>
          <span className="font-semibold">서울특별시 강남구 봉은사로 119 성옥빌딩 5,6층</span>
          <span className="font-semibold">신논현역 3번출구에서 약 200m</span>
        </div>

        {/* 지도 영역 */}
        <div id="map" className="mx-auto mb-30 h-[500px] w-[1000px] mt-15"></div>
      </div>
    </>
  );
}

export default MainLocationGangnam;
