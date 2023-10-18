import { Button } from "@mui/material";
import React from "react";
import NaverReviews from "./NaverReviews";
import styles from "./style/NaverReviewSample.module.css"

export default function NaverReviewSample(props) {

    return (
        <div className={styles.top_div}>
            <h2 className={styles.title}>블로그 리뷰</h2>
            <NaverReviews url={props.url} />
            <Button className={styles.more} variant="text" href={`/camping/reviews/${props.name}`}>+ 더보기</Button>
        </div>
    )
}
