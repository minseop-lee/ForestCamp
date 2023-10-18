import React from 'react'
import styles from "./style/FacilityIcons.module.css"

export default function FacilityIcons({ isTent, className }) {
    return (
        <div className={className}>
            <div className={styles.div_h3}>
                <h3>인기시설 및 서비스</h3>
            </div>
            <div className={styles.icon}>
                {isTent ? (
                    <svg width="80" height="80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M11.22 2.22a.75.75 0 0 1 1.042-.018l1.756 1.639a20.816 20.816 0 0 0 4.235 3.056c.432.236.727.661.797 1.148L20.4 17.5h.85a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5h.85l1.355-9.49c.065-.455.332-.857.726-1.093a19.934 19.934 0 0 0 3.84-2.998l1.699-1.7ZM5.115 17.5h2.131a23.313 23.313 0 0 0 3.509-7.16l.525-1.8a.75.75 0 0 1 1.44 0l.525 1.8a23.314 23.314 0 0 0 3.509 7.16h2.131l-1.32-9.243a.059.059 0 0 0-.03-.043a22.313 22.313 0 0 1-4.54-3.276l-1.227-1.145l-1.187 1.187a21.433 21.433 0 0 1-4.129 3.223a.026.026 0 0 0-.012.019L5.115 17.5Zm9.814 0A24.813 24.813 0 0 1 12 11.397A24.813 24.813 0 0 1 9.07 17.5h5.86Z" />
                    </svg>


                ) : (
                    <svg width="80" height="80" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#000000" d="M14.601 3.211a.75.75 0 0 0-1.152 0c-1.795 2.154-5.337 4.71-7.374 5.848a.75.75 0 0 0-.377.552L4.06 21.5H2.75a.75.75 0 0 0 0 1.5h22.5a.75.75 0 0 0 0-1.5h-1.26L22.352 9.61a.75.75 0 0 0-.378-.552c-2.036-1.138-5.578-3.694-7.373-5.848ZM10.272 21.5c1.259-1.83 2.557-4.18 3.728-7.892c1.059 3.35 2.24 5.665 3.728 7.892h-7.456Z" />

                    </svg>
                )}

                <span className={styles.icon_span}>Tent</span>
            </div>


            {/* </Paper> */}
        </div>
    )
}