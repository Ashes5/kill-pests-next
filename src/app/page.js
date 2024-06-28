'use client'

import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();


    const handleNext = () => {
        router.push(`/location`)
    }

    return (
        <div className="jo-haed">
            <div className="jo-home-boss">
                <div className="jo-B">B</div>
                <div className="jo-U">U</div>
                <div className="jo-G">G</div>
            </div>
            <div>
                <div className="jo-Kill">KiLLING PESTS!</div>
            </div>
            <div>
                <button onClick={handleNext} className="jo-home-button">시작하기</button>
            </div>
        </div>
    );
}
