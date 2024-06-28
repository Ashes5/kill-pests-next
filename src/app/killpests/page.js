'use client'

import Image from "next/image";
import styles from "@/app/page.module.css";

import {useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {resetInput} from "@/lib/features/pest/pestSlice";


export default function Page() {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const dispatch = useDispatch();
    const { newinput } = useSelector((state) => state.pests);
    const router = useRouter();


    const handleInitInput = () => {
        dispatch(resetInput());
        setResponse('')
        router.push(`/location`);
    }


    const handleQuestion = e => {
        setQuestion(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();

        const userLocation = newinput.map(location => location.name)

        const apiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyAXA9REfGoDBdXsIeBlaw9J5QrdzJa7zqU'

        const data = {
            "contents": [
                {
                    "role": "user",
                    "parts": [
                        {
                            "text":  `${userLocation} 에서 볼 수 있는 해충중에 너는 한국에 있는 해충 전문가야 만약 한국해충의 이름이나 특징이 포함된 글을 보면 최대한 특징이 비슷한 해충이 어떤 한국해충인지 알려주고 그 해충을 잡으려고 하는데 해충퇴치제가 없을 때 당장 해충을 퇴치하는 방법을 한국어로 알려주면 돼 그리고 예방법을 포함해서 알려주고 한 단락마다 글 단락을 바꿔줄 수 있겠어?`
                        },
                        {
                            "text": ""
                        }
                    ]
                },
                {
                    "role": "user",
                    "parts": [
                        {
                            "text": question
                        }
                    ]
                }
            ]
        }

        axios.post(apiUrl, data)
            .then(res => {
                setResponse(res.data.candidates[0].content.parts[0].text.split("**"))
            })
            .catch(err => {
                console.log('데이터 제대로 못받음');
            })
    }




    return (
        <div className="jo-loc-head">
            <div className="jo-div">
                <h2 className="jo-lock-h2">박멸하고 싶은 해충은 ?</h2>
            </div>
            {/* && 연산자이기 때문에 앞 리스폰스가 참이어야지 뒤에가 보인다 값이 없으면 바로 끝남*/}
            <div className="jo-pest-res">
                {response && <p>{response}</p>}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={question} onChange={handleQuestion} className="jo-pest-input"
                       placeholder="해충의 이름이나 특징을 적어주세요"/>
                <div className="jo-btn-flex">
                <button type="submit" className="jo-loc-button">확인</button>
                <button onClick={handleInitInput} className="jo-loc-button">다시하기</button>
                </div>
            </form>
        </div>
    );
}