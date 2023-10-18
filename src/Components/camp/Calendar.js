import React, { useCallback, useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./style/Calendar.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const cx = classNames.bind(style);

const Calendar = (props) => {
    console.log(props.able)
    const today = {
        year: new Date().getFullYear(), //오늘 연도
        month: new Date().getMonth() + 1, //오늘 월
        date: new Date().getDate(), //오늘 날짜
        day: new Date().getDay(), //오늘 요일
    };

    const week = ["일", "월", "화", "수", "목", "금", "토"]; //일주일
    const [selectedYear, setSelectedYear] = useState(""); //현재 예약받는 연도
    const [selectedMonth, setSelectedMonth] = useState(""); //현재 예약받는 달
    const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); //선택된 연도, 달의 마지막 날짜

    useEffect(() => {
        setSelectedYear(parseInt(props.date[0]))
        setSelectedMonth(parseInt(props.date[1]))
    }, [props.date]);
    // console.log(selectedYear, selectedMonth)



    const is_able = (i) => {
        const date = (i < 10 ? ('0' + i) : ('' + i))
        if (props.able != undefined) {
            // console.log("date", date)
            return props.able.indexOf(selectedYear + '' + selectedMonth + date)
        }
        return null
    }

    const stateValue = (index) => {
        if (props.state != undefined) {
            if (index < 0) {
                return (
                    <div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <p className="state"> {parseInt(props.state[index][1]) - parseInt(props.state[index][0])} </p>
                    </div>
                )
            }
        }
        return null
    }

    const prevMonth = useCallback(() => {
        //이전 달 보기 보튼
        if (selectedMonth === 1) {
            setSelectedMonth(12);
            setSelectedYear(selectedYear - 1);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    }, [selectedMonth]);

    const nextMonth = useCallback(() => {
        //다음 달 보기 버튼
        if (selectedMonth === 12) {
            setSelectedMonth(1);
            setSelectedYear(selectedYear + 1);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    }, [selectedMonth]);


    const monthControl = useCallback(() => {
        //달 선택박스에서 고르기
        let monthArr = [];
        for (let i = 0; i < 12; i++) {
            monthArr.push(
                <MenuItem key={i + 1} value={i + 1}>{i + 1}월</MenuItem>
            );
        }
        return (

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">MONTH</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedMonth}
                    onChange={changeSelectMonth}
                    label="월"
                >
                    {monthArr}
                </Select>
            </FormControl>

        );
    }, [selectedMonth]);

    const yearControl = useCallback(() => {
        //연도 선택박스에서 고르기
        let yearArr = [];
        const startYear = today.year - 10; //현재 년도부터 10년전 까지만
        const endYear = today.year + 10; //현재 년도부터 10년후 까지만
        for (let i = startYear; i < endYear + 1; i++) {
            yearArr.push(
                <option key={i} value={i}>
                    {i}년
                </option>
            );
        }
        return (
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">YEAR</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedYear}
                    onChange={changeSelectYear}
                    label="년"
                >
                    {yearArr}
                </Select>
            </FormControl>
        );
    }, [selectedYear]);

    const changeSelectMonth = (e) => {
        setSelectedMonth(Number(e.target.value));
    };
    const changeSelectYear = (e) => {
        setSelectedYear(Number(e.target.value));
    };

    const returnWeek = useCallback(() => {
        //요일 반환 함수
        let weekArr = [];
        week.forEach((v) => {
            weekArr.push(
                <div
                    key={v}
                    className={cx(
                        { weekday: true },
                        { sunday: v === "일" },
                        { saturday: v === "토" }
                    )}
                >
                    {v}
                </div>
            );
        });
        return weekArr;
    }, []);

    const returnDay = useCallback(() => {
        //선택된 달의 날짜들 반환 함수
        let dayArr = [];

        for (const nowDay of week) {
            const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
            if (week[day] === nowDay) {
                for (let i = 0; i < dateTotalCount; i++) {
                    dayArr.push(
                        <div
                            key={i + 1}
                            className={cx(
                                {
                                    //오늘 날짜일 때 표시할 스타일 클라스네임
                                    today:
                                        today.year === selectedYear &&
                                        today.month === selectedMonth &&
                                        today.date === i + 1,
                                },
                                { weekday: true }, //전체 날짜 스타일
                                {
                                    //전체 일요일 스타일
                                    sunday:
                                        new Date(
                                            selectedYear,
                                            selectedMonth - 1,
                                            i + 1
                                        ).getDay() === 0,
                                },
                                {
                                    //전체 토요일 스타일
                                    saturday:
                                        new Date(
                                            selectedYear,
                                            selectedMonth - 1,
                                            i + 1
                                        ).getDay() === 6,
                                }, {
                                disable:
                                    is_able(i + 1) === -1
                            }
                            )}
                        >
                            {i + 1}
                            {stateValue(is_able(i + 1))}
                        </div>
                    );
                }
            } else {
                dayArr.push(<div className="weekday"></div>);
            }
        }

        return dayArr;
    }, [selectedYear, selectedMonth, dateTotalCount]);

    return (
        <div className="container">
            <p className="feat">남은자리 : 초록색</p>
            <div className="title">
                <h3 className="controller">
                    {yearControl()} {monthControl()}
                </h3>
                <div className="pagination">
                    <button onClick={prevMonth}>◀︎</button>
                    <button onClick={nextMonth}>▶︎</button>
                </div>
            </div>
            <div className="week">{returnWeek()}</div>
            <div className="date">{returnDay()}</div>
        </div>
    );
};

export default Calendar;