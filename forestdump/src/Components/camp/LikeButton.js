import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './style/LikeButton.module.css';
import { Cookies } from 'react-cookie';

function LikeButton(props) {
  axios.defaults.withCredentials = true;
  const cookies = new Cookies();
  const [like, setLike] = useState(false);
  const id = props.campId;
  const auth_token = cookies.get("auth_token")
  useEffect(() => {
    fetchMyPage();
  }, []);

  const fetchMyPage = async () => {
    try {
      if (auth_token === undefined) { return }
      console.log(id)
      const response = await axios.get(`http://awsforestcamp.kro.kr:3000/camp/favor/`, {
        params: {
          campnum: id
        }
      });
      const { rows } = response.data;
      console.log(rows)
      // 상태 업데이트
      if (rows.length > 0) setLike(true)
    } catch (error) {
      console.error("An error occurred:", error);
      // 에러 핸들링
    }
  };

  async function toggleLike() {
    if (cookies.get("auth_token") === undefined) {
      alert("로그인 하시면 좋아요/알림 이 가능합니다.")
      return
    }
    setLike(!like)

    if (like === true) {
      console.log("삭제")
      console.log(id);
      const response = await axios.delete(
        `http://awsforestcamp.kro.kr:3000/camp/favor/`, {
        // headers: {
        //   withCredentials: true
        // },
        data: {
          campnum: id
        }
      });
      const { rows } = response.data;
      // 상태 업데이트
    } else {
      const response = await axios.post(
        `http://awsforestcamp.kro.kr:3000/camp/favor/`,
        { campnum: id },
        // { withCredentials: true }
      );

    }
  }

  return (
    <div onClick={toggleLike} className={`${styles.position}`}>
      {like ? (
        <svg width="100" height="100" viewBox="0 0 1004 564" fill="none" cursor="pointer" xmlns="http://www.w3.org/2000/svg">
          <path d="M999.722 322.35C986.721 319.785 965.752 314.916 968.077 310.573C968.077 310.573 978.376 251.072 981.834 231.027C982.388 227.814 979.569 225.124 976.36 225.693L897.277 239.691C893.382 241.788 889.237 222.354 887.013 209.906C886.265 205.72 881.171 204.119 878.161 207.122C866.243 219.007 849.195 236.042 831.433 254.111C832.738 184.266 833.3 110.576 833.475 83.1837C833.505 78.5132 828.32 75.7709 824.441 78.3726C812.311 86.5052 792.177 99.0509 790.604 93.8548C790.604 93.8548 752.264 39.4649 739.339 21.1511C737.268 18.2157 732.975 18.3158 730.916 21.2595L680.199 93.7916C678.798 98.4598 660.425 86.5469 648.99 78.5787C645.145 75.8996 639.929 78.6216 639.923 83.3077C639.886 110.947 639.88 185.169 640.686 255.246C622.523 236.756 605.008 219.255 592.84 207.12C589.829 204.117 584.735 205.718 583.987 209.904C581.762 222.354 577.617 241.786 573.724 239.69L494.641 225.692C491.43 225.123 488.613 227.814 489.167 231.026C492.624 251.07 502.923 310.572 502.923 310.572C505.249 314.916 484.279 319.784 471.278 322.349C467.12 323.169 465.552 328.255 468.568 331.233C504.206 366.415 587.177 446.922 604.766 456.29C620.559 464.703 639.47 465.323 656.863 462.856L626.809 492.906C620.327 499.388 626.752 510.24 635.552 507.677L734.225 478.924C735.835 478.455 737.545 478.452 739.157 478.917L829.342 507.862C838.455 510.487 844.765 498.892 837.612 492.666L815.53 463.048C832.534 465.284 850.86 464.48 866.232 456.291C883.822 446.923 966.792 366.417 1002.43 331.235C1005.45 328.256 1003.88 323.17 999.722 322.35Z" fill="#F4580B" />
          <path d="M735.689 563.277C732.684 563.277 729.802 562.085 727.676 559.961C725.551 557.837 724.355 554.956 724.352 551.951L724.16 341.81C724.154 335.549 729.225 330.468 735.487 330.463H735.497C738.502 330.463 741.384 331.656 743.51 333.78C745.636 335.904 746.832 338.785 746.835 341.79L747.027 551.931C747.033 558.192 741.962 563.273 735.7 563.277H735.689Z" fill="#FF6F1F" />
          <path d="M189.246 221.262C190.227 223.45 190.265 225.601 189.359 227.715C188.453 229.753 187.019 231.639 185.057 233.375C183.094 235.111 180.83 236.621 178.264 237.904C175.773 239.187 173.396 240.093 171.131 240.621C168.641 241.149 165.999 241.376 163.206 241.3C160.489 241.3 157.734 240.961 154.942 240.281C152.225 239.678 149.545 238.772 146.904 237.564C144.338 236.281 141.96 234.734 139.771 232.923C137.13 230.734 135.054 228.13 133.544 225.111C132.11 222.016 131.054 218.733 130.374 215.261C129.695 211.789 129.318 208.317 129.242 204.846C129.242 201.298 129.356 197.977 129.582 194.883C129.808 192.09 130.374 189.184 131.28 186.165C132.186 183.146 133.431 180.203 135.016 177.335C136.677 174.391 138.639 171.674 140.903 169.183C143.243 166.693 145.96 164.579 149.055 162.843C151.394 161.485 153.998 160.579 156.866 160.126C159.81 159.598 162.754 159.485 165.697 159.786C168.716 160.013 171.547 160.654 174.188 161.711C176.905 162.692 179.207 164.051 181.094 165.787C182.302 166.843 183.547 168.315 184.83 170.202C186.189 172.089 187.17 174.014 187.774 175.976C188.378 177.938 188.378 179.788 187.774 181.524C187.246 183.184 185.736 184.316 183.245 184.92C182.189 185.222 181.245 185.297 180.415 185.146C179.585 184.92 178.83 184.58 178.151 184.127C177.471 183.599 176.83 182.995 176.226 182.316C175.622 181.637 175.056 180.957 174.528 180.278C172.716 178.089 170.603 176.618 168.188 175.863C165.773 175.033 163.357 174.844 160.942 175.297C158.602 175.674 156.376 176.655 154.263 178.24C152.225 179.75 150.64 181.712 149.508 184.127C148.3 186.694 147.319 189.524 146.564 192.618C145.885 195.638 145.507 198.732 145.432 201.902C145.356 204.997 145.621 208.016 146.224 210.959C146.904 213.903 148.036 216.507 149.621 218.771C150.828 220.582 152.3 222.054 154.036 223.186C155.848 224.318 157.772 225.111 159.81 225.564C161.848 226.017 163.886 226.092 165.924 225.79C168.037 225.488 170.075 224.809 172.037 223.752C172.641 223.45 173.282 223.035 173.962 222.507C174.717 221.903 175.471 221.299 176.226 220.695C176.981 220.092 177.736 219.526 178.49 218.997C179.321 218.469 180.189 218.092 181.094 217.865C182.453 217.412 183.925 217.45 185.51 217.978C187.17 218.507 188.415 219.601 189.246 221.262ZM214.171 231.224C214.096 231.602 214.02 231.979 213.945 232.357C213.945 232.658 213.945 232.998 213.945 233.375L213.266 235.753C213.115 236.055 213.001 236.244 212.926 236.319L212.586 236.998C212.209 237.828 211.53 238.508 210.548 239.036C208.737 239.942 206.812 240.168 204.774 239.715C203.491 239.564 202.472 239.187 201.718 238.583C200.963 238.055 200.435 237.413 200.133 236.659C199.831 235.904 199.604 235.149 199.453 234.394C199.227 233.64 199.114 232.96 199.114 232.357V168.957C199.114 168.428 199.114 167.976 199.114 167.598C199.189 167.145 199.265 166.73 199.34 166.353C199.416 165.825 199.491 165.372 199.567 164.994C199.718 164.617 199.869 164.202 200.02 163.749C200.246 162.994 200.661 162.39 201.265 161.938C202.171 161.258 203.039 160.881 203.869 160.805C204.397 160.654 204.888 160.579 205.341 160.579C205.793 160.503 206.322 160.466 206.926 160.466C207.982 160.466 209.19 160.768 210.548 161.371C211.605 161.975 212.36 162.806 212.813 163.862C213.567 165.372 213.945 166.768 213.945 168.051C214.02 168.806 214.058 169.938 214.058 171.447C214.133 172.957 214.171 174.089 214.171 174.844V175.297C214.322 177.712 214.398 180.052 214.398 182.316C214.398 184.505 214.36 186.92 214.284 189.562C214.284 192.128 214.247 194.619 214.171 197.034C214.171 199.374 214.171 201.713 214.171 204.053V227.828C214.171 228.13 214.171 228.432 214.171 228.734C214.247 228.96 214.284 229.224 214.284 229.526C214.284 230.281 214.247 230.847 214.171 231.224ZM237.702 197.373C237.702 199.487 237.702 201.864 237.702 204.506C237.777 207.148 237.815 209.902 237.815 212.771C237.815 215.563 237.815 218.356 237.815 221.148C237.815 223.865 237.777 226.394 237.702 228.734C237.627 229.866 237.513 231.111 237.362 232.47C237.211 233.753 236.91 234.96 236.457 236.093C236.004 237.225 235.287 238.168 234.306 238.923C233.4 239.602 232.155 239.904 230.57 239.829C228.23 239.678 226.532 238.659 225.475 236.772C224.494 234.885 223.928 232.243 223.777 228.847C223.777 227.111 223.739 225.111 223.664 222.847C223.664 220.582 223.626 218.28 223.55 215.941C223.55 213.601 223.55 211.336 223.55 209.148C223.55 206.883 223.55 204.846 223.55 203.034C223.55 201.977 223.513 200.694 223.437 199.185C223.437 197.675 223.475 196.128 223.55 194.543C223.626 192.958 223.814 191.449 224.116 190.015C224.418 188.505 224.909 187.26 225.588 186.278C226.116 185.675 226.871 185.222 227.852 184.92C228.834 184.543 229.853 184.354 230.909 184.354C232.041 184.354 233.098 184.543 234.079 184.92C235.136 185.297 235.891 185.826 236.343 186.505C236.645 186.958 236.872 187.599 237.023 188.43C237.174 189.26 237.287 190.203 237.362 191.26C237.513 192.241 237.589 193.298 237.589 194.43C237.664 195.487 237.702 196.468 237.702 197.373ZM233.4 174.504C231.06 175.108 229.098 174.882 227.513 173.825C226.003 172.693 225.06 171.032 224.682 168.844C224.381 167.259 224.494 165.862 225.022 164.655C225.55 163.447 226.343 162.541 227.4 161.938C228.456 161.258 229.664 160.956 231.022 161.032C232.381 161.107 233.74 161.636 235.098 162.617C236.381 163.523 237.287 164.579 237.815 165.787C238.419 166.994 238.608 168.164 238.381 169.296C238.23 170.429 237.74 171.485 236.91 172.466C236.079 173.372 234.909 174.051 233.4 174.504ZM289.765 196.694C290.369 197.751 290.671 198.883 290.671 200.091C290.746 201.298 290.482 202.43 289.879 203.487C289.199 204.846 288.218 205.789 286.935 206.317C285.727 206.77 284.369 206.808 282.859 206.431C282.18 206.28 281.576 206.015 281.048 205.638C280.52 205.261 279.953 204.883 279.35 204.506C278.821 204.053 278.18 203.638 277.425 203.261C276.746 202.883 275.84 202.619 274.708 202.468C273.576 202.317 272.33 202.317 270.972 202.468C269.689 202.619 268.519 202.921 267.462 203.374C265.802 204.204 264.481 205.487 263.5 207.223C262.519 208.884 261.877 210.695 261.575 212.657C261.273 214.544 261.311 216.469 261.688 218.431C262.141 220.394 262.971 222.054 264.179 223.413C265.085 224.469 266.255 225.337 267.689 226.017C269.198 226.696 270.632 227.111 271.991 227.262C273.274 227.413 274.557 227.413 275.84 227.262C277.123 227.035 278.368 226.734 279.576 226.356C280.482 225.979 281.501 225.488 282.633 224.884C283.765 224.205 284.859 223.79 285.916 223.639C287.275 223.639 288.331 224.016 289.086 224.771C289.841 225.45 290.369 226.318 290.671 227.375C290.973 228.356 291.011 229.413 290.784 230.545C290.633 231.677 290.218 232.658 289.539 233.489C288.633 234.621 287.35 235.715 285.69 236.772C284.029 237.753 282.444 238.47 280.935 238.923C279.123 239.527 277.085 239.866 274.821 239.942C272.632 240.017 270.557 239.942 268.594 239.715C267.689 239.564 266.745 239.376 265.764 239.149C264.783 238.923 263.839 238.659 262.934 238.357C259.613 237.149 256.82 235.451 254.556 233.262C252.367 230.998 250.669 228.469 249.461 225.677C248.329 222.884 247.688 219.903 247.537 216.733C247.386 213.563 247.763 210.431 248.669 207.336C249.499 204.393 250.518 201.902 251.725 199.864C253.009 197.826 254.48 196.166 256.141 194.883C257.877 193.524 259.801 192.468 261.915 191.713C264.028 190.883 266.368 190.166 268.934 189.562C271.576 189.033 274.368 189.033 277.312 189.562C280.255 190.09 282.897 191.071 285.237 192.505C287.048 193.486 288.558 194.883 289.765 196.694ZM322.474 214.242C324.135 215.978 325.342 217.261 326.097 218.092C326.927 218.846 327.493 219.412 327.795 219.79C328.173 220.167 328.437 220.394 328.588 220.469C328.739 220.545 329.003 220.771 329.38 221.148C329.758 221.526 330.362 222.13 331.192 222.96C332.022 223.715 333.267 224.96 334.928 226.696C336.286 228.054 337.381 229.639 338.211 231.451C339.117 233.187 339.041 235.074 337.985 237.111C337.381 238.168 336.702 238.923 335.947 239.376C335.192 239.753 334.362 239.904 333.456 239.829C332.626 239.753 331.72 239.489 330.739 239.036C329.833 238.583 328.928 238.017 328.022 237.338C326.286 236.055 324.625 234.583 323.04 232.923C321.455 231.187 320.172 229.866 319.191 228.96C318.512 228.281 318.097 227.828 317.946 227.602C317.795 227.451 317.644 227.337 317.493 227.262C317.342 227.111 317.191 226.96 317.04 226.809C316.512 226.281 315.946 225.752 315.342 225.224C314.738 224.696 314.134 224.13 313.53 223.526V227.941C313.53 228.771 313.568 229.375 313.644 229.753C313.644 230.507 313.606 231.073 313.53 231.451C313.304 232.281 313.191 233.074 313.191 233.828C313.115 234.206 313.04 234.583 312.964 234.96C312.889 235.262 312.776 235.602 312.625 235.979C312.549 236.13 312.474 236.244 312.398 236.319C312.398 236.394 312.398 236.508 312.398 236.659C312.323 236.81 312.247 236.923 312.172 236.998C312.172 237.074 312.134 237.187 312.059 237.338C311.681 238.093 311.077 238.81 310.247 239.489C308.813 240.319 307.04 240.546 304.926 240.168C303.794 239.942 302.926 239.527 302.322 238.923C301.643 238.47 301.19 237.828 300.964 236.998C300.813 236.621 300.662 236.244 300.511 235.866C300.435 235.413 300.322 234.998 300.171 234.621C300.02 234.243 299.945 233.904 299.945 233.602C299.945 233.224 299.945 232.923 299.945 232.696V168.278C299.945 167.825 299.945 167.372 299.945 166.919C299.945 166.466 299.983 166.013 300.058 165.56C300.134 165.108 300.209 164.692 300.284 164.315C300.435 163.862 300.586 163.447 300.737 163.07C301.039 162.315 301.417 161.711 301.869 161.258C302.247 160.881 302.624 160.617 303.002 160.466C303.454 160.239 303.87 160.051 304.247 159.9C304.624 159.824 305.039 159.786 305.492 159.786C306.021 159.711 306.511 159.673 306.964 159.673C308.021 159.673 309.077 159.975 310.134 160.579C311.115 161.258 311.832 162.126 312.285 163.183C312.889 164.617 313.191 166.013 313.191 167.372C313.266 168.127 313.342 169.296 313.417 170.881C313.493 172.391 313.53 173.523 313.53 174.278V174.731C313.606 177.221 313.644 179.599 313.644 181.863C313.644 184.127 313.644 186.58 313.644 189.222C313.568 191.864 313.53 194.392 313.53 196.807C313.53 199.147 313.53 201.487 313.53 203.827V205.072C314.134 204.468 314.738 203.902 315.342 203.374C315.946 202.845 316.512 202.279 317.04 201.676C317.342 201.449 317.644 201.185 317.946 200.883L319.191 199.638C320.172 198.657 321.455 197.336 323.04 195.675C324.625 193.939 326.286 192.43 328.022 191.147C329.909 189.788 331.72 188.958 333.456 188.656C335.268 188.354 336.777 189.26 337.985 191.373C339.041 193.411 339.117 195.336 338.211 197.147C337.381 198.883 336.286 200.506 334.928 202.015C333.267 203.751 332.022 205.034 331.192 205.864C330.362 206.619 329.758 207.185 329.38 207.563C329.003 207.865 328.739 208.053 328.588 208.129C328.437 208.204 328.173 208.431 327.795 208.808C327.493 209.11 326.927 209.676 326.097 210.506C325.342 211.261 324.135 212.506 322.474 214.242Z" fill="black" />
          <path d="M401.694 106.687L359.742 118.966C358.359 119.368 357.094 120.29 356.195 121.552C355.297 122.813 354.831 124.323 354.888 125.782C354.946 127.242 355.523 128.545 356.507 129.437C357.491 130.328 358.809 130.742 360.202 130.597L361.2 130.406L417.006 114.038L417.924 113.601L418.543 113.177L419.208 112.605L419.388 112.426C419.69 112.108 419.964 111.761 420.205 111.39L419.658 112.129L419.895 111.825L420.472 110.943L420.922 109.964L421.173 109.195L421.334 108.175L421.322 107.13L413.983 49.72C413.803 48.2902 413.111 47.0627 412.045 46.2793C410.978 45.4959 409.614 45.2135 408.22 45.4877C406.827 45.7619 405.506 46.5729 404.517 47.7608C403.528 48.9486 402.944 50.4273 402.879 51.9052L402.917 52.9673L408.486 96.304L370.458 71.4416C339.265 51.0358 304.929 57.8406 284.832 86.4162L283.392 88.5401C282.492 89.9155 282.096 91.5398 282.29 93.0557C282.484 94.5716 283.253 95.8548 284.427 96.6231C285.602 97.3914 287.086 97.5819 288.552 97.1525C290.019 96.7232 291.348 95.7093 292.248 94.3339C307.671 70.7577 334.742 64.31 361.325 80.3373L363.672 81.8138L401.694 106.687Z" fill="black" />
        </svg>

      ) : (
        <svg width="100" height="100" viewBox="0 0 1009 589" fill="none" cursor="pointer" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_529_35)">
            <g filter="url(#filter1_d_529_35)">
              <path d="M999.722 322.35C986.721 319.785 965.752 314.916 968.077 310.573C968.077 310.573 978.376 251.072 981.834 231.027C982.388 227.814 979.569 225.124 976.36 225.693L897.277 239.691C893.382 241.788 889.237 222.354 887.013 209.906C886.265 205.72 881.171 204.119 878.161 207.122C866.243 219.007 849.195 236.042 831.433 254.111C832.738 184.266 833.3 110.577 833.475 83.1837C833.505 78.5132 828.32 75.771 824.441 78.3726C812.311 86.5052 792.177 99.0509 790.604 93.8548C790.604 93.8548 752.264 39.465 739.339 21.1511C737.268 18.2158 732.975 18.3159 730.916 21.2595L680.199 93.7917C678.798 98.4598 660.425 86.5469 648.99 78.5788C645.145 75.8997 639.929 78.6217 639.923 83.3077C639.886 110.947 639.88 185.169 640.686 255.246C622.523 236.756 605.008 219.255 592.84 207.12C589.829 204.117 584.735 205.718 583.987 209.904C581.762 222.354 577.617 241.786 573.724 239.69L494.641 225.692C491.43 225.123 488.613 227.814 489.167 231.026C492.624 251.07 502.923 310.572 502.923 310.572C505.249 314.916 484.279 319.784 471.278 322.349C467.12 323.169 465.552 328.255 468.568 331.233C504.206 366.415 587.177 446.922 604.766 456.29C620.559 464.703 639.47 465.323 656.863 462.856L626.809 492.906C620.327 499.388 626.752 510.24 635.552 507.677L734.225 478.924C735.835 478.455 737.545 478.452 739.157 478.917L829.342 507.862C838.455 510.487 844.765 498.892 837.612 492.667L815.53 463.048C832.534 465.284 850.86 464.48 866.232 456.291C883.822 446.923 966.792 366.417 1002.43 331.235C1005.45 328.256 1003.88 323.17 999.722 322.35Z" fill="#008A2F" />
              <path d="M735.689 563.278C732.684 563.278 729.802 562.085 727.676 559.961C725.551 557.837 724.355 554.956 724.352 551.951L724.16 341.81C724.154 335.549 729.225 330.468 735.487 330.463H735.497C738.502 330.463 741.384 331.656 743.51 333.78C745.636 335.904 746.832 338.785 746.835 341.79L747.027 551.931C747.033 558.192 741.962 563.273 735.7 563.278H735.689Z" fill="#0CAB12" />
            </g>
            <path d="M189.246 221.262C190.227 223.45 190.265 225.601 189.359 227.715C188.453 229.753 187.019 231.64 185.057 233.375C183.094 235.111 180.83 236.621 178.264 237.904C175.773 239.187 173.396 240.093 171.131 240.621C168.641 241.149 165.999 241.376 163.206 241.3C160.489 241.3 157.734 240.961 154.942 240.281C152.225 239.678 149.545 238.772 146.904 237.564C144.338 236.281 141.96 234.734 139.771 232.923C137.13 230.734 135.054 228.13 133.544 225.111C132.11 222.016 131.054 218.733 130.374 215.261C129.695 211.789 129.318 208.317 129.242 204.846C129.242 201.298 129.356 197.977 129.582 194.883C129.808 192.09 130.374 189.184 131.28 186.165C132.186 183.146 133.431 180.203 135.016 177.335C136.677 174.391 138.639 171.674 140.903 169.183C143.243 166.693 145.96 164.579 149.055 162.843C151.394 161.485 153.998 160.579 156.866 160.126C159.81 159.598 162.754 159.485 165.697 159.787C168.716 160.013 171.547 160.654 174.188 161.711C176.905 162.692 179.207 164.051 181.094 165.787C182.302 166.843 183.547 168.315 184.83 170.202C186.189 172.089 187.17 174.014 187.774 175.976C188.378 177.938 188.378 179.788 187.774 181.524C187.246 183.184 185.736 184.316 183.245 184.92C182.189 185.222 181.245 185.297 180.415 185.146C179.585 184.92 178.83 184.58 178.151 184.127C177.471 183.599 176.83 182.995 176.226 182.316C175.622 181.637 175.056 180.957 174.528 180.278C172.716 178.089 170.603 176.618 168.188 175.863C165.773 175.033 163.357 174.844 160.942 175.297C158.602 175.674 156.376 176.655 154.263 178.24C152.225 179.75 150.64 181.712 149.508 184.127C148.3 186.694 147.319 189.524 146.564 192.618C145.885 195.638 145.507 198.732 145.432 201.902C145.356 204.997 145.621 208.016 146.224 210.959C146.904 213.903 148.036 216.507 149.621 218.771C150.828 220.582 152.3 222.054 154.036 223.186C155.848 224.318 157.772 225.111 159.81 225.564C161.848 226.017 163.886 226.092 165.924 225.79C168.037 225.488 170.075 224.809 172.037 223.752C172.641 223.45 173.282 223.035 173.962 222.507C174.717 221.903 175.471 221.299 176.226 220.696C176.981 220.092 177.736 219.526 178.49 218.997C179.321 218.469 180.189 218.092 181.094 217.865C182.453 217.412 183.925 217.45 185.51 217.978C187.17 218.507 188.415 219.601 189.246 221.262ZM214.171 231.224C214.096 231.602 214.02 231.979 213.945 232.357C213.945 232.658 213.945 232.998 213.945 233.375L213.266 235.753C213.115 236.055 213.001 236.244 212.926 236.319L212.586 236.998C212.209 237.829 211.53 238.508 210.548 239.036C208.737 239.942 206.812 240.168 204.774 239.715C203.491 239.564 202.472 239.187 201.718 238.583C200.963 238.055 200.435 237.413 200.133 236.659C199.831 235.904 199.604 235.149 199.453 234.394C199.227 233.64 199.114 232.96 199.114 232.357V168.957C199.114 168.428 199.114 167.976 199.114 167.598C199.189 167.145 199.265 166.73 199.34 166.353C199.416 165.825 199.491 165.372 199.567 164.994C199.718 164.617 199.869 164.202 200.02 163.749C200.246 162.994 200.661 162.39 201.265 161.938C202.171 161.258 203.039 160.881 203.869 160.805C204.397 160.654 204.888 160.579 205.341 160.579C205.793 160.504 206.322 160.466 206.926 160.466C207.982 160.466 209.19 160.768 210.548 161.372C211.605 161.975 212.36 162.806 212.813 163.862C213.567 165.372 213.945 166.768 213.945 168.051C214.02 168.806 214.058 169.938 214.058 171.448C214.133 172.957 214.171 174.089 214.171 174.844V175.297C214.322 177.712 214.398 180.052 214.398 182.316C214.398 184.505 214.36 186.92 214.284 189.562C214.284 192.128 214.247 194.619 214.171 197.034C214.171 199.374 214.171 201.713 214.171 204.053V227.828C214.171 228.13 214.171 228.432 214.171 228.734C214.247 228.96 214.284 229.224 214.284 229.526C214.284 230.281 214.247 230.847 214.171 231.224ZM237.702 197.373C237.702 199.487 237.702 201.864 237.702 204.506C237.777 207.148 237.815 209.902 237.815 212.771C237.815 215.563 237.815 218.356 237.815 221.148C237.815 223.865 237.777 226.394 237.702 228.734C237.627 229.866 237.513 231.111 237.362 232.47C237.211 233.753 236.91 234.96 236.457 236.093C236.004 237.225 235.287 238.168 234.306 238.923C233.4 239.602 232.155 239.904 230.57 239.829C228.23 239.678 226.532 238.659 225.475 236.772C224.494 234.885 223.928 232.243 223.777 228.847C223.777 227.111 223.739 225.111 223.664 222.847C223.664 220.582 223.626 218.28 223.55 215.941C223.55 213.601 223.55 211.337 223.55 209.148C223.55 206.883 223.55 204.846 223.55 203.034C223.55 201.978 223.513 200.694 223.437 199.185C223.437 197.675 223.475 196.128 223.55 194.543C223.626 192.958 223.814 191.449 224.116 190.015C224.418 188.505 224.909 187.26 225.588 186.279C226.116 185.675 226.871 185.222 227.852 184.92C228.834 184.543 229.853 184.354 230.909 184.354C232.041 184.354 233.098 184.543 234.079 184.92C235.136 185.297 235.891 185.826 236.343 186.505C236.645 186.958 236.872 187.599 237.023 188.43C237.174 189.26 237.287 190.203 237.362 191.26C237.513 192.241 237.589 193.298 237.589 194.43C237.664 195.487 237.702 196.468 237.702 197.373ZM233.4 174.504C231.06 175.108 229.098 174.882 227.513 173.825C226.003 172.693 225.06 171.032 224.682 168.844C224.381 167.259 224.494 165.862 225.022 164.655C225.55 163.447 226.343 162.541 227.4 161.938C228.456 161.258 229.664 160.956 231.022 161.032C232.381 161.107 233.74 161.636 235.098 162.617C236.381 163.523 237.287 164.579 237.815 165.787C238.419 166.994 238.608 168.164 238.381 169.296C238.23 170.429 237.74 171.485 236.91 172.466C236.079 173.372 234.909 174.051 233.4 174.504ZM289.765 196.694C290.369 197.751 290.671 198.883 290.671 200.091C290.746 201.298 290.482 202.43 289.879 203.487C289.199 204.846 288.218 205.789 286.935 206.317C285.727 206.77 284.369 206.808 282.859 206.431C282.18 206.28 281.576 206.015 281.048 205.638C280.52 205.261 279.953 204.883 279.35 204.506C278.821 204.053 278.18 203.638 277.425 203.261C276.746 202.883 275.84 202.619 274.708 202.468C273.576 202.317 272.33 202.317 270.972 202.468C269.689 202.619 268.519 202.921 267.462 203.374C265.802 204.204 264.481 205.487 263.5 207.223C262.519 208.884 261.877 210.695 261.575 212.657C261.273 214.544 261.311 216.469 261.688 218.431C262.141 220.394 262.971 222.054 264.179 223.413C265.085 224.469 266.255 225.337 267.689 226.017C269.198 226.696 270.632 227.111 271.991 227.262C273.274 227.413 274.557 227.413 275.84 227.262C277.123 227.035 278.368 226.734 279.576 226.356C280.482 225.979 281.501 225.488 282.633 224.884C283.765 224.205 284.859 223.79 285.916 223.639C287.275 223.639 288.331 224.016 289.086 224.771C289.841 225.45 290.369 226.318 290.671 227.375C290.973 228.356 291.011 229.413 290.784 230.545C290.633 231.677 290.218 232.658 289.539 233.489C288.633 234.621 287.35 235.715 285.69 236.772C284.029 237.753 282.444 238.47 280.935 238.923C279.123 239.527 277.085 239.866 274.821 239.942C272.632 240.017 270.557 239.942 268.594 239.715C267.689 239.564 266.745 239.376 265.764 239.149C264.783 238.923 263.839 238.659 262.934 238.357C259.613 237.149 256.82 235.451 254.556 233.262C252.367 230.998 250.669 228.47 249.461 225.677C248.329 222.884 247.688 219.903 247.537 216.733C247.386 213.563 247.763 210.431 248.669 207.336C249.499 204.393 250.518 201.902 251.725 199.864C253.009 197.826 254.48 196.166 256.141 194.883C257.877 193.524 259.801 192.468 261.915 191.713C264.028 190.883 266.368 190.166 268.934 189.562C271.576 189.033 274.368 189.033 277.312 189.562C280.255 190.09 282.897 191.071 285.237 192.505C287.048 193.486 288.558 194.883 289.765 196.694ZM322.474 214.242C324.135 215.978 325.342 217.261 326.097 218.092C326.927 218.846 327.493 219.412 327.795 219.79C328.173 220.167 328.437 220.394 328.588 220.469C328.739 220.545 329.003 220.771 329.38 221.148C329.758 221.526 330.362 222.13 331.192 222.96C332.022 223.715 333.267 224.96 334.928 226.696C336.286 228.054 337.381 229.639 338.211 231.451C339.117 233.187 339.041 235.074 337.985 237.112C337.381 238.168 336.702 238.923 335.947 239.376C335.192 239.753 334.362 239.904 333.456 239.829C332.626 239.753 331.72 239.489 330.739 239.036C329.833 238.583 328.928 238.017 328.022 237.338C326.286 236.055 324.625 234.583 323.04 232.923C321.455 231.187 320.172 229.866 319.191 228.96C318.512 228.281 318.097 227.828 317.946 227.602C317.795 227.451 317.644 227.337 317.493 227.262C317.342 227.111 317.191 226.96 317.04 226.809C316.512 226.281 315.946 225.752 315.342 225.224C314.738 224.696 314.134 224.13 313.53 223.526V227.941C313.53 228.771 313.568 229.375 313.644 229.753C313.644 230.507 313.606 231.073 313.53 231.451C313.304 232.281 313.191 233.074 313.191 233.828C313.115 234.206 313.04 234.583 312.964 234.96C312.889 235.262 312.776 235.602 312.625 235.979C312.549 236.13 312.474 236.244 312.398 236.319C312.398 236.394 312.398 236.508 312.398 236.659C312.323 236.81 312.247 236.923 312.172 236.998C312.172 237.074 312.134 237.187 312.059 237.338C311.681 238.093 311.077 238.81 310.247 239.489C308.813 240.319 307.04 240.546 304.926 240.168C303.794 239.942 302.926 239.527 302.322 238.923C301.643 238.47 301.19 237.829 300.964 236.998C300.813 236.621 300.662 236.244 300.511 235.866C300.435 235.413 300.322 234.998 300.171 234.621C300.02 234.243 299.945 233.904 299.945 233.602C299.945 233.225 299.945 232.923 299.945 232.696V168.278C299.945 167.825 299.945 167.372 299.945 166.919C299.945 166.466 299.983 166.013 300.058 165.56C300.134 165.108 300.209 164.692 300.284 164.315C300.435 163.862 300.586 163.447 300.737 163.07C301.039 162.315 301.417 161.711 301.869 161.258C302.247 160.881 302.624 160.617 303.002 160.466C303.454 160.239 303.87 160.051 304.247 159.9C304.624 159.824 305.039 159.787 305.492 159.787C306.021 159.711 306.511 159.673 306.964 159.673C308.021 159.673 309.077 159.975 310.134 160.579C311.115 161.258 311.832 162.126 312.285 163.183C312.889 164.617 313.191 166.013 313.191 167.372C313.266 168.127 313.342 169.296 313.417 170.881C313.493 172.391 313.53 173.523 313.53 174.278V174.731C313.606 177.221 313.644 179.599 313.644 181.863C313.644 184.127 313.644 186.58 313.644 189.222C313.568 191.864 313.53 194.392 313.53 196.807C313.53 199.147 313.53 201.487 313.53 203.827V205.072C314.134 204.468 314.738 203.902 315.342 203.374C315.946 202.845 316.512 202.279 317.04 201.676C317.342 201.449 317.644 201.185 317.946 200.883L319.191 199.638C320.172 198.657 321.455 197.336 323.04 195.675C324.625 193.939 326.286 192.43 328.022 191.147C329.909 189.788 331.72 188.958 333.456 188.656C335.268 188.354 336.777 189.26 337.985 191.373C339.041 193.411 339.117 195.336 338.211 197.147C337.381 198.883 336.286 200.506 334.928 202.015C333.267 203.751 332.022 205.034 331.192 205.865C330.362 206.619 329.758 207.185 329.38 207.563C329.003 207.865 328.739 208.053 328.588 208.129C328.437 208.204 328.173 208.431 327.795 208.808C327.493 209.11 326.927 209.676 326.097 210.506C325.342 211.261 324.135 212.506 322.474 214.242Z" fill="black" />
            <path d="M401.694 106.687L359.742 118.966C358.359 119.368 357.094 120.29 356.195 121.552C355.297 122.813 354.831 124.323 354.888 125.782C354.946 127.242 355.523 128.546 356.507 129.437C357.491 130.328 358.809 130.742 360.202 130.597L361.2 130.406L417.006 114.038L417.924 113.601L418.543 113.177L419.208 112.605L419.388 112.426C419.69 112.108 419.964 111.761 420.205 111.391L419.658 112.129L419.895 111.825L420.472 110.943L420.922 109.964L421.173 109.195L421.334 108.175L421.322 107.13L413.983 49.72C413.803 48.2903 413.111 47.0627 412.045 46.2794C410.978 45.496 409.614 45.2136 408.22 45.4878C406.827 45.762 405.506 46.5729 404.517 47.7608C403.528 48.9487 402.944 50.4273 402.879 51.9053L402.917 52.9674L408.486 96.304L370.458 71.4416C339.265 51.0358 304.929 57.8407 284.832 86.4162L283.392 88.5401C282.492 89.9155 282.096 91.5399 282.29 93.0557C282.484 94.5716 283.253 95.8548 284.427 96.6231C285.602 97.3914 287.086 97.5819 288.552 97.1526C290.019 96.7233 291.348 95.7093 292.248 94.3339C307.671 70.7578 334.742 64.31 361.325 80.3374L363.672 81.8139L401.694 106.687Z" fill="black" />
          </g>
          <defs>
            <filter id="filter0_d_529_35" x="125.242" y="19" width="882.758" height="552.278" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_529_35" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_529_35" result="shape" />
            </filter>
            <filter id="filter1_d_529_35" x="462" y="19" width="547" height="569.278" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="20" />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.541667 0 0 0 0 0.541667 0 0 0 0 0.541667 0 0 0 0.63 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_529_35" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_529_35" result="shape" />
            </filter>
          </defs>
        </svg>
      )}
      <p className={styles.icon_span}>좋아요</p>
    </div>
  );
}

export default LikeButton;