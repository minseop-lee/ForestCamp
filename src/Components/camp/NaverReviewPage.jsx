import React, { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import "./style/NaverReviewPage.css"
import Pagination from "react-js-pagination";

async function postData(url = "") {
    // 옵션 기본 값은 *로 강조
    const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE 등
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // JSON 응답을 네이티브 JavaScript 객체로 파싱
}

function ReviewComponent({ review }) {
    // console.log('ReviewComponent', review)
    let regStr = review.description.replace(/<[^>]*>?/g, '')

    return (
        <div className="box" onClick={() => { window.open(review.link, '_blank') }}>
            <div className="am">
                <img className="img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAYHSURBVHgB7VuLdtpGEF2BBJiHMdjG0MZp0/7/J9lt48T4gTFvxNPdO9IoipC0IsgYjnTP4SgRy2rm7rx2Vtb64+GbSDAyIuFICRAJR0qASDhSAkTCkRIgEo6UAJFwpASIhCMlYJvBi8VCrNdrcaiAfPhsAz3KINM0xddvd47ymUxGlIpFUS6XRaVcof9/BCDPcDgUo/FIjCcTRz7DMMSn334X+XxeOYcWpSFyc3srFssFTbxarTasoHpaFRfn5/T9PjCRykLpXr//kyy8ELgHWb788adycZQW0JcPYeX//vIX3YOZQYj+cGBdB336+BHBY2fzGZE3m1lXP+B32WyWVq6QL9DVO1f7oS0m06lzrwhLLJVEpVIRhm6N/Xp3J8dMxHA0JJl2IgBMA1AMmM/n4u3tjR5YrVZJqM5LRxIwcIion9WkbQkyz8VyKaKCxw5HI+deQZKQl2QYui463Re6h1U9k8+GcmzmS/lbkIv/l8slIgBE7UzA3A4qWBE85OHxwfmuVCxRHGg1W5KgC4eIbu/VGQNhsUoT20eLJ0XRajUlOSPx9PxEY64aDZqn3X4gwbMZaQWFPMUeUyqFD6Neq9NiYF7M1+v3xFQqysEPC4O49PT8TM9UQUnAzH44mIVwbownY/qACFgDiKjJ1W9LkjhIQmHg5vbG8s2cQaaadfkmmbq8ZxhSHGndmWxGfP50Td/hmZYbLklxnm8g3Q/3YY1ugAzIAII4a4XFAT2K8uyHi7l/igEJU3MqGnIlC4UCBZ8gsOJRAyYUZqUZj0+PjmxecFDM2hayWq9CCQgNkRysoghbkoFI19VZNeNDAEzefU8VuculcuCz3KkQUNUFOydwCFuv1y2z04Kng2V4f8eKevM1MkEYQDasLY60uxMBWAUIghVRgZV0TFQqiQiNoMZYrazvKhHm07M6xRwEPTe2LcoiVYLOYJfZsfIQJAqgbOfl5ad7iP5+QPCMCliepmliILMPECsBbIocC7SM5jxkG+UBmGvrqkkpMQj1Wk2ad3Fr0z6rnpGM4/F4K5mA0NHu0hLIGTm6ntfPt34QgFQZBij+q34NS0CRxovEwU81n64SiCcDCTB7KH9yciIODVisy8tLJ1VzVcnlceDvhAKG7ffMKCLwoQJWicXhCjDKblBJAPtslLLyUGDOTLqifFdBSQCz6C2DDxlTe7dIpbUCSgJeX3t0rckIfSxAQARY9jCEEoD9NPcCvPX4IQNui+CHfYDKdUMJ4OKCewHHhGr1lK7e4suLQAIQ9bkxcUyrz2A3wK4xrJEbSACbDpnTnnp9cQJVLBYOboC+QRACCUBrC6ienopjBVpjgLvF5oUvAairufF4jObP4H5gmBv4EsDdlmM1f4bbDdBf9IMvAT+C3+HV/NuCCznubnvhWyrN7FIybOsaFTA99PLhVleNK2V93u12qf2N1UNjdFcLrMjewqvsUpumfw/R1wLY/6PU0iqgbQ2Lwpzf7r8rx0N5kIY0zIF4FzDhQU3UDQLcO6k4zvzcJBY8qw9FvcHJPT6O+ANLwo4WccCPhA0X4J1ULqbgBzf6fH1NK4oDCwZyc9s+ZGk1m07Exr9RgqOJGlcGggw4sIFuXhfcIGCxsBoJUfbSkQWQiqzza7Iu7vfh8IPhblowUXFmH54rkgUsl1bjI04CgOdOh4IRHYBK13Ifd+HoHRnHtPM1eoONy4aIC0zwyqcW2HByNjtVb35brNdWYxUrDEXpPKFWd2p2BEmOB6uYX8JgC/BL6xsWgH1/WOm4K7CzhBugwcpB9vLigvwTqYoPTOMGSPA7KfYN8whEfFz1HoIg0rszDJ0gS8vLvtObJlxT+EEPEjJuqPIxwHHB0LdvuUd5th/29nIPkxpUkQFcgcYdgMOwNwJg4jB1NFf9dmb0Ko1dgeJ9g31hbwTADyt2DYC9gRd4uwRAoNrnW2fxOpsCeI0GGQaff/77l5otCLao+bH6UHzf/Udt3383iH359/t76ja7AeURqb3vEbw3tI/4w0l+dW5iWj6fz+XohPcjXrjU0r8cTThSAkTCkRIgEo7/AY2UxNn/XWztAAAAAElFTkSuQmCC" />
                <div>
                    <p className="name blogger">{review.bloggername}</p>
                    <p className="name">{review.postdate}</p>
                </div>
            </div>
            <div className="div_desc">
                <p className="descript">{regStr}</p>
            </div>
        </div>
    )
}


function Reviews({ url }) {
    const [response, setResponse] = useState('')
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    let reviews = [];
    useEffect(() => {
        postData(url)
            .then((data) => {
                console.log(data.data); // JSON 데이터가 `data.json()` 호출에 의해 파싱됨
                setResponse(data.data)
            })
            .catch((err) => console.log('err: ', err));
    }, []);
    
    console.log(response)
    response && response.map((review) => (
        reviews.push(
            <ReviewComponent review={review} key={`${review.bloggername} ${review.postdate}`} />
        )
    ))

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setStart((currentPage - 1) * 10);
        setEnd(currentPage * 10);
      };

    return (
        <div>
            <div>
                {reviews.slice(start, end)}
            </div>
                <Pagination
        activePage={currentPage}
        itemsCountPerPage={10}
        totalItemsCount={50}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
        />
        </div>
    )

}

const NaverReviewPage = () => {
    let { campName } = useParams();
    const baseUrl = 'http://13.209.180.103:3000'
    const url = `${baseUrl}/camp/naver_reviews?query=${campName}&&display=50`

    return (
        <div className="main">
            <h2 className="title_h2">네이버 블로그 리뷰</h2>
            <Reviews url={url} />
        </div>
    );
};

export default NaverReviewPage;