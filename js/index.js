
window.onload = async () => {
  try {
    await loadHTML("header", "layout/header.html");
    await loadHTML("main", "layout/main.html");
    await loadHTML("footer", "layout/footer.html");

    let address = '제주특별자치도 제주시 첨단로 330';
    const coordinates = await getCoordinatesByAddress(address);
    initMap(coordinates.x, coordinates.y);

  } catch (error) {
    console.error("error!!!!!! :"+error);
  }
}

const loadHTML = (id, filename) => {
  return fetch(filename)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}
const initMap = (x , y) => {
  const mapContainer  = document.getElementById('map');

  const mapOption  = {
    center: new kakao.maps.LatLng(y , x),
    level: 3
  };
  const map = new kakao.maps.Map(mapContainer , mapOption);

  const markerPosition  = new kakao.maps.LatLng(y, x);
  const marker = new kakao.maps.Marker({
    position: markerPosition
  });

  marker.setMap(map);

}


const getCoordinatesByAddress = (address) => {
  return new Promise((resolve, reject) => {
    // 주소-좌표 변환 객체를 생성
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve({
          x: result[0].x, // 경도
          y: result[0].y  // 위도
        });
      } else {
        reject(new Error('주소 검색 실패'));
      }
    });
  });
}

const closeModal = () => {
  const modal = document.querySelector('#modal');
  modal.close();
}

document.addEventListener('click', (event) =>{

  if (event.target.matches('#modal')){
    const dialogDimensions = event.target.getBoundingClientRect();
    if (
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom
    ) {
      event.target.close();
    }
  }
});


  document.addEventListener('submit', (event) => {

  if (event.target.matches('form[name="subscription_frm"]')) {
    event.preventDefault();
    const email = event.target.email;
    if(isValidEmail(email.value)){
      const modal = document.querySelector('#modal');
      modal.showModal();
    } else {
      alert("이메일을 다시 입력하세요!")
      email.focus();
    }
    email.value="";
  }
});

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

window.addEventListener('scroll', () => {

  const scroll_top_btn = document.querySelector('#scroll_top_btn');
  if (window.scrollY > 1) {
    scroll_top_btn.style.visibility="visible";
  } else {
    scroll_top_btn.style.visibility="hidden";
  }
});

//성능을 고려한 쓰로틀링을 사용하였지만 limit 시간을 줄여봐도 원활이 작동이 되지 않음 //추후 리펙토링 시 확인
// const throttle =(func, limit) => {
//   let inThrottle;
//   return function() {
//     const args = arguments;
//     const context = this;
//     //console.log(inThrottle);
//     if (!inThrottle) {
//       func.apply(context, args);
//       inThrottle = true;
//       setTimeout(() => inThrottle = false, limit);
//     }
//   }
// }
//
// const handleScroll = () => {
//   const scrollTopBtn = document.querySelector('#scroll_top_btn');
//   console.log(scrollTopBtn.style.visibility);
//   console.log(window.scrollY);
//   if (window.scrollY > 1) {
//     scrollTopBtn.style.visibility = "visible";
//   } else {
//     scrollTopBtn.style.visibility = "hidden";
//   }
// }
//
// window.addEventListener('scroll', throttle(handleScroll, 200));

const toTop = () => {
  window.scrollTo({
    top: 0
     , behavior: 'smooth'
  });
};
